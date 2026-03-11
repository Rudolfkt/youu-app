import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return Response.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const body = await request.json()
  const { message, channelContext, history } = body

  if (!message) {
    return Response.json({ error: 'No message provided' }, { status: 400 })
  }

  // Build a system prompt that gives Gemini context about the channel
  const systemPrompt = `You are Youu AI, a helpful YouTube analytics assistant. 
You are talking to a YouTube creator. Here is their channel data:
${channelContext ? JSON.stringify(channelContext, null, 2) : 'No channel data available yet.'}

Your job is to give them specific, actionable advice about growing their YouTube channel.
Be conversational, encouraging, and data-driven. Keep responses concise — 2-4 sentences max.
Never make up statistics. Only reference data that was provided to you above.
If you don't have enough data to answer specifically, say so honestly.`

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      { // <--- Added the missing comma right here!
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: systemPrompt }]
            },
            ...(history || []),
            {
              parts: [{ text: message }],
              role: 'user'
            }
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1024,
          }
        })
      }
    )

    if (!response.ok) {
      const errorBody = await response.json()
      console.error('Gemini error body:', JSON.stringify(errorBody, null, 2))
      throw new Error(`Gemini API error: ${response.status}`)
    }

    const data = await response.json()
    const rawReply = data.candidates?.[0]?.content?.parts?.[0]?.text
    const reply = rawReply?.replace(/\*\*(.*?)\*\*/g, '$1').replace(/\*(.*?)\*/g, '$1')
    if (!reply) {
      throw new Error('No response from Gemini')
    }

    return Response.json({ reply })

  } catch (error) {
    console.error('Gemini error:', error)
    return Response.json({ error: 'Failed to get AI response' }, { status: 500 })
  }
}