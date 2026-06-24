/**
 * Reject staged import — discards staging, live data is unchanged.
 * Run: npm run reject-import
 */
const fs = require('fs')
const path = require('path')

const STAGING = path.join(__dirname, '..', 'src', 'data', 'usecases.STAGING.js')

if (!fs.existsSync(STAGING)) {
  console.log('ℹ️   No staging import found. Nothing to reject.')
  process.exit(0)
}

const placeholder = `// No pending import.\nexport const IS_STAGING = false\nexport const DATA_LAST_UPDATED = null\nexport const ENROLLED_FARMER_IDS = null\nexport const FARMER_DATA_UPDATED = null\nexport const USE_CASES = []\nexport const STATE_API_DATA = []\nexport const MAPPER_APIS = []\nexport const MAPPER_DONE_COUNTS = {}\nexport const STATUS_COLORS = {}\n`
fs.writeFileSync(STAGING, placeholder, 'utf8')

console.log('')
console.log('🗑️   IMPORT REJECTED — Staging data discarded.')
console.log('')
console.log('   Your live dashboard data is completely UNCHANGED.')
console.log('   Fix the issues in the Excel file and run npm run import-excel again.')
