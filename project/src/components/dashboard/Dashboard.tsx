import React from 'react';
import { ProjectCard } from './ProjectCard';
import { StatsCard } from './StatsCard';
import { useApp } from '../../contexts/AppContext';
import { BarChart3, FolderOpen, Target, TrendingUp, Calendar, DollarSign } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { projects } = useApp();

  const stats = {
    total: projects.length,
    totalBudget: projects.reduce((sum, p) => sum + (p.budget || 0), 0),
    averageProgress: Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / projects.length),
    activeProjects: projects.filter(p => p.progress > 0 && p.progress < 100).length,
    upcomingDeadlines: projects.filter(p => {
      if (!p.deadline) return false;
      const deadline = new Date(p.deadline);
      const today = new Date();
      const diffTime = deadline.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 30 && diffDays > 0;
    }).length,
    completedThisMonth: projects.filter(p => {
      if (p.progress !== 100) return false;
      // Simuler des projets terminés ce mois
      return Math.random() > 0.5;
    }).length
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        <StatsCard
          title="Total Projets"
          value={stats.total}
          icon={FolderOpen}
          color="blue"
        />
        <StatsCard
          title="Budget Total"
          value={`${(stats.totalBudget / 1000000).toFixed(1)}M`}
          icon={DollarSign}
          color="green"
          suffix="€"
        />
        <StatsCard
          title="Progression Moyenne"
          value={stats.averageProgress}
          icon={TrendingUp}
          color="purple"
          suffix="%"
        />
        <StatsCard
          title="Projets Actifs"
          value={stats.activeProjects}
          icon={Target}
          color="orange"
        />
        <StatsCard
          title="Échéances 30j"
          value={stats.upcomingDeadlines}
          icon={Calendar}
          color="yellow"
        />
        <StatsCard
          title="Terminés ce mois"
          value={stats.completedThisMonth}
          icon={BarChart3}
          color="teal"
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