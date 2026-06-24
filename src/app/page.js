'use client'
import Topbar from '@/components/Topbar'
import Header from '@/components/Header'
import StatusBadge from '@/components/StatusBadge'
import { USE_CASES, STATE_API_DATA } from '@/data/usecases'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts'

// Derived stats from real data
const total = USE_CASES.length
const live = USE_CASES.filter(u => u.status === 'Live').length
const inProgress = USE_CASES.filter(u => u.status === 'In Progress').length
const complete = USE_CASES.filter(u => u.status === 'Complete').length
const onHold = USE_CASES.filter(u => u.status === 'On Hold').length
const pending = USE_CASES.filter(u => u.status === 'Pending').length
const statesActive = STATE_API_DATA.filter(s => s.status === 'Active').length
const totalMou = STATE_API_DATA.filter(s => s.mou).length

const statusChartData = [
  { name: 'Live', value: live, color: '#22c55e' },
  { name: 'In Progress', value: inProgress, color: '#3b82f6' },
  { name: 'Complete', value: complete, color: '#a855f7' },
  { name: 'On Hold', value: onHold, color: '#f59e0b' },
  { name: 'Pending', value: pending, color: '#9ca3af' },
]

const categoryData = [
  { name: 'Central', value: USE_CASES.filter(u => u.category === 'Central').length, color: '#166340' },
  { name: 'State', value: USE_CASES.filter(u => u.category === 'State').length, color: '#3aaa75' },
  { name: 'Multi', value: USE_CASES.filter(u => u.category === 'Multi').length, color: '#a8dfc0' },
  { name: 'Private', value: USE_CASES.filter(u => u.category === 'Private').length, color: '#fef3c7' },
]

const topLiveUC = USE_CASES.filter(u => u.status === 'Live').slice(0, 6)
const recentProgress = USE_CASES.filter(u => u.status === 'In Progress').slice(0, 5)

function StatCard({ label, value, sub, accent }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5" style={{ borderColor: '#e8f0e0' }}>
      <div className="text-xs text-gray-400 mb-1 uppercase tracking-wide">{label}</div>
      <div className="text-3xl font-bold mb-1" style={{ color: accent || '#0e3d28' }}>{value}</div>
      {sub && <div className="text-xs text-gray-400">{sub}</div>}
    </div>
  )
}

