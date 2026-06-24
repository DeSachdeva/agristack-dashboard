/**
 * Export current LIVE dashboard data to an Excel Template.
 * Run: npm run export-excel
 */

const XLSX = require('xlsx')
const path = require('path')
const url = require('url')

async function runExport() {
  // Import current live data dynamically
  const LIVE_DATA_PATH = path.join(__dirname, '..', 'src', 'data', 'usecases.js')
  const moduleUrl = url.pathToFileURL(LIVE_DATA_PATH).href
  
  const {
    USE_CASES, STATE_API_DATA, MAPPER_APIS,
    DATA_LAST_UPDATED, ENROLLED_FARMER_IDS, FARMER_DATA_UPDATED
  } = await import(moduleUrl)

  // Ensure data is structured correctly for Excel format
  const ucRows = [
    ['ID', 'Use Case Name', 'Status', 'Category', 'Department / Implementing Agency', 'State / UT', 'States Implemented In', 'Mapper API ID', 'Go-Live Date', 'Portal / URL', 'Scheme / Programme', 'Remarks / Notes']
  ]
  USE_CASES.forEach(u => {
    ucRows.push([
      u.id,
      u.name,
      u.status,
      u.category,
      u.dept,
      u.stateUT || (u.category === 'State' ? u.dept : ''),
      (u.states || []).join(', '),
      u.mapper,
      u.goLive || '',
      u.url || '',
      u.scheme || '',
      u.remarks || ''
    ])
  })

  const stateRows = [
    ['State / UT', 'Region', 'MoU Signed', 'DCS Ready', 'FR Ready', 'Total APIs', 'Done APIs', 'Status', 'Enrolled Farmers', 'Remarks']
  ]
  STATE_API_DATA.forEach(s => {
    stateRows.push([
      s.state,
      s.region,
      s.mou ? 'Yes' : 'No',
      s.dcs ? 'Yes' : 'No',
      s.fr ? 'Yes' : 'No',
      s.apisTotal || 0,
      s.apisDone || 0,
      s.status,
      s.enrolledFarmers || '',
      s.remarks || ''
    ])
  })

  const mapperRows = [
    ['API ID', 'Description', 'States Implemented', 'Remarks']
  ]
  if (MAPPER_APIS) {
    MAPPER_APIS.forEach(m => {
      mapperRows.push([m.id, m.desc, '', ''])
    })
  }

  const configRows = [
    ['Key', 'Value'],
    ['Data Last Updated', DATA_LAST_UPDATED || ''],
    ['Enrolled Farmer IDs', ENROLLED_FARMER_IDS || ''],
    ['Enrolled Farmers Last Updated', FARMER_DATA_UPDATED || ''],
    ['Data Verified By', ''],
    ['Data Verification Date', '']
  ]

  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(ucRows), 'USE_CASES')
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(stateRows), 'STATES')
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(mapperRows), 'MAPPER_APIS')
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(configRows), 'CONFIG')

  const EXPORT_PATH = path.join(__dirname, 'AgriStack_Data_Export.xlsx')
  XLSX.writeFile(wb, EXPORT_PATH)

  console.log('')
  console.log('✅ EXPORT COMPLETE')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('The current live dashboard data has been exported to:')
  console.log('📁 ' + EXPORT_PATH)
  console.log('')
}

runExport().catch(console.error)
