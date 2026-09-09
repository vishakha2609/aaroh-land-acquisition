export const INITIAL_PROJECTS = [
  {
    id: "LA-1001",
    name: "Pune Ring Road Expansion Phase 1",
    district: "Pune",
    state: "Maharashtra",
    type: "Highway",
    landArea: 450,
    affectedFamilies: 320,
    landowners: 410,
    compensationCompletion: 34,
    compensationStatus: "In Progress",
    legalDispute: true,
    courtCases: 3,
    ownershipConflict: true,
    notificationStatus: "Completed",
    approvalStatus: "Delayed",
    approvalDelayDays: 42,
    possessionPct: 25,
    possessionStatus: "Pending",
    rehabilitationPct: 15,
    resettlementStatus: "In Progress",
    stakeholderResponse: "Slow",
    currentStatus: "In Progress",
    publicStatus: "In Progress",
    delayProbability: 91,
    predictedDelayDays: 78,
    riskScore: 88,
    riskLevel: "CRITICAL"
  },
  {
    id: "LA-1002",
    name: "Nashik Highway Development Sector B",
    district: "Nashik",
    state: "Maharashtra",
    type: "Highway",
    landArea: 280,
    affectedFamilies: 180,
    landowners: 210,
    compensationCompletion: 52,
    compensationStatus: "In Progress",
    legalDispute: true,
    courtCases: 1,
    ownershipConflict: false,
    notificationStatus: "Completed",
    approvalStatus: "In Progress",
    approvalDelayDays: 15,
    possessionPct: 45,
    possessionStatus: "In Progress",
    rehabilitationPct: 40,
    resettlementStatus: "In Progress",
    stakeholderResponse: "Normal",
    currentStatus: "In Progress",
    publicStatus: "In Progress",
    delayProbability: 78,
    predictedDelayDays: 54,
    riskScore: 72,
    riskLevel: "HIGH"
  },
  {
    id: "LA-1003",
    name: "Nagpur Logistics Corridor Expressway",
    district: "Nagpur",
    state: "Maharashtra",
    type: "Industrial Corridor",
    landArea: 600,
    affectedFamilies: 120,
    landowners: 150,
    compensationCompletion: 100,
    compensationStatus: "Completed",
    legalDispute: false,
    courtCases: 0,
    ownershipConflict: false,
    notificationStatus: "Completed",
    approvalStatus: "Approved",
    approvalDelayDays: 0,
    possessionPct: 100,
    possessionStatus: "Completed",
    rehabilitationPct: 100,
    resettlementStatus: "Completed",
    stakeholderResponse: "Fast",
    currentStatus: "Completed",
    publicStatus: "Completed",
    delayProbability: 12,
    predictedDelayDays: 0,
    riskScore: 15,
    riskLevel: "LOW"
  },
  {
    id: "LA-1004",
    name: "Satara Railway Expansion Line",
    district: "Satara",
    state: "Maharashtra",
    type: "Railway",
    landArea: 190,
    affectedFamilies: 210,
    landowners: 260,
    compensationCompletion: 40,
    compensationStatus: "Partial",
    legalDispute: false,
    courtCases: 0,
    ownershipConflict: true,
    notificationStatus: "Completed",
    approvalStatus: "Delayed",
    approvalDelayDays: 30,
    possessionPct: 30,
    possessionStatus: "In Progress",
    rehabilitationPct: 20,
    resettlementStatus: "In Progress",
    stakeholderResponse: "Slow",
    currentStatus: "Delayed",
    publicStatus: "Delayed",
    delayProbability: 68,
    predictedDelayDays: 45,
    riskScore: 65,
    riskLevel: "HIGH"
  },
  {
    id: "LA-1005",
    name: "Solapur Solar Power Land Acquisition",
    district: "Solapur",
    state: "Maharashtra",
    type: "Renewable Energy",
    landArea: 800,
    affectedFamilies: 90,
    landowners: 110,
    compensationCompletion: 85,
    compensationStatus: "In Progress",
    legalDispute: false,
    courtCases: 0,
    ownershipConflict: false,
    notificationStatus: "Completed",
    approvalStatus: "Approved",
    approvalDelayDays: 5,
    possessionPct: 80,
    possessionStatus: "In Progress",
    rehabilitationPct: 75,
    resettlementStatus: "In Progress",
    stakeholderResponse: "Normal",
    currentStatus: "In Progress",
    publicStatus: "In Progress",
    delayProbability: 28,
    predictedDelayDays: 10,
    riskScore: 24,
    riskLevel: "LOW"
  }
];

export const MOCK_NOTICES = [
  {
    id: "N-101",
    date: "09 September 2026",
    title: "Land Acquisition Progress Update - Pune & Nashik Sectors",
    category: "Public Information",
    summary: "Updated land acquisition progress reports and award notifications are now accessible for public verification."
  },
  {
    id: "N-102",
    date: "01 September 2026",
    title: "Notice for Hearing of Objections under Section 15",
    category: "Government Notice",
    summary: "Public hearings for objections regarding Nagpur Logistics Corridor have been scheduled at the District Magistrate Office."
  },
  {
    id: "N-103",
    date: "20 August 2026",
    title: "Rehabilitation and Resettlement Award Distribution",
    category: "Announcement",
    summary: "Direct benefit disbursement for affected families in Solapur Solar Park project phase 1 completed successfully."
  }
];

