import React, { useState } from 'react';
import { Project } from '../../types';
import { Calendar, FileText, Users, Clock, Search, Send, Plus, ExternalLink, AlertCircle } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

interface PreparationPhaseProps {
  project: Project;
}

export const PreparationPhase: React.FC<PreparationPhaseProps> = ({ project }) => {
  const { advanceToNextPhase, updateProject } = useApp();
  
  const [method, setMethod] = useState<'AMI' | 'AOR'>('AOR');
  const [references, setReferences] = useState([
    { id: '1', title: 'Projet similaire - Région Nord', selected: true, score: 85 },
    { id: '2', title: 'Infrastructure Cloud - 2023', selected: true, score: 92 },
    { id: '3', title: 'Modernisation IT - Secteur Public', selected: false, score: 78 }
  ]);

  const [keyDates, setKeyDates] = useState({
    preparation: '2024-02-15',
    publication: '2024-03-01',
    questions: '2024-03-15',
    responses: '2024-04-01',
    evaluation: '2024-04-15',
    decision: '2024-05-01'
  });

  const [additionalCriteria, setAdditionalCriteria] = useState([
    { id: '1', name: 'Délai de livraison', description: 'Respect des échéances' },
    { id: '2', name: 'Support technique', description: 'Qualité du support post-livraison' }
  ]);

  const [newCriterion, setNewCriterion] = useState({ name: '', description: '' });
  const [hasPartner, setHasPartner] = useState(false);
  const [partnerAdded, setPartnerAdded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addCriterion = () => {
    if (newCriterion.name && newCriterion.description) {
      setAdditionalCriteria(prev => [...prev, {
        id: Date.now().toString(),
        ...newCriterion
      }]);
      setNewCriterion({ name: '', description: '' });
    }
  };

  const removeCriterion = (id: string) => {
    setAdditionalCriteria(prev => prev.filter(c => c.id !== id));
  };

  const handleSubmit = async () => {
    if (!isFormValid) return;
    
    setIsSubmitting(true);

    // Sauvegarder les données de préparation
    updateProject(project.id, {
      extractedData: {
        ...project.extractedData,
        method,
        keyDates,
        references: references.filter(r => r.selected),
        additionalCriteria,
        hasPartner
      }
    });

    // Simuler le traitement
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Passer à la phase suivante
    advanceToNextPhase(project.id);
    
    setIsSubmitting(false);
  };

  const isFormValid = references.some(r => r.selected) && keyDates.publication && keyDates.responses;

  return (
    <div className="p-6 space-y-8">
      <div className="section-header">
        <div>
          <h1 className="section-title flex items-center gap-3">
            <FileText className="w-8 h-8 text-blue-600" />
            Phase de Préparation
          </h1>
          <p className="section-description mt-2">
            Préparation des documents et planification pour {project.name}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sélection de la méthode */}
        <div className="card">
          <h3 className="section-subtitle mb-4">
            Méthode de procédure
          </h3>
          <div className="space-y-3">
            <label className="list-item cursor-pointer hover:border-blue-300">
              <input
                type="radio"
                name="method"
                value="AMI"
                checked={method === 'AMI'}
                onChange={(e) => setMethod(e.target.value as 'AMI')}
                className="text-blue-600"
              />
              <div className="flex-1">
                <div className="font-medium text-gray-900">Appel à Manifestation d'Intérêt (AMI)</div>
                <div className="text-sm text-gray-600">Sélection préalable de candidats</div>
              </div>
            </label>
            <label className="list-item cursor-pointer hover:border-blue-300">
              <input
                type="radio"
                name="method"
                value="AOR"
                checked={method === 'AOR'}
                onChange={(e) => setMethod(e.target.value as 'AOR')}
                className="text-blue-600"
              />
              <div className="flex-1">
                <div className="font-medium text-gray-900">Appel d'Offres Restreint (AOR)</div>
                <div className="text-sm text-gray-600">Procédure complète avec candidatures</div>
              </div>
            </label>
          </div>
        </div>

        {/* Dates clés */}
        <div className="card">
          <h3 className="section-subtitle mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Planification
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="form-label">
                  Fin préparation
                </label>
                <input
                  type="date"
                  value={keyDates.preparation}
                  onChange={(e) => setKeyDates(prev => ({ ...prev, preparation: e.target.value }))}
                  className="input-field"
                />
              </div>
              <div>
                <label className="form-label">
                  Publication AO *
                </label>
                <input
                  type="date"
                  value={keyDates.publication}
                  onChange={(e) => setKeyDates(prev => ({ ...prev, publication: e.target.value }))}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="form-label">
                  Limite questions
                </label>
                <input
                  type="date"
                  value={keyDates.questions}
                  onChange={(e) => setKeyDates(prev => ({ ...prev, questions: e.target.value }))}
                  className="input-field"
                />
              </div>
              <div>
                <label className="form-label">
                  Limite réponses *
                </label>
                <input
                  type="date"
                  value={keyDates.responses}
                  onChange={(e) => setKeyDates(prev => ({ ...prev, responses: e.target.value }))}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="form-label">
                  Fin évaluation
                </label>
                <input
                  type="date"
                  value={keyDates.evaluation}
                  onChange={(e) => setKeyDates(prev => ({ ...prev, evaluation: e.target.value }))}
                  className="input-field"
                />
              </div>
              <div>
                <label className="form-label">
                  Décision finale
                </label>
                <input
                  type="date"
                  value={keyDates.decision}
                  onChange={(e) => setKeyDates(prev => ({ ...prev, decision: e.target.value }))}
                  className="input-field"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Critères supplémentaires */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="section-subtitle">
              Critères supplémentaires
            </h3>
            <button
              onClick={addCriterion}
              disabled={!newCriterion.name || !newCriterion.description}
              className="btn-secondary text-sm flex items-center gap-1"
            >
              <Plus className="w-3 h-3" />
              Ajouter
            </button>
          </div>
          
          <div className="space-y-3 mb-4">
            {additionalCriteria.map(criterion => (
              <div key={criterion.id} className="list-item">
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{criterion.name}</div>
                  <div className="text-sm text-gray-600">{criterion.description}</div>
                </div>
                <button
                  onClick={() => removeCriterion(criterion.id)}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Supprimer
                </button>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <input
              type="text"
              value={newCriterion.name}
              onChange={(e) => setNewCriterion(prev => ({ ...prev, name: e.target.value }))}
              className="input-field"
              placeholder="Nom du critère"
            />
            <input
              type="text"
              value={newCriterion.description}
              onChange={(e) => setNewCriterion(prev => ({ ...prev, description: e.target.value }))}
              className="input-field"
              placeholder="Description du critère"
            />
          </div>
        </div>

        {/* Gestion des partenaires */}
        <div className="card">
          <h3 className="section-subtitle mb-4 flex items-center gap-2">
            <Users className="w-5 h-5" />
            Partenaires
          </h3>
          <div className="space-y-4">
            <div>
              <label className="form-label mb-3">
                Ajouter un partenaire ?
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="hasPartner"
                    checked={hasPartner === true}
                    onChange={() => setHasPartner(true)}
                    className="text-blue-600"
                  />
                  <span>Oui</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="hasPartner"
                    checked={hasPartner === false}
                    onChange={() => {
                      setHasPartner(false);
                      setPartnerAdded(false);
                    }}
                    className="text-blue-600"
                  />
                  <span>Non</span>
                </label>
              </div>
            </div>

            {hasPartner && (
              <div className="space-y-3">
                <button 
                  className="w-full btn-secondary flex items-center justify-center gap-2"
                  onClick={() => {
                    window.open('/partners-app', '_blank');
                    setPartnerAdded(true);
                  }}
                >
                  <ExternalLink className="w-4 h-4" />
                  Lien vers application Partenaires
                </button>
                
                {partnerAdded && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="text-sm text-green-800">
                      ✓ Partenaire ajouté avec succès
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Références */}
        <div className="card lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="section-subtitle flex items-center gap-2">
              <Search className="w-5 h-5" />
              Références et projets similaires
            </h3>
            <button className="btn-secondary">
              Rechercher nouvelles références
            </button>
          </div>
          
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Sélection</th>
                  <th>Référence</th>
                  <th>Score de similarité</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {references.map(ref => (
                  <tr key={ref.id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={ref.selected}
                        onChange={(e) => {
                          setReferences(prev =>
                            prev.map(r =>
                              r.id === ref.id ? { ...r, selected: e.target.checked } : r
                            )
                          );
                        }}
                        className="text-blue-600"
                      />
                    </td>
                    <td>
                      <div className="font-medium text-gray-900">{ref.title}</div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${ref.score}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600">{ref.score}%</span>
                      </div>
                    </td>
                    <td>
                      <button className="text-blue-600 hover:text-blue-800 text-sm">
                        Voir détails
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Actions de validation */}
        <div className="card lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="section-subtitle">Validation de la préparation</h3>
              <p className="section-description mt-1">
                Vérifiez tous les éléments avant de passer à la phase de lancement
              </p>
            </div>
            <div className="flex gap-3">
              <button className="btn-secondary">
                Sauvegarder brouillon
              </button>
              <button
                onClick={handleSubmit}
                disabled={!isFormValid || isSubmitting}
                className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Traitement...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Envoyer vers Lancement
                  </>
                )}
              </button>
            </div>
          </div>

          {!isFormValid && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="text-sm text-yellow-800 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                Veuillez sélectionner au moins une référence et définir les dates de publication et de réponse
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};