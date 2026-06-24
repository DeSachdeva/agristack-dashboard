// ============================================================
// AgriStack Dashboard — LIVE DATA (approved)
// ============================================================
// ✅  APPROVED AND LIVE.
// ============================================================
// Imported:   24/6/2026, 1:22:39 pm
// Source:     scripts/AgriStack_Data_Template.xlsx
// Verified by: (not specified)
// ============================================================

export const DATA_LAST_UPDATED      = "24 June 2026"
export const ENROLLED_FARMER_IDS    = "99875423"
export const FARMER_DATA_UPDATED    = "23 June 2026"
export const IS_STAGING             = false

export const USE_CASES = [
  {
    "id": 1,
    "name": "PM Kisan",
    "status": "Live",
    "category": "Central",
    "dept": "DoA",
    "mapper": "i1:o2",
    "states": [
      "UP",
      "CG",
      "MP",
      "MH",
      "AP",
      "TG",
      "RJ",
      "TN"
    ],
    "scheme": "PM-KISAN"
  },
  {
    "id": 2,
    "name": "Krishi Mapper",
    "status": "Live",
    "category": "Central",
    "dept": "DoA",
    "mapper": "i1004:o1007",
    "states": []
  },
  {
    "id": 3,
    "name": "MIDH - Suraksha Portal",
    "status": "Live",
    "category": "Central",
    "dept": "Horticulture",
    "mapper": "i1002:o1004",
    "states": [],
    "scheme": "MIDH"
  },
  {
    "id": 4,
    "name": "KDSS (Krishi Decision Support System)",
    "status": "Live",
    "category": "Central",
    "dept": "DoA",
    "mapper": "i6:o2",
    "states": []
  },
  {
    "id": 5,
    "name": "UPAg",
    "status": "Live",
    "category": "Central",
    "dept": "DoA",
    "mapper": "",
    "states": []
  },
  {
    "id": 6,
    "name": "DGCES",
    "status": "Live",
    "category": "Central",
    "dept": "DoA",
    "mapper": "i5:o6",
    "states": []
  },
  {
    "id": 7,
    "name": "NCCF - Agribid",
    "status": "Live",
    "category": "Central",
    "dept": "NCCF",
    "mapper": "",
    "states": []
  },
  {
    "id": 8,
    "name": "NAFED PSS",
    "status": "Live",
    "category": "Central",
    "dept": "NAFED",
    "mapper": "i1:o1 & i5:o3",
    "states": []
  },
  {
    "id": 9,
    "name": "Krishika App",
    "status": "Live",
    "category": "Central",
    "dept": "DoA",
    "mapper": "",
    "states": []
  },
  {
    "id": 10,
    "name": "NABKISAN Hackathon",
    "status": "Live",
    "category": "Central",
    "dept": "NABARD",
    "mapper": "",
    "states": [],
    "scheme": "NABARD"
  },
  {
    "id": 11,
    "name": "PMFBY",
    "status": "Live",
    "category": "Central",
    "dept": "DoA",
    "mapper": "",
    "states": [],
    "scheme": "PMFBY"
  },
  {
    "id": 12,
    "name": "SHC (Soil Health Card)",
    "status": "Live",
    "category": "Central",
    "dept": "DoA",
    "mapper": "i2:o14",
    "states": [],
    "scheme": "SHC"
  },
  {
    "id": 13,
    "name": "MH Panchnama",
    "status": "Live",
    "category": "State",
    "dept": "Maharashtra",
    "mapper": "",
    "stateUT": "Maharashtra"
  },
  {
    "id": 14,
    "name": "Maha DBT MH",
    "status": "Live",
    "category": "State",
    "dept": "Maharashtra",
    "mapper": "i4:o4 & i4:o7",
    "stateUT": "Maharashtra"
  },
  {
    "id": 15,
    "name": "JanSamarth (MH)",
    "status": "Live",
    "category": "State",
    "dept": "Maharashtra",
    "mapper": "i4:o4v1",
    "stateUT": "Maharashtra",
    "scheme": "JanSamarth"
  },
  {
    "id": 16,
    "name": "MSP Odisha",
    "status": "Live",
    "category": "State",
    "dept": "Odisha",
    "mapper": "i1:o1 & i5:o3",
    "stateUT": "Odisha",
    "scheme": "MSP"
  },
  {
    "id": 17,
    "name": "MSP MH",
    "status": "Live",
    "category": "State",
    "dept": "Maharashtra",
    "mapper": "",
    "stateUT": "Maharashtra",
    "scheme": "MSP"
  },
  {
    "id": 18,
    "name": "MSP MP",
    "status": "Live",
    "category": "State",
    "dept": "Madhya Pradesh",
    "mapper": "",
    "stateUT": "Madhya Pradesh",
    "scheme": "MSP"
  },
  {
    "id": 19,
    "name": "FFS MH",
    "status": "Live",
    "category": "State",
    "dept": "Maharashtra",
    "mapper": "",
    "stateUT": "Maharashtra"
  },
  {
    "id": 20,
    "name": "Family ID - UP",
    "status": "Live",
    "category": "State",
    "dept": "Uttar Pradesh",
    "mapper": "i12:o20",
    "stateUT": "Uttar Pradesh"
  },
  {
    "id": 21,
    "name": "APAIMS",
    "status": "Live",
    "category": "State",
    "dept": "Andhra Pradesh",
    "mapper": "",
    "stateUT": "Andhra Pradesh"
  },
  {
    "id": 22,
    "name": "MP e-Fertilizer",
    "status": "Live",
    "category": "State",
    "dept": "Madhya Pradesh",
    "mapper": "",
    "stateUT": "Madhya Pradesh"
  },
  {
    "id": 23,
    "name": "MSP CG",
    "status": "Live",
    "category": "State",
    "dept": "Chhattisgarh",
    "mapper": "",
    "stateUT": "Chhattisgarh",
    "scheme": "MSP"
  },
  {
    "id": 24,
    "name": "MSP UP",
    "status": "Live",
    "category": "State",
    "dept": "Uttar Pradesh",
    "mapper": "",
    "stateUT": "Uttar Pradesh",
    "scheme": "MSP"
  },
  {
    "id": 25,
    "name": "Kuruvai - TN",
    "status": "Live",
    "category": "State",
    "dept": "Tamil Nadu",
    "mapper": "i1002:o1004",
    "stateUT": "Tamil Nadu"
  },
  {
    "id": 26,
    "name": "MSP GJ",
    "status": "Live",
    "category": "State",
    "dept": "Gujarat",
    "mapper": "",
    "stateUT": "Gujarat",
    "scheme": "MSP"
  },
  {
    "id": 27,
    "name": "SATHI",
    "status": "Live",
    "category": "State",
    "dept": "Uttar Pradesh",
    "mapper": "",
    "stateUT": "Uttar Pradesh"
  },
  {
    "id": 28,
    "name": "NDKSP MH / PoCRA DBT",
    "status": "Live",
    "category": "State",
    "dept": "Maharashtra",
    "mapper": "",
    "stateUT": "Maharashtra",
    "scheme": "PoCRA"
  },
  {
    "id": 29,
    "name": "CM Kisan - OD",
    "status": "Live",
    "category": "State",
    "dept": "Odisha",
    "mapper": "",
    "stateUT": "Odisha"
  },
  {
    "id": 30,
    "name": "iKhedut",
    "status": "In Progress",
    "category": "State",
    "dept": "Gujarat",
    "mapper": "",
    "stateUT": "Gujarat"
  },
  {
    "id": 31,
    "name": "Unnoti Portal",
    "status": "In Progress",
    "category": "State",
    "dept": "Tripura",
    "mapper": "",
    "stateUT": "Tripura"
  },
  {
    "id": 32,
    "name": "iFMS",
    "status": "In Progress",
    "category": "State",
    "dept": "Madhya Pradesh",
    "mapper": "",
    "stateUT": "Madhya Pradesh"
  },
  {
    "id": 33,
    "name": "PMFBY (UP)",
    "status": "In Progress",
    "category": "State",
    "dept": "Uttar Pradesh",
    "mapper": "",
    "stateUT": "Uttar Pradesh",
    "scheme": "PMFBY"
  },
  {
    "id": 34,
    "name": "Common Farmer Registration Portal (CFRP)",
    "status": "In Progress",
    "category": "Central",
    "dept": "DoA",
    "mapper": "",
    "states": [],
    "scheme": "CFRP"
  },
  {
    "id": 35,
    "name": "MSP RJ",
    "status": "In Progress",
    "category": "State",
    "dept": "Rajasthan",
    "mapper": "",
    "stateUT": "Rajasthan",
    "scheme": "MSP"
  },
  {
    "id": 36,
    "name": "JanSamarth (Other States: TG, AP, OD)",
    "status": "In Progress",
    "category": "State",
    "dept": "Multi-State",
    "mapper": "i4:o4v1",
    "stateUT": "Multi-State",
    "scheme": "JanSamarth",
    "remarks": "Covers TG, AP, OD"
  },
  {
    "id": 37,
    "name": "Jute Corporation of India (JCI)",
    "status": "In Progress",
    "category": "Central",
    "dept": "JCI",
    "mapper": "",
    "states": []
  },
  {
    "id": 38,
    "name": "Kathir - KL",
    "status": "In Progress",
    "category": "State",
    "dept": "Kerala",
    "mapper": "",
    "stateUT": "Kerala"
  },
  {
    "id": 39,
    "name": "Soyabean Exporters MP (EUDR)",
    "status": "In Progress",
    "category": "State",
    "dept": "Madhya Pradesh",
    "mapper": "i16:o21",
    "stateUT": "Madhya Pradesh",
    "scheme": "EUDR"
  },
  {
    "id": 40,
    "name": "MP Kisan",
    "status": "In Progress",
    "category": "State",
    "dept": "Madhya Pradesh",
    "mapper": "",
    "stateUT": "Madhya Pradesh"
  },
  {
    "id": 41,
    "name": "NFDP",
    "status": "In Progress",
    "category": "Central",
    "dept": "Fisheries",
    "mapper": "i4:o4",
    "states": [],
    "scheme": "NFDP"
  },
  {
    "id": 42,
    "name": "Madhu Kranti - Beekeeper",
    "status": "In Progress",
    "category": "Central",
    "dept": "DoA",
    "mapper": "",
    "states": []
  },
  {
    "id": 43,
    "name": "MIMIS (Micro-irrigation MIS)",
    "status": "In Progress",
    "category": "State",
    "dept": "Tamil Nadu",
    "mapper": "i1002:o1004",
    "stateUT": "Tamil Nadu"
  },
  {
    "id": 44,
    "name": "NDKSP (MH, CG, MP)",
    "status": "In Progress",
    "category": "State",
    "dept": "Multi-State",
    "mapper": "",
    "stateUT": "Multi-State",
    "remarks": "Covers MH, CG, MP"
  },
  {
    "id": 45,
    "name": "CCI - MH",
    "status": "In Progress",
    "category": "State",
    "dept": "Maharashtra",
    "mapper": "",
    "stateUT": "Maharashtra",
    "scheme": "CCI"
  },
  {
    "id": 46,
    "name": "ePACS",
    "status": "In Progress",
    "category": "Multi",
    "dept": "Multi-State",
    "mapper": "i1002:o1001 i15:o19 i1004:o1006V2",
    "states": [],
    "scheme": "ePACS"
  },
  {
    "id": 47,
    "name": "Integration with PACS",
    "status": "In Progress",
    "category": "Central",
    "dept": "DoA",
    "mapper": "",
    "states": [],
    "scheme": "PACS"
  },
  {
    "id": 48,
    "name": "Integration with AHD",
    "status": "In Progress",
    "category": "Central",
    "dept": "DoA",
    "mapper": "",
    "states": [],
    "scheme": "AHD"
  },
  {
    "id": 49,
    "name": "PM ASHA",
    "status": "On Hold",
    "category": "Central",
    "dept": "DoA",
    "mapper": "",
    "states": [],
    "scheme": "PM ASHA"
  },
  {
    "id": 50,
    "name": "Pulses Mission",
    "status": "On Hold",
    "category": "Central",
    "dept": "DoA",
    "mapper": "",
    "states": []
  },
  {
    "id": 51,
    "name": "e-KCC (Kisan Credit Card)",
    "status": "On Hold",
    "category": "State",
    "dept": "Uttar Pradesh",
    "mapper": "",
    "stateUT": "Uttar Pradesh",
    "scheme": "KCC"
  },
  {
    "id": 52,
    "name": "NABKISAN (NABARD)",
    "status": "On Hold",
    "category": "Central",
    "dept": "NABARD",
    "mapper": "",
    "states": [],
    "scheme": "NABARD"
  },
  {
    "id": 53,
    "name": "CFRP",
    "status": "Complete",
    "category": "Central",
    "dept": "DoA",
    "mapper": "",
    "states": [],
    "scheme": "CFRP"
  },
  {
    "id": 54,
    "name": "Crop SAP - MH",
    "status": "Complete",
    "category": "State",
    "dept": "Maharashtra",
    "mapper": "",
    "stateUT": "Maharashtra"
  },
  {
    "id": 55,
    "name": "Agri Mechanisation - MP",
    "status": "Complete",
    "category": "State",
    "dept": "Madhya Pradesh",
    "mapper": "",
    "stateUT": "Madhya Pradesh"
  },
  {
    "id": 56,
    "name": "e-Uparjan / Bhavantar - MP",
    "status": "Complete",
    "category": "State",
    "dept": "Madhya Pradesh",
    "mapper": "",
    "stateUT": "Madhya Pradesh"
  },
  {
    "id": 57,
    "name": "Darshan Portal - UP",
    "status": "Complete",
    "category": "State",
    "dept": "Uttar Pradesh",
    "mapper": "",
    "stateUT": "Uttar Pradesh"
  },
  {
    "id": 58,
    "name": "Wadhwani Foundation",
    "status": "Complete",
    "category": "Private",
    "dept": "Wadhwani",
    "mapper": ""
  },
  {
    "id": 59,
    "name": "NCCF Radiant",
    "status": "Complete",
    "category": "Central",
    "dept": "NCCF",
    "mapper": "",
    "states": []
  },
  {
    "id": 60,
    "name": "UP e-Ganna",
    "status": "Complete",
    "category": "State",
    "dept": "Uttar Pradesh",
    "mapper": "",
    "stateUT": "Uttar Pradesh"
  },
  {
    "id": 61,
    "name": "Arya.AG",
    "status": "Complete",
    "category": "Private",
    "dept": "Arya.AG",
    "mapper": ""
  },
  {
    "id": 62,
    "name": "Jai Kisan",
    "status": "Complete",
    "category": "Private",
    "dept": "Jai Kisan",
    "mapper": ""
  },
  {
    "id": 63,
    "name": "APEDA",
    "status": "Complete",
    "category": "Central",
    "dept": "APEDA",
    "mapper": "",
    "states": []
  },
  {
    "id": 64,
    "name": "Dehaat",
    "status": "Complete",
    "category": "Private",
    "dept": "Dehaat",
    "mapper": ""
  },
  {
    "id": 65,
    "name": "NCCF NeML",
    "status": "Complete",
    "category": "Central",
    "dept": "NCCF",
    "mapper": "",
    "states": []
  },
  {
    "id": 66,
    "name": "Crop Identification",
    "status": "Complete",
    "category": "Central",
    "dept": "DoA",
    "mapper": "",
    "states": []
  },
  {
    "id": 67,
    "name": "Oil Seeds",
    "status": "Complete",
    "category": "Central",
    "dept": "DoA",
    "mapper": "",
    "states": []
  },
  {
    "id": 68,
    "name": "NABARD",
    "status": "Pending",
    "category": "Central",
    "dept": "NABARD",
    "mapper": "",
    "states": []
  },
  {
    "id": 69,
    "name": "Bharat Vistaar",
    "status": "Pending",
    "category": "Central",
    "dept": "DoA",
    "mapper": "",
    "states": []
  },
  {
    "id": 70,
    "name": "NAFED UP (NeML)",
    "status": "Pending",
    "category": "Central",
    "dept": "NAFED",
    "mapper": "",
    "states": []
  },
  {
    "id": 71,
    "name": "KHC (Kisan Helpline Center)",
    "status": "Pending",
    "category": "Central",
    "dept": "DoA",
    "mapper": "",
    "states": []
  },
  {
    "id": 72,
    "name": "Crop Diversification",
    "status": "Pending",
    "category": "Central",
    "dept": "DoA",
    "mapper": "",
    "states": []
  },
  {
    "id": 73,
    "name": "Animal Husbandry / Fodder Crops",
    "status": "Pending",
    "category": "Central",
    "dept": "AHD",
    "mapper": "",
    "states": []
  },
  {
    "id": 74,
    "name": "NPSS",
    "status": "Pending",
    "category": "Central",
    "dept": "DoA",
    "mapper": "",
    "states": []
  },
  {
    "id": 75,
    "name": "Bihar DBT",
    "status": "Pending",
    "category": "State",
    "dept": "Bihar",
    "mapper": "",
    "stateUT": "Bihar"
  },
  {
    "id": 76,
    "name": "MH Data Exchange",
    "status": "Pending",
    "category": "State",
    "dept": "Maharashtra",
    "mapper": "",
    "stateUT": "Maharashtra"
  },
  {
    "id": 77,
    "name": "KRP (Kisan Rin Portal)",
    "status": "Pending",
    "category": "Central",
    "dept": "DoA",
    "mapper": "",
    "states": []
  },
  {
    "id": 78,
    "name": "MSP RJ (Rajasthan)",
    "status": "Pending",
    "category": "State",
    "dept": "Rajasthan",
    "mapper": "",
    "stateUT": "Rajasthan",
    "scheme": "MSP"
  }
]

