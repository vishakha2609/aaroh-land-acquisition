import React from 'react';
import { ShieldAlert } from 'lucide-react';

export default function Alerts({ projects = [] }) {

  // Only HIGH and CRITICAL projects generate active alerts
  const riskProjects = Array.isArray(projects)
    ? projects.filter(
        (project) =>
          project &&
          (project.riskLevel === 'HIGH' ||
            project.riskLevel === 'CRITICAL')
      )
    : [];


  // Find the main risk factor
  const getPrimaryFactor = (project) => {

    if (project.legalDispute) {
      return 'Active Legal Dispute';
    }

    if (project.compensationCompletion < 50) {
      return 'Low Compensation Completion';
    }

    if (project.possessionPct < 50) {
      return 'Low Land Possession';
    }

    if (project.rehabilitationPct < 50) {
      return 'Low Rehabilitation Progress';
    }

    if (project.courtCases > 0) {
      return 'Pending Court Cases';
    }

    if (project.ownershipConflict) {
      return 'Ownership Conflict';
    }

    if (project.approvalDelayDays > 10) {
      return 'Approval / Clearance Delay';
    }

    if (project.stakeholderResponse === 'Poor') {
      return 'Poor Stakeholder Response';
    }

    return 'Multiple Risk Factors';
  };


  // Generate targeted action
  const getAction = (project) => {

    if (project.legalDispute) {
      return 'Escalate active legal disputes for faster resolution.';
    }

    if (project.compensationCompletion < 50) {
      return 'Prioritize pending compensation payments to affected landowners.';
    }

    if (project.possessionPct < 50) {
      return 'Accelerate land possession through coordination with landowners and field authorities.';
    }

    if (project.rehabilitationPct < 50) {
      return 'Expedite rehabilitation and resettlement activities for affected families.';
    }

    if (project.courtCases > 0) {
      return `Monitor ${project.courtCases} pending court case(s) and coordinate with the legal department for timely resolution.`;
    }

    if (project.ownershipConflict) {
      return 'Resolve ownership conflicts through land-record verification and stakeholder coordination.';
    }

    if (project.approvalDelayDays > 10) {
      return `Escalate inter-departmental clearance pending for ${project.approvalDelayDays} days.`;
    }

    if (project.stakeholderResponse === 'Poor') {
      return 'Increase stakeholder engagement and conduct regular field-level coordination meetings.';
    }

    return 'Review the project and take corrective action.';
  };


  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>

      <h2>Active Risk Alerts & Notifications</h2>

      <p
        style={{
          color: 'var(--text-muted)',
          marginBottom: '20px'
        }}
      >
        System-generated alerts triggered when projects cross delay risk thresholds.
      </p>


      {riskProjects.length === 0 ? (

        <div className="card">

          <h3>No Active Risk Alerts</h3>

          <p style={{ color: 'var(--text-muted)' }}>
            No projects are currently classified as High or Critical risk.
          </p>

        </div>

      ) : (

        riskProjects.map((project) => {

          const isCritical = project.riskLevel === 'CRITICAL';

          return (
            <div
              key={project.id}
              className="card"
              style={{
                borderLeft: isCritical
                  ? '4px solid var(--risk-critical)'
                  : '4px solid var(--risk-high)'
              }}
            >

              <div
                style={{
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'center'
                }}
              >

                <ShieldAlert
                  color={
                    isCritical
                      ? 'var(--risk-critical)'
                      : 'var(--risk-high)'
                  }
                  size={28}
                />


                <div>

                  {/* Alert Level */}
                  <div
                    style={{
                      fontSize: '0.8rem',
                      color: isCritical
                        ? 'var(--risk-critical)'
                        : 'var(--risk-high)',
                      fontWeight: 'bold'
                    }}
                  >
                    ALERT LEVEL: {project.riskLevel}
                  </div>


                  {/* Project Name */}
                  <h3 style={{ margin: '2px 0' }}>
                    {project.name || 'Unnamed Project'}
                  </h3>


                  {/* Prediction Details */}
                  <p
                    style={{
                      fontSize: '0.88rem',
                      color: '#334155'
                    }}
                  >

                    <strong>Risk Score:</strong>{' '}
                    {project.riskScore ?? 0}/100

                    {' | '}

                    <strong>Delay Probability:</strong>{' '}
                    {project.delayProbability ?? 0}%

                    {' | '}

                    <strong>Est. Delay:</strong>{' '}
                    {project.predictedDelayDays ?? 0} days

                  </p>


                  {/* Primary Risk */}
                  <p
                    style={{
                      fontSize: '0.88rem',
                      color: '#334155'
                    }}
                  >

                    <strong>Primary Risk:</strong>{' '}

                    {getPrimaryFactor(project)}

                  </p>


                  {/* Recommended Action */}
                  <div
                    style={{
                      background: '#f1f5f9',
                      padding: '8px 10px',
                      borderRadius: '4px',
                      fontSize: '0.8rem',
                      marginTop: '8px'
                    }}
                  >

                    <strong>Recommended Action:</strong>{' '}

                    {getAction(project)}

                  </div>

                </div>

              </div>

            </div>
          );

        })

      )}

    </div>
  );
}