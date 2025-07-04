import React, { useState } from 'react';
import { Project } from '../../types';
import { BarChart3, FileText, Award, Users, CheckCircle, XCircle, MessageSquare, Send } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

interface EvaluationPhaseProps {
  project: Project;
}

export const EvaluationPhase: React.FC<EvaluationPhaseProps> = ({ project }) => {
  const { advanceToNextPhase } = useApp();
  const [candidates, setCandidates] = useState([
    {
      id: '1',
      name: 'TechSolutions SARL',
      status: 'qualified',
      technicalScore: 85,
      financialScore: 92,
      totalScore: 88.5,
      price: 720000,
      decision: 'pending',
      preliminaryDecision: '',
      finalDecision: '',
      qualification: 'qualified',
      response: 'complete'
    },
    {
      id: '2', 
      name: 'InnovatePro',
      status: 'qualified',
      technicalScore: 78,
      financialScore: 88,
      totalScore: 83,
      price: 680000,
      decision: 'pending',
      preliminaryDecision: '',
      finalDecision: '',
      qualification: 'qualified',
      response: 'complete'
    },
    {
      id: '3',
      name: 'DigitalExperts',
      status: 'disqualified',
      technicalScore: 65,
      financialScore: 0,
      totalScore: 0,
      price: 0,
      decision: 'rejected',
      preliminaryDecision: 'rejected',
      finalDecision: 'rejected',
      qualification: 'disqualified',
      response: 'incomplete',
      reason: 'Documents manquants'
    }
  ]);

  const [evaluationCriteria] = useState([
    { id: '1', name: 'Expertise technique', weight: 40, description: 'Compétences et expérience' },
    { id: '2', name: 'Méthodologie', weight: 30, description: 'Approche et organisation' },
    { id: '3', name: 'Prix', weight: 20, description: 'Offre financière' },
    { id: '4', name: 'Références', weight: 10, description: 'Projets similaires' }
  ]);

  const [finalDecision, setFinalDecision] = useState({
    selectedCandidate: '',
    comments: '',
    validated: false
  });

  const [chatOpen, setChatOpen] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<{[key: string]: Array<{id: string, sender: string, message: string, timestamp: string}>}>({});
  const [newMessage, setNewMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateCandidateDecision = (candidateId: string, field: string, value: string) => {
    setCandidates(prev =>
      prev.map(candidate =>
        candidate.id === candidateId ? { ...candidate, [field]: value } : candidate
      )
    );
  };

  const openChat = (candidateId: string) => {
    setChatOpen(candidateId);
    if (!chatMessages[candidateId]) {
      setChatMessages(prev => ({
        ...prev,
        [candidateId]: [
          {
            id: '1',
            sender: 'system',
            message: 'Chat ouvert avec le partenaire pour échanges sur l\'évaluation',
            timestamp: new Date().toISOString()
          }
        ]
      }));
    }
  };

  const sendMessage = () => {
    if (!newMessage.trim() || !chatOpen) return;

    const message = {
      id: Date.now().toString(),
      sender: 'evaluator',
      message: newMessage,
      timestamp: new Date().toISOString()
    };

    setChatMessages(prev => ({
      ...prev,
      [chatOpen]: [...(prev[chatOpen] || []), message]
    }));

    setNewMessage('');
  };

  const handleFinalizeEvaluation = async () => {
    setIsSubmitting(true);
    
    // Simuler la finalisation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Passer à la phase suivante
    advanceToNextPhase(project.id);
    
    setIsSubmitting(false);
  };

  const isFormValid = finalDecision.selectedCandidate && finalDecision.validated;

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-3">
          <BarChart3 className="w-8 h-8 text-blue-600" />
          Phase d'Évaluation
        </h1>
        <p className="text-gray-600">
          Analyse et évaluation des offres pour {project.name}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Critères d'évaluation */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Award className="w-5 h-5" />
            Critères d'évaluation
          </h3>
          <div className="space-y-3">
            {evaluationCriteria.map(criteria => (
              <div key={criteria.id} className="p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-medium text-gray-900">{criteria.name}</h4>
                  <span className="text-sm font-medium text-blue-600">{criteria.weight}%</span>
                </div>
                <p className="text-sm text-gray-600">{criteria.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Statistiques */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Users className="w-5 h-5" />
            Statistiques
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <span className="text-sm font-medium text-blue-900">Candidatures reçues</span>
              <span className="text-lg font-bold text-blue-900">3</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="text-sm font-medium text-green-900">Qualifiées</span>
              <span className="text-lg font-bold text-green-900">2</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <span className="text-sm font-medium text-red-900">Disqualifiées</span>
              <span className="text-lg font-bold text-red-900">1</span>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-sm font-medium text-gray-700 mb-1">Prix moyen</div>
              <div className="text-lg font-bold text-gray-900">700 000 €</div>
            </div>
          </div>
        </div>

        {/* Documents d'évaluation */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Documents
          </h3>
          <div className="space-y-3">
            <button className="w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="font-medium text-gray-900">PV de dépôt</div>
              <div className="text-sm text-gray-600">3 candidatures reçues</div>
            </button>
            <button className="w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="font-medium text-gray-900">Grille d'évaluation</div>
              <div className="text-sm text-gray-600">Critères et notation</div>
            </button>
            <button className="w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="font-medium text-gray-900">Rapport d'analyse</div>
              <div className="text-sm text-gray-600">Synthèse technique</div>
            </button>
          </div>
        </div>

        {/* Formulaire d'évaluation dynamique */}
        <div className="card lg:col-span-3">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Évaluation des candidatures
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Candidat</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Décision Préliminaire</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Qualification</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Réponse</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Score Total</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Décision Finale</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {candidates.map(candidate => (
                  <tr key={candidate.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="font-medium text-gray-900">{candidate.name}</div>
                      {candidate.reason && (
                        <div className="text-sm text-red-600">{candidate.reason}</div>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <select
                        value={candidate.preliminaryDecision}
                        onChange={(e) => updateCandidateDecision(candidate.id, 'preliminaryDecision', e.target.value)}
                        className="input-field text-sm"
                      >
                        <option value="">Sélectionner</option>
                        <option value="accepted">Accepté</option>
                        <option value="rejected">Rejeté</option>
                        <option value="pending">En attente</option>
                      </select>
                    </td>
                    <td className="py-3 px-4">
                      <select
                        value={candidate.qualification}
                        onChange={(e) => updateCandidateDecision(candidate.id, 'qualification', e.target.value)}
                        className="input-field text-sm"
                      >
                        <option value="qualified">Qualifié</option>
                        <option value="disqualified">Disqualifié</option>
                      </select>
                    </td>
                    <td className="py-3 px-4">
                      <select
                        value={candidate.response}
                        onChange={(e) => updateCandidateDecision(candidate.id, 'response', e.target.value)}
                        className="input-field text-sm"
                      >
                        <option value="complete">Complète</option>
                        <option value="incomplete">Incomplète</option>
                        <option value="partial">Partielle</option>
                      </select>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-medium text-lg">{candidate.totalScore}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-1">
                        <button
                          onClick={() => updateCandidateDecision(candidate.id, 'finalDecision', 'accepted')}
                          className={`p-2 rounded ${candidate.finalDecision === 'accepted' ? 'bg-green-100 text-green-600' : 'text-green-600 hover:bg-green-100'}`}
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => updateCandidateDecision(candidate.id, 'finalDecision', 'rejected')}
                          className={`p-2 rounded ${candidate.finalDecision === 'rejected' ? 'bg-red-100 text-red-600' : 'text-red-600 hover:bg-red-100'}`}
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => openChat(candidate.id)}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded"
                        title="Ouvrir chat"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Chat avec partenaire */}
        {chatOpen && (
          <div className="card lg:col-span-3">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Chat avec {candidates.find(c => c.id === chatOpen)?.name}
              </h3>
              <button
                onClick={() => setChatOpen(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            <div className="border border-gray-200 rounded-lg">
              <div className="h-64 overflow-y-auto p-4 space-y-3">
                {(chatMessages[chatOpen] || []).map(msg => (
                  <div key={msg.id} className={`flex ${msg.sender === 'evaluator' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs p-3 rounded-lg ${
                      msg.sender === 'evaluator' 
                        ? 'bg-blue-600 text-white' 
                        : msg.sender === 'system'
                        ? 'bg-gray-100 text-gray-600'
                        : 'bg-gray-200 text-gray-900'
                    }`}>
                      <p className="text-sm">{msg.message}</p>
                      <p className="text-xs opacity-75 mt-1">
                        {new Date(msg.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-200 p-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    className="input-field flex-1"
                    placeholder="Tapez votre message..."
                  />
                  <button
                    onClick={sendMessage}
                    className="btn-primary px-4"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Décision finale */}
        <div className="card lg:col-span-3">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Décision finale
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Candidat retenu
              </label>
              <select
                value={finalDecision.selectedCandidate}
                onChange={(e) => setFinalDecision(prev => ({ ...prev, selectedCandidate: e.target.value }))}
                className="input-field"
              >
                <option value="">Sélectionner un candidat</option>
                {candidates.filter(c => c.status === 'qualified').map(candidate => (
                  <option key={candidate.id} value={candidate.id}>
                    {candidate.name} - Score: {candidate.totalScore}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Commentaires de décision
              </label>
              <textarea
                value={finalDecision.comments}
                onChange={(e) => setFinalDecision(prev => ({ ...prev, comments: e.target.value }))}
                className="input-field h-24 resize-none"
                placeholder="Justification de la décision..."
              />
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={finalDecision.validated}
                onChange={(e) => setFinalDecision(prev => ({ ...prev, validated: e.target.checked }))}
                className="text-blue-600"
              />
              <span className="text-sm text-gray-700">Je confirme la validation de cette décision</span>
            </label>
            <div className="flex gap-3">
              <button className="btn-secondary">
                Générer rapport
              </button>
              <button 
                onClick={handleFinalizeEvaluation}
                disabled={!isFormValid || isSubmitting}
                className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Finalisation...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Finaliser et passer à Mise en œuvre
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