/**
 * AgriStack Dashboard — Excel → Data Converter  v2
 * Run: node scripts/excel-to-data.js
 *
 * Reads:  scripts/AgriStack_Data_Template.xlsx
 * Writes: src/data/usecases.js  (overwrites completely)
 *
 * USE_CASES column layout (v2):
 *  A=ID  B=Name  C=Status  D=Category  E=Dept  F=State/UT(State only)
 *  G=States Implemented In(Central/Multi)  H=Mapper  I=GoLiveDate
 *  J=URL  K=Scheme  L=Remarks
 */

const XLSX = require('xlsx')
const fs   = require('fs')
const path = require('path')

const TEMPLATE = path.join(__dirname, 'AgriStack_Data_Template.xlsx')
const OUTPUT   = path.join(__dirname, '..', 'src', 'data', 'usecases.js')

// ─── helpers ──────────────────────────────────────────────────────────────────
function readRows(wb, sheetName) {
  const ws = wb.Sheets[sheetName]
  if (!ws) {
    console.error(`❌  Sheet "${sheetName}" not found.`)
    process.exit(1)
  }
  return XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' })
}

const clean  = v => String(v ?? '').trim()
const yesNo  = v => clean(v).toLowerCase() === 'yes'
const parseStates = v => clean(v).split(',').map(s => s.trim()).filter(Boolean)

// ─── read file ────────────────────────────────────────────────────────────────
if (!fs.existsSync(TEMPLATE)) {
  console.error('❌  Template not found: ' + TEMPLATE)
  console.error('    Run first: node scripts/generate-template.js')
  process.exit(1)
}
console.log('📖  Reading: ' + TEMPLATE)
const wb = XLSX.readFile(TEMPLATE)

// ─── USE_CASES ────────────────────────────────────────────────────────────────
// Col index:  0=ID 1=Name 2=Status 3=Cat 4=Dept 5=State/UT 6=StatesIn
//             7=Mapper 8=GoLive 9=URL 10=Scheme 11=Remarks
const ucAllRows = readRows(wb, 'USE_CASES')
const useCases  = ucAllRows.slice(1)
  .filter(r => r[0] && r[1])
  .map(r => {
    const id       = Number(r[0])
    const name     = clean(r[1])
    const status   = clean(r[2])
    const category = clean(r[3])
    const dept     = clean(r[4])
    const stateUT  = clean(r[5])   // State/UT for State-category UCs
    const statesIn = parseStates(r[6])  // States Implemented for Central/Multi
    const mapper   = clean(r[7])
    const goLive   = clean(r[8])
    const url      = clean(r[9])
    const scheme   = clean(r[10])
    const remarks  = clean(r[11])

    const VALID_STATUS = ['Live','In Progress','Complete','On Hold','Pending']
    const VALID_CAT    = ['Central','State','Multi','Private']
    if (!VALID_STATUS.includes(status)) console.warn(`⚠️   ID ${id}: unknown Status "${status}"`)
    if (!VALID_CAT.includes(category))  console.warn(`⚠️   ID ${id}: unknown Category "${category}"`)

    const entry = { id, name, status, category, dept, mapper }

    // Attach state/states based on category
    if (category === 'State') {
      // Single state — from col F
      entry.stateUT = stateUT || dept  // fallback to dept if col F is blank
    } else if (category === 'Central' || category === 'Multi') {
      // List of states — from col G
      entry.states = statesIn
    }

    // Optional enrichment fields (only include if non-empty)
    if (goLive)  entry.goLive = goLive
    if (url)     entry.url    = url
    if (scheme)  entry.scheme = scheme
    if (remarks) entry.remarks = remarks

    return entry
  })
console.log(`✅  USE_CASES: ${useCases.length} rows`)

// ─── STATES ───────────────────────────────────────────────────────────────────
// Col: 0=Name 1=Region 2=MoU 3=DCS 4=FR 5=Total 6=Done 7=Status 8=Enrolled 9=Remarks
const stAllRows = readRows(wb, 'STATES')
const stateData = stAllRows.slice(1)
  .filter(r => r[0])
  .map(r => {
    const entry = {
      state:     clean(r[0]),
      region:    clean(r[1]),
      mou:       yesNo(r[2]),
      dcs:       yesNo(r[3]),
      fr:        yesNo(r[4]),
      apisTotal: Number(r[5]) || 0,
      apisDone:  Number(r[6]) || 0,
      status:    clean(r[7]),
    }
    const enrolled = clean(r[8])
    const remarks  = clean(r[9])
    if (enrolled) entry.enrolledFarmers = Number(enrolled.replace(/,/g, '')) || enrolled
    if (remarks)  entry.remarks = remarks
    return entry
  })
console.log(`✅  STATES: ${stateData.length} rows`)

// ─── MAPPER_APIS ──────────────────────────────────────────────────────────────
// Col: 0=ID 1=Desc 2=Done 3=Remarks
const mpAllRows = readRows(wb, 'MAPPER_APIS')
const mappers   = mpAllRows.slice(1)
  .filter(r => r[0])
  .map(r => ({ id: clean(r[0]), desc: clean(r[1]), done: Number(r[2]) || 0 }))
console.log(`✅  MAPPER_APIS: ${mappers.length} rows`)

// ─── CONFIG ───────────────────────────────────────────────────────────────────
const cfRows = readRows(wb, 'CONFIG')
const config  = {}
cfRows.slice(1).forEach(r => { if (r[0]) config[clean(r[0])] = clean(r[1]) })

const enrolledFarmerIds = config['Enrolled Farmer IDs']            || '—'
const farmerUpdated     = config['Enrolled Farmers Last Updated']  || '—'
const dataUpdated       = config['Data Last Updated']              || new Date().toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'})
const verifiedBy        = config['Data Verified By']               || ''
const verifiedDate      = config['Data Verification Date']         || ''
console.log(`✅  CONFIG: read`)

// ─── DONE COUNTS ─────────────────────────────────────────────────────────────
const doneCounts = {}
mappers.forEach(m => { doneCounts[m.id] = m.done })

// ─── WRITE usecases.js ────────────────────────────────────────────────────────
const out = `// ============================================================
// AgriStack Dashboard — Data File
// ============================================================
// ⚠️  DO NOT EDIT THIS FILE MANUALLY.
//     Auto-generated by: node scripts/excel-to-data.js
//     Source: scripts/AgriStack_Data_Template.xlsx
//     Generated: ${new Date().toLocaleString('en-IN')}
//     Data verified by: ${verifiedBy || '(not specified)'}
//     Verification date: ${verifiedDate || '(not specified)'}
// ============================================================

export const DATA_LAST_UPDATED      = ${JSON.stringify(dataUpdated)}
export const ENROLLED_FARMER_IDS    = ${JSON.stringify(enrolledFarmerIds)}
export const FARMER_DATA_UPDATED    = ${JSON.stringify(farmerUpdated)}

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

fs.writeFileSync(OUTPUT, out, 'utf8')

console.log('')
console.log('🎉  Done! Written to: src/data/usecases.js')
console.log('')
console.log('  Use Cases  :', useCases.length)
console.log('  States     :', stateData.length)
console.log('  Mapper APIs:', mappers.length)
console.log('  Updated    :', dataUpdated)
if (verifiedBy) console.log('  Verified by:', verifiedBy, verifiedDate ? `(${verifiedDate})` : '')
console.log('')
console.log('Run  npm run dev  to see the updated dashboard.')
