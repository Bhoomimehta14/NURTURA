'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Pill,
  Stethoscope,
  Heart,
  Activity,
  TrendingUp,
  TrendingDown,
  Minus,
  Upload,
  Send,
  Camera,
  FileText,
  MessageCircle,
  ChevronRight,
  ArrowLeft,
  Calendar,
  Clock,
  User,
  History,
  Droplets,
  Scale,
  Thermometer,
} from 'lucide-react';

export default function MedicinePage() {
  const router = useRouter();
  const [chatMessage, setChatMessage] = useState('');
  const [showHealthHistory, setShowHealthHistory] = useState(false);

  const medicines = [
    {
      name: 'Metformin',
      dosage: '500mg, twice daily',
      purpose: 'For blood sugar control',
      status: 'ongoing',
      prescribedBy: 'Dr. Sharma',
    },
    {
      name: 'Amlodipine',
      dosage: '5mg, once daily (morning)',
      purpose: 'For blood pressure',
      status: 'ongoing',
      prescribedBy: 'Dr. Patel',
    },
    {
      name: 'Vitamin D3',
      dosage: '60,000 IU, weekly',
      purpose: 'For bone health',
      status: 'ending',
      prescribedBy: 'Dr. Sharma',
    },
    {
      name: 'Aspirin',
      dosage: '75mg, once daily',
      purpose: 'For heart protection',
      status: 'ongoing',
      prescribedBy: 'Dr. Patel',
    },
  ];

  const doctors = [
    {
      name: 'Dr. Anita Sharma',
      specialty: 'Endocrinologist',
      lastVisit: 'Jan 15, 2026',
      nextVisit: 'Apr 15, 2026',
      color: '#D48A96',
    },
    {
      name: 'Dr. Rajesh Patel',
      specialty: 'Cardiologist',
      lastVisit: 'Dec 20, 2025',
      nextVisit: 'Mar 20, 2026',
      color: '#7FB9BE',
    },
    {
      name: 'Dr. Meena Gupta',
      specialty: 'General Physician',
      lastVisit: 'Jan 28, 2026',
      nextVisit: 'Feb 28, 2026',
      color: '#8FAF9A',
    },
  ];

  const vitals = [
    {
      name: 'Blood Sugar',
      icon: Droplets,
      current: '142',
      unit: 'mg/dL',
      trend: 'down',
      change: '-12%',
      status: 'improving',
      color: '#E59A4F',
      data: [180, 165, 158, 150, 148, 142],
    },
    {
      name: 'Blood Pressure',
      icon: Heart,
      current: '128/82',
      unit: 'mmHg',
      trend: 'stable',
      change: '0%',
      status: 'stable',
      color: '#D48A96',
      data: [130, 128, 132, 129, 127, 128],
    },
    {
      name: 'Weight',
      icon: Scale,
      current: '68',
      unit: 'kg',
      trend: 'down',
      change: '-2kg',
      status: 'improving',
      color: '#8FAF9A',
      data: [72, 71, 70, 69, 68.5, 68],
    },
    {
      name: 'Heart Rate',
      icon: Activity,
      current: '72',
      unit: 'bpm',
      trend: 'stable',
      change: '',
      status: 'normal',
      color: '#7FB9BE',
      data: [75, 73, 74, 72, 71, 72],
    },
  ];

  const healthHistory = [
    {
      condition: 'Blood Sugar',
      insight: 'Improved by 12% in the last 3 months',
      status: 'improved',
      details: 'Your fasting sugar levels have consistently decreased. Keep following your diet plan.',
    },
    {
      condition: 'Blood Pressure',
      insight: 'Stable and within normal range',
      status: 'stable',
      details: 'Your BP has remained consistent. Continue your current medication routine.',
    },
    {
      condition: 'Weight',
      insight: 'Lost 4kg in the last 3 months',
      status: 'improved',
      details: 'Great progress! Your weight loss is helping improve overall health markers.',
    },
    {
      condition: 'Cholesterol',
      insight: 'Slightly elevated, needs attention',
      status: 'attention',
      details: 'LDL levels are slightly above normal. Consider dietary changes and discuss with your doctor.',
    },
  ];

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <TrendingUp className="w-4 h-4" />;
    if (trend === 'down') return <TrendingDown className="w-4 h-4" />;
    return <Minus className="w-4 h-4" />;
  };

  const getStatusColor = (status: string) => {
    if (status === 'ongoing') return 'bg-matcha-soft text-white';
    if (status === 'ending') return 'bg-sunset-sorbet text-white';
    return 'bg-gray-200 text-gray-600';
  };

  const getInsightColor = (status: string) => {
    if (status === 'improved') return 'text-matcha-soft bg-matcha-soft/15';
    if (status === 'stable') return 'text-azure-mist bg-azure-mist/15';
    if (status === 'attention') return 'text-sunset-sorbet bg-sunset-sorbet/15';
    return 'text-indigo-dust bg-indigo-dust/10';
  };

  return (
    <div className="min-h-screen bg-warm-beige">
      {/* Header */}
      <header className="bg-white border-b border-indigo-dust/10 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-orchid-pastel/20 to-azure-mist/20 flex items-center justify-center hover:from-orchid-pastel/30 hover:to-azure-mist/30 transition-all"
            >
              <ArrowLeft className="w-5 h-5 text-indigo-dust" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-indigo-dust">Medicine & Doctors</h1>
              <p className="text-indigo-dust/50 text-sm">Manage your health journey</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-2 gap-8">
          {/* Left Side - Medicines & Doctors */}
          <div className="space-y-6">
            {/* Ongoing Medicines */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orchid-pastel to-sunset-sorbet flex items-center justify-center">
                  <Pill className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-indigo-dust">Ongoing Medicines</h2>
                  <p className="text-indigo-dust/50 text-sm">Your current prescriptions</p>
                </div>
              </div>

              <div className="space-y-3">
                {medicines.map((med, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-4 border border-indigo-dust/10 shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-indigo-dust">{med.name}</h3>
                        <p className="text-indigo-dust/60 text-sm">{med.dosage}</p>
                      </div>
                      <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${getStatusColor(med.status)}`}>
                        {med.status === 'ongoing' ? '🟢 Ongoing' : '🟡 Ending Soon'}
                      </span>
                    </div>
                    <p className="text-indigo-dust/50 text-sm mb-2">{med.purpose}</p>
                    <div className="flex items-center gap-2 pt-2 border-t border-indigo-dust/5">
                      <User className="w-3.5 h-3.5 text-indigo-dust/40" />
                      <span className="text-xs text-indigo-dust/50">Prescribed by {med.prescribedBy}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Prescribing Doctors */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-azure-mist to-matcha-soft flex items-center justify-center">
                  <Stethoscope className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-indigo-dust">Your Doctors</h2>
                  <p className="text-indigo-dust/50 text-sm">Healthcare providers</p>
                </div>
              </div>

              <div className="space-y-3">
                {doctors.map((doc, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-4 border border-indigo-dust/10 shadow-sm hover:shadow-md transition-all cursor-pointer"
                    style={{ borderLeftWidth: '4px', borderLeftColor: doc.color }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold"
                        style={{ backgroundColor: doc.color }}
                      >
                        {doc.name.split(' ')[1][0]}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-indigo-dust">{doc.name}</h3>
                        <p className="text-indigo-dust/60 text-sm">{doc.specialty}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-indigo-dust/30" />
                    </div>
                    <div className="flex items-center gap-4 mt-3 pt-3 border-t border-indigo-dust/5">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-indigo-dust/40" />
                        <span className="text-xs text-indigo-dust/50">Last: {doc.lastVisit}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-matcha-soft" />
                        <span className="text-xs text-matcha-soft font-medium">Next: {doc.nextVisit}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Side - Vitals & Health History */}
          <div className="space-y-6">
            {/* Vitals Overview */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-matcha-soft to-azure-mist flex items-center justify-center">
                  <Activity className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-indigo-dust">Vitals Overview</h2>
                  <p className="text-indigo-dust/50 text-sm">Last 3 months trends</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {vitals.map((vital, index) => {
                  const Icon = vital.icon;
                  return (
                    <div
                      key={index}
                      className="bg-white rounded-2xl p-4 border border-indigo-dust/10 shadow-sm"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: `${vital.color}20` }}
                          >
                            <Icon className="w-4 h-4" style={{ color: vital.color }} />
                          </div>
                          <span className="text-sm font-medium text-indigo-dust">{vital.name}</span>
                        </div>
                        <div
                          className={`flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${
                            vital.trend === 'down' && vital.status === 'improving'
                              ? 'bg-matcha-soft/15 text-matcha-soft'
                              : vital.trend === 'stable'
                              ? 'bg-azure-mist/15 text-azure-mist'
                              : 'bg-sunset-sorbet/15 text-sunset-sorbet'
                          }`}
                        >
                          {getTrendIcon(vital.trend)}
                          {vital.change}
                        </div>
                      </div>

                      <div className="mb-3">
                        <span className="text-2xl font-bold" style={{ color: vital.color }}>
                          {vital.current}
                        </span>
                        <span className="text-indigo-dust/40 text-sm ml-1">{vital.unit}</span>
                      </div>

                      {/* Mini Sparkline */}
                      <div className="h-10 flex items-end gap-1">
                        {vital.data.map((val, i) => {
                          const max = Math.max(...vital.data);
                          const min = Math.min(...vital.data);
                          const height = ((val - min) / (max - min)) * 100 || 50;
                          return (
                            <div
                              key={i}
                              className="flex-1 rounded-t transition-all"
                              style={{
                                height: `${Math.max(height, 20)}%`,
                                backgroundColor: i === vital.data.length - 1 ? vital.color : `${vital.color}40`,
                              }}
                            />
                          );
                        })}
                      </div>
                      <p className="text-xs text-indigo-dust/40 mt-2 text-center">Last 3 months</p>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Health History Box */}
            <section>
              <button
                onClick={() => setShowHealthHistory(!showHealthHistory)}
                className="w-full bg-gradient-to-r from-orchid-pastel/20 via-azure-mist/15 to-matcha-soft/20 rounded-2xl p-5 border border-orchid-pastel/20 shadow-sm hover:shadow-md transition-all text-left"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orchid-pastel to-azure-mist flex items-center justify-center">
                      <History className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-indigo-dust">Health History</h3>
                      <p className="text-indigo-dust/50 text-sm">View insights & progress</p>
                    </div>
                  </div>
                  <ChevronRight
                    className={`w-6 h-6 text-indigo-dust/40 transition-transform ${
                      showHealthHistory ? 'rotate-90' : ''
                    }`}
                  />
                </div>
              </button>

              {/* Health History Expanded */}
              {showHealthHistory && (
                <div className="mt-4 space-y-3 animate-in slide-in-from-top-2">
                  {healthHistory.map((item, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-2xl p-4 border border-indigo-dust/10 shadow-sm"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-indigo-dust">{item.condition}</h4>
                        <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${getInsightColor(item.status)}`}>
                          {item.status === 'improved' && '📈 Improved'}
                          {item.status === 'stable' && '➡️ Stable'}
                          {item.status === 'attention' && '⚠️ Needs Attention'}
                        </span>
                      </div>
                      <p className="text-indigo-dust/70 text-sm font-medium mb-1">{item.insight}</p>
                      <p className="text-indigo-dust/50 text-sm">{item.details}</p>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        </div>

        {/* Bottom Section - Smart Chat Box */}
        <section className="mt-8">
          <div className="bg-white rounded-3xl border border-indigo-dust/10 shadow-sm overflow-hidden">
            <div className="px-6 py-4 bg-gradient-to-r from-azure-mist/15 via-orchid-pastel/10 to-sunset-sorbet/15 border-b border-indigo-dust/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-azure-mist to-orchid-pastel flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-indigo-dust">Health Assistant</h2>
                  <p className="text-indigo-dust/50 text-sm">Upload reports, ask questions, get guidance</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              {/* Quick Actions */}
              <div className="flex gap-3 mb-4">
                <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-orchid-pastel/20 to-peach-cream/30 text-orchid-pastel font-medium rounded-xl hover:from-orchid-pastel/30 hover:to-peach-cream/40 transition-all border border-orchid-pastel/20">
                  <Camera className="w-4 h-4" />
                  Upload Prescription
                </button>
                <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-azure-mist/20 to-matcha-soft/20 text-azure-mist font-medium rounded-xl hover:from-azure-mist/30 hover:to-matcha-soft/30 transition-all border border-azure-mist/20">
                  <FileText className="w-4 h-4" />
                  Upload Report
                </button>
                <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-sunset-sorbet/20 to-peach-cream/30 text-sunset-sorbet font-medium rounded-xl hover:from-sunset-sorbet/30 hover:to-peach-cream/40 transition-all border border-sunset-sorbet/20">
                  <Upload className="w-4 h-4" />
                  Upload Vitals
                </button>
              </div>

              {/* Sample Response */}
              <div className="bg-gradient-to-br from-matcha-soft/10 to-azure-mist/10 rounded-2xl p-4 mb-4 border border-matcha-soft/20">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-matcha-soft to-azure-mist flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-indigo-dust/80 text-sm leading-relaxed">
                      Hello Margaret! Based on your recent records, your blood sugar levels have been improving steadily.
                      Here are some tips to maintain this progress:
                    </p>
                    <ul className="mt-2 space-y-1 text-sm text-indigo-dust/70">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-matcha-soft"></span>
                        Continue your low-sugar diet plan
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-azure-mist"></span>
                        Stay hydrated with 8-10 glasses of water daily
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-orchid-pastel"></span>
                        Your next checkup with Dr. Sharma is in 2 months
                      </li>
                    </ul>
                    <p className="mt-3 text-xs text-indigo-dust/50 italic">
                      💡 This is general guidance. Please consult your doctor for medical advice.
                    </p>
                  </div>
                </div>
              </div>

              {/* Chat Input */}
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    placeholder="Ask about your health, medicines, or upload a report..."
                    className="w-full px-4 py-3 pr-12 rounded-xl border border-indigo-dust/20 focus:border-azure-mist focus:ring-2 focus:ring-azure-mist/20 outline-none transition-all text-indigo-dust placeholder:text-indigo-dust/40"
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-indigo-dust/5 flex items-center justify-center hover:bg-indigo-dust/10 transition-all">
                    <Upload className="w-4 h-4 text-indigo-dust/50" />
                  </button>
                </div>
                <button className="px-5 py-3 bg-gradient-to-r from-azure-mist to-orchid-pastel text-white font-medium rounded-xl hover:shadow-lg transition-all flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  Send
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
