/**
 * AgriStack Dashboard — Excel Template Generator
 * Run: node scripts/generate-template.js
 * Output: scripts/AgriStack_Data_Template.xlsx
 *
 * This creates a structured Excel workbook with 4 sheets:
 *   Sheet 1 — INSTRUCTIONS      (read-only guide)
 *   Sheet 2 — USE_CASES         (main data: all 78 use cases)
 *   Sheet 3 — STATES            (28 states API integration data)
 *   Sheet 4 — MAPPER_APIS       (16 mapper API definitions)
 *   Sheet 5 — CONFIG            (dashboard-level settings)
 */

const XLSX = require('xlsx')
const path = require('path')

// ─── Helper ───────────────────────────────────────────────────────────────────
function makeSheet(data) {
  return XLSX.utils.aoa_to_sheet(data)
}

function setColWidths(ws, widths) {
  ws['!cols'] = widths.map(w => ({ wch: w }))
}

function freezeRow(ws, row = 1) {
  ws['!freeze'] = { xSplit: 0, ySplit: row }
}

// ─── Sheet 1: INSTRUCTIONS ────────────────────────────────────────────────────
function buildInstructionsSheet() {
  const rows = [
    ['AgriStack Dashboard — Data Entry Template'],
    ['Ministry of Agriculture & Farmers Welfare, Government of India'],
    [''],
    ['PURPOSE'],
    ['This file is the single source of truth for the AgriStack Dashboard.'],
    ['Fill in all 4 data sheets accurately. The data will be imported into the dashboard automatically.'],
    [''],
    ['HOW TO USE'],
    ['Step 1: Fill in the USE_CASES sheet — one row per use case.'],
    ['Step 2: Fill in the STATES sheet — one row per state/UT.'],
    ['Step 3: Fill in the MAPPER_APIS sheet — one row per API mapper.'],
    ['Step 4: Fill in the CONFIG sheet — dashboard settings.'],
    ['Step 5: Save the file as AgriStack_Data_Template.xlsx (keep the name exactly as is).'],
    ['Step 6: Run the import command: node scripts/excel-to-data.js'],
    ['Step 7: Restart the dashboard: npm run dev'],
    [''],
    ['SHEET GUIDE'],
    ['USE_CASES sheet', 'All use cases with status, category, department, mapper, and states applied'],
    ['STATES sheet', 'State-wise MoU, DCS, FR flags and API integration counts'],
    ['MAPPER_APIS sheet', 'All mapper API IDs with descriptions and state completion counts'],
    ['CONFIG sheet', 'Dashboard-level data like enrolled farmer count and last-updated date'],
    [''],
    ['ALLOWED VALUES (do not use anything else — exact spelling matters)'],
    ['Status (USE_CASES):', 'Live | In Progress | Complete | On Hold | Pending'],
    ['Category (USE_CASES):', 'Central | State | Multi | Private'],
    ['MoU / DCS / FR (STATES):', 'Yes | No'],
    ['Integration Status (STATES):', 'Active | Partial | MoU Only | Not Live | Pending'],
    [''],
    ['IMPORTANT NOTES'],
    ['— The "States Applied" column in USE_CASES is ONLY for Central / Multi category schemes.'],
    ['— For State category schemes, leave "States Applied" blank.'],
    ['— Enter multiple states separated by commas. Example: Uttar Pradesh, Maharashtra, Gujarat'],
    ['— Do NOT delete existing rows. You may add new rows at the bottom.'],
    ['— Do NOT change column headers.'],
    ['— This file was generated on: ' + new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })],
  ]
  const ws = makeSheet(rows)
  setColWidths(ws, [40, 80])
  return ws
}

