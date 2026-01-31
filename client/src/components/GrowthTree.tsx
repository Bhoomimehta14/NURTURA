'use client';

import { useState, useEffect } from 'react';

interface GrowthTreeProps {
  completedTasks: number;
  className?: string;
}

const leafColors = [
  '#8FAF9A',
  '#A8C5A0',
  '#C5D99A',
  '#E5C77D',
  '#F0D9A0',
  '#E8B88A',
];

const leafPositions = [
  { x: 95, y: 85, size: 12, rotation: -15 },
  { x: 105, y: 90, size: 10, rotation: 25 },
  { x: 85, y: 95, size: 11, rotation: -35 },
  { x: 115, y: 88, size: 13, rotation: 40 },
  { x: 90, y: 78, size: 10, rotation: -20 },
  { x: 110, y: 82, size: 11, rotation: 30 },
  { x: 80, y: 88, size: 9, rotation: -45 },
  { x: 120, y: 95, size: 10, rotation: 55 },
  { x: 100, y: 75, size: 12, rotation: 5 },
  { x: 88, y: 70, size: 10, rotation: -25 },
  { x: 112, y: 72, size: 11, rotation: 35 },
  { x: 78, y: 80, size: 9, rotation: -55 },
  { x: 122, y: 85, size: 10, rotation: 60 },
  { x: 95, y: 68, size: 11, rotation: -10 },
  { x: 105, y: 65, size: 12, rotation: 15 },
  { x: 82, y: 72, size: 10, rotation: -40 },
  { x: 118, y: 75, size: 11, rotation: 45 },
  { x: 100, y: 60, size: 13, rotation: 0 },
  { x: 90, y: 62, size: 10, rotation: -30 },
  { x: 110, y: 58, size: 11, rotation: 28 },
];

export default function GrowthTree({ completedTasks, className = '' }: GrowthTreeProps) {
  const [visibleLeaves, setVisibleLeaves] = useState<number[]>([]);

  const baseLeaves = 2;
  const totalLeaves = Math.min(baseLeaves + completedTasks, leafPositions.length);

  useEffect(() => {
    const leaves = Array.from({ length: totalLeaves }, (_, i) => i);
    setVisibleLeaves(leaves);
  }, [totalLeaves]);

  const getLeafColor = (index: number) => {
    return leafColors[index % leafColors.length];
  };

  return (
    <div className={`relative ${className}`}>
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full"
        style={{ filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))' }}
      >
        <ellipse cx="100" cy="185" rx="50" ry="8" fill="#CFE3D6" opacity="0.6" />

        <path
          d="M100 180 Q98 160 100 140 Q102 120 100 100"
          stroke="#8B7355"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />

        <path d="M100 120 Q85 105 75 95" stroke="#8B7355" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M100 115 Q115 100 125 90" stroke="#8B7355" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M100 100 Q95 85 90 75" stroke="#8B7355" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M100 100 Q105 82 110 70" stroke="#8B7355" strokeWidth="2.5" strokeLinecap="round" fill="none" />

        <path d="M85 100 Q78 92 72 88" stroke="#9A8B7A" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <path d="M115 95 Q122 88 128 85" stroke="#9A8B7A" strokeWidth="1.5" strokeLinecap="round" fill="none" />

        {leafPositions.map((leaf, index) => {
          if (!visibleLeaves.includes(index)) return null;
          const color = getLeafColor(index);

          return (
            <g
              key={index}
              transform={`translate(${leaf.x}, ${leaf.y}) rotate(${leaf.rotation})`}
              className="transition-all duration-500"
              style={{ opacity: 0.9 }}
            >
              <ellipse cx="0" cy="0" rx={leaf.size * 0.4} ry={leaf.size * 0.7} fill={color} />
              <line
                x1="0"
                y1={-leaf.size * 0.5}
                x2="0"
                y2={leaf.size * 0.4}
                stroke={color}
                strokeWidth="0.5"
                opacity="0.5"
                style={{ filter: 'brightness(0.8)' }}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
