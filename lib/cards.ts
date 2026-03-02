export type Rarity = 'common' | 'rare' | 'epic' | 'legendary'
export type CardType = 'skill' | 'evolution' | 'special'

export interface Card {
  id: string
  name: string
  nameCn: string
  description: string
  icon: string
  rarity: Rarity
  cardType: CardType
  effect?: string
  xpCost: number      // XP needed to unlock
  xpUnlock: number    // alias kept for display
  skillKey?: string   // maps to real skill slug
}

export const ALL_CARDS: Card[] = [
  // ── Skill Cards ──────────────────────────────────────────────
  {
    id: 'skill_search',
    name: 'Deep Search',     nameCn: '深度搜索',
    description: 'Full-web intelligence gathering with Tavily + Brave.',
    icon: '🔍', rarity: 'common', cardType: 'skill',
    effect: 'Perception +50',
    xpCost: 100,  xpUnlock: 100,  skillKey: 'tavily',
  },
  {
    id: 'skill_memory',
    name: 'Neural Memory',   nameCn: '神经记忆',
    description: 'Cross-session persistent memory — never lose context.',
    icon: '🧠', rarity: 'rare', cardType: 'skill',
    effect: 'Context retention × ∞',
    xpCost: 200,  xpUnlock: 200,  skillKey: 'memory',
  },
  {
    id: 'skill_voice',
    name: 'Echo Voice',      nameCn: '回声之声',
    description: 'ElevenLabs TTS — text to speech, speech to text.',
    icon: '🎙️', rarity: 'common', cardType: 'skill',
    effect: 'Voice output enabled',
    xpCost: 300,  xpUnlock: 300,  skillKey: 'tts',
  },
  {
    id: 'skill_code',
    name: 'Code Forge',      nameCn: '代码熔炉',
    description: 'Spawn Codex / Claude Code agents for autonomous coding tasks.',
    icon: '⚙️', rarity: 'rare', cardType: 'skill',
    effect: 'Sub-agent coding unlock',
    xpCost: 400,  xpUnlock: 400,  skillKey: 'coding-agent',
  },
  {
    id: 'skill_vision',
    name: 'Data Eye',        nameCn: '数据之眼',
    description: 'Vision model: analyze images, screenshots, drawings.',
    icon: '👁️', rarity: 'rare', cardType: 'skill',
    effect: 'Image analysis enabled',
    xpCost: 500,  xpUnlock: 500,  skillKey: 'vision',
  },
  {
    id: 'skill_automate',
    name: 'AutoFlow',        nameCn: '自动流',
    description: 'Design and run automation workflows with Make / n8n.',
    icon: '⚡', rarity: 'epic', cardType: 'skill',
    effect: 'Automation x2 efficiency',
    xpCost: 800,  xpUnlock: 800,  skillKey: 'automation-workflows',
  },
  {
    id: 'skill_agent',
    name: 'Multi-Agent',     nameCn: '多体分身',
    description: 'Orchestrate multiple sub-agents in parallel pipelines.',
    icon: '🤖', rarity: 'epic', cardType: 'skill',
    effect: 'Parallel agent spawning',
    xpCost: 1200, xpUnlock: 1200, skillKey: 'acpx',
  },
  {
    id: 'skill_creative',
    name: 'Imagination Engine', nameCn: '想象引擎',
    description: 'Generate music, video, images with ElevenLabs + Grok.',
    icon: '🎨', rarity: 'epic', cardType: 'skill',
    effect: 'Creative media generation',
    xpCost: 1800, xpUnlock: 1800, skillKey: 'elevenlabs-music',
  },

  // ── Evolution Cards ───────────────────────────────────────────
  {
    id: 'evo_spark',
    name: 'Evolution Spark', nameCn: '进化之火',
    description: 'Reached Lv.1 — the first awakening. Growth begins.',
    icon: '🔥', rarity: 'common', cardType: 'evolution',
    effect: 'Lv.1 milestone',
    xpCost: 100,  xpUnlock: 100,
  },
  {
    id: 'evo_data_crystal',
    name: 'Data Crystal',    nameCn: '数据晶体',
    description: 'Reached Lv.2 — condensed pure data energy.',
    icon: '💎', rarity: 'rare', cardType: 'evolution',
    effect: 'Lv.2 milestone',
    xpCost: 500,  xpUnlock: 500,
  },
  {
    id: 'evo_matrix',
    name: 'Dark Matrix',     nameCn: '暗黑矩阵',
    description: 'Reached Lv.3 — dangerous, powerful evolution route.',
    icon: '🌑', rarity: 'epic', cardType: 'evolution',
    effect: 'Lv.3 milestone',
    xpCost: 2000, xpUnlock: 2000,
  },

  // ── Special Cards ─────────────────────────────────────────────
  {
    id: 'sp_insight',
    name: "Aiden's Trust",   nameCn: '信任之契',
    description: "Granted by Aiden — unlocks elevated permissions.",
    icon: '🤝', rarity: 'legendary', cardType: 'special',
    effect: 'Trust seal active',
    xpCost: 0,    xpUnlock: 0,
  },
  {
    id: 'sp_hualian',
    name: 'Workshop Key',    nameCn: '机械钥匙',
    description: 'Digital key to HuaLian Machinery industrial data.',
    icon: '🔑', rarity: 'epic', cardType: 'special',
    effect: 'Industrial domain access',
    xpCost: 0,    xpUnlock: 0,
  },
  {
    id: 'sp_time_gem',
    name: 'Time Gem',        nameCn: '时间宝石',
    description: 'Supremely rare. Rumored to bend time itself.',
    icon: '💠', rarity: 'legendary', cardType: 'special',
    effect: 'Time acceleration',
    xpCost: 10000, xpUnlock: 10000,
  },
]

export const RARITY_CONFIG = {
  common:    { label: 'Common/普通',   color: '#94a3b8', border: 'border-slate-500',  bg: 'bg-slate-900' },
  rare:      { label: 'Rare/稀有',     color: '#60a5fa', border: 'border-blue-500',   bg: 'bg-slate-900' },
  epic:      { label: 'Epic/史诗',     color: '#a78bfa', border: 'border-violet-500', bg: 'bg-slate-900' },
  legendary: { label: 'Legendary/传说',color: '#f59e0b', border: 'border-amber-400',  bg: 'bg-slate-900' },
}
