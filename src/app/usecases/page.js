'use client'
import { useState, useMemo, useRef, useEffect } from 'react'
import Topbar from '@/components/Topbar'
import Header from '@/components/Header'
import StatusBadge from '@/components/StatusBadge'
import { USE_CASES } from '@/data/usecases'

const STATUSES   = ['All', 'Live', 'In Progress', 'Complete', 'On Hold', 'Pending']
const CATEGORIES = ['All', 'Central', 'State', 'Multi', 'Private']
const PRIORITIES = ['All', 'High', 'Medium', 'Low']

const ALL_STATES = [...new Set(
  USE_CASES
    .filter(u => u.category === 'State' && u.dept !== 'Multi-State')
    .map(u => u.dept)
)].sort()

export default function UseCasesPage() {
  const [search,         setSearch]         = useState('')
  const [status,         setStatus]         = useState('All')
  const [category,       setCategory]       = useState('All')
  const [priority,       setPriority]       = useState('All')
  const [selectedStates, setSelectedStates] = useState([])
  const [stateDropOpen,  setStateDropOpen]  = useState(false)
  const [page,           setPage]           = useState(1)
  const dropRef = useRef(null)
  const PER_PAGE = 20

  useEffect(() => {
    function handle(e) {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setStateDropOpen(false)
      }
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [])

  function handleCategoryClick(c) {
    setCategory(c)
    if (c !== 'State') setSelectedStates([])
    setPage(1)
  }

  function toggleState(state) {
    setSelectedStates(prev =>
      prev.includes(state) ? prev.filter(s => s !== state) : [...prev, state]
    )
    setPage(1)
  }

  const filtered = useMemo(() => {
    return USE_CASES.filter(u => {
      const matchSearch   = u.name.toLowerCase().includes(search.toLowerCase()) ||
                            u.dept.toLowerCase().includes(search.toLowerCase())
      const matchStatus   = status   === 'All' || u.status   === status
      const matchCategory = category === 'All' || u.category === category
      const matchPriority = priority === 'All' || u.priority === priority
      const matchState    = selectedStates.length === 0 || selectedStates.includes(u.dept)
      return matchSearch && matchStatus && matchCategory && matchPriority && matchState
    })
  }, [search, status, category, priority, selectedStates])

  const pages   = Math.ceil(filtered.length / PER_PAGE)
  const visible = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  function FilterBtn({ label, active, onClick }) {
    return (
      <button onClick={onClick}
        className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border"
        style={active
          ? { background: '#1a7a50', color: '#fff', borderColor: '#1a7a50' }
          : { background: '#fff', color: '#555', borderColor: '#e0e7d8' }}>
        {label}
      </button>
    )
  }

  return (
    <div className="min-h-screen" style={{ background: '#f7f8f5' }}>
      <Topbar />
      <Header />

      <main className="max-w-screen-xl mx-auto px-6 py-8">

        {/* Page header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold" style={{ color: '#0e3d28' }}>Master Use Case Register</h1>
            <p className="text-sm text-gray-400 mt-0.5">Complete list of all {USE_CASES.length} registered use cases</p>
          </div>
          <span className="text-sm px-4 py-2 rounded-full font-medium border"
            style={{ background: '#f0faf4', color: '#166340', borderColor: '#a8dfc0' }}>
            {filtered.length} results
          </span>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border p-4 mb-5" style={{ borderColor: '#e8f0e0', position: 'relative', zIndex: 50 }}>
          {/* Search */}
          <input
            className="w-full border rounded-lg px-4 py-2.5 text-sm outline-none mb-3"
            style={{ borderColor: '#c4d8b0', background: '#f7fbf4' }}
            placeholder="Search use cases or departments..."
            value={search} onChange={e => { setSearch(e.target.value); setPage(1) }} />

          {/* Status */}
          <div className="mb-3">
            <div className="text-xs text-gray-400 mb-1.5 font-medium">Status</div>
            <div className="flex flex-wrap gap-1.5">
              {STATUSES.map(s => (
                <FilterBtn key={s} label={s} active={status === s}
                  onClick={() => { setStatus(s); setPage(1) }} />
              ))}
            </div>
          </div>

          {/* Category */}
          <div className="mb-3">
            <div className="text-xs text-gray-400 mb-1.5 font-medium">Category</div>
            <div className="flex flex-wrap gap-1.5 items-start">
              {CATEGORIES.map(c => (
                <FilterBtn key={c} label={c} active={category === c}
                  onClick={() => handleCategoryClick(c)} />
              ))}

              {/* State dropdown inline */}
              {category === 'State' && (
                <div ref={dropRef} style={{ position: 'relative' }}>
                  <button
                    onClick={() => setStateDropOpen(o => !o)}
                    style={{
                      background: selectedStates.length > 0 ? '#f0faf4' : '#fff',
                      color: selectedStates.length > 0 ? '#166340' : '#555',
                      borderColor: selectedStates.length > 0 ? '#a8dfc0' : '#e0e7d8',
                      border: '1px solid',
                      borderRadius: 8,
                      padding: '6px 12px',
                      fontSize: 12,
                      fontWeight: 500,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                    }}>
                    {selectedStates.length === 0
                      ? '▾ Filter by State'
                      : selectedStates.length === 1
                        ? `▾ ${selectedStates[0]}`
                        : `▾ ${selectedStates.length} states`}
                  </button>

                  {stateDropOpen && (
                    <div style={{
                      position: 'absolute',
                      top: '110%',
                      left: 0,
                      zIndex: 9999,
                      background: '#fff',
                      border: '1px solid #e8f0e0',
                      borderRadius: 12,
                      boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                      minWidth: 210,
                      maxHeight: 300,
                      overflowY: 'auto',
                      padding: '8px 0',
                    }}>
                      {selectedStates.length > 0 && (
                        <button
                          onClick={() => { setSelectedStates([]); setPage(1) }}
                          style={{ display: 'block', width: '100%', textAlign: 'left', padding: '6px 16px', fontSize: 11, color: '#dc2626', background: 'none', border: 'none', cursor: 'pointer' }}>
                          ✕ Clear all
                        </button>
                      )}
                      <div style={{ borderBottom: '1px solid #f0f0f0', margin: '4px 12px' }} />
                      {ALL_STATES.map(state => {
                        const checked = selectedStates.includes(state)
                        const count = USE_CASES.filter(u => u.dept === state).length
                        return (
                          <button key={state} onClick={() => toggleState(state)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              width: '100%',
                              padding: '7px 16px',
                              fontSize: 12,
                              color: checked ? '#166340' : '#374151',
                              background: checked ? '#f0faf4' : 'none',
                              border: 'none',
                              cursor: 'pointer',
                              textAlign: 'left',
                              gap: 8,
                            }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                              <span style={{
                                width: 14, height: 14, borderRadius: 3,
                                border: `1.5px solid ${checked ? '#1a7a50' : '#d1d5db'}`,
                                background: checked ? '#1a7a50' : '#fff',
                                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                                flexShrink: 0,
                              }}>
                                {checked && <span style={{ color: '#fff', fontSize: 9, lineHeight: 1 }}>✓</span>}
                              </span>
                              {state}
                            </div>
                            <span style={{ color: '#9ca3af', fontSize: 11 }}>{count}</span>
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Selected state pills */}
            {selectedStates.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
                {selectedStates.map(s => (
                  <span key={s} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 4,
                    padding: '2px 8px', borderRadius: 20, fontSize: 11, fontWeight: 500,
                    background: '#f0faf4', color: '#166340', border: '1px solid #a8dfc0',
                  }}>
                    {s}
                    <button onClick={() => toggleState(s)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#166340', padding: 0, fontSize: 12, lineHeight: 1 }}>
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Priority */}
          <div>
            <div className="text-xs text-gray-400 mb-1.5 font-medium">Priority</div>
            <div className="flex flex-wrap gap-1.5">
              {PRIORITIES.map(p => (
                <FilterBtn key={p} label={p} active={priority === p}
                  onClick={() => { setPriority(p); setPage(1) }} />
              ))}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border overflow-hidden" style={{ borderColor: '#e8f0e0', position: 'relative', zIndex: 1 }}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: '#f3f8ec' }}>
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide w-12">#</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Use Case</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Status</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Priority</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Category</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Department / State</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Mapper ID</th>
                </tr>
              </thead>
              <tbody>
                {visible.map((uc) => (
                  <tr key={uc.id} className="border-t border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3.5 text-xs text-gray-300 font-mono">{uc.id}</td>
                    <td className="px-5 py-3.5 font-medium text-gray-800">{uc.name}</td>
                    <td className="px-5 py-3.5"><StatusBadge status={uc.status} /></td>
                    <td className="px-5 py-3.5">
                      <span className="text-xs font-medium"
                        style={{ color: uc.priority === 'High' ? '#166340'
                                      : uc.priority === 'Medium' ? '#1e40af' : '#6b7280' }}>
                        {uc.priority}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-xs text-gray-500">{uc.category}</td>
                    <td className="px-5 py-3.5 text-xs text-gray-500">{uc.dept}</td>
                    <td className="px-5 py-3.5">
                      {uc.mapper
                        ? <span className="font-mono text-xs px-2 py-0.5 rounded"
                            style={{ background: '#f0faf4', color: '#166340' }}>{uc.mapper}</span>
                        : <span className="text-gray-300 text-xs">—</span>}
                    </td>
                  </tr>
                ))}
                {visible.length === 0 && (
                  <tr><td colSpan={7} className="px-5 py-12 text-center text-gray-400 text-sm">
                    No use cases match your filters.
                  </td></tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-5 py-3 border-t text-xs text-gray-400"
            style={{ borderColor: '#e8f0e0' }}>
            <span>Showing {((page - 1) * PER_PAGE) + 1}–{Math.min(page * PER_PAGE, filtered.length)} of {filtered.length}</span>
            <div className="flex gap-2">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                className="px-3 py-1.5 rounded-lg border text-xs disabled:opacity-40"
                style={{ borderColor: '#c4d8b0', color: '#166340' }}>← Prev</button>
              {Array.from({ length: pages }, (_, i) => i + 1).slice(
                Math.max(0, page - 3), Math.min(pages, page + 2)
              ).map(p => (
                <button key={p} onClick={() => setPage(p)}
                  className="px-3 py-1.5 rounded-lg border text-xs"
                  style={p === page
                    ? { background: '#1a7a50', color: '#fff', borderColor: '#1a7a50' }
                    : { borderColor: '#c4d8b0', color: '#166340' }}>
                  {p}
                </button>
              ))}
              <button onClick={() => setPage(p => Math.min(pages, p + 1))} disabled={page === pages}
                className="px-3 py-1.5 rounded-lg border text-xs disabled:opacity-40"
                style={{ borderColor: '#c4d8b0', color: '#166340' }}>Next →</button>
            </div>
          </div>
        </div>

      </main>
    </div>
  )
}