export const STATE_API_DATA = [
  {
    "state": "Gujarat",
    "region": "West",
    "mou": true,
    "dcs": true,
    "fr": true,
    "apisTotal": 24,
    "apisDone": 20,
    "status": "Active"
  },
  {
    "state": "Uttar Pradesh",
    "region": "North",
    "mou": true,
    "dcs": true,
    "fr": true,
    "apisTotal": 24,
    "apisDone": 22,
    "status": "Active"
  },
  {
    "state": "Maharashtra",
    "region": "West",
    "mou": true,
    "dcs": true,
    "fr": true,
    "apisTotal": 24,
    "apisDone": 18,
    "status": "Active"
  },
  {
    "state": "Madhya Pradesh",
    "region": "Central",
    "mou": true,
    "dcs": true,
    "fr": true,
    "apisTotal": 24,
    "apisDone": 16,
    "status": "Active"
  },
  {
    "state": "Odisha",
    "region": "East",
    "mou": true,
    "dcs": true,
    "fr": true,
    "apisTotal": 24,
    "apisDone": 17,
    "status": "Active"
  },
  {
    "state": "Andhra Pradesh",
    "region": "South",
    "mou": true,
    "dcs": true,
    "fr": true,
    "apisTotal": 24,
    "apisDone": 14,
    "status": "Active"
  },
  {
    "state": "Chhattisgarh",
    "region": "Central",
    "mou": true,
    "dcs": true,
    "fr": true,
    "apisTotal": 24,
    "apisDone": 16,
    "status": "Active"
  },
  {
    "state": "Tamil Nadu",
    "region": "South",
    "mou": true,
    "dcs": true,
    "fr": true,
    "apisTotal": 24,
    "apisDone": 14,
    "status": "Active"
  },
  {
    "state": "Rajasthan",
    "region": "North",
    "mou": true,
    "dcs": true,
    "fr": true,
    "apisTotal": 24,
    "apisDone": 13,
    "status": "Active"
  },
  {
    "state": "Assam",
    "region": "North-East",
    "mou": true,
    "dcs": true,
    "fr": true,
    "apisTotal": 24,
    "apisDone": 14,
    "status": "Active"
  },
  {
    "state": "Telangana",
    "region": "South",
    "mou": true,
    "dcs": true,
    "fr": true,
    "apisTotal": 24,
    "apisDone": 12,
    "status": "Active"
  },
  {
    "state": "Punjab",
    "region": "North",
    "mou": true,
    "dcs": true,
    "fr": true,
    "apisTotal": 24,
    "apisDone": 11,
    "status": "Active"
  },
  {
    "state": "Bihar",
    "region": "East",
    "mou": true,
    "dcs": true,
    "fr": true,
    "apisTotal": 24,
    "apisDone": 9,
    "status": "Active"
  },
  {
    "state": "Kerala",
    "region": "South",
    "mou": true,
    "dcs": true,
    "fr": true,
    "apisTotal": 24,
    "apisDone": 8,
    "status": "Active"
  },
  {
    "state": "Karnataka",
    "region": "South",
    "mou": true,
    "dcs": true,
    "fr": true,
    "apisTotal": 24,
    "apisDone": 6,
    "status": "Partial"
  },
  {
    "state": "Himachal Pradesh",
    "region": "North",
    "mou": true,
    "dcs": true,
    "fr": true,
    "apisTotal": 24,
    "apisDone": 6,
    "status": "Partial"
  },
  {
    "state": "Haryana",
    "region": "North",
    "mou": true,
    "dcs": true,
    "fr": true,
    "apisTotal": 24,
    "apisDone": 5,
    "status": "Partial"
  },
  {
    "state": "Tripura",
    "region": "North-East",
    "mou": true,
    "dcs": false,
    "fr": true,
    "apisTotal": 24,
    "apisDone": 5,
    "status": "Partial"
  },
  {
    "state": "Uttarakhand",
    "region": "North",
    "mou": true,
    "dcs": true,
    "fr": true,
    "apisTotal": 24,
    "apisDone": 3,
    "status": "Partial"
  },
  {
    "state": "Jharkhand",
    "region": "East",
    "mou": true,
    "dcs": true,
    "fr": false,
    "apisTotal": 24,
    "apisDone": 1,
    "status": "Not Live"
  },
  {
    "state": "Manipur",
    "region": "North-East",
    "mou": true,
    "dcs": false,
    "fr": false,
    "apisTotal": 24,
    "apisDone": 4,
    "status": "Partial"
  },
  {
    "state": "Jammu & Kashmir",
    "region": "North",
    "mou": true,
    "dcs": true,
    "fr": false,
    "apisTotal": 24,
    "apisDone": 0,
    "status": "MoU Only"
  },
  {
    "state": "Puducherry",
    "region": "South",
    "mou": true,
    "dcs": false,
    "fr": false,
    "apisTotal": 24,
    "apisDone": 0,
    "status": "MoU Only"
  },
  {
    "state": "Goa",
    "region": "West",
    "mou": false,
    "dcs": true,
    "fr": false,
    "apisTotal": 24,
    "apisDone": 0,
    "status": "MoU Only"
  },
  {
    "state": "Mizoram",
    "region": "North-East",
    "mou": true,
    "dcs": true,
    "fr": false,
    "apisTotal": 24,
    "apisDone": 0,
    "status": "MoU Only"
  },
  {
    "state": "Arunachal Pradesh",
    "region": "North-East",
    "mou": true,
    "dcs": false,
    "fr": false,
    "apisTotal": 24,
    "apisDone": 0,
    "status": "Pending"
  },
  {
    "state": "Meghalaya",
    "region": "North-East",
    "mou": false,
    "dcs": false,
    "fr": false,
    "apisTotal": 24,
    "apisDone": 0,
    "status": "Pending"
  },
  {
    "state": "West Bengal",
    "region": "East",
    "mou": false,
    "dcs": false,
    "fr": false,
    "apisTotal": 24,
    "apisDone": 0,
    "status": "Pending"
  }
]

