/**
 * AgriStack Dashboard — Data Abstraction Layer
 *
 * HOW IT WORKS (plain English):
 * ─────────────────────────────
 * Right now, every function below just returns the static data
 * from src/data/usecases.js (the JS file you already have).
 *
 * When your manager gives you a real API URL (e.g. https://api.agristack.gov.in/usecases),
 * you ONLY need to change the body of the relevant function here.
 * None of the page files (page.js etc.) need to change at all.
 *
 * EXAMPLE — switching to a real API when it's ready:
 *
 *   // Current (static):
 *   export async function getUseCases() {
 *     return USE_CASES;
 *   }
 *
 *   // Future (real API):
 *   export async function getUseCases() {
 *     const res = await fetch(process.env.NEXT_PUBLIC_API_BASE + '/usecases');
 *     return res.json();
 *   }
 *
 * You will also need to add this to .env.local:
 *   NEXT_PUBLIC_API_BASE=https://api.agristack.gov.in
 */

import { USE_CASES, STATE_API_DATA } from '@/data/usecases'

/** Fetch all use cases */
export async function getUseCases() {
  return USE_CASES
  // FUTURE: const res = await fetch(process.env.NEXT_PUBLIC_API_BASE + '/usecases', { cache: 'no-store' })
  // FUTURE: return res.json()
}

/** Fetch all state API integration data */
export async function getStateApiData() {
  return STATE_API_DATA
  // FUTURE: const res = await fetch(process.env.NEXT_PUBLIC_API_BASE + '/states', { cache: 'no-store' })
  // FUTURE: return res.json()
}

/** Fetch a single use case by ID */
export async function getUseCaseById(id) {
  return USE_CASES.find(u => u.id === id) ?? null
}

/** Fetch pre-computed dashboard summary statistics */
export async function getDashboardStats() {
  const useCases = await getUseCases()
  const states   = await getStateApiData()
  return {
    total:        useCases.length,
    live:         useCases.filter(u => u.status === 'Live').length,
    inProgress:   useCases.filter(u => u.status === 'In Progress').length,
    complete:     useCases.filter(u => u.status === 'Complete').length,
    onHold:       useCases.filter(u => u.status === 'On Hold').length,
    pending:      useCases.filter(u => u.status === 'Pending').length,
    statesActive: states.filter(s => s.status === 'Active').length,
    totalMou:     states.filter(s => s.mou).length,
    dcsStates:    states.filter(s => s.dcs).length,
  }
}
