# Nurtura

A family healthcare management app designed to help you care for your loved ones with warmth and simplicity.

## Overview

Nurtura is a senior-friendly healthcare application that focuses on:
- Medicine tracking and reminders
- Family health monitoring
- Emotional comfort and ease of use
- Non-clinical, welcoming design

## Features

### Login Page
- Beautiful animated growing tree illustration
- Email/Phone login toggle
- Senior-friendly mode option
- Secure authentication flow

### Dashboard
- Personalized greeting with daily health summary
- Quick access to vitals (steps, water, calories, mood)
- Medicine reminders with status tracking
- Daily inspirational quotes
- Navigation to all app sections

### Medicine & Doctor
- Ongoing medicines list with status indicators
- Prescribing doctors with visit schedules
- Vitals overview with trend sparklines
- Health history records
- Smart chat for uploading prescriptions/reports

### Family
- "Loved Ones" section with family member cards
- Medication status at a glance (taken/due/missed)
- Detailed medication schedules by time of day
- Quick reminder messages
- Add new family members

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Language**: TypeScript

## Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Matcha Soft | `#8FAF9A` | Primary green, success states |
| Pistachio Light | `#CFE3D6` | Light backgrounds, toggles |
| Azure Mist | `#7FB9BE` | Secondary accent, water/health |
| Indigo Dust | `#364A5A` | Text, dark elements |
| Orchid Pastel | `#D48A96` | Alerts, feminine accents |
| Peach Cream | `#FFD8B8` | Warm highlights |
| Sunset Sorbet | `#E59A4F` | Warnings, energy |
| Warm Beige | `#F5F0E8` | Page backgrounds |
| Soft Cream | `#FDF8F3` | Card backgrounds |

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to client directory
cd client

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:3000` (or `http://localhost:3001` if port 3000 is in use).

## Project Structure

```
client/ 
├── src/
│   └── app/
│       ├── page.tsx          # Login page
│       ├── dashboard/
│       │   └── page.tsx      # Main dashboard
│       ├── medicine/
│       │   └── page.tsx      # Medicine & Doctor page
│       ├── family/
│       │   └── page.tsx      # Family management
│       └── globals.css       # Global styles
├── tailwind.config.js        # Tailwind configuration
└── package.json
```

## Design Philosophy

Nurtura is designed with seniors and caregivers in mind:
- **Large, readable text** for easy visibility
- **Soft, calming colors** to reduce anxiety
- **Rounded shapes** for a friendly feel
- **Clear status indicators** with color and icons
- **Simple navigation** with minimal cognitive load
- **Supportive messaging** that feels caring, not clinical

## License

MIT
