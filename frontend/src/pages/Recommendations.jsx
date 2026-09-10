import React from 'react';
import { Lightbulb } from 'lucide-react';

export default function Recommendations({ projects = [] }) {

  const highRiskProjects = projects.filter(
    p => p.riskLevel === 'HIGH' || p.riskLevel === 'CRITICAL'
  );

  const generateRecommendations = (p) => {

    const recommendations = [];

    if (p.compensationCompletion < 60) {
      recommendations.push(
        `Prioritize pending compensation payments; only ${p.compensationCompletion}% of compensation is completed.`
      );
    }

    if (p.possessionPct < 50) {
      recommendations.push(
        `Accelerate land possession through coordination with landowners and field authorities; current possession is ${p.possessionPct}%.`
      );
    }

    if (p.rehabilitationPct < 50) {
      recommendations.push(
        `Expedite rehabilitation and resettlement activities; current progress is ${p.rehabilitationPct}%.`
      );
    }

    if (p.legalDispute) {
      recommendations.push(
        'Escalate the active legal dispute for faster resolution.'
      );
    }

    if (p.courtCases > 0) {
      recommendations.push(
        `Monitor ${p.courtCases} pending court case(s) and coordinate with the legal department for timely resolution.`
      );
    }

    if (p.ownershipConflict) {
      recommendations.push(
        'Resolve ownership conflicts through land-record verification and stakeholder coordination.'
      );
    }

    if (p.approvalDelayDays > 10) {
      recommendations.push(
        `Escalate inter-departmental clearance pending for ${p.approvalDelayDays} days.`
      );
    }

    if (p.stakeholderResponse === 'Poor') {
      recommendations.push(
        'Increase stakeholder engagement and conduct regular field-level coordination meetings.'
      );
    }

    if (recommendations.length === 0) {
      recommendations.push(
        'Review the project periodically and monitor emerging risk indicators.'
      );
    }

    return recommendations.slice(0, 5);
  };

  return (
    <div>

      <h2>
        Actionable Decision Recommendations
      </h2>

      <p
        style={{
          color: 'var(--text-muted)',
          marginBottom: '20px'
        }}
      >
        Automated recommendations tailored for high-risk projects.
      </p>

      {highRiskProjects.length === 0 ? (

        <div className="card">

          <h3>
            No Immediate Recommendations
          </h3>

          <p
            style={{
              color: 'var(--text-muted)'
            }}
          >
            No High or Critical risk projects currently require
            targeted intervention.
          </p>

        </div>

      ) : (

        highRiskProjects.map(p => (

          <div
            key={p.id}
            className="card"
          >

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '12px'
              }}
            >

              <Lightbulb
                color="var(--saffron-accent)"
              />

              <h3>
                {p.name} ({p.district})
              </h3>

            </div>

            <div
              style={{
                marginBottom: '12px',
                fontSize: '0.85rem',
                color: '#475569'
              }}
            >

              <strong>
                Risk Level:
              </strong>{' '}
              {p.riskLevel}

              {' | '}

              <strong>
                Risk Score:
              </strong>{' '}
              {p.riskScore}/100

              {' | '}

              <strong>
                Delay Probability:
              </strong>{' '}
              {p.delayProbability}%

            </div>

            <ul
              style={{
                paddingLeft: '20px',
                fontSize: '0.9rem',
                color: '#334155'
              }}
            >

              {generateRecommendations(p).map(
                (recommendation, index) => (

                  <li
                    key={index}
                    style={{
                      marginBottom: '8px'
                    }}
                  >
                    {recommendation}
                  </li>

                )
              )}

            </ul>

          </div>

        ))

      )}

    </div>
  );
}