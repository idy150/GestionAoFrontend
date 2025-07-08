import React, { useState } from 'react';
import { Rocket, Globe, FileText, Users, Calendar, ExternalLink, Send } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

export const LaunchPhase = ({ project }) => {
  const { advanceToNextPhase } = useApp();
  const [launchData, setLaunchData] = useState({
    launchDate: '2024-03-01',
    submissionDate: '2024-04-01',
    platform: 'kdrive',
    publicationChannels: ['official-journal', 'website', 'email']
  });

  const [documents] = useState([
    { id: '1', name: 'Cahier des charges technique.pdf', type: 'technique', status: 'finalized' },
    { id: '2', name: 'Règlement consultation.pdf', type: 'administratif', status: 'finalized' },
    { id: '3', name: 'Modèle réponse financière.xlsx', type: 'financier', status: 'finalized' }
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const channels = [
    { id: 'official-journal', name: 'Journal Officiel', required: true },
    { id: 'website', name: 'Site web institutionnel', required: false },
    { id: 'email', name: 'Liste de diffusion', required: false },
    { id: 'partners', name: 'Réseau partenaires', required: false }
  ];

  const handleLaunch = async () => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    advanceToNextPhase(project.id);
    setIsSubmitting(false);
  };

  const isFormValid = launchData.launchDate && launchData.submissionDate &&
    documents.every(doc => doc.status === 'finalized');

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-3">
          <Rocket className="w-8 h-8 text-blue-600" />
          Phase de Lancement
        </h1>
        <p className="text-gray-600">
          Publication et diffusion de l'appel d'offres {project.name}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Dates de lancement */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Dates importantes
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date de lancement
              </label>
              <input
                type="date"
                value={launchData.launchDate}
                onChange={e => setLaunchData(prev => ({ ...prev, launchDate: e.target.value }))}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date limite de dépôt
              </label>
              <input
                type="date"
                value={launchData.submissionDate}
                onChange={e => setLaunchData(prev => ({ ...prev, submissionDate: e.target.value }))}
                className="input-field"
              />
            </div>
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-2 text-blue-800 text-sm font-medium mb-1">
                <Calendar className="w-4 h-4" />
                Durée de consultation
              </div>
              <p className="text-blue-700 text-sm">
                31 jours calendaires (conforme aux exigences réglementaires)
              </p>
            </div>
          </div>
        </div>

        {/* Canaux de publication */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Canaux de publication
          </h3>
          <div className="space-y-3">
            {channels.map(channel => (
              <label key={channel.id} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={launchData.publicationChannels.includes(channel.id)}
                  onChange={e => {
                    if (e.target.checked) {
                      setLaunchData(prev => ({
                        ...prev,
                        publicationChannels: [...prev.publicationChannels, channel.id]
                      }));
                    } else {
                      setLaunchData(prev => ({
                        ...prev,
                        publicationChannels: prev.publicationChannels.filter(c => c !== channel.id)
                      }));
                    }
                  }}
                  className="text-blue-600"
                  disabled={channel.required}
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">{channel.name}</span>
                    {channel.required && (
                      <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                        Obligatoire
                      </span>
                    )}
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Documents de consultation */}
        <div className="card lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Documents de consultation
            </h3>
            <button className="btn-secondary">
              Accéder à kDrive
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Document</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Type</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Statut</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {documents.map(doc => (
                  <tr key={doc.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="font-medium text-gray-900">{doc.name}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`status-badge ${
                        doc.type === 'technique' ? 'bg-blue-100 text-blue-800' :
                        doc.type === 'administratif' ? 'bg-green-100 text-green-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {doc.type}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`status-badge ${
                        doc.status === 'finalized' ? 'status-completed' : 'status-pending'
                      }`}>
                        {doc.status === 'finalized' ? 'Finalisé' : 'Brouillon'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1">
                        <ExternalLink className="w-3 h-3" />
                        Ouvrir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Intégration kDrive */}
        <div className="card lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Users className="w-5 h-5" />
            Gestion des dossiers de réponse
          </h3>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="font-medium text-gray-900">Dossier kDrive configuré</h4>
                <p className="text-sm text-gray-600">
                  /Projets/2024/{project.name}/Réponses/
                </p>
              </div>
              <button className="btn-secondary flex items-center gap-2">
                <ExternalLink className="w-4 h-4" />
                Accéder
              </button>
            </div>
            <div className="text-sm text-gray-600">
              Les candidats pourront déposer leurs réponses dans des sous-dossiers automatiquement créés
            </div>
          </div>
        </div>

        {/* Actions de lancement */}
        <div className="card lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Lancement de la consultation</h3>
              <p className="text-sm text-gray-600 mt-1">
                Une fois lancée, la consultation sera publiée sur tous les canaux sélectionnés
              </p>
            </div>
            <div className="flex gap-3">
              <button className="btn-secondary">
                Prévisualiser
              </button>
              <button
                onClick={handleLaunch}
                disabled={!isFormValid || isSubmitting}
                className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Lancement...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Lancer et passer à Préparation Réponse
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
