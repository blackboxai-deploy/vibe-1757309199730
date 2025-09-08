// NeuroVox TypeScript Interfaces

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'patient' | 'doctor' | 'admin';
  createdAt: Date;
  lastLogin?: Date;
}

export interface BrainSignal {
  id: string;
  userId: string;
  timestamp: Date;
  focus: number; // 0-100
  relaxation: number; // 0-100
  stress: number; // 0-100
  rawSignal?: number[];
}

export interface MindLogEntry {
  id: string;
  userId: string;
  timestamp: Date;
  translatedText: string;
  confidence: number; // 0-1
  originalSignal?: number[];
}

export interface DailyReport {
  id: string;
  userId: string;
  date: Date;
  averageFocus: number;
  averageRelaxation: number;
  averageStress: number;
  totalSessions: number;
  peakTimes: {
    focus: Date;
    relaxation: Date;
    stress: Date;
  };
  notes?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  message: string;
  createdAt: Date;
  approved: boolean;
  rating?: number;
}

export interface WearableStatus {
  connected: boolean;
  batteryLevel: number; // 0-100
  signalStrength: number; // 0-100
  lastSync: Date;
  deviceModel: string;
}

export interface EmergencyAlert {
  id: string;
  userId: string;
  timestamp: Date;
  type: 'medical' | 'communication' | 'assistance';
  message?: string;
  resolved: boolean;
  responderNotes?: string;
}

export interface PatientOverview {
  user: User;
  wearableStatus: WearableStatus;
  latestBrainState: BrainSignal;
  recentAlerts: EmergencyAlert[];
  weeklyTrend: {
    focus: number[];
    relaxation: number[];
    stress: number[];
  };
}

export interface TeamMember {
  name: string;
  role: string;
  description: string;
  image?: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
  expiresIn: number;
}

// Form Types
export interface LoginForm {
  email: string;
  password: string;
}

export interface TestimonialForm {
  name: string;
  message: string;
  rating?: number;
}

export interface HealthNotesForm {
  patientId: string;
  notes: string;
  timestamp: Date;
}