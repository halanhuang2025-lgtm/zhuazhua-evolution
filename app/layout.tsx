import type { Metadata } from 'next'
import { Orbitron, Space_Grotesk } from 'next/font/google'
import { MantineProvider, createTheme, ColorSchemeScript } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import './globals.css'

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['700', '900'],
  variable: '--font-orbitron',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space',
  display: 'swap',
})

const theme = createTheme({
  primaryColor: 'violet',
  defaultRadius: 'lg',
  fontFamily: 'var(--font-space), system-ui, sans-serif',
  headings: { fontFamily: 'var(--font-orbitron), monospace' },
  colors: {
    dark: ['#d5d7e0','#acaebf','#8c8fa8','#666980','#4d4f66','#34354a','#2b2c3d','#1d1e2d','#0c0d1a','#050610'],
  },
})

export const metadata: Metadata = {
  title: 'ZhuaClaw Evolution',
  description: 'ZHUAZHUA Evolution System — Digimon-inspired AI evolution tracker',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${orbitron.variable} ${spaceGrotesk.variable}`}>
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
      </head>
      <body style={{ backgroundColor: '#08060f' }}>
        <MantineProvider theme={theme} defaultColorScheme="dark">
          <Notifications position="bottom-center" zIndex={1000} />
          {children}
        </MantineProvider>
      </body>
    </html>
  )
}
