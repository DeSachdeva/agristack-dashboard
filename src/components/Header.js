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
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      
      <div className="max-w-screen-xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        
        <div className="flex items-center gap-3">
          <div style={{ background: 'linear-gradient(135deg, #1a7a50, #3aaa75)' }}
               className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-sm">
            AS
          </div>
          <div className="leading-tight">
            <div className="font-semibold text-base" style={{ color: '#0e3d28' }}>AgriStack</div>
            <div className="text-xs text-gray-400">Use Case Command Centre</div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex items-center gap-1">
          {NAV.map(n => (
            <Link key={n.href} href={n.href}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5
                ${pathname === n.href
                  ? 'text-white'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                }`}
              style={pathname === n.href ? { background: '#1a7a50' } : {}}>
              {n.label}
            </Link>
          ))}
        </nav>

        {/* Right badge */}
        <div className="flex items-center gap-2">
          <span className="text-xs px-3 py-1.5 rounded-full font-medium border"
            style={{ background: '#f0faf4', color: '#166340', borderColor: '#a8dfc0' }}>
            MoA&FW · GoI
          </span>
        </div>
      </div>
    </header>
  )
}
