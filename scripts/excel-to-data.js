/**
 * AgriStack Dashboard — Excel → Staged Import  v3
 *
 * Run:    node scripts/excel-to-data.js
 *         OR: npm run import-excel
 *
 * What this does:
 *   1. Reads scripts/AgriStack_Data_Template.xlsx
 *   2. Creates a timestamped BACKUP of the current live data
 *   3. Writes new data to src/data/usecases.STAGING.js  ← NOT live yet
 *   4. Tells you to visit /preview to check the dashboard
 *   5. Then run: npm run approve-import   (to go live)
 *             or: npm run reject-import   (to discard)
 */

const XLSX = require('xlsx')
const fs   = require('fs')
const path = require('path')

const TEMPLATE    = path.join(__dirname, 'AgriStack_Data_Template.xlsx')
const LIVE_DATA   = path.join(__dirname, '..', 'src', 'data', 'usecases.js')
const STAGING     = path.join(__dirname, '..', 'src', 'data', 'usecases.STAGING.js')
const BACKUPS_DIR = path.join(__dirname, 'backups')

// ─── helpers ──────────────────────────────────────────────────────────────────
const clean       = v => String(v ?? '').trim()
const yesNo       = v => clean(v).toLowerCase() === 'yes'
const parseStates = v => clean(v).split(',').map(s => s.trim()).filter(Boolean)

function readRows(wb, sheetName) {
  const ws = wb.Sheets[sheetName]
  if (!ws) { console.error(`❌  Sheet "${sheetName}" not found.`); process.exit(1) }
  return XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' })
}

// ─── Step 1: Check template ───────────────────────────────────────────────────
if (!fs.existsSync(TEMPLATE)) {
  console.error('❌  Template not found: ' + TEMPLATE)
  console.error('    Run first: npm run generate-template')
  process.exit(1)
}
console.log('📖  Reading: ' + TEMPLATE)
const wb = XLSX.readFile(TEMPLATE)

// ─── Step 2: Backup current live data ────────────────────────────────────────
if (fs.existsSync(LIVE_DATA)) {
  if (!fs.existsSync(BACKUPS_DIR)) fs.mkdirSync(BACKUPS_DIR, { recursive: true })
  const ts         = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)
  const backupPath = path.join(BACKUPS_DIR, `usecases_${ts}.js`)
  fs.copyFileSync(LIVE_DATA, backupPath)
  // Keep a pointer to the latest backup
  fs.writeFileSync(path.join(BACKUPS_DIR, 'LATEST_BACKUP.txt'), backupPath, 'utf8')
  console.log('💾  Backup saved: scripts/backups/usecases_' + ts + '.js')
} else {
  console.log('ℹ️   No live data file found yet — skipping backup.')
}

// ─── Step 3: Parse Excel ──────────────────────────────────────────────────────
// USE_CASES — col: 0=ID 1=Name 2=Status 3=Cat 4=Dept 5=State/UT 6=StatesIn
//             7=Mapper 8=GoLive 9=URL 10=Scheme 11=Remarks
const useCases = readRows(wb, 'USE_CASES').slice(1)
  .filter(r => r[0] && r[1])
  .map(r => {
    const id = Number(r[0]), name = clean(r[1]), status = clean(r[2])
    const category = clean(r[3]), dept = clean(r[4])
    const stateUT  = clean(r[5]), statesIn = parseStates(r[6])
    const mapper   = clean(r[7]), goLive = clean(r[8])
    const url      = clean(r[9]), scheme = clean(r[10]), remarks = clean(r[11])

    const VALID_STATUS = ['Live','In Progress','Complete','On Hold','Pending']
    const VALID_CAT    = ['Central','State','Multi','Private']
    if (!VALID_STATUS.includes(status)) console.warn(`  ⚠️  ID ${id} "${name}": unknown Status "${status}"`)
    if (!VALID_CAT.includes(category))  console.warn(`  ⚠️  ID ${id} "${name}": unknown Category "${category}"`)

    const entry = { id, name, status, category, dept, mapper }
    if (category === 'State')                              entry.stateUT = stateUT || dept
    if (category === 'Central' || category === 'Multi')   entry.states  = statesIn
    if (goLive)  entry.goLive  = goLive
    if (url)     entry.url     = url
    if (scheme)  entry.scheme  = scheme
    if (remarks) entry.remarks = remarks
    return entry
  })

