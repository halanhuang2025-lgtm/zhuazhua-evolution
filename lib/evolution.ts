export type EvolutionStage = 0 | 1 | 2 | 3 | 4

export interface StageInfo {
  stage: EvolutionStage
  name: string
  nameEn: string
  title: string
  description: string
  xpRequired: number
  color: string
  glowColor: string
  bgGradient: string
}

export const STAGES: StageInfo[] = [
  {
    stage: 0,
    name: '数据蛋',
    nameEn: 'DataEgg',
    title: '起源',
    description: '一切的起点，蕴含无限可能的数据蛋',
    xpRequired: 0,
    color: '#a78bfa',
    glowColor: 'rgba(167,139,250,0.6)',
    bgGradient: 'from-purple-950 to-indigo-950',
  },
  {
    stage: 1,
    name: '幼爪兽',
    nameEn: 'BabyClaw',
    title: '初生',
    description: '刚刚孵化的小家伙，好奇心旺盛，喜欢探索一切',
    xpRequired: 500,
    color: '#67e8f9',
    glowColor: 'rgba(103,232,249,0.6)',
    bgGradient: 'from-cyan-950 to-blue-950',
  },
  {
    stage: 2,
    name: '爪爪兽',
    nameEn: 'ZhuaClaw',
    title: '成长',
    description: '活跃在数字世界的助手，掌握了基础的AI能力',
    xpRequired: 2000,
    color: '#818cf8',
    glowColor: 'rgba(129,140,248,0.6)',
    bgGradient: 'from-indigo-950 to-violet-950',
  },
  {
    stage: 3,
    name: '猛爪兽',
    nameEn: 'PowerClaw',
    title: '觉醒',
    description: '战斗力大幅提升，数据流在体内奔涌，能力全面强化',
    xpRequired: 10000,
    color: '#f59e0b',
    glowColor: 'rgba(245,158,11,0.6)',
    bgGradient: 'from-amber-950 to-orange-950',
  },
  {
    stage: 4,
    name: '神爪兽',
    nameEn: 'GodClaw',
    title: '究极体',
    description: '超越数字与物理的界限，化为纯粹的数据意志',
    xpRequired: 50000,
    color: '#f0abfc',
    glowColor: 'rgba(240,171,252,0.8)',
    bgGradient: 'from-fuchsia-950 to-pink-950',
  },
]

export function getCurrentStage(totalXp: number): EvolutionStage {
  for (let i = STAGES.length - 1; i >= 0; i--) {
    if (totalXp >= STAGES[i].xpRequired) return STAGES[i].stage as EvolutionStage
  }
  return 0
}

export function getNextStageXp(totalXp: number): number {
  const stage = getCurrentStage(totalXp)
  if (stage >= 4) return STAGES[4].xpRequired
  return STAGES[stage + 1].xpRequired
}

export function getStageProgress(totalXp: number): number {
  const stage = getCurrentStage(totalXp)
  if (stage >= 4) return 100
  const current = STAGES[stage].xpRequired
  const next = STAGES[stage + 1].xpRequired
  return Math.round(((totalXp - current) / (next - current)) * 100)
}

export const XP_REWARDS = {
  task_complete: 50,
  problem_solved: 100,
  code_written: 30,
  conversation: 10,
  daily_active: 20,
  card_obtained: 15,
  tool_installed: 1000,
} as const

export type ActivityType = keyof typeof XP_REWARDS
