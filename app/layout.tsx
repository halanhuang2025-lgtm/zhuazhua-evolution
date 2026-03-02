import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '爪爪进化系统',
  description: 'ZHUAZHUA Evolution System — 数码宝贝风格的AI进化追踪器',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  )
}
