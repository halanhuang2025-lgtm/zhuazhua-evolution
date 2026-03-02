'use client'

import { useEffect, useState } from 'react'
import CharacterSVG from '@/components/CharacterSVG'
import CardItem from '@/components/CardItem'
import { STAGES, getCurrentStage, getStageProgress, getNextStageXp, XP_REWARDS, ActivityType } from '@/lib/evolution'
import { ALL_CARDS, RARITY_CONFIG } from '@/lib/cards'
import { getEvolutionState, addXp, getOwnedCards, getRecentActivity } from '@/lib/supabase'
import { t, STAGES_I18N, CARDS_I18N, Lang } from '@/lib/i18n'

export default function Home() {
  const [lang, setLang] = useState<Lang>('en')
  const [totalXp, setTotalXp] = useState(0)
  const [tasksCompleted, setTasksCompleted] = useState(0)
  const [ownedCardIds, setOwnedCardIds] = useState<string[]>([])
  const [recentLogs, setRecentLogs] = useState<{ description: string; xp_earned: number; created_at: string }[]>([])
  const [activeTab, setActiveTab] = useState<'home' | 'cards' | 'log'>('home')
  const [adding, setAdding] = useState(false)
  const [evolving, setEvolving] = useState(false)

  const txt = t[lang]
  const stagesL = STAGES_I18N[lang]
  const stage = getCurrentStage(totalXp)
  const stageInfo = STAGES[stage]
  const stageL = stagesL[stage]
  const progress = getStageProgress(totalXp)
  const nextXp = stage < 4 ? getNextStageXp(totalXp) : null

  useEffect(() => {
    const saved = localStorage.getItem('lang') as Lang | null
    if (saved) setLang(saved)
    loadData()
  }, [])

  function toggleLang() {
    const next: Lang = lang === 'zh' ? 'en' : 'zh'
    setLang(next)
    localStorage.setItem('lang', next)
  }

  async function loadData() {
    const state = await getEvolutionState()
    if (state) {
      setTotalXp(state.total_xp)
      setTasksCompleted(state.tasks_completed)
    }
    setOwnedCardIds(await getOwnedCards())
    setRecentLogs(await getRecentActivity(8))
  }

  async function handleAddXp(type: ActivityType) {
    setAdding(true)
    const xp = XP_REWARDS[type]
    const newXp = totalXp + xp
    if (getCurrentStage(newXp) > stage) {
      setEvolving(true)
      setTimeout(() => setEvolving(false), 2500)
    }
    setTotalXp(newXp)
    await addXp(xp, type, (txt.activityNames as Record<string, string>)[type] ?? type)
    setRecentLogs(await getRecentActivity(8))
    setAdding(false)
  }

  const activityButtons: { type: ActivityType; xp: number; emoji: string }[] = [
    { type: 'task_complete',  xp: 50,  emoji: '✅' },
    { type: 'problem_solved', xp: 100, emoji: '💡' },
    { type: 'code_written',   xp: 30,  emoji: '💻' },
    { type: 'conversation',   xp: 10,  emoji: '💬' },
    { type: 'daily_active',   xp: 20,  emoji: '🌟' },
  ]

  return (
    <main
      className={`min-h-screen bg-gradient-to-br ${stageInfo.bgGradient} text-white transition-all duration-1000`}
      style={{ fontFamily: "var(--font-space), 'Segoe UI', system-ui, sans-serif" }}
    >
      {/* Evolution flash */}
      {evolving && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/20 backdrop-blur-sm pointer-events-none">
          <div className="text-center animate-bounce">
            <div className="text-6xl mb-4">✨</div>
            <p className="text-4xl font-black text-white drop-shadow-lg">{txt.evolveAlert}</p>
            <p className="text-xl text-white/80 mt-2">{stagesL[getCurrentStage(totalXp)].name}</p>
          </div>
        </div>
      )}

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-black tracking-widest font-orbitron" style={{ color: stageInfo.color, textShadow: `0 0 20px ${stageInfo.glowColor}` }}>
            🐾 {txt.title}
          </h1>
          <p className="text-slate-400 text-sm mt-1">{txt.subtitle}</p>

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
              {txt.nav[tab]}
            </button>
          ))}
          <button
            onClick={toggleLang}
            className="px-3 py-2 rounded-lg text-xs font-bold border transition-all hover:scale-105 whitespace-nowrap"
            style={{ borderColor: stageInfo.color + '55', color: stageInfo.color, backgroundColor: stageInfo.color + '11' }}
          >
            {lang === 'zh' ? 'EN' : '中'}
          </button>
        </div>

        {/* HOME TAB */}
        {activeTab === 'home' && (
          <div className="space-y-5">
            {/* Character */}
            <div className="relative flex flex-col items-center bg-black/30 backdrop-blur rounded-2xl border p-6" style={{ borderColor: stageInfo.color + '33' }}>
              <div className={`transition-all duration-1000 ${evolving ? 'scale-125 rotate-6' : 'scale-100 rotate-0'}`}>
                <CharacterSVG stage={stage} size={180} />
              </div>
              <div className="mt-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ backgroundColor: stageInfo.color + '22', color: stageInfo.color, border: `1px solid ${stageInfo.color}66` }}>
                    {txt.stage.title_badge(stage, stageL.title)}
                  </span>
                </div>
                <h2 className="text-2xl font-black" style={{ color: stageInfo.color }}>{stageL.name}</h2>
                <p className="text-slate-400 text-sm mt-1 max-w-xs">{stageL.desc}</p>
              </div>
            </div>

            {/* XP bar */}
            <div className="bg-black/30 backdrop-blur rounded-2xl border p-5" style={{ borderColor: stageInfo.color + '33' }}>
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm text-slate-400 font-medium">{txt.xp.label}</span>
                <span className="text-sm font-bold" style={{ color: stageInfo.color }}>{totalXp.toLocaleString()} XP</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${stageInfo.color}88, ${stageInfo.color})`, boxShadow: `0 0 8px ${stageInfo.glowColor}` }}
                />
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-xs text-slate-500">{txt.xp.current}: {STAGES[stage].xpRequired.toLocaleString()}</span>
                {stage < 4
                  ? <span className="text-xs text-slate-500">{txt.xp.next}: {nextXp?.toLocaleString()} XP ({progress}%)</span>
                  : <span className="text-xs" style={{ color: stageInfo.color }}>{txt.xp.max}</span>
                }
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: txt.stats.stage, value: `Lv.${stage}`, emoji: '⚡' },
                { label: txt.stats.tasks,  value: tasksCompleted,  emoji: '✅' },
                { label: txt.stats.cards,  value: `${ownedCardIds.length}/${ALL_CARDS.length}`, emoji: '🃏' },
              ].map((s) => (
                <div key={s.label} className="bg-black/30 rounded-xl border p-3 text-center" style={{ borderColor: stageInfo.color + '22' }}>
                  <div className="text-2xl">{s.emoji}</div>
                  <div className="text-lg font-black mt-1" style={{ color: stageInfo.color }}>{s.value}</div>
                  <div className="text-xs text-slate-500">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Activity buttons */}
            <div className="bg-black/30 backdrop-blur rounded-2xl border p-5" style={{ borderColor: stageInfo.color + '33' }}>
              <p className="text-sm text-slate-400 mb-3 font-medium">{txt.activities.label}</p>
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
                    <span className="text-white text-xs leading-tight text-center">{txt.activityNames[btn.type]}</span>
                    <span className="text-xs" style={{ color: stageInfo.color }}>+{btn.xp} XP</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Evolution path */}
            <div className="bg-black/30 backdrop-blur rounded-2xl border p-5" style={{ borderColor: stageInfo.color + '33' }}>
              <p className="text-sm text-slate-400 mb-4 font-medium">{txt.evolution.label}</p>
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
                      >{i}</div>
                      <span className="text-xs text-center leading-tight" style={{ color: i <= stage ? s.color : '#6b7280', maxWidth: 48 }}>
                        {stagesL[i].name}
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
              <p className="text-slate-400 text-sm">{txt.cards.collected(ownedCardIds.length, ALL_CARDS.length)}</p>
              <div className="flex gap-2">
                {(['common', 'rare', 'epic', 'legendary'] as const).map((r) => (
                  <span key={r} className="text-xs px-2 py-0.5 rounded-full" style={{ color: RARITY_CONFIG[r].color, border: `1px solid ${RARITY_CONFIG[r].color}55` }}>
                    {txt.rarityLabel[r]}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
              {ALL_CARDS.map((card) => {
                const cardL = CARDS_I18N[lang][card.id as keyof typeof CARDS_I18N['zh']]
                return (
                  <CardItem
                    key={card.id}
                    card={{ ...card, nameCn: cardL?.name ?? card.nameCn, description: cardL?.desc ?? card.description }}
                    owned={ownedCardIds.includes(card.id)}
                    lang={lang}
                    unlockLabel={txt.unlock}
                    needXpLabel={txt.needXp(card.xpCost)}
                    cardTypeLabel={txt.cardTypes[card.cardType]}
                  />
                )
              })}
            </div>
          </div>
        )}

        {/* LOG TAB */}
        {activeTab === 'log' && (
          <div className="space-y-3">
            <p className="text-slate-400 text-sm">{txt.log.label}</p>
            {recentLogs.length === 0 ? (
              <div className="text-center py-12 text-slate-500">
                <div className="text-4xl mb-2">📭</div>
                <p>{txt.log.empty}</p>
                <p className="text-sm mt-1">{txt.log.emptyHint}</p>
              </div>
            ) : (
              recentLogs.map((log, i) => (
                <div key={i} className="flex items-center justify-between bg-black/30 rounded-xl border p-4" style={{ borderColor: stageInfo.color + '22' }}>
                  <div>
                    <p className="text-sm text-white font-medium">{log.description}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{new Date(log.created_at).toLocaleString(lang === 'zh' ? 'zh-CN' : 'en-US')}</p>
                  </div>
                  <span className="text-sm font-bold" style={{ color: stageInfo.color }}>+{log.xp_earned} XP</span>
                </div>
              ))
            )}
          </div>
        )}

        <p className="text-center text-slate-600 text-xs mt-8">{txt.footer}</p>
      </div>
    </main>
  )
}