// ─── Sheet 2: USE_CASES ───────────────────────────────────────────────────────
function buildUseCasesSheet() {
  const headers = [
    'ID',
    'Use Case Name',
    'Status',
    'Category',
    'Department / State',
    'Mapper API ID',
    'States Applied (Central/Multi only — comma-separated)',
    'Remarks / Notes',
  ]

  const rows = [
    headers,
    // Pre-filled with existing 78 use cases (status/category/dept from tracker — states BLANK)
    [1,  'PM Kisan',                                           'Live',        'Central', 'DoA',            'i1:o2',                  '', ''],
    [2,  'Krishi Mapper',                                      'Live',        'Central', 'DoA',            'i1004:o1007',            '', ''],
    [3,  'MIDH - Suraksha Portal',                             'Live',        'Central', 'Horticulture',   'i1002:o1004',            '', ''],
    [4,  'KDSS (Krishi Decision Support System)',              'Live',        'Central', 'DoA',            'i6:o2',                  '', ''],
    [5,  'UPAg',                                               'Live',        'Central', 'DoA',            '',                       '', ''],
    [6,  'DGCES',                                              'Live',        'Central', 'DoA',            'i5:o6',                  '', ''],
    [7,  'NCCF - Agribid',                                     'Live',        'Central', 'NCCF',           '',                       '', ''],
    [8,  'NAFED PSS',                                          'Live',        'Central', 'NAFED',          'i1:o1 & i5:o3',          '', ''],
    [9,  'Krishika App',                                       'Live',        'Central', 'DoA',            '',                       '', ''],
    [10, 'NABKISAN Hackathon',                                 'Live',        'Central', 'NABARD',         '',                       '', ''],
    [11, 'PMFBY',                                              'Live',        'Central', 'DoA',            '',                       '', ''],
    [12, 'SHC (Soil Health Card)',                             'Live',        'Central', 'DoA',            'i2:o14',                 '', ''],
    [13, 'MH Panchnama',                                       'Live',        'State',   'Maharashtra',    '',                       '', ''],
    [14, 'Maha DBT MH',                                        'Live',        'State',   'Maharashtra',    'i4:o4 & i4:o7',          '', ''],
    [15, 'JanSamarth (MH)',                                    'Live',        'State',   'Maharashtra',    'i4:o4v1',                '', ''],
    [16, 'MSP Odisha',                                         'Live',        'State',   'Odisha',         'i1:o1 & i5:o3',          '', ''],
    [17, 'MSP MH',                                             'Live',        'State',   'Maharashtra',    '',                       '', ''],
    [18, 'MSP MP',                                             'Live',        'State',   'Madhya Pradesh', '',                       '', ''],
    [19, 'FFS MH',                                             'Live',        'State',   'Maharashtra',    '',                       '', ''],
    [20, 'Family ID - UP',                                     'Live',        'State',   'Uttar Pradesh',  'i12:o20',                '', ''],
    [21, 'APAIMS',                                             'Live',        'State',   'Andhra Pradesh', '',                       '', ''],
    [22, 'MP e-Fertilizer',                                    'Live',        'State',   'Madhya Pradesh', '',                       '', ''],
    [23, 'MSP CG',                                             'Live',        'State',   'Chhattisgarh',   '',                       '', ''],
    [24, 'MSP UP',                                             'Live',        'State',   'Uttar Pradesh',  '',                       '', ''],
    [25, 'Kuruvai - TN',                                       'Live',        'State',   'Tamil Nadu',     'i1002:o1004',            '', ''],
    [26, 'MSP GJ',                                             'Live',        'State',   'Gujarat',        '',                       '', ''],
    [27, 'SATHI',                                              'Live',        'State',   'Uttar Pradesh',  '',                       '', ''],
    [28, 'NDKSP MH / PoCRA DBT',                              'Live',        'State',   'Maharashtra',    '',                       '', ''],
    [29, 'CM Kisan - OD',                                      'Live',        'State',   'Odisha',         '',                       '', ''],
    [30, 'iKhedut',                                            'In Progress', 'State',   'Gujarat',        '',                       '', ''],
    [31, 'Unnoti Portal',                                      'In Progress', 'State',   'Tripura',        '',                       '', ''],
    [32, 'iFMS',                                               'In Progress', 'State',   'Madhya Pradesh', '',                       '', ''],
    [33, 'PMFBY (UP)',                                         'In Progress', 'State',   'Uttar Pradesh',  '',                       '', ''],
    [34, 'Common Farmer Registration Portal (CFRP)',           'In Progress', 'Central', 'DoA',            '',                       '', ''],
    [35, 'MSP RJ',                                             'In Progress', 'State',   'Rajasthan',      '',                       '', ''],
    [36, 'JanSamarth (Other States: TG, AP, OD)',             'In Progress', 'State',   'Multi-State',    'i4:o4v1',                '', ''],
    [37, 'Jute Corporation of India (JCI)',                    'In Progress', 'Central', 'JCI',            '',                       '', ''],
    [38, 'Kathir - KL',                                        'In Progress', 'State',   'Kerala',         '',                       '', ''],
    [39, 'Soyabean Exporters MP (EUDR)',                       'In Progress', 'State',   'Madhya Pradesh', 'i16:o21',                '', ''],
    [40, 'MP Kisan',                                           'In Progress', 'State',   'Madhya Pradesh', '',                       '', ''],
    [41, 'NFDP',                                               'In Progress', 'Central', 'Fisheries',      'i4:o4',                  '', ''],
    [42, 'Madhu Kranti - Beekeeper',                          'In Progress', 'Central', 'DoA',            '',                       '', ''],
    [43, 'MIMIS (Micro-irrigation MIS)',                       'In Progress', 'State',   'Tamil Nadu',     'i1002:o1004',            '', ''],
    [44, 'NDKSP (MH, CG, MP)',                                'In Progress', 'State',   'Multi-State',    '',                       '', ''],
    [45, 'CCI - MH',                                          'In Progress', 'State',   'Maharashtra',    '',                       '', ''],
    [46, 'ePACS',                                              'In Progress', 'Multi',   'Multi-State',    'i1002:o1001 i15:o19 i1004:o1006V2', '', ''],
    [47, 'Integration with PACS',                              'In Progress', 'Central', 'DoA',            '',                       '', ''],
    [48, 'Integration with AHD',                               'In Progress', 'Central', 'DoA',            '',                       '', ''],
    [49, 'PM ASHA',                                            'On Hold',     'Central', 'DoA',            '',                       '', ''],
    [50, 'Pulses Mission',                                     'On Hold',     'Central', 'DoA',            '',                       '', ''],
    [51, 'e-KCC (Kisan Credit Card)',                         'On Hold',     'State',   'Uttar Pradesh',  '',                       '', ''],
    [52, 'NABKISAN (NABARD)',                                   'On Hold',     'Central', 'NABARD',         '',                       '', ''],
    [53, 'CFRP',                                               'Complete',    'Central', 'DoA',            '',                       '', ''],
    [54, 'Crop SAP - MH',                                      'Complete',    'State',   'Maharashtra',    '',                       '', ''],
    [55, 'Agri Mechanisation - MP',                            'Complete',    'State',   'Madhya Pradesh', '',                       '', ''],
    [56, 'e-Uparjan / Bhavantar - MP',                        'Complete',    'State',   'Madhya Pradesh', '',                       '', ''],
    [57, 'Darshan Portal - UP',                                'Complete',    'State',   'Uttar Pradesh',  '',                       '', ''],
    [58, 'Wadhwani Foundation',                                'Complete',    'Private', 'Wadhwani',       '',                       '', ''],
    [59, 'NCCF Radiant',                                       'Complete',    'Central', 'NCCF',           '',                       '', ''],
    [60, 'UP e-Ganna',                                         'Complete',    'State',   'Uttar Pradesh',  '',                       '', ''],
    [61, 'Arya.AG',                                            'Complete',    'Private', 'Arya.AG',        '',                       '', ''],
    [62, 'Jai Kisan',                                          'Complete',    'Private', 'Jai Kisan',      '',                       '', ''],
    [63, 'APEDA',                                              'Complete',    'Central', 'APEDA',          '',                       '', ''],
    [64, 'Dehaat',                                             'Complete',    'Private', 'Dehaat',         '',                       '', ''],
    [65, 'NCCF NeML',                                          'Complete',    'Central', 'NCCF',           '',                       '', ''],
    [66, 'Crop Identification',                                'Complete',    'Central', 'DoA',            '',                       '', ''],
    [67, 'Oil Seeds',                                          'Complete',    'Central', 'DoA',            '',                       '', ''],
    [68, 'NABARD',                                             'Pending',     'Central', 'NABARD',         '',                       '', ''],
    [69, 'Bharat Vistaar',                                     'Pending',     'Central', 'DoA',            '',                       '', ''],
    [70, 'NAFED UP (NeML)',                                    'Pending',     'Central', 'NAFED',          '',                       '', ''],
    [71, 'KHC (Kisan Helpline Center)',                       'Pending',     'Central', 'DoA',            '',                       '', ''],
    [72, 'Crop Diversification',                               'Pending',     'Central', 'DoA',            '',                       '', ''],
    [73, 'Animal Husbandry / Fodder Crops',                   'Pending',     'Central', 'AHD',            '',                       '', ''],
    [74, 'NPSS',                                               'Pending',     'Central', 'DoA',            '',                       '', ''],
    [75, 'Bihar DBT',                                          'Pending',     'State',   'Bihar',          '',                       '', ''],
    [76, 'MH Data Exchange',                                   'Pending',     'State',   'Maharashtra',    '',                       '', ''],
    [77, 'KRP (Kisan Rin Portal)',                             'Pending',     'Central', 'DoA',            '',                       '', ''],
    [78, 'MSP RJ (Rajasthan)',                                 'Pending',     'State',   'Rajasthan',      '',                       '', ''],
    // ← ADD NEW USE CASES BELOW THIS LINE (continue numbering from 79)
  ]

  const ws = makeSheet(rows)
  setColWidths(ws, [5, 45, 14, 10, 22, 26, 60, 30])
  freezeRow(ws, 1)
  return ws
}

