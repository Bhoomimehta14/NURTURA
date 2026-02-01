'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  TreeDeciduous,
  Home,
  ArrowLeft,
  Sparkles,
  Heart,
} from 'lucide-react';
import GrowthTree from '@/components/GrowthTree';

export default function TreePage() {
  const router = useRouter();
  const [completedTasks] = useState(3);

  return (
    <div className="min-h-screen bg-gradient-to-b from-warm-beige via-pistachio-light/20 to-peach-cream/30">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-matcha-soft/20 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="w-12 h-12 rounded-xl bg-matcha-soft/20 flex items-center justify-center hover:bg-matcha-soft/30 transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-matcha-soft" />
            </button>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-indigo-dust flex items-center gap-2 justify-center">
                <TreeDeciduous className="w-7 h-7 text-matcha-soft" />
                Your Growth Tree
              </h1>
              <p className="text-indigo-dust/60 text-sm">Watch it bloom with care</p>
            </div>
            <Link
              href="/"
              className="w-12 h-12 rounded-xl bg-azure-mist/20 flex items-center justify-center hover:bg-azure-mist/30 transition-colors"
            >
              <Home className="w-6 h-6 text-azure-mist" />
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-8">
        {/* Tree Display */}
        <section className="mb-8">
          <div className="bg-gradient-to-b from-azure-mist/10 via-pistachio-light/30 to-peach-cream/40 rounded-3xl p-8 shadow-lg border border-matcha-soft/20">
            <GrowthTree completedTasks={completedTasks} className="w-full h-80" />

            {/* Stats */}
            <div className="mt-8 flex justify-center gap-6">
              <div className="text-center px-8 py-4 bg-white/80 rounded-2xl border border-matcha-soft/30 shadow-sm">
                <p className="text-4xl font-bold text-matcha-soft">{completedTasks}</p>
                <p className="text-sm text-indigo-dust/60 mt-1">Tasks Done</p>
              </div>
              <div className="text-center px-8 py-4 bg-white/80 rounded-2xl border border-azure-mist/30 shadow-sm">
                <p className="text-4xl font-bold text-azure-mist">{completedTasks + 2}</p>
                <p className="text-sm text-indigo-dust/60 mt-1">Leaves Grown</p>
              </div>
            </div>
          </div>
        </section>

        {/* Motivational Message */}
        <section className="mb-8">
          <div className="bg-gradient-to-r from-orchid-pastel/20 via-peach-cream/30 to-sunset-sorbet/20 rounded-3xl p-8 border border-orchid-pastel/20 shadow-sm">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orchid-pastel to-sunset-sorbet flex items-center justify-center shadow-md">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-xl font-medium text-indigo-dust leading-relaxed">
                  {completedTasks < 3
                    ? "Keep going! Every small step helps your tree grow."
                    : completedTasks < 5
                    ? "Great progress! Your tree is getting fuller."
                    : "Amazing! Your tree is flourishing with care!"}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Sweet Message */}
        <section className="mb-8">
          <div className="bg-gradient-to-br from-white via-pistachio-light/10 to-peach-cream/20 rounded-3xl p-10 border border-matcha-soft/15 shadow-sm text-center">
            <div className="flex justify-center mb-5">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orchid-pastel/30 via-peach-cream/40 to-matcha-soft/30 flex items-center justify-center shadow-inner">
                <Heart className="w-10 h-10 text-orchid-pastel" fill="#D48A96" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-indigo-dust mb-4">
              Grow this tree for your loved ones
            </h3>
            <p className="text-lg text-indigo-dust/70 leading-relaxed max-w-md mx-auto">
              Every medicine you take, every healthy choice you make — it's a gift of love.
              Watch your tree flourish as you care for yourself and those who cherish you.
            </p>
            <div className="mt-8 flex justify-center gap-3">
              <span className="text-3xl">🌱</span>
              <span className="text-3xl">💚</span>
              <span className="text-3xl">🌿</span>
            </div>
          </div>
        </section>

        {/* Footer Quote */}
        <section className="text-center py-6">
          <p className="text-indigo-dust/60 text-lg italic">
            "A tree grows strongest when nurtured with love"
          </p>
        </section>
      </main>
    </div>
  );
}
