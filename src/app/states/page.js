'use client'
import Topbar from '@/components/Topbar'
import Header from '@/components/Header'
import { STATE_API_DATA } from '@/data/usecases'
import StatesView from '@/components/StatesView'

export default function StatesPage() {
  return (
    <div className="min-h-screen" style={{ background: '#f7f8f5' }}>
      <Topbar />
      <Header />
      <StatesView stateApiData={STATE_API_DATA} />
    </div>
  )
}