// ─── Sheet 3: STATES ──────────────────────────────────────────────────────────
function buildStatesSheet() {
  const headers = [
    'State / UT Name',
    'MoU Signed (Yes/No)',
    'DCS Done (Yes/No)',
    'FR Done (Yes/No)',
    'Total Mapper APIs',
    'APIs Integrated (Done count)',
    'Integration Status',
    'Remarks',
  ]

  const rows = [
    headers,
    ['Gujarat',           'Yes', 'Yes', 'Yes', 24, 20, 'Active',   ''],
    ['Uttar Pradesh',     'Yes', 'Yes', 'Yes', 24, 22, 'Active',   ''],
    ['Maharashtra',       'Yes', 'Yes', 'Yes', 24, 18, 'Active',   ''],
    ['Madhya Pradesh',    'Yes', 'Yes', 'Yes', 24, 16, 'Active',   ''],
    ['Odisha',            'Yes', 'Yes', 'Yes', 24, 17, 'Active',   ''],
    ['Andhra Pradesh',    'Yes', 'Yes', 'Yes', 24, 14, 'Active',   ''],
    ['Chhattisgarh',      'Yes', 'Yes', 'Yes', 24, 16, 'Active',   ''],
    ['Tamil Nadu',        'Yes', 'Yes', 'Yes', 24, 14, 'Active',   ''],
    ['Rajasthan',         'Yes', 'Yes', 'Yes', 24, 13, 'Active',   ''],
    ['Assam',             'Yes', 'Yes', 'Yes', 24, 14, 'Active',   ''],
    ['Telangana',         'Yes', 'Yes', 'Yes', 24, 12, 'Active',   ''],
    ['Punjab',            'Yes', 'Yes', 'Yes', 24, 11, 'Active',   ''],
    ['Bihar',             'Yes', 'Yes', 'Yes', 24,  9, 'Active',   ''],
    ['Kerala',            'Yes', 'Yes', 'Yes', 24,  8, 'Active',   ''],
    ['Karnataka',         'Yes', 'Yes', 'Yes', 24,  6, 'Partial',  ''],
    ['Himachal Pradesh',  'Yes', 'Yes', 'Yes', 24,  6, 'Partial',  ''],
    ['Haryana',           'Yes', 'Yes', 'Yes', 24,  5, 'Partial',  ''],
    ['Tripura',           'Yes', 'No',  'Yes', 24,  5, 'Partial',  ''],
    ['Uttarakhand',       'Yes', 'Yes', 'Yes', 24,  3, 'Partial',  ''],
    ['Jharkhand',         'Yes', 'Yes', 'No',  24,  1, 'Not Live', ''],
    ['Manipur',           'Yes', 'No',  'No',  24,  4, 'Partial',  ''],
    ['Jammu & Kashmir',   'Yes', 'Yes', 'No',  24,  0, 'MoU Only', ''],
    ['Puducherry',        'Yes', 'No',  'No',  24,  0, 'MoU Only', ''],
    ['Goa',               'No',  'Yes', 'No',  24,  0, 'MoU Only', ''],
    ['Mizoram',           'Yes', 'Yes', 'No',  24,  0, 'MoU Only', ''],
    ['Arunachal Pradesh', 'Yes', 'No',  'No',  24,  0, 'Pending',  ''],
    ['Meghalaya',         'No',  'No',  'No',  24,  0, 'Pending',  ''],
    ['West Bengal',       'No',  'No',  'No',  24,  0, 'Pending',  ''],
    // ← ADD NEW STATES BELOW THIS LINE
  ]

  const ws = makeSheet(rows)
  setColWidths(ws, [22, 20, 16, 14, 18, 26, 20, 30])
  freezeRow(ws, 1)
  return ws
}

