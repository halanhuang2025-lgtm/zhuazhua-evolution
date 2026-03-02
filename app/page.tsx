'use client'

import { useEffect, useState } from 'react'
import {
  Container, Stack, Group, Paper, Text, Title, Progress,
  Badge, Button, SimpleGrid, ThemeIcon, Box, ActionIcon,
} from '@mantine/core'
import { notifications } from '@mantine/notifications'
import CharacterSVG from '@/components/CharacterSVG'
import CardItem from '@/components/CardItem'
import { STAGES, getCurrentStage, getStageProgress, getNextStageXp, XP_REWARDS, ActivityType } from '@/lib/evolution'
import { ALL_CARDS, RARITY_CONFIG } from '@/lib/cards'
import { getEvolutionState, addXp, getOwnedCards, getRecentActivity, checkAndUnlockCards } from '@/lib/supabase'
import { t, STAGES_I18N, CARDS_I18N, Lang } from '@/lib/i18n'

export default function Home() {
  const [lang, setLang] = useState<Lang>('en')
  const [totalXp, setTotalXp] = useState(0)
  const [tasksCompleted, setTasksCompleted] = useState(0)
  const [ownedCardIds, setOwnedCardIds] = useState<string[]>([])
  const [recentLogs, setRecentLogs] = useState<{ description: string; xp_earned: number; created_at: string }[]>([])
  const [activeTab, setActiveTab] = useState<string | null>('home')
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
    const owned = await getOwnedCards()
    setOwnedCardIds(owned)
    setRecentLogs(await getRecentActivity(8))
    if (state) await runCardUnlockCheck(state.total_xp)
  }

  async function runCardUnlockCheck(xp: number) {
    const newly = await checkAndUnlockCards(xp, ALL_CARDS)
    if (newly.length > 0) {
      newly.forEach(id => {
        const card = ALL_CARDS.find(c => c.id === id)
        if (card) {
          notifications.show({
            title: lang === 'zh' ? '卡片解锁！' : 'Card Unlocked!',
            message: lang === 'zh' ? card.nameCn : card.name,
            color: 'violet',
            icon: <span style={{ fontSize: 20 }}>{card.icon}</span>,
            autoClose: 4000,
          })
        }
      })
      setOwnedCardIds(await getOwnedCards())
    }
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
    await runCardUnlockCheck(newXp)
    setAdding(false)
  }

  const activityButtons: { type: ActivityType; xp: number; emoji: string }[] = [
    { type: 'task_complete',  xp: 50,  emoji: '✅' },
    { type: 'problem_solved', xp: 100, emoji: '💡' },
    { type: 'code_written',   xp: 30,  emoji: '💻' },
    { type: 'conversation',   xp: 10,  emoji: '💬' },
    { type: 'daily_active',   xp: 20,  emoji: '🌟' },
  ]

  const glowStyle = { boxShadow: `0 0 32px ${stageInfo.glowColor}` }

  return (
    <Box
      style={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, var(--from, #0d0a1a) 0%, #080612 100%)`,
        fontFamily: 'var(--font-space), system-ui, sans-serif',
        transition: 'all 0.8s',
      }}
    >
      {/* Evolution flash overlay */}
      {evolving && (
        <Box style={{
          position: 'fixed', inset: 0, zIndex: 200,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(6px)',
          pointerEvents: 'none',
        }}>
          <Stack align="center" gap="xs" style={{ animation: 'bounce 0.5s infinite alternate' }}>
            <Text size="60px">✨</Text>
            <Title order={1} style={{ color: '#fff', fontFamily: 'var(--font-orbitron)', fontSize: 40, textShadow: '0 0 30px white' }}>
              {txt.evolveAlert}
            </Title>
            <Text c="dimmed">{stagesL[getCurrentStage(totalXp)].name}</Text>
          </Stack>
        </Box>
      )}

      <Container size="sm" py="xl">
        {/* Header */}
        <Stack gap="xs" mb="xl" align="center" style={{ position: 'relative' }}>
          <Title
            order={1}
            style={{
              fontFamily: 'var(--font-orbitron)',
              color: stageInfo.color,
              textShadow: `0 0 20px ${stageInfo.glowColor}`,
              fontSize: 'clamp(20px, 5vw, 30px)',
              letterSpacing: 3,
              textAlign: 'center',
            }}
          >
            🐾 {txt.title}
          </Title>
          <Text size="xs" c="dimmed" style={{ textTransform: "uppercase", letterSpacing: 2 }}>{txt.subtitle}</Text>
        </Stack>

        {/* Nav tabs */}
        <Paper mb="xl" p="xs" style={{ background: 'rgba(0,0,0,0.4)' }}>
          <Group justify="space-between" wrap="nowrap">
            <Group gap="xs" style={{ flex: 1 }}>
              {(['home', 'cards', 'log'] as const).map(tab => (
                <Button
                  key={tab}
                  variant={activeTab === tab ? 'light' : 'subtle'}
                  onClick={() => setActiveTab(tab)}
                  size="sm"
                  style={{
                    flex: 1,
                    color: activeTab === tab ? stageInfo.color : '#94a3b8',
                    borderColor: activeTab === tab ? `${stageInfo.color}55` : 'transparent',
                    background: activeTab === tab ? `${stageInfo.color}22` : 'transparent',
                  }}
                >
                  {txt.nav[tab]}
                </Button>
              ))}
            </Group>
            <ActionIcon
              variant="subtle"
              onClick={toggleLang}
              size="lg"
              style={{ color: stageInfo.color, border: `1px solid ${stageInfo.color}55`, borderRadius: 10, minWidth: 44 }}
            >
              <Text size="xs" fw={700}>{lang === 'zh' ? 'EN' : '中'}</Text>
            </ActionIcon>
          </Group>
        </Paper>

        {/* HOME TAB */}
        {activeTab === 'home' && (
          <Stack gap="md">
            {/* Character card */}
            <Paper
              p="xl"
              style={{
                background: 'rgba(0,0,0,0.35)',
                border: `1px solid ${stageInfo.color}33`,
                backdropFilter: 'blur(8px)',
                ...glowStyle,
              }}
            >
              <Stack align="center" gap="md">
                <Box style={{ transform: evolving ? 'scale(1.2) rotate(6deg)' : 'scale(1)', transition: 'all 0.5s' }}>
                  <CharacterSVG stage={stage} size={180} />
                </Box>
                <Stack gap={4} align="center">
                  <Badge
                    variant="outline"
                    style={{ borderColor: stageInfo.color, color: stageInfo.color }}
                  >
                    {txt.stage.title_badge(stage, stageL.title)}
                  </Badge>
                  <Title order={2} style={{ color: stageInfo.color, fontFamily: 'var(--font-orbitron)' }}>
                    {stageL.name}
                  </Title>
                  <Text size="sm" c="dimmed" ta="center" maw={280}>{stageL.desc}</Text>
                </Stack>
              </Stack>
            </Paper>

            {/* XP Progress */}
            <Paper p="lg" style={{ background: 'rgba(0,0,0,0.35)', border: `1px solid ${stageInfo.color}33` }}>
              <Group justify="space-between" mb="xs">
                <Text size="sm" c="dimmed" fw={500}>{txt.xp.label}</Text>
                <Text size="sm" fw={700} style={{ color: stageInfo.color }}>{totalXp.toLocaleString()} XP</Text>
              </Group>
              <Progress
                value={progress}
                size="md"
                radius="xl"
                styles={{ section: { background: `linear-gradient(90deg, ${stageInfo.color}88, ${stageInfo.color})` } }}
              />
              <Group justify="space-between" mt="xs">
                <Text size="xs" c="dimmed">{txt.xp.current}: {STAGES[stage].xpRequired.toLocaleString()}</Text>
                {stage < 4
                  ? <Text size="xs" c="dimmed">{txt.xp.next}: {nextXp?.toLocaleString()} XP ({progress}%)</Text>
                  : <Text size="xs" style={{ color: stageInfo.color }}>{txt.xp.max}</Text>
                }
              </Group>
            </Paper>

            {/* Stats */}
            <SimpleGrid cols={3} spacing="sm">
              {[
                { label: txt.stats.stage, value: `Lv.${stage}`, emoji: '⚡' },
                { label: txt.stats.tasks,  value: tasksCompleted,  emoji: '✅' },
                { label: txt.stats.cards,  value: `${ownedCardIds.length}/${ALL_CARDS.length}`, emoji: '🃏' },
              ].map(s => (
                <Paper key={s.label} p="sm" style={{ background: 'rgba(0,0,0,0.35)', border: `1px solid ${stageInfo.color}22`, textAlign: 'center' }}>
                  <Text size="xl">{s.emoji}</Text>
                  <Text fw={900} size="lg" style={{ color: stageInfo.color }}>{s.value}</Text>
                  <Text size="xs" c="dimmed">{s.label}</Text>
                </Paper>
              ))}
            </SimpleGrid>

            {/* Activity buttons */}
            <Paper p="lg" style={{ background: 'rgba(0,0,0,0.35)', border: `1px solid ${stageInfo.color}33` }}>
              <Text size="sm" c="dimmed" fw={500} mb="sm">{txt.activities.label}</Text>
              <SimpleGrid cols={2} spacing="sm">
                {activityButtons.map(btn => (
                  <Button
                    key={btn.type}
                    variant="subtle"
                    disabled={adding}
                    onClick={() => handleAddXp(btn.type)}
                    style={{
                      border: `1px solid ${stageInfo.color}44`,
                      background: `${stageInfo.color}11`,
                      height: 'auto',
                      padding: '10px 8px',
                    }}
                  >
                    <Stack gap={2} align="center">
                      <Text size="xl">{btn.emoji}</Text>
                      <Text size="xs" c="white" fw={600}>{(txt.activityNames as Record<string, string>)[btn.type]}</Text>
                      <Text size="xs" style={{ color: stageInfo.color }}>+{btn.xp} XP</Text>
                    </Stack>
                  </Button>
                ))}
              </SimpleGrid>
            </Paper>

            {/* Evolution path */}
            <Paper p="lg" style={{ background: 'rgba(0,0,0,0.35)', border: `1px solid ${stageInfo.color}33` }}>
              <Text size="sm" c="dimmed" fw={500} mb="md">{txt.evolution.label}</Text>
              <Group justify="space-between" wrap="nowrap">
                {STAGES.map((s, i) => (
                  <Group key={i} wrap="nowrap" style={{ flex: 1, alignItems: 'flex-start' }}>
                    <Stack align="center" gap={4} style={{ flex: 1, opacity: i <= stage ? 1 : 0.3 }}>
                      <ThemeIcon
                        size="lg"
                        radius="xl"
                        variant={i === stage ? 'filled' : i < stage ? 'light' : 'outline'}
                        style={i === stage ? {
                          backgroundColor: `${s.color}33`,
                          border: `2px solid ${s.color}`,
                          color: s.color,
                          boxShadow: `0 0 10px ${s.glowColor}`,
                        } : {
                          borderColor: i < stage ? `${s.color}55` : '#374151',
                          color: i < stage ? `${s.color}aa` : '#6b7280',
                        }}
                      >
                        <Text size="xs" fw={900}>{i}</Text>
                      </ThemeIcon>
                      <Text size="10px" ta="center" style={{ color: i <= stage ? s.color : '#6b7280', maxWidth: 48, lineHeight: 1.2 }}>
                        {stagesL[i].name}
                      </Text>
                    </Stack>
                    {i < STAGES.length - 1 && (
                      <Box style={{ flex: 1, height: 1, marginTop: 18, backgroundColor: i < stage ? `${STAGES[i].color}66` : '#374151' }} />
                    )}
                  </Group>
                ))}
              </Group>
            </Paper>
          </Stack>

        )}

        {/* CARDS TAB */}
        {activeTab === 'cards' && (
          <Stack gap="xl">
            <Group justify="space-between">
              <Text size="sm" c="dimmed">{txt.cards.collected(ownedCardIds.length, ALL_CARDS.length)}</Text>
              <Group gap="xs">
                {(['common', 'rare', 'epic', 'legendary'] as const).map(r => (
                  <Badge key={r} variant="outline" size="xs" style={{ borderColor: `${RARITY_CONFIG[r].color}55`, color: RARITY_CONFIG[r].color }}>
                    {txt.rarityLabel[r]}
                  </Badge>
                ))}
              </Group>
            </Group>

            {(['skill', 'evolution', 'special'] as const).map(section => {
              const sectionCards = ALL_CARDS.filter(c => c.cardType === section)
              const sectionLabel = { skill: '⚙️ Skill', evolution: '✨ Evolution', special: '🌟 Special' }[section]
              return (
                <Stack key={section} gap="sm">
                  <Text size="xs" c="dimmed" style={{ textTransform: "uppercase", letterSpacing: 2 }}>{sectionLabel}</Text>
                  <Group gap="md" wrap="wrap">
                    {sectionCards.map(card => {
                      const owned = ownedCardIds.includes(card.id)
                      const cardL = CARDS_I18N[lang][card.id as keyof typeof CARDS_I18N['zh']]
                      const xpPct = card.xpUnlock > 0 ? Math.min(100, Math.round(totalXp / card.xpUnlock * 100)) : 100
                      return (
                        <Stack key={card.id} align="center" gap={6}>
                          <CardItem
                            card={{ ...card, nameCn: cardL?.name ?? card.nameCn, description: cardL?.desc ?? card.description }}
                            owned={owned}
                            lang={lang}
                            unlockLabel={txt.unlock}
                            needXpLabel={txt.needXp(card.xpCost)}
                            cardTypeLabel={txt.cardTypes[card.cardType]}
                          />
                          {!owned && card.xpUnlock > 0 && (
                            <Box w={144}>
                              <Progress value={xpPct} size="xs" radius="xl"
                                styles={{ section: { backgroundColor: RARITY_CONFIG[card.rarity].color } }}
                              />
                              <Text size="10px" ta="center" c="dimmed" mt={2}>
                                {totalXp.toLocaleString()} / {card.xpUnlock.toLocaleString()} XP
                              </Text>
                            </Box>
                          )}
                          {owned && (
                            <Badge size="xs" variant="light" style={{ color: RARITY_CONFIG[card.rarity].color, background: `${RARITY_CONFIG[card.rarity].color}18` }}>
                              ✓ {lang === 'zh' ? '已解锁' : 'Unlocked'}
                            </Badge>
                          )}
                          {card.xpUnlock === 0 && !owned && (
                            <Text size="10px" c="dimmed">{lang === 'zh' ? '手动授予' : 'Manual grant'}</Text>
                          )}
                        </Stack>
                      )
                    })}
                  </Group>
                </Stack>
              )
            })}
          </Stack>

        )}

        {/* LOG TAB */}
        {activeTab === 'log' && (
          <Stack gap="sm">
            <Text size="sm" c="dimmed">{txt.log.label}</Text>
            {recentLogs.length === 0 ? (
              <Stack align="center" py="xl" gap="xs">
                <Text size="36px">📭</Text>
                <Text c="dimmed">{txt.log.empty}</Text>
                <Text size="sm" c="dimmed">{txt.log.emptyHint}</Text>
              </Stack>
            ) : (
              recentLogs.map((log, i) => (
                <Paper key={i} p="md" style={{ background: 'rgba(0,0,0,0.35)', border: `1px solid ${stageInfo.color}22` }}>
                  <Group justify="space-between">
                    <Stack gap={2}>
                      <Text size="sm" fw={500}>{log.description}</Text>
                      <Text size="xs" c="dimmed">
                        {new Date(log.created_at).toLocaleString(lang === 'zh' ? 'zh-CN' : 'en-US')}
                      </Text>
                    </Stack>
                    <Text size="sm" fw={700} style={{ color: stageInfo.color }}>+{log.xp_earned} XP</Text>
                  </Group>
                </Paper>
              ))
            )}
          </Stack>
        )}

        <Text ta="center" size="xs" c="dimmed" mt="xl">{txt.footer}</Text>
      </Container>
    </Box>
  )
}
