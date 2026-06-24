'use client'
import Image from 'next/image'

export default function Topbar() {
  const now = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
  return (
    <div style={{ background: '#0e3d28' }} className="text-white text-xs px-6 py-2 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {/* Ministry logo — replace src with your actual image path e.g. /images/moafw-logo.png */}
        <div className="w-7 h-7 rounded-full overflow-hidden bg-white/10 flex items-center justify-center shrink-0">
          <Image
            src="/images/moafw-logo.png"
            alt="MoA&FW Logo"
            width={28}
            height={28}
            className="object-contain"
            onError={(e) => { e.currentTarget.style.display = 'none' }}
          />
        </div>
        <span className="opacity-90">Ministry of Agriculture &amp; Farmers Welfare, Government of India</span>
        <span className="opacity-40 mx-1">|</span>
        {/* AgriStack logo — replace src with your actual image path e.g. /images/agristack-logo.png */}
        <div className="h-5 flex items-center overflow-hidden shrink-0">
          <Image
            src="/images/agristack-logo.png"
            alt="AgriStack"
            width={90}
            height={20}
            className="object-contain"
            onError={(e) => { e.currentTarget.style.display = 'none' }}
          />
        </div>
        <span className="opacity-90">AgriStack Programme — Digital Agriculture Mission</span>
      </div>
      <div className="opacity-70">{now}</div>
    </div>
  )
}
