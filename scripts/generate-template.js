/**
 * AgriStack Dashboard — Excel Template Generator  v2
 * Run: node scripts/generate-template.js
 * Output: scripts/AgriStack_Data_Template.xlsx
 *
 * Sheets:
 *   1. INSTRUCTIONS   — guide for the person filling the file
 *   2. USE_CASES      — all use cases (78 pre-filled rows)
 *   3. STATES         — 28 states/UTs API integration data
 *   4. MAPPER_APIS    — 16 mapper API types
 *   5. CONFIG         — dashboard-level settings
 */

const XLSX = require('xlsx')
const path = require('path')

function makeSheet(data) {
  return XLSX.utils.aoa_to_sheet(data)
}
function setColWidths(ws, widths) {
  ws['!cols'] = widths.map(w => ({ wch: w }))
}

// ─── Sheet 1 : INSTRUCTIONS ───────────────────────────────────────────────────
function buildInstructions() {
  const rows = [
    ['AgriStack Dashboard — Data Entry Template  (v2)'],
    ['Ministry of Agriculture & Farmers Welfare, Government of India'],
    ['Generated: ' + new Date().toLocaleDateString('en-IN', { day:'numeric', month:'long', year:'numeric' })],
    [''],
    ['━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'],
    ['PURPOSE'],
    ['━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'],
    ['This file is the SINGLE SOURCE OF TRUTH for the AgriStack dashboard.'],
    ['All 4 data sheets must be filled accurately before importing.'],
    ['Once filled, run:  node scripts/excel-to-data.js'],
    ['Then restart the dashboard:  npm run dev'],
    [''],
    ['━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'],
    ['USE_CASES SHEET — COLUMN-BY-COLUMN GUIDE'],
    ['━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'],
    ['Column', 'What to enter', 'Example'],
    ['A  ID', 'Serial number. Do not change existing IDs. Add new rows at bottom with next number.', '1, 2, 3 ...'],
    ['B  Use Case Name', 'Full official name of the use case / scheme', 'PM Kisan'],
    ['C  Status', 'EXACT value from: Live | In Progress | Complete | On Hold | Pending', 'Live'],
    ['D  Category', 'EXACT value from: Central | State | Multi | Private', 'Central'],
    ['E  Department / Implementing Agency', 'The department or organisation implementing this use case', 'DoA  or  NABARD  or  Maharashtra'],
    ['F  State / UT  (State category only)', 'Fill ONLY if Category = State. Enter the ONE state name. Leave blank for Central/Multi/Private.', 'Maharashtra'],
    ['G  States Implemented In  (Central / Multi only)', 'Fill ONLY if Category = Central or Multi. Enter ALL states where this scheme is implemented, comma-separated.', 'Uttar Pradesh, Maharashtra, Gujarat'],
    ['H  Mapper API ID', 'The mapper API code(s). Leave blank if no mapper is assigned.', 'i1001:o1004'],
    ['I  Go-Live Date', 'For Live status use cases only. Month and year when it went live.', 'January 2025'],
    ['J  Portal / URL', 'Official portal link if available. Leave blank if none.', 'https://pmkisan.gov.in'],
    ['K  Scheme / Programme', 'The parent scheme or programme this use case falls under.', 'PM-KISAN  or  PMFBY'],
    ['L  Remarks / Notes', 'Any context, caveats, or important notes.', 'Integration via PFMS gateway'],
    [''],
    ['━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'],
    ['STATES SHEET — COLUMN-BY-COLUMN GUIDE'],
    ['━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'],
    ['Column', 'What to enter', 'Example'],
    ['A  State / UT Name', 'Official state name as per GoI', 'Uttar Pradesh'],
    ['B  Region', 'North / South / East / West / North-East / Central / Island', 'North'],
    ['C  MoU Signed', 'Yes or No', 'Yes'],
    ['D  DCS Done', 'Yes or No  (District Collector / State Data Sharing)', 'Yes'],
    ['E  FR Done', 'Yes or No  (Farmer Registry completed)', 'No'],
    ['F  Total Mapper APIs', 'Total number of mapper API types applicable (usually 16 or 24)', '24'],
    ['G  APIs Integrated (Done)', 'Count of mapper APIs actually integrated/live for this state', '18'],
    ['H  Integration Status', 'EXACT value: Active | Partial | MoU Only | Not Live | Pending', 'Active'],
    ['I  Enrolled Farmers', 'Number of farmers enrolled from this state (if known). Leave blank if unknown.', ''],
    ['J  Remarks', 'Any notes about this state', ''],
    [''],
    ['━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'],
    ['MAPPER_APIS SHEET — COLUMN-BY-COLUMN GUIDE'],
    ['━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'],
    ['Column', 'What to enter', 'Example'],
    ['A  Mapper API ID', 'The exact API identifier', 'i1001:o1001'],
    ['B  Description', 'Plain-English description of what this API returns', 'Farmer Data by Farmer ID'],
    ['C  States Done (count)', 'Number of states where this API is fully integrated/live', '18'],
    ['D  Remarks', 'Any notes', ''],
    [''],
    ['━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'],
    ['ALLOWED VALUES (copy-paste exactly — spelling matters)'],
    ['━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'],
    ['Status (USE_CASES col C):', 'Live   |   In Progress   |   Complete   |   On Hold   |   Pending'],
    ['Category (USE_CASES col D):', 'Central   |   State   |   Multi   |   Private'],
    ['MoU / DCS / FR (STATES):', 'Yes   |   No'],
    ['Integration Status (STATES):', 'Active   |   Partial   |   MoU Only   |   Not Live   |   Pending'],
    ['Region (STATES):', 'North   |   South   |   East   |   West   |   North-East   |   Central   |   Island'],
    [''],
    ['━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'],
    ['IMPORTANT RULES'],
    ['━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'],
    ['1. Column F (State/UT) is ONLY for Category=State use cases. ONE state name only.'],
    ['2. Column G (States Implemented In) is ONLY for Category=Central or Multi. List ALL states, comma-separated.'],
    ['3. For Category=Private, columns F and G should both be left blank.'],
    ['4. Do NOT delete existing rows. Add new ones at the bottom.'],
    ['5. Do NOT rename column headers.'],
    ['6. Save the file as AgriStack_Data_Template.xlsx (exact filename).'],
    ['7. After filling, run:  node scripts/excel-to-data.js'],
  ]
  const ws = makeSheet(rows)
  setColWidths(ws, [38, 72, 40])
  return ws
}

