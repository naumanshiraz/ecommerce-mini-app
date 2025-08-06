'use client'

import { Providers as ReduxProvider } from '@/redux/providers'
import QueryProvider from '@/query/QueryProvider'
import { SnackbarProvider } from '@/presentation/providers/SnackbarProvider'
import { LanguageProvider } from '@/presentation/context/LanguageContext'
import Navbar from '@/presentation/components/Navbar'
import CartModal from '@/presentation/components/CartModal'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
      <LanguageProvider>
        <QueryProvider>
          <SnackbarProvider>
            <Navbar />
            <CartModal />
            {children}
          </SnackbarProvider>
        </QueryProvider>
      </LanguageProvider>
    </ReduxProvider>
  )
}
