import React, { useState } from 'react';
import { X, Upload, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../contexts/AppContext';

export const AddProjectModal = ({ isOpen, onClose }) => {
  const { addProject } = useApp();
  const navigate = useNavigate();
  const [step, setStep] = useState('upload');
  const [formData, setFormData] = useState({
    type: 'AO',
    name: '',
    file: null
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [extractedData, setExtractedData] = useState(null);
  const [isExtracting, setIsExtracting] = useState(false);

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, file }));
      setIsExtracting(true);
      setStep('extraction');
      
      // Simuler l'extraction de données du fichier
      await simulateDataExtraction(file);
      
      setIsExtracting(false);
      setStep('form');
    }
  };

  const simulateDataExtraction = async (file) => {
    // Simulation de l'extraction de données depuis PDF/Excel
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const mockExtractedData = {
      projectName: file.name.replace(/\.(pdf|xlsx|xls)$/i, ''),
      budget: Math.floor(Math.random() * 1000000) + 100000,
      structure: 'Structure extraite du fichier',
      description: 'Description extraite automatiquement du document',
      bailleur: 'Bailleur détecté dans le document',
      criteria: [
        'Expertise technique - 40%',
        'Méthodologie - 30%', 
        'Prix - 20%',
        'Références - 10%'
      ]
    };
    
    setExtractedData(mockExtractedData);
    setFormData(prev => ({ 
      ...prev, 
      name: mockExtractedData.projectName 
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newProject = {
      name: formData.name,
      type: formData.type,
      structure: extractedData?.structure || 'Structure par défaut',
      launchDate: new Date().toISOString().split('T')[0],
      status: 'pending',
      phase: 'programming',
      progress: 0,
      responsible: 'Utilisateur actuel',
      budget: extractedData?.budget,
      deadline: '',
      extractedData: extractedData
    };

    // Ajouter le projet et récupérer l'ID généré
    const projectId = Math.random().toString(36).substr(2, 9);
    const projectWithId = { ...newProject, id: projectId };
    
    addProject(newProject);
    setIsSubmitting(false);
    onClose();
    
    // Naviguer directement vers la phase de programmation du nouveau projet
    navigate(`/dashboard/project/${projectId}`);
    
    // Reset form
    setFormData({
      type: 'AO',
      name: '',
      file: null
    });
    setExtractedData(null);
    setStep('upload');
  };

  const resetModal = () => {
    setStep('upload');
    setFormData({
      type: 'AO',
      name: '',
      file: null
    });
    setExtractedData(null);
    setIsExtracting(false);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="section-subtitle">
              Nouveau Projet
            </h2>
            <button
              onClick={() => {
                onClose();
                resetModal();
              }}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Étape 1: Upload du fichier */}
          {step === 'upload' && (
            <div className="space-y-6 fade-in">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Télécharger le fichier source
                </h3>
                <p className="text-gray-600">
                  Commencez par télécharger votre fichier PDF ou Excel pour extraire automatiquement les données
                </p>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-900 mb-2">
                  Glissez votre fichier ici ou cliquez pour sélectionner
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  Formats acceptés: PDF, XLS, XLSX (max 10MB)
                </p>
                <input
                  type="file"
                  onChange={handleFileUpload}
                  accept=".pdf,.xlsx,.xls"
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="btn-primary cursor-pointer"
                >
                  Choisir un fichier
                </label>
              </div>
            </div>
          )}

          {/* Étape 2: Extraction en cours */}
          {step === 'extraction' && (
            <div className="space-y-6 fade-in text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <FileText className="w-8 h-8 text-blue-600 animate-pulse" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Extraction des données en cours...
                </h3>
                <p className="text-gray-600">
                  Analyse automatique du fichier {formData.file?.name}
                </p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }} />
              </div>
            </div>
          )}

          {/* Étape 3: Formulaire avec données extraites */}
          {step === 'form' && (
            <form onSubmit={handleSubmit} className="space-y-6 fade-in">
              {/* Type de projet */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Type de projet *
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {(['AO', 'AMI', 'DP']).map(type => (
                    <label key={type} className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                      <input
                        type="radio"
                        name="type"
                        value={type}
                        checked={formData.type === type}
                        onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                        className="text-blue-600"
                      />
                      <div className="text-center">
                        <div className="font-medium text-gray-900">{type}</div>
                        <div className="text-xs text-gray-600">
                          {type === 'AO' ? 'Appel d\'Offres' :
                           type === 'AMI' ? 'Appel à Manifestation' : 'Demande de Prix'}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Nom du projet */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom du projet *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="input-field"
                  placeholder="Nom du projet"
                  required
                />
              </div>

              {/* Fichier uploadé */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fichier source
                </label>
                <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-xl">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{formData.file?.name}</div>
                    <div className="text-sm text-gray-600">
                      {formData.file && (formData.file.size / 1024 / 1024).toFixed(2)} MB
                    </div>
                  </div>
                </div>
              </div>

              {/* Données extraites */}
              {extractedData && (
                <div className="card bg-blue-50 border-blue-200">
                  <h4 className="font-medium text-blue-900 mb-3 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Données extraites automatiquement
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong className="text-blue-900">Structure:</strong>
                      <div className="text-blue-800">{extractedData.structure}</div>
                    </div>
                    <div>
                      <strong className="text-blue-900">Budget estimé:</strong>
                      <div className="text-blue-800">{extractedData.budget?.toLocaleString('fr-FR')} €</div>
                    </div>
                    <div>
                      <strong className="text-blue-900">Bailleur:</strong>
                      <div className="text-blue-800">{extractedData.bailleur}</div>
                    </div>
                    <div>
                      <strong className="text-blue-900">Critères détectés:</strong>
                      <div className="text-blue-800">{extractedData.criteria?.length || 0}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    resetModal();
                  }}
                  className="btn-secondary flex-1"
                  disabled={isSubmitting}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  disabled={isSubmitting || !formData.name || !formData.file}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Création en cours...
                    </>
                  ) : (
                    'Créer le projet'
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};