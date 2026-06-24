'use client'
import Topbar from '@/components/Topbar'
import Header from '@/components/Header'
import { USE_CASES } from '@/data/usecases'
import DashboardView from '@/components/DashboardView'

export default function UseCasesPage() {
  return (
    <div className="min-h-screen" style={{ background: '#f7f8f5' }}>
      <Topbar />
      <Header />
      <DashboardView useCasesData={USE_CASES} />
    </div>
  )
}
