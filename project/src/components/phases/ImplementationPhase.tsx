import React, { useState } from 'react';
import { Project } from '../../types';
import { CheckSquare, Calendar, Users, FileText, TrendingUp, User, Upload, ExternalLink, Send } from 'lucide-react';

interface ImplementationPhaseProps {
  project: Project;
}

export const ImplementationPhase: React.FC<ImplementationPhaseProps> = ({ project }) => {
  const [contract, setContract] = useState({
    number: 'CTR-2024-001',
    startDate: '2024-05-15',
    endDate: '2024-11-15',
    amount: 720000,
    status: 'active',
    file: null as File | null
  });

  const [keyRoles] = useState([
    { id: '1', role: 'Chef de Mission', name: 'Marie Dubois', company: 'TechSolutions SARL', assigned: true },
    { id: '2', role: 'Chef de Projet', name: 'Jean Martin', company: 'TechSolutions SARL', assigned: true },
    { id: '3', role: 'Expert Technique Senior', name: 'Sophie Laurent', company: 'TechSolutions SARL', assigned: false },
    { id: '4', role: 'Responsable Qualité', name: 'Pierre Durand', company: 'TechSolutions SARL', assigned: false }
  ]);

  const [deliverables, setDeliverables] = useState([
    { id: '1', title: 'Audit initial infrastructure', dueDate: '2024-06-15', status: 'completed', progress: 100 },
    { id: '2', title: 'Plan de migration', dueDate: '2024-07-01', status: 'in-progress', progress: 75 },
    { id: '3', title: 'Phase 1 - Migration serveurs', dueDate: '2024-08-15', status: 'pending', progress: 0 },
    { id: '4', title: 'Tests et validation', dueDate: '2024-09-30', status: 'pending', progress: 0 },
    { id: '5', title: 'Formation équipes', dueDate: '2024-10-15', status: 'pending', progress: 0 },
    { id: '6', title: 'Documentation finale', dueDate: '2024-11-15', status: 'pending', progress: 0 }
  ]);

  const [calendar, setCalendar] = useState({
    file: null as File | null,
    milestones: [
      { id: '1', title: 'Démarrage projet', date: '2024-05-15', completed: true },
      { id: '2', title: 'Livraison Phase 1', date: '2024-08-15', completed: false },
      { id: '3', title: 'Tests utilisateurs', date: '2024-09-30', completed: false },
      { id: '4', title: 'Mise en production', date: '2024-11-15', completed: false }
    ]
  });

  const [matchingOpen, setMatchingOpen] = useState(false);

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

  const handleContractUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setContract(prev => ({ ...prev, file }));
    }
  };

  const handleCalendarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCalendar(prev => ({ ...prev, file }));
    }
  };

  const openMatchingTool = () => {
    setMatchingOpen(true);
    // Simuler l'ouverture de l'outil de matching
    window.open('/matching-tool', '_blank');
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
        {/* Upload et gestion des contrats */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Contrats
          </h3>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-2">
                Télécharger le contrat signé
              </p>
              <input
                type="file"
                onChange={handleContractUpload}
                accept=".pdf,.doc,.docx"
                className="hidden"
                id="contract-upload"
              />
              <label
                htmlFor="contract-upload"
                className="btn-secondary text-sm cursor-pointer"
              >
                Choisir un fichier
              </label>
            </div>
            
            {contract.file && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-900">{contract.file.name}</span>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Numéro de contrat
                </label>
                <input
                  type="text"
                  value={contract.number}
                  onChange={(e) => setContract(prev => ({ ...prev, number: e.target.value }))}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Montant (€)
                </label>
                <input
                  type="number"
                  value={contract.amount}
                  onChange={(e) => setContract(prev => ({ ...prev, amount: parseInt(e.target.value) }))}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date de début
                </label>
                <input
                  type="date"
                  value={contract.startDate}
                  onChange={(e) => setContract(prev => ({ ...prev, startDate: e.target.value }))}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date de fin
                </label>
                <input
                  type="date"
                  value={contract.endDate}
                  onChange={(e) => setContract(prev => ({ ...prev, endDate: e.target.value }))}
                  className="input-field"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Upload et gestion du calendrier */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Calendrier
          </h3>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-2">
                Télécharger le planning détaillé
              </p>
              <input
                type="file"
                onChange={handleCalendarUpload}
                accept=".pdf,.xlsx,.xls,.mpp"
                className="hidden"
                id="calendar-upload"
              />
              <label
                htmlFor="calendar-upload"
                className="btn-secondary text-sm cursor-pointer"
              >
                Choisir un fichier
              </label>
            </div>

            {calendar.file && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-900">{calendar.file.name}</span>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <h4 className="font-medium text-gray-900">Jalons principaux</h4>
              {calendar.milestones.map(milestone => (
                <div key={milestone.id} className="flex items-center justify-between p-2 border border-gray-200 rounded">
                  <div className="flex items-center gap-2">
                    <CheckSquare className={`w-4 h-4 ${milestone.completed ? 'text-green-600' : 'text-gray-400'}`} />
                    <span className="text-sm">{milestone.title}</span>
                  </div>
                  <span className="text-xs text-gray-600">
                    {new Date(milestone.date).toLocaleDateString('fr-FR')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Outil de matching consultants */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Users className="w-5 h-5" />
            Affectation des rôles clés
          </h3>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Outil de Matching</h4>
              <p className="text-sm text-blue-800 mb-3">
                Utilisez l'outil de matching pour affecter automatiquement les consultants aux rôles clés
              </p>
              <button
                onClick={openMatchingTool}
                className="btn-primary text-sm flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                Ouvrir l'outil de matching
              </button>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Rôles clés</h4>
              {keyRoles.map(person => (
                <div key={person.id} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{person.role}</div>
                    <div className="text-sm text-gray-600">{person.name}</div>
                    <div className="text-xs text-gray-500">{person.company}</div>
                  </div>
                  <div className={`status-badge ${person.assigned ? 'status-completed' : 'status-pending'}`}>
                    {person.assigned ? 'Assigné' : 'En attente'}
                  </div>
                </div>
              ))}
            </div>
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

        {/* Calendrier et livrables */}
        <div className="card lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Livrables et échéances
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

        {/* Actions rapides */}
        <div className="card lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Gestion du projet</h3>
              <p className="text-sm text-gray-600 mt-1">
                Actions et outils pour le suivi de la mise en œuvre
              </p>
            </div>
            <div className="flex gap-3">
              <button className="btn-secondary">
                Générer rapport d'avancement
              </button>
              <button className="btn-secondary">
                Programmer réunion de suivi
              </button>
              <button className="btn-primary flex items-center gap-2">
                <Send className="w-4 h-4" />
                Marquer comme terminé
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};