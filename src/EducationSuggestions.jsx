// EducationSuggestions.jsx — qualification picker for the CoreTech Talents resume builder
// <EducationInput /> is a drop-in replacement for the "Course / trade" <input>.
// Same value / onChange / id / placeholder props. Candidates can still type anything.
// Plain inline styles (no Tailwind), blue-and-white theme.

import { useMemo, useState } from "react";

// ---------- Qualification categories ----------
// keys: extra words a candidate might type to reach this category (lowercase, no spaces)
export const EDUCATION_CATEGORIES = [
  {
    id: "school", label: "School",
    keys: ["school", "10th", "12th", "sslc", "hsc", "plus2", "puc", "cbse", "icse", "matric", "nios", "openschool", "primary"],
    items: [
      "10th / SSLC", "12th / HSC – Science (Maths)", "12th / HSC – Science (Biology)", "12th / HSC – Commerce",
      "12th / HSC – Arts / Humanities", "12th / HSC – Vocational", "8th Standard", "CBSE 10th", "CBSE 12th", "ICSE / ISC",
      "NIOS 10th (Open School)", "NIOS 12th (Open School)", "5th Standard / Primary School", "Below 10th / Middle School",
    ],
  },
  {
    id: "iti", label: "ITI (NCVT / SCVT)",
    keys: ["iti", "ncvt", "scvt", "trade", "itc"],
    items: [
      "ITI – Machinist", "ITI – Machinist Grinder", "ITI – Turner", "ITI – Fitter", "ITI – Welder (Gas & Electric)",
      "ITI – Electrician", "ITI – Wireman", "ITI – Electronics Mechanic", "ITI – Instrument Mechanic",
      "ITI – Tool & Die Maker (Dies & Moulds)", "ITI – Tool & Die Maker (Press Tools, Jigs & Fixtures)",
      "ITI – Mechanic Machine Tool Maintenance (MMTM)", "ITI – Draughtsman (Mechanical)", "ITI – Draughtsman (Civil)",
      "ITI – Mechanic Motor Vehicle (MMV)", "ITI – Mechanic Diesel", "ITI – Refrigeration & AC Technician",
      "ITI – Sheet Metal Worker", "ITI – Foundryman", "ITI – Painter (General)", "ITI – Plumber", "ITI – Carpenter",
      "ITI – Mechanic Mechatronics", "ITI – CNC Programmer cum Operator", "ITI – Computer Operator & Programming Assistant (COPA)",
      "ITI – Stenographer", "ITI – Fashion Design & Technology",
    ],
  },
  {
    id: "apprentice", label: "Apprenticeship certificate",
    keys: ["apprentice", "apprenticeship", "nac", "naps", "neem", "boat", "bopt"],
    items: [
      "National Apprenticeship Certificate (NAC)", "NAPS Apprenticeship Certificate", "NEEM Apprenticeship Certificate",
      "Graduate Apprenticeship (BOAT / BOPT)", "Technician (Diploma) Apprenticeship (BOAT / BOPT)",
    ],
  },
  {
    id: "diploma", label: "Diploma (Polytechnic)",
    keys: ["diploma", "polytechnic", "dme", "dee", "deee", "dece", "poly"],
    items: [
      "Diploma in Mechanical Engineering (DME)", "Diploma in Tool & Die Making", "Diploma in Mechatronics",
      "Diploma in Production Engineering", "Diploma in Automobile Engineering", "Diploma in Manufacturing Engineering",
      "Diploma in Mechanical Engineering (Sandwich)", "Diploma in Electrical & Electronics Engineering (EEE)",
      "Diploma in Electronics & Communication Engineering (ECE)", "Diploma in Instrumentation & Control Engineering",
      "Diploma in Computer Engineering", "Diploma in Information Technology", "Diploma in Civil Engineering",
      "Diploma in Chemical Engineering", "Diploma in Metallurgical Engineering", "Diploma in Aeronautical Engineering",
      "Diploma in Plastic Technology (CIPET)", "Diploma in Textile Technology", "Diploma in Printing Technology",
      "Diploma in Marine Engineering", "Diploma in Architecture", "Diploma in Commercial Practice",
      "Diploma in Hotel Management & Catering", "Diploma in Fashion Technology",
      "Diploma in Biomedical Engineering", "Diploma in Electronics & Telecommunication", "Diploma in Computer Science & Engineering", "Diploma in Refrigeration & Air Conditioning", "Diploma in Fire & Safety Engineering", "Diploma in Mining Engineering", "Diploma in Leather Technology", "Diploma in Ceramic Technology", "Diploma in Petrochemical Engineering", "Diploma in Agricultural Engineering", "Diploma in Robotics & Automation", "Diploma in Modern Office Practice",
    ],
  },
  {
    id: "beug", label: "Engineering – UG (B.E. / B.Tech)",
    keys: ["be", "btech", "bachelorofengineering", "bacheloroftechnology", "engineering", "engineer", "ug"],
    items: [
      "B.E. Mechanical Engineering", "B.E. Production Engineering", "B.E. Manufacturing Engineering", "B.E. Automobile Engineering",
      "B.E. Aeronautical Engineering", "B.E. Aerospace Engineering", "B.E. Mechatronics", "B.E. Industrial Engineering",
      "B.E. Robotics & Automation", "B.E. Metallurgical Engineering", "B.E. Materials Science & Engineering",
      "B.E. Electrical & Electronics Engineering (EEE)", "B.E. Electronics & Communication Engineering (ECE)",
      "B.E. Electronics & Instrumentation Engineering (EIE)", "B.E. Instrumentation & Control Engineering",
      "B.E. Computer Science & Engineering (CSE)", "B.E. Civil Engineering", "B.E. Marine Engineering",
      "B.E. Mining Engineering", "B.E. Agricultural Engineering", "B.E. Safety & Fire Engineering",
      "B.Tech Mechanical Engineering", "B.Tech Information Technology (IT)", "B.Tech Artificial Intelligence & Data Science",
      "B.Tech Computer Science & Business Systems", "B.Tech Cyber Security", "B.Tech Chemical Engineering",
      "B.Tech Biotechnology", "B.Tech Textile Technology", "B.Tech Petroleum Engineering", "B.Tech Food Technology",
      "B.Tech Plastic / Polymer Technology", "B.E. / B.Tech (Part-time)", "AMIE (Section A & B)",
      "B.E. Biomedical Engineering", "B.E. Medical Electronics", "B.E. Electronics & Telecommunication Engineering", "B.E. Computer & Communication Engineering", "B.E. Information Science & Engineering", "B.E. Artificial Intelligence & Machine Learning", "B.E. CSE (Internet of Things)", "B.E. CSE (Cyber Security)", "B.E. Mechanical & Automation Engineering", "B.E. Environmental Engineering", "B.E. Geo-informatics", "B.E. Naval Architecture", "B.Tech Pharmaceutical Technology", "B.Tech Industrial Biotechnology", "B.Tech Printing & Packaging Technology", "B.Tech Leather Technology", "B.Tech Ceramic Technology", "B.Tech Rubber & Plastics Technology", "B.Tech Fashion Technology", "B.Tech Dairy Technology", "B.Tech Electrical Engineering", "B.Tech Electronics & Communication Engineering", "B.Tech Civil Engineering", "B.Tech Aerospace Engineering", "B.Tech Computer Science & Engineering",
    ],
  },
  {
    id: "mepg", label: "Engineering – PG (M.E. / M.Tech)",
    keys: ["me", "mtech", "masterofengineering", "masteroftechnology", "pg", "postgraduate"],
    items: [
      "M.E. Manufacturing Engineering", "M.E. CAD / CAM", "M.E. Production Engineering", "M.E. Industrial Engineering",
      "M.E. Engineering Design", "M.E. Machine Design", "M.E. Thermal Engineering", "M.E. Mechatronics",
      "M.E. Industrial Safety Engineering", "M.E. Quality & Reliability Engineering", "M.E. Aeronautical Engineering",
      "M.E. Power Electronics & Drives", "M.E. Embedded Systems", "M.E. VLSI Design", "M.E. Structural Engineering",
      "M.E. Computer Science & Engineering", "M.Tech Mechanical Engineering", "M.Tech Materials Engineering",
      "M.Tech Information Technology", "M.Tech Data Science", "M.Tech Biotechnology", "M.Tech Automotive Engineering",
      "M.E. Power Systems Engineering", "M.E. Communication Systems", "M.E. Software Engineering", "M.E. Environmental Engineering", "M.E. Construction Engineering & Management", "M.E. Geotechnical Engineering", "M.E. Automobile Engineering", "M.E. Energy Engineering", "M.E. Biomedical Engineering", "M.E. Product Design & Development", "M.E. Additive Manufacturing", "M.E. Control & Instrumentation", "M.Tech Artificial Intelligence & Machine Learning", "M.Tech Cyber Security", "M.Tech Cloud Computing", "M.Tech Nanotechnology", "M.Tech Chemical Engineering", "M.Tech Pharmaceutical Technology", "M.S. (Engineering, abroad)", "M.S. by Research (IIT / NIT)",
    ],
  },
  {
    id: "scienceug", label: "Science – UG (B.Sc)",
    keys: ["bsc", "science", "bachelorofscience"],
    items: [
      "B.Sc Physics", "B.Sc Chemistry", "B.Sc Mathematics", "B.Sc Statistics", "B.Sc Computer Science", "B.Sc Information Technology",
      "B.Sc Electronics", "B.Sc Biotechnology", "B.Sc Microbiology", "B.Sc Biochemistry", "B.Sc Zoology", "B.Sc Botany",
      "B.Sc Environmental Science", "B.Sc Geology", "B.Sc Nutrition & Dietetics", "B.Sc Psychology", "B.Sc Visual Communication",
      "B.Sc Fashion Design", "B.Sc Interior Design", "B.Sc Forensic Science", "B.Sc Data Science", "B.Sc Artificial Intelligence",
      "B.Sc Food Science & Technology", "B.Sc Food Technology", "B.Sc Home Science", "B.Sc Costume Design & Fashion", "B.Sc Apparel & Fashion Design", "B.Sc Multimedia / Animation & VFX", "B.Sc Industrial Chemistry", "B.Sc Plant Biology & Biotechnology", "B.Sc Genetics", "B.Sc Bioinformatics", "B.Sc Clinical Nutrition", "B.Sc Geography", "B.Sc Actuarial Science", "B.Sc Cyber Security", "B.Sc Aviation", "B.Sc Hospital Administration", "B.Sc Physics with Computer Applications", "B.Sc Mathematics with Computer Applications", "B.Sc Chemistry (Pharmaceutical)", "B.Sc Nautical Science", "B.Sc Integrated (5-year M.Sc)",
    ],
  },
  {
    id: "sciencepg", label: "Science – PG (M.Sc)",
    keys: ["msc", "science", "masterofscience"],
    items: [
      "M.Sc Physics", "M.Sc Chemistry", "M.Sc Applied Chemistry", "M.Sc Mathematics", "M.Sc Statistics", "M.Sc Computer Science",
      "M.Sc Information Technology", "M.Sc Software Systems", "M.Sc Data Science", "M.Sc Electronics", "M.Sc Material Science",
      "M.Sc Biotechnology", "M.Sc Microbiology", "M.Sc Biochemistry", "M.Sc Zoology", "M.Sc Botany", "M.Sc Environmental Science",
      "M.Sc Psychology", "M.Sc Food Science & Nutrition", "M.Sc Geology", "M.Sc Applied Psychology",
      "M.Sc Analytical Chemistry", "M.Sc Organic Chemistry", "M.Sc Pharmaceutical Chemistry", "M.Sc Industrial Chemistry", "M.Sc Clinical Research", "M.Sc Medical Physics", "M.Sc Bioinformatics", "M.Sc Genetics", "M.Sc Actuarial Science", "M.Sc Cyber Forensics", "M.Sc Home Science", "M.Sc Artificial Intelligence", "M.Sc Clinical Nutrition & Dietetics", "M.Sc Fashion Design", "M.Sc Visual Communication", "M.Sc Hotel Management",
    ],
  },
  {
    id: "arts", label: "Arts & Humanities",
    keys: ["arts", "ba", "ma", "humanities", "bachelorofarts", "masterofarts", "msw", "bsw", "bfa", "mfa", "bmm", "bjmc", "mjmc", "journalism", "masscommunication", "library", "pmir"],
    items: [
      "B.A. English", "B.A. Tamil", "B.A. Hindi", "B.A. Kannada", "B.A. Telugu", "B.A. Malayalam", "B.A. History", "B.A. Economics",
      "B.A. Political Science", "B.A. Public Administration", "B.A. Sociology", "B.A. Psychology", "B.A. Geography",
      "B.A. Journalism & Mass Communication", "B.A. Defence & Strategic Studies", "B.A. Tourism & Travel Management",
      "Bachelor of Fine Arts (BFA)", "Bachelor of Social Work (BSW)", "M.A. English", "M.A. Tamil", "M.A. Hindi", "M.A. History",
      "M.A. Economics", "M.A. Political Science", "M.A. Public Administration", "M.A. Sociology", "M.A. Psychology",
      "M.A. Human Resource Management", "M.A. Journalism & Mass Communication", "Master of Social Work (MSW)",
      "MSW – Human Resource Management", "Master of Fine Arts (MFA)",
      "B.A. Sanskrit", "B.A. Urdu", "B.A. French", "B.A. Philosophy", "B.A. Anthropology", "B.A. Criminology", "B.A. Music", "B.A. Bharatanatyam / Dance", "B.A. Home Science", "B.A. Corporate Economics", "B.A. Functional English", "B.A. Visual Communication", "Bachelor of Mass Media (BMM)", "BJMC (Journalism & Mass Communication)", "Bachelor of Library & Information Science (BLISc)", "M.A. Personnel Management & Industrial Relations (PM&IR)", "M.A. Mass Communication", "M.A. Philosophy", "M.A. Criminology", "M.A. Applied Economics", "M.A. Development Studies", "M.A. Education", "Master of Library & Information Science (MLISc)", "MJMC (Journalism & Mass Communication)",
    ],
  },
  {
    id: "commerce", label: "Commerce",
    keys: ["commerce", "bcom", "mcom", "accounting"],
    items: [
      "B.Com (General)", "B.Com Computer Applications", "B.Com Accounting & Finance", "B.Com Corporate Secretaryship",
      "B.Com Banking & Insurance", "B.Com Professional Accounting", "B.Com Information Systems Management", "B.Com Honours",
      "M.Com (General)", "M.Com Computer Applications", "M.Com Finance & Control", "M.Com Accounting & Finance",
      "B.Com Logistics", "B.Com Marketing Management", "B.Com E-Commerce", "B.Com Business Analytics", "B.Com Taxation", "B.Com Foreign Trade", "B.Com Bank Management", "B.Com Financial Markets", "B.Com Retail Management", "M.Com Banking & Insurance", "M.Com Business Analytics", "M.Com International Business",
    ],
  },
  {
    id: "management", label: "Management (BBA / MBA)",
    keys: ["management", "bba", "bbm", "mba", "pgdm", "pgdba", "pgdhrm", "business", "bms", "pgdbm"],
    items: [
      "BBA", "BBM", "BBA Logistics & Supply Chain", "BBA Aviation", "MBA Human Resource Management", "MBA Finance",
      "MBA Marketing", "MBA Operations Management", "MBA Logistics & Supply Chain Management", "MBA Business Analytics",
      "MBA International Business", "MBA Production / Manufacturing Management", "MBA Hospital Management",
      "MBA Systems / IT", "MBA (Dual Specialisation)", "Executive MBA", "PGDM", "PG Diploma in Human Resource Management (PGDHRM)",
      "PG Diploma in Personnel Management & Industrial Relations (PGDPM&IR)", "PG Diploma in Business Administration (PGDBA)",
      "MBA Healthcare / Hospital Management", "MBA Pharmaceutical Management", "MBA Retail Management", "MBA Agri-Business Management", "MBA Rural Management", "MBA Digital Marketing", "MBA Fintech", "MBA Tourism & Hospitality", "MBA Aviation Management", "MBA Project Management", "MBA Energy Management", "MBA Entrepreneurship", "MBA Shipping & Port Management", "BBA Retail Management", "BBA Digital Marketing", "BBA Business Analytics", "BBA Hospital Management", "BBA Computer Applications", "Bachelor of Management Studies (BMS)", "PG Diploma in Marketing Management", "PG Diploma in Business Analytics", "PG Diploma in Hospital Administration",
    ],
  },
  {
    id: "computer", label: "Computer Applications",
    keys: ["bca", "mca", "computer", "dca", "pgdca", "computerapplications", "ccc", "olevel", "nielit", "bvoc", "typewriting", "dtp"],
    items: [
      "BCA", "MCA", "Diploma in Computer Applications (DCA)", "PG Diploma in Computer Applications (PGDCA)",
      "Certificate in Tally / Accounting Software", "Certificate in MS Office",
      "BCA Data Science", "BCA Cloud Computing", "BCA Cyber Security", "BCA Artificial Intelligence", "MCA Artificial Intelligence", "MCA Data Science", "B.Voc Software Development", "NIELIT CCC", "NIELIT O Level", "NIELIT A Level", "Diploma in Hardware & Networking", "Certificate in DTP (Desktop Publishing)", "Certificate in Typewriting (English / Tamil)", "Full Stack Development Course", "Data Science / Analytics Course",
    ],
  },
  {
    id: "professional", label: "Professional (CA / CMA / CS)",
    keys: ["ca", "cma", "cs", "icwa", "acca", "cfa", "cpa", "professional", "charteredaccountant"],
    items: [
      "Chartered Accountant (CA)", "CA Intermediate", "CA Foundation", "Cost & Management Accountant (CMA)", "CMA Intermediate",
      "Company Secretary (CS)", "CS Executive", "ACCA", "CFA", "US CMA", "CPA",
      "Certified Internal Auditor (CIA)", "Enrolled Agent (EA)", "CS Professional", "CMA Foundation", "Actuary (IAI)",
    ],
  },
  {
    id: "law", label: "Law",
    keys: ["law", "llb", "llm", "legal", "dll", "labourlaw"],
    items: [
      "LLB (3 years)", "B.A. LLB (5 years)", "BBA LLB", "B.Com LLB", "LLM", "LLM Labour Law",
      "Diploma in Labour Law & Administrative Law (DLL & AL)", "PG Diploma in Labour Law",
      "LLM Corporate Law", "LLM Intellectual Property Law", "LLM Criminal Law", "PG Diploma in Cyber Law", "Diploma in Taxation Law (DTL)", "PG Diploma in Business Law", "PG Diploma in Human Rights",
    ],
  },
  {
    id: "nursing", label: "Nursing & Paramedical",
    keys: ["nursing", "nurse", "gnm", "anm", "paramedical", "mlt", "dmlt", "physiotherapy", "bpt", "radiology", "optometry"],
    items: [
      "B.Sc Nursing", "Post Basic B.Sc Nursing", "M.Sc Nursing", "GNM (General Nursing & Midwifery)", "ANM (Auxiliary Nurse Midwife)",
      "Diploma in Medical Laboratory Technology (DMLT)", "B.Sc Medical Laboratory Technology (MLT)", "B.Sc Radiology & Imaging Technology",
      "B.Sc Cardiac Technology", "B.Sc Operation Theatre Technology", "B.Sc Optometry", "B.Sc Dialysis Technology",
      "Bachelor of Physiotherapy (BPT)", "Master of Physiotherapy (MPT)", "Bachelor of Occupational Therapy (BOT)",
      "Diploma in Nursing Assistant", "Certificate in First Aid / Occupational Health",
      "Diploma in Multipurpose Health Worker (MPHW)", "Certified Nursing Assistant", "Nurse Practitioner in Midwifery", "M.Sc Nursing (Critical Care)", "B.Sc Anaesthesia Technology", "B.Sc Respiratory Therapy", "B.Sc Perfusion Technology", "B.Sc Emergency Medical Technology", "B.Sc Medical Record Science", "Bachelor of Audiology & Speech-Language Pathology (BASLP)", "B.Sc Physician Assistant", "Diploma in Radiology Technology", "Diploma in Operation Theatre Technology", "Diploma in Dialysis Technology", "Diploma in Physiotherapy", "Diploma in ECG Technology", "Diploma in Optometry", "Bachelor of Medical Laboratory Technology (BMLT)", "Master of Medical Laboratory Technology (MMLT)",
    ],
  },
  {
    id: "medical", label: "Medical & Pharmacy",
    keys: ["mbbs", "medical", "doctor", "bds", "bams", "bhms", "bsms", "bums", "bnys", "md", "ms", "dnb"],
    items: [
      "MBBS", "MD", "MS (Medicine)", "DNB", "Diploma in Industrial Health (AFIH)", "BDS", "MDS", "BAMS (Ayurveda)", "BHMS (Homoeopathy)",
      "BSMS (Siddha)", "BUMS (Unani)", "BNYS (Naturopathy & Yoga)",
      "DM (Super Speciality)", "M.Ch (Super Speciality)", "FNB (Fellowship)", "Master of Public Health (MPH)", "Bachelor of Hospital Administration (BHA)", "Master of Hospital Administration (MHA)", "Diploma in Industrial Health (DIH)",
    ],
  },
  {
    id: "pharmacy", label: "Pharmacy",
    keys: ["pharmacy", "pharm", "bpharm", "mpharm", "dpharm", "pharmd", "pharmaceutics", "pharmacology", "clinicalresearch", "regulatoryaffairs", "pharmacovigilance"],
    items: [
      "D.Pharm",
      "B.Pharm",
      "B.Pharm (Lateral Entry)",
      "M.Pharm Pharmaceutics",
      "M.Pharm Pharmacology",
      "M.Pharm Pharmaceutical Analysis",
      "M.Pharm Quality Assurance",
      "M.Pharm Regulatory Affairs",
      "M.Pharm Pharmaceutical Chemistry",
      "M.Pharm Pharmacognosy",
      "M.Pharm Industrial Pharmacy",
      "M.Pharm Pharmacy Practice",
      "Pharm.D",
      "Pharm.D (Post Baccalaureate)",
      "PG Diploma in Clinical Research",
      "PG Diploma in Pharmacovigilance",
      "Diploma in Regulatory Affairs",
      "PG Diploma in Pharmaceutical Quality Assurance",
      "Certificate in Medical Coding (CPC)",
      "Ph.D in Pharmaceutical Sciences",
    ],
  },
  {
    id: "design", label: "Architecture & Design",
    keys: ["architecture", "barch", "march", "design", "bdes", "mdes", "nift", "bva", "mva", "animation", "vfx", "graphicdesign", "uiux", "fashion"],
    items: [
      "B.Arch", "M.Arch", "B.Des Product / Industrial Design", "B.Des Fashion Design", "B.Des Communication Design",
      "M.Des", "B.Des Interior Design", "Diploma in Interior Design",
      "B.Des UI / UX Design", "B.Des Textile Design", "B.Des Jewellery Design", "B.Des Animation & Game Design", "Bachelor of Visual Arts (BVA)", "Master of Visual Arts (MVA)", "Diploma in Graphic Design", "Diploma in Animation & VFX", "Diploma in Fashion Design", "Diploma in Jewellery Design", "Diploma in UI / UX Design", "NIFT – B.Des / M.Des / B.FTech",
    ],
  },
  {
    id: "education", label: "Education (Teaching)",
    keys: ["bed", "med", "teaching", "teacher", "deled", "dted", "bped", "mped", "ntt", "montessori", "ctet", "tet", "net", "set", "ugcnet"],
    items: [
      "B.Ed", "M.Ed", "D.El.Ed / D.T.Ed", "B.P.Ed (Physical Education)", "M.P.Ed", "M.Phil Education",
      "B.Ed Special Education", "Nursery Teacher Training (NTT)", "Montessori Teacher Training", "CTET Qualified", "TNTET / State TET Qualified", "UGC NET / SET Qualified", "Diploma in Early Childhood Education",
    ],
  },
  {
    id: "agri", label: "Agriculture, Veterinary & Fisheries",
    keys: ["agriculture", "agri", "horticulture", "bvsc", "veterinary", "fisheries", "bfsc", "forestry"],
    items: [
      "B.Sc Agriculture", "B.Tech Agricultural Engineering", "B.Sc Horticulture", "B.Sc Forestry", "B.V.Sc & A.H. (Veterinary)",
      "B.F.Sc (Fisheries)", "M.Sc Agriculture", "Diploma in Agriculture",
      "B.Sc Sericulture", "B.Tech Dairy Technology (Agri)", "B.Tech Food Technology (Agri)", "M.V.Sc", "Diploma in Horticulture", "Diploma in Dairy Technology", "M.Sc Horticulture",
    ],
  },
  {
    id: "hotel", label: "Hotel Management & Aviation",
    keys: ["hotel", "hotelmanagement", "bhm", "catering", "hospitality", "aviation", "airline", "travel", "cabincrew", "airhostess", "pilot", "cpl", "tourism", "bttm", "bakery", "chef"],
    items: [
      "Bachelor of Hotel Management (BHM)", "B.Sc Hotel & Hospitality Administration", "B.Sc Catering Science & Hotel Management",
      "Diploma in Food Production", "Diploma in Airline & Airport Management", "Aircraft Maintenance Engineering (AME)",
      "B.Sc Airline & Airport Management", "Bachelor of Tourism & Travel Management (BTTM)", "Master of Tourism & Travel Management (MTTM)", "Diploma in Cabin Crew / Air Hostess Training", "Diploma in Aviation Hospitality", "Diploma in Bakery & Confectionery", "Craft Course in Food Production", "Diploma in Front Office Operations", "Commercial Pilot Licence (CPL)", "B.Sc Aeronautical Science",
    ],
  },
  {
    id: "facility", label: "Facility Management & Fire Safety",
    keys: ["facility", "facilitymanagement", "housekeeping", "fire", "firesafety", "firemans", "security", "safety", "hvac", "psara"],
    items: [
      "Diploma in Fire & Industrial Safety",
      "Diploma in Fire Safety Management",
      "Advanced Diploma in Fire & Safety Engineering",
      "B.Sc Fire & Industrial Safety",
      "B.Sc Safety & Fire Engineering",
      "Diploma in Facility Management",
      "PG Diploma in Facility Management",
      "Certificate in Housekeeping Operations",
      "Diploma in Housekeeping",
      "Private Security Guard Training (PSARA)",
      "Certificate in HVAC Technician",
      "Diploma in Building Maintenance",
      "Certificate in Plumbing",
      "PG Diploma in Environment Management",
      "Certificate in First Aid & CPR",
    ],
  },
  {
    id: "licences", label: "Licences & Competency Certificates",
    keys: ["licence", "license", "competency", "wireman", "boiler", "boilerattendant", "boe", "drivinglicence", "lmv", "hmv", "forklift", "crane", "ibr", "asme"],
    items: [
      "Wireman Competency Certificate",
      "Wireman Helper Competency Certificate",
      "Electrical Supervisor Competency Certificate",
      "Electrical Contractor Licence",
      "First Class Boiler Attendant Certificate",
      "Second Class Boiler Attendant Certificate",
      "Boiler Operation Engineer (BOE) Certificate",
      "IBR Welder Certificate",
      "Welder Qualification (ASME Section IX)",
      "LMV Driving Licence",
      "HMV Driving Licence (Transport)",
      "Forklift Operator Certificate",
      "Crane / Rigger Operator Certificate",
      "Registered Pharmacist (State Pharmacy Council)",
      "Registered Nurse (State Nursing Council)",
      "Hazardous Goods Transport Certificate",
    ],
  },
  {
    id: "skill", label: "Skill India / Vocational",
    keys: ["skill", "skillindia", "pmkvy", "nsdc", "tnsdc", "naanmudhalvan", "ddugky", "vocational", "bvoc", "shortterm"],
    items: [
      "PMKVY Skill Certificate",
      "NSDC / Sector Skill Council Certificate",
      "TNSDC Skill Certificate",
      "Naan Mudhalvan Course Certificate",
      "DDU-GKY Training Certificate",
      "B.Voc (Bachelor of Vocation)",
      "M.Voc (Master of Vocation)",
      "Diploma in Vocational Education",
      "Certificate in Tailoring & Garment Making",
      "Certificate in Beautician Course",
      "Certificate in Two-Wheeler Mechanic",
      "Certificate in Mobile Phone Repairing",
      "Certificate in Electrical House Wiring",
      "Certificate in CNC Operation (MSME Tool Room)",
    ],
  },
  {
    id: "research", label: "Research (M.Phil / Ph.D)",
    keys: ["phd", "doctorate", "mphil", "research", "doctoral"],
    items: [
      "Ph.D in Mechanical Engineering", "Ph.D in Manufacturing / Production Engineering", "Ph.D in Metallurgy / Materials Science",
      "Ph.D in Electrical / Electronics Engineering", "Ph.D in Computer Science", "Ph.D in Physics", "Ph.D in Chemistry",
      "Ph.D in Mathematics", "Ph.D in Management", "Ph.D in Human Resource Management", "Ph.D in Commerce", "Ph.D in Economics",
      "Ph.D in English", "Ph.D in Tamil", "Ph.D in Psychology", "Ph.D in Nursing", "Ph.D in Pharmacy", "M.Phil",
    ],
  },
  {
    id: "itcerts", label: "IT Certifications",
    keys: ["aws", "azure", "gcp", "ccna", "comptia", "ceh", "istqb", "pmp", "csm", "itil", "salesforce", "rhcsa", "cka", "oracle", "microsoft", "google"],
    items: [
      "AWS Certified Cloud Practitioner",
      "AWS Certified Solutions Architect – Associate",
      "AWS Certified Developer – Associate",
      "Microsoft Azure Fundamentals (AZ-900)",
      "Microsoft Azure Administrator (AZ-104)",
      "Google Cloud Associate Cloud Engineer",
      "Cisco CCNA",
      "CompTIA A+",
      "CompTIA Security+",
      "Certified Ethical Hacker (CEH)",
      "ISTQB Foundation Level",
      "Oracle Certified Professional – Java",
      "Microsoft Power BI Data Analyst (PL-300)",
      "Salesforce Certified Administrator",
      "Red Hat Certified System Administrator (RHCSA)",
      "Certified Kubernetes Administrator (CKA)",
      "ITIL 4 Foundation",
      "PMP (Project Management Professional)",
      "Certified ScrumMaster (CSM)",
      "Google Data Analytics Certificate",
      "SAP Certified Associate",
    ],
  },
  {
    id: "bankcerts", label: "Banking, Finance & Insurance Certifications",
    keys: ["jaiib", "caiib", "nism", "irdai", "cfp", "frm", "amfi", "banking", "insurance"],
    items: [
      "JAIIB",
      "CAIIB",
      "NISM Series V-A (Mutual Fund Distributor)",
      "NISM Series VIII (Equity Derivatives)",
      "IRDAI Insurance Agent / POSP Licence",
      "Certified Financial Planner (CFP)",
      "Financial Risk Manager (FRM)",
      "Diploma in Banking & Finance",
      "PG Diploma in Banking & Finance",
      "Certificate in AML & KYC",
    ],
  },
  {
    id: "distance", label: "Distance / Open University",
    keys: ["distance", "correspondence", "ignou", "tnou", "openuniversity", "onlinedegree"],
    items: [
      "B.A. (Distance – IGNOU / TNOU)",
      "B.Com (Distance)",
      "B.Sc (Distance)",
      "BBA (Distance)",
      "BCA (Distance)",
      "M.A. (Distance)",
      "M.Com (Distance)",
      "MBA (Distance / Online)",
      "MCA (Distance / Online)",
      "Online Degree (UGC-approved)",
    ],
  },
  {
    id: "certs", label: "Certifications & PG Diplomas",
    keys: ["certificate", "certification", "certified", "course", "nebosh", "adis", "sixsigma", "greenbelt", "blackbelt", "cipet", "nttf", "cadcam", "safety"],
    items: [
      "Advanced Diploma in Industrial Safety (ADIS)", "PG Diploma in Industrial Safety", "NEBOSH IGC", "IOSH Managing Safely",
      "Six Sigma Green Belt", "Six Sigma Black Belt", "IATF 16949 Internal Auditor", "AS9100 Internal Auditor", "ISO 9001 Lead Auditor",
      "NDT Level II (ASNT / NAS 410)", "CNC Programming Certificate", "CAD / CAM Certificate (AutoCAD / SolidWorks / NX)",
      "CIPET Certificate Course", "NTTF Diploma / Certificate", "PG Diploma in Tool Design (CITD / NTTF)",
      "PG Diploma in Logistics & Supply Chain", "PG Diploma in Quality Management", "SAP Certification (MM / PP / FICO / HCM)",
      "Certificate in GST / Taxation", "Certificate in Tally Prime",
    ],
  },
];

