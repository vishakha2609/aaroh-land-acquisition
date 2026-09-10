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

import { MOCK_NOTICES, MOCK_ALERTS } from './data/mockData';

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

  const [alerts, setAlerts] = useState(MOCK_ALERTS);

  const [deleteTarget, setDeleteTarget] = useState(null);

  const [viewTarget, setViewTarget] = useState(null);

  const [editingProject, setEditingProject] = useState(null);


  // Load projects from backend when application starts
  useEffect(() => {
    getProjects()
      .then((data) => {
        setProjects(data);
      })
      .catch((error) => {
        console.error("Error loading projects:", error);
      });
  }, []);


  // Add Project
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


  // Delete Project
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


  // Update Project
  const handleUpdateProject = async (updatedProj) => {
  try {
    const existingProject = projects.find(
      (p) => p.id === updatedProj.id
    );

    if (!existingProject) {
      console.error("Project not found:", updatedProj);
      return;
    }

    // Update project in backend
    await updateProject(
      existingProject.dbId,
      updatedProj
    );

    // IMPORTANT:
    // Fetch fresh data from backend so the UI gets
    // the newly calculated ML prediction.
    const freshProjects = await getProjects();

    setProjects(freshProjects);

    // Close edit modal
    setEditingProject(null);

  } catch (error) {
    console.error("Error updating project:", error);
    alert("Failed to update project. Please try again.");
  }
};


  return (

    <div className="app-container">

      {/* SIH Banner */}
      <div className="sih-disclaimer-banner">
        SIH 2026 PROTOTYPE — Predictive Analytics for Early Detection of Land Acquisition Delays (Synthetic Dataset)
      </div>


      {!isAuthenticated ? (

        /* PUBLIC PORTAL EXPERIENCE */

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
              <PublicProjects projects={projects} />
            )}

            {activePublicTab === 'notices' && (
              <PublicNotices notices={MOCK_NOTICES} />
            )}

            {activePublicTab === 'login' && (
              <Login
                onLoginSuccess={() => setIsAuthenticated(true)}
              />
            )}

          </main>

        </>

      ) : (

        /* AUTHORIZED OFFICER PORTAL EXPERIENCE */

        <div className="officer-layout">

          <OfficerSidebar
            activePage={activeOfficerPage}
            setActivePage={setActiveOfficerPage}
            onLogout={() => setIsAuthenticated(false)}

            /*
              Still using alerts.length for the sidebar
              notification count for now.
            */
            notificationsCount={alerts.length}
          />


          <main className="main-content">

            {/* Dashboard */}
            {activeOfficerPage === 'dashboard' && (
              <Dashboard
                projects={projects}
                onNavigate={setActiveOfficerPage}
              />
            )}


            {/* Projects */}
            {activeOfficerPage === 'projects' && (
              <Projects
                projects={projects}
                onDeleteClick={(p) => setDeleteTarget(p)}
                onViewClick={(p) => setViewTarget(p)}
                onEditClick={(p) => setEditingProject(p)}
              />
            )}


            {/* Add Project */}
            {activeOfficerPage === 'add-project' && (
              <AddProject
                onAddProject={handleAddProject}
              />
            )}


            {/* AI Analyze Project */}
            {activeOfficerPage === 'analyze' && (
              <AnalyzeProject />
            )}


            {/* Risk Monitoring */}
            {activeOfficerPage === 'risk-monitoring' && (
              <RiskMonitoring
                projects={projects}
              />
            )}


            {/* Alerts */}
            {activeOfficerPage === 'alerts' && (
              <Alerts
                projects={projects}
              />
            )}


            {/* Recommendations */}
            {activeOfficerPage === 'recommendations' && (
              <Recommendations
                projects={projects}
              />
            )}


            {/* Reports */}
            {activeOfficerPage === 'reports' && (
              <Reports />
            )}


            {/* Profile */}
            {activeOfficerPage === 'profile' && (
              <Profile
                onLogout={() => setIsAuthenticated(false)}
              />
            )}

          </main>

        </div>

      )}


      {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal
        project={deleteTarget}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />


      {/* Project Details Modal */}
      <ProjectDetailsModal
        project={viewTarget}
        onClose={() => setViewTarget(null)}
      />


      {/* Edit Project Modal */}
      {editingProject && (
        <EditProjectModal
          project={editingProject}
          onClose={() => setEditingProject(null)}
          onSave={handleUpdateProject}
        />
      )}


      <Footer />

    </div>
  );
}