// ─── Sheet 2 : USE_CASES ──────────────────────────────────────────────────────
function buildUseCases() {
  //
  // COLUMN LAYOUT (12 columns):
  // A: ID
  // B: Use Case Name
  // C: Status
  // D: Category
  // E: Department / Implementing Agency
  // F: State / UT  ← NEW (State category ONLY — ONE state)
  // G: States Implemented In  (Central/Multi ONLY — comma-separated)
  // H: Mapper API ID
  // I: Go-Live Date
  // J: Portal / URL
  // K: Scheme / Programme
  // L: Remarks / Notes
  //
  const H = [
    'ID',
    'Use Case Name',
    'Status\n(Live / In Progress / Complete / On Hold / Pending)',
    'Category\n(Central / State / Multi / Private)',
    'Department / Implementing Agency',
    'State / UT\n(Fill ONLY if Category = State — ONE state name)',
    'States Implemented In\n(Fill ONLY if Category = Central or Multi — comma-separated list)',
    'Mapper API ID\n(leave blank if none)',
    'Go-Live Date\n(month & year, for Live status)',
    'Portal / URL\n(official link, optional)',
    'Scheme / Programme\n(parent scheme name)',
    'Remarks / Notes',
  ]

  // Pre-filled rows — Col F (State/UT) filled for State category
  //                 — Col G (States Implemented In) BLANK — to be filled by user from records
  const data = [
    H,
    //  ID   Name                                              Status         Cat        Dept            F-State/UT        G-StatesImpl    H-Mapper             I-GoLive   J-URL   K-Scheme    L-Remarks
    [1,  'PM Kisan',                                          'Live',        'Central', 'DoA',          '',               '',             'i1:o2',             '',        '',     'PM-KISAN',  ''],
    [2,  'Krishi Mapper',                                     'Live',        'Central', 'DoA',          '',               '',             'i1004:o1007',        '',        '',     '',          ''],
    [3,  'MIDH - Suraksha Portal',                            'Live',        'Central', 'Horticulture', '',               '',             'i1002:o1004',        '',        '',     'MIDH',      ''],
    [4,  'KDSS (Krishi Decision Support System)',             'Live',        'Central', 'DoA',          '',               '',             'i6:o2',              '',        '',     '',          ''],
    [5,  'UPAg',                                              'Live',        'Central', 'DoA',          '',               '',             '',                   '',        '',     '',          ''],
    [6,  'DGCES',                                             'Live',        'Central', 'DoA',          '',               '',             'i5:o6',              '',        '',     '',          ''],
    [7,  'NCCF - Agribid',                                    'Live',        'Central', 'NCCF',         '',               '',             '',                   '',        '',     '',          ''],
    [8,  'NAFED PSS',                                         'Live',        'Central', 'NAFED',        '',               '',             'i1:o1 & i5:o3',      '',        '',     '',          ''],
    [9,  'Krishika App',                                      'Live',        'Central', 'DoA',          '',               '',             '',                   '',        '',     '',          ''],
    [10, 'NABKISAN Hackathon',                                'Live',        'Central', 'NABARD',       '',               '',             '',                   '',        '',     'NABARD',    ''],
    [11, 'PMFBY',                                             'Live',        'Central', 'DoA',          '',               '',             '',                   '',        '',     'PMFBY',     ''],
    [12, 'SHC (Soil Health Card)',                            'Live',        'Central', 'DoA',          '',               '',             'i2:o14',             '',        '',     'SHC',       ''],
    [13, 'MH Panchnama',                                      'Live',        'State',   'Maharashtra',  'Maharashtra',    '',             '',                   '',        '',     '',          ''],
    [14, 'Maha DBT MH',                                       'Live',        'State',   'Maharashtra',  'Maharashtra',    '',             'i4:o4 & i4:o7',      '',        '',     '',          ''],
    [15, 'JanSamarth (MH)',                                   'Live',        'State',   'Maharashtra',  'Maharashtra',    '',             'i4:o4v1',            '',        '',     'JanSamarth',''],
    [16, 'MSP Odisha',                                        'Live',        'State',   'Odisha',       'Odisha',         '',             'i1:o1 & i5:o3',      '',        '',     'MSP',       ''],
    [17, 'MSP MH',                                            'Live',        'State',   'Maharashtra',  'Maharashtra',    '',             '',                   '',        '',     'MSP',       ''],
    [18, 'MSP MP',                                            'Live',        'State',   'Madhya Pradesh','Madhya Pradesh','',            '',                   '',        '',     'MSP',       ''],
    [19, 'FFS MH',                                            'Live',        'State',   'Maharashtra',  'Maharashtra',    '',             '',                   '',        '',     '',          ''],
    [20, 'Family ID - UP',                                    'Live',        'State',   'Uttar Pradesh','Uttar Pradesh',  '',             'i12:o20',            '',        '',     '',          ''],
    [21, 'APAIMS',                                            'Live',        'State',   'Andhra Pradesh','Andhra Pradesh','',            '',                   '',        '',     '',          ''],
    [22, 'MP e-Fertilizer',                                   'Live',        'State',   'Madhya Pradesh','Madhya Pradesh','',            '',                   '',        '',     '',          ''],
    [23, 'MSP CG',                                            'Live',        'State',   'Chhattisgarh', 'Chhattisgarh',  '',             '',                   '',        '',     'MSP',       ''],
    [24, 'MSP UP',                                            'Live',        'State',   'Uttar Pradesh','Uttar Pradesh',  '',             '',                   '',        '',     'MSP',       ''],
    [25, 'Kuruvai - TN',                                      'Live',        'State',   'Tamil Nadu',   'Tamil Nadu',     '',             'i1002:o1004',        '',        '',     '',          ''],
    [26, 'MSP GJ',                                            'Live',        'State',   'Gujarat',      'Gujarat',        '',             '',                   '',        '',     'MSP',       ''],
    [27, 'SATHI',                                             'Live',        'State',   'Uttar Pradesh','Uttar Pradesh',  '',             '',                   '',        '',     '',          ''],
    [28, 'NDKSP MH / PoCRA DBT',                             'Live',        'State',   'Maharashtra',  'Maharashtra',    '',             '',                   '',        '',     'PoCRA',     ''],
    [29, 'CM Kisan - OD',                                     'Live',        'State',   'Odisha',       'Odisha',         '',             '',                   '',        '',     '',          ''],
    [30, 'iKhedut',                                           'In Progress', 'State',   'Gujarat',      'Gujarat',        '',             '',                   '',        '',     '',          ''],
    [31, 'Unnoti Portal',                                     'In Progress', 'State',   'Tripura',      'Tripura',        '',             '',                   '',        '',     '',          ''],
    [32, 'iFMS',                                              'In Progress', 'State',   'Madhya Pradesh','Madhya Pradesh','',            '',                   '',        '',     '',          ''],
    [33, 'PMFBY (UP)',                                        'In Progress', 'State',   'Uttar Pradesh','Uttar Pradesh',  '',             '',                   '',        '',     'PMFBY',     ''],
    [34, 'Common Farmer Registration Portal (CFRP)',          'In Progress', 'Central', 'DoA',          '',               '',             '',                   '',        '',     'CFRP',      ''],
    [35, 'MSP RJ',                                            'In Progress', 'State',   'Rajasthan',    'Rajasthan',      '',             '',                   '',        '',     'MSP',       ''],
    [36, 'JanSamarth (Other States: TG, AP, OD)',            'In Progress', 'State',   'Multi-State',  '',               '',             'i4:o4v1',            '',        '',     'JanSamarth','Covers TG, AP, OD'],
    [37, 'Jute Corporation of India (JCI)',                   'In Progress', 'Central', 'JCI',          '',               '',             '',                   '',        '',     '',          ''],
    [38, 'Kathir - KL',                                       'In Progress', 'State',   'Kerala',       'Kerala',         '',             '',                   '',        '',     '',          ''],
    [39, 'Soyabean Exporters MP (EUDR)',                      'In Progress', 'State',   'Madhya Pradesh','Madhya Pradesh','',            'i16:o21',            '',        '',     'EUDR',      ''],
    [40, 'MP Kisan',                                          'In Progress', 'State',   'Madhya Pradesh','Madhya Pradesh','',            '',                   '',        '',     '',          ''],
    [41, 'NFDP',                                              'In Progress', 'Central', 'Fisheries',    '',               '',             'i4:o4',              '',        '',     'NFDP',      ''],
    [42, 'Madhu Kranti - Beekeeper',                         'In Progress', 'Central', 'DoA',          '',               '',             '',                   '',        '',     '',          ''],
    [43, 'MIMIS (Micro-irrigation MIS)',                      'In Progress', 'State',   'Tamil Nadu',   'Tamil Nadu',     '',             'i1002:o1004',        '',        '',     '',          ''],
    [44, 'NDKSP (MH, CG, MP)',                               'In Progress', 'State',   'Multi-State',  '',               '',             '',                   '',        '',     '',          'Covers MH, CG, MP'],
    [45, 'CCI - MH',                                         'In Progress', 'State',   'Maharashtra',  'Maharashtra',    '',             '',                   '',        '',     'CCI',       ''],
    [46, 'ePACS',                                             'In Progress', 'Multi',   'Multi-State',  '',               '',             'i1002:o1001 i15:o19 i1004:o1006V2','','','ePACS',  ''],
    [47, 'Integration with PACS',                             'In Progress', 'Central', 'DoA',          '',               '',             '',                   '',        '',     'PACS',      ''],
    [48, 'Integration with AHD',                              'In Progress', 'Central', 'DoA',          '',               '',             '',                   '',        '',     'AHD',       ''],
    [49, 'PM ASHA',                                           'On Hold',     'Central', 'DoA',          '',               '',             '',                   '',        '',     'PM ASHA',   ''],
    [50, 'Pulses Mission',                                    'On Hold',     'Central', 'DoA',          '',               '',             '',                   '',        '',     '',          ''],
    [51, 'e-KCC (Kisan Credit Card)',                        'On Hold',     'State',   'Uttar Pradesh','Uttar Pradesh',  '',             '',                   '',        '',     'KCC',       ''],
    [52, 'NABKISAN (NABARD)',                                  'On Hold',     'Central', 'NABARD',       '',               '',             '',                   '',        '',     'NABARD',    ''],
    [53, 'CFRP',                                              'Complete',    'Central', 'DoA',          '',               '',             '',                   '',        '',     'CFRP',      ''],
    [54, 'Crop SAP - MH',                                     'Complete',    'State',   'Maharashtra',  'Maharashtra',    '',             '',                   '',        '',     '',          ''],
    [55, 'Agri Mechanisation - MP',                           'Complete',    'State',   'Madhya Pradesh','Madhya Pradesh','',            '',                   '',        '',     '',          ''],
    [56, 'e-Uparjan / Bhavantar - MP',                       'Complete',    'State',   'Madhya Pradesh','Madhya Pradesh','',            '',                   '',        '',     '',          ''],
    [57, 'Darshan Portal - UP',                               'Complete',    'State',   'Uttar Pradesh','Uttar Pradesh',  '',             '',                   '',        '',     '',          ''],
    [58, 'Wadhwani Foundation',                               'Complete',    'Private', 'Wadhwani',     '',               '',             '',                   '',        '',     '',          ''],
    [59, 'NCCF Radiant',                                      'Complete',    'Central', 'NCCF',         '',               '',             '',                   '',        '',     '',          ''],
    [60, 'UP e-Ganna',                                        'Complete',    'State',   'Uttar Pradesh','Uttar Pradesh',  '',             '',                   '',        '',     '',          ''],
    [61, 'Arya.AG',                                           'Complete',    'Private', 'Arya.AG',      '',               '',             '',                   '',        '',     '',          ''],
    [62, 'Jai Kisan',                                         'Complete',    'Private', 'Jai Kisan',    '',               '',             '',                   '',        '',     '',          ''],
    [63, 'APEDA',                                             'Complete',    'Central', 'APEDA',        '',               '',             '',                   '',        '',     '',          ''],
    [64, 'Dehaat',                                            'Complete',    'Private', 'Dehaat',       '',               '',             '',                   '',        '',     '',          ''],
    [65, 'NCCF NeML',                                         'Complete',    'Central', 'NCCF',         '',               '',             '',                   '',        '',     '',          ''],
    [66, 'Crop Identification',                               'Complete',    'Central', 'DoA',          '',               '',             '',                   '',        '',     '',          ''],
    [67, 'Oil Seeds',                                         'Complete',    'Central', 'DoA',          '',               '',             '',                   '',        '',     '',          ''],
    [68, 'NABARD',                                            'Pending',     'Central', 'NABARD',       '',               '',             '',                   '',        '',     '',          ''],
    [69, 'Bharat Vistaar',                                    'Pending',     'Central', 'DoA',          '',               '',             '',                   '',        '',     '',          ''],
    [70, 'NAFED UP (NeML)',                                   'Pending',     'Central', 'NAFED',        '',               '',             '',                   '',        '',     '',          ''],
    [71, 'KHC (Kisan Helpline Center)',                      'Pending',     'Central', 'DoA',          '',               '',             '',                   '',        '',     '',          ''],
    [72, 'Crop Diversification',                              'Pending',     'Central', 'DoA',          '',               '',             '',                   '',        '',     '',          ''],
    [73, 'Animal Husbandry / Fodder Crops',                  'Pending',     'Central', 'AHD',          '',               '',             '',                   '',        '',     '',          ''],
    [74, 'NPSS',                                              'Pending',     'Central', 'DoA',          '',               '',             '',                   '',        '',     '',          ''],
    [75, 'Bihar DBT',                                         'Pending',     'State',   'Bihar',        'Bihar',          '',             '',                   '',        '',     '',          ''],
    [76, 'MH Data Exchange',                                  'Pending',     'State',   'Maharashtra',  'Maharashtra',    '',             '',                   '',        '',     '',          ''],
    [77, 'KRP (Kisan Rin Portal)',                            'Pending',     'Central', 'DoA',          '',               '',             '',                   '',        '',     '',          ''],
    [78, 'MSP RJ (Rajasthan)',                                'Pending',     'State',   'Rajasthan',    'Rajasthan',      '',             '',                   '',        '',     'MSP',       ''],
    // ← ADD NEW USE CASES BELOW — continue ID from 79
  ]

  const ws = makeSheet(data)
  setColWidths(ws, [
    4,   // A: ID
    42,  // B: Name
    14,  // C: Status
    10,  // D: Category
    24,  // E: Dept
    22,  // F: State/UT (State only)
    55,  // G: States Implemented In (Central/Multi)
    28,  // H: Mapper
    16,  // I: Go-Live Date
    32,  // J: URL
    22,  // K: Scheme
    30,  // L: Remarks
  ])
  // Freeze header row
  ws['!freeze'] = { xSplit: 0, ySplit: 1 }
  return ws
}