// ---------- Matching helpers ----------
const squash = (s) => String(s || "").toLowerCase().replace(/[^a-z0-9]/g, "");
const words = (s) => String(s || "").toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);

const ALL = [];
const ITEM_CAT = {};
EDUCATION_CATEGORIES.forEach((c) => c.items.forEach((it) => {
  if (!ITEM_CAT[it]) { ITEM_CAT[it] = c.label; ALL.push(it); }
}));

const POPULAR = [
  "10th / SSLC", "12th / HSC – Science (Maths)", "ITI – Machinist", "ITI – Fitter", "Diploma in Mechanical Engineering (DME)",
  "B.E. Mechanical Engineering", "B.E. Computer Science & Engineering (CSE)", "B.Tech Information Technology (IT)", "BCA",
  "B.Sc Computer Science", "B.Pharm", "B.Sc Nursing", "B.Com (General)", "B.A. English", "BBA",
  "MBA Human Resource Management", "MCA", "M.E. Manufacturing Engineering", "M.Pharm Quality Assurance", "Ph.D in Mechanical Engineering",
];

// Short forms candidates type -> words used in the list
const SYNONYMS = {
  hr: ["humanresource", "personnel"], it: ["informationtechnology"], cse: ["computerscience"], cs: ["computerscience"],
  mech: ["mechanical"], eee: ["electricalelectronics"], ece: ["electronicscommunication"], eie: ["electronicsinstrumentation"],
  ai: ["artificialintelligence"], ds: ["datascience"], ir: ["industrialrelations"], scm: ["supplychain"], ops: ["operations"],
};