export const MOCK_ALERTS = [
  {
    id: "ALT-1",
    projectId: "LA-1001",
    projectName: "Pune Ring Road Expansion Phase 1",
    level: "CRITICAL",
    probability: "91%",
    predictedDelay: "78 Days",
    primaryFactor: "Legal dispute (3 cases) + Incomplete Compensation (34%)",
    action: "Immediate Legal Intervention & Compensation Escalation Recommended"
  },
  {
    id: "ALT-2",
    projectId: "LA-1002",
    projectName: "Nashik Highway Development Sector B",
    level: "HIGH",
    probability: "78%",
    predictedDelay: "54 Days",
    primaryFactor: "Approval Delay (15 Days) + Compensation Pending (52%)",
    action: "Inter-departmental Coordination Escalation Required"
  },
  {
    id: "ALT-3",
    projectId: "LA-1004",
    projectName: "Satara Railway Expansion Line",
    level: "HIGH",
    probability: "68%",
    predictedDelay: "45 Days",
    primaryFactor: "Slow Stakeholder Response + Low Possession (30%)",
    action: "Schedule District Collector Stakeholder Review"
  }
];

export const DISTRICT_ANALYTICS = [
  { district: "Pune", total: 52, highRisk: 8, avgDelay: 42 },
  { district: "Nashik", total: 37, highRisk: 5, avgDelay: 38 },
  { district: "Nagpur", total: 44, highRisk: 7, avgDelay: 51 },
  { district: "Satara", total: 28, highRisk: 4, avgDelay: 35 },
  { district: "Solapur", total: 31, highRisk: 6, avgDelay: 47 }
];

export const RISK_DISTRIBUTION_DATA = [
  { name: "Low Risk", value: 142, color: "#16a34a" },
  { name: "Medium Risk", value: 69, color: "#eab308" },
  { name: "High Risk", value: 27, color: "#f97316" },
  { name: "Critical Risk", value: 10, color: "#dc2626" }
];

export const DELAY_TREND_DATA = [
  { month: "Apr", avgDelay: 32 },
  { month: "May", avgDelay: 35 },
  { month: "Jun", avgDelay: 41 },
  { month: "Jul", avgDelay: 38 },
  { month: "Aug", avgDelay: 44 },
  { month: "Sep", avgDelay: 46 }
];

// SIMULATED ML API FUNCTION
export function analyzeProject(formData) {
  let riskScore = 20;
  let shapFactors = [];
  let recommendations = [];

  const comp = Number(formData.compensationCompletion) || 0;
  const legal = formData.legalDispute === "true" || formData.legalDispute === true;
  const appDelay = Number(formData.approvalDelayDays) || 0;
  const poss = Number(formData.possessionPct) || 0;
  const response = formData.stakeholderResponse || "Normal";

  if (legal) {
    riskScore += 30;
    shapFactors.push({ feature: "Legal Dispute Active", impact: "+28 Risk", positive: true });
    recommendations.push("Escalate pending court cases to Fast-Track Revenue Tribunal.");
  } else {
    shapFactors.push({ feature: "Clear Legal Status", impact: "-10 Risk", positive: false });
  }

  if (comp < 50) {
    riskScore += 25;
    shapFactors.push({ feature: "Low Compensation Paid (<50%)", impact: "+24 Risk", positive: true });
    recommendations.push("Prioritize direct fund transfer verification for balance claimants.");
  } else {
    shapFactors.push({ feature: "Sufficient Compensation (>50%)", impact: "-12 Risk", positive: false });
  }

  if (appDelay > 20) {
    riskScore += 20;
    shapFactors.push({ feature: "Severe Approval Bottleneck", impact: "+18 Risk", positive: true });
    recommendations.push("Issue Inter-departmental coordination reminder to Nodal Officers.");
  }

  if (poss < 40) {
    riskScore += 15;
    shapFactors.push({ feature: "Lagging Land Possession", impact: "+14 Risk", positive: true });
    recommendations.push("Accelerate physical possession handovers with local revenue officers.");
  }

  if (response === "Slow") {
    riskScore += 10;
    shapFactors.push({ feature: "Slow Stakeholder Response", impact: "+10 Risk", positive: true });
    recommendations.push("Convene mandatory District Land Acquisition Advisory meeting.");
  }

  riskScore = Math.min(Math.max(riskScore, 10), 98);
  const delayProbability = Math.min(Math.round(riskScore * 0.95), 99);
  const predictedDelayDays = Math.round((riskScore / 100) * 90);

  let riskLevel = "LOW";
  if (riskScore > 80) riskLevel = "CRITICAL";
  else if (riskScore > 60) riskLevel = "HIGH";
  else if (riskScore > 30) riskLevel = "MEDIUM";

  if (recommendations.length === 0) {
    recommendations.push("Maintain standard timeline tracking; project parameter thresholds are optimal.");
  }

  return {
    delayProbability,
    delayPrediction: delayProbability > 50,
    predictedDelayDays,
    expectedRange: `${Math.max(0, predictedDelayDays - 10)}–${predictedDelayDays + 15} days`,
    riskScore,
    riskLevel,
    shapFactors,
    recommendations
  };
}