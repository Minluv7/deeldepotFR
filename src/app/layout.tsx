
import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import { NextAuthProvider } from '@/provider/Authprovider'
import './globals.css'
import Footer from '@/components/Footer'
import {client} from '@/libs/apolloClient'
import {ApolloProvider} from '@apollo/client'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl">
      <body>
        <NextAuthProvider>
        <Navbar/>
        {children}
        <Footer/>
        </NextAuthProvider>
        </body>
    </html>
  )
}
