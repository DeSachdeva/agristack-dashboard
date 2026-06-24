'use client'
import Topbar from '@/components/Topbar'
import Header from '@/components/Header'
import { STATE_API_DATA } from '@/data/usecases'

// Real mapper API IDs from All_UseCases_API_status.xlsx
const MAPPERS = [
  { id: 'i1001:o1001', desc: 'Farmer Data by Farmer ID' },
  { id: 'i1001:o1002', desc: 'Land Data by Farmer ID' },
  { id: 'i1001:o1004', desc: 'Farmer + Land Data by Farmer ID' },
  { id: 'i1002:o1001', desc: 'Farmer Data by Aadhaar' },
  { id: 'i1002:o1004', desc: 'Farmer + Land Data by Aadhaar' },
  { id: 'i1003:o1002', desc: 'Land by Village LGD + Survey No.' },
  { id: 'i1004:o1003', desc: 'Crop Data by Farmer ID, Year, Season' },
  { id: 'i1004:o1006', desc: 'Land + Crop Survey Data by Farmer ID' },
  { id: 'i1004:o1007', desc: 'Farmer + Land + Crop by Farmer ID' },
  { id: 'i1005:o1003', desc: 'Crop by Village LGD + Survey, Year, Season' },
  { id: 'i1005:o1006', desc: 'Land + Crop by Village LGD + Survey' },
  { id: 'i4:o4',       desc: 'Farmer ID by Encrypted Aadhaar' },
  { id: 'i6:o2',       desc: 'Anonymised Crop Sown at Village Level' },
  { id: 'i2:o14',      desc: 'Soil Health Data by Farmer ID' },
  { id: 'i12:o20',     desc: 'Total Land Area by Farmer ID' },
  { id: 'i16:o21',     desc: 'Farmer & Land Details for Scheme Eligibility' },
]

// Derived from mapper sheet: count of Done per mapper
const DONE_COUNTS = {
  'i1001:o1001': 18, 'i1001:o1002': 18, 'i1001:o1004': 19,
  'i1002:o1001': 18, 'i1002:o1004': 18, 'i1003:o1002': 11,
  'i1004:o1003': 2,  'i1004:o1006': 1,  'i1004:o1007': 11,
  'i1005:o1003': 7,  'i1005:o1006': 3,  'i4:o4':       14,
  'i6:o2':       5,  'i2:o14':      11, 'i12:o20':     15,
  'i16:o21':     6,
}

const TOTAL_STATES = 20 // states with active development

export default function APIsPage() {
  const totalAPIs = MAPPERS.length
  const totalDone = Object.values(DONE_COUNTS).reduce((a, b) => a + b, 0)
  const maxPossible = totalAPIs * TOTAL_STATES

  return (
    <div className="min-h-screen" style={{ background: '#f7f8f5' }}>
      <Topbar />
      <Header />

      <main className="max-w-screen-xl mx-auto px-6 py-8">
        <div className="mb-6">
          <h1 className="text-xl font-bold" style={{ color: '#0e3d28' }}>API Mapper Tracker</h1>
          <p className="text-sm text-gray-400 mt-0.5">State-wise integration status for all AgriStack mapper APIs</p>
        </div>

        {/* KPI Strip */}
        <div className="grid grid-cols-4 gap-4 mb-7">
          {[
            { label: 'Total Mapper APIs',      value: totalAPIs,      color: '#0e3d28' },
            { label: 'Total Integrations Done', value: totalDone,     color: '#166340' },
            { label: 'Max Possible (APIs × States)', value: maxPossible, color: '#374151' },
            { label: 'Overall Completion',      value: `${Math.round((totalDone/maxPossible)*100)}%`, color: '#1e40af' },
          ].map(k => (
            <div key={k.label} className="bg-white rounded-xl border p-5" style={{ borderColor: '#e8f0e0' }}>
              <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">{k.label}</div>
              <div className="text-3xl font-bold" style={{ color: k.color }}>{k.value}</div>
            </div>
          ))}
        </div>

        {/* Mapper table */}
        <div className="bg-white rounded-xl border overflow-hidden mb-6" style={{ borderColor: '#e8f0e0' }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: '#f3f8ec' }}>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Mapper ID</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Description</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">States Done</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide w-48">Progress</th>
              </tr>
            </thead>
            <tbody>
              {MAPPERS.map(m => {
                const done = DONE_COUNTS[m.id] || 0
                const pct  = Math.round((done / TOTAL_STATES) * 100)
                return (
                  <tr key={m.id} className="border-t border-gray-50 hover:bg-gray-50">
                    <td className="px-5 py-3.5">
                      <span className="font-mono text-xs px-2 py-1 rounded"
                        style={{ background: '#f0faf4', color: '#166340' }}>{m.id}</span>
                    </td>
                    <td className="px-5 py-3.5 text-gray-600 text-xs">{m.desc}</td>
                    <td className="px-5 py-3.5 text-gray-700 font-medium">{done} / {TOTAL_STATES}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 rounded-full bg-gray-100">
                          <div className="h-full rounded-full"
                            style={{ width: `${pct}%`,
                                     background: pct > 70 ? '#3aaa75' : pct > 40 ? '#3b82f6' : '#f59e0b' }} />
                        </div>
                        <span className="text-xs text-gray-400 w-8 text-right">{pct}%</span>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* State API Legend note */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
          <strong>Note:</strong> The counts above are derived from the Mapper API sheet (All_UseCases_API_status.xlsx).
          States with status "Sent for dev", "Base API pending", or "NOT LIVE" are not counted as Done.
          Data last synced: Feb 2026.
        </div>
      </main>
    </div>
  )
}