// Categories whose keys match what was typed (short keys need a whole word)
function matchCategories(value) {
  const q = squash(value);
  const w = words(value);
  if (!q) return [];
  return EDUCATION_CATEGORIES.filter((c) =>
    squash(c.label).startsWith(q) ||
    c.keys.some((k) => (k.length <= 3 ? w.includes(k) : q === k || q.includes(k) || (q.length >= 4 && k.startsWith(q))))
  );
}

export function getEducationSuggestions(value, limit = 40) {
  const q = squash(value);
  if (!q) return POPULAR;
  const out = new Set();
  // qualifications that start with what was typed ("be" -> B.E. ..., "bsc" -> B.Sc ...)
  ALL.filter((t) => squash(t).startsWith(q)).forEach((t) => out.add(t));
  // qualifications that contain what was typed ("mechanical", "nursing", "hr")
  if (q.length >= 3) ALL.filter((t) => squash(t).includes(q)).forEach((t) => out.add(t));
  // every word typed appears in the qualification ("mba hr", "diploma mech")
  const w = words(value);
  const hasWord = (st, x) => st.includes(x) || (SYNONYMS[x] || []).some((y) => st.includes(y));
  if (w.length > 1 || SYNONYMS[q]) ALL.filter((t) => { const st = squash(t); return w.length === 1 ? hasWord(st, w[0]) : st.startsWith(w[0]) && w.slice(1).every((x) => hasWord(st, x)); }).forEach((t) => out.add(t));
  // whole categories that match ("arts", "science", "phd", "iti")
  matchCategories(value).forEach((c) => c.items.forEach((t) => out.add(t)));
  return [...out].filter((t) => squash(t) !== q).slice(0, limit);
}