// ─── Sheet 3 : STATES ─────────────────────────────────────────────────────────
function buildStates() {
  const H = [
    'State / UT Name',
    'Region\n(North/South/East/West/North-East/Central/Island)',
    'MoU Signed\n(Yes/No)',
    'DCS Done\n(Yes/No)',
    'FR Done\n(Yes/No)',
    'Total Mapper APIs',
    'APIs Integrated\n(Done count)',
    'Integration Status\n(Active/Partial/MoU Only/Not Live/Pending)',
    'Enrolled Farmers\n(number, if known)',
    'Remarks',
  ]

  const rows = [
    H,
    ['Gujarat',           'West',      'Yes','Yes','Yes', 24, 20, 'Active',   '', ''],
    ['Uttar Pradesh',     'North',     'Yes','Yes','Yes', 24, 22, 'Active',   '', ''],
    ['Maharashtra',       'West',      'Yes','Yes','Yes', 24, 18, 'Active',   '', ''],
    ['Madhya Pradesh',    'Central',   'Yes','Yes','Yes', 24, 16, 'Active',   '', ''],
    ['Odisha',            'East',      'Yes','Yes','Yes', 24, 17, 'Active',   '', ''],
    ['Andhra Pradesh',    'South',     'Yes','Yes','Yes', 24, 14, 'Active',   '', ''],
    ['Chhattisgarh',      'Central',   'Yes','Yes','Yes', 24, 16, 'Active',   '', ''],
    ['Tamil Nadu',        'South',     'Yes','Yes','Yes', 24, 14, 'Active',   '', ''],
    ['Rajasthan',         'North',     'Yes','Yes','Yes', 24, 13, 'Active',   '', ''],
    ['Assam',             'North-East','Yes','Yes','Yes', 24, 14, 'Active',   '', ''],
    ['Telangana',         'South',     'Yes','Yes','Yes', 24, 12, 'Active',   '', ''],
    ['Punjab',            'North',     'Yes','Yes','Yes', 24, 11, 'Active',   '', ''],
    ['Bihar',             'East',      'Yes','Yes','Yes', 24,  9, 'Active',   '', ''],
    ['Kerala',            'South',     'Yes','Yes','Yes', 24,  8, 'Active',   '', ''],
    ['Karnataka',         'South',     'Yes','Yes','Yes', 24,  6, 'Partial',  '', ''],
    ['Himachal Pradesh',  'North',     'Yes','Yes','Yes', 24,  6, 'Partial',  '', ''],
    ['Haryana',           'North',     'Yes','Yes','Yes', 24,  5, 'Partial',  '', ''],
    ['Tripura',           'North-East','Yes','No', 'Yes', 24,  5, 'Partial',  '', ''],
    ['Uttarakhand',       'North',     'Yes','Yes','Yes', 24,  3, 'Partial',  '', ''],
    ['Jharkhand',         'East',      'Yes','Yes','No',  24,  1, 'Not Live', '', ''],
    ['Manipur',           'North-East','Yes','No', 'No',  24,  4, 'Partial',  '', ''],
    ['Jammu & Kashmir',   'North',     'Yes','Yes','No',  24,  0, 'MoU Only', '', ''],
    ['Puducherry',        'South',     'Yes','No', 'No',  24,  0, 'MoU Only', '', ''],
    ['Goa',               'West',      'No', 'Yes','No',  24,  0, 'MoU Only', '', ''],
    ['Mizoram',           'North-East','Yes','Yes','No',  24,  0, 'MoU Only', '', ''],
    ['Arunachal Pradesh', 'North-East','Yes','No', 'No',  24,  0, 'Pending',  '', ''],
    ['Meghalaya',         'North-East','No', 'No', 'No',  24,  0, 'Pending',  '', ''],
    ['West Bengal',       'East',      'No', 'No', 'No',  24,  0, 'Pending',  '', ''],
    // ← ADD NEW STATES BELOW
  ]

  const ws = makeSheet(rows)
  setColWidths(ws, [22, 14, 14, 12, 12, 18, 20, 22, 18, 30])
  ws['!freeze'] = { xSplit: 0, ySplit: 1 }
  return ws
}

