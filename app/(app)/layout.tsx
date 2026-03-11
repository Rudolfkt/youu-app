import { BottomNav } from '@/components/bottom-nav'

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative min-h-screen w-full bg-background flex flex-col">
      <div className="flex-1 overflow-hidden flex flex-col min-h-0">
        {children}
      </div>
      <BottomNav />
    </div>
  )
}
