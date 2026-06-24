'use client'
import Topbar from '@/components/Topbar'
import Header from '@/components/Header'
import { MAPPER_APIS, MAPPER_DONE_COUNTS } from '@/data/usecases'
import ApisView from '@/components/ApisView'

export default function APIsPage() {
  return (
    <div className="min-h-screen" style={{ background: '#f7f8f5' }}>
      <Topbar />
      <Header />
      <ApisView mapperApis={MAPPER_APIS} mapperDoneCounts={MAPPER_DONE_COUNTS} />
    </div>
  )
}
