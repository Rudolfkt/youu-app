 'use client'

import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import { ScreenDashboard } from '@/components/screens/screen-dashboard'
import { Spinner } from '@/components/ui/spinner'

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#080808]">
        <Spinner className="w-6 h-6 text-[#F5F5F5]" />
      </div>
    )
  }

  if (!session) {
    return null
  }

  return <ScreenDashboard />
}