// ─── Sheet 4: MAPPER_APIS ─────────────────────────────────────────────────────
function buildMapperSheet() {
  const headers = [
    'Mapper API ID',
    'Description (what data this API provides)',
    'Total States Active (done count)',
    'Remarks',
  ]

  const rows = [
    headers,
    ['i1001:o1001', 'Farmer Data by Farmer ID',                             18, ''],
    ['i1001:o1002', 'Land Data by Farmer ID',                               18, ''],
    ['i1001:o1004', 'Farmer + Land Data by Farmer ID',                      19, ''],
    ['i1002:o1001', 'Farmer Data by Aadhaar',                               18, ''],
    ['i1002:o1004', 'Farmer + Land Data by Aadhaar',                        18, ''],
    ['i1003:o1002', 'Land by Village LGD + Survey No.',                     11, ''],
    ['i1004:o1003', 'Crop Data by Farmer ID, Year, Season',                  2, ''],
    ['i1004:o1006', 'Land + Crop Survey Data by Farmer ID',                  1, ''],
    ['i1004:o1007', 'Farmer + Land + Crop by Farmer ID',                    11, ''],
    ['i1005:o1003', 'Crop by Village LGD + Survey, Year, Season',            7, ''],
    ['i1005:o1006', 'Land + Crop by Village LGD + Survey',                   3, ''],
    ['i4:o4',       'Farmer ID by Encrypted Aadhaar',                       14, ''],
    ['i6:o2',       'Anonymised Crop Sown at Village Level',                  5, ''],
    ['i2:o14',      'Soil Health Data by Farmer ID',                        11, ''],
    ['i12:o20',     'Total Land Area by Farmer ID',                         15, ''],
    ['i16:o21',     'Farmer & Land Details for Scheme Eligibility',          6, ''],
    // ← ADD NEW MAPPER APIs BELOW THIS LINE
  ]

  const ws = makeSheet(rows)
  setColWidths(ws, [16, 50, 26, 30])
  freezeRow(ws, 1)
  return ws
}