// ---------- Styles ----------
const C = { navy: "#0b2a5b", blue: "#1d5fd1", pale: "#eaf2ff", line: "#d6e2f3", muted: "#5b6b82" };
const s = {
  wrap: { position: "relative" },
  list: { position: "absolute", top: "100%", left: 0, right: 0, zIndex: 30, marginTop: 4, background: "#fff", border: `1px solid ${C.line}`, borderRadius: 8, boxShadow: "0 8px 20px rgba(11,42,91,0.12)", maxHeight: 320, overflowY: "auto", padding: 4 },
  listHead: { padding: "8px 10px 4px", fontSize: 11.5, fontWeight: 600, color: C.muted },
  cats: { display: "flex", flexWrap: "wrap", gap: 6, padding: "4px 8px 8px", borderBottom: `1px solid ${C.line}` },
  cat: (on) => ({ border: `1px solid ${on ? C.blue : C.line}`, background: on ? C.blue : "#fff", color: on ? "#fff" : C.navy, borderRadius: 999, padding: "4px 10px", fontSize: 12, cursor: "pointer" }),
  opt: (active) => ({ display: "flex", justifyContent: "space-between", gap: 10, padding: "8px 10px", borderRadius: 6, cursor: "pointer", fontSize: 13.5, color: C.navy, background: active ? C.pale : "transparent" }),
  optCat: { fontSize: 11.5, color: C.muted, whiteSpace: "nowrap" },
  empty: { padding: "8px 10px", fontSize: 12.5, color: C.muted },
};

