-- 爪爪进化系统数据库

create extension if not exists "uuid-ossp";

create table evolution_state (
  id uuid primary key default gen_random_uuid(),
  agent_name text not null default '爪爪',
  total_xp int not null default 0,
  tasks_completed int not null default 0,
  conversations int not null default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(agent_name)
);

create table owned_cards (
  id uuid primary key default gen_random_uuid(),
  card_id text not null,
  obtained_at timestamptz default now(),
  is_equipped boolean default false,
  unique(card_id)
);

create table activity_log (
  id uuid primary key default gen_random_uuid(),
  activity_type text not null,
  description text,
  xp_earned int not null default 0,
  created_at timestamptz default now()
);

-- 插入初始状态
insert into evolution_state (agent_name, total_xp) values ('爪爪', 0);

-- Enable RLS (adjust policies as needed)
alter table evolution_state enable row level security;
alter table owned_cards enable row level security;
alter table activity_log enable row level security;

create policy "allow all" on evolution_state for all using (true);
create policy "allow all" on owned_cards for all using (true);
create policy "allow all" on activity_log for all using (true);
