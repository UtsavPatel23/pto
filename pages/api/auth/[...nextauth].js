import NextAuth from 'next-auth'
//import AppleProvider from 'next-auth/providers/apple'
//import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'
//import EmailProvider from 'next-auth/providers/email'

export default NextAuth({
  providers: [
    // OAuth authentication providers...
    /*AppleProvider({
      clientId: process.env.APPLE_ID,
      clientSecret: process.env.APPLE_SECRET
    }),
    FacebookProvider({
      clientId: process.env.NEXT_PUBLIC_FACEBOOK_ID,
      clientSecret: process.env.NEXT_PUBLIC_FACEBOOK_SECRET
    }),*/
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET
    }),
    // Passwordless / email sign in
    /*EmailProvider({
      server: process.env.MAIL_SERVER,
      from: 'NextAuth.js <no-reply@example.com>'
    }),*/
  ]
})