// ─── Sheet 4 : MAPPER_APIS ────────────────────────────────────────────────────
function buildMappers() {
  const H = [
    'Mapper API ID',
    'Description (what data this API provides)',
    'States Done\n(count of states with this API integrated)',
    'Remarks',
  ]
  const rows = [
    H,
    ['i1001:o1001', 'Farmer Data by Farmer ID',                            18, ''],
    ['i1001:o1002', 'Land Data by Farmer ID',                              18, ''],
    ['i1001:o1004', 'Farmer + Land Data by Farmer ID',                     19, ''],
    ['i1002:o1001', 'Farmer Data by Aadhaar',                              18, ''],
    ['i1002:o1004', 'Farmer + Land Data by Aadhaar',                       18, ''],
    ['i1003:o1002', 'Land by Village LGD + Survey No.',                    11, ''],
    ['i1004:o1003', 'Crop Data by Farmer ID, Year, Season',                 2, ''],
    ['i1004:o1006', 'Land + Crop Survey Data by Farmer ID',                 1, ''],
    ['i1004:o1007', 'Farmer + Land + Crop by Farmer ID',                   11, ''],
    ['i1005:o1003', 'Crop by Village LGD + Survey, Year, Season',           7, ''],
    ['i1005:o1006', 'Land + Crop by Village LGD + Survey',                  3, ''],
    ['i4:o4',       'Farmer ID by Encrypted Aadhaar',                      14, ''],
    ['i6:o2',       'Anonymised Crop Sown at Village Level',                 5, ''],
    ['i2:o14',      'Soil Health Data by Farmer ID',                       11, ''],
    ['i12:o20',     'Total Land Area by Farmer ID',                        15, ''],
    ['i16:o21',     'Farmer & Land Details for Scheme Eligibility',         6, ''],
    // ← ADD NEW MAPPER APIs BELOW
  ]
  const ws = makeSheet(rows)
  setColWidths(ws, [16, 50, 20, 30])
  ws['!freeze'] = { xSplit: 0, ySplit: 1 }
  return ws
}

