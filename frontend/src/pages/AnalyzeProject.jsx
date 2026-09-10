import React, { useState } from 'react';
import { SearchCode, ShieldCheck, AlertTriangle } from 'lucide-react';

// BACKEND API
const API_URL = "https://aaroh-land-acquisition-1.onrender.com";

export default function AnalyzeProject() {

  const [formData, setFormData] = useState({
    name: 'Simulation Project',
    landArea: 350,
    affectedFamilies: 180,
    landowners: 220,
    compensationCompletion: 35,
    legalDispute: 'true',
    courtCases: 2,
    ownershipConflict: 'false',
    approvalDelayDays: 25,
    possessionPct: 20,
    rehabilitationPct: 30,
    stakeholderResponse: 'Poor'
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // ============================================================
  // CONDITION-BASED RECOMMENDATIONS
  // ============================================================

  const generateRecommendations = () => {

    const recommendations = [];

    if (Number(formData.compensationCompletion) < 60) {
      recommendations.push(
        'Prioritize pending compensation payments to affected landowners.'
      );
    }

    if (Number(formData.possessionPct) < 50) {
      recommendations.push(
        'Accelerate land possession through coordination with landowners and field authorities.'
      );
    }

    if (Number(formData.rehabilitationPct) < 50) {
      recommendations.push(
        'Expedite rehabilitation and resettlement activities for affected families.'
      );
    }

    if (formData.legalDispute === 'true') {
      recommendations.push(
        'Escalate active legal disputes for faster legal resolution.'
      );
    }

    if (Number(formData.courtCases) > 0) {
      recommendations.push(
        `Monitor ${formData.courtCases} pending court case(s) and coordinate with the legal department.`
      );
    }

    if (formData.ownershipConflict === 'true') {
      recommendations.push(
        'Verify ownership records and resolve ownership conflicts through stakeholder coordination.'
      );
    }

    if (Number(formData.approvalDelayDays) > 10) {
      recommendations.push(
        'Expedite pending administrative approvals and clearances.'
      );
    }

    if (formData.stakeholderResponse === 'Poor') {
      recommendations.push(
        'Increase stakeholder engagement and establish regular follow-up meetings.'
      );
    }

    if (recommendations.length === 0) {
      recommendations.push(
        'Continue regular monitoring. No immediate intervention is required.'
      );
    }

    return recommendations.slice(0, 5);
  };

  // ============================================================
  // RUN AI ANALYSIS
  // ============================================================

  const handleRunAnalysis = async (e) => {

    e.preventDefault();

    setLoading(true);
    setError('');
    setResult(null);

    try {

      const requestBody = {

        project_name: formData.name,

        district: 'Pune',

        state: 'Maharashtra',

        project_type: 'Highway',

        land_area: Number(formData.landArea),

        affected_families: Number(formData.affectedFamilies),

        landowners: Number(formData.landowners),

        compensation_completion:
          Number(formData.compensationCompletion),

        legal_dispute:
          formData.legalDispute === 'true',

        court_cases:
          Number(formData.courtCases),

        ownership_conflict:
          formData.ownershipConflict === 'true',

        approval_delay_days:
          Number(formData.approvalDelayDays),

        possession_pct:
          Number(formData.possessionPct),

        rehabilitation_pct:
          Number(formData.rehabilitationPct),

        stakeholder_response:
          formData.stakeholderResponse
      };

      const response = await fetch(
        `${API_URL}/api/predict`,
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json'
          },

          body: JSON.stringify(requestBody)
        }
      );

      if (!response.ok) {

        const errorText = await response.text();

        throw new Error(
          `Prediction failed (${response.status}): ${errorText}`
        );
      }

      const data = await response.json();

      // ========================================================
      // SHAP FACTORS
      // Show only factors that increase risk.
      // Maximum 5 factors are displayed.
      // ========================================================

      const shapFactors = (data.shap_factors || [])
        .filter(item => item.impact > 0)
        .sort((a, b) => b.impact - a.impact)
        .slice(0, 5);

      const analysisResult = {

        delayProbability:
          data.delay_probability,

        riskLevel:
          data.risk_level,

        predictionStatus:
          data.prediction_status,

        predictedDelayDays:
          data.predicted_delay_days,

        shapFactors:
          shapFactors,

        recommendations:
          generateRecommendations(),

        expectedRange:

          data.predicted_delay_days > 0

            ? `${Math.max(
                0,
                Number(data.predicted_delay_days) - 15
              )} - ${
                Number(data.predicted_delay_days) + 15
              } Days`

            : 'No significant delay expected'
      };

      setResult(analysisResult);

    } catch (err) {

      console.error(
        'AI prediction error:',
        err
      );

      setError(
        'Unable to connect to the AI prediction service. Please try again in a few seconds.'
      );

    } finally {

      setLoading(false);

    }
  };

  // ============================================================
  // RISK COLOR
  // ============================================================

  const getRiskColor = () => {

    if (!result) {
      return 'var(--risk-low)';
    }

    if (
      result.riskLevel === 'CRITICAL' ||
      result.riskLevel === 'HIGH'
    ) {
      return 'var(--risk-critical)';
    }

    if (result.riskLevel === 'MEDIUM') {
      return 'var(--risk-medium)';
    }

    return 'var(--risk-low)';
  };

  // ============================================================
  // UI
  // ============================================================

  return (

    <div>

      <h2>
        AI Risk Prediction & Decision Support System
      </h2>

      <p
        style={{
          color: 'var(--text-muted)',
          marginBottom: '20px'
        }}
      >
        Run AI-based delay prediction using project,
        legal, compensation, possession, rehabilitation
        and stakeholder information.
      </p>

      <div className="grid-2">

        {/* =====================================================
            INPUT FORM
        ====================================================== */}

        <div className="card">

          <h3>
            Project Inputs for AI Model
          </h3>

          <form
            onSubmit={handleRunAnalysis}
          >

            <div className="form-group">

              <label>
                Project Name / Reference
              </label>

              <input
                className="form-control"
                type="text"
                value={formData.name}
                onChange={e =>
                  handleChange(
                    'name',
                    e.target.value
                  )
                }
              />

            </div>

            <div className="grid-2">

              <div className="form-group">

                <label>
                  Land Area (Hectares)
                </label>

                <input
                  className="form-control"
                  type="number"
                  min="1"
                  value={formData.landArea}
                  onChange={e =>
                    handleChange(
                      'landArea',
                      e.target.value
                    )
                  }
                />

              </div>

              <div className="form-group">

                <label>
                  Affected Families
                </label>

                <input
                  className="form-control"
                  type="number"
                  min="0"
                  value={formData.affectedFamilies}
                  onChange={e =>
                    handleChange(
                      'affectedFamilies',
                      e.target.value
                    )
                  }
                />

              </div>

            </div>

            <div className="grid-2">

              <div className="form-group">

                <label>
                  Registered Landowners
                </label>

                <input
                  className="form-control"
                  type="number"
                  min="0"
                  value={formData.landowners}
                  onChange={e =>
                    handleChange(
                      'landowners',
                      e.target.value
                    )
                  }
                />

              </div>

              <div className="form-group">

                <label>
                  Stakeholder Response
                </label>

                <select
                  className="form-control"
                  value={formData.stakeholderResponse}
                  onChange={e =>
                    handleChange(
                      'stakeholderResponse',
                      e.target.value
                    )
                  }
                >

                  <option value="Good">
                    Fast Response
                  </option>

                  <option value="Normal">
                    Normal Response
                  </option>

                  <option value="Poor">
                    Slow Response
                  </option>

                </select>

              </div>

            </div>

            <div className="grid-2">

              <div className="form-group">

                <label>
                  Compensation Paid (%)
                </label>

                <input
                  className="form-control"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.compensationCompletion}
                  onChange={e =>
                    handleChange(
                      'compensationCompletion',
                      e.target.value
                    )
                  }
                />

              </div>

              <div className="form-group">

                <label>
                  Land Possession (%)
                </label>

                <input
                  className="form-control"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.possessionPct}
                  onChange={e =>
                    handleChange(
                      'possessionPct',
                      e.target.value
                    )
                  }
                />

              </div>

            </div>

            <div className="grid-2">

              <div className="form-group">

                <label>
                  Rehabilitation Progress (%)
                </label>

                <input
                  className="form-control"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.rehabilitationPct}
                  onChange={e =>
                    handleChange(
                      'rehabilitationPct',
                      e.target.value
                    )
                  }
                />

              </div>

              <div className="form-group">

                <label>
                  Active Court Cases
                </label>

                <input
                  className="form-control"
                  type="number"
                  min="0"
                  value={formData.courtCases}
                  onChange={e =>
                    handleChange(
                      'courtCases',
                      e.target.value
                    )
                  }
                />

              </div>

            </div>

            <div className="grid-2">

              <div className="form-group">

                <label>
                  Active Legal Dispute?
                </label>

                <select
                  className="form-control"
                  value={formData.legalDispute}
                  onChange={e =>
                    handleChange(
                      'legalDispute',
                      e.target.value
                    )
                  }
                >

                  <option value="true">
                    Active Dispute Exists
                  </option>

                  <option value="false">
                    Clear / No Disputes
                  </option>

                </select>

              </div>

              <div className="form-group">

                <label>
                  Ownership Conflict?
                </label>

                <select
                  className="form-control"
                  value={formData.ownershipConflict}
                  onChange={e =>
                    handleChange(
                      'ownershipConflict',
                      e.target.value
                    )
                  }
                >

                  <option value="false">
                    No Ownership Conflict
                  </option>

                  <option value="true">
                    Ownership Conflict Exists
                  </option>

                </select>

              </div>

            </div>

            <div className="form-group">

              <label>
                Clearance / Approval Delay (Days)
              </label>

              <input
                className="form-control"
                type="number"
                min="0"
                value={formData.approvalDelayDays}
                onChange={e =>
                  handleChange(
                    'approvalDelayDays',
                    e.target.value
                  )
                }
              />

            </div>

            <button
              className="btn btn-primary"
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                justifyContent: 'center',
                marginTop: '12px'
              }}
            >

              <SearchCode size={18} />

              {loading
                ? ' Running AI Prediction...'
                : ' Run AI Delay Prediction Engine'}

            </button>

          </form>

          {error && (

            <div
              style={{
                marginTop: '15px',
                padding: '12px',
                borderRadius: '6px',
                background: '#fff1f2',
                color: '#b91c1c',
                fontSize: '0.85rem'
              }}
            >

              <AlertTriangle
                size={16}
                style={{
                  verticalAlign: 'middle',
                  marginRight: '6px'
                }}
              />

              {error}

            </div>

          )}

        </div>

        {/* =====================================================
            RESULT
        ====================================================== */}

        <div>

          {result ? (

            <div
              className="card"
              style={{
                borderTop:
                  `4px solid ${getRiskColor()}`
              }}
            >

              <h3>
                AI Risk Assessment Output
              </h3>

              <div
                style={{
                  display: 'flex',
                  gap: '12px',
                  margin: '16px 0'
                }}
              >

                <div
                  style={{
                    flex: 1,
                    background: '#f8fafc',
                    padding: '12px',
                    borderRadius: '6px',
                    textAlign: 'center'
                  }}
                >

                  <div
                    style={{
                      fontSize: '0.8rem',
                      color: 'var(--text-muted)'
                    }}
                  >
                    Delay Probability
                  </div>

                  <div
                    style={{
                      fontSize: '1.6rem',
                      fontWeight: 'bold'
                    }}
                  >
                    {result.delayProbability}%
                  </div>

                  <span
                    className={
                      `badge badge-${result.riskLevel.toLowerCase()}`
                    }
                  >
                    {result.riskLevel}
                  </span>

                </div>

                <div
                  style={{
                    flex: 1,
                    background: '#f8fafc',
                    padding: '12px',
                    borderRadius: '6px',
                    textAlign: 'center'
                  }}
                >

                  <div
                    style={{
                      fontSize: '0.8rem',
                      color: 'var(--text-muted)'
                    }}
                  >
                    Predicted Delay
                  </div>

                  <div
                    style={{
                      fontSize: '1.6rem',
                      fontWeight: 'bold'
                    }}
                  >
                    {result.predictedDelayDays} Days
                  </div>

                  <div
                    style={{
                      fontSize: '0.7rem',
                      color: 'var(--text-muted)'
                    }}
                  >
                    Est. Range: {result.expectedRange}
                  </div>

                </div>

              </div>

              <div
                style={{
                  padding: '10px',
                  background: '#f8fafc',
                  borderRadius: '6px',
                  marginBottom: '16px'
                }}
              >

                <strong>
                  Prediction Status:
                </strong>{' '}

                {result.predictionStatus}

              </div>

              {/* =================================================
                  SHAP FACTORS
              ================================================== */}

              <h4>
                Why is this project at risk?
              </h4>

              <p
                style={{
                  color: 'var(--text-muted)',
                  fontSize: '0.8rem',
                  marginBottom: '10px'
                }}
              >
                Top factors identified by the AI model.
              </p>

              <div className="shap-bar-container">

                {result.shapFactors.length > 0 ? (

                  result.shapFactors.map(
                    (item, idx) => {

                      // Clean display names for SHAP factors
                      const featureLabels = {
                        legal_dispute: 'Active Legal Dispute',
                        compensation_completion: 'Compensation Completion',
                        stakeholder_response: 'Stakeholder Response',
                        possession_pct: 'Land Possession',
                        rehabilitation_pct: 'Rehabilitation Progress',
                        court_cases: 'Active Court Cases',
                        approval_delay_days: 'Approval Delay',
                        affected_families: 'Affected Families',
                        landowners: 'Landowners',
                        ownership_conflict: 'Ownership Conflict',
                        land_area: 'Land Area'
                      };

                      const featureName =
                        featureLabels[item.feature] ||
                        item.feature;

                      return (

                        <div
                          key={idx}
                          className="shap-item"
                          style={{
                            borderLeftColor:
                              'var(--risk-critical)'
                          }}
                        >

                          <span>
                            {featureName}
                          </span>

                          <strong
                            style={{
                              color:
                                'var(--risk-critical)'
                            }}
                          >
                            +{Number(item.impact).toFixed(2)}
                          </strong>

                        </div>

                      );

                    }
                  )

                ) : (

                  <div
                    style={{
                      color: 'var(--text-muted)',
                      fontSize: '0.85rem'
                    }}
                  >
                    No major positive risk contributors identified.
                  </div>

                )}

              </div>

              {/* =================================================
                  TARGETED RECOMMENDATIONS
              ================================================== */}

              <h4
                style={{
                  marginTop: '16px'
                }}
              >
                Targeted Remedial Actions
              </h4>

              <ul
                style={{
                  paddingLeft: '20px',
                  fontSize: '0.88rem',
                  color: '#334155'
                }}
              >

                {result.recommendations.map(
                  (rec, i) => (

                    <li
                      key={i}
                      style={{
                        marginBottom: '6px'
                      }}
                    >
                      {rec}
                    </li>

                  )
                )}

              </ul>

            </div>

          ) : (

            <div
              className="card"
              style={{
                textAlign: 'center',
                padding: '40px',
                color: 'var(--text-muted)'
              }}
            >

              <ShieldCheck
                size={48}
                color="var(--border-color)"
              />

              <p>
                Adjust project inputs and click
                "Run AI Delay Prediction Engine"
                to generate a real-time delay prediction.
              </p>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}