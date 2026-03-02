#!/usr/bin/env node
// award-xp.js — CLI: node award-xp.js <type> [description]
// Types: conversation | code_written | task_complete | problem_solved | daily_active | card_obtained

const SUPABASE_URL = 'https://fytqzlaungvcpcjodrit.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ5dHF6bGF1bmd2Y3Bjam9kcml0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI0MzE1ODgsImV4cCI6MjA4ODAwNzU4OH0.EMIJOD_pgQOIf2ISTFTflxVoj53PHPjZ83f6A8vbcac'

const XP_MAP = {
  conversation:   10,
  code_written:   30,
  daily_active:   20,
  task_complete:  50,
  problem_solved: 100,
  card_obtained:  15,
}

const [,, type, ...descParts] = process.argv
const desc = descParts.join(' ') || type

if (!XP_MAP[type]) {
  console.error(`Unknown type: ${type}. Valid: ${Object.keys(XP_MAP).join(', ')}`)
  process.exit(1)
}

const xp = XP_MAP[type]
const headers = {
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`,
  'Content-Type': 'application/json',
}

async function run() {
  // 1. Insert activity log
  const logRes = await fetch(`${SUPABASE_URL}/rest/v1/activity_log`, {
    method: 'POST',
    headers,
    body: JSON.stringify([{ activity_type: type, description: desc, xp_earned: xp }]),
  })
  if (!logRes.ok) { process.stderr.write('log err: ' + await logRes.text()); process.exit(1) }

  // 2. Fetch current XP
  const stateRes = await fetch(`${SUPABASE_URL}/rest/v1/evolution_state?agent_name=eq.爪爪&select=total_xp,tasks_completed`, { headers })
  const [state] = await stateRes.json()
  const newXp = (state?.total_xp || 0) + xp
  const newTasks = type === 'task_complete' ? (state?.tasks_completed || 0) + 1 : undefined

  // 3. Update XP
  const patch = { total_xp: newXp, updated_at: new Date().toISOString() }
  if (newTasks !== undefined) patch.tasks_completed = newTasks

  const upRes = await fetch(`${SUPABASE_URL}/rest/v1/evolution_state?agent_name=eq.爪爪`, {
    method: 'PATCH',
    headers: { ...headers, Prefer: 'return=representation' },
    body: JSON.stringify(patch),
  })
  if (!upRes.ok) { process.stderr.write('update err: ' + await upRes.text()); process.exit(1) }

  console.log(`+${xp} XP [${type}] → total: ${newXp} XP`)
}

run().catch(e => { console.error(e); process.exit(1) })
