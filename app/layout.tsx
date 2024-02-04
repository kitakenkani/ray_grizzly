import Head from '@/node_modules/next/head'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from './components/Navbar'
import CartProvider from './components/Providers'
import ShoppingCartModal from './components/ShoppingCartModal'
import './globals.css'

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
      <body className={inter.className}>
        <CartProvider>
          <Navbar/>
          <ShoppingCartModal />
          {children}
        </CartProvider>
      </body>
    </html>
  )
}
