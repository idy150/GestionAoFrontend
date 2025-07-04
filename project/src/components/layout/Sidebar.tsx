import React from 'react';
import { 
  Calendar, 
  FileText, 
  Rocket, 
  ClipboardCheck, 
  BarChart3, 
  CheckSquare,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { ProjectPhase } from '../../types';

const phases = [
  {
    id: 'programming' as ProjectPhase,
    name: 'Programmation',
    icon: Calendar,
    description: 'Définition du projet et validation initiale'
  },
  {
    id: 'preparation' as ProjectPhase,
    name: 'Préparation',
    icon: FileText,
    description: 'Préparation des documents et planification'
  },
  {
    id: 'launch' as ProjectPhase,
    name: 'Lancement',
    icon: Rocket,
    description: 'Publication et diffusion de l\'appel d\'offres'
  },
  {
    id: 'response-preparation' as ProjectPhase,
    name: 'Préparation Réponse',
    icon: ClipboardCheck,
    description: 'Collecte et préparation des réponses'
  },
  {
    id: 'evaluation' as ProjectPhase,
    name: 'Évaluation',
    icon: BarChart3,
    description: 'Analyse et évaluation des offres'
  },
  {
    id: 'implementation' as ProjectPhase,
    name: 'Mise en œuvre',
    icon: CheckSquare,
    description: 'Exécution et suivi du contrat'
  }
];

export const Sidebar: React.FC = () => {
  const { currentPhase, setCurrentPhase, sidebarCollapsed, toggleSidebar, selectedProject } = useApp();

  return (
    <div className={`bg-white border-r border-gray-200 transition-all duration-300 ${
      sidebarCollapsed ? 'w-16' : 'w-80'
    } flex flex-col`}>
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        {!sidebarCollapsed && (
          <div className="fade-in">
            <h2 className="section-subtitle">Navigation</h2>
            {selectedProject && (
              <p className="text-sm text-gray-600 truncate mt-1">{selectedProject.name}</p>
            )}
          </div>
        )}
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          {sidebarCollapsed ? 
            <ChevronRight className="w-4 h-4" /> : 
            <ChevronLeft className="w-4 h-4" />
          }
        </button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
        <nav className="space-y-2">
          {phases.map((phase) => {
            const Icon = phase.icon;
            const isActive = currentPhase === phase.id;
            
            return (
              <button
                key={phase.id}
                onClick={() => setCurrentPhase(phase.id)}
                className={`nav-item w-full ${isActive ? 'active' : ''}`}
                title={sidebarCollapsed ? phase.name : ''}
              >
                <Icon className={`w-5 h-5 flex-shrink-0 ${
                  isActive ? 'text-white' : 'text-gray-500'
                }`} />
                {!sidebarCollapsed && (
                  <div className="flex-1 min-w-0 text-left">
                    <div className="font-medium truncate">{phase.name}</div>
                    <div className="text-xs opacity-75 truncate">
                      {phase.description}
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {!sidebarCollapsed && selectedProject && (
        <div className="p-4 border-t border-gray-200">
          <div className="card p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-700">Progression</span>
              <span className="text-sm text-gray-600">{selectedProject.progress}%</span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${selectedProject.progress}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};