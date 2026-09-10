import React, { useEffect, useState } from 'react';

import PublicHeader from './components/PublicHeader';
import OfficerSidebar from './components/OfficerSidebar';
import Footer from './components/Footer';
import ConfirmDeleteModal from './components/ConfirmDeleteModal';
import ProjectDetailsModal from './components/ProjectDetailsModal';
import EditProjectModal from './components/EditProjectModal';

// Pages
import PublicHome from './pages/PublicHome';
import PublicProjects from './pages/PublicProjects';
import PublicNotices from './pages/PublicNotices';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import AddProject from './pages/AddProject';
import AnalyzeProject from './pages/AnalyzeProject';
import RiskMonitoring from './pages/RiskMonitoring';
import Alerts from './pages/Alerts';
import Recommendations from './pages/Recommendations';
import Reports from './pages/Reports';
import Profile from './pages/Profile';

import { MOCK_NOTICES } from './data/mockData';

import {
  getProjects,
  createProject,
  deleteProject,
  updateProject
} from './api/projectApi';

export default function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [activePublicTab, setActivePublicTab] = useState('home');

  const [activeOfficerPage, setActiveOfficerPage] = useState('dashboard');

  const [projects, setProjects] = useState([]);

  const [deleteTarget, setDeleteTarget] = useState(null);

  const [viewTarget, setViewTarget] = useState(null);

  const [editingProject, setEditingProject] = useState(null);


  // ============================================================
  // LOAD PROJECTS
  // ============================================================

  useEffect(() => {
    getProjects()
      .then((data) => {
        setProjects(data);
      })
      .catch((error) => {
        console.error("Error loading projects:", error);
      });
  }, []);


  // ============================================================
  // ADD PROJECT
  // ============================================================

  const handleAddProject = async (newProj) => {
    try {

      const createdProject = await createProject(newProj);

      setProjects((prevProjects) => [
        createdProject,
        ...prevProjects,
      ]);

    } catch (error) {

      console.error("Error creating project:", error);

      alert("Failed to create project. Please try again.");

    }
  };


  // ============================================================
  // DELETE PROJECT
  // ============================================================

  const handleDeleteConfirm = async (id) => {

    try {

      const project = projects.find((p) => p.id === id);

      if (!project) {
        return;
      }

      await deleteProject(project.dbId);

      setProjects((prevProjects) =>
        prevProjects.filter((p) => p.id !== id)
      );

    } catch (error) {

      console.error("Error deleting project:", error);

      alert("Failed to delete project. Please try again.");

    }
  };


  // ============================================================
  // UPDATE PROJECT
  // ============================================================

  const handleUpdateProject = async (updatedProj) => {

    try {

      const existingProject = projects.find(
        (p) => p.id === updatedProj.id
      );

      if (!existingProject) {
        console.error("Project not found:", updatedProj);
        return;
      }

      await updateProject(
        existingProject.dbId,
        updatedProj
      );

      // Fetch fresh data so ML prediction is updated
      const freshProjects = await getProjects();

      setProjects(freshProjects);

      setEditingProject(null);

    } catch (error) {

      console.error("Error updating project:", error);

      alert("Failed to update project. Please try again.");

    }
  };


  // ============================================================
  // ACTIVE ALERT COUNT
  // ============================================================

  const activeAlertsCount = projects.filter(
    (project) =>
      project.riskLevel === 'HIGH' ||
      project.riskLevel === 'CRITICAL'
  ).length;


  return (

    <div className="app-container">

      {/* ========================================================
          SIH BANNER
          ======================================================== */}

      <div className="sih-disclaimer-banner">
        SIH 2026 PROTOTYPE — Predictive Analytics for Early Detection of Land Acquisition Delays (Synthetic Dataset)
      </div>


      {!isAuthenticated ? (

        /* ======================================================
           PUBLIC PORTAL
           ====================================================== */

        <>

          <PublicHeader
            onLoginClick={() => setActivePublicTab('login')}
            activeTab={activePublicTab}
            setActiveTab={setActivePublicTab}
          />

          <main className="main-content">

            {activePublicTab === 'home' && (
              <PublicHome
                projects={projects}
                notices={MOCK_NOTICES}
                setActiveTab={setActivePublicTab}
                onLoginClick={() => setActivePublicTab('login')}
              />
            )}

            {activePublicTab === 'projects' && (
              <PublicProjects
                projects={projects}
              />
            )}

            {activePublicTab === 'notices' && (
              <PublicNotices
                notices={MOCK_NOTICES}
              />
            )}

            {activePublicTab === 'login' && (
              <Login
                onLoginSuccess={() => setIsAuthenticated(true)}
              />
            )}

          </main>

        </>

      ) : (

        /* ======================================================
           AUTHORIZED OFFICER PORTAL
           ====================================================== */

        <div className="officer-layout">

          <OfficerSidebar
            activePage={activeOfficerPage}
            setActivePage={setActiveOfficerPage}
            onLogout={() => setIsAuthenticated(false)}
            notificationsCount={activeAlertsCount}
          />


          <main className="main-content">

            {/* ==================================================
                DASHBOARD
                ================================================== */}

            {activeOfficerPage === 'dashboard' && (
              <Dashboard
                projects={projects}
                onNavigate={setActiveOfficerPage}
              />
            )}


            {/* ==================================================
                PROJECTS
                ================================================== */}

            {activeOfficerPage === 'projects' && (
              <Projects
                projects={projects}
                onDeleteClick={(p) => setDeleteTarget(p)}
                onViewClick={(p) => setViewTarget(p)}
                onEditClick={(p) => setEditingProject(p)}
              />
            )}


            {/* ==================================================
                ADD PROJECT
                ================================================== */}

            {activeOfficerPage === 'add-project' && (
              <AddProject
                onAddProject={handleAddProject}
              />
            )}


            {/* ==================================================
                AI ANALYZE PROJECT
                ================================================== */}

            {activeOfficerPage === 'analyze' && (
              <AnalyzeProject />
            )}


            {/* ==================================================
                RISK MONITORING
                ================================================== */}

            {activeOfficerPage === 'risk-monitoring' && (
              <RiskMonitoring
                projects={projects}
              />
            )}


            {/* ==================================================
                ALERTS
                ================================================== */}

            {activeOfficerPage === 'alerts' && (
              <Alerts
                projects={projects}
              />
            )}


            {/* ==================================================
                RECOMMENDATIONS
                ================================================== */}

            {activeOfficerPage === 'recommendations' && (
              <Recommendations
                projects={projects}
              />
            )}


            {/* ==================================================
                REPORTS
                ================================================== */}

            {activeOfficerPage === 'reports' && (
              <Reports />
            )}


            {/* ==================================================
                PROFILE
                ================================================== */}

            {activeOfficerPage === 'profile' && (
              <Profile
                onLogout={() => setIsAuthenticated(false)}
              />
            )}

          </main>

        </div>

      )}


      {/* ========================================================
          DELETE CONFIRMATION MODAL
          ======================================================== */}

      <ConfirmDeleteModal
        project={deleteTarget}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />


      {/* ========================================================
          PROJECT DETAILS MODAL
          ======================================================== */}

      <ProjectDetailsModal
        project={viewTarget}
        onClose={() => setViewTarget(null)}
      />


      {/* ========================================================
          EDIT PROJECT MODAL
          ======================================================== */}

      {editingProject && (
        <EditProjectModal
          project={editingProject}
          onClose={() => setEditingProject(null)}
          onSave={handleUpdateProject}
        />
      )}


      {/* ========================================================
          FOOTER
          ======================================================== */}

      <Footer />

    </div>
  );
}