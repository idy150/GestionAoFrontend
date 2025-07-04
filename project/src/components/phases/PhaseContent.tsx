import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../../contexts/AppContext';
import { ProgrammingPhase } from './ProgrammingPhase';
import { PreparationPhase } from './PreparationPhase';
import { LaunchPhase } from './LaunchPhase';
import { ResponsePreparationPhase } from './ResponsePreparationPhase';
import { EvaluationPhase } from './EvaluationPhase';
import { ImplementationPhase } from './ImplementationPhase';

export const PhaseContent: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { currentPhase, selectedProject, projects, selectProject, setCurrentPhase } = useApp();

  useEffect(() => {
    console.log('🔍 PhaseContent useEffect triggered');
    console.log('📋 URL projectId:', projectId);
    console.log('📋 Available projects:', projects.map(p => ({ id: p.id, name: p.name, phase: p.phase })));
    
    if (projectId) {
      // Trouver le projet par son ID
      const project = projects.find(p => p.id === projectId);
      console.log('🎯 Found project:', project);
      
      if (project) {
        // Sélectionner le projet et définir la phase actuelle
        console.log('✅ Selecting project and setting phase to:', project.phase);
        selectProject(project);
        setCurrentPhase(project.phase);
      } else {
        // Si le projet n'existe pas, retourner au dashboard
        console.log('❌ Project not found, redirecting to dashboard');
        navigate('/');
      }
    } else {
      console.log('❌ No projectId in URL');
      navigate('/');
    }
  }, [projectId, projects, selectProject, setCurrentPhase, navigate]);

  // Debug logs pour les changements d'état
  useEffect(() => {
    console.log('🔄 PhaseContent state update:');
    console.log('- Selected project:', selectedProject?.name, selectedProject?.id);
    console.log('- Current phase:', currentPhase);
    console.log('- Project phase:', selectedProject?.phase);
  }, [selectedProject, currentPhase]);

  if (!selectedProject) {
    console.log('⏳ No selected project, showing loading...');
    return (
      <div className="p-6 text-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-500">Chargement du projet...</p>
      </div>
    );
  }

  const renderPhaseContent = () => {
    console.log('🎭 Rendering phase content for:', currentPhase);
    
    switch (currentPhase) {
      case 'programming':
        console.log('📝 Rendering ProgrammingPhase');
        return <ProgrammingPhase project={selectedProject} />;
      case 'preparation':
        console.log('📋 Rendering PreparationPhase');
        return <PreparationPhase project={selectedProject} />;
      case 'launch':
        console.log('🚀 Rendering LaunchPhase');
        return <LaunchPhase project={selectedProject} />;
      case 'response-preparation':
        console.log('📁 Rendering ResponsePreparationPhase');
        return <ResponsePreparationPhase project={selectedProject} />;
      case 'evaluation':
        console.log('📊 Rendering EvaluationPhase');
        return <EvaluationPhase project={selectedProject} />;
      case 'implementation':
        console.log('⚙️ Rendering ImplementationPhase');
        return <ImplementationPhase project={selectedProject} />;
      default:
        console.log('❌ Unknown phase:', currentPhase);
        return (
          <div className="p-6 text-center">
            <p className="text-gray-500">Phase non trouvée: {currentPhase}</p>
          </div>
        );
    }
  };

  return (
    <div className="h-full">
      {renderPhaseContent()}
    </div>
  );
};