// STATES — 0=Name 1=Region 2=MoU 3=DCS 4=FR 5=Total 6=Done 7=Status 8=Enrolled 9=Remarks
const stateData = readRows(wb, 'STATES').slice(1)
  .filter(r => r[0])
  .map(r => {
    const entry = {
      state: clean(r[0]), region: clean(r[1]),
      mou: yesNo(r[2]), dcs: yesNo(r[3]), fr: yesNo(r[4]),
      apisTotal: Number(r[5]) || 0, apisDone: Number(r[6]) || 0,
      status: clean(r[7]),
    }
    const enrolled = clean(r[8]); const remarks = clean(r[9])
    if (enrolled) entry.enrolledFarmers = Number(enrolled.replace(/,/g,'')) || enrolled
    if (remarks)  entry.remarks = remarks
    return entry
  })

// MAPPER_APIS — 0=ID 1=Desc 2=Done 3=Remarks
const mappers = readRows(wb, 'MAPPER_APIS').slice(1)
  .filter(r => r[0])
  .map(r => ({ id: clean(r[0]), desc: clean(r[1]), done: Number(r[2]) || 0 }))

// CONFIG
const config = {}
readRows(wb, 'CONFIG').slice(1).forEach(r => { if (r[0]) config[clean(r[0])] = clean(r[1]) })

const enrolledFarmerIds = config['Enrolled Farmer IDs']           || '—'
const farmerUpdated     = config['Enrolled Farmers Last Updated'] || '—'
const dataUpdated       = config['Data Last Updated']             || new Date().toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'})
const verifiedBy        = config['Data Verified By']              || ''
const verifiedDate      = config['Data Verification Date']        || ''

const doneCounts = {}
mappers.forEach(m => { doneCounts[m.id] = m.done })

console.log(`✅  USE_CASES:   ${useCases.length} rows`)
console.log(`✅  STATES:      ${stateData.length} rows`)
console.log(`✅  MAPPER_APIS: ${mappers.length} rows`)

// ─── Step 4: Write STAGING file ───────────────────────────────────────────────
const stagingContent = `// ============================================================
// AgriStack Dashboard — STAGING DATA (not yet approved)
// ============================================================
// ⚠️  This is a PREVIEW file. It is NOT the live data.
//     Review at: http://localhost:3000/preview
//     To approve:  npm run approve-import
//     To reject:   npm run reject-import
// ============================================================
// Imported:   ${new Date().toLocaleString('en-IN')}
// Source:     scripts/AgriStack_Data_Template.xlsx
// Verified by: ${verifiedBy || '(not specified)'}
// ============================================================

export const DATA_LAST_UPDATED      = ${JSON.stringify(dataUpdated)}
export const ENROLLED_FARMER_IDS    = ${JSON.stringify(enrolledFarmerIds)}
export const FARMER_DATA_UPDATED    = ${JSON.stringify(farmerUpdated)}
export const IS_STAGING             = true

export const USE_CASES = ${JSON.stringify(useCases, null, 2)}

export const STATE_API_DATA = ${JSON.stringify(stateData, null, 2)}

export const MAPPER_APIS = ${JSON.stringify(mappers.map(m => ({ id: m.id, desc: m.desc })), null, 2)}

export const MAPPER_DONE_COUNTS = ${JSON.stringify(doneCounts, null, 2)}

export const STATUS_COLORS = {
  "Live":        { bg: "bg-green-100",  text: "text-green-800",  dot: "bg-green-500"  },
  "In Progress": { bg: "bg-blue-100",   text: "text-blue-800",   dot: "bg-blue-500"   },
  "Complete":    { bg: "bg-purple-100", text: "text-purple-800", dot: "bg-purple-500" },
  "On Hold":     { bg: "bg-amber-100",  text: "text-amber-800",  dot: "bg-amber-400"  },
  "Pending":     { bg: "bg-gray-100",   text: "text-gray-600",   dot: "bg-gray-400"   },
}
`

fs.writeFileSync(STAGING, stagingContent, 'utf8')

console.log('')
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
console.log('📋  STAGING IMPORT COMPLETE')
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
console.log('')
console.log('  The live dashboard is UNCHANGED.')
console.log('')
console.log('  Next steps:')
console.log('  1. Open your browser → http://localhost:3000/preview')
console.log('     (This shows the dashboard with your new data)')
console.log('')
console.log('  2. If everything looks correct:')
console.log('     npm run approve-import')
console.log('')
console.log('  3. If something is wrong:')
console.log('     npm run reject-import')
console.log('     (Your original data stays unchanged)')
console.log('')
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
