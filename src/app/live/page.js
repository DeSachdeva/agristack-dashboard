'use client'
import Topbar from '@/components/Topbar'
import Header from '@/components/Header'

const PLANNED_FEATURES = [
  {
    icon: '🔐',
    title: 'Token Manager',
    desc: 'Server-side Keycloak OAuth2 token fetch & auto-refresh. Credentials never leave the server.',
    status: 'planned',
  },
  {
    icon: '🔀',
    title: 'Secure API Proxy',
    desc: 'Next.js API route acts as middleman — browser sends a clean request, server calls the real UFSI endpoint.',
    status: 'planned',
  },
  {
    icon: '🔍',
    title: 'Live Query Explorer',
    desc: 'Pick a state + mapper ID + query params and see real farmer / land data returned instantly.',
    status: 'planned',
  },
  {
    icon: '💊',
    title: 'API Health Monitor',
    desc: 'Ping all state endpoints and display up/down/latency in a live status grid.',
    status: 'planned',
  },
  {
    icon: '🗺️',
    title: 'State Config Registry',
    desc: 'One-line config to add any new state — base URL, receiver_id, LGD code all in one place.',
    status: 'planned',
  },
]

export default function LiveApiPage() {
  return (
    <div className="min-h-screen" style={{ background: '#f7f8f5' }}>
      <Topbar />
      <Header />

      <main className="max-w-screen-xl mx-auto px-6 py-12">

        {/* Hero */}
        <div className="rounded-2xl p-10 mb-10 text-center relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #0e3d28 0%, #1a5c3a 60%, #0e3d28 100%)' }}>
          {/* Decorative blobs */}
          <div className="absolute top-0 left-0 w-64 h-64 rounded-full opacity-5"
            style={{ background: '#3aaa75', filter: 'blur(60px)', transform: 'translate(-30%, -30%)' }} />
          <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full opacity-5"
            style={{ background: '#fcd34d', filter: 'blur(80px)', transform: 'translate(30%, 30%)' }} />

          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 text-xs font-bold px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest"
              style={{ background: 'rgba(252,211,77,0.15)', color: '#fcd34d', border: '1px solid rgba(252,211,77,0.3)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
              Under Development
            </span>

            <h1 className="text-3xl font-bold text-white mb-3">
              Live API Dashboard
            </h1>
            <p className="text-green-200 text-sm max-w-lg mx-auto leading-relaxed mb-8">
              The next evolution of this dashboard — real-time data pulled directly from the AgriStack
              government APIs instead of static Excel sheets. Farmer data, land records, and state-level
              integrations, all live.
            </p>

            <div className="inline-flex items-center gap-3 text-sm font-medium px-5 py-2.5 rounded-xl"
              style={{ background: 'rgba(255,255,255,0.08)', color: '#a8dfc0', border: '1px solid rgba(255,255,255,0.1)' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              Estimated availability: Q3 2026
            </div>
          </div>
        </div>

        {/* How it works */}
        <div className="mb-10">
          <div className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-5">How the API Layer Will Work</div>
          <div className="grid grid-cols-3 gap-4 mb-4">
            {[
              {
                step: '01',
                title: 'Authenticate',
                desc: 'Server calls the Keycloak token endpoint and securely caches the Bearer token. Credentials never reach the browser.',
                color: '#1a7a50',
              },
              {
                step: '02',
                title: 'Proxy Request',
                desc: 'Your browser sends a simple request to our Next.js API route. The server appends the token and calls the correct state\'s UFSI endpoint.',
                color: '#1e40af',
              },
              {
                step: '03',
                title: 'Render Data',
                desc: 'The cleaned API response is returned to the dashboard and displayed as a rich, interactive table — just like the current view, but live.',
                color: '#6b21a8',
              },
            ].map(s => (
              <div key={s.step} className="bg-white rounded-xl border p-5 relative" style={{ borderColor: '#e8f0e0' }}>
                <div className="text-5xl font-black mb-3 opacity-5 absolute top-4 right-5" style={{ color: s.color }}>{s.step}</div>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold mb-3"
                  style={{ background: s.color }}>
                  {s.step}
                </div>
                <div className="font-semibold text-gray-800 mb-1.5">{s.title}</div>
                <div className="text-xs text-gray-400 leading-relaxed">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Planned Features */}
        <div className="mb-10">
          <div className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-5">Planned Features</div>
          <div className="grid grid-cols-1 gap-3">
            {PLANNED_FEATURES.map((f, i) => (
              <div key={i} className="bg-white rounded-xl border p-4 flex items-start gap-4" style={{ borderColor: '#e8f0e0' }}>
                <div className="text-2xl shrink-0">{f.icon}</div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-800 text-sm mb-0.5">{f.title}</div>
                  <div className="text-xs text-gray-400">{f.desc}</div>
                </div>
                <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wide shrink-0"
                  style={{ background: '#f3f4f6', color: '#9ca3af', border: '1px solid #e5e7eb' }}>
                  Planned
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Current dashboard link */}
        <div className="rounded-xl border p-6 flex items-center justify-between" style={{ borderColor: '#a8dfc0', background: '#f0faf4' }}>
          <div>
            <div className="font-semibold text-[#0e3d28] mb-1">Looking for the current dashboard?</div>
            <div className="text-sm text-gray-500">The existing Excel-powered dashboard is fully live and up to date.</div>
          </div>
          <a href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-lg text-white transition-opacity hover:opacity-90 shrink-0"
            style={{ background: '#1a7a50' }}>
            Go to Dashboard
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>

      </main>

      <footer className="text-center py-5 text-xs text-gray-400 border-t mt-8" style={{ borderColor: '#e8f0e0' }}>
        AgriStack Programme Dashboard · Ministry of Agriculture & Farmers Welfare, Government of India · Data subject to official verification
      </footer>
    </div>
  )
}
