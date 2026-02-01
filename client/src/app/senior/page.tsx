'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Mic,
  MicOff,
  Calendar,
  Activity,
  TreeDeciduous,
  Pill,
  Volume2,
  ChevronRight,
  Heart,
  Sun,
  Sunset,
  Moon,
  User,
  Phone,
  Droplets,
  TrendingUp,
  TrendingDown,
  Minus,
  Clock,
  X,
  ArrowLeft,
  Home,
  Check,
  CheckCircle2,
  Send,
} from 'lucide-react';

export default function SeniorDashboard() {
  const [isListening, setIsListening] = useState(false);
  const [voiceText, setVoiceText] = useState('');
  const [showSchedule, setShowSchedule] = useState(false);
  const [showHealthMonitor, setShowHealthMonitor] = useState(false);
  const [showMedLog, setShowMedLog] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [notificationSent, setNotificationSent] = useState<string | null>(null);

  // Warm, friendly greetings based on time
  const getWarmGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) {
      return {
        greeting: "Good morning! ☀️",
        message: "I hope you slept well today. How are you feeling this beautiful morning?",
        followUp: "Did you have your breakfast? Taking care of yourself makes me happy!"
      };
    } else if (hour < 17) {
      return {
        greeting: "Good afternoon! 😊",
        message: "I'm so happy to see you again! How has your day been so far?",
        followUp: "Have you had your lunch yet? Remember, you're doing great today!"
      };
    } else {
      return {
        greeting: "Good evening! 🌙",
        message: "It's lovely to see you. How are you feeling this evening?",
        followUp: "I hope you had a wonderful day. Is there anything I can help you with?"
      };
    }
  };

  const warmGreeting = getWarmGreeting();
  const [assistantMessage, setAssistantMessage] = useState(warmGreeting.message);
  const [assistantMood, setAssistantMood] = useState<'happy' | 'listening' | 'caring'>('happy');

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Update greeting when time changes
  useEffect(() => {
    const newGreeting = getWarmGreeting();
    setAssistantMessage(newGreeting.message);
  }, [currentTime.getHours()]);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  // Caring response messages
  const listeningMessages = [
    "I'm listening, take your time... 😊",
    "Go ahead, I'm here for you...",
    "I'm all ears! Tell me what you need...",
  ];

  const responseMessages = [
    "Of course! I'm happy to help you with that. 💕",
    "That's wonderful! Let me get that for you right away.",
    "You got it! I'm here whenever you need me.",
  ];

  const encouragingMessages = [
    "You're doing amazing today! 🌟",
    "I'm so proud of you for taking care of yourself!",
    "You make every day brighter. How can I help you?",
    "Remember, you're loved and cared for. 💕",
  ];

  const toggleListening = () => {
    setIsListening(!isListening);
    if (!isListening) {
      setAssistantMood('listening');
      const randomListening = listeningMessages[Math.floor(Math.random() * listeningMessages.length)];
      setAssistantMessage(randomListening);

      // Simulate voice recognition
      setTimeout(() => {
        setIsListening(false);
        setAssistantMood('caring');
        const randomResponse = encouragingMessages[Math.floor(Math.random() * encouragingMessages.length)];
        setAssistantMessage(randomResponse);
      }, 3000);
    } else {
      setAssistantMood('happy');
      setAssistantMessage("That's okay, take your time. I'm here whenever you're ready! 😊");
    }
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      // Remove emojis for speech (removes all non-ASCII characters)
      const cleanText = text.replace(/[^\x00-\x7F]/g, '');
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 0.75; // Slower, calmer pace for seniors
      utterance.pitch = 1.1; // Slightly higher, friendlier pitch
      utterance.volume = 1;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleQuickCommand = (command: string) => {
    setVoiceText(command);
    setAssistantMood('happy');

    if (command.toLowerCase().includes('schedule')) {
      setShowSchedule(true);
      setAssistantMessage("Of course! Let me show you your schedule. You're so organized! 📅");
    } else if (command.toLowerCase().includes('health')) {
      setShowHealthMonitor(true);
      setAssistantMessage("Sure thing! Let's check how you're doing. I'm proud of you for staying on top of your health! 💪");
    } else if (command.toLowerCase().includes('medicine') || command.toLowerCase().includes('med')) {
      setShowMedLog(true);
      setAssistantMessage("Absolutely! Here are your medicines. You're doing great keeping track of them! 💊");
    } else if (command.toLowerCase().includes('feeling') || command.toLowerCase().includes('how are')) {
      setAssistantMessage("I'm here and happy to help you! More importantly, how are YOU feeling today? 🤗");
    }
  };

  // Get assistant emoji based on mood
  const getAssistantEmoji = () => {
    if (assistantMood === 'listening') return '👂';
    if (assistantMood === 'caring') return '🤗';
    return '😊';
  };

  const scheduleItems = [
    { id: 'task-1', time: '8:00 AM', title: 'Morning Medicine', type: 'medicine', icon: Pill, color: '#8FAF9A' },
    { id: 'task-2', time: '10:30 AM', title: 'Doctor Appointment', type: 'appointment', icon: User, color: '#D48A96' },
    { id: 'task-3', time: '1:00 PM', title: 'Afternoon Medicine', type: 'medicine', icon: Pill, color: '#E59A4F' },
    { id: 'task-4', time: '4:00 PM', title: 'Evening Walk', type: 'reminder', icon: Activity, color: '#7FB9BE' },
    { id: 'task-5', time: '9:00 PM', title: 'Night Medicine', type: 'medicine', icon: Pill, color: '#364A5A' },
  ];

  const markTaskComplete = (taskId: string, taskTitle: string) => {
    if (completedTasks.includes(taskId)) {
      // Unmark task
      setCompletedTasks(completedTasks.filter(id => id !== taskId));
    } else {
      // Mark task complete
      setCompletedTasks([...completedTasks, taskId]);

      // Send notification to health manager
      setNotificationSent(`"${taskTitle}" completed! Health manager notified.`);
      setTimeout(() => setNotificationSent(null), 3000);
    }
  };

  const healthData = [
    { label: 'Blood Pressure', value: '120/80', unit: 'mmHg', status: 'normal', icon: Activity, trend: 'stable', lastUpdated: '2 hours ago' },
    { label: 'Sugar Level', value: '95', unit: 'mg/dL', status: 'normal', icon: Droplets, trend: 'down', lastUpdated: '4 hours ago' },
    { label: 'Heart Rate', value: '72', unit: 'BPM', status: 'normal', icon: Heart, trend: 'stable', lastUpdated: '1 hour ago' },
    { label: 'Weight', value: '68', unit: 'kg', status: 'normal', icon: User, trend: 'stable', lastUpdated: 'Today' },
  ];

  const medicines = [
    {
      name: 'Metformin',
      dosage: '500mg - 1 tablet',
      frequency: '2 times a day',
      timing: ['Morning', 'Night'],
      duration: '30 days',
      doctor: 'Dr. Sharma',
      doctorPhone: '+91 98765 43210',
    },
    {
      name: 'Amlodipine',
      dosage: '5mg - 1 tablet',
      frequency: 'Once daily',
      timing: ['Morning'],
      duration: '30 days',
      doctor: 'Dr. Patel',
      doctorPhone: '+91 98765 43211',
    },
    {
      name: 'Vitamin D3',
      dosage: '60,000 IU - 1 capsule',
      frequency: 'Once a week',
      timing: ['Morning'],
      duration: '8 weeks',
      doctor: 'Dr. Sharma',
      doctorPhone: '+91 98765 43210',
    },
  ];

  // Removed quickCommands - now using inline commands with emojis

  return (
    <div className="min-h-screen bg-warm-beige">
      {/* Header */}
      <header className="bg-white border-b border-indigo-dust/10 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="w-12 h-12 rounded-xl bg-matcha-soft/20 flex items-center justify-center"
                title="Back to Login"
              >
                <Home className="w-6 h-6 text-matcha-soft" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-indigo-dust">{getGreeting()}</h1>
                <p className="text-indigo-dust/60 text-lg">
                  {currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </p>
              </div>
            </div>
            <button
              onClick={() => speakText(assistantMessage)}
              className="w-12 h-12 rounded-xl bg-azure-mist/20 flex items-center justify-center hover:bg-azure-mist/30 transition-colors"
            >
              <Volume2 className="w-6 h-6 text-azure-mist" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Voice Assistant Section - Cozy & Warm */}
        <section className="mb-10">
          <div className="bg-gradient-to-br from-white via-peach-cream/10 to-pistachio-light/20 rounded-[2rem] p-8 shadow-lg border border-peach-cream/30">
            {/* Warm Greeting Header */}
            <div className="text-center mb-6">
              <p className="text-3xl font-bold text-indigo-dust mb-2">
                {warmGreeting.greeting}
              </p>
            </div>

            {/* Assistant Avatar with Gentle Animation */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                {/* Soft breathing glow effect */}
                <div className={`absolute inset-0 rounded-full bg-gradient-to-br from-peach-cream to-orchid-pastel/50 blur-xl transition-all duration-1000 ${
                  isListening ? 'scale-125 opacity-60' : 'scale-100 opacity-40 animate-pulse'
                }`} style={{ animationDuration: '3s' }} />

                {/* Avatar Circle */}
                <div className={`relative w-24 h-24 rounded-full bg-gradient-to-br from-peach-cream via-orchid-pastel/30 to-pistachio-light flex items-center justify-center shadow-xl transition-transform duration-300 ${
                  isListening ? 'scale-110' : 'hover:scale-105'
                }`}>
                  <span className="text-5xl">{getAssistantEmoji()}</span>
                </div>
              </div>
            </div>

            {/* Assistant Message - Warm & Friendly */}
            <div className="text-center mb-8 px-4">
              <p className="text-2xl text-indigo-dust font-medium leading-relaxed">
                {assistantMessage}
              </p>
              {!isListening && (
                <p className="text-lg text-indigo-dust/50 mt-3 italic">
                  {warmGreeting.followUp}
                </p>
              )}
            </div>

            {/* Microphone Button - Soft & Inviting */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                {/* Ripple effect when listening */}
                {isListening && (
                  <>
                    <div className="absolute inset-0 rounded-full bg-orchid-pastel/30 animate-ping" />
                    <div className="absolute inset-[-8px] rounded-full bg-orchid-pastel/20 animate-pulse" />
                  </>
                )}

                <button
                  onClick={toggleListening}
                  className={`relative w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl ${
                    isListening
                      ? 'bg-gradient-to-br from-orchid-pastel to-sunset-sorbet scale-105'
                      : 'bg-gradient-to-br from-matcha-soft via-azure-mist to-matcha-soft hover:scale-105 hover:shadow-3xl'
                  }`}
                >
                  {isListening ? (
                    <MicOff className="w-14 h-14 text-white" />
                  ) : (
                    <Mic className="w-14 h-14 text-white" />
                  )}
                </button>
              </div>
            </div>

            {/* Voice Status - Gentle & Encouraging */}
            <p className="text-center text-xl text-indigo-dust/60 mb-6">
              {isListening
                ? "I'm listening... take your time 💕"
                : "Tap to talk with me — I'm here for you!"
              }
            </p>

            {/* Quick Voice Commands - Friendly Suggestions */}
            <div className="space-y-4">
              <p className="text-center text-lg text-indigo-dust/50">
                Or you can simply say...
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  { text: "Show my schedule", emoji: "📅" },
                  { text: "Check my medicines", emoji: "💊" },
                  { text: "How's my health?", emoji: "❤️" },
                ].map((command, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickCommand(command.text)}
                    className="px-6 py-4 bg-white hover:bg-pistachio-light/50 rounded-2xl text-lg font-medium text-indigo-dust transition-all hover:scale-105 shadow-sm hover:shadow-md border border-pistachio-light/50"
                  >
                    {command.emoji} "{command.text}"
                  </button>
                ))}
              </div>
            </div>

            {/* Text Input - Gentle Alternative */}
            <div className="mt-8 pt-6 border-t border-peach-cream/30">
              <p className="text-center text-base text-indigo-dust/40 mb-4">
                Prefer typing? That's perfectly fine! 😊
              </p>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={voiceText}
                  onChange={(e) => setVoiceText(e.target.value)}
                  placeholder="Write to me here..."
                  className="flex-1 px-6 py-4 rounded-2xl border-2 border-peach-cream/50 focus:border-matcha-soft focus:ring-4 focus:ring-matcha-soft/20 outline-none text-xl text-indigo-dust placeholder:text-indigo-dust/40 bg-white/80"
                />
                <button className="px-8 py-4 bg-gradient-to-r from-matcha-soft to-azure-mist text-white font-semibold text-lg rounded-2xl hover:shadow-lg transition-all hover:scale-105">
                  Send 💬
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Modules Grid - Cozy Cards */}
        <section>
          <h2 className="text-2xl font-bold text-indigo-dust mb-2">What would you like to do?</h2>
          <p className="text-lg text-indigo-dust/50 mb-6">I'm here to help with anything you need 💕</p>

          <div className="grid grid-cols-2 gap-5">
            {/* Schedule Card */}
            <button
              onClick={() => setShowSchedule(true)}
              className="bg-white rounded-3xl p-8 shadow-md border border-indigo-dust/10 hover:shadow-lg hover:border-azure-mist/50 transition-all text-left group"
            >
              <div className="w-20 h-20 rounded-2xl bg-azure-mist/20 flex items-center justify-center mb-5 group-hover:bg-azure-mist/30 transition-colors">
                <Calendar className="w-10 h-10 text-azure-mist" />
              </div>
              <h3 className="text-2xl font-bold text-indigo-dust mb-2">Schedule</h3>
              <p className="text-lg text-indigo-dust/60">View your daily routine</p>
              <div className="flex items-center gap-2 mt-4 text-azure-mist">
                <span className="text-lg font-medium">Open</span>
                <ChevronRight className="w-6 h-6" />
              </div>
            </button>

            {/* Health Monitor Card */}
            <button
              onClick={() => setShowHealthMonitor(true)}
              className="bg-white rounded-3xl p-8 shadow-md border border-indigo-dust/10 hover:shadow-lg hover:border-orchid-pastel/50 transition-all text-left group"
            >
              <div className="w-20 h-20 rounded-2xl bg-orchid-pastel/20 flex items-center justify-center mb-5 group-hover:bg-orchid-pastel/30 transition-colors">
                <Activity className="w-10 h-10 text-orchid-pastel" />
              </div>
              <h3 className="text-2xl font-bold text-indigo-dust mb-2">Health Monitor</h3>
              <p className="text-lg text-indigo-dust/60">Check your vitals</p>
              <div className="flex items-center gap-2 mt-4 text-orchid-pastel">
                <span className="text-lg font-medium">Open</span>
                <ChevronRight className="w-6 h-6" />
              </div>
            </button>

            {/* Growth Tree Card */}
            <Link
              href="/tree"
              className="bg-white rounded-3xl p-8 shadow-md border border-indigo-dust/10 hover:shadow-lg hover:border-matcha-soft/50 transition-all text-left group"
            >
              <div className="w-20 h-20 rounded-2xl bg-matcha-soft/20 flex items-center justify-center mb-5 group-hover:bg-matcha-soft/30 transition-colors">
                <TreeDeciduous className="w-10 h-10 text-matcha-soft" />
              </div>
              <h3 className="text-2xl font-bold text-indigo-dust mb-2">Growth Tree</h3>
              <p className="text-lg text-indigo-dust/60">Grow together with love</p>
              <div className="flex items-center gap-2 mt-4 text-matcha-soft">
                <span className="text-lg font-medium">Open</span>
                <ChevronRight className="w-6 h-6" />
              </div>
            </Link>

            {/* Med Log Card */}
            <button
              onClick={() => setShowMedLog(true)}
              className="bg-white rounded-3xl p-8 shadow-md border border-indigo-dust/10 hover:shadow-lg hover:border-matcha-soft/50 transition-all text-left group"
            >
              <div className="w-20 h-20 rounded-2xl bg-matcha-soft/20 flex items-center justify-center mb-5 group-hover:bg-matcha-soft/30 transition-colors">
                <Pill className="w-10 h-10 text-matcha-soft" />
              </div>
              <h3 className="text-2xl font-bold text-indigo-dust mb-2">Med Log</h3>
              <p className="text-lg text-indigo-dust/60">Track your medicines</p>
              <div className="flex items-center gap-2 mt-4 text-matcha-soft">
                <span className="text-lg font-medium">Open</span>
                <ChevronRight className="w-6 h-6" />
              </div>
            </button>
          </div>
        </section>

        {/* Emergency Contact */}
        <section className="mt-10">
          <div className="bg-gradient-to-r from-orchid-pastel to-orchid-pastel/80 rounded-3xl p-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2">Need Help?</h3>
                <p className="text-xl opacity-90">Tap to call family member</p>
              </div>
              <button className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
                <Phone className="w-10 h-10" />
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Schedule Modal */}
      {showSchedule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-indigo-dust/40 backdrop-blur-sm" onClick={() => setShowSchedule(false)} />
          <div className="relative bg-white rounded-3xl w-full max-w-lg max-h-[85vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-indigo-dust/10 p-6 rounded-t-3xl">
              <button
                onClick={() => setShowSchedule(false)}
                className="absolute top-4 right-4 w-12 h-12 rounded-xl bg-indigo-dust/5 flex items-center justify-center"
              >
                <X className="w-6 h-6 text-indigo-dust/60" />
              </button>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-azure-mist/20 flex items-center justify-center">
                  <Calendar className="w-7 h-7 text-azure-mist" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-indigo-dust">Today's Schedule</h2>
                  <p className="text-lg text-indigo-dust/60">Your daily routine</p>
                </div>
              </div>
            </div>

            {/* Schedule Content */}
            <div className="p-6 space-y-4">
              {/* Time Sections */}
              {['Morning', 'Afternoon', 'Evening'].map((period) => {
                const periodItems = scheduleItems.filter((item) => {
                  const hour = parseInt(item.time.split(':')[0]);
                  const isPM = item.time.includes('PM');
                  const actualHour = isPM && hour !== 12 ? hour + 12 : hour;
                  if (period === 'Morning') return actualHour < 12;
                  if (period === 'Afternoon') return actualHour >= 12 && actualHour < 17;
                  return actualHour >= 17;
                });

                if (periodItems.length === 0) return null;

                return (
                  <div key={period}>
                    <div className="flex items-center gap-3 mb-3">
                      {period === 'Morning' && <Sun className="w-6 h-6 text-sunset-sorbet" />}
                      {period === 'Afternoon' && <Sunset className="w-6 h-6 text-orchid-pastel" />}
                      {period === 'Evening' && <Moon className="w-6 h-6 text-indigo-dust" />}
                      <h3 className="text-xl font-bold text-indigo-dust">{period}</h3>
                    </div>
                    <div className="space-y-3">
                      {periodItems.map((item) => {
                        const isCompleted = completedTasks.includes(item.id);
                        return (
                          <button
                            key={item.id}
                            onClick={() => markTaskComplete(item.id, item.title)}
                            className={`w-full rounded-2xl p-5 border transition-all text-left ${
                              isCompleted
                                ? 'bg-matcha-soft/20 border-matcha-soft/40'
                                : 'bg-pistachio-light/30 border-matcha-soft/20 hover:border-matcha-soft/40'
                            }`}
                          >
                            <div className="flex items-center gap-4">
                              {/* Icon */}
                              <div
                                className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                                  isCompleted ? 'opacity-50' : ''
                                }`}
                                style={{ backgroundColor: `${item.color}20` }}
                              >
                                <item.icon className="w-7 h-7" style={{ color: item.color }} />
                              </div>

                              {/* Content */}
                              <div className="flex-1">
                                <h4 className={`text-xl font-semibold ${
                                  isCompleted ? 'text-indigo-dust/50 line-through' : 'text-indigo-dust'
                                }`}>
                                  {item.title}
                                </h4>
                                <p className="text-lg text-indigo-dust/60 flex items-center gap-2">
                                  <Clock className="w-5 h-5" />
                                  {item.time}
                                </p>
                              </div>

                              {/* Checkbox on Right */}
                              <div
                                className={`w-12 h-12 rounded-xl flex items-center justify-center border-2 transition-all ${
                                  isCompleted
                                    ? 'bg-matcha-soft border-matcha-soft'
                                    : 'bg-white border-indigo-dust/20'
                                }`}
                              >
                                {isCompleted && <Check className="w-7 h-7 text-white" />}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Health Monitor Modal */}
      {showHealthMonitor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-indigo-dust/40 backdrop-blur-sm" onClick={() => setShowHealthMonitor(false)} />
          <div className="relative bg-white rounded-3xl w-full max-w-lg max-h-[85vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-indigo-dust/10 p-6 rounded-t-3xl">
              <button
                onClick={() => setShowHealthMonitor(false)}
                className="absolute top-4 right-4 w-12 h-12 rounded-xl bg-indigo-dust/5 flex items-center justify-center"
              >
                <X className="w-6 h-6 text-indigo-dust/60" />
              </button>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-orchid-pastel/20 flex items-center justify-center">
                  <Activity className="w-7 h-7 text-orchid-pastel" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-indigo-dust">Health Monitor</h2>
                  <p className="text-lg text-indigo-dust/60">Your vital readings</p>
                </div>
              </div>
            </div>

            {/* Health Content */}
            <div className="p-6 space-y-4">
              {healthData.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 border-2 border-indigo-dust/10"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        item.status === 'normal' ? 'bg-matcha-soft/20' : 'bg-orchid-pastel/20'
                      }`}>
                        <item.icon className={`w-6 h-6 ${
                          item.status === 'normal' ? 'text-matcha-soft' : 'text-orchid-pastel'
                        }`} />
                      </div>
                      <h4 className="text-xl font-semibold text-indigo-dust">{item.label}</h4>
                    </div>
                    <div className={`px-4 py-2 rounded-full text-lg font-medium ${
                      item.status === 'normal'
                        ? 'bg-matcha-soft/15 text-matcha-soft'
                        : 'bg-orchid-pastel/15 text-orchid-pastel'
                    }`}>
                      {item.status === 'normal' ? 'Normal' : 'Alert'}
                    </div>
                  </div>

                  <div className="flex items-end justify-between">
                    <div>
                      <span className="text-4xl font-bold text-indigo-dust">{item.value}</span>
                      <span className="text-xl text-indigo-dust/60 ml-2">{item.unit}</span>
                    </div>
                    <div className="flex items-center gap-2 text-indigo-dust/50">
                      {item.trend === 'up' && <TrendingUp className="w-5 h-5 text-sunset-sorbet" />}
                      {item.trend === 'down' && <TrendingDown className="w-5 h-5 text-matcha-soft" />}
                      {item.trend === 'stable' && <Minus className="w-5 h-5" />}
                      <span className="text-lg">{item.lastUpdated}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Med Log Modal */}
      {showMedLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-indigo-dust/40 backdrop-blur-sm" onClick={() => setShowMedLog(false)} />
          <div className="relative bg-white rounded-3xl w-full max-w-lg max-h-[85vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-indigo-dust/10 p-6 rounded-t-3xl">
              <button
                onClick={() => setShowMedLog(false)}
                className="absolute top-4 right-4 w-12 h-12 rounded-xl bg-indigo-dust/5 flex items-center justify-center"
              >
                <X className="w-6 h-6 text-indigo-dust/60" />
              </button>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-matcha-soft/20 flex items-center justify-center">
                  <Pill className="w-7 h-7 text-matcha-soft" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-indigo-dust">Medicine Log</h2>
                  <p className="text-lg text-indigo-dust/60">Your current medicines</p>
                </div>
              </div>
            </div>

            {/* Med Log Content */}
            <div className="p-6 space-y-5">
              {medicines.map((med, index) => (
                <div
                  key={index}
                  className="bg-pistachio-light/30 rounded-2xl p-6 border border-matcha-soft/20"
                >
                  {/* Medicine Name */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-matcha-soft/20 flex items-center justify-center">
                      <Pill className="w-6 h-6 text-matcha-soft" />
                    </div>
                    <h4 className="text-2xl font-bold text-indigo-dust">{med.name}</h4>
                  </div>

                  {/* Medicine Details */}
                  <div className="space-y-3 mb-5">
                    <div className="flex justify-between items-center py-2 border-b border-indigo-dust/10">
                      <span className="text-lg text-indigo-dust/60">Dosage</span>
                      <span className="text-lg font-medium text-indigo-dust">{med.dosage}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-indigo-dust/10">
                      <span className="text-lg text-indigo-dust/60">Frequency</span>
                      <span className="text-lg font-medium text-indigo-dust">{med.frequency}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-indigo-dust/10">
                      <span className="text-lg text-indigo-dust/60">Duration</span>
                      <span className="text-lg font-medium text-indigo-dust">{med.duration}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-lg text-indigo-dust/60">Timing</span>
                      <div className="flex gap-2">
                        {med.timing.map((time, i) => (
                          <span
                            key={i}
                            className="px-3 py-1.5 bg-white rounded-full text-base font-medium text-indigo-dust"
                          >
                            {time === 'Morning' && '🌅 '}
                            {time === 'Afternoon' && '☀️ '}
                            {time === 'Night' && '🌙 '}
                            {time}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Doctor Info */}
                  <div className="bg-white rounded-xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-azure-mist/20 flex items-center justify-center">
                        <User className="w-5 h-5 text-azure-mist" />
                      </div>
                      <div>
                        <p className="text-lg font-medium text-indigo-dust">{med.doctor}</p>
                        <p className="text-base text-indigo-dust/50">{med.doctorPhone}</p>
                      </div>
                    </div>
                    <button className="w-12 h-12 rounded-xl bg-matcha-soft/20 flex items-center justify-center hover:bg-matcha-soft/30 transition-colors">
                      <Phone className="w-6 h-6 text-matcha-soft" />
                    </button>
                  </div>
                </div>
              ))}

              {/* Vitals Quick View */}
              <div className="mt-6 pt-6 border-t border-indigo-dust/10">
                <h4 className="text-xl font-bold text-indigo-dust mb-4 flex items-center gap-2">
                  <Heart className="w-6 h-6 text-orchid-pastel" />
                  Current Vitals
                </h4>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-white rounded-xl p-4 text-center">
                    <p className="text-base text-indigo-dust/50 mb-1">BP</p>
                    <p className="text-xl font-bold text-indigo-dust">120/80</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 text-center">
                    <p className="text-base text-indigo-dust/50 mb-1">Sugar</p>
                    <p className="text-xl font-bold text-indigo-dust">95</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 text-center">
                    <p className="text-base text-indigo-dust/50 mb-1">Pulse</p>
                    <p className="text-xl font-bold text-indigo-dust">72</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Task Completed Notification Toast */}
      {notificationSent && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-4">
          <div className="bg-matcha-soft text-white px-8 py-5 rounded-2xl shadow-2xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
              <Send className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xl font-semibold">{notificationSent}</p>
              <p className="text-base opacity-80">Your family has been updated</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
