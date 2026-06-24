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

fs.unlinkSync(STAGING)

console.log('')
console.log('🗑️   IMPORT REJECTED — Staging data discarded.')
console.log('')
console.log('   Your live dashboard data is completely UNCHANGED.')
console.log('   Fix the issues in the Excel file and run npm run import-excel again.')
