'use client'

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className='animate-[pageIn_0.15s_ease-out]'>
      {children}
    </div>
  )
}
