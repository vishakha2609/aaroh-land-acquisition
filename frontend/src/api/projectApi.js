const API_URL = "http://localhost:8080";


// ============================================================
// MAP BACKEND PROJECT → FRONTEND PROJECT
// ============================================================

function mapProject(project) {
  return {
    // Frontend project ID
    id: project.project_id,

    // SQLite database ID
    dbId: project.id,

    name: project.project_name,
    district: project.district,
    state: project.state,
    type: project.project_type,

    landArea: project.land_area,
    affectedFamilies: project.affected_families,
    landowners: project.landowners,

    compensationCompletion:
      project.compensation_completion,

    legalDispute:
      project.legal_dispute,

    courtCases:
      project.court_cases,

    ownershipConflict:
      project.ownership_conflict,

    approvalDelayDays:
      project.approval_delay_days,

    possessionPct:
      project.possession_pct,

    rehabilitationPct:
      project.rehabilitation_pct,

    stakeholderResponse:
      project.stakeholder_response,

    // ML prediction fields
    predictionStatus:
      project.prediction_status,

    delayProbability:
      project.delay_probability,

    predictedDelayDays:
      project.predicted_delay_days,

    riskScore:
      project.risk_score,

    riskLevel:
      project.risk_level,

    publicStatus:
      project.public_status,

    createdAt:
      project.created_at
  };
}


// ============================================================
// GET ALL PROJECTS
// ============================================================

export async function getProjects() {

  const response = await fetch(
    `${API_URL}/api/projects`
  );

  if (!response.ok) {

    const errorText =
      await response.text();

    console.error(
      "Get projects error:",
      errorText
    );

    throw new Error(
      `Failed to fetch projects (${response.status}): ${errorText}`
    );
  }

  const data =
    await response.json();

  return data.map(mapProject);
}


// ============================================================
// CREATE PROJECT
// ============================================================

export async function createProject(project) {

  const requestBody = {

    project_id:
      project.id,

    project_name:
      project.name,

    district:
      project.district,

    state:
      project.state,

    project_type:
      project.type,

    land_area:
      project.landArea,

    affected_families:
      project.affectedFamilies,

    landowners:
      project.landowners,

    compensation_completion:
      project.compensationCompletion,

    legal_dispute:
      project.legalDispute,

    court_cases:
      project.courtCases,

    ownership_conflict:
      project.ownershipConflict,

    approval_delay_days:
      project.approvalDelayDays,

    possession_pct:
      project.possessionPct,

    rehabilitation_pct:
      project.rehabilitationPct,

    stakeholder_response:
      project.stakeholderResponse
  };


  console.log(
    "Sending project to backend:",
    requestBody
  );


  const response = await fetch(
    `${API_URL}/api/projects`,
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json"
      },

      body:
        JSON.stringify(requestBody)
    }
  );


  // ----------------------------------------------------------
  // HANDLE BACKEND ERROR
  // ----------------------------------------------------------

  if (!response.ok) {

    const errorText =
      await response.text();

    console.error(
      "Create project backend error:",
      errorText
    );

    throw new Error(
      `Backend error (${response.status}): ${errorText}`
    );
  }


  // ----------------------------------------------------------
  // READ BACKEND RESPONSE
  // ----------------------------------------------------------

  const data =
    await response.json();


  console.log(
    "Project created successfully:",
    data
  );


  return mapProject(data);
}


// ============================================================
// DELETE PROJECT
// ============================================================

export async function deleteProject(dbId) {

  const response = await fetch(
    `${API_URL}/api/projects/${dbId}`,
    {
      method: "DELETE"
    }
  );


  if (!response.ok) {

    const errorText =
      await response.text();

    console.error(
      "Delete project error:",
      errorText
    );

    throw new Error(
      `Failed to delete project (${response.status}): ${errorText}`
    );
  }


  return response.json();
}


// ============================================================
// UPDATE PROJECT
// ============================================================

export async function updateProject(
  dbId,
  project
) {

  const requestBody = {

    project_id:
      project.id,

    project_name:
      project.name,

    district:
      project.district,

    state:
      project.state,

    project_type:
      project.type,

    land_area:
      project.landArea,

    affected_families:
      project.affectedFamilies,

    landowners:
      project.landowners,

    compensation_completion:
      project.compensationCompletion,

    legal_dispute:
      project.legalDispute,

    court_cases:
      project.courtCases,

    ownership_conflict:
      project.ownershipConflict,

    approval_delay_days:
      project.approvalDelayDays,

    possession_pct:
      project.possessionPct,

    rehabilitation_pct:
      project.rehabilitationPct,

    stakeholder_response:
      project.stakeholderResponse
  };


  console.log(
    "Updating project:",
    requestBody
  );


  const response = await fetch(
    `${API_URL}/api/projects/${dbId}`,
    {
      method: "PUT",

      headers: {
        "Content-Type":
          "application/json"
      },

      body:
        JSON.stringify(requestBody)
    }
  );


  if (!response.ok) {

    const errorText =
      await response.text();

    console.error(
      "Update project backend error:",
      errorText
    );

    throw new Error(
      `Backend error (${response.status}): ${errorText}`
    );
  }


  const data =
    await response.json();


  console.log(
    "Project updated successfully:",
    data
  );


  return mapProject(data);
}