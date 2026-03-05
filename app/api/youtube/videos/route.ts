import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getRecentVideos } from '@/lib/youtube'

export async function GET(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return Response.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const accessToken = (session as any).access_token

  if (!accessToken) {
    return Response.json({ error: 'No access token' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const channelId = searchParams.get('channelId')

  if (!channelId) {
    return Response.json({ error: 'No channel ID provided' }, { status: 400 })
  }

  try {
    const videos = await getRecentVideos(accessToken, channelId)
    return Response.json(videos)
  } catch (error) {
    console.error('Videos API error:', error)
    return Response.json({ error: 'Failed to fetch videos' }, { status: 500 })
  }
}