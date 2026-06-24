'use client'


const STATUS_STYLE = {
  'Active':   { bg: '#dcfce7', text: '#166534', dot: '#22c55e' },
  'Partial':  { bg: '#dbeafe', text: '#1e40af', dot: '#3b82f6' },
  'Not Live': { bg: '#fef3c7', text: '#92400e', dot: '#f59e0b' },
  'MoU Only': { bg: '#f3f4f6', text: '#374151', dot: '#9ca3af' },
  'Pending':  { bg: '#fee2e2', text: '#991b1b', dot: '#ef4444' },
}

export default function StatesView({ stateApiData }) {
  const active   = stateApiData.filter(s => s.status === 'Active').length
  const partial  = stateApiData.filter(s => s.status === 'Partial').length
  const mouOnly  = stateApiData.filter(s => s.status === 'MoU Only').length
  const notLive  = stateApiData.filter(s => s.status === 'Not Live' || s.status === 'Pending').length
  const totalMou = stateApiData.filter(s => s.mou).length

  return (
    <>

      <main className="max-w-screen-xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold" style={{ color: '#0e3d28' }}>State-wise Coverage</h1>
            <p className="text-sm text-gray-400 mt-0.5">API integration & readiness across all states/UTs</p>
          </div>
        </div>

        {/* Summary strip */}
        <div className="grid grid-cols-4 gap-4 mb-7">
          {[
            { label: 'MoU Signed', value: totalMou, color: '#0e3d28' },
            { label: 'Active (API Live)', value: active, color: '#166340' },
            { label: 'Partially Integrated', value: partial, color: '#1e40af' },
            { label: 'MoU / Not Started', value: mouOnly + notLive, color: '#92400e' },
          ].map(k => (
            <div key={k.label} className="bg-white rounded-xl border p-5" style={{ borderColor: '#e8f0e0' }}>
              <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">{k.label}</div>
              <div className="text-3xl font-bold" style={{ color: k.color }}>{k.value}</div>
            </div>
          ))}
        </div>

        {/* State grid */}
        <div className="grid grid-cols-3 gap-4">
          {stateApiData.map(s => {
            const st = STATUS_STYLE[s.status] || STATUS_STYLE['Pending']
            const pct = Math.round((s.apisDone / s.apisTotal) * 100)
            return (
              <div key={s.state} className="bg-white rounded-xl border p-4" style={{ borderColor: '#e8f0e0' }}>
                <div className="flex items-start justify-between mb-3">
                  <div className="font-medium text-gray-800 text-sm">{s.state}</div>
                  <span className="text-xs px-2 py-1 rounded-full font-medium flex items-center gap-1"
                    style={{ background: st.bg, color: st.text }}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: st.dot }} />
                    {s.status}
                  </span>
                </div>

                {/* API progress bar */}
                <div className="mb-3">
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>API Integration</span>
                    <span>{s.apisDone}/{s.apisTotal}</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                    <div className="h-full rounded-full transition-all"
                      style={{ width: `${pct}%`,
                               background: pct > 70 ? '#3aaa75' : pct > 30 ? '#3b82f6' : '#f59e0b' }} />
                  </div>
                </div>

                {/* Flags */}
                <div className="flex gap-1.5 flex-wrap">
                  <span className={`text-xs px-2 py-0.5 rounded font-medium
                    ${s.mou ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400 line-through'}`}>
                    MoU
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded font-medium
                    ${s.dcs ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-400'}`}>
                    DCS {s.dcs ? '✓' : '✗'}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded font-medium
                    ${s.fr ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-400'}`}>
                    FR {s.fr ? '✓' : '✗'}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </main>
    </>
  )
}
