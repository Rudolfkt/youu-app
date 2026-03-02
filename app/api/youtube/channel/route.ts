import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getChannelStats } from '@/lib/youtube'
export async function GET() {
    const session = await getServerSession(authOptions)

  // If not logged in return 401 unauthorized
  if (!session) {
    return Response.json(
      { error: 'Not authenticated' },
      { status: 401 }
    )
  }
// Get the access token from the session
const accessToken = (session as any).access_token

// If no access token return 401
if (!accessToken) {
  return Response.json(
    { error: 'No access token found' },
    { status: 401 }
  )
}

// Try to get real channel data from YouTube
try {
    const channelData = await getChannelStats(accessToken)
    return Response.json(channelData)
  } catch (error) {
    console.error('YouTube API error:', error)
    return Response.json(
      { error: 'Failed to fetch channel data' },
      { status: 500 }
    )
  }
}
