import React from 'react';
import { ProjectCard } from './ProjectCard';
import { StatsCard } from './StatsCard';
import { useApp } from '../../contexts/AppContext';
import { BarChart3, FolderOpen, Clock, CheckCircle } from 'lucide-react';

 const Dashboard = () => {
  const { projects } = useApp();

  const stats = {
    total: projects.length,
    active: projects.filter(p => p.status === 'active').length,
    pending: projects.filter(p => p.status === 'pending').length,
    completed: projects.filter(p => p.status === 'completed').length
  };

  return (
    <div className="p-6 space-y-8">
      <div className="section-header">
        <div>
          <h1 className="section-title">
            Tableau de bord
          </h1>
          <p className="section-description mt-2">
            Vue d'ensemble de vos projets d'appels d'offres
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Projets"
          value={stats.total}
          icon={FolderOpen}
          color="blue"
        />
        <StatsCard
          title="En Cours"
          value={stats.active}
          icon={BarChart3}
          color="green"
        />
        <StatsCard
          title="En Attente"
          value={stats.pending}
          icon={Clock}
          color="yellow"
        />
        <StatsCard
          title="Terminés"
          value={stats.completed}
          icon={CheckCircle}
          color="purple"
        />
      </div>

      <div className="section">
        <div className="section-header">
          <h2 className="section-subtitle">
            Projets récents
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Dashboard;