// ─── Sheet 5 : CONFIG ─────────────────────────────────────────────────────────
function buildConfig() {
  const rows = [
    ['Field', 'Value', 'Notes / Instructions'],
    ['Enrolled Farmer IDs',               '99875423',     'Total farmer IDs enrolled on AgriStack. Verify and update.'],
    ['Enrolled Farmers Last Updated',     '23 June 2026', 'Date when the enrolled farmer count was last checked. Format: DD Month YYYY'],
    ['Data Last Updated',                 '',             'Date this Excel was last verified by team. Format: DD Month YYYY (e.g. 24 June 2026)'],
    ['Total States in Programme',         '28',           'Number of states/UTs in the AgriStack programme.'],
    ['Total Mapper API Types',            '16',           'Total number of distinct mapper API types tracked.'],
    ['Total Use Cases',                   '78',           'Update if use cases are added or removed.'],
    ['Dashboard Title',                   'AgriStack Use Case Command Centre', 'Appears in the browser tab.'],
    ['Dashboard Subtitle',                'Digital Agriculture Mission — Use Case Command Centre', 'Appears in the hero banner.'],
    ['Ministry Name',                     'Ministry of Agriculture & Farmers Welfare, Government of India', ''],
    ['Programme Name',                    'AgriStack', ''],
    ['Programme Officer / POC',           '', 'Name of the nodal officer or point of contact.'],
    ['Data Verified By',                  '', 'Name of person who verified this data before import.'],
    ['Data Verification Date',            '', 'Date of verification. Format: DD Month YYYY'],
    ['API Base URL (future)',             '', 'When a real API is ready, enter the base URL here. e.g. https://api.agristack.gov.in'],
  ]
  const ws = makeSheet(rows)
  setColWidths(ws, [30, 55, 60])
  ws['!freeze'] = { xSplit: 0, ySplit: 1 }
  return ws
}

