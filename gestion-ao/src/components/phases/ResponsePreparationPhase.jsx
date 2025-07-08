import React, { useState } from 'react';
import { FolderOpen, CheckSquare, FileText, Users, Download, Upload, Send, ExternalLink } from 'lucide-react';

export const ResponsePreparationPhase = ({ project, advanceToNextPhase }) => {
  const [folders] = useState([
    { id: 'admin', name: 'Administratif', path: '/Projets/2024/ModInfra/Administratif', files: 8, hasPartnerAccess: false },
    { id: 'tech', name: 'Technique', path: '/Projets/2024/ModInfra/Technique', files: 12, hasPartnerAccess: true },
    { id: 'finance', name: 'Financier', path: '/Projets/2024/ModInfra/Financier', files: 5, hasPartnerAccess: false },
    { id: 'partners', name: 'Partenaires', path: '/Projets/2024/ModInfra/Partenaires', files: 15, hasPartnerAccess: true }
  ]);

  const [deliverables, setDeliverables] = useState([
    { id: '1', title: 'Mémoire technique', category: 'technique', required: true, completed: true },
    { id: '2', title: 'Offre financière', category: 'financier', required: true, completed: true },
    { id: '3', title: 'Attestation assurance', category: 'administratif', required: true, completed: true },
    { id: '4', title: 'Références projets similaires', category: 'technique', required: true, completed: true },
    { id: '5', title: 'Planning détaillé', category: 'technique', required: false, completed: true }
  ]);

  const [validationChecklist, setValidationChecklist] = useState([
    { id: '1', item: 'Tous les documents obligatoires présents', completed: true },
    { id: '2', item: 'Cohérence technique vérifiée', completed: true },
    { id: '3', item: 'Offre financière complète', completed: true },
    { id: '4', item: 'Validation responsable technique', completed: true },
    { id: '5', item: 'Validation responsable financier', completed: true }
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleDeliverable = (id) => {
    setDeliverables(prev =>
      prev.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const toggleValidationItem = (id) => {
    setValidationChecklist(prev =>
      prev.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleValidateAndSubmit = async () => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    advanceToNextPhase(project.id);
    setIsSubmitting(false);
  };

  const isFormValid = deliverables.filter(d => d.required).every(d => d.completed) &&
                     validationChecklist.every(v => v.completed);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-3">
          <FolderOpen className="w-8 h-8 text-blue-600" />
          Phase de Préparation de Réponse
        </h1>
        <p className="text-gray-600">
          Collecte et validation des documents pour {project.name}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Accès aux dossiers kDrive */}
        <div className="card lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FolderOpen className="w-5 h-5" />
            Dossiers de travail (kDrive)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {folders.map(folder => (
              <div key={folder.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FolderOpen className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{folder.name}</h4>
                    <p className="text-sm text-gray-600">{folder.files} fichiers</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mb-3 truncate">{folder.path}</p>
                {folder.hasPartnerAccess && (
                  <div className="mb-3 p-2 bg-green-50 border border-green-200 rounded text-xs text-green-800">
                    <Users className="w-3 h-3 inline mr-1" />
                    Accès partenaire activé
                  </div>
                )}
                <button className="w-full btn-secondary text-sm flex items-center justify-center gap-2">
                  <ExternalLink className="w-3 h-3" />
                  Accéder au dossier
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Livrables attendus */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Livrables attendus
          </h3>
          <div className="space-y-3">
            {deliverables.map(deliverable => (
              <div key={deliverable.id} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <button
                  onClick={() => toggleDeliverable(deliverable.id)}
                  className="flex-shrink-0"
                >
                  <CheckSquare className={`w-5 h-5 ${
                    deliverable.completed ? 'text-green-600' : 'text-gray-400'
                  }`} />
                </button>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`${deliverable.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                      {deliverable.title}
                    </span>
                    {deliverable.required && (
                      <span className="text-xs text-red-600">*</span>
                    )}
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    deliverable.category === 'technique' ? 'bg-blue-100 text-blue-800' :
                    deliverable.category === 'financier' ? 'bg-purple-100 text-purple-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {deliverable.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Checklist de validation */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <CheckSquare className="w-5 h-5" />
            Checklist de validation
          </h3>
          <div className="space-y-3">
            {validationChecklist.map(item => (
              <div key={item.id} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <button
                  onClick={() => toggleValidationItem(item.id)}
                  className="flex-shrink-0"
                >
                  <CheckSquare className={`w-5 h-5 ${
                    item.completed ? 'text-green-600' : 'text-gray-400'
                  }`} />
                </button>
                <span className={`${item.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                  {item.item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Upload de documents */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Dépôt de documents
          </h3>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-2">
                Glissez vos documents ici ou cliquez pour sélectionner
              </p>
              <button className="btn-secondary text-sm">
                Choisir des fichiers
              </button>
            </div>
            <div className="text-xs text-gray-500">
              Formats acceptés: PDF, DOC, DOCX, XLS, XLSX (max 10MB par fichier)
            </div>
          </div>
        </div>

        {/* Extraction automatique */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Download className="w-5 h-5" />
            Extraction automatique
          </h3>
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-1">Documents détectés</h4>
              <p className="text-sm text-blue-800">
                3 documents PDF analysés automatiquement
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Mémoire technique (25 pages)</span>
                <button className="text-blue-600 hover:text-blue-800">Extraire</button>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Offre financière (8 pages)</span>
                <button className="text-blue-600 hover:text-blue-800">Extraire</button>
              </div>
            </div>
          </div>
        </div>

        {/* Gestion des partenaires */}
        <div className="card lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Users className="w-5 h-5" />
            Accès partenaires
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-medium text-green-900 mb-2">Partenaire Technique</h4>
              <p className="text-sm text-green-800 mb-3">
                Accès aux dossiers Technique et Partenaires
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span>Dépôt documents</span>
                  <span className="text-green-600">✓ Autorisé</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Validation</span>
                  <span className="text-green-600">✓ Autorisé</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Commentaires</span>
                  <span className="text-green-600">✓ Autorisé</span>
                </div>
              </div>
            </div>
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Notifications</h4>
              <p className="text-sm text-blue-800 mb-3">
                Les partenaires sont notifiés automatiquement
              </p>
              <button className="btn-secondary text-sm w-full">
                Envoyer notification manuelle
              </button>
            </div>
          </div>
        </div>

        {/* Validation finale */}
        <div className="card lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Validation finale de la réponse</h3>
              <p className="text-sm text-gray-600 mt-1">
                Vérifiez que tous les éléments sont complets avant de passer à l'évaluation
              </p>
            </div>
            <div className="flex gap-3">
              <button className="btn-secondary">
                Générer récapitulatif
              </button>
              <button
                onClick={handleValidateAndSubmit}
                disabled={!isFormValid || isSubmitting}
                className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Validation...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Valider et passer à Évaluation
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
