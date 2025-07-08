import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [projects, setProjects] = useState([
    {
      id: '1',
      name: 'Modernisation Infrastructure IT',
      type: 'AO',
      structure: 'Ministère Digital',
      launchDate: '2024-01-15',
      status: 'active',
      phase: 'preparation',
      progress: 65,
      responsible: 'Marie Dubois',
      budget: 850000,
      deadline: '2024-06-30'
    },
    {
      id: '2',
      name: 'Consultation Stratégie Cloud',
      type: 'AMI',
      structure: 'Direction Technique',
      launchDate: '2024-02-01',
      status: 'pending',
      phase: 'programming',
      progress: 30,
      responsible: 'Pierre Martin',
      budget: 120000,
      deadline: '2024-04-15'
    },
    {
      id: '3',
      name: 'Fourniture Matériel Réseau',
      type: 'DP',
      structure: 'Service Informatique',
      launchDate: '2024-01-20',
      status: 'completed',
      phase: 'implementation',
      progress: 100,
      responsible: 'Sophie Laurent',
      budget: 45000,
      deadline: '2024-03-20'
    }
  ]);

  const [notifications, setNotifications] = useState([
    {
      id: '1',
      type: 'warning',
      title: 'Échéance approchante',
      message: 'Le projet ModInfra IT a une échéance dans 3 jours',
      timestamp: '2024-01-10T10:30:00Z',
      read: false,
      projectId: '1'
    },
    {
      id: '2',
      type: 'info',
      title: 'Nouveau document',
      message: 'Cahier des charges mis à jour pour le projet Cloud',
      timestamp: '2024-01-10T09:15:00Z',
      read: false,
      projectId: '2'
    }
  ]);

  const [selectedProject, setSelectedProject] = useState(null);
  const [currentPhase, setCurrentPhase] = useState('programming');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Synchroniser la phase actuelle avec le projet sélectionné
  useEffect(() => {
    if (selectedProject) {
      console.log('🔄 Synchronizing phase with selected project:', selectedProject.phase);
      setCurrentPhase(selectedProject.phase);
    }
  }, [selectedProject]);

  const addProject = (projectData) => {
    const projectId = Math.random().toString(36).substr(2, 9);
    const newProject = {
      ...projectData,
      id: projectId,
      phase: 'programming',
      progress: 0,
      status: 'pending'
    };
    
    console.log('➕ Adding new project:', newProject);
    
    setProjects(prev => {
      const updated = [...prev, newProject];
      console.log('📋 Projects after add:', updated);
      return updated;
    });
    
    setSelectedProject(newProject);
    setCurrentPhase('programming');
    
    return projectId;
  };

  const updateProject = (projectId, updates) => {
    console.log('🔄 updateProject called with:', { projectId, updates });
    
    setProjects(prev => {
      const updated = prev.map(project => {
        if (project.id === projectId) {
          const updatedProject = { ...project, ...updates };
          console.log('📝 Project updated in list:', updatedProject);
          
          // Si c'est le projet sélectionné, le mettre à jour aussi
          if (selectedProject?.id === projectId) {
            console.log('🎯 Updating selected project too');
            setSelectedProject(updatedProject);
            
            // Mettre à jour la phase actuelle si elle a changé
            if (updates.phase && updates.phase !== currentPhase) {
              console.log('🔄 Changing current phase from', currentPhase, 'to', updates.phase);
              setCurrentPhase(updates.phase);
            }
          }
          
          return updatedProject;
        }
        return project;
      });
      console.log('📋 All projects after update:', updated);
      return updated;
    });
  };

  const selectProject = (project) => {
    console.log('🎯 Selecting project:', project);
    setSelectedProject(project);
    setCurrentPhase(project.phase);
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(prev => !prev);
  };

  const markNotificationRead = (id) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const getNextPhase = (currentPhase) => {
    const phaseOrder = [
      'programming',
      'preparation', 
      'launch',
      'response-preparation',
      'evaluation',
      'implementation'
    ];
    
    const currentIndex = phaseOrder.indexOf(currentPhase);
    console.log('📍 Current phase:', currentPhase, 'Index:', currentIndex);
    
    if (currentIndex >= 0 && currentIndex < phaseOrder.length - 1) {
      const nextPhase = phaseOrder[currentIndex + 1];
      console.log('➡️ Next phase will be:', nextPhase);
      return nextPhase;
    }
    
    console.log('🏁 No next phase available');
    return null;
  };

  const advanceToNextPhase = (projectId) => {
    console.log('🚀 advanceToNextPhase called for project:', projectId);
    
    // Trouver le projet dans la liste actuelle
    const project = projects.find(p => p.id === projectId);
    if (!project) {
      console.error('❌ Project not found in projects list:', projectId);
      console.log('📋 Available projects:', projects.map(p => ({ id: p.id, name: p.name })));
      return;
    }

    console.log('📋 Found project:', project);
    console.log('📍 Current project phase:', project.phase);

    const nextPhase = getNextPhase(project.phase);
    if (!nextPhase) {
      console.log('🏁 Already at final phase');
      return;
    }

    // Calculer la nouvelle progression
    const progressIncrement = 100 / 6; // 6 phases au total
    const newProgress = Math.min(100, project.progress + progressIncrement);

    const updates = {
      phase: nextPhase,
      progress: Math.round(newProgress),
      status: nextPhase === 'implementation' ? 'completed' : 'active'
    };

    console.log('📝 Applying updates to project:', updates);

    // Mettre à jour le projet
    updateProject(projectId, updates);

    // Ajouter une notification
    const newNotification = {
      id: Date.now().toString(),
      type: 'success',
      title: 'Phase avancée',
      message: `Le projet ${project.name} est passé à la phase ${getPhaseText(nextPhase)}`,
      timestamp: new Date().toISOString(),
      read: false,
      projectId: projectId
    };

    setNotifications(prev => [newNotification, ...prev]);
    
    console.log('✅ Phase advancement completed successfully');
  };

  const getPhaseText = (phase) => {
    switch (phase) {
      case 'programming': return 'Programmation';
      case 'preparation': return 'Préparation';
      case 'launch': return 'Lancement';
      case 'response-preparation': return 'Préparation Réponse';
      case 'evaluation': return 'Évaluation';
      case 'implementation': return 'Mise en œuvre';
      default: return 'Inconnu';
    }
  };

  return (
    <AppContext.Provider value={{
      projects,
      notifications,
      selectedProject,
      currentPhase,
      sidebarCollapsed,
      addProject,
      selectProject,
      setCurrentPhase,
      updateProject,
      toggleSidebar,
      markNotificationRead,
      advanceToNextPhase
    }}>
      {children}
    </AppContext.Provider>
  );
};