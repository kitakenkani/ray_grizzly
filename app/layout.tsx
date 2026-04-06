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
  description: 'Produced by Ryo Kumagai',
  icons: {
    icon: '/ray_grizzly.svg'
  }
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
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
