export default function Loading() {
  return (
    <div className='min-h-[60vh] pt-28 flex items-start justify-center bg-kci-surface'>
      <div className='flex flex-col items-center gap-4'>
        <div className='w-8 h-8 border-2 border-kci-brand/20 border-t-kci-brand rounded-full animate-spin' />
        <div className='h-3 w-32 bg-slate-200 rounded animate-pulse' />
      </div>
    </div>
  )
}
