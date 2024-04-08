import Head from '@/node_modules/next/head'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from './components/Navbar'
import CartProvider from './components/Providers'
import ShoppingCartModal from './components/ShoppingCartModal'
import './globals.css'
import { ThemeProvider } from './components/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ray Grizzly',
  description: 'Produced by Ryo Kumagai'
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <html lang="ja">
      <Head>
        <link rel="icon" href="/ray_grizzly.svg" type="image/svg+xml"></link>
      </Head>
      <body className={`${inter.className}`}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
          <CartProvider>
            <Navbar/>
            <ShoppingCartModal />
            {children}
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
