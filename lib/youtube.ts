

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

export async function getRecentVideos(accessToken: string, channelId: string) {
  // Step 1 — get uploads playlist id
  const channelUrl = `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}`
  const channelResponse = await fetch(channelUrl, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  const channelData = await channelResponse.json()
  const uploadsPlaylistId = channelData.items[0].contentDetails.relatedPlaylists.uploads

  // Step 2 — get recent video ids from playlist
  const videosUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=10`
  const videosResponse = await fetch(videosUrl, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  const videosData = await videosResponse.json()

  // Step 3 — extract video ids as comma separated string
  const videoIds = videosData.items
    .map((item: any) => item.snippet.resourceId.videoId)
    .join(',')

  // Step 4 — get statistics for all videos in one call
  const statsUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${videoIds}`
  const statsResponse = await fetch(statsUrl, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  const statsData = await statsResponse.json()

  // Step 5 — combine data and sort by view count
  const videos = statsData.items.map((item: any) => ({
    id: item.id,
    title: item.snippet.title,
    thumbnail: item.snippet.thumbnails.medium?.url ?? '',
    publishedAt: item.snippet.publishedAt,
    viewCount: Number(item.statistics.viewCount ?? 0),
    likeCount: Number(item.statistics.likeCount ?? 0),
    duration: item.contentDetails.duration,
  }))

  return videos.sort((a: any, b: any) => b.viewCount - a.viewCount)
}

export async function getChannelAnalytics(accessToken: string, channelId: string) {
  // Get dates for last 28 days
  const endDate = new Date().toISOString().split('T')[0]
  const startDate = new Date(Date.now() - 28 * 24 * 60 * 60 * 1000)
    .toISOString().split('T')[0]

  // Fetch weekly analytics from YouTube Analytics API
  const url = `https://youtubeanalytics.googleapis.com/v2/reports?ids=channel==${channelId}&startDate=${startDate}&endDate=${endDate}&metrics=views,estimatedMinutesWatched,averageViewDuration,subscribersGained,annotationClickThroughRate&dimensions=day&sort=day`

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (!response.ok) {
    throw new Error(`Analytics API error: ${response.status}`)
  }

  const data = await response.json()

  if (!data.rows || data.rows.length === 0) {
    return {
      totalViews: 0,
      watchTimeHours: 0,
      avgViewDuration: 0,
      subscribersGained: 0,
      ctr: 0,
      dailyViews: [],
    }
  }

  // Sum up all the rows
  let totalViews = 0
  let totalMinutes = 0
  let totalDuration = 0
  let totalSubs = 0
  const dailyViews: number[] = []

  data.rows.forEach((row: any) => {
    totalViews += row[1]
    totalMinutes += row[2]
    totalDuration += row[3]
    totalSubs += row[4]
    dailyViews.push(row[1])
  })

  const avgDuration = totalDuration / data.rows.length

  return {
    totalViews,
    watchTimeHours: Math.round(totalMinutes / 60),
    avgViewDuration: Math.round(avgDuration),
    subscribersGained: totalSubs,
    ctr: 0,
    dailyViews,
  }
}