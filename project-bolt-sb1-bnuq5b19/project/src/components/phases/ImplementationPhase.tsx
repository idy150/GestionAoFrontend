import React, { useState } from 'react';
import { Project } from '../../types';
import { CheckSquare, Calendar, Users, FileText, TrendingUp, User } from 'lucide-react';

interface ImplementationPhaseProps {
  project: Project;
}

export const ImplementationPhase: React.FC<ImplementationPhaseProps> = ({ project }) => {
  const [contract, setContract] = useState({
    number: 'CTR-2024-001',
    startDate: '2024-05-15',
    endDate: '2024-11-15',
    amount: 720000,
    status: 'active'
  });

  const [keyRoles] = useState([
    { id: '1', role: 'Chef de Mission', name: 'Marie Dubois', company: 'TechSolutions SARL' },
    { id: '2', role: 'Chef de Projet', name: 'Jean Martin', company: 'TechSolutions SARL' },
    { id: '3', role: 'Expert Technique Senior', name: 'Sophie Laurent', company: 'TechSolutions SARL' },
    { id: '4', role: 'Responsable Qualité', name: 'Pierre Durand', company: 'TechSolutions SARL' }
  ]);

  const [deliverables] = useState([
    { id: '1', title: 'Audit initial infrastructure', dueDate: '2024-06-15', status: 'completed', progress: 100 },
    { id: '2', title: 'Plan de migration', dueDate: '2024-07-01', status: 'in-progress', progress: 75 },
    { id: '3', title: 'Phase 1 - Migration serveurs', dueDate: '2024-08-15', status: 'pending', progress: 0 },
    { id: '4', title: 'Tests et validation', dueDate: '2024-09-30', status: 'pending', progress: 0 },
    { id: '5', title: 'Formation équipes', dueDate: '2024-10-15', status: 'pending', progress: 0 },
    { id: '6', title: 'Documentation finale', dueDate: '2024-11-15', status: 'pending', progress: 0 }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'status-completed';
      case 'in-progress': return 'status-active';
      case 'pending': return 'status-pending';
      case 'delayed': return 'status-delayed';
      default: return 'status-pending';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Terminé';
      case 'in-progress': return 'En cours';
      case 'pending': return 'En attente';
      case 'delayed': return 'En retard';
      default: return 'En attente';
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-3">
          <CheckSquare className="w-8 h-8 text-blue-600" />
          Phase de Mise en œuvre
        </h1>
        <p className="text-gray-600">
          Suivi de l'exécution du contrat pour {project.name}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Informations du contrat */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Contrat
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Numéro de contrat
                </label>
                <div className="p-2 bg-gray-50 rounded-lg font-mono text-sm">
                  {contract.number}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Montant
                </label>
                <div className="p-2 bg-gray-50 rounded-lg font-semibold">
                  {contract.amount.toLocaleString('fr-FR')} €
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date de début
                </label>
                <div className="p-2 bg-gray-50 rounded-lg">
                  {new Date(contract.startDate).toLocaleDateString('fr-FR')}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date de fin
                </label>
                <div className="p-2 bg-gray-50 rounded-lg">
                  {new Date(contract.endDate).toLocaleDateString('fr-FR')}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
              <span className="text-sm font-medium text-green-900">Statut du contrat</span>
              <span className="status-badge status-active">Actif</span>
            </div>
          </div>
        </div>

        {/* Équipe projet */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Users className="w-5 h-5" />
            Équipe projet
          </h3>
          <div className="space-y-3">
            {keyRoles.map(person => (
              <div key={person.id} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{person.name}</div>
                  <div className="text-sm text-gray-600">{person.role}</div>
                  <div className="text-xs text-gray-500">{person.company}</div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 btn-secondary">
            Accéder à l'outil de matching
          </button>
        </div>

        {/* Calendrier et livrables */}
        <div className="card lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Calendrier des livrables
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Livrable</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Échéance</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Statut</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Progression</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {deliverables.map(deliverable => (
                  <tr key={deliverable.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="font-medium text-gray-900">{deliverable.title}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm text-gray-600">
                        {new Date(deliverable.dueDate).toLocaleDateString('fr-FR')}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`status-badge ${getStatusColor(deliverable.status)}`}>
                        {getStatusText(deliverable.status)}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${deliverable.progress}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600">{deliverable.progress}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <button className="text-blue-600 hover:text-blue-800 text-sm">
                        Détails
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Indicateurs de performance */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Indicateurs
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <span className="text-sm font-medium text-blue-900">Progression globale</span>
              <span className="text-lg font-bold text-blue-900">42%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="text-sm font-medium text-green-900">Livrables à l'heure</span>
              <span className="text-lg font-bold text-green-900">100%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <span className="text-sm font-medium text-purple-900">Budget consommé</span>
              <span className="text-lg font-bold text-purple-900">35%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
              <span className="text-sm font-medium text-orange-900">Temps écoulé</span>
              <span className="text-lg font-bold text-orange-900">28%</span>
            </div>
          </div>
        </div>

        {/* Actions rapides */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Actions rapides
          </h3>
          <div className="space-y-3">
            <button className="w-full btn-secondary text-left">
              Générer rapport d'avancement
            </button>
            <button className="w-full btn-secondary text-left">
              Programmer réunion de suivi
            </button>
            <button className="w-full btn-secondary text-left">
              Accéder aux documents contractuels
            </button>
            <button className="w-full btn-secondary text-left">
              Consulter les factures
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};