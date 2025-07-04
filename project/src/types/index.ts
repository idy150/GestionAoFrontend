export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'user';
  avatar?: string;
}

export interface Project {
  id: string;
  name: string;
  type: 'AO' | 'AMI' | 'DP';
  structure: string;
  launchDate: string;
  status: 'active' | 'pending' | 'completed' | 'delayed';
  phase: ProjectPhase;
  progress: number;
  responsible: string;
  budget?: number;
  deadline?: string;
  extractedData?: {
    projectName?: string;
    budget?: number;
    structure?: string;
    description?: string;
    criteria?: string[];
    bailleur?: string;
  };
}

export type ProjectPhase = 
  | 'programming'
  | 'preparation'
  | 'launch'
  | 'response-preparation'
  | 'evaluation'
  | 'implementation';

export interface PhaseData {
  id: ProjectPhase;
  name: string;
  description: string;
  icon: string;
  status: 'completed' | 'active' | 'pending';
  progress: number;
  tasks: Task[];
}

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  required: boolean;
  dueDate?: string;
  assignee?: string;
}

export interface Notification {
  id: string;
  type: 'warning' | 'info' | 'success' | 'error';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  projectId?: string;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadDate: string;
  category: 'administrative' | 'technical' | 'financial' | 'partner';
  projectId: string;
  url: string;
}

export interface Partner {
  id: string;
  name: string;
  role: string;
  status: 'validated' | 'pending' | 'rejected';
  responsibilities: string[];
}

export interface Criterion {
  id: string;
  name: string;
  weight: number;
  description: string;
  category: 'technical' | 'financial' | 'organizational' | 'other';
}