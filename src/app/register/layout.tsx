// "use client"
// import { NextAuthProvider } from '@/provider/Authprovider';
// import { ApolloProvider } from '@apollo/client';
// import { client } from '@/libs/apolloClient';

// type Props = {
//   children: React.ReactNode;
//   session: any;
// };

// export default function RootLayout({
//   children, session,
// }: 
//   Props
// ) {
//   return (
//     <ApolloProvider client={client}>
//       <NextAuthProvider>
//     {children}
//       </NextAuthProvider>
//     </ApolloProvider>
//   )
// }

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
