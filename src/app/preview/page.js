'use client'
import { useState } from 'react'
import Topbar from '@/components/Topbar'
import Header from '@/components/Header'
import DashboardView from '@/components/DashboardView'
import OverviewView from '@/components/OverviewView'
import StatesView from '@/components/StatesView'
import ApisView from '@/components/ApisView'
import {
  IS_STAGING, USE_CASES as STAGING_UC, STATE_API_DATA as STAGING_ST,
  MAPPER_APIS as STAGING_MAPPER, MAPPER_DONE_COUNTS as STAGING_DONE_COUNTS,
  DATA_LAST_UPDATED, ENROLLED_FARMER_IDS as STAGING_FARMERS, FARMER_DATA_UPDATED as STAGING_FARMER_DATE
} from '@/data/usecases.STAGING'

// ─── No staging state ─────────────────────────────────────────────────────────
function NoStaging() {
  return (
    <div className="min-h-screen" style={{ background: '#f7f8f5' }}>
      <Topbar />
      <Header />
      <main className="max-w-screen-xl mx-auto px-6 py-16 text-center">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{ background: '#f0faf4' }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1a7a50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
          </svg>
        </div>
        <h1 className="text-xl font-bold mb-2" style={{ color: '#0e3d28' }}>No Pending Import</h1>
        <p className="text-sm text-gray-400 mb-6">The live dashboard is up to date. No import is waiting for review.</p>
        <div className="inline-block bg-white border rounded-xl px-6 py-4 text-left text-sm" style={{ borderColor: '#e8f0e0' }}>
          <div className="font-medium text-gray-700 mb-2">To import new data:</div>
          <code className="text-xs bg-gray-50 px-3 py-1.5 rounded block text-gray-600">npm run import-excel</code>
          <div className="text-xs text-gray-400 mt-2">Then refresh this page to review changes.</div>
        </div>
      </main>
    </div>
  )
}

// ─── Main preview page ────────────────────────────────────────────────────────
export default function PreviewPage() {
  const [approving, setApproving] = useState(false)
  const [rejecting, setRejecting] = useState(false)
  const [done,      setDone]      = useState(null)
  const [activeTab, setActiveTab] = useState('Overview')

  if (!IS_STAGING) return <NoStaging />

  async function handleApprove() {
    if (!confirm('Approve this import? The staging data will become the live data on the dashboard.')) return
    setApproving(true)
    try {
      const res = await fetch('/api/import?action=approve', { method: 'POST' })
      if (res.ok) { setDone('approved') }
      else { alert('Error: ' + (await res.text())); setApproving(false) }
    } catch (e) { alert('Network error. Run: npm run approve-import'); setApproving(false) }
  }

  async function handleReject() {
    if (!confirm('Reject this import? The staging data will be discarded and the live dashboard stays unchanged.')) return
    setRejecting(true)
    try {
      const res = await fetch('/api/import?action=reject', { method: 'POST' })
      if (res.ok) { setDone('rejected') }
      else { alert('Error: ' + (await res.text())); setRejecting(false) }
    } catch (e) { alert('Network error. Run: npm run reject-import'); setRejecting(false) }
  }

  if (done === 'approved') return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#f7f8f5' }}>
      <div className="text-center">
        <div className="text-5xl mb-4">✅</div>
        <h1 className="text-xl font-bold mb-2" style={{ color: '#0e3d28' }}>Import Approved!</h1>
        <p className="text-sm text-gray-500 mb-4">The data is now live on the dashboard.</p>
        <a href="/" className="text-sm font-medium px-4 py-2 rounded-lg text-white"
          style={{ background: '#1a7a50' }}>Go to Dashboard →</a>
      </div>
    </div>
  )

  if (done === 'rejected') return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#f7f8f5' }}>
      <div className="text-center">
        <div className="text-5xl mb-4">🗑️</div>
        <h1 className="text-xl font-bold mb-2" style={{ color: '#0e3d28' }}>Import Rejected</h1>
        <p className="text-sm text-gray-500 mb-4">The staging data was discarded. Live dashboard is unchanged.</p>
        <a href="/" className="text-sm font-medium px-4 py-2 rounded-lg text-white"
          style={{ background: '#1a7a50' }}>Go to Dashboard →</a>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen" style={{ background: '#f7f8f5' }}>
      <Topbar />
      <Header />

      {/* Staging banner */}
      <div className="sticky top-16 z-40 border-b shadow-sm" style={{ background: '#fffbeb', borderColor: '#fde68a' }}>
        <div className="max-w-screen-xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-base">📋</span>
            <div>
              <span className="text-sm font-semibold text-amber-900">PREVIEW MODE — Import Pending Review</span>
              <span className="text-xs text-amber-700 ml-3">
                Interact with the views below to verify your new Excel data before publishing.
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs text-amber-600">Excel Data Generated: {DATA_LAST_UPDATED || '—'}</span>
            <button
              onClick={handleReject}
              disabled={rejecting}
              className="px-4 py-1.5 text-xs font-medium rounded-lg border transition-colors disabled:opacity-50"
              style={{ background: '#fff', borderColor: '#fca5a5', color: '#dc2626' }}>
              {rejecting ? 'Rejecting...' : '✕ Reject Import'}
            </button>
            <button
              onClick={handleApprove}
              disabled={approving}
              className="px-4 py-1.5 text-xs font-medium rounded-lg text-white transition-colors disabled:opacity-50 shadow-sm hover:opacity-90"
              style={{ background: approving ? '#6b7280' : '#1a7a50' }}>
              {approving ? 'Approving...' : '✓ Approve & Go Live'}
            </button>
          </div>
        </div>
      </div>

      {/* Tabs for Preview */}
      <div className="max-w-screen-xl mx-auto px-6 pt-6 flex gap-2">
        {['Overview', 'Use Cases', 'States', 'APIs'].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="px-5 py-2 text-sm font-medium rounded-full transition-colors border"
            style={{ 
              background: activeTab === tab ? '#1a7a50' : '#fff',
              color: activeTab === tab ? '#fff' : '#4b5563',
              borderColor: activeTab === tab ? '#1a7a50' : '#d1d5db'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Render the selected view using STAGING data! */}
      {activeTab === 'Overview' && 
        <OverviewView 
          useCasesData={STAGING_UC} 
          stateApiData={STAGING_ST} 
          enrolledFarmers={STAGING_FARMERS}
          farmersUpdated={STAGING_FARMER_DATE}
        />
      }
      {activeTab === 'Use Cases' && <DashboardView useCasesData={STAGING_UC} />}
      {activeTab === 'States'    && <StatesView stateApiData={STAGING_ST} />}
      {activeTab === 'APIs'      && <ApisView mapperApis={STAGING_MAPPER} mapperDoneCounts={STAGING_DONE_COUNTS} />}

    </div>
  )
}
