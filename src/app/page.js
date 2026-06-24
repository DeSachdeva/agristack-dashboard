'use client'
import Topbar from '@/components/Topbar'
import Header from '@/components/Header'
import { USE_CASES, STATE_API_DATA, ENROLLED_FARMER_IDS, FARMER_DATA_UPDATED } from '@/data/usecases'
import OverviewView from '@/components/OverviewView'

export default function HomePage() {
  return (
    <div className="min-h-screen" style={{ background: '#f7f8f5' }}>
      <Topbar />
      <Header />
      <OverviewView 
        useCasesData={USE_CASES} 
        stateApiData={STATE_API_DATA} 
        enrolledFarmers={ENROLLED_FARMER_IDS} 
        farmersUpdated={FARMER_DATA_UPDATED} 
      />
    </div>
  )
}
