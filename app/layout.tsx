'use client'

import Header from '@/components/Header'
import './../styles/globals.css'
import type { Metadata } from 'next'
import Footer from '@/components/Footer'
// import NextNProgress from 'nextjs-progressbar';
import AuthProvider from '@/utils/AuthProvider'

// export const metadata: Metadata = {
//   title: 'Home | Blog Site',
//   description: 'Generated by create next app',
// }

export default function RootLayout({
 
  children,
}: {
 
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-[#f2f2f2]">
        <AuthProvider>
          {/* <NextNProgress color="#fff" height={5}/> */}
          <Header />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
