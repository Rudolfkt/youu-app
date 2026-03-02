import NextAuth, { type NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.YOUTUBE_CLIENT_ID ?? '',
      clientSecret: process.env.YOUTUBE_CLIENT_SECRET ?? '',
      authorization: {
        params: {
          scope: [
            'openid',
            'email',
            'profile',
            'https://www.googleapis.com/auth/youtube.readonly',
            'https://www.googleapis.com/auth/yt-analytics.readonly',
          ].join(' '),
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token
        token.refreshToken = account.refresh_token
      }
      return token
    },
    async session({ session, token }) {
      ;(session as any).access_token = token.accessToken
      ;(session as any).refresh_token = token.refreshToken
      return session
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

