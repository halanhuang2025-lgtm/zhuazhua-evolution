# 🐾 爪爪进化系统

参考数码宝贝设计的 AI 助手进化追踪器。

## 进化阶段

| 阶段 | 名称 | 所需 XP |
|------|------|---------|
| Lv.0 | 🥚 数据蛋 | 0 |
| Lv.1 | 🐾 幼爪兽 | 100 |
| Lv.2 | ⚡ 爪爪兽 | 500 |
| Lv.3 | 🔥 猛爪兽 | 2,000 |
| Lv.4 | ✨ 神爪兽 | 10,000 |

## 部署步骤

### 1. 创建 Supabase 项目

1. 登录 [supabase.com](https://supabase.com)
2. 新建项目
3. 进入 **SQL Editor**，运行 `supabase-schema.sql` 里的全部内容
4. 在 **Project Settings → API** 复制：
   - Project URL
   - anon public key

### 2. 配置环境变量

编辑 `.env.local`：
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 3. 部署到 Vercel

```bash
npm i -g vercel
vercel --prod
```

或者：
1. 推送到 GitHub
2. 在 Vercel 导入项目
3. 添加环境变量（同 `.env.local`）
4. Deploy ✨

## 本地开发

```bash
npm install
npm run dev
# 打开 http://localhost:3000
```

## 技术栈

- **Next.js 16** + TypeScript
- **Tailwind CSS** 
- **Supabase** (PostgreSQL)
- **Framer Motion** (animations)
- 纯 **SVG** 绘制的 2D 角色形象