export default function HomePage() {
  return (
    <div className="min-h-screen" style={{ background: '#f7f8f5' }}>
      <Topbar />
      <Header />

      <main className="max-w-screen-xl mx-auto px-6 py-8">

        {/* Hero */}
        <div className="rounded-2xl p-7 mb-7 flex items-start justify-between gap-6"
          style={{ background: 'linear-gradient(135deg, #0e3d28 0%, #1a7a50 100%)' }}>
          <div>
            <div className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full mb-4"
              style={{ background: 'rgba(255,255,255,0.15)', color: '#a8dfc0' }}>
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Programme Active
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">AgriStack Use Case Command Centre</h1>
            <p className="text-sm text-green-200 max-w-xl leading-relaxed">
              Central tracking system for the Digital Agriculture Mission under MoA&FW. Monitors
              implementation status of all registered use cases, API integrations, and state-level rollouts.
            </p>
          </div>
          <div className="shrink-0 flex flex-col items-end gap-3">
            {/* Stat cards row */}
            <div className="flex gap-3">
              <div className="text-right px-4 py-2.5 rounded-xl" style={{ background: 'rgba(255,255,255,0.1)' }}>
                <div className="text-xs text-green-300 mb-0.5">MoU Signed States</div>
                <div className="text-3xl font-bold text-white">{totalMou}</div>
              </div>
              <div className="text-right px-4 py-2.5 rounded-xl" style={{ background: 'rgba(255,255,255,0.1)' }}>
                <div className="text-xs text-green-300 mb-0.5">Active API States</div>
                <div className="text-3xl font-bold" style={{ color: '#fcd34d' }}>{statesActive}</div>
              </div>
              <div className="text-right px-4 py-2.5 rounded-xl" style={{ background: 'rgba(255,255,255,0.1)' }}>
                <div className="text-xs text-green-300 mb-0.5">
                  Enrolled Farmer ID(s)
                  <span className="block text-[10px] opacity-60 font-normal">last updated on 23 June 2026</span>
                </div>
                <div className="text-3xl font-bold text-white">99875423</div>
              </div>
              <div className="text-right px-4 py-2.5 rounded-xl" style={{ background: 'rgba(255,255,255,0.1)' }}>
                <div className="text-xs text-green-300 mb-0.5">DCS States</div>
                <div className="text-3xl font-bold" style={{ color: '#a8dfc0' }}>
                  {STATE_API_DATA.filter(s => s.dcs).length}
                </div>
              </div>
            </div>
            {/* Detail button */}
            <a
              href="https://agristack.gov.in/#/farmerRegistryMonitoring"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-medium px-4 py-2 rounded-lg transition-opacity hover:opacity-90"
              style={{ background: '#fcd34d', color: '#0e3d28' }}>
              Detailed Farmer Statistics
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-5 gap-4 mb-7">
          <StatCard label="Total Use Cases" value={total} sub="Master register" />
          <StatCard label="Live" value={live} sub="In production" accent="#166340" />
          <StatCard label="In Progress" value={inProgress} sub="Dev / UAT" accent="#1e40af" />
          <StatCard label="Integration Done" value={complete} sub="Fully integrated" accent="#6b21a8" />
          <StatCard label="On Hold / Pending" value={onHold + pending} sub="Awaiting action" accent="#92400e" />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-3 gap-5 mb-7">

          {/* Status bar chart */}
          <div className="col-span-2 bg-white rounded-xl border p-5" style={{ borderColor: '#e8f0e0' }}>
            <div className="text-sm font-medium mb-4" style={{ color: '#0e3d28' }}>Status Distribution</div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={statusChartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#888' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#888' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ border: '0.5px solid #e8f0e0', borderRadius: 8, fontSize: 12 }}
                  cursor={{ fill: '#f7f8f5' }} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {statusChartData.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Category pie */}
          <div className="bg-white rounded-xl border p-5" style={{ borderColor: '#e8f0e0' }}>
            <div className="text-sm font-medium mb-2" style={{ color: '#0e3d28' }}>By Category</div>
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie data={categoryData} cx="50%" cy="50%" innerRadius={45} outerRadius={70}
                  dataKey="value" paddingAngle={3}>
                  {categoryData.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Pie>
                <Tooltip contentStyle={{ border: '0.5px solid #e8f0e0', borderRadius: 8, fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-1.5 mt-1">
              {categoryData.map(d => (
                <div key={d.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} />
                    <span className="text-gray-500">{d.name}</span>
                  </div>
                  <span className="font-medium text-gray-700">{d.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Live UCs + In Progress */}
        <div className="grid grid-cols-2 gap-5 mb-7">

          {/* Live use cases */}
          <div className="bg-white rounded-xl border p-5" style={{ borderColor: '#e8f0e0' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-medium" style={{ color: '#0e3d28' }}>Live Use Cases (sample)</div>
              <StatusBadge status="Live" />
            </div>
            <div className="space-y-2">
              {topLiveUC.map(uc => (
                <div key={uc.id} className="flex items-center justify-between py-2 border-b border-gray-50">
                  <div>
                    <div className="text-sm font-medium text-gray-800">{uc.name}</div>
                    <div className="text-xs text-gray-400">{uc.dept} · {uc.category}</div>
                  </div>
                  {uc.mapper && (
                    <span className="text-xs font-mono px-2 py-0.5 rounded"
                      style={{ background: '#f0faf4', color: '#166340' }}>{uc.mapper}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* In Progress */}
          <div className="bg-white rounded-xl border p-5" style={{ borderColor: '#e8f0e0' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-medium" style={{ color: '#0e3d28' }}>In Progress</div>
              <StatusBadge status="In Progress" />
            </div>
            <div className="space-y-2">
              {recentProgress.map(uc => (
                <div key={uc.id} className="flex items-center justify-between py-2 border-b border-gray-50">
                  <div>
                    <div className="text-sm font-medium text-gray-800">{uc.name}</div>
                    <div className="text-xs text-gray-400">{uc.dept} · {uc.category}</div>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                    style={{
                      background: uc.priority === 'High' ? '#dcfce7' : '#f3f4f6',
                      color: uc.priority === 'High' ? '#166534' : '#374151'
                    }}>
                    {uc.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* State API summary strip */}
        <div className="bg-white rounded-xl border p-5" style={{ borderColor: '#e8f0e0' }}>
          <div className="text-sm font-medium mb-4" style={{ color: '#0e3d28' }}>
            State API Integration — Top Performers
          </div>
          <div className="grid grid-cols-4 gap-3">
            {STATE_API_DATA.filter(s => s.status === 'Active').slice(0, 8).map(s => (
              <div key={s.state} className="rounded-lg p-3 text-xs" style={{ background: '#f7fbf4' }}>
                <div className="font-medium text-gray-700 mb-1">{s.state}</div>
                <div className="flex items-center gap-1 mb-1">
                  <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                    <div className="h-1.5 rounded-full" style={{
                      background: '#3aaa75',
                      width: `${Math.round((s.apisDone / s.apisTotal) * 100)}%`
                    }} />
                  </div>
                  <span className="text-gray-500">{s.apisDone}/{s.apisTotal}</span>
                </div>
                <div className="flex gap-1">
                  {s.mou && <span className="px-1 py-0.5 rounded text-green-700 bg-green-100 text-[10px]">MoU</span>}
                  {s.dcs && <span className="px-1 py-0.5 rounded text-blue-700 bg-blue-100 text-[10px]">DCS</span>}
                  {s.fr && <span className="px-1 py-0.5 rounded text-purple-700 bg-purple-100 text-[10px]">FR</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>

      <footer className="text-center py-5 text-xs text-gray-400 border-t mt-8"
        style={{ borderColor: '#e8f0e0' }}>
        AgriStack Programme Dashboard · Ministry of Agriculture & Farmers Welfare, Government of India · Data subject to official verification
      </footer>
    </div>
  )
}

