export interface Guideline {
  id: string;
  title: string;
  description: string;
  category: string;
  impact: "high" | "medium" | "low";
}

export interface TestCase {
  id: string;
  gl: string;
  ref: string;
  title: string;
  steps: string;
  expected: string;
  displayNum?: number;
  originalRef?: string;
  type?: "required" | "best_practice";
  policyText?: string;
  imageUrl?: string;
}

export interface PlatformData {
  guidelines: Guideline[];
  testCases: TestCase[];
}

export interface Session {
  id: string;
  version: string;
  build: string;
  tester: string;
  desc: string;
  created: string;
  milestone?: string;
}

export interface ExecutionState {
  status: "pass" | "fail" | "not_applicable" | "not_tested";
  notes: string;
}

export type ExecutionMap = Record<string, ExecutionState>;

export interface AppState {
  sessions: Session[];
  activeId: string | null;
  execsByPlatform: Record<string, ExecutionMap>;
  impacts: Record<
    string,
    { ios?: "high" | "medium" | "low"; android?: "high" | "medium" | "low" }
  >;
  customSteps: Record<string, { steps?: string; expected?: string }>;
  deletedTcs: string[];
  theme: string;
  platform: "ios" | "android";
  catOrder: Record<
    string,
    Array<{ type: "tc" | "header"; id: string; name?: string }>
  >;
  catOrderAndroid: Record<
    string,
    Array<{ type: "tc" | "header"; id: string; name?: string }>
  >;
  customTcs?: TestCase[];
  editedTcs?: Record<string, Partial<TestCase>>;
  jiraIssuesBySession?: Record<string, JiraIssue[]>;
}

export interface JiraIssue {
  id: string;
  key: string;
  title: string;
  url: string;
  tcId?: string; // linked to a failing test case ID (optional)
  created: string;
}
