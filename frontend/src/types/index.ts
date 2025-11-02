export enum SupportedLanguage {
  PYTHON = 'python',
  JAVA = 'java',
  TYPESCRIPT = 'typescript',
  REACT = 'react'
}

export interface CodeExecutionRequest {
  code: string;
  language: SupportedLanguage;
}

export interface StackFrame {
  functionName: string;
  parameters: Record<string, any>;
  localVariables: Record<string, any>;
  returnValue?: any;
  lineNumber: number;
}

export interface MemoryObject {
  address: string;
  type: string;
  value: any;
  references: string[];
}

export interface ControlFlow {
  fromLine: number;
  toLine: number;
  type: 'sequential' | 'branch' | 'loop' | 'return' | 'call';
  condition?: boolean;
}

export interface DataStructure {
  type: 'array' | 'linkedList' | 'tree' | 'graph' | 'stack' | 'queue';
  data: any;
  operations?: string[];
}

export interface VisualizationStep {
  stepNumber: number;
  description: string;
  variableStates?: Record<string, any>;
  lineHighlight?: number;
  output?: string;
  stackFrames?: StackFrame[];
  memoryObjects?: MemoryObject[];
  controlFlow?: ControlFlow[];
  dataStructures?: DataStructure[];
  timestamp?: number;
}

export interface CodeExecutionResponse {
  success: boolean;
  output?: string;
  error?: string;
  visualizationSteps?: VisualizationStep[];
  executionTime?: number;
}

export interface LanguageOption {
  value: SupportedLanguage;
  label: string;
  mode: string; // For Monaco editor mode
}

