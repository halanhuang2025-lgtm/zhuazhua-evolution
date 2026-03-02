import { createClient, SupabaseClient } from '@supabase/supabase-js'

let _client: SupabaseClient | null = null

function getClient(): SupabaseClient {
  if (!_client) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''
    if (!url || !key || url.startsWith('your_')) {
      throw new Error('Supabase not configured. Check .env.local')
    }
    _client = createClient(url, key)
  }
  return _client
}

export function isConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
  return !!url && !url.startsWith('your_')
}

export interface EvolutionState {
  id: string
  agent_name: string
  total_xp: number
  tasks_completed: number
  conversations: number
  created_at: string
  updated_at: string
}

export interface ActivityLog {
  id: string
  activity_type: string
  description: string
  xp_earned: number
  created_at: string
}

export async function getEvolutionState(): Promise<EvolutionState | null> {
  if (!isConfigured()) return null
  const { data } = await getClient()
    .from('evolution_state')
    .select('*')
    .eq('agent_name', '爪爪')
    .single()
  return data
}

export async function addXp(xp: number, activityType: string, description: string) {
  if (!isConfigured()) return
  const state = await getEvolutionState()
  if (!state) return
  await getClient()
    .from('evolution_state')
    .update({
      total_xp: state.total_xp + xp,
      tasks_completed: activityType === 'task_complete' ? state.tasks_completed + 1 : state.tasks_completed,
      conversations: activityType === 'conversation' ? state.conversations + 1 : state.conversations,
      updated_at: new Date().toISOString(),
    })
    .eq('agent_name', '爪爪')
  await getClient().from('activity_log').insert({ activity_type: activityType, description, xp_earned: xp })
}

export async function getOwnedCards(): Promise<string[]> {
  if (!isConfigured()) return []
  const { data } = await getClient().from('owned_cards').select('card_id')
  return data?.map((r: { card_id: string }) => r.card_id) ?? []
}

export async function getRecentActivity(limit = 10): Promise<ActivityLog[]> {
  if (!isConfigured()) return []
  const { data } = await getClient()
    .from('activity_log')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit)
  return data ?? []
}

// ── Card unlock check ─────────────────────────────────────────
import type { Card } from './cards'

export async function checkAndUnlockCards(totalXp: number, cards: Card[]): Promise<string[]> {
  if (!isConfigured()) return []

  const { data: ownedRows } = await getClient().from('owned_cards').select('card_id')
  const ownedSet = new Set((ownedRows ?? []).map((r: { card_id: string }) => r.card_id))

  const newlyUnlocked: string[] = []
  for (const card of cards) {
    if (!ownedSet.has(card.id) && totalXp >= card.xpUnlock) {
      // Auto-grant special cards with xpUnlock=0 only if manually listed
      if (card.cardType === 'special' && card.xpUnlock === 0) continue
      await getClient().from('owned_cards').upsert({ card_id: card.id }, { onConflict: 'card_id' })
      newlyUnlocked.push(card.id)
    }
  }
  return newlyUnlocked
}

// Grant a special card manually (by Aiden)
export async function grantCard(cardId: string) {
  if (!isConfigured()) return
  await getClient().from('owned_cards').upsert({ card_id: cardId }, { onConflict: 'card_id' })
}
