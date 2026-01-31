'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Heart,
  Footprints,
  Moon,
  Droplets,
  Pill,
  Check,
  Bell,
  Home,
  User,
  Users,
  TreeDeciduous,
  ChevronRight,
  Calendar,
  Stethoscope,
  Quote,
  Sparkles,
  Activity,
  Clock,
  Star,
} from 'lucide-react';

export default function Dashboard() {
  const [activeNav, setActiveNav] = useState('dashboard');

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const schedule = [
    { time: '7:00 AM', label: 'Morning Vitamins', type: 'medicine', status: 'completed', color: '#D48A96' },
    { time: '8:00 AM', label: 'Blood Pressure Check', type: 'health', status: 'completed', color: '#7FB9BE' },
    { time: '9:30 AM', label: 'Breakfast', type: 'meal', status: 'completed', color: '#E59A4F' },
    { time: '12:00 PM', label: 'Calcium Supplement', type: 'medicine', status: 'upcoming', color: '#D48A96' },
    { time: '1:00 PM', label: 'Lunch', type: 'meal', status: 'upcoming', color: '#E59A4F' },
    { time: '3:00 PM', label: 'Afternoon Walk', type: 'activity', status: 'upcoming', color: '#8FAF9A' },
    { time: '6:00 PM', label: 'Evening Medicine', type: 'medicine', status: 'upcoming', color: '#D48A96' },
    { time: '9:00 PM', label: 'Night Medication', type: 'medicine', status: 'upcoming', color: '#7FB9BE' },
  ];

  const healthWidgets = [
    { label: 'Heart Rate', value: '72', unit: 'bpm', icon: Heart, color: '#D48A96', bg: 'bg-gradient-to-br from-orchid-pastel/20 to-peach-cream/20' },
    { label: 'Steps', value: '4,280', unit: 'steps', icon: Footprints, color: '#8FAF9A', bg: 'bg-gradient-to-br from-matcha-soft/20 to-pistachio-light/30' },
    { label: 'Sleep', value: '7.5', unit: 'hours', icon: Moon, color: '#364A5A', bg: 'bg-gradient-to-br from-indigo-dust/10 to-azure-mist/15' },
    { label: 'Water', value: '6', unit: 'glasses', icon: Droplets, color: '#7FB9BE', bg: 'bg-gradient-to-br from-azure-mist/20 to-matcha-soft/15' },
    { label: 'Calories', value: '1,450', unit: 'kcal', icon: Activity, color: '#E59A4F', bg: 'bg-gradient-to-br from-sunset-sorbet/20 to-peach-cream/25' },
    { label: 'Activity', value: '45', unit: 'min', icon: Star, color: '#D48A96', bg: 'bg-gradient-to-br from-orchid-pastel/15 to-azure-mist/15' },
  ];

  const medicines = [
    { name: 'Vitamin D3', dosage: '1000 IU', time: '7:00 AM', status: 'taken', icon: '☀️' },
    { name: 'Omega-3', dosage: '1 capsule', time: '7:00 AM', status: 'taken', icon: '🐟' },
    { name: 'Calcium', dosage: '500mg', time: '12:00 PM', status: 'pending', icon: '🦴' },
    { name: 'Blood Pressure', dosage: '1 tablet', time: '6:00 PM', status: 'pending', icon: '❤️' },
    { name: 'Melatonin', dosage: '3mg', time: '9:00 PM', status: 'pending', icon: '🌙' },
  ];

  const navItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard', color: '#8FAF9A', href: '/dashboard' },
    { id: 'medicine', icon: Stethoscope, label: 'Medicine & Doctor', color: '#D48A96', href: '/medicine' },
    { id: 'family', icon: Users, label: 'Family', color: '#E59A4F', href: '/family' },
    { id: 'tree', icon: TreeDeciduous, label: 'Tree', color: '#8FAF9A', href: '/tree' },
  ];

  const familyMembers = [
    { name: 'Robert', relation: 'Husband', emoji: '👨‍🦳', color: '#7FB9BE', status: 'All good' },
    { name: 'Sarah', relation: 'Daughter', emoji: '👩', color: '#D48A96', status: 'Checkup due' },
    { name: 'Tom', relation: 'Son', emoji: '👨', color: '#8FAF9A', status: 'All good' },
  ];

  const quotes = [
    { text: "Taking care of yourself is the most powerful way to take care of others.", author: "Unknown" },
    { text: "Every small step towards health is a giant leap for your wellbeing.", author: "Nurtura" },
    { text: "Your health is an investment, not an expense.", author: "Unknown" },
  ];

  const randomQuote = quotes[0];

  return (
    <div className="min-h-screen bg-warm-beige flex">
      {/* Main Content Area */}
      <main className="flex-1 pr-80">
        <div className="max-w-6xl mx-auto px-8 py-8">

          {/* Bot Greeting Section */}
          <section className="mb-6">
            <div className="bg-gradient-to-r from-azure-mist/20 via-orchid-pastel/15 to-sunset-sorbet/20 rounded-3xl p-6 border border-azure-mist/20 shadow-sm">
              <div className="flex items-start gap-5">
                {/* Bot Avatar */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-azure-mist to-orchid-pastel flex items-center justify-center shadow-lg">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className="text-2xl font-bold text-indigo-dust">
                      Good morning, Margaret!
                    </h1>
                    <span className="text-2xl">👋</span>
                  </div>
                  <p className="text-indigo-dust/70 text-lg">
                    You're doing great! 3 tasks completed today.
                  </p>
                  <p className="text-indigo-dust/50 text-sm mt-1 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {formattedDate}
                  </p>
                </div>

                {/* Quick Stats */}
                <div className="flex gap-3">
                  <div className="text-center px-4 py-2 bg-white/70 rounded-xl border border-matcha-soft/30">
                    <p className="text-2xl font-bold text-matcha-soft">3</p>
                    <p className="text-xs text-indigo-dust/50">Done</p>
                  </div>
                  <div className="text-center px-4 py-2 bg-white/70 rounded-xl border border-azure-mist/30">
                    <p className="text-2xl font-bold text-azure-mist">5</p>
                    <p className="text-xs text-indigo-dust/50">Pending</p>
                  </div>
                  <div className="text-center px-4 py-2 bg-white/70 rounded-xl border border-orchid-pastel/30">
                    <p className="text-2xl font-bold text-orchid-pastel">2</p>
                    <p className="text-xs text-indigo-dust/50">Medicines</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Reminders Section */}
          <section className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-indigo-dust flex items-center gap-2">
                <Bell className="w-5 h-5 text-sunset-sorbet" />
                Upcoming Reminders
              </h2>
              <button className="flex items-center gap-2 px-4 py-2 bg-sunset-sorbet/10 text-sunset-sorbet font-medium rounded-xl hover:bg-sunset-sorbet/20 transition-all">
                <Clock className="w-4 h-4" />
                View All
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {/* Your Reminder */}
              <div className="bg-gradient-to-br from-orchid-pastel/20 to-peach-cream/30 rounded-2xl p-4 border border-orchid-pastel/20 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-orchid-pastel/30 flex items-center justify-center">
                    <Pill className="w-4 h-4 text-orchid-pastel" />
                  </div>
                  <span className="text-xs font-medium text-white bg-orchid-pastel px-2 py-0.5 rounded-full">
                    In 45 min
                  </span>
                </div>
                <h4 className="font-semibold text-indigo-dust mb-1">Calcium Supplement</h4>
                <p className="text-indigo-dust/60 text-sm">500mg • Take with lunch</p>
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-orchid-pastel/20">
                  <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-xs">
                    👩‍🦳
                  </div>
                  <span className="text-xs text-indigo-dust/60">You</span>
                </div>
              </div>

              {/* Robert's Reminder */}
              <div className="bg-gradient-to-br from-azure-mist/20 to-matcha-soft/20 rounded-2xl p-4 border border-azure-mist/20 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-azure-mist/30 flex items-center justify-center">
                    <Stethoscope className="w-4 h-4 text-azure-mist" />
                  </div>
                  <span className="text-xs font-medium text-white bg-azure-mist px-2 py-0.5 rounded-full">
                    In 2 hours
                  </span>
                </div>
                <h4 className="font-semibold text-indigo-dust mb-1">Doctor Appointment</h4>
                <p className="text-indigo-dust/60 text-sm">Dr. Smith • Cardiology</p>
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-azure-mist/20">
                  <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-xs">
                    👨‍🦳
                  </div>
                  <span className="text-xs text-indigo-dust/60">Robert (Husband)</span>
                </div>
              </div>

              {/* Sarah's Message */}
              <div className="bg-gradient-to-br from-sunset-sorbet/20 to-peach-cream/30 rounded-2xl p-4 border border-sunset-sorbet/20 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-sunset-sorbet/30 flex items-center justify-center">
                    <Heart className="w-4 h-4 text-sunset-sorbet" />
                  </div>
                  <span className="text-xs font-medium text-white bg-sunset-sorbet px-2 py-0.5 rounded-full">
                    Message
                  </span>
                </div>
                <h4 className="font-semibold text-indigo-dust mb-1">"Mom, don't forget your medicines!"</h4>
                <p className="text-indigo-dust/60 text-sm">Sent with love 💕</p>
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-sunset-sorbet/20">
                  <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-xs">
                    👩
                  </div>
                  <span className="text-xs text-indigo-dust/60">Sarah (Daughter)</span>
                </div>
              </div>
            </div>
          </section>

          {/* Main Grid */}
          <div className="grid grid-cols-3 gap-6">

            {/* Daily Schedule */}
            <section className="col-span-2">
              <div className="bg-white rounded-3xl border border-matcha-soft/20 shadow-sm overflow-hidden">
                <div className="px-6 py-4 bg-gradient-to-r from-matcha-soft/15 via-azure-mist/10 to-sunset-sorbet/10 border-b border-matcha-soft/15">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-indigo-dust">Today's Schedule</h2>
                      <p className="text-indigo-dust/50 text-sm">Your personalized health timeline</p>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white text-indigo-dust font-medium rounded-xl border border-matcha-soft/30 hover:border-matcha-soft transition-all shadow-sm">
                      <Calendar className="w-4 h-4 text-matcha-soft" />
                      Full Calendar
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <div className="space-y-2">
                    {schedule.map((item, index) => (
                      <div
                        key={index}
                        className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${
                          item.status === 'completed'
                            ? 'bg-peach-cream/30 opacity-60'
                            : 'hover:bg-peach-cream/20 cursor-pointer'
                        }`}
                      >
                        {/* Colored indicator */}
                        <div
                          className="w-1.5 h-12 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />

                        {/* Status icon */}
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                            item.status === 'completed' ? 'bg-matcha-soft' : ''
                          }`}
                          style={{
                            backgroundColor: item.status === 'completed' ? '#7FB9BE' : `${item.color}20`,
                          }}
                        >
                          {item.status === 'completed' ? (
                            <Check className="w-5 h-5 text-white" strokeWidth={3} />
                          ) : (
                            <Clock className="w-5 h-5" style={{ color: item.color }} />
                          )}
                        </div>

                        {/* Time */}
                        <div className="w-20">
                          <span className={`text-sm font-semibold ${
                            item.status === 'completed' ? 'text-indigo-dust/40' : 'text-indigo-dust'
                          }`}>
                            {item.time}
                          </span>
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <p className={`font-medium ${
                            item.status === 'completed' ? 'text-indigo-dust/50 line-through' : 'text-indigo-dust'
                          }`}>
                            {item.label}
                          </p>
                          <span
                            className="inline-block px-2 py-0.5 text-xs font-medium rounded-md mt-1"
                            style={{ backgroundColor: `${item.color}20`, color: item.color }}
                          >
                            {item.type}
                          </span>
                        </div>

                        {/* Action */}
                        {item.status === 'upcoming' && (
                          <button
                            className="px-4 py-2 text-white text-sm font-medium rounded-xl transition-all hover:shadow-lg"
                            style={{ backgroundColor: item.color }}
                          >
                            Mark Done
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Right Column */}
            <div className="space-y-6">

              {/* Health Widgets */}
              <section>
                <h3 className="text-lg font-bold text-indigo-dust mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-matcha-soft" />
                  Health Vitals
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {healthWidgets.map((widget) => {
                    const Icon = widget.icon;
                    return (
                      <div
                        key={widget.label}
                        className={`${widget.bg} rounded-2xl p-4 border border-indigo-dust/10 hover:border-indigo-dust/20 transition-all cursor-pointer shadow-sm`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Icon className="w-5 h-5" style={{ color: widget.color }} />
                          <span className="text-xs font-medium text-indigo-dust/60">{widget.label}</span>
                        </div>
                        <p className="text-xl font-bold" style={{ color: widget.color }}>
                          {widget.value}
                          {widget.unit && (
                            <span className="text-sm font-normal text-indigo-dust/40 ml-1">
                              {widget.unit}
                            </span>
                          )}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Medicine Checklist */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-indigo-dust flex items-center gap-2">
                    <Pill className="w-5 h-5 text-orchid-pastel" />
                    Medicines
                  </h3>
                  <span className="px-3 py-1 bg-matcha-soft/20 text-matcha-soft text-sm font-medium rounded-full">
                    {medicines.filter(m => m.status === 'taken').length}/{medicines.length}
                  </span>
                </div>

                <div className="space-y-2">
                  {medicines.map((med, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-3 p-3 rounded-2xl border-2 transition-all ${
                        med.status === 'taken'
                          ? 'bg-matcha-soft/10 border-matcha-soft/30'
                          : 'bg-white border-matcha-soft/20 hover:border-orchid-pastel/50'
                      }`}
                    >
                      <span className="text-xl">{med.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className={`font-medium text-sm ${
                          med.status === 'taken' ? 'text-indigo-dust/50 line-through' : 'text-indigo-dust'
                        }`}>
                          {med.name}
                        </p>
                        <p className="text-indigo-dust/40 text-xs">{med.time}</p>
                      </div>
                      <button
                        className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
                          med.status === 'taken'
                            ? 'bg-matcha-soft'
                            : 'border-2 border-matcha-soft/30 hover:border-orchid-pastel hover:bg-orchid-pastel/10'
                        }`}
                      >
                        {med.status === 'taken' && (
                          <Check className="w-4 h-4 text-white" strokeWidth={3} />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>

          {/* Quote Section */}
          <section className="mt-6">
            <div className="bg-gradient-to-r from-matcha-soft/20 via-azure-mist/15 to-orchid-pastel/20 rounded-3xl p-8 border border-matcha-soft/20 shadow-sm">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-matcha-soft to-azure-mist flex items-center justify-center shadow-md">
                  <Quote className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-lg text-indigo-dust font-medium italic leading-relaxed">
                    "{randomQuote.text}"
                  </p>
                  <p className="text-indigo-dust/60 mt-2 text-sm flex items-center gap-2">
                    <Star className="w-4 h-4 text-sunset-sorbet" fill="#E59A4F" />
                    Daily inspiration from Nurtura
                  </p>
                </div>
                <div className="text-4xl">🌿</div>
              </div>
            </div>
          </section>

        </div>
      </main>

      {/* Right Navigation Panel */}
      <nav className="fixed right-0 top-0 bottom-0 w-80 bg-white border-l border-indigo-dust/10 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-indigo-dust/5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-matcha-soft via-azure-mist to-orchid-pastel flex items-center justify-center shadow-lg">
              <TreeDeciduous className="w-7 h-7 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold text-indigo-dust">Nurtura</span>
              <p className="text-xs text-indigo-dust/50">Family Health Hub</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 p-4 overflow-y-auto">
          <p className="text-xs font-semibold text-indigo-dust/40 uppercase tracking-wider mb-3 px-3">
            Menu
          </p>
          <div className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setActiveNav(item.id)}
                  className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all ${
                    isActive
                      ? 'text-white shadow-lg'
                      : 'text-indigo-dust/70 hover:bg-peach-cream/30'
                  }`}
                  style={{
                    backgroundColor: isActive ? item.color : undefined,
                    boxShadow: isActive ? `0 10px 30px ${item.color}40` : undefined,
                  }}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                  {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                </Link>
              );
            })}
          </div>

          {/* Family Section */}
          <div className="mt-8">
            <p className="text-xs font-semibold text-indigo-dust/40 uppercase tracking-wider mb-3 px-3">
              Family Members
            </p>
            <div className="space-y-2">
              {familyMembers.map((member, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-2xl hover:bg-white transition-colors cursor-pointer"
                  style={{ backgroundColor: `${member.color}10` }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                    style={{ backgroundColor: `${member.color}30` }}
                  >
                    {member.emoji}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-indigo-dust text-sm">{member.name}</p>
                    <p className="text-xs text-indigo-dust/50">{member.relation}</p>
                  </div>
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: member.status === 'All good' ? '#8FAF9A' : '#E59A4F' }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* User Profile */}
        <div className="p-4 border-t border-indigo-dust/5 bg-gradient-to-t from-peach-cream/30 to-white">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-orchid-pastel/15 via-azure-mist/10 to-matcha-soft/15 border border-orchid-pastel/20">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orchid-pastel to-azure-mist flex items-center justify-center shadow-md">
                <span className="text-2xl">👩‍🦳</span>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-indigo-dust text-lg">Margaret Wilson</p>
                <p className="text-indigo-dust/60 text-sm flex items-center gap-1">
                  <Star className="w-3 h-3 text-sunset-sorbet" fill="#E59A4F" />
                  Premium Member
                </p>
              </div>
            </div>

            <div className="space-y-2 pt-3 border-t border-indigo-dust/10">
              <div className="flex items-center justify-between">
                <span className="text-xs text-indigo-dust/50">Age</span>
                <span className="text-sm font-medium text-indigo-dust">68 years</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-indigo-dust/50">Blood Type</span>
                <span className="text-sm font-medium text-indigo-dust">O+</span>
              </div>
              <div className="pt-2">
                <span className="text-xs text-indigo-dust/50">Health Conditions</span>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  <span className="px-2 py-1 bg-orchid-pastel/25 text-orchid-pastel text-xs font-medium rounded-lg">
                    Hypertension
                  </span>
                  <span className="px-2 py-1 bg-azure-mist/25 text-azure-mist text-xs font-medium rounded-lg">
                    Diabetes Type 2
                  </span>
                  <span className="px-2 py-1 bg-sunset-sorbet/20 text-sunset-sorbet text-xs font-medium rounded-lg">
                    Arthritis
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