// ─── Sheet 5: CONFIG ──────────────────────────────────────────────────────────
function buildConfigSheet() {
  const rows = [
    ['Field', 'Value', 'Notes'],
    ['Enrolled Farmer IDs',          '99875423',    'Total farmer IDs enrolled on AgriStack. Update with latest figure.'],
    ['Enrolled Farmers Last Updated', '23 June 2026', 'Date when the enrolled farmer count was last verified.'],
    ['Data Last Updated',             '',            'Date the Excel file was last filled/verified by team (e.g. 24 June 2026).'],
    ['Total States in Programme',    '28',           'Number of states/UTs in the AgriStack programme.'],
    ['Total Mapper APIs',            '16',           'Total number of mapper API types tracked.'],
    ['Dashboard Subtitle',           'Digital Agriculture Mission — Use Case Command Centre', 'Appears in the hero banner.'],
    ['Ministry Name',                'Ministry of Agriculture & Farmers Welfare, Government of India', ''],
    ['Programme Name',               'AgriStack', ''],
  ]

  const ws = makeSheet(rows)
  setColWidths(ws, [30, 55, 60])
  freezeRow(ws, 1)
  return ws
}

// ─── Build & Write ────────────────────────────────────────────────────────────
const wb = XLSX.utils.book_new()

XLSX.utils.book_append_sheet(wb, buildInstructionsSheet(), 'INSTRUCTIONS')
XLSX.utils.book_append_sheet(wb, buildUseCasesSheet(),     'USE_CASES')
XLSX.utils.book_append_sheet(wb, buildStatesSheet(),       'STATES')
XLSX.utils.book_append_sheet(wb, buildMapperSheet(),       'MAPPER_APIS')
XLSX.utils.book_append_sheet(wb, buildConfigSheet(),       'CONFIG')

const outPath = path.join(__dirname, 'AgriStack_Data_Template.xlsx')
XLSX.writeFile(wb, outPath)

console.log('✅  Template created successfully!')
console.log('📄  File: ' + outPath)
console.log('')
console.log('Next steps:')
console.log('  1. Open AgriStack_Data_Template.xlsx in Excel or Google Sheets')
console.log('  2. Fill in the USE_CASES, STATES, MAPPER_APIS and CONFIG sheets')
console.log('  3. Save the file (keep the name exactly: AgriStack_Data_Template.xlsx)')
console.log('  4. Run: node scripts/excel-to-data.js')
console.log('  5. Run: npm run dev  (or the dashboard auto-refreshes if already running)')
