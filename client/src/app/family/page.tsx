'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Heart,
  ArrowLeft,
  Plus,
  Edit3,
  X,
  Check,
  Clock,
  AlertCircle,
  Send,
  Sun,
  Sunset,
  Moon,
  User,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  emoji: string;
  color: string;
  status: 'all-taken' | 'due' | 'missed';
  statusText: string;
  phone?: string;
  medications: {
    time: 'morning' | 'afternoon' | 'night';
    name: string;
    dosage: string;
    status: 'taken' | 'due' | 'missed';
    takenAt?: string;
  }[];
}

export default function FamilyPage() {
  const router = useRouter();
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null);
  const [showAddMember, setShowAddMember] = useState(false);
  const [reminderSent, setReminderSent] = useState<string | null>(null);

  const familyMembers: FamilyMember[] = [
    {
      id: '1',
      name: 'Mom',
      relation: 'Mother',
      emoji: '👩‍🦳',
      color: '#D48A96',
      status: 'due',
      statusText: '1 medicine due',
      phone: '+91 98765 43210',
      medications: [
        { time: 'morning', name: 'Metformin', dosage: '500mg', status: 'taken', takenAt: '8:15 AM' },
        { time: 'morning', name: 'Vitamin D', dosage: '1 tablet', status: 'taken', takenAt: '8:15 AM' },
        { time: 'afternoon', name: 'Calcium', dosage: '500mg', status: 'due' },
        { time: 'night', name: 'BP Medicine', dosage: '5mg', status: 'due' },
      ],
    },
    {
      id: '2',
      name: 'Dad',
      relation: 'Father',
      emoji: '👨‍🦳',
      color: '#7FB9BE',
      status: 'missed',
      statusText: '1 medicine missed',
      phone: '+91 98765 43211',
      medications: [
        { time: 'morning', name: 'Heart Medicine', dosage: '1 tablet', status: 'taken', takenAt: '7:30 AM' },
        { time: 'morning', name: 'Aspirin', dosage: '75mg', status: 'missed' },
        { time: 'night', name: 'Cholesterol', dosage: '10mg', status: 'due' },
      ],
    },
    {
      id: '3',
      name: 'Grandma',
      relation: 'Grandmother',
      emoji: '👵',
      color: '#E59A4F',
      status: 'all-taken',
      statusText: 'All medicines taken',
      phone: '+91 98765 43212',
      medications: [
        { time: 'morning', name: 'Thyroid', dosage: '50mcg', status: 'taken', takenAt: '6:00 AM' },
        { time: 'afternoon', name: 'Vitamin B12', dosage: '1 tablet', status: 'taken', takenAt: '1:00 PM' },
      ],
    },
    {
      id: '4',
      name: 'Uncle Raj',
      relation: 'Uncle',
      emoji: '👨',
      color: '#8FAF9A',
      status: 'due',
      statusText: '2 medicines due',
      phone: '+91 98765 43213',
      medications: [
        { time: 'morning', name: 'Diabetes Medicine', dosage: '500mg', status: 'taken', takenAt: '8:00 AM' },
        { time: 'afternoon', name: 'Pain Relief', dosage: '1 tablet', status: 'due' },
        { time: 'night', name: 'Sleep Aid', dosage: '3mg', status: 'due' },
      ],
    },
  ];

  const quickReminders = [
    "Please take your medicine 💊",
    "Don't forget your evening dose 🌙",
    "Time for your afternoon medicine ☀️",
    "Sending love and a gentle reminder 💕",
    "Your health matters to us 🤗",
  ];

  const getStatusColor = (status: string) => {
    if (status === 'all-taken') return 'bg-matcha-soft/15 text-matcha-soft border-matcha-soft/30';
    if (status === 'due') return 'bg-sunset-sorbet/15 text-sunset-sorbet border-sunset-sorbet/30';
    if (status === 'missed') return 'bg-orchid-pastel/15 text-orchid-pastel border-orchid-pastel/30';
    return 'bg-gray-100 text-gray-600 border-gray-200';
  };

  const getStatusIcon = (status: string) => {
    if (status === 'all-taken') return <Check className="w-3.5 h-3.5" />;
    if (status === 'due') return <Clock className="w-3.5 h-3.5" />;
    if (status === 'missed') return <AlertCircle className="w-3.5 h-3.5" />;
    return null;
  };

  const getMedStatusStyle = (status: string) => {
    if (status === 'taken') return 'bg-matcha-soft/10 border-matcha-soft/30';
    if (status === 'due') return 'bg-sunset-sorbet/10 border-sunset-sorbet/30';
    if (status === 'missed') return 'bg-orchid-pastel/10 border-orchid-pastel/30';
    return '';
  };

  const getTimeIcon = (time: string) => {
    if (time === 'morning') return <Sun className="w-4 h-4 text-sunset-sorbet" />;
    if (time === 'afternoon') return <Sunset className="w-4 h-4 text-orchid-pastel" />;
    if (time === 'night') return <Moon className="w-4 h-4 text-indigo-dust" />;
    return null;
  };

  const sendReminder = (memberId: string, message: string) => {
    setReminderSent(message);
    setTimeout(() => setReminderSent(null), 3000);
  };

  return (
    <div className="min-h-screen bg-warm-beige">
      {/* Header */}
      <header className="bg-white border-b border-indigo-dust/10 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-sunset-sorbet/20 to-orchid-pastel/20 flex items-center justify-center hover:from-sunset-sorbet/30 hover:to-orchid-pastel/30 transition-all"
            >
              <ArrowLeft className="w-5 h-5 text-indigo-dust" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-indigo-dust">Family</h1>
              <p className="text-indigo-dust/50 text-sm">Looking out for your loved ones</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Loved Ones Section */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orchid-pastel to-sunset-sorbet flex items-center justify-center shadow-lg">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-indigo-dust">Loved Ones</h2>
              <p className="text-indigo-dust/50 text-sm">Tap to check on their medications</p>
            </div>
          </div>

          {/* Family Members Grid */}
          <div className="grid grid-cols-2 gap-4 max-w-2xl">
            {familyMembers.map((member) => (
              <button
                key={member.id}
                onClick={() => setSelectedMember(member)}
                className="bg-white rounded-2xl p-5 border border-indigo-dust/10 shadow-sm hover:shadow-md hover:border-indigo-dust/20 transition-all text-left group"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl shadow-sm"
                    style={{ backgroundColor: `${member.color}20` }}
                  >
                    {member.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-indigo-dust text-lg">{member.name}</h3>
                    <p className="text-indigo-dust/50 text-sm">{member.relation}</p>
                    <div className={`inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(member.status)}`}>
                      {getStatusIcon(member.status)}
                      {member.statusText}
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-indigo-dust/30 group-hover:text-indigo-dust/50 transition-colors" />
                </div>
              </button>
            ))}

            {/* Add Family Member Card */}
            <button
              onClick={() => setShowAddMember(true)}
              className="bg-gradient-to-br from-pistachio-light/50 to-azure-mist/30 rounded-2xl p-5 border-2 border-dashed border-matcha-soft/40 hover:border-matcha-soft/60 transition-all text-left group"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-white/80 flex items-center justify-center border border-matcha-soft/30 group-hover:bg-matcha-soft/10 transition-colors">
                  <Plus className="w-6 h-6 text-matcha-soft" />
                </div>
                <div>
                  <h3 className="font-semibold text-matcha-soft text-lg">Add someone</h3>
                  <p className="text-matcha-soft/70 text-sm">Care for another loved one</p>
                </div>
              </div>
            </button>
          </div>
        </section>

        {/* Floating Edit Button */}
        <button className="fixed bottom-8 right-8 flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-indigo-dust to-indigo-dust/80 text-white font-medium rounded-2xl shadow-lg hover:shadow-xl transition-all">
          <Edit3 className="w-4 h-4" />
          Edit Family
        </button>
      </main>

      {/* Member Detail Side Sheet */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-indigo-dust/30 backdrop-blur-sm"
            onClick={() => setSelectedMember(null)}
          />

          {/* Side Sheet */}
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl overflow-y-auto animate-in slide-in-from-right">
            {/* Header */}
            <div
              className="sticky top-0 z-10 p-6 border-b border-indigo-dust/10"
              style={{ background: `linear-gradient(135deg, ${selectedMember.color}15, ${selectedMember.color}05)` }}
            >
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-white/80 flex items-center justify-center hover:bg-white transition-colors"
              >
                <X className="w-5 h-5 text-indigo-dust/60" />
              </button>

              <div className="flex items-center gap-4">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-md"
                  style={{ backgroundColor: `${selectedMember.color}30` }}
                >
                  {selectedMember.emoji}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-indigo-dust">{selectedMember.name}</h2>
                  <p className="text-indigo-dust/60">{selectedMember.relation}</p>
                </div>
              </div>

            </div>

            {/* Medication Schedule */}
            <div className="p-6">
              <h3 className="text-lg font-bold text-indigo-dust mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-sunset-sorbet" />
                Today's Medications
              </h3>

              {/* Group by time */}
              {['morning', 'afternoon', 'night'].map((timeSlot) => {
                const meds = selectedMember.medications.filter((m) => m.time === timeSlot);
                if (meds.length === 0) return null;

                return (
                  <div key={timeSlot} className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      {getTimeIcon(timeSlot)}
                      <span className="text-sm font-semibold text-indigo-dust capitalize">{timeSlot}</span>
                    </div>

                    <div className="space-y-2">
                      {meds.map((med, index) => (
                        <div
                          key={index}
                          className={`rounded-xl p-4 border ${getMedStatusStyle(med.status)}`}
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-medium text-indigo-dust">{med.name}</h4>
                              <p className="text-indigo-dust/50 text-sm">{med.dosage}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              {med.status === 'taken' && (
                                <span className="flex items-center gap-1 text-xs font-medium text-matcha-soft bg-matcha-soft/15 px-2 py-1 rounded-full">
                                  <Check className="w-3 h-3" />
                                  Taken {med.takenAt}
                                </span>
                              )}
                              {med.status === 'due' && (
                                <span className="flex items-center gap-1 text-xs font-medium text-sunset-sorbet bg-sunset-sorbet/15 px-2 py-1 rounded-full">
                                  <Clock className="w-3 h-3" />
                                  Due
                                </span>
                              )}
                              {med.status === 'missed' && (
                                <span className="flex items-center gap-1 text-xs font-medium text-orchid-pastel bg-orchid-pastel/15 px-2 py-1 rounded-full">
                                  <AlertCircle className="w-3 h-3" />
                                  Missed
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Send Reminder for missed/due */}
                          {(med.status === 'missed' || med.status === 'due') && (
                            <div className="mt-3 pt-3 border-t border-indigo-dust/5">
                              <p className="text-xs text-indigo-dust/50 mb-2">Send a gentle reminder</p>
                              <div className="flex flex-wrap gap-2">
                                {quickReminders.slice(0, 3).map((reminder, i) => (
                                  <button
                                    key={i}
                                    onClick={() => sendReminder(selectedMember.id, reminder)}
                                    className="px-3 py-1.5 text-xs font-medium rounded-full bg-gradient-to-r from-orchid-pastel/20 to-sunset-sorbet/20 text-indigo-dust/70 hover:from-orchid-pastel/30 hover:to-sunset-sorbet/30 transition-all border border-orchid-pastel/20"
                                  >
                                    {reminder}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}

              {/* Custom Reminder */}
              <div className="mt-6 p-4 bg-gradient-to-br from-azure-mist/10 to-matcha-soft/10 rounded-2xl border border-azure-mist/20">
                <h4 className="font-medium text-indigo-dust mb-3 flex items-center gap-2">
                  <Send className="w-4 h-4 text-azure-mist" />
                  Send a custom message
                </h4>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Write something caring..."
                    className="flex-1 px-4 py-2.5 rounded-xl border border-indigo-dust/15 focus:border-azure-mist focus:ring-2 focus:ring-azure-mist/20 outline-none text-sm text-indigo-dust placeholder:text-indigo-dust/40"
                  />
                  <button className="px-4 py-2.5 bg-gradient-to-r from-azure-mist to-matcha-soft text-white rounded-xl font-medium hover:shadow-lg transition-all">
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Reminder Sent Toast */}
              {reminderSent && (
                <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-matcha-soft text-white px-6 py-3 rounded-2xl shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-bottom-4">
                  <Check className="w-5 h-5" />
                  <span className="font-medium">Reminder sent with love 💕</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add Member Modal */}
      {showAddMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-indigo-dust/30 backdrop-blur-sm"
            onClick={() => setShowAddMember(false)}
          />

          {/* Modal */}
          <div className="relative bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl animate-in fade-in zoom-in-95">
            <button
              onClick={() => setShowAddMember(false)}
              className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-indigo-dust/5 flex items-center justify-center hover:bg-indigo-dust/10 transition-colors"
            >
              <X className="w-5 h-5 text-indigo-dust/60" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-matcha-soft to-azure-mist flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-indigo-dust">Add a loved one</h3>
                <p className="text-indigo-dust/50 text-sm">Someone you want to care for</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-indigo-dust mb-1.5">Their name</label>
                <input
                  type="text"
                  placeholder="What do you call them?"
                  className="w-full px-4 py-3 rounded-xl border border-indigo-dust/15 focus:border-matcha-soft focus:ring-2 focus:ring-matcha-soft/20 outline-none text-indigo-dust placeholder:text-indigo-dust/40"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-indigo-dust mb-1.5">Relationship</label>
                <select className="w-full px-4 py-3 rounded-xl border border-indigo-dust/15 focus:border-matcha-soft focus:ring-2 focus:ring-matcha-soft/20 outline-none text-indigo-dust bg-white">
                  <option value="">How are they related to you?</option>
                  <option value="mother">Mother</option>
                  <option value="father">Father</option>
                  <option value="grandmother">Grandmother</option>
                  <option value="grandfather">Grandfather</option>
                  <option value="spouse">Spouse</option>
                  <option value="sibling">Sibling</option>
                  <option value="uncle">Uncle</option>
                  <option value="aunt">Aunt</option>
                  <option value="friend">Friend</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-indigo-dust mb-1.5">Phone number</label>
                <input
                  type="tel"
                  placeholder="To send them reminders"
                  className="w-full px-4 py-3 rounded-xl border border-indigo-dust/15 focus:border-matcha-soft focus:ring-2 focus:ring-matcha-soft/20 outline-none text-indigo-dust placeholder:text-indigo-dust/40"
                />
              </div>

              <button className="w-full py-3.5 bg-gradient-to-r from-matcha-soft to-azure-mist text-white font-semibold rounded-xl hover:shadow-lg transition-all mt-2">
                Add to my family
              </button>

              <p className="text-center text-xs text-indigo-dust/40">
                You can add their medications after they're added
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
