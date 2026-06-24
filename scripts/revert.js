/**
 * Revert live data to a previous backup.
 * Run: npm run revert
 *
 * Lists the last 10 backups and lets you pick one to restore.
 * Or automatically restores the most recent backup.
 */
const fs = require('fs')
const path = require('path')
const readline = require('readline')

const BACKUPS_DIR = path.join(__dirname, 'backups')
const LIVE_DATA = path.join(__dirname, '..', 'src', 'data', 'usecases.js')

if (!fs.existsSync(BACKUPS_DIR)) {
  console.log('ℹ️   No backups folder found. No backups available yet.')
  process.exit(0)
}

// Find all backup files, sorted newest first
const backups = fs.readdirSync(BACKUPS_DIR)
  .filter(f => f.startsWith('usecases_') && f.endsWith('.js'))
  .sort()
  .reverse()
  .slice(0, 10)  // show last 10

if (backups.length === 0) {
  console.log('ℹ️   No backups found in scripts/backups/.')
  process.exit(0)
}

console.log('')
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
console.log('🔄  REVERT — Available Backups')
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
console.log('')
backups.forEach((f, i) => {
  // Parse timestamp from filename: usecases_2026-06-24T07-30-00.js
  const ts = f.replace('usecases_', '').replace('.js', '')
  const dt = ts.slice(0, 10) + ' at ' + ts.slice(11).replace(/-/g, ':')
  const tag = i === 0 ? ' ← most recent' : ''
  console.log(`  [${i + 1}] ${dt}${tag}`)
})
console.log('')
console.log('  [Enter] to restore most recent backup')
console.log('  [number] to restore a specific backup')
console.log('  [q] to quit without reverting')
console.log('')

const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
rl.question('Your choice: ', answer => {
  rl.close()
  const trimmed = answer.trim()

  if (trimmed === 'q' || trimmed === 'Q') {
    console.log('\n  Cancelled. No changes made.')
    process.exit(0)
  }

  let selected
  if (trimmed === '' || trimmed === '1') {
    selected = backups[0]
  } else {
    const idx = parseInt(trimmed, 10)
    if (isNaN(idx) || idx < 1 || idx > backups.length) {
      console.log('\n❌  Invalid choice. No changes made.')
      process.exit(1)
    }
    selected = backups[idx - 1]
  }

  const backupPath = path.join(BACKUPS_DIR, selected)
  fs.copyFileSync(backupPath, LIVE_DATA)

  // Also delete staging if it exists
  const staging = path.join(__dirname, '..', 'src', 'data', 'usecases.STAGING.js')
  const placeholder = `// No pending import.\nexport const IS_STAGING = false\nexport const DATA_LAST_UPDATED = null\nexport const ENROLLED_FARMER_IDS = null\nexport const FARMER_DATA_UPDATED = null\nexport const USE_CASES = []\nexport const STATE_API_DATA = []\nexport const MAPPER_APIS = []\nexport const MAPPER_DONE_COUNTS = {}\nexport const STATUS_COLORS = {}\n`
  fs.writeFileSync(staging, placeholder, 'utf8')

  const ts = selected.replace('usecases_', '').replace('.js', '')
  const dt = ts.slice(0, 10) + ' at ' + ts.slice(11).replace(/-/g, ':')
  console.log('')
  console.log(`✅  REVERTED to backup from: ${dt}`)
  console.log('')
  console.log('   The dashboard now shows the data from that backup.')
  console.log('   Refresh your browser to see the changes.')
})
