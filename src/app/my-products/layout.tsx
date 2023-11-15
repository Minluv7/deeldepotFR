"use client"
import { client } from '@/libs/apolloClient'
import { ApolloProvider } from '@apollo/client'

export default function RootLayout({
  
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ApolloProvider client={client}>
        {children}
    </ApolloProvider>
  )
}
