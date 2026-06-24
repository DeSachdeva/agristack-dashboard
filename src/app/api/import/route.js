import { NextResponse } from 'next/server'
import fs   from 'fs'
import path from 'path'

const STAGING   = path.join(process.cwd(), 'src', 'data', 'usecases.STAGING.js')
const LIVE_DATA = path.join(process.cwd(), 'src', 'data', 'usecases.js')

export async function POST(request) {
  const { searchParams } = new URL(request.url)
  const action = searchParams.get('action')

  if (action === 'approve') {
    if (!fs.existsSync(STAGING)) {
      return NextResponse.json({ error: 'No staging file found' }, { status: 404 })
    }
    let content = fs.readFileSync(STAGING, 'utf8')
    // Mark as live/approved
    content = content
      .replace('// AgriStack Dashboard — STAGING DATA (not yet approved)', '// AgriStack Dashboard — LIVE DATA (approved)')
      .replace('// ⚠️  This is a PREVIEW file. It is NOT the live data.', '// ✅  APPROVED AND LIVE.')
      .replace(/\/\/     Review at:.*\n/, '')
      .replace(/\/\/     To approve:.*\n/, '')
      .replace(/\/\/     To reject:.*\n/, '')
      .replace('export const IS_STAGING             = true', 'export const IS_STAGING             = false')
    fs.writeFileSync(LIVE_DATA, content, 'utf8')
    // Reset staging placeholder
    const placeholder = `// No pending import.\nexport const IS_STAGING = false\nexport const DATA_LAST_UPDATED = null\nexport const ENROLLED_FARMER_IDS = null\nexport const FARMER_DATA_UPDATED = null\nexport const USE_CASES = []\nexport const STATE_API_DATA = []\nexport const MAPPER_APIS = []\nexport const MAPPER_DONE_COUNTS = {}\nexport const STATUS_COLORS = {}\n`
    fs.writeFileSync(STAGING, placeholder, 'utf8')
    return NextResponse.json({ ok: true, action: 'approved' })
  }

  if (action === 'reject') {
    const placeholder = `// No pending import.\nexport const IS_STAGING = false\nexport const DATA_LAST_UPDATED = null\nexport const ENROLLED_FARMER_IDS = null\nexport const FARMER_DATA_UPDATED = null\nexport const USE_CASES = []\nexport const STATE_API_DATA = []\nexport const MAPPER_APIS = []\nexport const MAPPER_DONE_COUNTS = {}\nexport const STATUS_COLORS = {}\n`
    fs.writeFileSync(STAGING, placeholder, 'utf8')
    return NextResponse.json({ ok: true, action: 'rejected' })
  }

  return NextResponse.json({ error: 'Unknown action. Use ?action=approve or ?action=reject' }, { status: 400 })
}
