import type { Metadata } from 'next'
import localFont from 'next/font/local'

import './globals.css'

import { Toaster } from '@/components/ui/sonner'

import { ThemeProvider } from '@/components/theme-provider'
import { APP_DESCRIPTION, APP_NAME } from '@/lib/constants'

const openSans = localFont({
  src: '/fonts/OpenSans-VariableFont_wdth,wght.ttf',
  preload: false
})

//👇 Configure the object for our second font
const roboto = localFont({
  src: '/fonts/Roboto-VariableFont_wdth,wght.ttf',
  preload: false
})

export const metadata: Metadata = {
  title: {
    template: `%s | Computer Repair Shop`,
    default: APP_NAME
  },
  description: APP_DESCRIPTION
  // metadataBase: new URL(SERVER_URL)
}
export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${openSans.className} ${roboto.className} bg-background font-sans antialiased`}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster
            position='bottom-center'
            toastOptions={{
              unstyled: true,
              classNames: {
                error: 'text-red-600',
                success: 'text-green-700',
                warning: 'text-yellow-700',
                info: 'text-blue-700'
              }
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  )
}
