import React from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

import {
  AlertCircle,
  Clock,
  CheckCircle,
  Folder
} from 'lucide-react';

import ProjectMap from "../components/ProjectMap";

export default function Dashboard({ projects, onNavigate }) {

  const total = projects.length;

  const criticalRisk = projects.filter(
    p => p.riskLevel === 'CRITICAL'
  ).length;

  const highRisk = projects.filter(
    p => p.riskLevel === 'HIGH'
  ).length;

  const mediumRisk = projects.filter(
    p => p.riskLevel === 'MEDIUM'
  ).length;

  const lowRisk = projects.filter(
    p => p.riskLevel === 'LOW'
  ).length;

  const actionRequired = criticalRisk + highRisk;

  const avgDelay = total > 0
    ? Math.round(
        projects.reduce(
          (acc, p) => acc + (Number(p.predictedDelayDays) || 0),
          0
        ) / total
      )
    : 0;

  const riskDistributionData = [
    {
      name: 'Critical Risk',
      value: criticalRisk,
      color: 'var(--risk-critical)'
    },
    {
      name: 'High Risk',
      value: highRisk,
      color: 'var(--risk-high)'
    },
    {
      name: 'Medium Risk',
      value: mediumRisk,
      color: 'var(--risk-medium)'
    },
    {
      name: 'Low Risk',
      value: lowRisk,
      color: 'var(--risk-low)'
    }
  ];

  const delayTrendData = projects
    .slice()
    .reverse()
    .map((project, index) => ({
      project: `P${index + 1}`,
      avgDelay: Number(project.predictedDelayDays) || 0
    }));

  return (
    <div>

      <h2 style={{ marginBottom: '6px' }}>
        Authorized Officer Operational Dashboard
      </h2>

      <p
        style={{
          color: 'var(--text-muted)',
          marginBottom: '20px',
          fontSize: '0.9rem'
        }}
      >
        Real-time Delay Risk Metrics and Decision Support Overview
      </p>

      {/* KPI CARDS */}

      <div className="grid-4" style={{ marginBottom: '24px' }}>

        <div className="card">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{
                fontSize: '0.8rem',
                color: 'var(--text-muted)'
              }}>
                Total Projects
              </div>

              <div style={{
                fontSize: '1.8rem',
                fontWeight: 'bold'
              }}>
                {total}
              </div>
            </div>

            <Folder color="var(--gov-blue)" />
          </div>
        </div>

        <div className="card">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{
                fontSize: '0.8rem',
                color: 'var(--text-muted)'
              }}>
                High/Critical Risk
              </div>

              <div style={{
                fontSize: '1.8rem',
                fontWeight: 'bold',
                color: 'var(--risk-critical)'
              }}>
                {actionRequired}
              </div>
            </div>

            <AlertCircle color="var(--risk-critical)" />
          </div>
        </div>

        <div className="card">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{
                fontSize: '0.8rem',
                color: 'var(--text-muted)'
              }}>
                Avg Predicted Delay
              </div>

              <div style={{
                fontSize: '1.8rem',
                fontWeight: 'bold'
              }}>
                {avgDelay} Days
              </div>
            </div>

            <Clock color="var(--risk-medium)" />
          </div>
        </div>

        <div className="card">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{
                fontSize: '0.8rem',
                color: 'var(--text-muted)'
              }}>
                Action Required
              </div>

              <div style={{
                fontSize: '1.8rem',
                fontWeight: 'bold',
                color: 'var(--saffron-accent)'
              }}>
                {actionRequired}
              </div>
            </div>

            <CheckCircle color="var(--saffron-accent)" />
          </div>
        </div>

      </div>

      {/* CHARTS */}

      <div className="grid-2">

        <div className="card">

          <h3>Risk Distribution Analysis</h3>

          <div
            style={{
              width: '100%',
              height: 260
            }}
          >
            <ResponsiveContainer>

              <PieChart>

                <Pie
                  data={riskDistributionData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >

                  {riskDistributionData.map(
                    (entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color}
                      />
                    )
                  )}

                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>
          </div>

        </div>

        <div className="card">

          <h3>Predicted Delay by Project</h3>

          <div
            style={{
              width: '100%',
              height: 260
            }}
          >
            <ResponsiveContainer>

              <LineChart data={delayTrendData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="project" />

                <YAxis />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="avgDelay"
                  stroke="var(--gov-blue)"
                  strokeWidth={3}
                />

              </LineChart>

            </ResponsiveContainer>
          </div>

        </div>

      </div>

      {/* GIS PROJECT RISK MAP */}

      <div
        className="card"
        style={{
          marginTop: '24px'
        }}
      >

        <h3>Project Risk Map</h3>

        <p
          style={{
            color: 'var(--text-muted)',
            fontSize: '0.85rem',
            marginBottom: '16px'
          }}
        >
          Geographical view of land acquisition projects and their risk status
        </p>
        
        <ProjectMap projects={projects} />
        

      </div>

      {/* RISK SUMMARY */}

      <div
        className="card"
        style={{
          marginTop: '24px'
        }}
      >

        <h3>Risk Summary</h3>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '16px',
            marginTop: '16px'
          }}
        >

          <div>
            <div style={{
              fontSize: '0.8rem',
              color: 'var(--text-muted)'
            }}>
              Critical
            </div>

            <div style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: 'var(--risk-critical)'
            }}>
              {criticalRisk}
            </div>
          </div>

          <div>
            <div style={{
              fontSize: '0.8rem',
              color: 'var(--text-muted)'
            }}>
              High
            </div>

            <div style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: 'var(--risk-high)'
            }}>
              {highRisk}
            </div>
          </div>

          <div>
            <div style={{
              fontSize: '0.8rem',
              color: 'var(--text-muted)'
            }}>
              Medium
            </div>

            <div style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: 'var(--risk-medium)'
            }}>
              {mediumRisk}
            </div>
          </div>

          <div>
            <div style={{
              fontSize: '0.8rem',
              color: 'var(--text-muted)'
            }}>
              Low
            </div>

            <div style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: 'var(--risk-low)'
            }}>
              {lowRisk}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}