export const MAPPER_APIS = [
  {
    "id": "i1001:o1001",
    "desc": "Farmer Data by Farmer ID"
  },
  {
    "id": "i1001:o1002",
    "desc": "Land Data by Farmer ID"
  },
  {
    "id": "i1001:o1004",
    "desc": "Farmer + Land Data by Farmer ID"
  },
  {
    "id": "i1002:o1001",
    "desc": "Farmer Data by Aadhaar"
  },
  {
    "id": "i1002:o1004",
    "desc": "Farmer + Land Data by Aadhaar"
  },
  {
    "id": "i1003:o1002",
    "desc": "Land by Village LGD + Survey No."
  },
  {
    "id": "i1004:o1003",
    "desc": "Crop Data by Farmer ID, Year, Season"
  },
  {
    "id": "i1004:o1006",
    "desc": "Land + Crop Survey Data by Farmer ID"
  },
  {
    "id": "i1004:o1007",
    "desc": "Farmer + Land + Crop by Farmer ID"
  },
  {
    "id": "i1005:o1003",
    "desc": "Crop by Village LGD + Survey, Year, Season"
  },
  {
    "id": "i1005:o1006",
    "desc": "Land + Crop by Village LGD + Survey"
  },
  {
    "id": "i4:o4",
    "desc": "Farmer ID by Encrypted Aadhaar"
  },
  {
    "id": "i6:o2",
    "desc": "Anonymised Crop Sown at Village Level"
  },
  {
    "id": "i2:o14",
    "desc": "Soil Health Data by Farmer ID"
  },
  {
    "id": "i12:o20",
    "desc": "Total Land Area by Farmer ID"
  },
  {
    "id": "i16:o21",
    "desc": "Farmer & Land Details for Scheme Eligibility"
  }
]

export const MAPPER_DONE_COUNTS = {
  "i1001:o1001": 18,
  "i1001:o1002": 18,
  "i1001:o1004": 19,
  "i1002:o1001": 18,
  "i1002:o1004": 18,
  "i1003:o1002": 11,
  "i1004:o1003": 2,
  "i1004:o1006": 1,
  "i1004:o1007": 11,
  "i1005:o1003": 7,
  "i1005:o1006": 3,
  "i4:o4": 14,
  "i6:o2": 5,
  "i2:o14": 11,
  "i12:o20": 15,
  "i16:o21": 6
}

export const STATUS_COLORS = {
  "Live":        { bg: "bg-green-100",  text: "text-green-800",  dot: "bg-green-500"  },
  "In Progress": { bg: "bg-blue-100",   text: "text-blue-800",   dot: "bg-blue-500"   },
  "Complete":    { bg: "bg-purple-100", text: "text-purple-800", dot: "bg-purple-500" },
  "On Hold":     { bg: "bg-amber-100",  text: "text-amber-800",  dot: "bg-amber-400"  },
  "Pending":     { bg: "bg-gray-100",   text: "text-gray-600",   dot: "bg-gray-400"   },
}
