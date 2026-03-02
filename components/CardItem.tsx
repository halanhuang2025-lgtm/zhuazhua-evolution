'use client'

import { useState } from 'react'
import { Card, RARITY_CONFIG } from '@/lib/cards'

interface Props {
  card: Card
  owned: boolean
  onUnlock?: () => void
}

export default function CardItem({ card, owned, onUnlock }: Props) {
  const [flipped, setFlipped] = useState(false)
  const rarity = RARITY_CONFIG[card.rarity]

  return (
    <div
      className="relative w-36 h-52 cursor-pointer select-none"
      style={{ perspective: '600px' }}
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className="relative w-full h-full transition-transform duration-500"
        style={{
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Front */}
        <div
          className={`absolute inset-0 rounded-xl border-2 ${rarity.border} ${rarity.bg} flex flex-col items-center justify-between p-3 ${!owned ? 'opacity-40 grayscale' : ''}`}
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* Rarity badge */}
          <div className="w-full flex justify-between items-center">
            <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ color: rarity.color, border: `1px solid ${rarity.color}` }}>
              {rarity.label}
            </span>
            <span className="text-xs text-slate-400">{card.cardType === 'skill' ? '技能' : card.cardType === 'evolution' ? '进化' : '特殊'}</span>
          </div>
          {/* Icon */}
          <div className="text-5xl drop-shadow-lg">{card.icon}</div>
          {/* Name */}
          <div className="text-center">
            <p className="text-sm font-bold text-white leading-tight">{card.nameCn}</p>
            <p className="text-xs text-slate-400">{card.name}</p>
          </div>
          {/* Lock indicator */}
          {!owned && (
            <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/20">
              <span className="text-2xl">🔒</span>
            </div>
          )}
          {/* Rarity shimmer for legendary */}
          {card.rarity === 'legendary' && owned && (
            <div className="absolute inset-0 rounded-xl pointer-events-none overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-amber-300 via-transparent to-amber-300 animate-pulse" />
            </div>
          )}
        </div>
        {/* Back */}
        <div
          className={`absolute inset-0 rounded-xl border-2 ${rarity.border} bg-slate-950 flex flex-col items-center justify-center p-3 gap-2`}
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div className="text-3xl">{card.icon}</div>
          <p className="text-xs text-slate-300 text-center leading-tight">{card.description}</p>
          {card.effect && (
            <div className="mt-1 px-2 py-1 rounded bg-slate-800 w-full">
              <p className="text-xs text-center" style={{ color: rarity.color }}>{card.effect}</p>
            </div>
          )}
          {card.xpCost > 0 && (
            <p className="text-xs text-amber-400">需要 {card.xpCost} XP</p>
          )}
          {!owned && onUnlock && (
            <button
              onClick={(e) => { e.stopPropagation(); onUnlock() }}
              className="mt-1 px-3 py-1 rounded-lg text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
            >
              解锁
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