// ─── Write workbook ───────────────────────────────────────────────────────────
const wb = XLSX.utils.book_new()
XLSX.utils.book_append_sheet(wb, buildInstructions(), 'INSTRUCTIONS')
XLSX.utils.book_append_sheet(wb, buildUseCases(),     'USE_CASES')
XLSX.utils.book_append_sheet(wb, buildStates(),       'STATES')
XLSX.utils.book_append_sheet(wb, buildMappers(),      'MAPPER_APIS')
XLSX.utils.book_append_sheet(wb, buildConfig(),       'CONFIG')

const outPath = path.join(__dirname, 'AgriStack_Data_Template.xlsx')
XLSX.writeFile(wb, outPath)

console.log('✅  Template (v2) created: ' + outPath)
console.log('')
console.log('What changed in v2:')
console.log('  • USE_CASES now has a dedicated "State / UT" column (col F) for State-category UCs')
console.log('  • USE_CASES "States Implemented In" (col G) is now clearly for Central/Multi only')
console.log('  • Added: Go-Live Date, Portal/URL, Scheme/Programme, Remarks columns')
console.log('  • STATES now has Region column (North/South/East/etc.)')
console.log('  • STATES now has Enrolled Farmers column')
console.log('  • CONFIG now has Programme Officer, Data Verified By, API Base URL fields')
console.log('  • INSTRUCTIONS sheet fully rewritten with column-by-column guide')
