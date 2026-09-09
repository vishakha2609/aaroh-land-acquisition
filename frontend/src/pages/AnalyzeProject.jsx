import React, { useState } from 'react';
import { SearchCode, ShieldCheck, AlertTriangle } from 'lucide-react';

const API_URL = "http://localhost:8080";

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

  // ============================================================
  // HANDLE INPUT CHANGES
  // ============================================================

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // ============================================================
  // GENERATE KEY RISK FACTORS
  // ============================================================

  const generateRiskFactors = () => {

    const factors = [];

    if (Number(formData.compensationCompletion) < 50) {
      factors.push({
        feature: 'Low Compensation Completion',
        impact: `Only ${formData.compensationCompletion}% completed`,
        positive: true
      });
    }

    if (Number(formData.possessionPct) < 50) {
      factors.push({
        feature: 'Low Land Possession',
        impact: `Only ${formData.possessionPct}% possession`,
        positive: true
      });
    }

    if (Number(formData.rehabilitationPct) < 50) {
      factors.push({
        feature: 'Low Rehabilitation Progress',
        impact: `Only ${formData.rehabilitationPct}% completed`,
        positive: true
      });
    }

    if (formData.legalDispute === 'true') {
      factors.push({
        feature: 'Active Legal Dispute',
        impact: 'High Risk Factor',
        positive: true
      });
    }

    if (formData.ownershipConflict === 'true') {
      factors.push({
        feature: 'Ownership Conflict',
        impact: 'High Risk Factor',
        positive: true
      });
    }

    if (Number(formData.courtCases) > 0) {
      factors.push({
        feature: 'Pending Court Cases',
        impact: `${formData.courtCases} case(s)`,
        positive: true
      });
    }

    if (Number(formData.approvalDelayDays) > 30) {
      factors.push({
        feature: 'Approval Delay',
        impact: `${formData.approvalDelayDays} days`,
        positive: true
      });
    }

    if (formData.stakeholderResponse === 'Slow') {
      factors.push({
        feature: 'Slow Stakeholder Response',
        impact: 'High Risk Factor',
        positive: true
      });
    }

    // If there aren't enough risk factors
    if (factors.length === 0) {
      factors.push({
        feature: 'Project Conditions',
        impact: 'No major risk indicators',
        positive: false
      });
    }

    return factors.slice(0, 6);
  };

  // ============================================================
  // GENERATE RECOMMENDATIONS
  // ============================================================

  const generateRecommendations = () => {

    const recommendations = [];

    if (Number(formData.compensationCompletion) < 50) {
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

    if (formData.ownershipConflict === 'true') {
      recommendations.push(
        'Verify ownership records and resolve ownership conflicts.'
      );
    }

    if (Number(formData.courtCases) > 0) {
      recommendations.push(
        'Monitor pending court cases and coordinate with the legal department.'
      );
    }

    if (Number(formData.approvalDelayDays) > 30) {
      recommendations.push(
        'Expedite pending administrative approvals and clearances.'
      );
    }

    if (formData.stakeholderResponse === 'Slow') {
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

      // Convert backend response to frontend format
      const analysisResult = {
        delayProbability: data.delay_probability,
        riskLevel: data.risk_level,
        predictionStatus: data.prediction_status,
        predictedDelayDays: data.predicted_delay_days,

        shapFactors: generateRiskFactors(),
        recommendations: generateRecommendations(),

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

      console.error('AI prediction error:', err);

      setError(
        'Unable to connect to the AI prediction service. Make sure the FastAPI backend is running on port 8080.'
      );

    } finally {

      setLoading(false);

    }
  };

  // ============================================================
  // RISK COLOR
  // ============================================================

  const getRiskColor = () => {

    if (!result) return 'var(--risk-low)';

    if (result.riskLevel === 'CRITICAL') {
      return 'var(--risk-critical)';
    }

    if (result.riskLevel === 'HIGH') {
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
        Run AI-based delay prediction using project, legal,
        compensation, possession, rehabilitation and stakeholder
        information.
      </p>


      <div className="grid-2">


        {/* ======================================================
            INPUT FORM
            ====================================================== */}

        <div className="card">

          <h3>Project Inputs for AI Model</h3>

          <form onSubmit={handleRunAnalysis}>


            {/* PROJECT NAME */}

            <div className="form-group">

              <label>
                Project Name / Reference
              </label>

              <input
                className="form-control"
                type="text"
                value={formData.name}
                onChange={e =>
                  handleChange('name', e.target.value)
                }
              />

            </div>


            {/* LAND AREA + FAMILIES */}

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
                    handleChange('landArea', e.target.value)
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


            {/* LANDOWNERS + STAKEHOLDER */}

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


            {/* COMPENSATION + POSSESSION */}

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


            {/* REHABILITATION + COURT CASES */}

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


            {/* LEGAL + OWNERSHIP */}

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


            {/* APPROVAL DELAY */}

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


            {/* BUTTON */}

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


          {/* ERROR */}

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


        {/* ======================================================
            OUTPUT
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


              {/* MAIN RESULTS */}

              <div
                style={{
                  display: 'flex',
                  gap: '12px',
                  margin: '16px 0'
                }}
              >


                {/* PROBABILITY */}

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
                    className={`badge badge-${result.riskLevel.toLowerCase()}`}
                  >
                    {result.riskLevel}
                  </span>

                </div>


                {/* DELAY */}

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


              {/* STATUS */}

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


              {/* RISK FACTORS */}

              <h4>
                Key Risk Factors
              </h4>

              <div className="shap-bar-container">

                {result.shapFactors.map(
                  (item, idx) => (

                    <div
                      key={idx}
                      className="shap-item"
                      style={{
                        borderLeftColor:
                          item.positive
                            ? 'var(--risk-critical)'
                            : 'var(--risk-low)'
                      }}
                    >

                      <span>
                        {item.feature}
                      </span>

                      <strong
                        style={{
                          color:
                            item.positive
                              ? 'var(--risk-critical)'
                              : 'var(--risk-low)'
                        }}
                      >
                        {item.impact}
                      </strong>

                    </div>

                  )
                )}

              </div>


              {/* RECOMMENDATIONS */}

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