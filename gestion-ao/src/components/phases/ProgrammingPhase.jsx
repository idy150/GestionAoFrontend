import React, { useState } from 'react';
import { CheckSquare, Users, DollarSign, Target, Send, Plus, ExternalLink, AlertCircle } from 'lucide-react';

export const ProgrammingPhase = ({ project, advanceToNextPhase, updateProject }) => {
  const [formData, setFormData] = useState({
    bailleur: project.extractedData?.bailleur || '',
    budget: project.budget || 0,
    hasPartner: false,
    partnerSelected: false,
  });

  const [criteria, setCriteria] = useState([
    { id: '1', name: 'Expertise technique', weight: 40, description: 'Compétences et expérience requises' },
    { id: '2', name: 'Méthodologie', weight: 30, description: 'Approche et organisation du projet' },
    { id: '3', name: 'Prix', weight: 20, description: 'Offre financière compétitive' },
    { id: '4', name: 'Références', weight: 10, description: 'Projets similaires réalisés' },
  ]);

  const [newCriterion, setNewCriterion] = useState({ name: '', weight: 0, description: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addCriterion = () => {
    if (newCriterion.name && newCriterion.weight > 0) {
      setCriteria(prev => [...prev, {
        id: Date.now().toString(),
        ...newCriterion,
      }]);
      setNewCriterion({ name: '', weight: 0, description: '' });
    }
  };

  const removeCriterion = (id) => {
    setCriteria(prev => prev.filter(c => c.id !== id));
  };

  const updateCriterionWeight = (id, weight) => {
    setCriteria(prev =>
      prev.map(c => c.id === id ? { ...c, weight } : c)
    );
  };

  const totalWeight = criteria.reduce((sum, c) => sum + c.weight, 0);

  const isFormValid = formData.bailleur.trim() !== '' && formData.budget > 0 && totalWeight === 100;

  const handleSubmit = async () => {
    if (!isFormValid) return;

    setIsSubmitting(true);

    try {
      // Mise à jour projet (simulée ici)
      updateProject(project.id, {
        budget: formData.budget,
        extractedData: {
          ...project.extractedData,
          bailleur: formData.bailleur,
          criteria: criteria.map(c => `${c.name} - ${c.weight}%`),
          hasPartner: formData.hasPartner,
        },
      });

      // Simuler traitement (2s)
      await new Promise(resolve => setTimeout(resolve, 2000));

      advanceToNextPhase(project.id);

    } catch (error) {
      console.error('Erreur lors de la soumission :', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 space-y-8">
      <div className="section-header">
        <div>
          <h1 className="section-title flex items-center gap-3">
            <Target className="w-8 h-8 text-blue-600" />
            Phase de Programmation
          </h1>
          <p className="section-description mt-2">
            Configuration initiale et définition des critères pour {project.name}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Infos projet */}
        <div className="card">
          <h3 className="section-subtitle mb-4 flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Informations du projet
          </h3>
          <div className="space-y-4">
            <div>
              <label className="form-label">Bailleur *</label>
              <input
                type="text"
                value={formData.bailleur}
                onChange={(e) => setFormData(prev => ({ ...prev, bailleur: e.target.value }))}
                className="input-field"
                placeholder="Nom du bailleur"
                required
              />
              {project.extractedData?.bailleur && (
                <p className="form-help">
                  Valeur extraite: {project.extractedData.bailleur}
                </p>
              )}
            </div>

            <div>
              <label className="form-label">Budget (€) *</label>
              <input
                type="number"
                value={formData.budget}
                onChange={(e) => setFormData(prev => ({ ...prev, budget: parseInt(e.target.value) || 0 }))}
                className="input-field"
                placeholder="Budget du projet"
                required
                min="1"
              />
              {project.extractedData?.budget && (
                <p className="form-help">
                  Valeur extraite: {project.extractedData.budget.toLocaleString('fr-FR')} €
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Partenaires */}
        <div className="card">
          <h3 className="section-subtitle mb-4 flex items-center gap-2">
            <Users className="w-5 h-5" />
            Partenaires
          </h3>
          <div className="space-y-4">
            <div>
              <label className="form-label mb-3">Souhaitez-vous ajouter un partenaire ?</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="hasPartner"
                    checked={formData.hasPartner === true}
                    onChange={() => setFormData(prev => ({ ...prev, hasPartner: true }))}
                    className="text-blue-600"
                  />
                  <span>Oui</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="hasPartner"
                    checked={formData.hasPartner === false}
                    onChange={() => setFormData(prev => ({ ...prev, hasPartner: false, partnerSelected: false }))}
                    className="text-blue-600"
                  />
                  <span>Non</span>
                </label>
              </div>
            </div>

            {formData.hasPartner && (
              <div className="space-y-3">
                <button
                  type="button"
                  className="w-full btn-secondary flex items-center justify-center gap-2"
                  onClick={() => {
                    window.open('/partners-app', '_blank');
                    setFormData(prev => ({ ...prev, partnerSelected: true }));
                  }}
                >
                  <ExternalLink className="w-4 h-4" />
                  Accéder à l'application Partenaires
                </button>

                {formData.partnerSelected && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="text-sm text-green-800 flex items-center gap-2">
                      <CheckSquare className="w-4 h-4" />
                      Partenaire sélectionné avec succès
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Critères d'évaluation */}
        <div className="card lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="section-subtitle flex items-center gap-2">
              <Target className="w-5 h-5" />
              Critères d'évaluation
            </h3>
            <div className="text-sm">
              Total:{' '}
              <span className={`font-semibold ${totalWeight === 100 ? 'text-green-600' : 'text-red-600'}`}>
                {totalWeight}%
              </span>
            </div>
          </div>

          {/* Liste des critères */}
          <div className="space-y-3 mb-6">
            {criteria.map(criterion => (
              <div key={criterion.id} className="list-item">
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{criterion.name}</div>
                  <div className="text-sm text-gray-600">{criterion.description}</div>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={criterion.weight}
                    onChange={(e) => updateCriterionWeight(criterion.id, parseInt(e.target.value) || 0)}
                    className="w-20 input-field text-center"
                    min="0"
                    max="100"
                  />
                  <span className="text-sm text-gray-600">%</span>
                  <button
                    type="button"
                    onClick={() => removeCriterion(criterion.id)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Ajouter un critère */}
          <div className="border-t border-gray-200 pt-6">
            <h4 className="font-medium text-gray-900 mb-3">Ajouter un critère</h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <input
                type="text"
                value={newCriterion.name}
                onChange={(e) => setNewCriterion(prev => ({ ...prev, name: e.target.value }))}
                className="input-field"
                placeholder="Nom du critère"
              />
              <input
                type="number"
                value={newCriterion.weight}
                onChange={(e) => setNewCriterion(prev => ({ ...prev, weight: parseInt(e.target.value) || 0 }))}
                className="input-field"
                placeholder="Poids (%)"
                min="1"
                max="100"
              />
              <input
                type="text"
                value={newCriterion.description}
                onChange={(e) => setNewCriterion(prev => ({ ...prev, description: e.target.value }))}
                className="input-field"
                placeholder="Description"
              />
              <button
                type="button"
                onClick={addCriterion}
                className="btn-secondary flex items-center gap-2"
                disabled={!newCriterion.name || newCriterion.weight <= 0}
              >
                <Plus className="w-4 h-4" />
                Ajouter
              </button>
            </div>
          </div>

          {totalWeight !== 100 && (
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="text-sm text-yellow-800 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                Le total des poids doit être égal à 100% pour continuer
              </div>
            </div>
          )}
        </div>

        {/* Validation et envoi */}
        <div className="card lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="section-subtitle">Configuration et décision</h3>
              <p className="section-description mt-1">
                Vérifiez toutes les informations avant de passer à la phase de préparation
              </p>
            </div>
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
                  Envoyer vers Préparation
                </>
              )}
            </button>
          </div>

          {!isFormValid && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="text-sm text-red-800">
                <strong>Champs manquants :</strong>
                <ul className="mt-2 list-disc list-inside">
                  {!formData.bailleur.trim() && <li>Nom du bailleur</li>}
                  {formData.budget <= 0 && <li>Budget valide</li>}
                  {totalWeight !== 100 && <li>Total des critères = 100%</li>}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
