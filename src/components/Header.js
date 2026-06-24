'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV = [
  { label: 'Overview',    href: '/',            icon: '⌂' },
  { label: 'Use Cases',   href: '/usecases',    icon: '☰' },
  { label: 'States',      href: '/states',      icon: '⊡' },
  { label: 'API Tracker', href: '/apis',         icon: '⇄' },
]

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 shadow-md" style={{ background: 'linear-gradient(90deg, #0e3d28 0%, #166340 100%)' }}>
      <div className="max-w-screen-xl mx-auto px-6 flex items-center justify-between h-16">
        
        {/* AgriStack Branding */}
        <div className="flex items-center gap-4">
          <div className="flex items-center shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/agristack-logo.png"
              alt="AgriStack"
              className="h-9 w-auto"
              style={{ objectFit: 'contain', maxWidth: '160px' }}
            />
          </div>
          <div className="leading-tight border-l border-white/20 pl-4 py-1">
            <div className="text-sm font-semibold text-white tracking-wide">Use Case Command Centre</div>
            <div className="text-[10px] text-green-200 font-medium tracking-wider uppercase mt-0.5">Digital Agriculture Mission</div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex items-center gap-2">
          {NAV.map(n => {
            const active = pathname === n.href
            return (
              <Link key={n.href} href={n.href}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2
                  ${active
                    ? 'bg-white text-[#0e3d28] shadow-sm'
                    : 'text-green-50 hover:bg-white/10 hover:text-white'
                  }`}
              >
                {n.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
