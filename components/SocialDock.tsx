'use client'

import { socialLinks, type SocialLinkKey } from '@/lib/social-links'

type SocialDockProps = {
  showLabels?: boolean
  keys?: readonly SocialLinkKey[]
  compact?: boolean
}

export function SocialDock({
  showLabels = false,
  keys,
  compact = false,
}: SocialDockProps) {
  const links = keys
    ? socialLinks.filter((link) => keys.includes(link.key))
    : socialLinks

  const iconSize = showLabels ? 22 : compact ? 20 : 24
  const buttonSize = showLabels
    ? 'w-full gap-3 px-4 py-3 rounded-xl'
    : compact
      ? 'h-11 w-11 sm:h-14 sm:w-14'
      : 'h-14 w-14'

  return (
    <div
      className={`flex items-center gap-2 sm:gap-3 ${
        showLabels
          ? 'w-full flex-col'
          : compact
            ? 'flex-row sm:flex-col'
            : 'flex-col'
      }`}
      aria-label='Réseaux sociaux KCI'
    >
      {links.map(({ key, icon: Icon, href, label, className }) => (
        <a
          key={key}
          href={href}
          target='_blank'
          rel='noopener noreferrer'
          aria-label={label}
          title={label}
          className={`flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110 active:scale-95 shadow-2xl touch-manipulation ${buttonSize} ${className}`}
        >
          <Icon size={iconSize} stroke={1.5} className='shrink-0' />
          {showLabels && (
            <span className='text-sm font-semibold tracking-wide'>{label}</span>
          )}
        </a>
      ))}
    </div>
  )
}
