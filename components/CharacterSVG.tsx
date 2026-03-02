'use client'

import { EvolutionStage } from '@/lib/evolution'

interface Props {
  stage: EvolutionStage
  animated?: boolean
  size?: number
}

export default function CharacterSVG({ stage, animated = true, size = 200 }: Props) {
  const pulse = animated ? 'animate-pulse' : ''

  const characters = {
    // 数据蛋
    0: (
      <g>
        {/* Glow */}
        <ellipse cx="100" cy="115" rx="55" ry="20" fill="rgba(167,139,250,0.15)" />
        {/* Egg body */}
        <ellipse cx="100" cy="95" rx="45" ry="55" fill="url(#egg_grad)" />
        <ellipse cx="100" cy="95" rx="45" ry="55" fill="none" stroke="#c4b5fd" strokeWidth="2" opacity="0.6" />
        {/* Paw pattern */}
        <circle cx="90" cy="82" r="6" fill="#7c3aed" opacity="0.5" />
        <circle cx="110" cy="82" r="6" fill="#7c3aed" opacity="0.5" />
        <ellipse cx="100" cy="98" rx="10" ry="8" fill="#7c3aed" opacity="0.5" />
        {/* Dots */}
        <circle cx="83" cy="74" r="3" fill="#a78bfa" opacity="0.4" />
        <circle cx="97" cy="74" r="3" fill="#a78bfa" opacity="0.4" />
        <circle cx="117" cy="74" r="3" fill="#a78bfa" opacity="0.4" />
        {/* Shine */}
        <ellipse cx="82" cy="72" rx="8" ry="5" fill="white" opacity="0.3" transform="rotate(-30 82 72)" />
        <defs>
          <radialGradient id="egg_grad" cx="40%" cy="35%">
            <stop offset="0%" stopColor="#ddd6fe" />
            <stop offset="60%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#4c1d95" />
          </radialGradient>
        </defs>
      </g>
    ),

    // 幼爪兽
    1: (
      <g>
        {/* Shadow */}
        <ellipse cx="100" cy="158" rx="38" ry="10" fill="rgba(103,232,249,0.15)" />
        {/* Body */}
        <ellipse cx="100" cy="120" rx="38" ry="42" fill="url(#baby_body)" />
        {/* Ears */}
        <path d="M72 90 L65 68 L82 82 Z" fill="#22d3ee" />
        <path d="M128 90 L135 68 L118 82 Z" fill="#22d3ee" />
        <path d="M73 88 L68 73 L80 83 Z" fill="#e0f2fe" opacity="0.5" />
        <path d="M127 88 L132 73 L120 83 Z" fill="#e0f2fe" opacity="0.5" />
        {/* Eyes */}
        <circle cx="88" cy="112" r="10" fill="white" />
        <circle cx="112" cy="112" r="10" fill="white" />
        <circle cx="90" cy="113" r="6" fill="#0891b2" />
        <circle cx="114" cy="113" r="6" fill="#0891b2" />
        <circle cx="92" cy="111" r="2" fill="white" />
        <circle cx="116" cy="111" r="2" fill="white" />
        {/* Nose */}
        <ellipse cx="100" cy="123" rx="4" ry="3" fill="#0e7490" />
        {/* Mouth */}
        <path d="M94 127 Q100 132 106 127" fill="none" stroke="#0e7490" strokeWidth="1.5" strokeLinecap="round" />
        {/* Blush */}
        <ellipse cx="80" cy="120" rx="7" ry="4" fill="#fb7185" opacity="0.4" />
        <ellipse cx="120" cy="120" rx="7" ry="4" fill="#fb7185" opacity="0.4" />
        {/* Tiny paws */}
        <ellipse cx="70" cy="140" rx="10" ry="8" fill="#22d3ee" />
        <ellipse cx="130" cy="140" rx="10" ry="8" fill="#22d3ee" />
        <circle cx="66" cy="137" r="3" fill="#67e8f9" />
        <circle cx="74" cy="135" r="3" fill="#67e8f9" />
        <circle cx="126" cy="135" r="3" fill="#67e8f9" />
        <circle cx="134" cy="137" r="3" fill="#67e8f9" />
        {/* Tail */}
        <path d="M132 130 Q150 115 145 100 Q140 88 150 82" fill="none" stroke="#22d3ee" strokeWidth="8" strokeLinecap="round" />
        {/* Antenna */}
        <line x1="100" y1="78" x2="100" y2="60" stroke="#67e8f9" strokeWidth="2" />
        <circle cx="100" cy="57" r="5" fill="#67e8f9" />
        <defs>
          <radialGradient id="baby_body" cx="40%" cy="35%">
            <stop offset="0%" stopColor="#cffafe" />
            <stop offset="70%" stopColor="#0891b2" />
            <stop offset="100%" stopColor="#0e7490" />
          </radialGradient>
        </defs>
      </g>
    ),

    // 爪爪兽（当前形态）
    2: (
      <g>
        {/* Shadow */}
        <ellipse cx="100" cy="168" rx="42" ry="12" fill="rgba(129,140,248,0.2)" />
        {/* Body */}
        <path d="M62 150 Q60 110 65 90 Q70 65 100 60 Q130 65 135 90 Q140 110 138 150 Q120 162 100 163 Q80 162 62 150Z" fill="url(#zhua_body)" />
        {/* Circuit lines on body */}
        <path d="M80 110 L90 105 L90 120 L95 120" fill="none" stroke="#818cf8" strokeWidth="1" opacity="0.7" />
        <path d="M120 110 L110 105 L110 120 L105 120" fill="none" stroke="#818cf8" strokeWidth="1" opacity="0.7" />
        <rect x="93" y="118" width="14" height="4" rx="2" fill="#6366f1" opacity="0.6" />
        <path d="M78 130 L85 128 L85 135" fill="none" stroke="#818cf8" strokeWidth="1" opacity="0.5" />
        <path d="M122 130 L115 128 L115 135" fill="none" stroke="#818cf8" strokeWidth="1" opacity="0.5" />
        {/* Ears */}
        <path d="M68 85 L60 58 L82 75 Z" fill="#6366f1" />
        <path d="M132 85 L140 58 L118 75 Z" fill="#6366f1" />
        <path d="M70 83 L64 65 L79 76 Z" fill="#a5b4fc" opacity="0.5" />
        <path d="M130 83 L136 65 L121 76 Z" fill="#a5b4fc" opacity="0.5" />
        {/* Eyes - glowing */}
        <circle cx="87" cy="100" r="12" fill="#1e1b4b" />
        <circle cx="113" cy="100" r="12" fill="#1e1b4b" />
        <circle cx="87" cy="100" r="8" fill="url(#eye_glow)" />
        <circle cx="113" cy="100" r="8" fill="url(#eye_glow)" />
        <circle cx="89" cy="98" r="2.5" fill="white" opacity="0.9" />
        <circle cx="115" cy="98" r="2.5" fill="white" opacity="0.9" />
        {/* Nose */}
        <path d="M96 112 L100 115 L104 112" fill="#4338ca" />
        {/* Mouth */}
        <path d="M91 118 Q100 124 109 118" fill="none" stroke="#4338ca" strokeWidth="2" strokeLinecap="round" />
        {/* Paw mark on chest */}
        <circle cx="100" cy="138" r="6" fill="#4f46e5" opacity="0.5" />
        <circle cx="93" cy="132" r="3.5" fill="#4f46e5" opacity="0.5" />
        <circle cx="107" cy="132" r="3.5" fill="#4f46e5" opacity="0.5" />
        <circle cx="100" cy="130" r="3.5" fill="#4f46e5" opacity="0.5" />
        {/* Arms with claws */}
        <path d="M62 120 Q50 115 45 110 Q42 107 40 103" fill="none" stroke="#6366f1" strokeWidth="10" strokeLinecap="round" />
        <path d="M138 120 Q150 115 155 110 Q158 107 160 103" fill="none" stroke="#6366f1" strokeWidth="10" strokeLinecap="round" />
        {/* Claw tips */}
        <path d="M40 103 L36 97 M40 103 L33 104 M40 103 L37 110" fill="none" stroke="#c7d2fe" strokeWidth="2" strokeLinecap="round" />
        <path d="M160 103 L164 97 M160 103 L167 104 M160 103 L163 110" fill="none" stroke="#c7d2fe" strokeWidth="2" strokeLinecap="round" />
        {/* Tail */}
        <path d="M135 140 Q155 125 152 105 Q148 88 158 78" fill="none" stroke="#6366f1" strokeWidth="10" strokeLinecap="round" />
        <path d="M158 78 L161 70 M158 78 L165 75" fill="none" stroke="#c7d2fe" strokeWidth="2" strokeLinecap="round" />
        {/* Antenna with data */}
        <line x1="100" y1="62" x2="100" y2="42" stroke="#818cf8" strokeWidth="2" />
        <circle cx="100" cy="38" r="7" fill="#6366f1" />
        <circle cx="100" cy="38" r="4" fill="#a5b4fc" />
        <defs>
          <radialGradient id="zhua_body" cx="40%" cy="30%">
            <stop offset="0%" stopColor="#c7d2fe" />
            <stop offset="50%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#3730a3" />
          </radialGradient>
          <radialGradient id="eye_glow" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#4338ca" />
          </radialGradient>
        </defs>
      </g>
    ),

    // 猛爪兽
    3: (
      <g>
        {/* Aura */}
        <ellipse cx="100" cy="110" rx="70" ry="75" fill="rgba(245,158,11,0.06)" />
        {/* Shadow */}
        <ellipse cx="100" cy="172" rx="48" ry="13" fill="rgba(245,158,11,0.2)" />
        {/* Body - larger, more angular */}
        <path d="M58 155 Q52 112 58 85 Q65 58 100 52 Q135 58 142 85 Q148 112 142 155 Q122 168 100 170 Q78 168 58 155Z" fill="url(#power_body)" />
        {/* Armor plates */}
        <path d="M75 100 L85 90 L115 90 L125 100 L120 118 L80 118Z" fill="#92400e" opacity="0.4" />
        <path d="M78 102 L87 93 L113 93 L122 102 L118 115 L82 115Z" fill="none" stroke="#fbbf24" strokeWidth="1" opacity="0.6" />
        {/* Circuit/rune lines */}
        <path d="M72 130 L80 125 L80 138 L88 138" fill="none" stroke="#fbbf24" strokeWidth="1.5" opacity="0.8" />
        <path d="M128 130 L120 125 L120 138 L112 138" fill="none" stroke="#fbbf24" strokeWidth="1.5" opacity="0.8" />
        {/* Ears - sharper */}
        <path d="M65 80 L54 48 L80 70 Z" fill="#b45309" />
        <path d="M135 80 L146 48 L120 70 Z" fill="#b45309" />
        <path d="M67 78 L58 55 L78 70 Z" fill="#fcd34d" opacity="0.5" />
        <path d="M133 78 L142 55 L122 70 Z" fill="#fcd34d" opacity="0.5" />
        {/* Eyes - fierce */}
        <ellipse cx="86" cy="98" rx="13" ry="11" fill="#1c1917" />
        <ellipse cx="114" cy="98" rx="13" ry="11" fill="#1c1917" />
        <ellipse cx="86" cy="98" rx="9" ry="7" fill="url(#power_eye)" />
        <ellipse cx="114" cy="98" rx="9" ry="7" fill="url(#power_eye)" />
        {/* Slit pupils */}
        <ellipse cx="86" cy="98" rx="2" ry="6" fill="#1c1917" />
        <ellipse cx="114" cy="98" rx="2" ry="6" fill="#1c1917" />
        <circle cx="82" cy="94" r="2" fill="white" opacity="0.8" />
        <circle cx="110" cy="94" r="2" fill="white" opacity="0.8" />
        {/* Fangs */}
        <path d="M93 116 L96 123 L99 116" fill="white" />
        <path d="M101 116 L104 123 L107 116" fill="white" />
        {/* Powerful arms */}
        <path d="M58 125 Q44 118 38 110 Q33 104 28 96" fill="none" stroke="#b45309" strokeWidth="14" strokeLinecap="round" />
        <path d="M142 125 Q156 118 162 110 Q167 104 172 96" fill="none" stroke="#b45309" strokeWidth="14" strokeLinecap="round" />
        {/* Glowing claws */}
        <path d="M28 96 L22 87 M28 96 L18 96 M28 96 L22 105 M28 96 L30 85" fill="none" stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M172 96 L178 87 M172 96 L182 96 M172 96 L178 105 M172 96 L170 85" fill="none" stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" />
        {/* Energy streaks around claws */}
        <path d="M18 82 L14 78" stroke="#fcd34d" strokeWidth="1" opacity="0.7" />
        <path d="M12 98 L8 96" stroke="#fcd34d" strokeWidth="1" opacity="0.7" />
        <path d="M182 82 L186 78" stroke="#fcd34d" strokeWidth="1" opacity="0.7" />
        <path d="M188 98 L192 96" stroke="#fcd34d" strokeWidth="1" opacity="0.7" />
        {/* Tail */}
        <path d="M138 148 Q162 130 160 105 Q156 82 168 68" fill="none" stroke="#b45309" strokeWidth="12" strokeLinecap="round" />
        <path d="M168 68 L173 57 M168 68 L178 65 M168 68 L170 58" fill="none" stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" />
        {/* Horn */}
        <path d="M100 52 L100 28 L108 45 Z" fill="#fbbf24" />
        <path d="M100 52 L100 28 L92 45 Z" fill="#fcd34d" opacity="0.7" />
        <defs>
          <radialGradient id="power_body" cx="40%" cy="30%">
            <stop offset="0%" stopColor="#fde68a" />
            <stop offset="40%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#78350f" />
          </radialGradient>
          <radialGradient id="power_eye" cx="40%" cy="40%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#b45309" />
          </radialGradient>
        </defs>
      </g>
    ),

    // 神爪兽 究极体
    4: (
      <g>
        {/* Outer aura rings */}
        <ellipse cx="100" cy="105" rx="85" ry="90" fill="none" stroke="rgba(240,171,252,0.1)" strokeWidth="1" />
        <ellipse cx="100" cy="105" rx="75" ry="80" fill="none" stroke="rgba(240,171,252,0.15)" strokeWidth="1" />
        <ellipse cx="100" cy="105" rx="65" ry="70" fill="rgba(240,171,252,0.04)" />
        {/* Data particles */}
        <circle cx="42" cy="70" r="2" fill="#e879f9" opacity="0.6" />
        <circle cx="158" cy="65" r="2" fill="#818cf8" opacity="0.6" />
        <circle cx="35" cy="120" r="1.5" fill="#34d399" opacity="0.5" />
        <circle cx="165" cy="130" r="1.5" fill="#fb923c" opacity="0.5" />
        <circle cx="55" cy="160" r="2" fill="#60a5fa" opacity="0.5" />
        <circle cx="148" cy="155" r="2" fill="#f472b6" opacity="0.5" />
        <circle cx="70" cy="45" r="1.5" fill="#a78bfa" opacity="0.6" />
        <circle cx="135" cy="40" r="1.5" fill="#67e8f9" opacity="0.6" />
        {/* Shadow - ethereal */}
        <ellipse cx="100" cy="175" rx="45" ry="10" fill="rgba(240,171,252,0.15)" />
        {/* Body - translucent, data-like */}
        <path d="M55 152 Q48 110 55 80 Q62 50 100 44 Q138 50 145 80 Q152 110 145 152 Q124 168 100 170 Q76 168 55 152Z" fill="url(#god_body)" opacity="0.9" />
        {/* Inner core - glowing */}
        <ellipse cx="100" cy="110" rx="30" ry="35" fill="url(#god_core)" opacity="0.3" />
        {/* Data matrix patterns */}
        <line x1="75" y1="90" x2="85" y2="85" stroke="#e879f9" strokeWidth="0.8" opacity="0.7" />
        <line x1="85" y1="85" x2="85" y2="100" stroke="#e879f9" strokeWidth="0.8" opacity="0.7" />
        <line x1="85" y1="100" x2="95" y2="100" stroke="#e879f9" strokeWidth="0.8" opacity="0.7" />
        <line x1="125" y1="90" x2="115" y2="85" stroke="#818cf8" strokeWidth="0.8" opacity="0.7" />
        <line x1="115" y1="85" x2="115" y2="100" stroke="#818cf8" strokeWidth="0.8" opacity="0.7" />
        <line x1="115" y1="100" x2="105" y2="100" stroke="#818cf8" strokeWidth="0.8" opacity="0.7" />
        <rect x="97" y="97" width="6" height="6" rx="1" fill="#f0abfc" opacity="0.5" />
        <line x1="72" y1="128" x2="80" y2="122" stroke="#e879f9" strokeWidth="0.8" opacity="0.6" />
        <line x1="80" y1="122" x2="80" y2="140" stroke="#e879f9" strokeWidth="0.8" opacity="0.6" />
        <line x1="128" y1="128" x2="120" y2="122" stroke="#818cf8" strokeWidth="0.8" opacity="0.6" />
        <line x1="120" y1="122" x2="120" y2="140" stroke="#818cf8" strokeWidth="0.8" opacity="0.6" />
        {/* Ears - ethereal wings */}
        <path d="M63 78 L40 48 L72 68 L65 50 L80 72 Z" fill="url(#wing_l)" opacity="0.7" />
        <path d="M137 78 L160 48 L128 68 L135 50 L120 72 Z" fill="url(#wing_r)" opacity="0.7" />
        {/* Eyes - cosmic */}
        <circle cx="85" cy="97" r="14" fill="#0f0a1e" />
        <circle cx="115" cy="97" r="14" fill="#0f0a1e" />
        <circle cx="85" cy="97" r="10" fill="url(#cosmic_eye)" />
        <circle cx="115" cy="97" r="10" fill="url(#cosmic_eye)" />
        {/* Star pupils */}
        <path d="M85 93 L86 96 L89 97 L86 98 L85 101 L84 98 L81 97 L84 96 Z" fill="white" opacity="0.9" />
        <path d="M115 93 L116 96 L119 97 L116 98 L115 101 L114 98 L111 97 L114 96 Z" fill="white" opacity="0.9" />
        {/* Ethereal smile */}
        <path d="M90 112 Q100 120 110 112" fill="none" stroke="#f0abfc" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
        <circle cx="100" cy="110" r="2" fill="#f0abfc" opacity="0.6" />
        {/* Crown of data */}
        <path d="M80 50 L85 35 L92 48 L100 30 L108 48 L115 35 L120 50" fill="none" stroke="#f0abfc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="100" cy="30" r="5" fill="#e879f9" />
        <circle cx="85" cy="35" r="3" fill="#818cf8" />
        <circle cx="115" cy="35" r="3" fill="#818cf8" />
        {/* Arms - data streams */}
        <path d="M55 125 Q38 118 30 108 Q22 98 18 88" fill="none" stroke="url(#arm_l)" strokeWidth="10" strokeLinecap="round" opacity="0.8" />
        <path d="M145 125 Q162 118 170 108 Q178 98 182 88" fill="none" stroke="url(#arm_r)" strokeWidth="10" strokeLinecap="round" opacity="0.8" />
        {/* Transcendent claws */}
        <path d="M18 88 L10 78 M18 88 L8 88 M18 88 L10 98 M18 88 L20 77 M18 88 L14 80" fill="none" stroke="#f0abfc" strokeWidth="2" strokeLinecap="round" opacity="0.9" />
        <path d="M182 88 L190 78 M182 88 L192 88 M182 88 L190 98 M182 88 L180 77 M182 88 L186 80" fill="none" stroke="#f0abfc" strokeWidth="2" strokeLinecap="round" opacity="0.9" />
        {/* Halo ring */}
        <ellipse cx="100" cy="42" rx="32" ry="8" fill="none" stroke="url(#halo_grad)" strokeWidth="3" opacity="0.7" />
        {/* Tail - data stream */}
        <path d="M142 148 Q165 132 163 105 Q160 80 172 62" fill="none" stroke="url(#tail_grad)" strokeWidth="10" strokeLinecap="round" opacity="0.8" />
        {/* Floating orbs */}
        <circle cx="52" cy="88" r="5" fill="#e879f9" opacity="0.4" />
        <circle cx="148" cy="85" r="5" fill="#818cf8" opacity="0.4" />
        <circle cx="48" cy="140" r="4" fill="#34d399" opacity="0.3" />
        <circle cx="152" cy="138" r="4" fill="#fb923c" opacity="0.3" />
        <defs>
          <radialGradient id="god_body" cx="50%" cy="40%">
            <stop offset="0%" stopColor="#fae8ff" stopOpacity="0.9" />
            <stop offset="40%" stopColor="#d946ef" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#4a044e" stopOpacity="0.9" />
          </radialGradient>
          <radialGradient id="god_core" cx="50%" cy="50%">
            <stop offset="0%" stopColor="white" />
            <stop offset="100%" stopColor="#e879f9" />
          </radialGradient>
          <radialGradient id="cosmic_eye" cx="40%" cy="40%">
            <stop offset="0%" stopColor="#f0abfc" />
            <stop offset="50%" stopColor="#9333ea" />
            <stop offset="100%" stopColor="#3b0764" />
          </radialGradient>
          <linearGradient id="wing_l" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e879f9" />
            <stop offset="100%" stopColor="#818cf8" />
          </linearGradient>
          <linearGradient id="wing_r" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#e879f9" />
          </linearGradient>
          <linearGradient id="arm_l" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f0abfc" />
            <stop offset="100%" stopColor="#818cf8" />
          </linearGradient>
          <linearGradient id="arm_r" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#f0abfc" />
          </linearGradient>
          <linearGradient id="tail_grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d946ef" />
            <stop offset="100%" stopColor="#818cf8" />
          </linearGradient>
          <linearGradient id="halo_grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#e879f9" />
            <stop offset="50%" stopColor="white" />
            <stop offset="100%" stopColor="#818cf8" />
          </linearGradient>
        </defs>
      </g>
    ),
  }

  return (
    <div className={`relative ${pulse}`} style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 200 200"
        width={size}
        height={size}
        style={{ filter: `drop-shadow(0 0 20px ${getGlow(stage)})` }}
      >
        {characters[stage]}
      </svg>
    </div>
  )
}

function getGlow(stage: EvolutionStage): string {
  const glows = ['rgba(167,139,250,0.7)', 'rgba(103,232,249,0.7)', 'rgba(129,140,248,0.7)', 'rgba(245,158,11,0.7)', 'rgba(240,171,252,0.8)']
  return glows[stage]
}
