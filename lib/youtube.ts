export async function getChannelStats(accessToken: string) {
    const url = 'https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&mine=true'
    
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  
    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.status}`)
    }
  
    const data = await response.json()
  
    if (!data.items || data.items.length === 0) {
      throw new Error('No YouTube channel found for this account')
    }
  
    const channel = data.items[0]
  
    return {
      channelId: channel.id,
      channelName: channel.snippet.title,
      handle: channel.snippet.customUrl ?? '',
      avatar: channel.snippet.thumbnails.default.url,
      subscriberCount: Number(channel.statistics.subscriberCount ?? 0),
      totalViews: Number(channel.statistics.viewCount ?? 0),
      videoCount: Number(channel.statistics.videoCount ?? 0),
    }
  }
  
  // ─── Fetch Recent Videos ──────────────────────────────────────────────────────
  
  export async function getRecentVideos(accessToken: string, channelId: string) {
    const channelUrl = `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}`
  
    const channelResponse = await fetch(channelUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  
    const channelData = await channelResponse.json()
    
    const uploadsPlaylistId = channelData.items[0].contentDetails.relatedPlaylists.uploads
  
    const videosUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=10`
  
    const videosResponse = await fetch(videosUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  
    const videosData = await videosResponse.json()
  
    return videosData.items.map((item: any) => ({
      id: item.snippet.resourceId.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.medium?.url ?? '',
      publishedAt: item.snippet.publishedAt,
    }))
  }