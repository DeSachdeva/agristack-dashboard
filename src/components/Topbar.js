'use client'

export default function Topbar() {
  const now = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
  return (
    <div className="bg-white px-6 md:px-8 py-3.5 flex items-center justify-between shadow-sm relative z-10">
      <div className="flex items-center gap-4 md:gap-6">
        {/* MoA&FW Logo - larger and crisp */}
        <div className="flex items-center justify-center shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/moafw-logo.png"
            alt="MoA&FW Logo"
            className="h-12 md:h-16 w-auto"
            style={{ objectFit: 'contain' }}
          />
        </div>
        <div className="flex flex-col border-l-2 border-gray-100 pl-4 md:pl-6">
          <span className="text-sm md:text-base font-extrabold text-gray-900 uppercase tracking-wide mb-1">
            Ministry of Agriculture & Farmers Welfare
          </span>
          <span className="text-[10px] md:text-xs font-bold text-gray-500 tracking-wider uppercase">
            Government of India
          </span>
        </div>
      </div>
      
      <div className="hidden md:flex items-center gap-6">
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{now}</div>
      </div>
    </div>
  )
}
