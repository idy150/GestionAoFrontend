/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { BarChart3, FileText, Award, Users, CheckCircle, XCircle, MessageSquare, Send } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

export const EvaluationPhase = ({ project }) => {
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

  const [chatOpen, setChatOpen] = useState(null);
  const [chatMessages, setChatMessages] = useState({});
  const [newMessage, setNewMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateCandidateDecision = (candidateId, field, value) => {
    setCandidates(prev =>
      prev.map(candidate =>
        candidate.id === candidateId ? { ...candidate, [field]: value } : candidate
      )
    );
  };

  const openChat = (candidateId) => {
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

  let sendMessage;
  sendMessage = () => {
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
    await new Promise(resolve => setTimeout(resolve, 2000));
    advanceToNextPhase(project.id);
    setIsSubmitting(false);
  };

  const isFormValid = finalDecision.selectedCandidate && finalDecision.validated;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <BarChart3 className="w-6 h-6 text-blue-600" />
        Phase d'évaluation – {project.name}
      </h1>

      {/* Critères */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="card">
          <h3 className="font-semibold flex items-center gap-2 mb-3">
            <Award className="w-5 h-5" /> Critères
          </h3>
          {evaluationCriteria.map((c) => (
            <div key={c.id} className="mb-2">
              <div className="flex justify-between">
                <span>{c.name}</span>
                <span>{c.weight}%</span>
              </div>
              <p className="text-sm text-gray-600">{c.description}</p>
            </div>
          ))}
        </div>

        <div className="card">
          <h3 className="font-semibold flex items-center gap-2 mb-3">
            <Users className="w-5 h-5" /> Statistiques
          </h3>
          <p>Candidatures : {candidates.length}</p>
          <p>Qualifiées : {candidates.filter(c => c.status === 'qualified').length}</p>
          <p>Disqualifiées : {candidates.filter(c => c.status === 'disqualified').length}</p>
        </div>

        <div className="card">
          <h3 className="font-semibold flex items-center gap-2 mb-3">
            <FileText className="w-5 h-5" /> Documents
          </h3>
          <p>PV, Grille, Rapport...</p>
        </div>
      </div>

      {/* Tableau des candidats */}
      <div className="card mb-6 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th>Candidat</th>
              <th>Décision préliminaire</th>
              <th>Qualification</th>
              <th>Réponse</th>
              <th>Score</th>
              <th>Décision finale</th>
              <th>Chat</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map(c => (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td>
                  <select value={c.preliminaryDecision} onChange={e => updateCandidateDecision(c.id, 'preliminaryDecision', e.target.value)}>
                    <option value="">Choisir</option>
                    <option value="accepted">Accepté</option>
                    <option value="rejected">Rejeté</option>
                    <option value="pending">En attente</option>
                  </select>
                </td>
                <td>
                  <select value={c.qualification} onChange={e => updateCandidateDecision(c.id, 'qualification', e.target.value)}>
                    <option value="qualified">Qualifié</option>
                    <option value="disqualified">Disqualifié</option>
                  </select>
                </td>
                <td>
                  <select value={c.response} onChange={e => updateCandidateDecision(c.id, 'response', e.target.value)}>
                    <option value="complete">Complète</option>
                    <option value="incomplete">Incomplète</option>
                  </select>
                </td>
                <td>{c.totalScore}</td>
                <td>
                  <button onClick={() => updateCandidateDecision(c.id, 'finalDecision', 'accepted')}>
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </button>
                  <button onClick={() => updateCandidateDecision(c.id, 'finalDecision', 'rejected')}>
                    <XCircle className="w-4 h-4 text-red-600" />
                  </button>
                </td>
                <td>
                  <button onClick={() => openChat(c.id)}>
                    <MessageSquare className="w-4 h-4 text-blue-600" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Final Decision */}
      <div className="card">
        <h3 className="font-semibold mb-3">Décision finale</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label>Candidat retenu</label>
            <select value={finalDecision.selectedCandidate} onChange={e => setFinalDecision({ ...finalDecision, selectedCandidate: e.target.value })}>
              <option value="">-- Choisir --</option>
              {candidates.filter(c => c.status === 'qualified').map(c => (
                <option key={c.id} value={c.id}>{c.name} – {c.totalScore}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Commentaire</label>
            <textarea
              value={finalDecision.comments}
              onChange={e => setFinalDecision({ ...finalDecision, comments: e.target.value })}
              rows="3"
            />
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={finalDecision.validated}
              onChange={e => setFinalDecision({ ...finalDecision, validated: e.target.checked })}
            />
            Je valide cette décision
          </label>
          <button
            onClick={handleFinalizeEvaluation}
            disabled={!isFormValid || isSubmitting}
            className="btn-primary"
          >
            {isSubmitting ? 'Finalisation...' : 'Finaliser'}
          </button>
        </div>
      </div>
    </div>
  );
};
