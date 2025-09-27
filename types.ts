
export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  skills?: string[];
  resumeUrl?: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  answer: string;
}

export interface RoadmapStep {
  id: number;
  title: string;
  description: string;
  duration: string;
}
