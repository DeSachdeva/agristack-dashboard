# AgriStack Dashboard

Use Case Command Centre for the Digital Agriculture Mission — Ministry of Agriculture & Farmers Welfare, GoI.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **Data**: Static JS data files (to be replaced with DB + API)

## Pages

| Page | Route | Description |
|------|-------|-------------|
| Overview | `/` | KPI cards, status charts, live use cases summary |
| Use Cases | `/usecases` | Full searchable + filterable table of all use cases |
| States | `/states` | State-wise API integration coverage grid |
| API Tracker | `/apis` | Mapper API integration status table |

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev

# 3. Open in browser
http://localhost:3000
```

## Project Structure

```
src/
├── app/
│   ├── layout.js         # Root layout (fonts, metadata)
│   ├── globals.css       # Global styles + Tailwind
│   ├── page.js           # Homepage / Overview
│   ├── usecases/page.js  # Use case register
│   ├── states/page.js    # State coverage
│   └── apis/page.js      # API mapper tracker
├── components/
│   ├── Topbar.js         # Ministry top bar
│   ├── Header.js         # Navigation header
│   └── StatusBadge.js    # Reusable status pill
└── data/
    └── usecases.js       # All use case + state data
```

## Data Source

All data in `src/data/usecases.js` is extracted from:
- `Use_Cases_List.xlsx` — master use case names
- `USE_CASES_TRACKER_ALL_SCHEMES.xlsx` — UC Live / Ongoing / On-Hold sheets
- `All_UseCases_API_status.xlsx` — mapper API integration per state

## Next Steps (Backend)

When ready to move to a real database:

1. Set up PostgreSQL (local or Railway/Supabase)
2. Run migration to create `use_cases` and `states` tables
3. Replace `src/data/usecases.js` with API calls to a Next.js Route Handler
4. Build an Excel upload endpoint (using `xlsx` npm package) for data updates
