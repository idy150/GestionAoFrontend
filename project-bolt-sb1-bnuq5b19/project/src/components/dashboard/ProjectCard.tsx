import React from 'react';
import { Calendar, User, DollarSign, Clock } from 'lucide-react';
import { Project } from '../../types';
import { useApp } from '../../contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { selectProject } = useApp();
  const navigate = useNavigate();

  const handleProjectClick = () => {
    // Sélectionner le projet dans le contexte
    selectProject(project);
    // Naviguer vers la page du projet (qui affichera automatiquement la phase actuelle)
    navigate(`/project/${project.id}`);
  };

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'active': return 'status-active';
      case 'pending': return 'status-pending';
      case 'completed': return 'status-completed';
      case 'delayed': return 'status-delayed';
      default: return 'status-pending';
    }
  };

  const getStatusText = (status: Project['status']) => {
    switch (status) {
      case 'active': return 'En cours';
      case 'pending': return 'En attente';
      case 'completed': return 'Terminé';
      case 'delayed': return 'En retard';
      default: return 'En attente';
    }
  };

  const getTypeColor = (type: Project['type']) => {
    switch (type) {
      case 'AO': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'AMI': return 'bg-green-100 text-green-800 border-green-200';
      case 'DP': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div
      onClick={handleProjectClick}
      className="card card-interactive fade-in"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <span className={`status-badge border ${getTypeColor(project.type)}`}>
              {project.type}
            </span>
            <span className={`status-badge ${getStatusColor(project.status)}`}>
              {getStatusText(project.status)}
            </span>
          </div>
          <h3 className="section-subtitle mb-2">{project.name}</h3>
          <p className="section-description">{project.structure}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Progression</span>
          <span className="font-semibold text-gray-900">{project.progress}%</span>
        </div>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${project.progress}%` }}
          />
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>{format(new Date(project.launchDate), 'dd MMM yyyy', { locale: fr })}</span>
          </div>
          
          <div className="flex items-center gap-2 text-gray-600">
            <User className="w-4 h-4" />
            <span className="truncate">{project.responsible}</span>
          </div>

          {project.budget && (
            <div className="flex items-center gap-2 text-gray-600">
              <DollarSign className="w-4 h-4" />
              <span>{project.budget.toLocaleString('fr-FR')} €</span>
            </div>
          )}

          {project.deadline && (
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-4 h-4" />
              <span>{format(new Date(project.deadline), 'dd MMM yyyy', { locale: fr })}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};