// ---------- Qualification input with categorised dropdown ----------
export function EducationInput({ value = "", onChange, placeholder = "e.g. ITI Machinist, DME, B.E. Mechanical, B.Sc, MBA", list, ...rest }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [cat, setCat] = useState(null); // category chosen from the chips

  const typed = String(value).trim();
  const options = useMemo(() => {
    if (!typed && cat) return EDUCATION_CATEGORIES.find((c) => c.id === cat)?.items || [];
    return getEducationSuggestions(value);
  }, [value, typed, cat]);

  const pick = (t) => {
    if (onChange) onChange({ target: { value: t, name: rest.name } });
    setOpen(false);
    setActive(-1);
    setCat(null);
  };

  const onKeyDown = (e) => {
    if (!open || !options.length) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => (a + 1) % options.length); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => (a <= 0 ? options.length - 1 : a - 1)); }
    else if (e.key === "Enter" && active >= 0) { e.preventDefault(); pick(options[active]); }
    else if (e.key === "Escape") setOpen(false);
  };

  return (
    <div style={s.wrap}>
      <input
        {...rest}
        value={value}
        placeholder={placeholder}
        autoComplete="off"
        onChange={(e) => { if (onChange) onChange(e); setOpen(true); setActive(-1); }}
        onFocus={(e) => { setOpen(true); if (rest.onFocus) rest.onFocus(e); }}
        onBlur={(e) => { setTimeout(() => setOpen(false), 150); if (rest.onBlur) rest.onBlur(e); }}
        onKeyDown={onKeyDown}
        role="combobox"
        aria-expanded={open}
        aria-autocomplete="list"
      />
      {open && (
        <div style={s.list} role="listbox">
          {!typed && (
            <>
              <div style={s.listHead}>Browse by category</div>
              <div style={s.cats}>
                {EDUCATION_CATEGORIES.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    style={s.cat(cat === c.id)}
                    onMouseDown={(e) => { e.preventDefault(); setCat(cat === c.id ? null : c.id); setActive(-1); }}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
              <div style={s.listHead}>{cat ? EDUCATION_CATEGORIES.find((c) => c.id === cat)?.label : "Popular qualifications"}</div>
            </>
          )}
          {options.length === 0 && (
            <div style={s.empty}>Not in the list? Just type your qualification as it appears on your certificate.</div>
          )}
          {options.map((t, i) => (
            <div
              key={t}
              role="option"
              aria-selected={i === active}
              style={s.opt(i === active)}
              onMouseDown={(e) => { e.preventDefault(); pick(t); }}
              onMouseEnter={() => setActive(i)}
            >
              <span>{t}</span>
              {typed && ITEM_CAT[t] && <span style={s.optCat}>{ITEM_CAT[t]}</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EducationInput;