'use client'

export default function Topbar() {
  const now = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
  return (
    <div style={{ background: '#0e3d28' }} className="text-white text-xs px-6 py-2 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {/* MoA&FW Logo */}
        <div className="w-8 h-8 rounded-full overflow-hidden bg-white/10 flex items-center justify-center shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/moafw-logo.png"
            alt="MoA&FW Logo"
            width={32}
            height={32}
            style={{ objectFit: 'contain', width: 32, height: 32 }}
          />
        </div>
        <span className="opacity-90">Ministry of Agriculture &amp; Farmers Welfare, Government of India</span>
        <span className="opacity-40 mx-1">|</span>
        {/* AgriStack Logo */}
        <div className="h-6 flex items-center overflow-hidden shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/agristack-logo.png"
            alt="AgriStack"
            height={24}
            style={{ objectFit: 'contain', height: 24, maxWidth: 120 }}
          />
        </div>
        <span className="opacity-90">AgriStack Programme — Digital Agriculture Mission</span>
      </div>
      <div className="opacity-70">{now}</div>
    </div>
  )
}
