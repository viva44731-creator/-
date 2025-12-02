export enum AppView {
  DASHBOARD = 'DASHBOARD',
  PROJECT_MANAGEMENT = 'PROJECT_MANAGEMENT', // New Project/Team Management
  VISUAL_DEV = 'VISUAL_DEV', // Character/Scene
  SCRIPT_BREAKDOWN = 'SCRIPT_BREAKDOWN',
  PRE_VIZ = 'PRE_VIZ', // Video/Storyboard
  MARKETING = 'MARKETING', // Merch
  ASSETS = 'ASSETS', // LoRA Models
  SETTINGS = 'SETTINGS' // New Settings View
}

export type VisualDevTab = 'poster' | 'character' | 'scene';

export interface Scene {
  id: string;
  sceneNumber: string;
  location: string;
  time: string;
  description: string;
  characters: string[];
  visualPrompt: string;
  shotType?: string; // e.g. Wide, Close-up
  cameraMove?: string; // e.g. Pan, Tracking
  imageUrl?: string;
  status: 'pending' | 'generating' | 'completed';
  conflict?: string; // Conflict point description
  mood?: string; // Mood tag
}

// Deep Analysis Types
export interface CharacterProfile {
  name: string;
  age: string;
  tags: string[];
  role: string; // Protagonist, Antagonist, etc.
  goal: string; // Life goal or scene goal
  motivation: string; // Psychological motivation
  keyEvent: string; // Key event in the script
}

export interface Relationship {
  source: string;
  target: string;
  relation: string; // e.g. "Enemy", "Lover", "Father"
  strength: number; // 1-10
}

export interface EmotionalPoint {
  sceneIndex: number;
  intensity: number; // 1-10 (Tension/Drama)
  label: string; // Short description of the beat
}

export interface ScriptAnalysisResult {
  title: string;
  genre: string;
  logline: string;
  scenes: Scene[];
  characterProfiles: CharacterProfile[];
  relationships: Relationship[];
  emotionalCurve: EmotionalPoint[];
}

export interface CharacterModel {
  id: string;
  name: string;
  triggerWord: string;
  type: 'face' | 'style';
  thumbnail: string;
  status: 'ready' | 'training';
  trainingProgress?: number;
}

export interface VisualAsset {
  id: string;
  type: VisualDevTab;
  prompt: string;
  imageUrl: string;
  createdAt: number;
  styleModelId?: string;
  // Metadata for specific types
  ratio?: string;
  viewType?: string; 
  // Metadata for Scenes
  environmentStyle?: string;
  outputMode?: 'structure' | 'moodboard';
}

export interface MerchConfig {
  type: 'blindbox' | 'plush' | 'poster' | 'app_splash';
  material: string;
  style: string;
}

// Project Management Interfaces
export type Role = 'Director' | 'Producer' | 'Art Director' | 'Screenwriter' | 'Editor' | 'Concept Artist';

export interface TeamMember {
  id: string;
  name: string;
  role: Role;
  avatar?: string;
  email: string;
  status: 'active' | 'invited';
}

export interface ProjectConfig {
  id: string;
  title: string;
  genre: string; // e.g., Ancient, Suspense, Sci-Fi
  level: 'S+' | 'S' | 'A' | 'B'; // iQIYI Project Rating
  coverImage?: string;
  description: string;
  status: 'Development' | 'Pre-production' | 'Production';
  createdAt: number;
  team: TeamMember[];
  isPublic: boolean;
}