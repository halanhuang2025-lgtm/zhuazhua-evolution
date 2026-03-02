'use client'

import { useEffect, useState } from 'react'
import CharacterSVG from '@/components/CharacterSVG'
import CardItem from '@/components/CardItem'
import { STAGES, getCurrentStage, getStageProgress, getNextStageXp, XP_REWARDS, ActivityType } from '@/lib/evolution'
import { ALL_CARDS, RARITY_CONFIG } from '@/lib/cards'
import { getEvolutionState, addXp, getOwnedCards, getRecentActivity } from '@/lib/supabase'

export default function Home() {
  const [totalXp, setTotalXp] = useState(0)
  const [tasksCompleted, setTasksCompleted] = useState(0)
  const [ownedCardIds, setOwnedCardIds] = useState<string[]>([])
  const [recentLogs, setRecentLogs] = useState<{ description: string; xp_earned: number; created_at: string }[]>([])
  const [activeTab, setActiveTab] = useState<'home' | 'cards' | 'log'>('home')
  const [adding, setAdding] = useState(false)
  const [evolving, setEvolving] = useState(false)
  const [prevStage, setPrevStage] = useState<number>(-1)

  const stage = getCurrentStage(totalXp)
  const stageInfo = STAGES[stage]
  const progress = getStageProgress(totalXp)
  const nextXp = stage < 4 ? getNextStageXp(totalXp) : null

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    const state = await getEvolutionState()
    if (state) {
      setTotalXp(state.total_xp)
      setTasksCompleted(state.tasks_completed)
    }
    const cards = await getOwnedCards()
    setOwnedCardIds(cards)
    const logs = await getRecentActivity(8)
    setRecentLogs(logs)
  }

  async function handleAddXp(type: ActivityType) {
    setAdding(true)
    const xp = XP_REWARDS[type]
    const labels: Record<ActivityType, string> = {
      task_complete: '完成任务',
      problem_solved: '解决问题',
      code_written: '编写代码',
      conversation: '对话交流',
      daily_active: '每日活跃',
      card_obtained: '获得卡片',
    }
    const newXp = totalXp + xp
    const newStage = getCurrentStage(newXp)
    if (newStage > stage) {
      setPrevStage(stage)
      setEvolving(true)
      setTimeout(() => setEvolving(false), 2500)
    }
    setTotalXp(newXp)
    await addXp(xp, type, labels[type])
    const logs = await getRecentActivity(8)
    setRecentLogs(logs)
    setAdding(false)
  }

  const activityButtons: { type: ActivityType; label: string; xp: number; emoji: string }[] = [
    { type: 'task_complete', label: '完成任务', xp: 50, emoji: '✅' },
    { type: 'problem_solved', label: '解决问题', xp: 100, emoji: '💡' },
    { type: 'code_written', label: '编写代码', xp: 30, emoji: '💻' },
    { type: 'conversation', label: '对话交流', xp: 10, emoji: '💬' },
    { type: 'daily_active', label: '每日签到', xp: 20, emoji: '🌟' },
  ]

  return (
    <main
      className={`min-h-screen bg-gradient-to-br ${stageInfo.bgGradient} text-white transition-all duration-1000`}
      style={{ fontFamily: "'Segoe UI', system-ui, sans-serif" }}
    >
      {/* Evolution flash */}
      {evolving && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/20 backdrop-blur-sm pointer-events-none">
          <div className="text-center animate-bounce">
            <div className="text-6xl mb-4">✨</div>
            <p className="text-4xl font-black text-white drop-shadow-lg">进化！</p>
            <p className="text-xl text-white/80 mt-2">{STAGES[getCurrentStage(totalXp)].name}</p>
          </div>
        </div>
      )}

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-black tracking-widest" style={{ color: stageInfo.color, textShadow: `0 0 20px ${stageInfo.glowColor}` }}>
            🐾 爪爪进化系统
          </h1>
          <p className="text-slate-400 text-sm mt-1">ZHUAZHUA EVOLUTION SYSTEM</p>
        </div>

        {/* Nav tabs */}
        <div className="flex gap-2 mb-6 bg-black/30 p-1 rounded-xl">
          {(['home', 'cards', 'log'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === tab ? 'text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'}`}
              style={activeTab === tab ? { backgroundColor: stageInfo.color + '33', border: `1px solid ${stageInfo.color}66` } : {}}
            >
              {tab === 'home' ? '🏠 主页' : tab === 'cards' ? '🃏 卡片' : '📋 日志'}
            </button>
          ))}
        </div>

        {/* HOME TAB */}
        {activeTab === 'home' && (
          <div className="space-y-5">
            {/* Character display */}
            <div className="relative flex flex-col items-center bg-black/30 backdrop-blur rounded-2xl border p-6" style={{ borderColor: stageInfo.color + '33' }}>
              <div className={`transition-all duration-1000 ${evolving ? 'scale-125 rotate-6' : 'scale-100 rotate-0'}`}>
                <CharacterSVG stage={stage} size={180} />
              </div>
              <div className="mt-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ backgroundColor: stageInfo.color + '22', color: stageInfo.color, border: `1px solid ${stageInfo.color}66` }}>
                    Lv.{stage} · {stageInfo.title}
                  </span>
                </div>
                <h2 className="text-2xl font-black" style={{ color: stageInfo.color }}>{stageInfo.name}</h2>
                <p className="text-slate-400 text-sm mt-1 max-w-xs">{stageInfo.description}</p>
              </div>
            </div>

            {/* XP Progress */}
            <div className="bg-black/30 backdrop-blur rounded-2xl border p-5" style={{ borderColor: stageInfo.color + '33' }}>
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm text-slate-400 font-medium">经验值进度</span>
                <span className="text-sm font-bold" style={{ color: stageInfo.color }}>{totalXp.toLocaleString()} XP</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${stageInfo.color}88, ${stageInfo.color})`, boxShadow: `0 0 8px ${stageInfo.glowColor}` }}
                />
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-xs text-slate-500">当前: {STAGES[stage].xpRequired.toLocaleString()}</span>
                {stage < 4 ? (
                  <span className="text-xs text-slate-500">下一阶段: {nextXp?.toLocaleString()} XP ({progress}%)</span>
                ) : (
                  <span className="text-xs" style={{ color: stageInfo.color }}>已达究极体 ✨</span>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: '进化阶段', value: `Lv.${stage}`, emoji: '⚡' },
                { label: '任务完成', value: tasksCompleted, emoji: '✅' },
                { label: '卡片收集', value: `${ownedCardIds.length}/${ALL_CARDS.length}`, emoji: '🃏' },
              ].map((s) => (
                <div key={s.label} className="bg-black/30 rounded-xl border p-3 text-center" style={{ borderColor: stageInfo.color + '22' }}>
                  <div className="text-2xl">{s.emoji}</div>
                  <div className="text-lg font-black mt-1" style={{ color: stageInfo.color }}>{s.value}</div>
                  <div className="text-xs text-slate-500">{s.label}</div>
                </div>
              ))}
            </div>

            {/* XP Buttons */}
            <div className="bg-black/30 backdrop-blur rounded-2xl border p-5" style={{ borderColor: stageInfo.color + '33' }}>
              <p className="text-sm text-slate-400 mb-3 font-medium">记录活动 · 获取经验</p>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {activityButtons.map((btn) => (
                  <button
                    key={btn.type}
                    onClick={() => handleAddXp(btn.type)}
                    disabled={adding}
                    className="flex flex-col items-center gap-1 py-3 px-2 rounded-xl border text-sm font-bold transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
                    style={{ borderColor: stageInfo.color + '44', backgroundColor: stageInfo.color + '11' }}
                  >
                    <span className="text-xl">{btn.emoji}</span>
                    <span className="text-white">{btn.label}</span>
                    <span className="text-xs" style={{ color: stageInfo.color }}>+{btn.xp} XP</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Evolution tree preview */}
            <div className="bg-black/30 backdrop-blur rounded-2xl border p-5" style={{ borderColor: stageInfo.color + '33' }}>
              <p className="text-sm text-slate-400 mb-4 font-medium">进化路线</p>
              <div className="flex items-center justify-between">
                {STAGES.map((s, i) => (
                  <div key={i} className="flex items-center">
                    <div className={`flex flex-col items-center gap-1 ${i <= stage ? 'opacity-100' : 'opacity-30'}`}>
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-black border-2"
                        style={i === stage
                          ? { backgroundColor: s.color + '33', borderColor: s.color, color: s.color, boxShadow: `0 0 10px ${s.glowColor}` }
                          : i < stage
                          ? { backgroundColor: s.color + '22', borderColor: s.color + '55', color: s.color + 'aa' }
                          : { backgroundColor: 'transparent', borderColor: '#374151', color: '#6b7280' }
                        }
                      >
                        {i}
                      </div>
                      <span className="text-xs text-center leading-tight" style={{ color: i <= stage ? s.color : '#6b7280', maxWidth: 48 }}>
                        {s.name}
                      </span>
                    </div>
                    {i < STAGES.length - 1 && (
                      <div className="flex-1 h-px mx-1" style={{ backgroundColor: i < stage ? STAGES[i].color + '66' : '#374151' }} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CARDS TAB */}
        {activeTab === 'cards' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-slate-400 text-sm">已收集 {ownedCardIds.length} / {ALL_CARDS.length} 张</p>
              <div className="flex gap-2">
                {(['common', 'rare', 'epic', 'legendary'] as const).map((r) => (
                  <span key={r} className="text-xs px-2 py-0.5 rounded-full" style={{ color: RARITY_CONFIG[r].color, border: `1px solid ${RARITY_CONFIG[r].color}55` }}>
                    {RARITY_CONFIG[r].label}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
              {ALL_CARDS.map((card) => (
                <CardItem
                  key={card.id}
                  card={card}
                  owned={ownedCardIds.includes(card.id)}
                />
              ))}
            </div>
          </div>
        )}

        {/* LOG TAB */}
        {activeTab === 'log' && (
          <div className="space-y-3">
            <p className="text-slate-400 text-sm">最近活动记录</p>
            {recentLogs.length === 0 ? (
              <div className="text-center py-12 text-slate-500">
                <div className="text-4xl mb-2">📭</div>
                <p>还没有活动记录</p>
              </div>
            ) : (
              recentLogs.map((log, i) => (
                <div key={i} className="flex items-center justify-between bg-black/30 rounded-xl border p-4" style={{ borderColor: stageInfo.color + '22' }}>
                  <div>
                    <p className="text-sm text-white font-medium">{log.description}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{new Date(log.created_at).toLocaleString('zh-CN')}</p>
                  </div>
                  <span className="text-sm font-bold" style={{ color: stageInfo.color }}>+{log.xp_earned} XP</span>
                </div>
              ))
            )}
          </div>
        )}

        <p className="text-center text-slate-600 text-xs mt-8">🐾 爪爪 · Built with Next.js + Supabase</p>
      </div>
    </main>
  )
}
