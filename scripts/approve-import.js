/**
 * Approve staged import — makes the staging data go live.
 * Run: npm run approve-import
 */
const fs = require('fs')
const path = require('path')

const STAGING = path.join(__dirname, '..', 'src', 'data', 'usecases.STAGING.js')
const LIVE_DATA = path.join(__dirname, '..', 'src', 'data', 'usecases.js')

if (!fs.existsSync(STAGING)) {
  console.log('ℹ️   No staging import found. Nothing to approve.')
  console.log('    Run npm run import-excel first.')
  process.exit(0)
}

// Read staging, strip IS_STAGING flag, mark as approved
let content = fs.readFileSync(STAGING, 'utf8')
content = content
  .replace('// ⚠️  This is a PREVIEW file. It is NOT the live data.', '// ✅  APPROVED AND LIVE.')
  .replace(/\/\/     Review at:.*\n/, '')
  .replace(/\/\/     To approve:.*\n/, '')
  .replace(/\/\/     To reject:.*\n/, '')
  .replace('// ============================================================\n// Imported:', '// ============================================================\n// Approved:')
  .replace('export const IS_STAGING             = true', `export const IS_STAGING             = false`)

// Replace header comment
content = content.replace(
  '// AgriStack Dashboard — STAGING DATA (not yet approved)',
  '// AgriStack Dashboard — LIVE DATA (approved)'
)

fs.writeFileSync(LIVE_DATA, content, 'utf8')

// Reset staging placeholder instead of deleting to prevent Next.js crashes
const placeholder = `// No pending import.\nexport const IS_STAGING = false\nexport const DATA_LAST_UPDATED = null\nexport const ENROLLED_FARMER_IDS = null\nexport const FARMER_DATA_UPDATED = null\nexport const USE_CASES = []\nexport const STATE_API_DATA = []\nexport const MAPPER_APIS = []\nexport const MAPPER_DONE_COUNTS = {}\nexport const STATUS_COLORS = {}\n`
fs.writeFileSync(STAGING, placeholder, 'utf8')

console.log('')
console.log('✅  IMPORT APPROVED — Data is now LIVE.')
console.log('')
console.log('   The staging file has been reset.')
console.log('   The dashboard is now showing your new data.')
console.log('')
console.log('   If you need to undo this, run:')
console.log('   npm run revert')
