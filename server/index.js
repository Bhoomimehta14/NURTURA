const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'carenest-secret-key-change-in-production';

// Data file path
const DATA_FILE = path.join(__dirname, 'data', 'users.json');

// Middleware
app.use(cors());
app.use(express.json());

// Helper functions for JSON data
function readUsers() {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return { users: [] };
  }
}

function writeUsers(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

function findUserByEmail(email) {
  const data = readUsers();
  return data.users.find(user => user.email === email);
}

function findUserByPhone(phone) {
  const data = readUsers();
  return data.users.find(user => user.phone === phone);
}

// OTP storage (in production, use Redis or similar)
const otpStore = new Map();

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Nurtura API is running' });
});

// Register new user
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, phone, password, name } = req.body;

    // Validate input
    if (!password || (!email && !phone)) {
      return res.status(400).json({
        success: false,
        message: 'Email or phone and password are required'
      });
    }

    // Check if user already exists
    if (email && findUserByEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    if (phone && findUserByPhone(phone)) {
      return res.status(400).json({
        success: false,
        message: 'User with this phone number already exists'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = {
      id: uuidv4(),
      email: email || null,
      phone: phone || null,
      password: hashedPassword,
      name: name || 'User',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Save user
    const data = readUsers();
    data.users.push(newUser);
    writeUsers(data);

    // Generate token
    const token = jwt.sign({ userId: newUser.id }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        phone: newUser.phone,
        name: newUser.name
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again.'
    });
  }
});

// Login with email/phone and password
app.post('/api/auth/login', async (req, res) => {
  try {
    const { method, identifier, password } = req.body;

    // Validate input
    if (!identifier || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email/Phone and password are required'
      });
    }

    // Find user
    let user;
    if (method === 'email') {
      user = findUserByEmail(identifier);
    } else if (method === 'phone') {
      user = findUserByPhone(identifier);
    } else {
      return res.status(400).json({
        success: false,
        message: 'Invalid login method'
      });
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Generate token
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        phone: user.phone,
        name: user.name
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again.'
    });
  }
});

// Request OTP for phone login
app.post('/api/auth/request-otp', (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({
        success: false,
        message: 'Phone number is required'
      });
    }

    // Generate OTP
    const otp = generateOTP();

    // Store OTP with expiry (5 minutes)
    otpStore.set(phone, {
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000
    });

    // In production, send OTP via SMS service
    console.log(`OTP for ${phone}: ${otp}`);

    res.json({
      success: true,
      message: 'OTP sent successfully',
      // Only include OTP in development
      ...(process.env.NODE_ENV !== 'production' && { otp })
    });
  } catch (error) {
    console.error('OTP request error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send OTP. Please try again.'
    });
  }
});

// Verify OTP and login
app.post('/api/auth/verify-otp', async (req, res) => {
  try {
    const { phone, otp } = req.body;

    if (!phone || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Phone number and OTP are required'
      });
    }

    // Get stored OTP
    const storedData = otpStore.get(phone);

    if (!storedData) {
      return res.status(400).json({
        success: false,
        message: 'OTP expired or not found. Please request a new one.'
      });
    }

    // Check if expired
    if (Date.now() > storedData.expiresAt) {
      otpStore.delete(phone);
      return res.status(400).json({
        success: false,
        message: 'OTP has expired. Please request a new one.'
      });
    }

    // Verify OTP
    if (storedData.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: 'Invalid OTP'
      });
    }

    // Clear OTP
    otpStore.delete(phone);

    // Find or create user
    let user = findUserByPhone(phone);

    if (!user) {
      // Create new user with phone
      const newUser = {
        id: uuidv4(),
        email: null,
        phone: phone,
        password: null, // No password for OTP-only users
        name: 'User',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const data = readUsers();
      data.users.push(newUser);
      writeUsers(data);
      user = newUser;
    }

    // Generate token
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        phone: user.phone,
        name: user.name
      }
    });
  } catch (error) {
    console.error('OTP verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again.'
    });
  }
});

// Forgot password - request reset
app.post('/api/auth/forgot-password', (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    const user = findUserByEmail(email);

    // Don't reveal if user exists
    res.json({
      success: true,
      message: 'If an account exists with this email, you will receive a password reset link.'
    });

    if (user) {
      // In production, send password reset email
      const resetToken = jwt.sign({ userId: user.id, type: 'reset' }, JWT_SECRET, { expiresIn: '1h' });
      console.log(`Password reset token for ${email}: ${resetToken}`);
    }
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again.'
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Nurtura API server running on http://localhost:${PORT}`);
});
