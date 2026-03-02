#!/usr/bin/env node
// award-xp.js — Usage: node award-xp.js <type>
// Types: conversation | code_written | task_complete | problem_solved | daily_active | card_obtained

const SUPABASE_URL = 'https://fytqzlaungvcpcjodrit.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ5dHF6bGF1bmd2Y3Bjam9kcml0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI0MzE1ODgsImV4cCI6MjA4ODAwNzU4OH0.EMIJOD_pgQOIf2ISTFTflxVoj53PHPjZ83f6A8vbcac'
const STATE_FILE = require('os').homedir() + '/.openclaw/workspace-main/memory/heartbeat-state.json'

const CONFIG = {
  conversation:   { xp: 10,  label: 'Conversation' },
  code_written:   { xp: 30,  label: 'Code written' },
  daily_active:   { xp: 20,  label: 'Daily active' },
  task_complete:  { xp: 50,  label: 'Task completed' },
  problem_solved: { xp: 100, label: 'Problem solved' },
  card_obtained:  { xp: 15,  label: 'Card obtained' },
}

const [,, type] = process.argv
const cfg = CONFIG[type]
if (!cfg) { console.error(`Unknown type: ${type}`); process.exit(1) }

// daily_active: once per day (Asia/Shanghai)
if (type === 'daily_active') {
  const fs = require('fs')
  const today = new Date().toLocaleDateString('zh-CN', { timeZone: 'Asia/Shanghai' })
  let state = {}
  try { state = JSON.parse(fs.readFileSync(STATE_FILE, 'utf8')) } catch(e) {}
  if (state.lastDailyActive === today) {
    console.log(`daily_active already logged for ${today}, skipping`)
    process.exit(0)
  }
  state.lastDailyActive = today
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2))
}

const headers = {
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`,
  'Content-Type': 'application/json',
}

async function run() {
  await fetch(`${SUPABASE_URL}/rest/v1/activity_log`, {
    method: 'POST', headers,
    body: JSON.stringify([{ activity_type: type, description: cfg.label, xp_earned: cfg.xp }]),
  })
  const stateRes = await fetch(`${SUPABASE_URL}/rest/v1/evolution_state?agent_name=eq.爪爪&select=total_xp,tasks_completed`, { headers })
  const [state] = await stateRes.json()
  const newXp = (state?.total_xp || 0) + cfg.xp
  const patch = { total_xp: newXp, updated_at: new Date().toISOString() }
  if (type === 'task_complete') patch.tasks_completed = (state?.tasks_completed || 0) + 1
  await fetch(`${SUPABASE_URL}/rest/v1/evolution_state?agent_name=eq.爪爪`, {
    method: 'PATCH',
    headers: { ...headers, Prefer: 'return=representation' },
    body: JSON.stringify(patch),
  })
  console.log(`+${cfg.xp} XP [${type}] → total: ${newXp} XP`)
}

run().catch(e => { console.error(e); process.exit(1) })
