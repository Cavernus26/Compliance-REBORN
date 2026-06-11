import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Analytics } from "@vercel/analytics/react";
import {
  LayoutDashboard,
  Package,
  Play,
  BarChart3,
  Settings,
  ChevronRight,
  Trash2,
  Check,
  X,
  AlertTriangle,
  Plus,
  Undo2,
  Smartphone,
  Info,
  ExternalLink,
  Save,
  MessageSquare,
  Moon,
  Sun,
  ShieldCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ALL_DATA, IOS_ICONS, AND_ICONS } from "./data";
import { AppState, Session, TestCase, ExecutionMap, Guideline } from "./types";
import ExecutiveReportView from "./components/ExecutiveReportView";
import AnalyzerView from "./components/AnalyzerView";
import androidShareSheetImg from "./assets/images/android_share_sheet_1779710019591.png";
import gpgIncrementalImg from "./assets/images/gpg_incremental_1780057315640.png";
import gpgDifficultyImg from "./assets/images/gpg_clash_royale_achievement_1780058034915.png";
import gpgFriendsIconsImg from "./assets/images/gpg_friends_icons_1780059458838.png";

const INITIAL_STATE: AppState = {
  sessions: [],
  activeId: null,
  execsByPlatform: {},
  impacts: {},
  customSteps: {},
  deletedTcs: [],
  theme: "dark",
  platform: "ios",
  catOrder: {},
  catOrderAndroid: {},
};

const getTestCaseNumber = (
  tc: TestCase | undefined,
  dbTestCases: TestCase[],
) => {
  if (!tc) return 1;
  const originalSectionTcs = dbTestCases.filter(
    (t: TestCase) => t.gl === tc.gl && t.originalRef === tc.originalRef,
  );
  const stableIdx = originalSectionTcs.findIndex(
    (t: TestCase) => t.id === tc.id,
  );
  return stableIdx >= 0 ? stableIdx + 1 : 1;
};

export default function App() {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem("compliance-hub-state");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return { ...INITIAL_STATE, ...parsed };
      } catch (e) {
        return INITIAL_STATE;
      }
    }
    return INITIAL_STATE;
  });

  const [activePage, setActivePage] = useState("dashboard");
  const [expandedTc, setExpandedTc] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [catFilter, setCatF] = useState("");
  const [statusFilter, setStsF] = useState("");
  const [toast, setToast] = useState<{ msg: string; show: boolean }>({
    msg: "",
    show: false,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteConf, setDeleteConf] = useState<{
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
  } | null>(null);

  const [showPrivacyBanner, setShowPrivacyBanner] = useState(() => {
    return localStorage.getItem("compliance-hub-privacy-consent") !== "true";
  });

  const acceptPrivacy = () => {
    localStorage.setItem("compliance-hub-privacy-consent", "true");
    setShowPrivacyBanner(false);
  };

  // Persistence
  useEffect(() => {
    localStorage.setItem("compliance-hub-state", JSON.stringify(state));
    // Apply styling classes to body
    document.body.className =
      state.platform === "android" ? "android-mode" : "";
    document.body.setAttribute("data-theme", state.theme);
  }, [state]);

  const showToast = useCallback((msg: string) => {
    setToast({ msg, show: true });
    setTimeout(() => setToast((prev) => ({ ...prev, show: false })), 2200);
  }, []);

  // Derived Data
  const currentPlatform = state.platform;
  const db = ALL_DATA[currentPlatform];
  const icons = currentPlatform === "ios" ? IOS_ICONS : AND_ICONS;

  const activeExecKey = `${currentPlatform}_${state.activeId}`;
  const executions: ExecutionMap = state.execsByPlatform[activeExecKey] || {};

  const activeTcs = useMemo(() => {
    const combined = [...db.testCases, ...(state.customTcs || [])];
    return combined.filter((tc) => !state.deletedTcs.includes(tc.id));
  }, [db.testCases, state.customTcs, state.deletedTcs]);

  const stats = useMemo(() => {
    let p = 0,
      f = 0,
      n = 0;
    activeTcs.forEach((tc) => {
      const st = (executions[tc.id] || {}).status || "not_tested";
      if (st === "pass") p++;
      else if (st === "fail") f++;
      else if (st === "not_applicable") n++;
    });
    const tot = activeTcs.length;
    return { pass: p, fail: f, na: n, nt: tot - p - f - n, total: tot };
  }, [activeTcs, executions]);

  const risk = useMemo(() => {
    const impMap: Record<string, string> = {};
    db.guidelines.forEach((g) => {
      impMap[g.id] =
        state.impacts[g.id]?.[state.platform as "ios" | "android"] || g.impact;
    });

    let score = 0;
    activeTcs.forEach((tc) => {
      if (executions[tc.id]?.status === "fail") {
        const imp = impMap[tc.gl] || "medium";
        const pts = { high: 5, medium: 3, low: 1 }[imp] || 3;
        score += pts;
      }
    });

    if (score <= 5)
      return { score, cls: "pass", label: "Safe to Submit", icon: "✅" };
    if (score <= 15)
      return { score, cls: "warn", label: "At Risk", icon: "⚠️" };
    return { score, cls: "fail", label: "Do Not Submit", icon: "🔴" };
  }, [db.guidelines, activeTcs, executions, state.impacts]);

  // Actions
  const switchPlatform = (p: "ios" | "android") => {
    setState((prev) => ({ ...prev, platform: p }));
    showToast(`Switched to ${p === "ios" ? "iOS" : "Android"}`);
  };

  const setStatus = (
    tcId: string,
    status: AppState["execsByPlatform"][string][string]["status"],
  ) => {
    if (!state.activeId) return;
    setState((prev) => {
      const key = `${prev.platform}_${prev.activeId}`;
      const platExecs = prev.execsByPlatform[key] || {};
      const currentStatus = platExecs[tcId]?.status || "not_tested";

      // If clicking same status, toggle back to not_tested
      const finalStatus = currentStatus === status ? "not_tested" : status;

      return {
        ...prev,
        execsByPlatform: {
          ...prev.execsByPlatform,
          [key]: {
            ...platExecs,
            [tcId]: {
              ...(platExecs[tcId] || { notes: "" }),
              status: finalStatus,
            },
          },
        },
      };
    });
  };

  const bulkSetStatus = (
    tcIds: string[],
    status: AppState["execsByPlatform"][string][string]["status"],
  ) => {
    if (!state.activeId) return;
    setState((prev) => {
      const key = `${prev.platform}_${prev.activeId}`;
      const platExecs = { ...(prev.execsByPlatform[key] || {}) };

      // Determine if every selected TC already has this status (for toggling)
      const allAlreadyHaveStatus = tcIds.every(
        (id) => (platExecs[id]?.status || "not_tested") === status,
      );
      const finalStatus = allAlreadyHaveStatus ? "not_tested" : status;

      tcIds.forEach((id) => {
        platExecs[id] = {
          ...(platExecs[id] || { notes: "" }),
          status: finalStatus,
        };
      });

      return {
        ...prev,
        execsByPlatform: {
          ...prev.execsByPlatform,
          [key]: platExecs,
        },
      };
    });
    showToast(`Bulk updated ${tcIds.length} items`);
  };

  const handleSyncPlistResults = useCallback(
    (
      mandatory: Array<{ key: string; isPresent: boolean }>,
      nonMandatory: Array<{ key: string; isPresent: boolean }>,
    ) => {
      if (!state.activeId) return;
      const key = `ios_${state.activeId}`;
      setState((prev) => {
        const platExecs = { ...(prev.execsByPlatform[key] || {}) };
        const tcs = ALL_DATA["ios"].testCases;

        mandatory.forEach((res) => {
          const tc = tcs.find((t) => t.title === res.key);
          if (tc) {
            platExecs[tc.id] = {
              status: res.isPresent ? "pass" : "fail",
              notes: `Auto-analyzed from Info.plist. Key '${res.key}' was ${res.isPresent ? "found on dynamic scan (PASS)" : "missing on dynamic scan (FAIL)"}.`,
            };
          }
        });

        nonMandatory.forEach((res) => {
          const tc = tcs.find((t) => t.title === res.key);
          if (tc) {
            platExecs[tc.id] = {
              status: res.isPresent ? "pass" : "not_applicable",
              notes: `Auto-analyzed from Info.plist. Optional key '${res.key}' was ${res.isPresent ? "found on dynamic scan (PASS)" : "missing on dynamic scan (N/A)"}.`,
            };
          }
        });

        return {
          ...prev,
          execsByPlatform: {
            ...prev.execsByPlatform,
            [key]: platExecs,
          },
        };
      });
      const verString =
        state.sessions.find((s) => s.id === state.activeId)?.version || "";
      showToast(
        `Synced! Core Info.plist properties synced to checklist for Release v${verString}.`,
      );
    },
    [state.activeId, state.sessions, showToast],
  );

  const createSession = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const ver = formData.get("version") as string;
    if (!ver) return;

    const newSess: Session = {
      id: "s" + Date.now(),
      version: ver,
      build: (formData.get("build") as string) || "",
      tester: (formData.get("tester") as string) || "QA",
      desc: (formData.get("desc") as string) || "",
      created: new Date().toISOString(),
      milestone: (formData.get("milestone") as string) || "General Staging",
    };

    setState((prev) => ({
      ...prev,
      sessions: [newSess, ...prev.sessions],
      activeId: newSess.id,
    }));
    setIsModalOpen(false);
    showToast(`Session created: ${ver}`);
  };

  const deleteSession = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const sessObj = state.sessions.find((s) => s.id === id);
    const verInfo = sessObj ? ` "${sessObj.version}"` : "";
    setDeleteConf({
      title: "Delete Build Session",
      message: `Are you sure you want to delete build session${verInfo} and all associated execution results? This action cannot be undone.`,
      confirmText: "Delete Session",
      onConfirm: () => {
        setState((prev) => {
          const newSess = prev.sessions.filter((s) => s.id !== id);
          const newActive =
            prev.activeId === id ? newSess[0]?.id || null : prev.activeId;
          const newExecs = { ...prev.execsByPlatform };
          Object.keys(newExecs).forEach((k) => {
            if (k.includes(id)) delete newExecs[k];
          });
          return {
            ...prev,
            sessions: newSess,
            activeId: newActive,
            execsByPlatform: newExecs,
          };
        });
        showToast("Session deleted");
      },
    });
  };

  const toggleTheme = () => {
    setState((prev) => ({
      ...prev,
      theme: prev.theme === "dark" ? "light" : "dark",
    }));
  };

  const activeSession = state.sessions.find((s) => s.id === state.activeId);

  return (
    <div
      className="flex min-h-screen transition-colors duration-300"
      style={{ color: "var(--text)", backgroundColor: "var(--bg)" }}
    >
      <Analytics />
      <AnimatePresence>
        {showPrivacyBanner && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            id="privacy-consent-banner"
            className="fixed bottom-6 right-6 max-w-md w-[calc(100%-2rem)] sm:w-[400px] bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-5 shadow-2xl z-[9999] flex flex-col gap-4 overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300 pointer-events-auto print:hidden"
          >
            <div className="absolute top-0 left-0 w-1.5 h-full bg-indigo-600"></div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center border border-indigo-100/50 dark:border-indigo-900/50 text-indigo-600 dark:text-indigo-400">
                <ShieldCheck size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-[var(--text-highlight)] tracking-tight">
                  Your Privacy & Data Ownership
                </h4>
                <p className="text-[12px] text-[var(--text-muted)] leading-relaxed mt-1.5">
                  We are deeply committed to protecting your privacy. This suite runs and parses all compliance reports (including uploaded plists or manifests) **entirely inside your browser sandbox**. Absolutely no files, configuration metrics, or session states ever leave your machine.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-[var(--border)]">
              <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider">
                Offline-First Architecture
              </span>
              <button
                id="accept-privacy-btn"
                onClick={acceptPrivacy}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-505 text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg text-xs font-bold font-sans transition-all cursor-pointer shadow-sm hover:shadow active:scale-[0.98]"
              >
                I Understand
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="bg-mesh opacity-10 dark:opacity-15 print:hidden">
        <div className="bg-orb orb1 opacity-20 dark:opacity-100" />
        <div className="bg-orb orb2 opacity-20 dark:opacity-100" />
        <div className="bg-orb orb3 opacity-20 dark:opacity-100" />
        <div className="bg-orb orb4 opacity-20 dark:opacity-100" />
      </div>

      {/* Sidebar */}
      <nav className="w-80 flex-shrink-0 bg-[var(--surface)] border-r border-[var(--border)] fixed h-screen flex flex-col z-[100] transition-colors duration-300 print:hidden">
        <div className="h-16 px-6 border-b border-[var(--border)] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[var(--text-highlight)] rounded flex items-center justify-center">
              <Package size={20} className="text-[var(--bg)]" />
            </div>
            <span className="font-semibold text-[var(--text-highlight)] tracking-tight">
              Compliance Hub
            </span>
          </div>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-[var(--surface2)] border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text-highlight)] transition-all"
          >
            {state.theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>

        <div className="p-4 flex gap-1 bg-[var(--accent-dim)] rounded-lg mx-4 my-4 border border-[var(--border)]">
          <button
            onClick={() => switchPlatform("ios")}
            className={`flex-1 flex items-center justify-center gap-2 py-1.5 rounded text-xs font-medium transition-all ${state.platform === "ios" ? "bg-[var(--text-highlight)] text-[var(--bg)] shadow-sm" : "text-[var(--text-muted)] hover:text-[var(--text-highlight)]"}`}
          >
            🍎 iOS
          </button>
          <button
            onClick={() => switchPlatform("android")}
            className={`flex-1 flex items-center justify-center gap-2 py-1.5 rounded text-xs font-medium transition-all ${state.platform === "android" ? "bg-[var(--text-highlight)] text-[var(--bg)] shadow-sm" : "text-[var(--text-muted)] hover:text-[var(--text-highlight)]"}`}
          >
            🤖 Android
          </button>
        </div>

        <div className="p-6 border-b border-[var(--border)]">
          <h3 className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-widest mb-4">
            Workspace
          </h3>
          <div className="space-y-1">
            <SidebarItem
              active={activePage === "dashboard"}
              onClick={() => setActivePage("dashboard")}
              icon={<LayoutDashboard size={14} />}
              label="Dashboard"
            />
            <SidebarItem
              active={activePage === "sessions"}
              onClick={() => setActivePage("sessions")}
              icon={<Package size={14} />}
              label="Sessions"
            />
          </div>
        </div>

        <div className="p-6 border-b border-[var(--border)] flex-1 overflow-hidden flex flex-col">
          <h3 className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-widest mb-4">
            Testing
          </h3>
          <div className="space-y-1">
            <SidebarItem
              active={activePage === "execute"}
              onClick={() => setActivePage("execute")}
              icon={<Play size={14} />}
              label="Test Execution"
            />
            <SidebarItem
              active={activePage === "summary"}
              onClick={() => setActivePage("summary")}
              icon={<BarChart3 size={14} />}
              label="Summary"
            />
          </div>

          <div className="mt-8">
            <h3 className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-widest mb-4">
              Diagnostics
            </h3>
            <SidebarItem
              active={activePage === "analyzer"}
              onClick={() => setActivePage("analyzer")}
              icon={<ShieldCheck size={14} />}
              label="Manifest & Info.plist"
            />
          </div>

          <div className="mt-8">
            <h3 className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-widest mb-4">
              System
            </h3>
            <SidebarItem
              active={activePage === "guidelines"}
              onClick={() => setActivePage("guidelines")}
              icon={<Settings size={14} />}
              label="Guidelines"
            />
          </div>
        </div>

        <div className="p-6 bg-[var(--bg)]/10 border-t border-[var(--border)]">
          <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest mb-2">
            Active Session
          </p>
          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${activeSession ? "bg-green-500" : "bg-[var(--surface3)]"}`}
            />
            <p className="text-sm text-[var(--text-highlight)] tracking-tight leading-none truncate">
              {activeSession ? activeSession.version : "None Selected"}
            </p>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="ml-80 print:ml-0 flex-1 flex flex-col min-h-screen relative overflow-hidden transition-colors duration-300 print:bg-white print:text-black">
        {/* Top Navbar */}
        <nav className="h-16 border-b border-[var(--border)] bg-[var(--surface)] flex items-center justify-between px-8 shrink-0 transition-colors duration-300 print:hidden">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-widest">
              Platform
            </span>
            <span className="text-sm text-[var(--text-highlight)]">
              {state.platform === "ios" ? "ios" : "android"}
            </span>
          </div>
          <div className="flex items-center gap-4">
          </div>
        </nav>

        {/* Content Section */}
        <main className="flex-1 p-10 print:p-0 print:m-0 overflow-y-auto page-transition max-w-6xl print:max-w-none mx-auto w-full">
          {activePage === "dashboard" && (
            <DashboardView
              stats={stats}
              risk={risk}
              activeSession={activeSession}
              onNewSess={() => setIsModalOpen(true)}
              onGoToTest={() => setActivePage("execute")}
              onGoToSummary={() => setActivePage("summary")}
            />
          )}
          {activePage === "sessions" && (
            <SessionsView
              sessions={state.sessions}
              activeId={state.activeId}
              onSelect={(id: string) => {
                setState((p) => ({ ...p, activeId: id }));
                setActivePage("execute");
                showToast("Switched context to selected test session");
              }}
              onDelete={deleteSession}
              onNewSess={() => setIsModalOpen(true)}
            />
          )}
          {activePage === "execute" && (
            <ExecuteView
              state={state}
              setState={setState}
              db={db}
              activeTcs={activeTcs}
              executions={executions}
              setStatus={setStatus}
              bulkSetStatus={bulkSetStatus}
              expandedTc={expandedTc}
              setExpandedTc={setExpandedTc}
              showToast={showToast}
              icons={icons}
              setDeleteConf={setDeleteConf}
            />
          )}
          {activePage === "summary" && (
            <SummaryView
              stats={stats}
              risk={risk}
              activeSession={activeSession}
              executions={executions}
              activeTcs={activeTcs}
              db={db}
              state={state}
            />
          )}
          {activePage === "analyzer" && (
            <AnalyzerView
              platform={state.platform}
              activeSession={activeSession}
              onSyncPlistResults={handleSyncPlistResults}
              showToast={showToast}
            />
          )}
          {activePage === "guidelines" && (
            <GuidelinesView
              state={state}
              setState={setState}
              db={db}
              icons={icons}
              showToast={showToast}
            />
          )}
        </main>
      </div>

      {/* Modal & Toast */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[1000] flex items-center justify-center p-4">
          <motion.form
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onSubmit={createSession}
            className="bg-[var(--surface)] border border-[var(--border2)] rounded-[18px] p-6 w-full max-w-md shadow-2xl"
          >
            <h2 className="text-lg font-bold mb-1">New Build Session</h2>
            <p className="text-sm text-[var(--text2)] mb-5">
              Create a tracking session for a specific build version.
            </p>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-[var(--text3)] uppercase">
                  App Version *
                </label>
                <input
                  name="version"
                  required
                  autoFocus
                  placeholder="e.g. 2.4.1"
                  className="w-full bg-[var(--surface2)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm outline-none focus:border-[var(--accent)] transition-colors"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[var(--text3)] uppercase">
                    Build Name
                  </label>
                  <input
                    name="build"
                    placeholder="e.g. Build 103 or RC-2"
                    className="w-full bg-[var(--surface2)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm outline-none focus:border-[var(--accent)] transition-colors"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[var(--text3)] uppercase">
                    Lead Tester
                  </label>
                  <input
                    name="tester"
                    defaultValue="QA Team"
                    className="w-full bg-[var(--surface2)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm outline-none focus:border-[var(--accent)] transition-colors"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-[var(--text3)] uppercase">
                  Milestone
                </label>
                <input
                  name="milestone"
                  placeholder="e.g. Sprint 14, Beta Launch"
                  className="w-full bg-[var(--surface2)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm outline-none focus:border-[var(--accent)] transition-colors"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-[var(--text3)] uppercase">
                  Internal Note
                </label>
                <input
                  name="desc"
                  placeholder="e.g. Sprint 14 Release Candidate"
                  className="w-full bg-[var(--surface2)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm outline-none focus:border-[var(--accent)] transition-colors"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-lg text-sm font-medium text-[var(--text2)] hover:bg-[var(--surface2)] transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-[var(--accent)] text-white px-5 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-all shadow-lg active:scale-95"
              >
                Create Session
              </button>
            </div>
          </motion.form>
        </div>
      )}

      {/* Toast Notification */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            className="fixed bottom-6 right-6 bg-[var(--surface2)] border border-[var(--border2)] px-4 py-2.5 rounded-xl shadow-xl z-[9999] flex items-center gap-3"
          >
            <div className="w-5 h-5 rounded-full bg-[var(--accent-dim)] flex items-center justify-center text-[var(--accent)]">
              <Check size={12} strokeWidth={3} />
            </div>
            <span className="text-sm font-medium">{toast.msg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom Delete Confirmation Modal */}
      {deleteConf && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[2000] flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[var(--surface)] border border-[var(--border2)] rounded-[18px] p-6 w-full max-w-sm shadow-2xl relative overflow-hidden text-left"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 shrink-0">
                <Trash2 size={20} />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-bold text-[var(--text-highlight)]">
                  {deleteConf.title}
                </h3>
                <p className="text-xs text-[var(--text2)] mt-1.5 leading-relaxed">
                  {deleteConf.message}
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={() => setDeleteConf(null)}
                className="px-4 py-2 rounded-lg text-xs font-medium text-[var(--text2)] hover:bg-[var(--surface2)] transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  deleteConf.onConfirm();
                  setDeleteConf(null);
                }}
                className="bg-red-500 text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-red-650 transition-all shadow-lg active:scale-95"
              >
                {deleteConf.confirmText || "Delete"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

function SidebarItem({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2 rounded text-sm transition-all ${active ? "bg-[var(--text-highlight)] text-[var(--bg)] font-semibold" : "text-[var(--text-muted)] hover:text-[var(--text-highlight)]"}`}
    >
      <span
        className={
          active ? "text-[var(--bg)]" : "text-[var(--text-muted)] opacity-60"
        }
      >
        {icon}
      </span>
      {label}
    </button>
  );
}

function DashboardView({
  stats,
  risk,
  activeSession,
  onNewSess,
  onGoToTest,
  onGoToSummary,
}: any) {
  if (!activeSession) {
    return (
      <div className="flex-1 bg-[var(--surface)] rounded-xl border border-[var(--border)] shadow-2xl p-12 flex flex-col items-center justify-center">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 bg-[var(--text-highlight)]/5 border border-[var(--text-highlight)]/10 rounded-2xl mx-auto mb-6 flex items-center justify-center text-[var(--text-highlight)]">
            <Package size={32} />
          </div>
          <h1 className="text-3xl font-light text-[var(--text-highlight)] mb-3 tracking-tight">
            Compliance Tracking
          </h1>
          <p className="text-[var(--text-muted)] text-sm mb-8 leading-relaxed italic">
            Your real-time compliance environment is not active. Create a build
            session to synchronize results and functional status.
          </p>
          <button
            onClick={onNewSess}
            className="px-6 py-2 bg-[var(--text-highlight)] text-[var(--bg)] text-sm font-medium rounded hover:opacity-90 transition-all shadow-lg active:scale-95"
          >
            + Start New Session
          </button>
        </div>
      </div>
    );
  }

  const completionPct = stats.total
    ? Math.round(((stats.pass + stats.fail + stats.na) / stats.total) * 100)
    : 0;

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-light text-[var(--text-highlight)] mb-2 tracking-tight">
            Pass Overview
          </h1>
          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${risk.cls === "pass" ? "bg-green-500" : "bg-orange-500"}`}
            />
            <span className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-widest">
              {risk.label} &middot; Score {risk.score}
            </span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest mb-1">
            Last Update
          </p>
          <p className="text-xs text-[var(--text-highlight)]">
            {new Date(activeSession.created).toLocaleTimeString()} Today
          </p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <StatCard label="Total Items" val={stats.total} />
        <StatCard label="Passed Tests" val={stats.pass} color="#22c55e" />
        <StatCard label="Violations" val={stats.fail} color="#ef4444" />
        <StatCard label="Pending Tests" val={stats.nt} />
      </div>

      <div className="bg-[var(--surface)] rounded-xl border border-[var(--border)] shadow-xl p-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-widest">
            Build Deployment Integrity
          </h3>
          <span className="text-sm font-mono text-[var(--text-highlight)]">
            {completionPct}%
          </span>
        </div>
        <div className="h-1.5 bg-[var(--bg)]/40 rounded-full overflow-hidden flex border border-[var(--border)]/50">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(stats.pass / stats.total) * 100}%` }}
            className="bg-[var(--text-highlight)] h-full"
          />
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(stats.fail / stats.total) * 100}%` }}
            className="bg-red-500/80 h-full"
          />
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(stats.na / stats.total) * 100}%` }}
            className="bg-[var(--text-muted)] h-full"
          />
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-[var(--bg)]/20 border border-[var(--border)]">
            <p className="text-[10px] uppercase tracking-wider text-[var(--text-muted)] mb-1">
              Active Version
            </p>
            <p className="text-xl font-medium text-[var(--text-highlight)]">
              {activeSession.version}
            </p>
          </div>
          <div className="p-4 rounded-lg bg-[var(--bg)]/20 border border-[var(--border)]">
            <p className="text-[10px] uppercase tracking-wider text-[var(--text-muted)] mb-1">
              Lead Tester
            </p>
            <p className="text-xl font-medium text-[var(--text-highlight)]">
              {activeSession.tester}
            </p>
          </div>
        </div>
        <div className="mt-8 flex gap-3">
          <button
            onClick={onGoToTest}
            className="px-5 py-2 bg-[var(--text-highlight)] text-[var(--bg)] text-sm font-medium rounded hover:opacity-90 transition-all shadow-lg active:scale-95"
          >
            Open Workbench &rarr;
          </button>
          <button
            onClick={onGoToSummary}
            className="px-5 py-2 bg-transparent text-[var(--text-muted)] border border-[var(--border)] text-sm font-medium rounded hover:bg-[var(--surface2)] hover:text-[var(--text-highlight)] transition-all"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, val, color }: any) {
  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6 shadow-sm hover:border-[var(--text-muted)] transition-colors">
      <div className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest mb-2">
        {label}
      </div>
      <div
        className="text-3xl font-medium text-[var(--text-highlight)]"
        style={{ color: color }}
      >
        {val}
      </div>
    </div>
  );
}

function SessionsView({
  sessions,
  activeId,
  onSelect,
  onDelete,
  onNewSess,
}: any) {
  const [expandedNoteIds, setExpandedNoteIds] = useState<Record<string, boolean>>({});

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-light text-[var(--text-highlight)] mb-2 tracking-tight">
            Test Sessions
          </h1>
          <p className="text-[var(--text-muted)] text-sm italic">
            Previous first-party Compliance Passes
          </p>
        </div>
        <button
          onClick={onNewSess}
          className="px-5 py-2 bg-[var(--text-highlight)] text-[var(--bg)] text-sm font-medium rounded hover:opacity-90 transition-all shadow-lg"
        >
          + New Session
        </button>
      </div>

      <div className="grid gap-4">
        {sessions.length === 0 ? (
          <div className="py-20 text-center text-[var(--text-muted)] border border-dashed border-[var(--border)] rounded-2xl bg-[var(--surface)]/10">
            No sessions recorded yet.
          </div>
        ) : (
          sessions.map((s: Session) => (
            <div
              key={s.id}
              onClick={() => onSelect(s.id)}
              className={`group relative flex flex-col p-6 rounded-xl border transition-all cursor-pointer ${
                s.id === activeId
                  ? "bg-[var(--accent-dim)] border-[var(--accent)] shadow-md shadow-glow text-[var(--text-highlight)]"
                  : "bg-[var(--surface)] border-[var(--border)] hover:border-[var(--text-muted)] text-[var(--text-highlight)]"
              }`}
            >
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-6">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
                      s.id === activeId
                        ? "bg-[var(--accent)] text-[var(--bg)] shadow-sm"
                        : "bg-[var(--surface2)] text-[var(--text-muted)]"
                    }`}
                  >
                    <Package size={24} />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1 flex-wrap">
                      <h3 className="font-semibold text-lg tracking-tight">
                        {s.version}
                      </h3>
                      {s.milestone && (
                        <span className="text-[11px] font-medium bg-[var(--surface2)] text-[var(--text-muted)] border border-[var(--border)] px-2.5 py-0.5 rounded-full">
                          {s.milestone}
                        </span>
                      )}
                      {s.id === activeId && (
                        <span className="text-[10px] font-bold bg-[var(--accent)] text-[var(--bg)] px-2 py-0.5 rounded uppercase tracking-widest">
                          Active
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[var(--text-muted)] font-mono">
                      {s.tester} &middot; Build {s.build || "N/A"} &middot;{" "}
                      {new Date(s.created).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpandedNoteIds((prev) => ({
                        ...prev,
                        [s.id]: !prev[s.id],
                      }));
                    }}
                    className={`p-2 rounded-full border transition-all ${
                      expandedNoteIds[s.id]
                        ? "bg-[var(--accent)] text-[var(--bg)] border-[var(--accent)] shadow-sm"
                        : "bg-[var(--surface2)] text-[var(--text-muted)] hover:text-[var(--text-highlight)] border-[var(--border)] hover:bg-[var(--surface3)]"
                    }`}
                    title="View Internal Note"
                  >
                    <Info size={16} />
                  </button>

                  <button
                    onClick={(e) => onDelete(e, s.id)}
                    className="p-2 transition-all rounded-full hover:bg-red-500/10 text-[var(--text-muted)] hover:text-red-500"
                    title="Delete Session"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              {/* Collapsible notes with slide/fade animation */}
              <AnimatePresence>
                {expandedNoteIds[s.id] && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="p-4 rounded-lg bg-[var(--surface2)] border border-[var(--border)] text-sm">
                      <div className="text-[10px] uppercase tracking-widest font-bold text-[var(--text-muted)] mb-1">
                        Internal Note
                      </div>
                      <p className="text-[var(--text)] leading-relaxed">
                        {s.desc ? s.desc : <span className="italic text-[var(--text-muted)]">No internal note specified.</span>}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function ExecuteView({
  state,
  setState,
  db,
  activeTcs,
  executions,
  setStatus,
  bulkSetStatus,
  expandedTc,
  setExpandedTc,
  showToast,
  icons,
  setDeleteConf,
}: any) {
  const [filterQuery, setFilterQuery] = useState("");
  const [activeSectionId, setActiveSectionId] = useState("all");

  // Custom Test Case form states
  const [showAddForm, setShowAddForm] = useState(false);
  const [newRef, setNewRef] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newSteps, setNewSteps] = useState("");
  const [newExpected, setNewExpected] = useState("");
  const [newOriginalRef, setNewOriginalRef] = useState("");

  const filtered = activeTcs.filter((tc: TestCase) => {
    if (activeSectionId !== "all" && tc.gl !== activeSectionId) return false;
    const num = getTestCaseNumber(tc, db.testCases);
    const text = (tc.title + tc.ref + " " + num).toLowerCase();
    return text.includes(filterQuery.toLowerCase());
  });

  // Grouping logic for "guideline bundles" with full Section > Header hierarchy
  const grouped = useMemo(() => {
    const sectionMap: Record<
      string,
      { guideline: Guideline; bundles: { header: string; tcs: TestCase[] }[] }
    > = {};

    filtered.forEach((tc: TestCase) => {
      const glId = tc.gl;
      if (!sectionMap[glId]) {
        const guideline = db.guidelines.find((g) => g.id === glId);
        if (guideline) {
          sectionMap[glId] = { guideline, bundles: [] };
        } else {
          sectionMap[glId] = {
            guideline: {
              id: glId,
              title: "Section",
              description: "",
              category: "",
              impact: "medium",
            },
            bundles: [],
          };
        }
      }

      const bundles = sectionMap[glId].bundles;
      const tcHeader = tc.originalRef || "General";

      let bundle = bundles.find((b) => b.header === tcHeader);
      if (!bundle) {
        bundle = { header: tcHeader, tcs: [] };
        bundles.push(bundle);
      }
      bundle.tcs.push(tc);
    });

    return Object.values(sectionMap);
  }, [filtered, db.guidelines]);

  const handleCreateTestCase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const targetGl =
      activeSectionId === "all"
        ? db.guidelines[0]?.id || "GL-001"
        : activeSectionId;
    const newTc: TestCase = {
      id: "custom-" + Date.now(),
      gl: targetGl,
      ref: newRef.trim() || "1.0",
      title: newTitle.trim(),
      steps:
        newSteps.trim() ||
        "1. Run manual policy validation checks.\n2. Confirm target complies with standard rules.",
      expected:
        newExpected.trim() ||
        "No policy or security failures detected during evaluation.",
      originalRef:
        newOriginalRef.trim() ||
        db.guidelines.find((g) => g.id === targetGl)?.title ||
        "General",
    };

    setState((prev: any) => ({
      ...prev,
      customTcs: [...(prev.customTcs || []), newTc],
    }));

    // Clear form fields
    setNewRef("");
    setNewTitle("");
    setNewSteps("");
    setNewExpected("");
    setNewOriginalRef("");
    setShowAddForm(false);
    showToast("Custom compliance checkpoint created successfully.");
  };

  const activeGlObject = db.guidelines.find(
    (g: any) => g.id === activeSectionId,
  );

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-light text-[var(--text-highlight)] mb-2 tracking-tight">
            Workbench
          </h1>
          <p className="text-[var(--text-muted)] text-sm">
            Interactive first-party Compliance test-case verification
          </p>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest mb-1">
            Test suite size
          </p>
          <p className="text-xs text-[var(--text-highlight)] font-mono">
            {filtered.length} active test cases
          </p>
        </div>
      </div>

      {/* Spreadsheet / Excel Sheet Tabs */}
      <div className="flex items-end border-b border-[var(--border)] overflow-x-auto scrollbar-none pt-2 -mb-2 gap-1 select-none">
        <button
          onClick={() => {
            setActiveSectionId("all");
            setShowAddForm(false);
          }}
          className={`px-4 py-2 text-xs font-mono tracking-tight border-t border-x rounded-t transition-all flex items-center gap-2 -mb-[1px] ${
            activeSectionId === "all"
              ? "bg-[var(--surface)] text-[var(--text-highlight)] font-bold border-[var(--border)] border-b-[var(--surface)] z-10"
              : "bg-transparent text-[var(--text-muted)] border-transparent hover:text-[var(--text-highlight)] hover:bg-[var(--surface2)]/50"
          }`}
          style={{
            borderBottomColor:
              activeSectionId === "all" ? "var(--surface)" : undefined,
          }}
        >
          <span>📋</span>
          <span>All Guidelines</span>
        </button>
        {db.guidelines.map((gl: any) => {
          const glIcon = icons[gl.title] || "📄";
          const isActive = activeSectionId === gl.id;
          return (
            <button
              key={gl.id}
              onClick={() => {
                setActiveSectionId(gl.id);
                setShowAddForm(false);
              }}
              className={`px-4 py-2 text-xs font-mono tracking-tight border-t border-x rounded-t transition-all flex items-center gap-2 -mb-[1px] ${
                isActive
                  ? "bg-[var(--surface)] text-[var(--text-highlight)] font-bold border-[var(--border)] border-b-[var(--surface)] z-10"
                  : "bg-transparent text-[var(--text-muted)] border-transparent hover:text-[var(--text-highlight)] hover:bg-[var(--surface2)]/50"
              }`}
              style={{
                borderBottomColor: isActive ? "var(--surface)" : undefined,
              }}
            >
              <span>{glIcon}</span>
              <span>{gl.title}</span>
            </button>
          );
        })}
      </div>

      {/* Manual Custom Test Case Builder panel (rendered conditionally or inline) */}
      {showAddForm && (
        <form
          onSubmit={handleCreateTestCase}
          className="space-y-4 bg-[var(--surface)] border border-[var(--border2)] p-6 rounded-xl animate-in slide-in-from-top-4 duration-300"
        >
          <div className="flex justify-between items-center pb-2 border-b border-[var(--border)]">
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[var(--text-highlight)]">
              Manual Test Case Builder &rarr;{" "}
              {activeSectionId === "all"
                ? "Compliance"
                : activeGlObject?.title || "Section"}
            </h3>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="text-xs text-[var(--text-muted)] hover:text-[var(--text-highlight)]"
            >
              Close
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1">
                Index / Ref Code
              </label>
              <input
                placeholder="e.g. 5.1.1"
                value={newRef}
                onChange={(e) => setNewRef(e.target.value)}
                className="w-full bg-[var(--bg)]/50 border border-[var(--border)] rounded px-3 py-1.5 text-xs text-[var(--text-highlight)] outline-none focus:border-[var(--text-muted)]"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1">
                Sub-Category Grouping (originalRef)
              </label>
              <input
                placeholder="e.g. Camera & Media, VPN Apps, MDM"
                value={newOriginalRef}
                onChange={(e) => setNewOriginalRef(e.target.value)}
                className="w-full bg-[var(--bg)]/50 border border-[var(--border)] rounded px-3 py-1.5 text-xs text-[var(--text-highlight)] outline-none focus:border-[var(--text-muted)]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1">
              Guideline Title / Core Rule Description *
            </label>
            <input
              required
              placeholder="e.g. Sweepstakes and contests must be sponsored by the developer"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full bg-[var(--bg)]/50 border border-[var(--border)] rounded px-3 py-1.5 text-xs text-[var(--text-highlight)] outline-none focus:border-[var(--text-muted)]"
            />
          </div>

          <div>
            <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1">
              Manual Evaluation Steps (one workflow per line)
            </label>
            <textarea
              rows={3}
              placeholder="1. Open App interface and review contest rules.&#10;2. Confirm Apple is declared not to be involved."
              value={newSteps}
              onChange={(e) => setNewSteps(e.target.value)}
              className="w-full bg-[var(--bg)]/50 border border-[var(--border)] rounded p-3 text-xs text-[var(--text-highlight)] outline-none focus:border-[var(--text-muted)] font-mono resize-none leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1">
              Deterministic Expected Result Outcome
            </label>
            <input
              placeholder="e.g. Disclaimers are clearly visible; Apple is completely separated from sponsorship labels."
              value={newExpected}
              onChange={(e) => setNewExpected(e.target.value)}
              className="w-full bg-[var(--bg)]/50 border border-[var(--border)] rounded px-3 py-1.5 text-xs text-[var(--text-highlight)] outline-none focus:border-[var(--text-muted)]"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-3 py-1.5 rounded text-xs text-[var(--text-muted)] hover:text-[var(--text-highlight)] font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[var(--text-highlight)] text-[var(--bg)] px-4 py-1.5 rounded text-xs font-bold hover:opacity-90 transition-all shadow active:scale-95 flex items-center gap-1.5"
            >
              <Plus size={11} strokeWidth={3} /> Add Manual Test Case
            </button>
          </div>
        </form>
      )}

      {/* Control Filters */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-1 flex items-center gap-3 shadow-inner shadow-black/20">
        <input
          placeholder={`Filter ${activeSectionId === "all" ? "all guidelines" : activeGlObject?.title || "current"} test cases by identifier or keyword...`}
          className="flex-1 bg-transparent border-none outline-none px-3 py-1.5 text-xs text-[var(--text-highlight)] placeholder:text-[var(--text-muted)]"
          value={filterQuery}
          onChange={(e) => setFilterQuery(e.target.value)}
        />
        <div className="px-3 border-l border-[var(--border)] text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-widest flex items-center gap-3">
          <span>{filtered.length} total</span>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-1 px-2 py-0.5 bg-[var(--surface2)] hover:bg-[var(--surface3)] border border-[var(--border)] text-[8px] font-bold uppercase text-[var(--text-highlight)] rounded transition-all"
          >
            <Plus size={9} strokeWidth={2.5} />{" "}
            {showAddForm ? "Hide Builder" : "Create Test Case"}
          </button>
        </div>
      </div>

      <div className="space-y-20">
        {filtered.length === 0 ? (
          <div className="bg-[var(--surface)] p-12 text-center rounded-xl border border-[var(--border)] max-w-xl mx-auto space-y-6">
            <div className="w-16 h-16 bg-[var(--text-muted)]/10 text-[var(--text-muted)] rounded-2xl mx-auto flex items-center justify-center text-xl">
              📄
            </div>
            <div>
              <h2 className="text-lg font-mono text-[var(--text-highlight)] uppercase tracking-wider mb-2">
                No Compliance Test Cases Found
              </h2>
              <p className="text-sm text-[var(--text-muted)] italic leading-relaxed">
                The "
                {activeSectionId === "all"
                  ? "All"
                  : activeGlObject?.title || activeSectionId}
                " section does not have any active compliance check test cases
                recorded.
              </p>
              <p className="text-xs text-[var(--text-muted)] mt-2">
                Click "Build Test Cases Manually" to open the interactive
                builder and specify your checklist rules directly in the app!
              </p>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="px-4 py-2 bg-[var(--text-highlight)] text-[var(--bg)] text-xs font-bold rounded hover:opacity-90 transition-all shadow-md inline-flex items-center gap-1"
            >
              <Plus size={12} strokeWidth={3} /> Build Test Cases Manually
            </button>
          </div>
        ) : (
          grouped.map((section, sIdx) => {
            if (section.guideline.id === "AGL-005") {
              return (
                <div key={sIdx} className="space-y-6">
                  {/* Section Name */}
                  <div className="relative">
                    <div className="flex items-baseline gap-4 mb-2">
                      <span className="text-[10px] font-mono text-[var(--text-muted)]">
                        Section
                      </span>
                      <h2 className="text-2xl font-light text-[var(--text-highlight)] uppercase tracking-[0.2em]">
                        {section.guideline.title}
                      </h2>
                    </div>
                    <div className="h-[2px] w-24 bg-[var(--text-highlight)]" />
                  </div>

                  <div className="pt-2">
                    <PlayGamesServicesChecklist
                      tcs={section.bundles.flatMap((b: any) => b.tcs)}
                      executions={executions}
                      setStatus={setStatus}
                      setState={setState}
                      showToast={showToast}
                      expandedTc={expandedTc}
                      setExpandedTc={setExpandedTc}
                    />
                  </div>
                </div>
              );
            }
            return (
              <div key={sIdx} className="space-y-12">
                {/* Section Name */}
                <div className="relative">
                  <div className="flex items-baseline gap-4 mb-2">
                    <span className="text-[10px] font-mono text-[var(--text-muted)]">
                      Section
                    </span>
                    <h2 className="text-2xl font-light text-[var(--text-highlight)] uppercase tracking-[0.2em]">
                      {section.guideline.title}
                    </h2>
                  </div>
                  <div className="h-[2px] w-24 bg-[var(--text-highlight)]" />
                </div>

                <div className="space-y-12 ml-4">
                  {section.bundles.map((bundle: any, bIdx: number) => (
                    <div key={bIdx} className="space-y-6">
                      {/* Section Header */}
                      {bundle.header && (
                        <div className="flex items-center gap-4 group/header">
                          <div className="w-1.5 h-1.5 rounded-full bg-[var(--text-muted)]" />
                          <h3 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-[0.2em]">
                            {bundle.header}
                          </h3>
                          <div className="h-px bg-[var(--surface2)] flex-1" />
                          <div className="flex gap-2">
                            <button
                              onClick={() =>
                                bulkSetStatus(
                                  bundle.tcs.map((t: TestCase) => t.id),
                                  "pass",
                                )
                              }
                              className="px-3 py-1 rounded text-[9px] font-bold uppercase tracking-tighter bg-green-500/10 text-green-500 border border-green-500/20 hover:bg-green-500 hover:text-black transition-all"
                            >
                              Bulk Pass
                            </button>
                            <button
                              onClick={() =>
                                bulkSetStatus(
                                  bundle.tcs.map((t: TestCase) => t.id),
                                  "not_applicable",
                                )
                              }
                              className="px-3 py-1 rounded text-[9px] font-bold uppercase tracking-tighter bg-orange-500/10 text-orange-500 border border-orange-500/20 hover:bg-orange-500 hover:text-black transition-all"
                            >
                              Bulk N/A
                            </button>
                          </div>
                        </div>
                      )}

                      <div className="space-y-3">
                        {bundle.tcs.map((tc: any) => {
                          const num = getTestCaseNumber(tc, db.testCases);
                          return (
                            <TestCaseRow
                              key={tc.id}
                              tc={tc}
                              tcNumber={num}
                              execution={executions[tc.id]}
                              setStatus={setStatus}
                              setState={setState}
                              showToast={showToast}
                              isExpanded={expandedTc === tc.id}
                              onToggle={() =>
                                setExpandedTc(
                                  expandedTc === tc.id ? null : tc.id,
                                )
                              }
                              setDeleteConf={setDeleteConf}
                            />
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        )}

        {/* SUBSCRIPTION FLOW DEMO BOTTOM ENTRY */}
        {(state.platform === "ios" || db?.platform === "ios") &&
          (activeSectionId === "GL-006" ||
            (activeGlObject && activeGlObject.title === "Subscriptions")) && (
            <div className="mt-16 pt-12 border-t border-[var(--border)] space-y-6">
              <div className="relative">
                <div className="flex items-baseline gap-4 mb-2">
                  <span className="text-[10px] font-mono text-[var(--text-muted)]">
                    Interactive Simulation
                  </span>
                  <h2 className="text-xl font-bold text-[var(--text-highlight)] uppercase tracking-wider">
                    Subscription Flow Demo
                  </h2>
                </div>
                <div className="h-[2px] w-24 bg-indigo-600" />
              </div>

              <SubscriptionComplianceDemo tcId="iOS-SUB-demo" />
            </div>
          )}
      </div>
    </div>
  );
}

function ButtonComplianceDemo({ tcId }: { tcId: string }) {
  const [borderRadius, setBorderRadius] = React.useState(8);
  const [buttonWidth, setButtonWidth] = React.useState(240);
  const [buttonHeight, setButtonHeight] = React.useState(44);
  const [customLeftHeight, setCustomLeftHeight] = React.useState(44);
  const [customLeftLabel, setCustomLeftLabel] =
    React.useState("Sign in with Apple");
  const [selectedGroupIdx, setSelectedGroupIdx] = React.useState(0);
  const [permissionState, setPermissionState] = React.useState<
    | "rationale"
    | "sys_popup_1"
    | "warning"
    | "sys_popup_2"
    | "denied_never"
    | "granted"
    | "settings"
  >("rationale");
  const [isNeverAskAgainChecked, setIsNeverAskAgainChecked] =
    React.useState(false);
  const [settingsToggled, setSettingsToggled] = React.useState(false);

  if (
    !tcId ||
    (!tcId.startsWith("iOS-AS-BTN-") &&
      tcId !== "And-FTC-4.8" &&
      tcId !== "And-CAF-7.4")
  )
    return null;

  // Real vector high-fidelity standard Apple logo (perfect proportions, no distortion)
  const appleLogo = (
    <svg
      className="w-4 h-4 fill-current mr-2 inline-block shrink-0"
      viewBox="0 0 24 24"
      style={{ top: "-0.5px", position: "relative" }}
    >
      <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.79 22.05 6.8 20.68 5.96 19.48C4.25 17 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.1 16.67C20.08 16.74 19.67 18.11 18.71 19.5M15.97 4.17C16.63 3.37 17.07 2.28 16.95 1C16.01 1.04 14.86 1.63 14.19 2.42C13.62 3.08 13.12 4.19 13.27 5.45C14.31 5.53 15.31 4.93 15.97 4.17Z" />
    </svg>
  );

  return (
    <div className="w-full bg-[var(--surface2)]/80 rounded-2xl p-6 border border-[var(--border)] space-y-6">
      <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-highlight)] flex items-center gap-2">
          <span>📐 Visual Compliance Helper & Reference Mockups</span>
        </h4>
        <span className="text-[10px] bg-indigo-500/15 text-indigo-400 font-mono px-2 py-0.5 rounded border border-indigo-500/20 uppercase font-bold">
          Interactive Spec
        </span>
      </div>

      {tcId === "iOS-AS-BTN-1" && (
        <div className="space-y-4">
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            The Sign in with Apple button must be{" "}
            <strong>prominently featured</strong>, have at least identical
            dimensions/weight to alternative sign-in tools, and be easily
            reached without initial layout scrolls.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Correct */}
            <div className="border border-green-500/20 bg-green-500/5 rounded-xl p-5 space-y-4 relative overflow-hidden">
              <span className="absolute top-3 right-3 text-green-500 flex items-center gap-1 text-[10px] font-mono font-bold bg-green-500/10 px-2 py-0.5 rounded border border-green-500/20">
                <Check size={11} /> COMPLIANT
              </span>
              <p className="text-xs font-bold text-green-600 dark:text-green-400 uppercase tracking-wide">
                Proper Visual Hierarchy
              </p>

              <div className="space-y-2 max-w-xs mx-auto bg-[var(--surface2)] p-4 rounded-lg border border-[var(--border)]">
                <div className="h-2 w-1/3 bg-[var(--text-muted)]/20 rounded mb-4 mx-auto" />
                <button className="w-full h-10 bg-black text-white hover:bg-zinc-900 rounded-lg flex items-center justify-center font-semibold text-xs transition-all shadow-md">
                  {appleLogo} Sign in with Apple
                </button>
                <button className="w-full h-10 bg-[var(--surface3)] text-[var(--text-highlight)] rounded-lg flex items-center justify-center text-xs transition-all border border-[var(--border)] hover:bg-[var(--surface2)]">
                  <span className="w-3.5 h-3.5 rounded-full bg-blue-500 mr-2 flex items-center justify-center text-[7px] font-bold text-white">
                    G
                  </span>{" "}
                  Sign in with Google
                </button>
              </div>
              <p className="text-[10px] text-[var(--text-muted)] text-center">
                Same size, cleanly stacked on top of alternative identity
                services above the fold.
              </p>
            </div>

            {/* In-Correct */}
            <div className="border border-red-500/20 bg-red-500/5 rounded-xl p-5 space-y-4 relative overflow-hidden">
              <span className="absolute top-3 right-3 text-red-500 flex items-center gap-1 text-[10px] font-mono font-bold bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">
                <X size={11} /> NON-COMPLIANT
              </span>
              <p className="text-xs font-bold text-red-650 dark:text-red-400 uppercase tracking-wide">
                Hidden / Disproportionate
              </p>

              <div className="space-y-2 max-w-xs mx-auto bg-[var(--surface2)] p-4 rounded-lg border border-[var(--border)]">
                <div className="h-2 w-1/3 bg-[var(--text-muted)]/20 rounded mb-4 mx-auto" />
                <button className="w-full h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-xs">
                  Sign in with Google
                </button>
                <button className="w-full h-10 bg-indigo-600 text-white rounded-lg flex items-center justify-center font-bold text-xs">
                  Sign in with Facebook
                </button>
                <div className="h-10 border-dashed border border-[var(--border)] rounded-lg flex items-center justify-center text-[9px] text-[var(--text-muted)]">
                  [Requires scroll view to proceed...]
                </div>
                <button className="w-4/5 mx-auto h-6 bg-black text-white hover:bg-zinc-900 rounded-full flex items-center justify-center text-[9px] font-medium">
                  {appleLogo} Apple Setup
                </button>
              </div>
              <p className="text-[10px] text-[var(--text-muted)] text-center">
                Apple option is squeezed at the bottom below other options,
                requiring user scroll.
              </p>
            </div>
          </div>
        </div>
      )}

      {tcId === "iOS-AS-BTN-2" && (
        <div className="space-y-5">
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            Only approved title templates are permitted. Adjust the interactive
            controls below to preview how to configure key sizes and roundnesses
            conforming with official guidelines.
          </p>

          <div className="flex flex-wrap gap-6 bg-[var(--surface2)] p-4 rounded-xl border border-[var(--border)] text-xs">
            <div className="space-y-2 shrink-0">
              <label className="text-[10px] text-[var(--text-muted)] block font-mono">
                Corner Radius: {borderRadius}px
              </label>
              <input
                type="range"
                min="0"
                max="22"
                value={borderRadius}
                onChange={(e) => setBorderRadius(Number(e.target.value))}
                className="w-32 accent-indigo-500 bg-[var(--surface3)]"
              />
            </div>
            <div className="space-y-2 shrink-0">
              <label className="text-[10px] text-[var(--text-muted)] block font-mono">
                Button Width: {buttonWidth}px
              </label>
              <input
                type="range"
                min="180"
                max="320"
                value={buttonWidth}
                onChange={(e) => setButtonWidth(Number(e.target.value))}
                className="w-32 accent-indigo-500 bg-[var(--surface3)]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {[
              "Sign in with Apple",
              "Sign up with Apple",
              "Continue with Apple",
            ].map((title, i) => (
              <div
                key={i}
                className="bg-[var(--surface2)] p-5 rounded-xl border border-[var(--border)] flex flex-col items-center justify-center gap-4 text-center"
              >
                <span className="text-[10px] font-mono text-[var(--text-muted)]">
                  Variant {i + 1}: {title}
                </span>
                <button
                  style={{
                    borderRadius: `${borderRadius}px`,
                    width: `${buttonWidth}px`,
                  }}
                  className="h-10 bg-black text-white font-medium text-xs flex items-center justify-center border border-zinc-800 text-center select-none shrink-0"
                >
                  {appleLogo} {title}
                </button>
                <span className="text-[9px] text-green-600 dark:text-green-400 font-mono flex items-center gap-1 font-bold">
                  <Check size={10} /> Valid Approved Label
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {tcId === "iOS-AS-BTN-3" && (
        <div className="space-y-4">
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            On <strong>watchOS</strong>, the system operates with lower screen
            real estate and supports exactly one approved compact variant:{" "}
            <strong>'Sign in'</strong>.
          </p>
          <div className="flex justify-center py-4">
            {/* watchOS device simulator look */}
            <div className="w-48 h-60 rounded-[40px] bg-zinc-800 border-4 border-zinc-700 p-2.5 shadow-2xl relative flex flex-col items-center justify-center">
              {/* crown button */}
              <div className="absolute top-16 -right-1 w-1.5 h-8 bg-zinc-700 rounded-l" />
              {/* watch screen */}
              <div className="w-full h-full bg-black rounded-[28px] p-3 flex flex-col items-center justify-between text-center border border-black/40">
                <div className="w-10 h-0.5 bg-zinc-800 rounded-full mx-auto" />
                <div className="space-y-1">
                  <p className="text-[10px] text-zinc-300 font-medium font-sans">
                    App Link
                  </p>
                  <p className="text-[8px] text-zinc-400 font-sans leading-none">
                    Tap to link credentials
                  </p>
                </div>

                <button className="w-full h-9 bg-[#2c2c2e] hover:bg-zinc-800 text-white rounded-full flex items-center justify-center font-semibold text-[10px] select-none border border-zinc-700">
                  {appleLogo} Sign in
                </button>

                <div className="text-[7px] text-zinc-450 font-mono uppercase tracking-wider">
                   WATCH COMPLIANCE
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {tcId === "iOS-AS-BTN-4" && (
        <div className="space-y-4">
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            The solid <strong>White Style</strong> button must only be
            implemented over reasonably dark or highly saturated colored
            backgrounds that offer proper natural contrast separation.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Correct */}
            <div className="border border-green-500/20 bg-green-500/5 rounded-xl p-5 space-y-4 relative overflow-hidden">
              <span className="absolute top-3 right-3 text-green-500 flex items-center gap-1 text-[10px] font-mono font-bold bg-green-500/10 px-2 py-0.5 rounded border border-green-500/20">
                <Check size={11} /> COMPLIANT
              </span>
              <p className="text-xs font-bold text-green-600 dark:text-green-400 uppercase tracking-wide">
                Dark Contrast Backdrop
              </p>

              <div className="h-28 bg-slate-950 rounded-xl flex flex-col items-center justify-center p-4 border border-slate-800">
                <button className="h-10 w-44 bg-white text-black font-semibold text-xs rounded-lg flex items-center justify-center shadow">
                  {appleLogo} Sign in with Apple
                </button>
              </div>
              <p className="text-[10px] text-[var(--text-muted)] text-center">
                White button stands out with solid clarity over dark slate
                canvas (#0f172a).
              </p>
            </div>

            {/* Incorrect */}
            <div className="border border-red-500/20 bg-red-500/5 rounded-xl p-5 space-y-4 relative overflow-hidden">
              <span className="absolute top-3 right-3 text-red-500 flex items-center gap-1 text-[10px] font-mono font-bold bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">
                <X size={11} /> NON-COMPLIANT
              </span>
              <p className="text-xs font-bold text-red-650 dark:text-red-400 uppercase tracking-wide">
                Low Contrast Backdrop
              </p>

              <div className="h-28 bg-zinc-200 rounded-xl flex flex-col items-center justify-center p-4 border border-zinc-300">
                <button className="h-10 w-44 bg-white text-black font-semibold text-xs rounded-lg flex items-center justify-center shadow-sm">
                  {appleLogo} Sign in with Apple
                </button>
              </div>
              <p className="text-[10px] text-[var(--text-muted)] text-center">
                White button blurs and becomes invisible against light grey
                backdrops.
              </p>
            </div>
          </div>
        </div>
      )}

      {tcId === "iOS-AS-BTN-5" && (
        <div className="space-y-4">
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            The <strong>White with Outline Style</strong> button is designed
            explicitly for pale or transparent light backdrops. It must never be
            applied to dark backgrounds where outline clashing would produce
            visual noise.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Correct */}
            <div className="border border-green-500/20 bg-green-500/5 rounded-xl p-5 space-y-4 relative overflow-hidden">
              <span className="absolute top-3 right-3 text-green-500 flex items-center gap-1 text-[10px] font-mono font-bold bg-green-500/10 px-2 py-0.5 rounded border border-green-500/20">
                <Check size={11} /> COMPLIANT
              </span>
              <p className="text-xs font-bold text-green-600 dark:text-green-400 uppercase tracking-wide">
                Clean Light Background
              </p>

              <div className="h-28 bg-white rounded-xl flex flex-col items-center justify-center p-4 border border-zinc-200">
                <button className="h-10 w-44 bg-white text-black font-semibold text-xs rounded-lg flex items-center justify-center border border-black shadow-sm">
                  {appleLogo} Sign in with Apple
                </button>
              </div>
              <p className="text-[10px] text-[var(--text-muted)] text-center">
                The outline is perfectly legible against the solid white
                background.
              </p>
            </div>

            {/* Incorrect */}
            <div className="border border-red-500/20 bg-red-500/5 rounded-xl p-5 space-y-4 relative overflow-hidden">
              <span className="absolute top-3 right-3 text-red-500 flex items-center gap-1 text-[10px] font-mono font-bold bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">
                <X size={11} /> NON-COMPLIANT
              </span>
              <p className="text-xs font-bold text-red-650 dark:text-red-400 uppercase tracking-wide">
                Dark Backdrop Clashing
              </p>

              <div className="h-28 bg-slate-950 rounded-xl flex flex-col items-center justify-center p-4 border border-slate-800">
                <button className="h-10 w-44 bg-white text-black font-semibold text-xs rounded-lg flex items-center justify-center border border-black shadow">
                  {appleLogo} Sign in with Apple
                </button>
              </div>
              <p className="text-[10px] text-[var(--text-muted)] text-center">
                Dark outline is unnecessary and adds visual clutter on an
                already dark background.
              </p>
            </div>
          </div>
        </div>
      )}

      {tcId === "iOS-AS-BTN-6" && (
        <div className="space-y-4">
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            The solid <strong>Black Style</strong> button requires maximum
            contrast. It must always be laid out over bright, light, or
            full-white backgrounds, and never on matching black canvases.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Correct */}
            <div className="border border-green-500/20 bg-green-500/5 rounded-xl p-5 space-y-4 relative overflow-hidden">
              <span className="absolute top-3 right-3 text-green-500 flex items-center gap-1 text-[10px] font-mono font-bold bg-green-500/10 px-2 py-0.5 rounded border border-green-500/20">
                <Check size={11} /> COMPLIANT
              </span>
              <p className="text-xs font-bold text-green-600 dark:text-green-400 uppercase tracking-wide">
                High Contrast On White
              </p>

              <div className="h-28 bg-white rounded-xl flex flex-col items-center justify-center p-4 border border-zinc-200">
                <button className="h-10 w-44 bg-black text-white font-semibold text-xs rounded-lg flex items-center justify-center shadow">
                  {appleLogo} Sign in with Apple
                </button>
              </div>
              <p className="text-[10px] text-[var(--text-muted)] text-center">
                Solid black is clearly defined against light backgrounds.
              </p>
            </div>

            {/* Incorrect */}
            <div className="border border-red-500/20 bg-red-500/5 rounded-xl p-5 space-y-4 relative overflow-hidden">
              <span className="absolute top-3 right-3 text-red-500 flex items-center gap-1 text-[10px] font-mono font-bold bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">
                <X size={11} /> NON-COMPLIANT
              </span>
              <p className="text-xs font-bold text-red-650 dark:text-red-400 uppercase tracking-wide">
                Dark Merge Clashing
              </p>

              <div className="h-28 bg-black rounded-xl flex flex-col items-center justify-center p-4 border border-zinc-900">
                <button className="h-10 w-44 bg-black text-white font-semibold text-xs rounded-lg flex items-center justify-center border border-zinc-800 shadow">
                  {appleLogo} Sign in with Apple
                </button>
              </div>
              <p className="text-[10px] text-[var(--text-muted)] text-center">
                The button is completely camouflaged and invisible against
                dark/black backdrops.
              </p>
            </div>
          </div>
        </div>
      )}

      {tcId === "iOS-AS-BTN-7" && (
        <div className="space-y-4">
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            Unlike other Apple platforms, the watchOS button{" "}
            <strong>must use a system-defined dark gray fill color</strong>{" "}
            rather than pure black. This provides crisp, natural separation over
            the solid black background of Apple Watch screens.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Correct/Compliant */}
            <div className="border border-green-500/20 bg-green-500/5 rounded-xl p-5 space-y-4 relative flex flex-col items-center justify-center text-center">
              <span className="absolute top-3 right-3 text-green-500 flex items-center gap-1 text-[10px] font-mono font-bold bg-green-500/10 px-2 py-0.5 rounded border border-green-500/20">
                <Check size={11} /> COMPLIANT
              </span>
              <p className="text-xs font-bold text-green-600 dark:text-green-400 uppercase tracking-wide mb-1">
                System Dark Gray Fill
              </p>

              {/* watch face simulator */}
              <div className="w-32 h-36 bg-black rounded-3xl border-2 border-zinc-700 p-2 relative flex flex-col items-center justify-center gap-3">
                <span className="text-[8px] text-zinc-350">
                  Watch Face (OLED Black)
                </span>
                <button className="w-full h-8 bg-[#2c2c2e] text-white rounded-full flex items-center justify-center font-semibold text-[9px] border border-transparent select-none">
                  {appleLogo} Sign in
                </button>
                <div className="text-[7px] text-green-450 font-mono tracking-tight font-bold">
                  Contrast Separated
                </div>
              </div>
              <p className="text-[10px] text-[var(--text-muted)] mt-2">
                The button uses{" "}
                <code className="text-indigo-400 bg-black/40 px-1 py-0.5 rounded">
                  #2c2c2e
                </code>{" "}
                dark gray, making its borders fully visible on OLED black.
              </p>
            </div>

            {/* Non-Compliant */}
            <div className="border border-red-500/20 bg-red-500/5 rounded-xl p-5 space-y-4 relative flex flex-col items-center justify-center text-center">
              <span className="absolute top-3 right-3 text-red-500 flex items-center gap-1 text-[10px] font-mono font-bold bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">
                <X size={11} /> NON-COMPLIANT
              </span>
              <p className="text-xs font-bold text-red-650 dark:text-red-400 uppercase tracking-wide mb-1">
                Pure Black Blending
              </p>

              {/* watch face simulator */}
              <div className="w-32 h-36 bg-black rounded-3xl border-2 border-zinc-700 p-2 relative flex flex-col items-center justify-center gap-3">
                <span className="text-[8px] text-zinc-350">
                  Watch Face (OLED Black)
                </span>
                <button className="w-full h-8 bg-black text-white rounded-full flex items-center justify-center font-semibold text-[9px] border-transparent select-none">
                  {appleLogo} Sign in
                </button>
                <div className="text-[7px] text-red-500/80 font-mono tracking-tight font-bold">
                  Border Melted (Merged)
                </div>
              </div>
              <p className="text-[10px] text-[var(--text-muted)] mt-2">
                The button uses pure{" "}
                <code className="text-red-400 bg-black/40 px-1 py-0.5 rounded">
                  #000000
                </code>{" "}
                body, making it fully invisible and camouflaged.
              </p>
            </div>
          </div>
        </div>
      )}

      {tcId === "iOS-AS-BTN-8" && (
        <div className="space-y-4">
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            By default, the Sign in with Apple button has rounded corners. You
            can adjust the <strong>Corner Radius</strong> to match other primary
            buttons in your layout (0px for sharp square up to 22px/automatic
            for pill shape).
          </p>

          <div className="bg-[var(--surface2)] p-4 rounded-xl border border-[var(--border)] max-w-sm mx-auto space-y-3">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-[var(--text-muted)]">Corner Radius:</span>
              <span className="text-indigo-500 dark:text-indigo-400 font-bold">
                {borderRadius}px
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="24"
              value={borderRadius}
              onChange={(e) => setBorderRadius(Number(e.target.value))}
              className="w-full accent-indigo-500 h-1.5 rounded-lg bg-[var(--surface3)]"
            />
            <div className="flex justify-between text-[10px] text-[var(--text-muted)] font-mono">
              <span>0px (Square)</span>
              <span>8px (Default)</span>
              <span>22px+ (Pill)</span>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-4 py-3 bg-[var(--surface2)]/85 border border-[var(--border)] rounded-xl max-w-md mx-auto">
            <button
              style={{ borderRadius: `${borderRadius}px` }}
              className="w-64 h-11 bg-black text-white font-medium text-xs flex items-center justify-center border border-zinc-800 shadow-md select-none transition-all hover:bg-zinc-900"
            >
              {appleLogo} Sign in with Apple
            </button>
            <div className="text-[10px] text-[var(--text)] font-mono text-center px-4 leading-relaxed">
              Your App Layout Matcher: Rendering with{" "}
              <strong className="text-[var(--text-highlight)]">
                {borderRadius}px
              </strong>{" "}
              corners. Verify that it matches surrounding interaction elements
              without clashing styles.
            </div>
          </div>
        </div>
      )}

      {tcId === "iOS-AS-BTN-9" && (
        <div className="space-y-4">
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            Sign in with Apple buttons must maintain a{" "}
            <strong>minimum width of 140px</strong>, a{" "}
            <strong>minimum height of 30px</strong>, and a surrounding{" "}
            <strong>
              safety margin of at least 1/10 of the button's height
            </strong>
            .
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[var(--surface2)] p-4 rounded-xl border border-[var(--border)] text-xs">
            <div className="space-y-2">
              <div className="flex justify-between font-mono">
                <span className="text-[var(--text-muted)]">
                  Selected Width:
                </span>
                <span className="font-bold text-[var(--text-highlight)]">
                  {buttonWidth}px
                </span>
              </div>
              <input
                type="range"
                min="100"
                max="260"
                value={buttonWidth}
                onChange={(e) => setButtonWidth(Number(e.target.value))}
                className="w-full h-1 bg-[var(--surface3)] accent-indigo-500"
              />
              <div className="flex justify-between text-[9px] font-mono text-[var(--text-muted)]">
                <span
                  className={
                    buttonWidth < 140
                      ? "text-red-500 font-bold"
                      : "text-[var(--text-muted)]"
                  }
                >
                  100px (Illegal)
                </span>
                <span className="text-green-600 dark:text-green-400 font-bold">
                  140px (Min)
                </span>
                <span>260px</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between font-mono">
                <span className="text-[var(--text-muted)]">
                  Selected Height:
                </span>
                <span className="font-bold text-[var(--text-highlight)]">
                  {buttonHeight}px
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="60"
                value={buttonHeight}
                onChange={(e) => setButtonHeight(Number(e.target.value))}
                className="w-full h-1 bg-[var(--surface3)] accent-indigo-500"
              />
              <div className="flex justify-between text-[9px] font-mono text-[var(--text-muted)]">
                <span
                  className={
                    buttonHeight < 30
                      ? "text-red-500 font-bold"
                      : "text-[var(--text-muted)]"
                  }
                >
                  20px (Illegal)
                </span>
                <span className="text-green-600 dark:text-green-400 font-bold">
                  30px (Min)
                </span>
                <span>60px</span>
              </div>
            </div>
          </div>

          {/* Interactive simulator */}
          <div className="flex flex-col items-center justify-center p-6 bg-[var(--surface2)]/85 border border-[var(--border)] rounded-xl relative overflow-hidden">
            <div className="absolute top-2 left-3 text-[10px] font-mono text-[var(--text-muted)]">
              Live Boundary Sandbox (Red represents safe margin)
            </div>

            {/* Safety margin visual overlay */}
            <div
              style={{
                padding: `${Math.max(4, buttonHeight / 10)}px`,
                borderColor: "rgba(239, 68, 68, 0.25)",
                borderStyle: "dashed",
                borderWidth: "2px",
              }}
              className="rounded-lg bg-red-500/5 flex items-center justify-center transition-all duration-150"
            >
              <button
                style={{
                  width: `${buttonWidth}px`,
                  height: `${buttonHeight}px`,
                }}
                className="bg-black text-white rounded font-semibold flex items-center justify-center select-none text-center transition-all duration-150 shadow"
              >
                {buttonWidth > 150 ? (
                  <span className="text-[11px] truncate">
                    {appleLogo} Sign in with Apple
                  </span>
                ) : (
                  <span className="text-[10px]">{appleLogo} Sign in</span>
                )}
              </button>
            </div>

            <div className="mt-4 w-full grid grid-cols-3 gap-2 text-center text-[10px] font-mono">
              <div className="bg-[var(--surface3)] p-2 rounded border border-[var(--border)]">
                <p className="text-[var(--text-muted)] text-[9px] uppercase">
                  Width Status
                </p>
                <span
                  className={`font-bold ${buttonWidth < 140 ? "text-red-500" : "text-green-600 dark:text-green-400"}`}
                >
                  {buttonWidth < 140 ? "⚠️ FAILED" : "✓ COMPLIANT"}
                </span>
              </div>
              <div className="bg-[var(--surface3)] p-2 rounded border border-[var(--border)]">
                <p className="text-[var(--text-muted)] text-[9px] uppercase">
                  Height Status
                </p>
                <span
                  className={`font-bold ${buttonHeight < 30 ? "text-red-500" : "text-green-600 dark:text-green-400"}`}
                >
                  {buttonHeight < 30 ? "⚠️ FAILED" : "✓ COMPLIANT"}
                </span>
              </div>
              <div className="bg-[var(--surface3)] p-2 rounded border border-[var(--border)]">
                <p className="text-[var(--text-muted)] text-[9px] uppercase">
                  Req. Margin
                </p>
                <span className="text-indigo-500 dark:text-indigo-400 font-bold">
                  {(buttonHeight / 10).toFixed(1)}px
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {tcId === "iOS-AS-BTN-10" && (
        <div className="space-y-4">
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            If incorporating custom elements, strict Apple Design guidelines
            must be honored:{" "}
            <strong>Never use the logo alone as a button</strong>, keep logo
            dimensions matched, and <strong>never paint or custom color</strong>{" "}
            the official logo file.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {/* Standalone Logo - ILLEGAL */}
            <div className="border border-red-500/20 bg-red-500/5 rounded-xl p-4 text-center space-y-4 relative">
              <span className="absolute top-2 right-2 text-red-500 font-mono text-[8px] font-bold bg-red-500/15 px-1.5 py-0.5 rounded border border-red-500/20 uppercase">
                Illegal
              </span>
              <p className="text-[11px] font-bold text-red-650 dark:text-red-400">
                Logo Alone Button
              </p>

              <div className="h-16 flex items-center justify-center">
                <button className="w-10 h-10 bg-black text-white hover:bg-zinc-900 rounded-lg flex items-center justify-center shadow">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.79 22.05 6.8 20.68 5.96 19.48C4.25 17 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.1 16.67C20.08 16.74 19.67 18.11 18.71 19.5M15.97 4.17C16.63 3.37 17.07 2.28 16.95 1C16.01 1.04 14.86 1.63 14.19 2.42C13.62 3.08 13.12 4.19 13.27 5.45C14.31 5.53 15.31 4.93 15.97 4.17Z" />
                  </svg>
                </button>
              </div>
              <p className="text-[9px] text-[var(--text-muted)]">
                Standalone Apple logo buttons are strictly disallowed by Apple
                HIG.
              </p>
            </div>

            {/* Custom Colored Logo - ILLEGAL */}
            <div className="border border-red-500/20 bg-red-500/5 rounded-xl p-4 text-center space-y-4 relative">
              <span className="absolute top-2 right-2 text-red-500 font-mono text-[8px] font-bold bg-red-500/15 px-1.5 py-0.5 rounded border border-red-500/20 uppercase">
                Illegal
              </span>
              <p className="text-[11px] font-bold text-red-650 dark:text-red-400">
                Custom Colored Logo
              </p>

              <div className="h-16 flex items-center justify-center">
                <button className="w-44 h-10 bg-black text-white hover:bg-zinc-900 rounded-lg flex items-center justify-center font-semibold text-xs transition-all shadow-md">
                  <svg
                    className="w-4 h-4 mr-2 inline-block text-pink-500 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.79 22.05 6.8 20.68 5.96 19.48C4.25 17 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.1 16.67C20.08 16.74 19.67 18.11 18.71 19.5M15.97 4.17C16.63 3.37 17.07 2.28 16.95 1C16.01 1.04 14.86 1.63 14.19 2.42C13.62 3.08 13.12 4.19 13.27 5.45C14.31 5.53 15.31 4.93 15.97 4.17Z" />
                  </svg>
                  Sign in with Apple
                </button>
              </div>
              <p className="text-[9px] text-[var(--text-muted)]">
                Do not colorize the Apple logo. It must be black or white only.
              </p>
            </div>

            {/* Perfect Approved CTA - COMPLIANT */}
            <div className="border border-green-500/20 bg-green-500/5 rounded-xl p-4 text-center space-y-4 relative">
              <span className="absolute top-2 right-2 text-green-500 font-mono text-[8px] font-bold bg-green-500/15 px-1.5 py-0.5 rounded border border-green-500/20 uppercase">
                Approved
              </span>
              <p className="text-[11px] font-bold text-green-600 dark:text-green-400">
                Compliant Design
              </p>

              <div className="h-16 flex items-center justify-center">
                <button className="w-44 h-10 bg-black text-white hover:bg-zinc-900 rounded-lg flex items-center justify-center font-semibold text-xs transition-all shadow border border-transparent">
                  {appleLogo} Sign in with Apple
                </button>
              </div>
              <p className="text-[9px] text-[var(--text-muted)]">
                Paired with approved text, default coloring, with no aspect
                warp.
              </p>
            </div>
          </div>
        </div>
      )}

      {tcId === "iOS-AS-BTN-11" && (
        <div className="space-y-4">
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            For left-aligned customized logo buttons, Apple requires a strict
            layout scale: the button's text font size{" "}
            <strong>must be exactly 43% of the button's height</strong> (or the
            height should be 233% of the font size, rounded to the nearest
            integer).
          </p>

          <div className="bg-[var(--surface2)] p-5 rounded-xl border border-[var(--border)] max-w-sm mx-auto space-y-4 shadow-sm">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-[var(--text)] font-medium">
                Label Variant:
              </span>
              <select
                value={customLeftLabel}
                onChange={(e) => setCustomLeftLabel(e.target.value)}
                className="bg-[var(--bg)] border border-[var(--border)] rounded px-2.5 py-1 text-[var(--text-highlight)] text-xs focus:ring-1 focus:ring-indigo-500 outline-none"
              >
                <option
                  value="Sign in with Apple"
                  className="bg-[var(--bg)] text-[var(--text)]"
                >
                  Sign in with Apple
                </option>
                <option
                  value="Sign up with Apple"
                  className="bg-[var(--bg)] text-[var(--text)]"
                >
                  Sign up with Apple
                </option>
                <option
                  value="Continue with Apple"
                  className="bg-[var(--bg)] text-[var(--text)]"
                >
                  Continue with Apple
                </option>
              </select>
            </div>

            <div className="flex justify-between text-xs font-mono">
              <span className="text-[var(--text)] font-medium">
                Button Custom Height:
              </span>
              <span className="text-indigo-500 dark:text-indigo-400 font-bold">
                {customLeftHeight}px
              </span>
            </div>
            <input
              type="range"
              min="36"
              max="72"
              value={customLeftHeight}
              onChange={(e) => setCustomLeftHeight(Number(e.target.value))}
              className="w-full accent-indigo-500 h-1.5 rounded-lg bg-[var(--surface3)] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-[var(--text-muted)]">
              <span>36px Height</span>
              <span>44px (Standard)</span>
              <span>56px (Large)</span>
              <span>72px Height</span>
            </div>
          </div>

          {/* Sizing Calculations and Rendering */}
          {(() => {
            const calculatedFontSize = Math.round(customLeftHeight * 0.43);
            const verifiedRatio = (
              customLeftHeight / calculatedFontSize
            ).toFixed(2);
            return (
              <div className="p-5 bg-[var(--surface2)]/80 border border-[var(--border)] rounded-xl max-w-md mx-auto space-y-4 shadow-sm">
                <div className="grid grid-cols-2 gap-2 text-center text-[10px] font-mono bg-[var(--surface3)] p-3 rounded-lg border border-[var(--border)]">
                  <div>
                    <span className="text-[var(--text-muted)] block uppercase text-[8.5px] font-semibold tracking-wider">
                      Target Height
                    </span>
                    <span className="text-green-500 dark:text-green-400 font-bold text-xs">
                      {customLeftHeight}px
                    </span>
                  </div>
                  <div>
                    <span className="text-[var(--text-muted)] block uppercase text-[8.5px] font-semibold tracking-wider">
                      Calculated Font Size (43%)
                    </span>
                    <span className="text-green-500 dark:text-green-400 font-bold text-xs">
                      {calculatedFontSize}px
                    </span>
                  </div>
                </div>

                <div className="flex justify-center py-4 h-24 items-center overflow-visible">
                  <button
                    style={{
                      height: `${customLeftHeight}px`,
                      fontSize: `${calculatedFontSize}px`,
                      borderRadius: `${customLeftHeight / 6.5}px`,
                    }}
                    className="w-80 bg-black text-white hover:bg-zinc-900 border border-zinc-800 flex items-center justify-center px-4 font-semibold select-none shadow-md transition-all duration-150"
                  >
                    {/* Perfect alignment for Apple left aligned custom logos */}
                    <div className="flex items-center justify-center h-full w-full">
                      <svg
                        style={{ height: "0.95em", width: "auto" }}
                        className="fill-current mr-2.5 shrink-0"
                        viewBox="0 0 24 24"
                      >
                        <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.79 22.05 6.8 20.68 5.96 19.48C4.25 17 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.1 16.67C20.08 16.74 19.67 18.11 18.71 19.5M15.97 4.17C16.63 3.37 17.07 2.28 16.95 1C16.01 1.04 14.86 1.63 14.19 2.42C13.62 3.08 13.12 4.19 13.27 5.45C14.31 5.53 15.31 4.93 15.97 4.17Z" />
                      </svg>
                      <span className="whitespace-nowrap shrink-0 leading-none">
                        {customLeftLabel}
                      </span>
                    </div>
                  </button>
                </div>

                <p className="text-[10px] text-[var(--text)] text-center font-mono leading-relaxed bg-[var(--surface3)] px-3 py-1.5 rounded-lg border border-[var(--border)]">
                  Calculated height-to-font ratio is{" "}
                  <strong className="text-indigo-500 dark:text-indigo-400 font-bold">
                    {verifiedRatio}x
                  </strong>{" "}
                  (~2.33 standard). Proportions are mathematically correct and
                  compliant!
                </p>
              </div>
            );
          })()}
        </div>
      )}

      {tcId === "iOS-AS-BTN-12" && (
        <div className="space-y-4">
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            All variants of the button title must preserve specific
            capitalization style: capitalize the first word—that is,{" "}
            <strong>Sign</strong> or <strong>Continue</strong>—and{" "}
            <strong>Apple</strong>; all other letters are lowercase. Do not
            capitalize the entire title.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="border border-green-500/20 bg-green-500/5 rounded-xl p-5 space-y-3 relative">
              <span className="absolute top-3 right-3 text-green-500 flex items-center gap-1 text-[10px] font-mono font-bold bg-green-500/10 px-2 py-0.5 rounded border border-green-500/20">
                <Check size={11} /> COMPLIANT
              </span>
              <p className="text-xs font-bold text-green-600 dark:text-green-400 uppercase tracking-wide">
                Correct Capitalization
              </p>
              <div className="space-y-2">
                <button className="w-full h-10 bg-black text-white rounded-lg flex items-center justify-center text-xs font-medium border border-zinc-800">
                  {appleLogo} Sign in with Apple
                </button>
                <button className="w-full h-10 bg-black text-white rounded-lg flex items-center justify-center text-xs font-medium border border-zinc-800">
                  {appleLogo} Continue with Apple
                </button>
              </div>
              <p className="text-[10px] text-[var(--text-muted)]">
                First word and "Apple" are capitalized. Clean and matches HIG
                specification.
              </p>
            </div>

            <div className="border border-red-500/20 bg-red-500/5 rounded-xl p-5 space-y-3 relative">
              <span className="absolute top-3 right-3 text-red-500 flex items-center gap-1 text-[10px] font-mono font-bold bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">
                <X size={11} /> NON-COMPLIANT
              </span>
              <p className="text-xs font-bold text-red-650 dark:text-red-400 uppercase tracking-wide">
                Incorrect Capitalization
              </p>
              <div className="space-y-2">
                <button className="w-full h-10 bg-black text-white rounded-lg flex items-center justify-center text-xs font-medium border border-zinc-800 uppercase">
                  {appleLogo} SIGN IN WITH APPLE
                </button>
                <button className="w-full h-10 bg-black text-white rounded-lg flex items-center justify-center text-xs font-medium border border-zinc-800">
                  {appleLogo} Sign In With Apple
                </button>
              </div>
              <p className="text-[10px] text-[var(--text-muted)]">
                All-caps buttons or title-case (capitalizing 'With') are
                strictly prohibited.
              </p>
            </div>
          </div>
        </div>
      )}

      {tcId === "iOS-AS-BTN-13" && (
        <div className="space-y-4">
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            The title and logo must be precisely{" "}
            <strong>
              vertically aligned matching the middle of the button
            </strong>
            . Standard downloadable logo artwork already contains the correct
            padding.
          </p>
          <div className="bg-[var(--surface2)] p-5 rounded-xl border border-[var(--border)] max-w-sm mx-auto space-y-4 relative overflow-hidden">
            <span className="absolute top-2 right-2 text-[10px] font-mono text-[var(--text-muted)]">
              Alignment Inspector
            </span>
            <div className="relative py-4 flex justify-center bg-[var(--surface3)] border border-[var(--border)] rounded-lg">
              {/* Vertical center alignment guide line */}
              <div className="absolute left-0 right-0 top-1/2 border-t border-red-500/30 border-dashed z-10 pointer-events-none" />
              <div className="absolute top-0 bottom-0 left-1/2 border-l border-indigo-500/10 border-dashed z-0 pointer-events-none" />

              <button className="h-12 w-56 bg-black text-white rounded-lg flex items-center justify-center font-medium text-xs border border-zinc-800 relative z-20 shadow-lg">
                {appleLogo}
                <span className="relative">Sign in with Apple</span>
              </button>
            </div>

            <p className="text-[10px] text-[var(--text-muted)] text-center leading-relaxed">
              The red dashed line represents the{" "}
              <strong>vertical middle axis</strong>. The text baseline and logo
              core geometric centers perfectly bisect this line to preserve
              official look.
            </p>
          </div>
        </div>
      )}

      {tcId === "iOS-AS-BTN-14" && (
        <div className="space-y-4">
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            If aligning multiple identity providers on the same screen (e.g.
            Google, Apple, Facebook), you can{" "}
            <strong>inset the left side of the Apple logo</strong> to create
            crisp, balanced, uniform horizontal alignments.
          </p>

          {(() => {
            const [hasInset, setHasInset] = React.useState(true);
            return (
              <div className="space-y-4">
                <div className="flex justify-center">
                  <button
                    onClick={() => setHasInset(!hasInset)}
                    className="text-xs font-mono px-3 py-1 bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 rounded-lg border border-indigo-500/20 hover:bg-indigo-500/20 hover:text-indigo-600 dark:hover:text-indigo-300 transition-all shadow-sm"
                  >
                    Toggle Apple Logo Left Inset:{" "}
                    <strong>
                      {hasInset
                        ? "ENABLED (Compliant)"
                        : "DISABLED (Misaligned)"}
                    </strong>
                  </button>
                </div>

                <div className="space-y-2 max-w-xs mx-auto bg-[var(--surface2)] p-5 rounded-xl border border-[var(--border)]">
                  {/* Google */}
                  <button className="w-full h-10 bg-white text-zinc-700 rounded-lg flex items-center px-4 text-xs font-semibold border border-zinc-200 shadow-sm">
                    <span className="w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center text-[8px] mr-3 font-bold">
                      G
                    </span>
                    <span className="w-full text-center">
                      Sign in with Google
                    </span>
                  </button>

                  {/* Facebook */}
                  <button className="w-full h-10 bg-[#1877f2] text-white rounded-lg flex items-center px-4 text-xs font-semibold shadow-sm">
                    <span className="w-4 h-4 bg-white text-[#1877f2] rounded-full flex items-center justify-center text-[10px] mr-3 font-bold">
                      f
                    </span>
                    <span className="w-full text-center">
                      Sign in with Facebook
                    </span>
                  </button>

                  {/* Apple with dynamic alignment */}
                  <button className="w-full h-10 bg-black text-white rounded-lg flex items-center text-xs font-semibold border border-zinc-800 shadow-sm relative overflow-hidden">
                    <div className="flex items-center w-full px-4">
                      <div
                        className="relative transition-all duration-150"
                        style={{
                          transform: hasInset
                            ? "translateX(4px)"
                            : "translateX(0px)",
                        }}
                      >
                        {appleLogo}
                      </div>
                      <span className="w-full text-center">
                        Sign in with Apple
                      </span>
                    </div>
                  </button>
                </div>
                <p className="text-[10px] text-[var(--text-muted)] text-center font-mono">
                  {hasInset
                    ? "✓ Subtle 4px positive inset corrects visual center offset of the Apple logo."
                    : "⚠️ Without inset, the Apple logo looks slightly misaligned due to varying vector bounds."}
                </p>
              </div>
            );
          })()}
        </div>
      )}

      {tcId === "iOS-AS-BTN-15" && (
        <div className="space-y-4">
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            Maintain a minimum margin between the title ('Apple') and the right
            edge of the button. This margin must measure{" "}
            <strong>at least 8% of the button's total width</strong> to protect
            against clipping or crowded layouts.
          </p>

          {(() => {
            const [width, setWidth] = React.useState(220);
            const minRightMargin = Math.ceil(width * 0.08);
            const rightPadding = 24; // Visual mock right padding
            const isWidthCompliant = rightPadding >= minRightMargin;

            return (
              <div className="space-y-4">
                <div className="bg-[var(--surface2)] p-4 rounded-xl border border-[var(--border)] max-w-sm mx-auto space-y-3">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-[var(--text-muted)]">
                      Adjust Button Width:
                    </span>
                    <span className="text-indigo-600 dark:text-indigo-400 font-bold">
                      {width}px
                    </span>
                  </div>
                  <input
                    type="range"
                    min="140"
                    max="300"
                    value={width}
                    onChange={(e) => setWidth(Number(e.target.value))}
                    className="w-full accent-indigo-500 h-1.5 rounded-lg bg-[var(--surface3)]"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-[var(--text-muted)]">
                    <span>140px (Narrow)</span>
                    <span>220px (Standard)</span>
                    <span>300px (Wide)</span>
                  </div>
                </div>

                <div className="p-5 bg-[var(--surface2)]/85 border border-[var(--border)] rounded-xl max-w-sm mx-auto space-y-4 text-center">
                  <div className="flex justify-center items-center py-2 relative">
                    <div
                      style={{ width: `${width}px` }}
                      className="h-11 bg-black text-white hover:bg-zinc-900 border border-zinc-800 rounded-lg flex items-center justify-between px-4 font-semibold select-none shadow relative transition-all"
                    >
                      <div className="flex items-center">
                        {appleLogo}
                        <span className="text-xs font-medium">
                          Sign in with Apple
                        </span>
                      </div>

                      {/* Safety marker right side */}
                      <div
                        style={{ width: `${minRightMargin}px` }}
                        className="h-full bg-red-500/20 border-l border-r border-red-500/40 flex items-center justify-center text-[7px] font-bold text-red-400 absolute right-0 top-0 rounded-r-lg"
                      >
                        8%
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-center text-[10px] font-mono bg-[var(--surface3)] p-3 rounded-lg border border-[var(--border)]">
                    <div>
                      <span className="text-[var(--text-muted)] block uppercase text-[8.5px] font-semibold tracking-tight">
                        Required Margin (8%)
                      </span>
                      <span className="text-indigo-600 dark:text-indigo-400 font-bold text-xs">
                        {minRightMargin}px
                      </span>
                    </div>
                    <div>
                      <span className="text-[var(--text-muted)] block uppercase text-[8.5px] font-semibold tracking-tight">
                        Compliant Status
                      </span>
                      <span
                        className={`font-bold text-xs ${isWidthCompliant ? "text-green-600 dark:text-green-400" : "text-red-500"}`}
                      >
                        {isWidthCompliant ? "✓ COMPLIANT" : "⚠️ TOO NARROW"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {tcId === "iOS-AS-BTN-16" && (
        <div className="space-y-4">
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            The button size must account for differing length requirements of
            translated button titles. It must maintain width bounds (140pt
            minimum width) without wrapping or clipping text.
          </p>

          {(() => {
            const [selectedLocale, setSelectedLocale] = React.useState("es");
            const locales: Record<
              string,
              { label: string; desc: string; minWidth: number }
            > = {
              en: {
                label: "Sign in with Apple",
                desc: "English (Default)",
                minWidth: 140,
              },
              es: {
                label: "Iniciar sesión con Apple",
                desc: "Spanish (Longer translation)",
                minWidth: 180,
              },
              de: {
                label: "Mit Apple anmelden",
                desc: "German (Longer verb phrases)",
                minWidth: 175,
              },
              ja: {
                label: "Appleでサインイン",
                desc: "Japanese (Character layout)",
                minWidth: 140,
              },
              fr: {
                label: "Se connecter avec Apple",
                desc: "French (Long expansion)",
                minWidth: 190,
              },
            };

            const data = locales[selectedLocale];

            return (
              <div className="space-y-4">
                <div className="flex justify-center gap-2 flex-wrap">
                  {Object.keys(locales).map((key) => (
                    <button
                      key={key}
                      onClick={() => setSelectedLocale(key)}
                      className={`text-xs px-2.5 py-1 rounded transition-all font-mono border ${selectedLocale === key ? "bg-indigo-600 border-indigo-500 text-white" : "bg-[var(--surface2)] border-[var(--border)] text-[var(--text-muted)] hover:bg-[var(--surface3)]"}`}
                    >
                      {key.toUpperCase()}
                    </button>
                  ))}
                </div>

                <div className="p-5 bg-[var(--surface2)]/85 border border-[var(--border)] rounded-xl max-w-sm mx-auto text-center space-y-4">
                  <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase block tracking-widest">
                    {data.desc}
                  </span>

                  <div className="flex justify-center">
                    <button
                      style={{ minWidth: `${data.minWidth}px` }}
                      className="h-10 bg-black text-white hover:bg-zinc-900 border border-zinc-800 rounded-lg flex items-center justify-center px-4 font-semibold select-none shadow text-xs transition-all"
                    >
                      {appleLogo} {data.label}
                    </button>
                  </div>

                  <p className="text-[10px] font-mono text-[var(--text-muted)]">
                    Auto-expanded minWidth:{" "}
                    <strong className="text-indigo-600 dark:text-indigo-400 font-bold">
                      {data.minWidth}px
                    </strong>{" "}
                    to prevent text overflow or ugly wraps!
                  </p>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {tcId === "iOS-AS-BTN-17" && (
        <div className="space-y-4">
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            Logo-only buttons must carry a strict 1:1 aspect ratio. The Apple
            artwork already includes the correct padding. Adding further
            horizontal padding to squish or stretch the circular/square shape is
            prohibited.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-green-500/20 bg-green-500/5 rounded-xl p-4 text-center space-y-3 relative">
              <span className="absolute top-2 right-2 text-green-500 font-mono text-[8px] font-bold bg-green-500/15 px-1.5 py-0.5 rounded border border-green-500/20 uppercase">
                <Check size={9} /> COMPLIANT
              </span>
              <p className="text-xs font-bold text-green-600 dark:text-green-400">
                1:1 Square Aspect Ratio
              </p>

              <div className="flex justify-center p-3">
                <button className="w-12 h-12 bg-black text-white rounded-lg flex items-center justify-center shadow border border-transparent">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.79 22.05 6.8 20.68 5.96 19.48C4.25 17 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.1 16.67C20.08 16.74 19.67 18.11 18.71 19.5M15.97 4.17C16.63 3.37 17.07 2.28 16.95 1C16.01 1.04 14.86 1.63 14.19 2.42C13.62 3.08 13.12 4.19 13.27 5.45C14.31 5.53 15.31 4.93 15.97 4.17Z" />
                  </svg>
                </button>
              </div>
              <p className="text-[10px] text-[var(--text-muted)]">
                Perfect 48px by 48px square shape with balanced interior
                margins.
              </p>
            </div>

            <div className="border border-red-500/20 bg-red-500/5 rounded-xl p-4 text-center space-y-3 relative">
              <span className="absolute top-2 right-2 text-red-500 font-mono text-[8px] font-bold bg-red-500/15 px-1.5 py-0.5 rounded border border-red-500/20 uppercase">
                <X size={9} /> NON-COMPLIANT
              </span>
              <p className="text-xs font-bold text-red-650 dark:text-red-400">
                Incorrect Aspect Rectangle
              </p>

              <div className="flex justify-center p-3">
                <button className="w-20 h-10 bg-black text-white rounded-lg flex items-center justify-center shadow border border-transparent">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.79 22.05 6.8 20.68 5.96 19.48C4.25 17 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.1 16.67C20.08 16.74 19.67 18.11 18.71 19.5M15.97 4.17C16.63 3.37 17.07 2.28 16.95 1C16.01 1.04 14.86 1.63 14.19 2.42C13.62 3.08 13.12 4.19 13.27 5.45C14.31 5.53 15.31 4.93 15.97 4.17Z" />
                  </svg>
                </button>
              </div>
              <p className="text-[10px] text-[var(--text-muted)]">
                80px by 40px stretches the identity space inappropriately. Logo
                must be 1:1.
              </p>
            </div>
          </div>
        </div>
      )}

      {tcId === "iOS-AS-BTN-18" && (
        <div className="space-y-4">
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            Use a mask to change the default square shape of the logo-only image
            (e.g. rounded rect mask, no mask, or circular mask). Never crop the
            Apple-provided artwork to decrease its built-in padding or use the
            logo by itself, and avoid including additional padding.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {/* Rounded rect mask */}
            <div className="bg-[var(--surface2)] rounded-xl p-4 border border-[var(--border)] text-center space-y-3 flex flex-col items-center justify-center">
              <span className="text-[9px] font-mono text-[var(--text-muted)] uppercase tracking-wider">
                1. Rounded Rectangle Mask
              </span>
              <button className="w-14 h-14 bg-black text-white hover:bg-zinc-900 rounded-xl flex items-center justify-center shadow-lg border border-zinc-800">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.79 22.05 6.8 20.68 5.96 19.48C4.25 17 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.1 16.67C20.08 16.74 19.67 18.11 18.71 19.5M15.97 4.17C16.63 3.37 17.07 2.28 16.95 1C16.01 1.04 14.86 1.63 14.19 2.42C13.62 3.08 13.12 4.19 13.27 5.45C14.31 5.53 15.31 4.93 15.97 4.17Z" />
                </svg>
              </button>
              <span className="text-[10px] text-green-600 dark:text-green-400 font-bold block mt-1">
                Compliant (Rounded)
              </span>
            </div>

            {/* No mask */}
            <div className="bg-[var(--surface2)] rounded-xl p-4 border border-[var(--border)] text-center space-y-3 flex flex-col items-center justify-center">
              <span className="text-[9px] font-mono text-[var(--text-muted)] uppercase tracking-wider">
                2. No Mask
              </span>
              <button className="w-14 h-14 bg-black text-white hover:bg-zinc-900 rounded-none flex items-center justify-center shadow-lg border border-zinc-800">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.79 22.05 6.8 20.68 5.96 19.48C4.25 17 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.1 16.67C20.08 16.74 19.67 18.11 18.71 19.5M15.97 4.17C16.63 3.37 17.07 2.28 16.95 1C16.01 1.04 14.86 1.63 14.19 2.42C13.62 3.08 13.12 4.19 13.27 5.45C14.31 5.53 15.31 4.93 15.97 4.17Z" />
                </svg>
              </button>
              <span className="text-[10px] text-green-600 dark:text-green-400 font-bold block mt-1">
                Compliant (Square)
              </span>
            </div>

            {/* Circular mask */}
            <div className="bg-[var(--surface2)] rounded-xl p-4 border border-[var(--border)] text-center space-y-3 flex flex-col items-center justify-center">
              <span className="text-[9px] font-mono text-[var(--text-muted)] uppercase tracking-wider">
                3. Circular Mask
              </span>
              <button className="w-14 h-14 bg-black text-white hover:bg-zinc-900 rounded-full flex items-center justify-center shadow-lg border border-zinc-800">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.79 22.05 6.8 20.68 5.96 19.48C4.25 17 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.1 16.67C20.08 16.74 19.67 18.11 18.71 19.5M15.97 4.17C16.63 3.37 17.07 2.28 16.95 1C16.01 1.04 14.86 1.63 14.19 2.42C13.62 3.08 13.12 4.19 13.27 5.45C14.31 5.53 15.31 4.93 15.97 4.17Z" />
                </svg>
              </button>
              <span className="text-[10px] text-green-600 dark:text-green-400 font-bold block mt-1">
                Compliant (Circular)
              </span>
            </div>
          </div>
        </div>
      )}

      {tcId === "iOS-AS-BTN-19" && (
        <div className="space-y-4">
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            Maintain a minimum margin around the button. The margin should
            measure at least <strong>1/10 of the button's height</strong> to
            prevent overlapping with surrounding assets.
          </p>

          <div className="p-6 bg-[var(--surface2)]/85 border border-[var(--border)] rounded-xl max-w-sm mx-auto flex flex-col items-center justify-center relative overflow-hidden">
            <span className="absolute top-2 left-3 text-[10px] font-mono text-[var(--text-muted)]">
              Outer Margin Visualizer
            </span>

            {/* Button wrapped in safety margin indicator container */}
            <div className="p-3 border-2 border-dashed border-indigo-500/30 bg-indigo-500/5 rounded-2xl flex items-center justify-center mt-6 transition-all">
              <button className="w-14 h-14 bg-black text-white hover:bg-zinc-900 rounded-xl flex items-center justify-center shadow-lg border border-zinc-800">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.79 22.05 6.8 20.68 5.96 19.48C4.25 17 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.1 16.67C20.08 16.74 19.67 18.11 18.71 19.5M15.97 4.17C16.63 3.37 17.07 2.28 16.95 1C16.01 1.04 14.86 1.63 14.19 2.42C13.62 3.08 13.12 4.19 13.27 5.45C14.31 5.53 15.31 4.93 15.97 4.17Z" />
                </svg>
              </button>
            </div>

            <div className="mt-4 text-center space-y-1">
              <p className="text-[10px] font-mono text-[var(--text-muted)]">
                1/10 Height Margin Required:{" "}
                <strong className="text-indigo-600 dark:text-indigo-400 font-bold">
                  5.6px
                </strong>{" "}
                (for 56px height)
              </p>
              <p className="text-[9px] text-indigo-700 dark:text-indigo-400 font-mono">
                The outer blue dotted outline represents the minimum safety
                radius boundary.
              </p>
            </div>
          </div>
        </div>
      )}

      {tcId === "And-CAF-7.4" && (
        <div className="space-y-4">
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            When initiating a content share, utilizing the native standard{" "}
            <strong>Android Share sheet</strong> is strongly recommended to
            ensure direct share targets work seamlessly, consistent preview
            styling is maintained, and user trust is reinforced.
          </p>
          <div className="flex flex-col items-center justify-center p-6 bg-[var(--surface)] border border-[var(--border)] rounded-xl max-w-lg mx-auto animate-in fade-in duration-300">
            <span className="text-[10px] font-mono text-[var(--text-muted)] mb-3">
              Android System Layout Reference
            </span>
            <img
              src={androidShareSheetImg}
              alt="Standard Android Share Sheet interface mock-up"
              className="max-h-72 object-contain rounded-lg shadow-md border border-[var(--border)]"
              referrerPolicy="no-referrer"
            />
            <p className="text-[10px] text-[var(--text-muted)] mt-3 text-center">
              The native sheet automatically registers quick contacts, app
              handles, and favorites.
            </p>
          </div>
        </div>
      )}

      {tcId === "And-FTC-4.8" && (
        <div className="space-y-6 pt-2 select-none text-left">
          <div className="p-6 bg-[var(--surface)] border border-[var(--border)] rounded-2xl space-y-4 shadow-sm">
            <div className="flex justify-between items-start border-b border-[var(--border)] pb-4">
              <div>
                <h4 className="text-sm font-bold text-[var(--text-highlight)] flex items-center gap-1.5 font-sans">
                  <span>🛡️ Android Dangerous Permissions Registry</span>
                  <span className="text-[9px] bg-indigo-500/10 text-indigo-400 px-2 py-0.5 border border-indigo-500/20 rounded font-mono uppercase font-bold">
                    Ref Guidelines
                  </span>
                </h4>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed mt-1 font-sans">
                  The following represents private resources that could affect
                  the user's secure data domain or critical system hardware.
                  Under Google Play Store guidelines, these **MUST** be
                  initialized and requested dynamically at runtime with a clear
                  pre-request explanation.
                </p>
              </div>
            </div>

            {/* Smartphone simulator is disabled here because it has been moved to the standalone global 'Runtime permissions demo' section */}
            {false && (
              <>
                {/* Left Column: Interactive Mobile Mockup */}
                <div className="lg:col-span-7 flex flex-col items-center justify-center">
                  {/* Smartphone Container */}
                  <div className="w-[310px] h-[550px] bg-zinc-950 border-8 border-zinc-800 rounded-[38px] shadow-2xl relative flex flex-col overflow-hidden select-none border-solid">
                    {/* Smartphone Camera Notch */}
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-4 bg-zinc-805 rounded-full z-20 flex items-center justify-center">
                      <div className="w-2.5 h-2.5 bg-neutral-900 rounded-full" />
                    </div>

                    {/* Smartphone Mock Screen Content */}
                    <div className="w-full h-full flex flex-col pt-8 pb-4 px-4 text-xs font-sans bg-zinc-950 text-zinc-100 z-10 select-none relative">
                      {/* Status Bar */}
                      <div className="flex items-center justify-between text-[9px] text-zinc-500 font-mono tracking-wider px-2 mb-4 shrink-0">
                        <span>11:08 UTC</span>
                        <div className="flex items-center gap-1.5">
                          <span>5G</span>
                          <div className="w-3 h-2 border border-zinc-500 rounded-xs flex items-end p-0.2">
                            <div className="w-full h-2/3 bg-zinc-400" />
                          </div>
                        </div>
                      </div>

                      {/* Settings view mock or Game app mock */}
                      {permissionState === "settings" ? (
                        <div className="flex-1 flex flex-col animate-in fade-in slide-in-from-right duration-300">
                          <div className="border-b border-zinc-800 pb-3 mb-4 flex items-center gap-2">
                            <span className="text-[8px] font-mono bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-300 font-bold">
                              OS SETTINGS
                            </span>
                            <h5 className="font-bold text-zinc-200">
                              App Info: Quest Odyssey
                            </h5>
                          </div>
                          <p className="text-[10px] text-zinc-500 mb-4 font-mono">
                            Settings &gt; Apps &gt; Quest Odyssey &gt;
                            Permissions
                          </p>

                          <div className="space-y-4 flex-1">
                            <div className="bg-zinc-900 p-3 rounded-xl border border-zinc-800 space-y-3">
                              <p className="font-bold text-zinc-450 text-[9px] tracking-wider uppercase">
                                ALLOWED
                              </p>
                              <p className="text-[10px] text-zinc-500 italic">
                                None
                              </p>

                              <div className="h-[1px] bg-zinc-800 my-2" />

                              <p className="font-bold text-zinc-450 text-[9px] tracking-wider uppercase">
                                NOT ALLOWED
                              </p>
                              <div className="flex items-center justify-between py-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm">📁</span>
                                  <div>
                                    <p className="font-semibold text-zinc-300">
                                      Files and Media
                                    </p>
                                    <p className="text-[9px] text-zinc-500">
                                      Access photo and save assets
                                    </p>
                                  </div>
                                </div>
                                {/* Toggle Switch */}
                                <button
                                  onClick={() =>
                                    setSettingsToggled(!settingsToggled)
                                  }
                                  className={`w-9 h-5 rounded-full p-0.5 transition-colors duration-200 ${settingsToggled ? "bg-indigo-600" : "bg-zinc-750"}`}
                                >
                                  <div
                                    className={`w-4 h-4 rounded-full bg-white transition-all duration-200 ${settingsToggled ? "translate-x-4" : "translate-x-0"}`}
                                  />
                                </button>
                              </div>
                            </div>

                            <p className="text-[10px] text-zinc-400 leading-relaxed bg-zinc-900/50 p-3 rounded-lg border border-zinc-805 font-mono">
                              {settingsToggled
                                ? "✅ Storage permissions enabled manually! Return to the game to start your secure adventure."
                                : "⚠️ Permission is disabled. Toggle the switch to permit storage files access."}
                            </p>
                          </div>

                          <button
                            onClick={() => {
                              if (settingsToggled) {
                                setPermissionState("granted");
                              } else {
                                setPermissionState("denied_never");
                              }
                            }}
                            className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 font-bold rounded-lg text-white text-[11px] transition mt-auto flex items-center justify-center gap-1"
                          >
                            ← Return to Game
                          </button>
                        </div>
                      ) : (
                        <div className="flex-1 flex flex-col relative justify-center">
                          <div className="absolute top-0 left-0 right-0 h-10 bg-indigo-950/40 border border-indigo-500/20 rounded-xl flex items-center justify-between px-3">
                            <span className="font-extrabold text-[9px] tracking-widest text-indigo-300 uppercase">
                              QUEST ODYSSEY
                            </span>
                            <div className="flex items-center gap-1.5 font-mono text-[8px] text-indigo-400">
                              <span>🛡️ LV10</span>
                              <span>💎 350</span>
                            </div>
                          </div>

                          <div className="text-center space-y-3 px-2 flex-1 flex flex-col justify-center items-center">
                            {permissionState === "granted" ? (
                              <div className="space-y-4 animate-in zoom-in duration-300">
                                <div className="w-12 h-12 bg-green-500/10 text-green-500 rounded-full border border-green-500/20 flex items-center justify-center text-xl mx-auto shadow-lg shadow-green-500/5">
                                  ✓
                                </div>
                                <div>
                                  <h5 className="font-extrabold text-green-400 text-xs">
                                    Permission Granted!
                                  </h5>
                                  <p className="text-[10px] text-zinc-400 leading-relaxed mt-1">
                                    Core app assets and cloud sync capabilities
                                    loaded. Your game is fully compliant!
                                  </p>
                                </div>
                                <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-3 text-[10px] text-zinc-300 space-y-1 font-mono text-left w-full">
                                  <p className="text-zinc-500 uppercase text-[8px] font-bold tracking-wider">
                                    Device Log Trace
                                  </p>
                                  <p className="text-green-400">
                                    ✓ STORAGE_FILES: GRANTED
                                  </p>
                                  <p className="text-green-400">
                                    ✓ CACHE_SYNC: COMPLETED
                                  </p>
                                  <p className="text-zinc-400">
                                    ✓ GAMEPLAY_INIT: OK
                                  </p>
                                </div>
                              </div>
                            ) : (
                              <div className="space-y-3 py-6 text-center">
                                <span className="text-3xl filter drop-shadow">
                                  🎮
                                </span>
                                <h6 className="font-bold text-zinc-300">
                                  Evaluating local game files...
                                </h6>
                                <p className="text-[10px] text-zinc-500 max-w-xs mx-auto">
                                  Evaluating standard manifest guidelines and
                                  runtime authentication checks. Choose an
                                  interactive action in the prompt.
                                </p>
                              </div>
                            )}
                          </div>

                          {/* --- PRE-REQUEST RATIONALE EXPLANATION DIALOG --- */}
                          {permissionState === "rationale" && (
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center p-3 z-30 animate-in fade-in duration-200">
                              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 w-full space-y-4 animate-in slide-in-from-bottom duration-300 shadow-xl">
                                <div className="flex items-center gap-2 border-b border-zinc-800 pb-2">
                                  <span className="text-lg">📁</span>
                                  <h5 className="font-extrabold text-zinc-200 text-[11px] leading-tight">
                                    Storage Access Required
                                  </h5>
                                </div>
                                <p className="text-[10px] text-zinc-400 leading-relaxed">
                                  Quest Odyssey requires storage permissions to
                                  download game graphics assets, sync progress
                                  logs, and prevent loss of data offline.
                                </p>
                                <div className="flex gap-2 justify-end pt-1">
                                  <button
                                    onClick={() =>
                                      setPermissionState("warning")
                                    }
                                    className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 font-bold rounded-lg text-[10px]"
                                  >
                                    Decline
                                  </button>
                                  <button
                                    onClick={() =>
                                      setPermissionState("sys_popup_1")
                                    }
                                    className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg text-[10px] shadow"
                                  >
                                    OK
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* --- FIRST SYSTEM POPUP --- */}
                          {permissionState === "sys_popup_1" && (
                            <div className="absolute inset-0 bg-black/50 flex items-end justify-center p-2 z-45 animate-in fade-in duration-200">
                              <div className="bg-zinc-900 rounded-t-3xl p-5 w-full space-y-4 animate-in slide-in-from-bottom duration-300 shadow-2xl border-t border-zinc-850">
                                <div className="text-center space-y-2">
                                  <div className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center text-xl mx-auto border border-zinc-700">
                                    📁
                                  </div>
                                  <h5 className="font-bold text-zinc-150 text-xs">
                                    Allow{" "}
                                    <strong className="text-zinc-100">
                                      Quest Odyssey
                                    </strong>{" "}
                                    to access photos and media on this device?
                                  </h5>
                                </div>

                                <p className="text-[9px] text-zinc-500 text-center uppercase tracking-wider font-mono">
                                  Android Native OS System Prompt
                                </p>

                                <div className="space-y-1.5 pt-2">
                                  <button
                                    onClick={() =>
                                      setPermissionState("granted")
                                    }
                                    className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-[10px] transition"
                                  >
                                    Allow
                                  </button>
                                  <button
                                    onClick={() =>
                                      setPermissionState("warning")
                                    }
                                    className="w-full py-2 bg-zinc-800 hover:bg-zinc-720 text-zinc-200 font-bold rounded-xl text-[10px] transition"
                                  >
                                    Don't Allow
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* --- WARNING DIALOG ON DENIAL --- */}
                          {permissionState === "warning" && (
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center p-3 z-30 animate-in fade-in duration-200">
                              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 w-full space-y-4 animate-in zoom-in duration-200 shadow-xl">
                                <div className="flex items-center gap-2 text-amber-500 border-b border-zinc-800 pb-2">
                                  <span className="text-base">⚠️</span>
                                  <h5 className="font-extrabold text-[11px] leading-tight text-amber-400">
                                    Permission Necessary
                                  </h5>
                                </div>
                                <p className="text-[10px] text-zinc-400 leading-relaxed">
                                  Quest Odyssey cannot download required graphic
                                  binaries or secure database keys without
                                  storage features. The game will fail to launch
                                  if disabled.
                                </p>
                                <div className="flex gap-2 justify-end pt-1">
                                  <button
                                    onClick={() =>
                                      setPermissionState("rationale")
                                    }
                                    className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-750 text-zinc-450 font-bold rounded-lg text-[10px]"
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    onClick={() =>
                                      setPermissionState("sys_popup_2")
                                    }
                                    className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg text-[10px]"
                                  >
                                    Retry
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* --- SECOND SYSTEM POPUP WITH NEVER ASK AGAIN OPTION --- */}
                          {permissionState === "sys_popup_2" && (
                            <div className="absolute inset-0 bg-black/50 flex items-end justify-center p-2 z-45 animate-in fade-in duration-200">
                              <div className="bg-zinc-900 rounded-t-3xl p-5 w-full space-y-4 animate-in slide-in-from-bottom duration-300 shadow-2xl border-t border-zinc-850">
                                <div className="text-center space-y-2">
                                  <div className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center text-xl mx-auto border border-zinc-700">
                                    📁
                                  </div>
                                  <h5 className="font-bold text-zinc-150 text-xs">
                                    Allow{" "}
                                    <strong className="text-zinc-100">
                                      Quest Odyssey
                                    </strong>{" "}
                                    to access photos and media on this device?
                                  </h5>
                                </div>

                                <div className="flex items-center gap-2 justify-center py-1">
                                  <input
                                    type="checkbox"
                                    id="neverAskAgain"
                                    className="rounded border-zinc-800 text-indigo-600 focus:ring-0 bg-zinc-800 h-3.5 w-3.5"
                                    checked={isNeverAskAgainChecked}
                                    onChange={(e) =>
                                      setIsNeverAskAgainChecked(
                                        e.target.checked,
                                      )
                                    }
                                  />
                                  <label
                                    htmlFor="neverAskAgain"
                                    className="text-[10px] text-zinc-400 font-medium"
                                  >
                                    Don't ask again / Never ask again
                                  </label>
                                </div>

                                <div className="space-y-1.5 pt-1">
                                  <button
                                    onClick={() =>
                                      setPermissionState("granted")
                                    }
                                    className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-[10px] transition"
                                  >
                                    Allow
                                  </button>
                                  <button
                                    onClick={() => {
                                      if (isNeverAskAgainChecked) {
                                        setPermissionState("denied_never");
                                      } else {
                                        setPermissionState("warning");
                                      }
                                    }}
                                    className="w-full py-2 bg-zinc-800 hover:bg-zinc-720 text-zinc-200 font-bold rounded-xl text-[10px] transition"
                                  >
                                    Don't Allow
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* --- DENIED PERMANENTLY / NEVER ASK STATE --- */}
                          {permissionState === "denied_never" && (
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center p-3 z-30 animate-in fade-in duration-200">
                              <div className="bg-zinc-900 border border-zinc-805 rounded-2xl p-4 w-full space-y-4 animate-in zoom-in duration-200 shadow-xl">
                                <div className="flex items-center gap-2 text-rose-500 border-b border-zinc-800 pb-2">
                                  <span className="text-base">🚫</span>
                                  <h5 className="font-extrabold text-[11px] leading-tight text-rose-400">
                                    Permission Blocked
                                  </h5>
                                </div>
                                <p className="text-[10px] text-zinc-400 leading-relaxed">
                                  You selected "Don't ask again". Storage
                                  facilities remain locked by Android policy.
                                  Tap "Go to Settings" to manually toggle
                                  authorization.
                                </p>
                                <div className="flex gap-2 justify-end pt-1">
                                  <button
                                    onClick={() => {
                                      setPermissionState("rationale");
                                      setIsNeverAskAgainChecked(false);
                                    }}
                                    className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 font-bold rounded-lg text-[10px]"
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    onClick={() =>
                                      setPermissionState("settings")
                                    }
                                    className="px-4 py-1.5 bg-amber-500 hover:bg-amber-600 text-zinc-950 font-extrabold rounded-lg text-[10px] shadow"
                                  >
                                    Go to Settings
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Navigation Pill Bar (System) */}
                      <div className="w-32 h-1 bg-zinc-700 rounded-full mx-auto shrink-0 mt-4" />
                    </div>
                  </div>

                  {/* State breadcrumbs */}
                  <div className="mt-3 flex flex-wrap gap-1.5 justify-center max-w-sm">
                    <span className="text-[9px] font-mono font-bold uppercase text-[var(--text-muted)]">
                      Current Phase:
                    </span>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 font-bold uppercase">
                      {permissionState}
                    </span>
                  </div>
                </div>
              </>
            )}

            {/* Full-width Dangerous Permissions Registry */}
            <div className="space-y-5 w-full">
              <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] text-xs space-y-4 shadow-sm">
                <h5 className="font-bold text-[var(--text-highlight)] flex items-center gap-1.5">
                  📁 <span>Android Dangerous Permissions Registry</span>
                </h5>
                <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                  These represent private resources that could affect the user's
                  secure data domain. They **MUST** be initialized and
                  authenticated sequentially using the system rationale flow:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
                  {[
                    {
                      group: "STORAGE & MEDIA",
                      list: [
                        "READ_MEDIA_IMAGES",
                        "READ_MEDIA_VIDEO",
                        "READ_MEDIA_AUDIO",
                        "READ_EXTERNAL_STORAGE",
                        "WRITE_EXTERNAL_STORAGE",
                      ],
                      desc: "Handles local photos, asset caches, and dynamic progress saves.",
                    },
                    {
                      group: "LOCATION",
                      list: [
                        "ACCESS_FINE_LOCATION",
                        "ACCESS_COARSE_LOCATION",
                        "ACCESS_BACKGROUND_LOCATION",
                      ],
                      desc: "Precision GPS coordinates for geo-mapping or native store lookup targets.",
                    },
                    {
                      group: "CAMERA",
                      list: ["CAMERA"],
                      desc: "Enables custom user profile capture or live barcode scans.",
                    },
                    {
                      group: "MICROPHONE",
                      list: ["RECORD_AUDIO"],
                      desc: "Supports multiplayer voice communication and session audio recordings.",
                    },
                    {
                      group: "NOTIFICATIONS",
                      list: ["POST_NOTIFICATIONS"],
                      desc: "System alert push hooks launched under Android 13+ rules.",
                    },
                    {
                      group: "CONTACTS",
                      list: ["READ_CONTACTS", "WRITE_CONTACTS", "GET_ACCOUNTS"],
                      desc: "Retrieves friend listings and local account configurations.",
                    },
                    {
                      group: "PHONE & CALLS",
                      list: [
                        "READ_PHONE_STATE",
                        "CALL_PHONE",
                        "ANSWER_PHONE_CALLS",
                      ],
                      desc: "Monitors audio focus priorities to silent the app during active video calls.",
                    },
                    {
                      group: "SMS",
                      list: [
                        "SEND_SMS",
                        "RECEIVE_SMS",
                        "READ_SMS",
                        "RECEIVE_WAP_PUSH",
                        "RECEIVE_MMS",
                      ],
                      desc: "Processes or monitors authentication SMS verification codes.",
                    },
                    {
                      group: "SENSORS",
                      list: ["BODY_SENSORS", "BODY_SENSORS_BACKGROUND"],
                      desc: "Accesses biometric, health, or motion details during active sessions.",
                    },
                    {
                      group: "CALENDAR",
                      list: ["READ_CALENDAR", "WRITE_CALENDAR"],
                      desc: "Schedules matched matchings or live event callbacks into calendar feeds.",
                    },
                  ].map((g, idx) => (
                    <div
                      key={idx}
                      className="bg-[var(--surface2)]/80 p-3 rounded-xl border border-[var(--border)] space-y-1.5 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-mono font-bold text-[9px] text-indigo-400 continental tracking-widest">
                            {g.group}
                          </span>
                          <span className="text-[8px] text-[var(--text-muted)] font-bold">
                            RUNTIME
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1 font-mono text-[8.5px] mb-2">
                          {g.list.map((p, pIdx) => (
                            <span
                              key={pIdx}
                              className="bg-[var(--surface3)] text-[var(--text-highlight)] border border-[var(--border)] px-1 py-0.2 rounded"
                            >
                              {p}
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="text-[10px] text-[var(--text-muted)] leading-snug">
                        {g.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function RuntimePermissionsDemo() {
  const [permissionState, setPermissionState] = React.useState<
    | "rationale"
    | "sys_popup_1"
    | "warning"
    | "sys_popup_2"
    | "denied_never"
    | "granted"
    | "settings"
  >("rationale");
  const [isNeverAskAgainChecked, setIsNeverAskAgainChecked] =
    React.useState(false);
  const [settingsToggled, setSettingsToggled] = React.useState(false);

  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[var(--border)] pb-4">
        <div>
          <h4 className="text-sm font-bold text-[var(--text-highlight)] flex items-center gap-1.5 font-sans">
            <span>🤖 Practice Interactive Sandbox</span>
          </h4>
          <p className="text-[11px] text-[var(--text-muted)] mt-1 font-sans">
            Visualizes and validates the complete user journey of explanation,
            system prompts, denial handling, "Don't ask again" gates, and device
            settings overlays.
          </p>
        </div>
        <button
          onClick={() => {
            setPermissionState("rationale");
            setIsNeverAskAgainChecked(false);
            setSettingsToggled(false);
          }}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white border border-indigo-500/20 rounded-lg text-xs font-bold transition shadow-sm shrink-0 font-sans cursor-pointer"
        >
          Reset Simulation
        </button>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 py-4">
        {/* Smartphone Container */}
        <div className="w-[310px] h-[550px] bg-zinc-950 border-8 border-zinc-800 rounded-[38px] shadow-2xl relative flex flex-col overflow-hidden select-none border-solid shrink-0">
          {/* Smartphone Camera Notch */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-4 bg-zinc-805 rounded-full z-20 flex items-center justify-center">
            <div className="w-2.5 h-2.5 bg-neutral-900 rounded-full" />
          </div>

          {/* Smartphone Mock Screen Content */}
          <div className="w-full h-full flex flex-col pt-8 pb-4 px-4 text-xs font-sans bg-zinc-950 text-zinc-100 z-10 select-none relative">
            {/* Status Bar */}
            <div className="flex items-center justify-between text-[9px] text-zinc-500 font-mono tracking-wider px-2 mb-4 shrink-0">
              <span>11:08 UTC</span>
              <div className="flex items-center gap-1.5">
                <span>5G</span>
                <div className="w-3 h-2 border border-zinc-500 rounded-xs flex items-end p-0.2">
                  <div className="w-full h-2/3 bg-zinc-400" />
                </div>
              </div>
            </div>

            {/* Settings view mock or Game app mock */}
            {permissionState === "settings" ? (
              <div className="flex-1 flex flex-col animate-in fade-in slide-in-from-right duration-300">
                <div className="border-b border-zinc-800 pb-3 mb-4 flex items-center gap-2">
                  <span className="text-[8px] font-mono bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-300 font-bold">
                    OS SETTINGS
                  </span>
                  <h5 className="font-bold text-zinc-200">
                    App Info: Quest Odyssey
                  </h5>
                </div>
                <p className="text-[10px] text-zinc-500 mb-4 font-mono">
                  Settings &gt; Apps &gt; Quest Odyssey &gt; Permissions
                </p>

                <div className="space-y-4 flex-1">
                  <div className="bg-zinc-900 p-3 rounded-xl border border-zinc-800 space-y-3">
                    <p className="font-bold text-zinc-400 text-[9px] tracking-wider uppercase">
                      ALLOWED
                    </p>
                    <p className="text-[10px] text-zinc-500 italic">None</p>

                    <div className="h-[1px] bg-zinc-800 my-2" />

                    <p className="font-bold text-zinc-400 text-[9px] tracking-wider uppercase">
                      NOT ALLOWED
                    </p>
                    <div className="flex items-center justify-between py-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">📁</span>
                        <div>
                          <p className="font-semibold text-zinc-300">
                            Files and Media
                          </p>
                          <p className="text-[9px] text-zinc-500">
                            Access photo and save assets
                          </p>
                        </div>
                      </div>
                      {/* Toggle Switch */}
                      <button
                        type="button"
                        onClick={() => setSettingsToggled(!settingsToggled)}
                        className={`w-9 h-5 rounded-full p-0.5 transition-colors duration-200 cursor-pointer ${settingsToggled ? "bg-indigo-600" : "bg-zinc-750"}`}
                      >
                        <div
                          className={`w-4 h-4 rounded-full bg-white transition-all duration-200 ${settingsToggled ? "translate-x-4" : "translate-x-0"}`}
                        />
                      </button>
                    </div>
                  </div>

                  <p className="text-[10px] text-zinc-400 leading-relaxed bg-zinc-900/50 p-3 rounded-lg border border-zinc-805 font-mono">
                    {settingsToggled
                      ? "✅ Storage permissions enabled manually! Return to the game to start your secure adventure."
                      : "⚠️ Permission is disabled. Toggle the switch to permit storage files access."}
                  </p>
                </div>

                <button
                  onClick={() => {
                    if (settingsToggled) {
                      setPermissionState("granted");
                    } else {
                      setPermissionState("denied_never");
                    }
                  }}
                  className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 font-bold rounded-lg text-white text-[11px] transition mt-auto flex items-center justify-center gap-1 cursor-pointer"
                >
                  ← Return to Game
                </button>
              </div>
            ) : (
              <div className="flex-1 flex flex-col relative justify-center">
                <div className="absolute top-0 left-0 right-0 h-10 bg-indigo-950/40 border border-indigo-500/20 rounded-xl flex items-center justify-between px-3">
                  <span className="font-extrabold text-[9px] tracking-widest text-indigo-300 uppercase">
                    QUEST ODYSSEY
                  </span>
                  <div className="flex items-center gap-1.5 font-mono text-[8px] text-indigo-400">
                    <span>🛡️ LV10</span>
                    <span>💎 350</span>
                  </div>
                </div>

                <div className="text-center space-y-3 px-2 flex-1 flex flex-col justify-center items-center">
                  {permissionState === "granted" ? (
                    <div className="space-y-4 animate-in zoom-in duration-300">
                      <div className="w-12 h-12 bg-green-500/10 text-green-500 rounded-full border border-green-500/20 flex items-center justify-center text-xl mx-auto shadow-lg shadow-green-500/5">
                        ✓
                      </div>
                      <div>
                        <h5 className="font-extrabold text-green-400 text-xs text-center font-sans">
                          Permission Granted!
                        </h5>
                        <p className="text-[10px] text-zinc-400 leading-relaxed mt-1 text-center font-sans">
                          Core app assets and cloud sync capabilities loaded.
                          Your game is fully compliant!
                        </p>
                      </div>
                      <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-3 text-[10px] text-zinc-300 space-y-1 font-mono text-left w-full p-3">
                        <p className="text-zinc-500 uppercase text-[8px] font-bold tracking-wider">
                          Device Log Trace
                        </p>
                        <p className="text-green-400">
                          ✓ STORAGE_FILES: GRANTED
                        </p>
                        <p className="text-green-400">
                          ✓ CACHE_SYNC: COMPLETED
                        </p>
                        <p className="text-zinc-400">✓ GAMEPLAY_INIT: OK</p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3 py-6 text-center">
                      <span className="text-3xl filter drop-shadow">🎮</span>
                      <h6 className="font-bold text-zinc-300 text-center font-sans">
                        Evaluating local game files...
                      </h6>
                      <p className="text-[10px] text-zinc-500 max-w-xs mx-auto text-center font-sans leading-relaxed">
                        Evaluating standard manifest guidelines and runtime
                        authentication checks. Choose an interactive action in
                        the prompt.
                      </p>
                    </div>
                  )}
                </div>

                {/* --- PRE-REQUEST RATIONALE EXPLANATION DIALOG --- */}
                {permissionState === "rationale" && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center p-3 z-30 animate-in fade-in duration-200">
                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 w-full space-y-4 animate-in slide-in-from-bottom duration-300 shadow-xl">
                      <div className="flex items-center gap-2 border-b border-zinc-800 pb-2">
                        <span className="text-lg">📁</span>
                        <h5 className="font-extrabold text-zinc-200 text-[11px] leading-tight font-sans text-left">
                          Storage Access Required
                        </h5>
                      </div>
                      <p className="text-[10px] text-zinc-400 leading-relaxed text-left font-sans">
                        Quest Odyssey requires storage permissions to download
                        game graphics assets, sync progress logs, and prevent
                        loss of data offline.
                      </p>
                      <div className="flex gap-2 justify-end pt-1">
                        <button
                          onClick={() => setPermissionState("warning")}
                          className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 font-bold rounded-lg text-[10px] cursor-pointer"
                        >
                          Decline
                        </button>
                        <button
                          onClick={() => setPermissionState("sys_popup_1")}
                          className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg text-[10px] shadow cursor-pointer"
                        >
                          OK
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* --- FIRST SYSTEM POPUP --- */}
                {permissionState === "sys_popup_1" && (
                  <div className="absolute inset-0 bg-black/50 flex items-end justify-center p-2 z-45 animate-in fade-in duration-200">
                    <div className="bg-zinc-900 rounded-t-3xl p-5 w-full space-y-4 animate-in slide-in-from-bottom duration-300 shadow-2xl border-t border-zinc-850">
                      <div className="text-center space-y-2">
                        <div className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center text-xl mx-auto border border-zinc-700">
                          📁
                        </div>
                        <h5 className="font-bold text-zinc-150 text-xs text-center font-sans">
                          Allow{" "}
                          <strong className="text-zinc-100">
                            Quest Odyssey
                          </strong>{" "}
                          to access photos and media on this device?
                        </h5>
                      </div>

                      <p className="text-[9px] text-zinc-500 text-center uppercase tracking-wider font-mono">
                        Android Native OS System Prompt
                      </p>

                      <div className="space-y-1.5 pt-2">
                        <button
                          onClick={() => setPermissionState("granted")}
                          className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-[10px] transition cursor-pointer"
                        >
                          Allow
                        </button>
                        <button
                          onClick={() => setPermissionState("warning")}
                          className="w-full py-2 bg-zinc-800 hover:bg-zinc-720 text-zinc-200 font-bold rounded-xl text-[10px] transition cursor-pointer"
                        >
                          Don't Allow
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* --- WARNING DIALOG ON DENIAL --- */}
                {permissionState === "warning" && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center p-3 z-30 animate-in fade-in duration-200">
                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 w-full space-y-4 animate-in zoom-in duration-200 shadow-xl">
                      <div className="flex items-center gap-2 text-amber-500 border-b border-zinc-800 pb-2">
                        <span className="text-base text-left">⚠️</span>
                        <h5 className="font-extrabold text-[11px] leading-tight text-amber-400 text-left font-sans">
                          Permission Necessary
                        </h5>
                      </div>
                      <p className="text-[10px] text-zinc-400 leading-relaxed text-left font-sans">
                        Quest Odyssey cannot download required graphic binaries
                        or secure database keys without storage features. The
                        game will fail to launch if disabled.
                      </p>
                      <div className="flex gap-2 justify-end pt-1">
                        <button
                          onClick={() => setPermissionState("rationale")}
                          className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-750 text-zinc-400 font-bold rounded-lg text-[10px] cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => setPermissionState("sys_popup_2")}
                          className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg text-[10px] cursor-pointer"
                        >
                          Retry
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* --- SECOND SYSTEM POPUP WITH NEVER ASK AGAIN OPTION --- */}
                {permissionState === "sys_popup_2" && (
                  <div className="absolute inset-0 bg-black/50 flex items-end justify-center p-2 z-45 animate-in fade-in duration-200">
                    <div className="bg-zinc-900 rounded-t-3xl p-5 w-full space-y-4 animate-in slide-in-from-bottom duration-300 shadow-2xl border-t border-zinc-850">
                      <div className="text-center space-y-2">
                        <div className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center text-xl mx-auto border border-zinc-700">
                          📁
                        </div>
                        <h5 className="font-bold text-zinc-150 text-xs text-center font-sans">
                          Allow{" "}
                          <strong className="text-zinc-100">
                            Quest Odyssey
                          </strong>{" "}
                          to access photos and media on this device?
                        </h5>
                      </div>

                      <div className="flex items-center gap-2 justify-center py-1 font-sans">
                        <input
                          type="checkbox"
                          id="neverAskAgain_demo"
                          className="rounded border-zinc-800 text-indigo-600 focus:ring-0 bg-zinc-800 h-3.5 w-3.5 cursor-pointer"
                          checked={isNeverAskAgainChecked}
                          onChange={(e) =>
                            setIsNeverAskAgainChecked(e.target.checked)
                          }
                        />
                        <label
                          htmlFor="neverAskAgain_demo"
                          className="text-[10px] text-zinc-400 font-medium cursor-pointer"
                        >
                          Don't ask again / Never ask again
                        </label>
                      </div>

                      <div className="space-y-1.5 pt-1">
                        <button
                          onClick={() => setPermissionState("granted")}
                          className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-[10px] transition cursor-pointer"
                        >
                          Allow
                        </button>
                        <button
                          onClick={() => {
                            if (isNeverAskAgainChecked) {
                              setPermissionState("denied_never");
                            } else {
                              setPermissionState("warning");
                            }
                          }}
                          className="w-full py-2 bg-zinc-800 hover:bg-zinc-720 text-zinc-200 font-bold rounded-xl text-[10px] transition cursor-pointer"
                        >
                          Don't Allow
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* --- DENIED PERMANENTLY / NEVER ASK STATE --- */}
                {permissionState === "denied_never" && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center p-3 z-30 animate-in fade-in duration-200">
                    <div className="bg-zinc-900 border border-zinc-805 rounded-2xl p-4 w-full space-y-4 animate-in zoom-in duration-200 shadow-xl">
                      <div className="flex items-center gap-2 text-rose-500 border-b border-zinc-800 pb-2 animate-pulse">
                        <span className="text-base text-left">🚫</span>
                        <h5 className="font-extrabold text-[11px] leading-tight text-rose-400 text-left font-sans">
                          Permission Blocked
                        </h5>
                      </div>
                      <p className="text-[10px] text-zinc-405 leading-relaxed text-left font-sans">
                        You selected "Don't ask again". Storage facilities
                        remain locked by Android policy. Tap "Go to Settings" to
                        manually toggle authorization.
                      </p>
                      <div className="flex gap-2 justify-end pt-1">
                        <button
                          onClick={() => {
                            setPermissionState("rationale");
                            setIsNeverAskAgainChecked(false);
                          }}
                          className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 font-bold rounded-lg text-[10px] cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => setPermissionState("settings")}
                          className="px-4 py-1.5 bg-amber-500 hover:bg-amber-600 text-zinc-950 font-extrabold rounded-lg text-[10px] shadow cursor-pointer"
                        >
                          Go to Settings
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Navigation Pill Bar (System) */}
            <div className="w-32 h-1 bg-zinc-700 rounded-full mx-auto shrink-0 mt-4" />
          </div>
        </div>

        {/* Phase State Progress Guide logger */}
        <div className="flex-1 w-full space-y-4 text-left leading-relaxed">
          <span className="text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-wider font-mono">
            Dynamic State Evaluation Log
          </span>
          <div className="border border-[var(--border)] bg-[var(--surface2)]/55 p-5 rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase text-[var(--text-highlight)]">
                Simulator Status:
              </span>
              <span className="text-[10.5px] font-mono px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-500 font-extrabold uppercase">
                {permissionState === "granted"
                  ? "✓ FULLY GRANTED"
                  : `⌚ STATUS_${permissionState.toUpperCase()}`}
              </span>
            </div>

            <div className="text-xs text-[var(--text-muted)] space-y-2 leading-relaxed font-sans">
              <p>
                This interactive state machine walks developers and reviewer
                teams through the strict user authentication loops required by
                Android Play Store Guidelines.
              </p>
              <div className="h-px bg-[var(--border)] my-1" />
              <div className="space-y-1.5 font-mono text-[10px]">
                <div className="flex items-center gap-2">
                  <span
                    className={
                      permissionState === "rationale"
                        ? "text-indigo-400 animate-pulse"
                        : "text-emerald-400"
                    }
                  >
                    {permissionState === "rationale" ? "●" : "✓"}
                  </span>
                  <span
                    className={
                      permissionState === "rationale"
                        ? "text-[var(--text-highlight)] font-bold"
                        : "text-[var(--text-muted)]"
                    }
                  >
                    1. Rationale Explanation Dialog
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={
                      permissionState === "sys_popup_1"
                        ? "text-indigo-400 animate-pulse"
                        : ["rationale"].includes(permissionState)
                          ? "text-zinc-650"
                          : "text-emerald-400"
                    }
                  >
                    {permissionState === "sys_popup_1"
                      ? "●"
                      : ["rationale"].includes(permissionState)
                        ? "○"
                        : "✓"}
                  </span>
                  <span
                    className={
                      permissionState === "sys_popup_1"
                        ? "text-[var(--text-highlight)] font-bold"
                        : "text-[var(--text-muted)]"
                    }
                  >
                    2. Native OS Consent Popup
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={
                      permissionState === "warning"
                        ? "text-indigo-400 animate-pulse"
                        : ["rationale", "sys_popup_1"].includes(permissionState)
                          ? "text-zinc-650"
                          : "text-emerald-400"
                    }
                  >
                    {permissionState === "warning"
                      ? "●"
                      : ["rationale", "sys_popup_1"].includes(permissionState)
                        ? "○"
                        : "✓"}
                  </span>
                  <span
                    className={
                      permissionState === "warning"
                        ? "text-[var(--text-highlight)] font-bold"
                        : "text-[var(--text-muted)]"
                    }
                  >
                    3. Soft Denial Warning Trigger
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={
                      permissionState === "sys_popup_2"
                        ? "text-indigo-400 animate-pulse"
                        : ["rationale", "sys_popup_1", "warning"].includes(
                              permissionState,
                            )
                          ? "text-zinc-650"
                          : "text-emerald-400"
                    }
                  >
                    {permissionState === "sys_popup_2"
                      ? "●"
                      : ["rationale", "sys_popup_1", "warning"].includes(
                            permissionState,
                          )
                        ? "○"
                        : "✓"}
                  </span>
                  <span
                    className={
                      permissionState === "sys_popup_2"
                        ? "text-[var(--text-highlight)] font-bold"
                        : "text-[var(--text-muted)]"
                    }
                  >
                    4. Secondary OS Prompt (with Never Ask checkbox)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={
                      permissionState === "denied_never"
                        ? "text-rose-455 font-bold animate-pulse"
                        : [
                              "rationale",
                              "sys_popup_1",
                              "warning",
                              "sys_popup_2",
                            ].includes(permissionState)
                          ? "text-zinc-650"
                          : "text-emerald-400"
                    }
                  >
                    {permissionState === "denied_never"
                      ? "🚫"
                      : [
                            "rationale",
                            "sys_popup_1",
                            "warning",
                            "sys_popup_2",
                          ].includes(permissionState)
                        ? "○"
                        : "✓"}
                  </span>
                  <span
                    className={
                      permissionState === "denied_never"
                        ? "text-rose-405 font-bold animate-pulse"
                        : "text-[var(--text-muted)]"
                    }
                  >
                    5. Hard Denial Settings Gate
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SubscriptionComplianceDemo({ tcId }: { tcId: string }) {
  if (!tcId) return null;

  const [isCompliant, setIsCompliant] = React.useState(true);

  // StoreKit mock sheet state
  const [isStoreKitOpen, setIsStoreKitOpen] = React.useState(false);
  const [storeKitStep, setStoreKitStep] = React.useState<
    "confirm" | "progress" | "success"
  >("confirm");

  // Subscription status
  const [isSubscribed, setIsSubscribed] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState<
    "weekly" | "monthly" | "yearly"
  >("monthly");

  // Custom dialogs (Terms / Privacy)
  const [modalType, setModalType] = React.useState<
    "terms" | "privacy" | "none"
  >("none");
  const [promotedTriggered, setPromotedTriggered] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const triggerStoreKit = () => {
    setStoreKitStep("confirm");
    setIsStoreKitOpen(true);
  };

  const handleApplePayAction = () => {
    setStoreKitStep("progress");
    setTimeout(() => {
      setStoreKitStep("success");
      setTimeout(() => {
        setIsStoreKitOpen(false);
        setIsSubscribed(true);
        showToast(
          `Successfully subscribed to ${selectedProduct.toUpperCase()} Elite Plan!`,
        );
      }, 1200);
    }, 1800);
  };

  const executeRestore = () => {
    setIsSubscribed(true);
    showToast(
      "Prior subscription purchases successfully restored via StoreKit!",
    );
  };

  const executeCancel = () => {
    setIsSubscribed(false);
    showToast("Subscription active status reset.");
  };

  const appleLogo = (
    <svg
      className="w-4 h-4 fill-current inline-block shrink-0 mr-1.5"
      viewBox="0 0 24 24"
      style={{ top: "-0.5px", position: "relative" }}
    >
      <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.79 22.05 6.8 20.68 5.96 19.48C4.25 17 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.1 16.67C20.08 16.74 19.67 18.11 18.71 19.5M15.97 4.17C16.63 3.37 17.07 2.28 16.95 1C16.01 1.04 14.86 1.63 14.19 2.42C13.62 3.08 13.12 4.19 13.27 5.45C14.31 5.53 15.31 4.93 15.97 4.17Z" />
    </svg>
  );

  return (
    <div className="w-full bg-[var(--surface2)]/80 rounded-2xl p-6 border border-[var(--border)] space-y-6 relative overflow-hidden text-left">
      {/* Toast Overlay */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -20, x: "-50%" }}
            className="absolute top-4 left-1/2 z-50 px-4 py-2 bg-indigo-650 text-white text-xs font-semibold rounded-lg shadow-xl border border-indigo-500/20 flex items-center gap-2 min-w-[280px] justify-center"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Visual Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[var(--border)] pb-4">
        <div>
          <h4 className="text-sm font-mono font-bold uppercase tracking-wider text-[var(--text-highlight)] flex items-center gap-2">
            <span>💳 App Store Subscriptions Sandbox & Workbench</span>
          </h4>
          <p className="text-[11px] text-[var(--text-muted)] mt-1">
            Validating price prominence, disclosures, restore state mechanics,
            and legal conformity in real-time.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Sub-selectors */}
        <div className="flex items-center justify-between bg-[var(--surface3)] p-1.5 rounded-xl border border-[var(--border)]">
          <button
            onClick={() => setIsCompliant(true)}
            className={`flex-1 text-xs py-2 rounded-lg font-bold transition-all flex items-center justify-center gap-1.5 ${isCompliant ? "bg-green-500/15 border border-green-505 text-green-550 shadow-sm font-bold" : "text-[var(--text-muted)] hover:text-[var(--text-highlight)] border border-transparent"}`}
          >
            <Check size={14} /> ⭐️ Compliant Layout (Agreed)
          </button>
          <button
            onClick={() => setIsCompliant(false)}
            className={`flex-1 text-xs py-2 rounded-lg font-bold transition-all flex items-center justify-center gap-1.5 ${!isCompliant ? "bg-red-500/15 border border-red-505 text-red-550 shadow-sm font-bold" : "text-[var(--text-muted)] hover:text-[var(--text-highlight)] border border-transparent"}`}
          >
            <X size={14} /> ⚠️ Non-Compliant Layout (Rejection Risk)
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Phone Simulator Box */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-[340px] bg-black border-4 border-zinc-805 rounded-3xl overflow-hidden shadow-2xl relative flex flex-col h-[520px]">
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-4 bg-zinc-800 rounded-b-xl z-20 flex justify-center items-center font-mono">
                <div className="w-10 h-1 bg-black rounded-full" />
              </div>

              {/* Simulated Screen Content - Dark Mode shop paywall */}
              <div className="flex-1 overflow-y-auto bg-zinc-950 p-4 pt-8 text-white space-y-4 text-left custom-scrollbar relative flex flex-col justify-between">
                {isSubscribed ? (
                  <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-4 my-auto">
                    <div className="w-16 h-16 bg-green-500/10 text-green-400 rounded-full flex items-center justify-center border border-green-500/20 animate-pulse">
                      <Check size={32} />
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                        Elite Club Subscription Active
                      </h5>
                      <p className="text-[9px] text-zinc-400 mt-1 leading-normal">
                        All premium features unlocked: Dynamic metrics,
                        unlimited PDF summaries, and real-time validation
                        analytics are persistent on your device.
                      </p>
                    </div>
                    <div className="w-full pt-4 space-y-2">
                      <p className="text-[7px] text-zinc-500 uppercase tracking-widest font-mono text-center">
                        Synced with iTunes billing account
                      </p>
                      <button
                        onClick={executeCancel}
                        className="w-full py-2 bg-zinc-900 border border-zinc-800 hover:bg-zinc-850 hover:border-zinc-700 text-zinc-400 text-[10px] font-bold rounded-lg transition-all"
                      >
                        Cancel / Reset Simulation
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div>
                      {/* Header Sign Up Prompt */}
                      <div className="flex items-center justify-between border-b border-zinc-900 pb-2 mt-2">
                        <span className="text-[10px] font-mono text-zinc-505 uppercase tracking-wider">
                          Store Premium Access
                        </span>
                        <span className="text-[8px] bg-indigo-500/20 text-indigo-400 font-bold px-1.5 py-0.5 rounded border border-indigo-500/15">
                          V2.4
                        </span>
                      </div>

                      {/* Prominent Sign-in with Apple - COMPLIANT INCLUDS APPLE BADGE */}
                      {isCompliant ? (
                        <div className="space-y-1.5 pt-3">
                          <p className="text-[9px] text-zinc-400 font-mono">
                            Quick account activation:
                          </p>
                          <button className="w-full h-8 bg-white hover:bg-zinc-200 text-black font-semibold text-xs rounded-lg flex items-center justify-center transition-all shadow-md">
                            {appleLogo}{" "}
                            {tcId === "iOS-SUB-1" ? (
                              <span className="ring-2 ring-indigo-500 ring-offset-2 ring-offset-zinc-950 px-1 py-0.2 rounded">
                                Sign in with Apple
                              </span>
                            ) : (
                              "Sign in with Apple"
                            )}
                          </button>
                          <p className="text-[8px] text-zinc-550 text-center text-zinc-500">
                            Fast sign-in, instantly synced to Apple ID billing
                          </p>
                        </div>
                      ) : (
                        <div className="pt-2">
                          {/* Apple sign-in is missing or squeezed at the bottom of the scroll, violating prominence */}
                          <div className="p-2 border border-dashed border-red-500/30 rounded-lg bg-red-500/5 text-[9px] text-red-400 font-mono text-center">
                            ⚠️ Apple Sign-In completely missing from checkout
                            entry!
                          </div>
                        </div>
                      )}

                      {/* Subscription Title & Tiers Grid */}
                      <div className="text-center pt-4 space-y-1">
                        <h5 className="text-sm font-bold tracking-tight text-white uppercase">
                          {isCompliant ? (
                            <span
                              className={
                                tcId === "iOS-SUB-4"
                                  ? "underline decoration-indigo-400 underline-offset-4 font-extrabold"
                                  : "Elite Club Membership"
                              }
                            />
                          ) : (
                            "UPGRADE CLIENT"
                          )}
                        </h5>
                        <p className="text-[10px] text-zinc-400">
                          Unlock dynamic offline metrics, premium PDF
                          generators, and sync features.
                        </p>
                      </div>

                      {/* Layout Tiers */}
                      {isCompliant ? (
                        <div className="grid grid-cols-3 gap-2 pt-4">
                          {/* Weekly */}
                          <div
                            onClick={() => setSelectedProduct("weekly")}
                            className={`p-2 rounded-lg border text-center transition-all cursor-pointer ${selectedProduct === "weekly" ? "border-indigo-500 bg-indigo-500/10" : "border-zinc-800 bg-zinc-900/40 hover:border-zinc-700"}`}
                          >
                            <p className="text-[8px] text-zinc-450 uppercase font-mono font-bold">
                              Weekly
                            </p>
                            <p
                              className={`text-xs font-bold mt-1 ${tcId === "iOS-SUB-4" ? "text-indigo-450" : ""}`}
                            >
                              $2.99
                            </p>
                            <p className="text-[7px] text-zinc-550 mt-1">
                              Auto-recurring
                            </p>
                          </div>
                          {/* Monthly */}
                          <div
                            onClick={() => setSelectedProduct("monthly")}
                            className={`p-2 rounded-lg border text-center transition-all cursor-pointer relative ${selectedProduct === "monthly" ? "border-indigo-450 bg-indigo-500/10 ring-1 ring-indigo-500" : "border-zinc-800 bg-zinc-900/40 hover:border-zinc-700"}`}
                          >
                            <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 text-[6px] bg-indigo-600 text-white border border-indigo-400 px-1 rounded uppercase font-bold">
                              Best
                            </span>
                            <p className="text-[8px] text-zinc-455 uppercase font-mono font-bold">
                              Monthly
                            </p>
                            <p
                              className={`text-xs font-bold mt-1 ${tcId === "iOS-SUB-4" ? "text-indigo-455" : ""}`}
                            >
                              $9.99
                            </p>
                            <p className="text-[7px] text-zinc-550 mt-1">
                              7-Day Trial
                            </p>
                          </div>
                          {/* Yearly */}
                          <div
                            onClick={() => setSelectedProduct("yearly")}
                            className={`p-2 rounded-lg border text-center transition-all cursor-pointer ${selectedProduct === "yearly" ? "border-indigo-500 bg-indigo-500/10" : "border-zinc-800 bg-zinc-900/40 hover:border-zinc-700"}`}
                          >
                            <p className="text-[8px] text-zinc-450 uppercase font-mono font-bold">
                              Yearly
                            </p>
                            <p
                              className={`text-xs font-bold mt-1 ${tcId === "iOS-SUB-4" ? "text-indigo-450" : ""}`}
                            >
                              $49.99
                            </p>
                            <p className="text-[7px] text-zinc-555 mt-1">
                              Save 60%
                            </p>
                          </div>
                        </div>
                      ) : (
                        // NON COMPLIANT GRAPHICS - HIDDEN FREQUENCY CUTS REJECTION
                        <div className="grid grid-cols-2 gap-2 pt-4">
                          <div className="p-2.5 rounded-lg border border-red-500/20 bg-zinc-900/50 text-center">
                            <p className="text-[8px] text-zinc-400 uppercase font-bold">
                              Standard
                            </p>
                            <p className="text-sm font-bold text-red-400 mt-1">
                              $9.99
                            </p>
                            <p className="text-[7px] text-red-500 font-mono mt-1">
                              ⚠️ Billing frequency hidden!
                            </p>
                          </div>
                          <div className="p-2.5 rounded-lg border border-zinc-800 bg-zinc-900/50 text-center opacity-60">
                            <p className="text-[8px] text-zinc-400 uppercase font-bold">
                              Lifetime Upgrade
                            </p>
                            <p className="text-sm font-bold mt-1">$99.99</p>
                            <p className="text-[7px] text-zinc-500 mt-1">
                              Unlock always
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Checkout Policy Disclosures Area */}
                    <div className="space-y-3 pt-4 border-t border-zinc-905 mt-6 pb-2">
                      {isCompliant ? (
                        <div className="space-y-2">
                          {/* ⭐️ Required Terms Disclosures directly on screen */}
                          <div
                            className={`text-[7.5px] text-zinc-400 leading-relaxed space-y-1 p-2 rounded bg-zinc-950 border border-zinc-900 ${tcId === "iOS-SUB-5" || tcId === "iOS-SUB-6" ? "ring-1 ring-indigo-400 border-indigo-400" : ""}`}
                          >
                            <p className="font-bold text-white uppercase text-[8px] tracking-wide mb-1 flex items-center gap-1">
                              <span className="w-1 h-1 bg-green-500 rounded-full" />{" "}
                              Required Subscription Disclaimers
                            </p>
                            <p>
                              <strong>Auto-Renewal Status:</strong>{" "}
                              {selectedProduct === "weekly"
                                ? "Weekly"
                                : selectedProduct === "monthly"
                                  ? "Monthly"
                                  : "Yearly"}{" "}
                              recurring subscription package. Payment will be
                              charged to iTunes Account on buy confirmation.
                              Subscriptions renew unless auto-renew is
                              deactivated{" "}
                              <strong>at least 24 hours prior</strong> to
                              current cycle cutoff.
                            </p>
                            <p>
                              <strong>Renewal Charges:</strong> Renewal charges
                              occur within 24h of current cycle cutoff (Charges:{" "}
                              {selectedProduct === "weekly"
                                ? "$2.99 / week"
                                : selectedProduct === "monthly"
                                  ? "$9.99 / month"
                                  : "$49.99 / year"}
                              ).
                            </p>
                            <p>
                              <strong>Management:</strong> Users may configure
                              memberships in{" "}
                              <strong>Apple Account Settings</strong>{" "}
                              post-purchase.
                            </p>
                          </div>

                          {/* Action buttons with visible legal links */}
                          <div className="space-y-2">
                            <button
                              onClick={triggerStoreKit}
                              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition-all shadow-lg text-center"
                            >
                              Activate{" "}
                              {selectedProduct === "monthly"
                                ? "7-Day Free Trial"
                                : "Elite Access"}
                            </button>

                            <div className="flex justify-center gap-3 text-[7px] text-indigo-400 font-mono font-semibold pt-1">
                              <button
                                onClick={() => setModalType("terms")}
                                className="hover:underline flex items-center gap-0.5 select-none shrink-0 text-indigo-400 hover:text-indigo-300 bg-transparent py-0.5 border-none cursor-pointer outline-none font-mono"
                              >
                                Terms of Use (EULA) <ExternalLink size={6} />
                              </button>
                              <span className="text-zinc-700 shrink-0 select-none">
                                |
                              </span>
                              <button
                                onClick={() => setModalType("privacy")}
                                className="hover:underline flex items-center gap-0.5 select-none shrink-0 text-indigo-400 hover:text-indigo-300 bg-transparent py-0.5 border-none cursor-pointer outline-none font-mono"
                              >
                                Privacy Policy <ExternalLink size={6} />
                              </button>
                              <span className="text-zinc-700 shrink-0 select-none">
                                |
                              </span>
                              <button
                                onClick={executeRestore}
                                className="hover:underline text-indigo-400 hover:text-indigo-300 select-none shrink-0 bg-transparent py-0.5 border-none cursor-pointer outline-none font-mono"
                              >
                                Restore Purchases
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        // ILLEGAL EMPTY LAYOUT -- REJECTION SECURED
                        <div className="space-y-3">
                          <div className="p-2 rounded bg-red-955/20 border border-red-500/20 text-[8px] text-red-500 font-semibold flex items-start gap-1">
                            <AlertTriangle
                              size={10}
                              className="shrink-0 mt-0.5"
                            />
                            <span>
                              MISSING DISCLOSURES: Lacks explicit writeups
                              regarding automatic renewal rates, 24h window, and
                              cancellation rules.
                            </span>
                          </div>

                          <button
                            onClick={() =>
                              showToast(
                                "Simulated store launch. This app would be rejected by Apple HIG!",
                              )
                            }
                            className="w-full py-2 bg-zinc-800 text-zinc-300 font-semibold text-xs rounded-xl"
                          >
                            TAP TO BUY
                          </button>

                          <div className="flex justify-center gap-2 text-[7px] text-zinc-500 font-mono">
                            <span>FAQ Help</span>
                            <span>&middot;</span>
                            <span>License Agreements (Unlinked)</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>

              {/* Simulated Device Frame absolute overlays */}
              <AnimatePresence>
                {modalType !== "none" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/85 z-30 flex items-center justify-center p-4 font-sans"
                  >
                    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 space-y-3 max-w-[280px] text-left">
                      <div className="flex justify-between items-center border-b border-zinc-800 pb-1.5">
                        <span className="text-[10px] font-mono font-bold text-white uppercase tracking-wider">
                          {modalType === "terms"
                            ? "Terms of Use (EULA)"
                            : "Privacy Policy"}
                        </span>
                        <button
                          onClick={() => setModalType("none")}
                          className="text-zinc-550 hover:text-white p-1 border-none bg-transparent"
                        >
                          <X size={12} />
                        </button>
                      </div>
                      <p className="text-[8.5px] text-zinc-400 leading-relaxed font-sans max-h-[160px] overflow-y-auto custom-scrollbar">
                        {modalType === "terms" ? (
                          <span>
                            <strong>
                              Apple Standard End User License Agreement (EULA).
                            </strong>{" "}
                            By upgrading to Elite Pro, you agree to our terms.
                            This service includes a monthly auto-renewing
                            subscription tier. Account renewal billing occurs
                            within 24 hours of expiry. Disabling auto-renew
                            options can be executed inside your iTunes App Store
                            controls under Apple Account Settings. All
                            transactions are processed securely through StoreKit
                            payment portals.
                          </span>
                        ) : (
                          <span>
                            <strong>Privacy Safeguards.</strong> We respect user
                            privacy securely. Zero biometric and credentials are
                            log-tracked on our servers. In-app receipts and
                            transaction records are validated solely against
                            verified cryptographic Apple Server endpoints to
                            confirm premium status offline. Your accounts are
                            isolated and protected against malicious trackers.
                          </span>
                        )}
                      </p>
                      <button
                        onClick={() => setModalType("none")}
                        className="w-full py-1 bg-white hover:bg-zinc-200 text-black font-bold text-[9px] rounded text-center uppercase border-none font-sans"
                      >
                        Agree & Dismiss
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* APPLE STOREKIT SHEET SIMULATION */}
              <AnimatePresence>
                {isStoreKitOpen && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/60 z-40 flex items-end"
                  >
                    <motion.div
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "100%" }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="w-full bg-zinc-900 border-t border-zinc-800 rounded-t-2xl p-5 space-y-4 text-white text-left shadow-2xl"
                    >
                      {/* Sheet header */}
                      <div className="flex justify-between items-center pb-2 border-b border-zinc-850">
                        <div className="flex items-center gap-1.5">
                          <span className="w-4 h-4 bg-zinc-800 rounded flex items-center justify-center text-[10px] text-zinc-405 font-bold font-mono">
                            
                          </span>
                          <span className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase font-mono">
                            App Store Confirmation
                          </span>
                        </div>
                        <button
                          onClick={() => setIsStoreKitOpen(false)}
                          className="text-zinc-550 hover:text-white bg-zinc-850 rounded-full p-1 border border-zinc-800 cursor-pointer"
                        >
                          <X size={10} />
                        </button>
                      </div>

                      {storeKitStep === "confirm" && (
                        <div className="space-y-4 font-sans">
                          <div className="flex justify-between items-start">
                            <div>
                              <h6 className="text-[11px] font-bold text-white uppercase font-mono tracking-tight">
                                Elite Club Premium
                              </h6>
                              <p className="text-[8.5px] text-zinc-400 mt-0.5">
                                Recurring subscription:{" "}
                                {selectedProduct.toUpperCase()}
                              </p>
                            </div>
                            <div className="text-right">
                              <span className="text-xs font-extrabold text-indigo-400">
                                $
                                {selectedProduct === "weekly"
                                  ? "2.99"
                                  : selectedProduct === "monthly"
                                    ? "9.99"
                                    : "49.99"}
                              </span>
                              <span className="text-[8px] text-zinc-505 block font-mono">
                                / cycle
                              </span>
                            </div>
                          </div>

                          <div className="bg-zinc-950 p-2.5 rounded-lg text-[8px] text-zinc-550 leading-normal border border-zinc-850">
                            <p className="font-semibold text-zinc-400 mb-0.5">
                              Double-side click checking:
                            </p>
                            Apple Pay confirms payment is secured using
                            Sandboxed FaceID. Re-billing automatically initiates
                            unless deactivated in iTunes subscription controls.
                          </div>

                          <div className="space-y-2">
                            <button
                              onClick={handleApplePayAction}
                              className="w-full py-2.5 bg-sky-500 hover:bg-sky-400 text-black font-extrabold text-xs rounded-xl transition-all shadow-glow flex items-center justify-center gap-1.5"
                            >
                              {appleLogo} Double-Click to Pay (Simulate)
                            </button>
                            <p className="text-[7.5px] text-center text-zinc-550 font-mono text-zinc-500">
                              Sandbox Test Account Active
                            </p>
                          </div>
                        </div>
                      )}

                      {storeKitStep === "progress" && (
                        <div className="py-8 flex flex-col items-center justify-center space-y-4">
                          <div className="w-10 h-10 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                          <div className="text-center space-y-1">
                            <p className="text-[10px] font-mono font-bold tracking-widest text-indigo-400 animate-pulse">
                              CRYPTO RECEIPT VALIDATION...
                            </p>
                            <p className="text-[8px] text-zinc-500">
                              StoreKit communicating secured receipt parameters
                              to sandbox gateway.
                            </p>
                          </div>
                        </div>
                      )}

                      {storeKitStep === "success" && (
                        <div className="py-8 flex flex-col items-center justify-center space-y-4">
                          <div className="w-12 h-12 bg-green-500 text-black rounded-full flex items-center justify-center shadow-glow-green animate-scale-in">
                            <Check size={24} strokeWidth={3} />
                          </div>
                          <div className="text-center space-y-1">
                            <p className="text-xs font-bold text-green-400 uppercase tracking-widest">
                              StoreKit Transaction Complete!
                            </p>
                            <p className="text-[8.5px] text-zinc-400">
                              Entitlement delivered. Subscription tier is fully
                              persistent on your device.
                            </p>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* PROMOTED IAP POPUP SIMULATION */}
              <AnimatePresence>
                {promotedTriggered && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/90 z-20 p-5 flex flex-col justify-center items-center text-center space-y-4"
                  >
                    <div className="bg-indigo-600/10 border border-indigo-500/20 p-4 rounded-2xl max-w-[280px] space-y-3 relative">
                      <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[8px] font-mono tracking-widest text-indigo-400 bg-indigo-950 border border-indigo-500/35 px-2.5 py-0.5 rounded-full uppercase font-extrabold">
                        Promoted IAP Handler
                      </span>
                      <div className="w-10 h-10 bg-indigo-500/20 text-indigo-400 rounded-full flex items-center justify-center mx-auto mb-1">
                        <Package size={18} />
                      </div>
                      <h6 className="text-[11px] font-extrabold uppercase text-white font-mono">
                        App Launched via App Store Promotion
                      </h6>
                      <p className="text-[8.5px] text-zinc-400 leading-relaxed">
                        Apple HIG mandates that when users initiate a
                        subscription buy directly from the App Store (Promoted
                        IAP),{" "}
                        <strong>
                          the App must display its own subscription
                          privacy/renewal policy screen FIRST
                        </strong>{" "}
                        before initiating the native purchase window.
                      </p>
                      <div className="grid grid-cols-2 gap-2 pt-1 font-sans">
                        <button
                          onClick={() => {
                            setPromotedTriggered(false);
                            triggerStoreKit();
                          }}
                          className="bg-indigo-600 hover:bg-indigo-550 text-white font-bold text-[9px] py-1.5 rounded uppercase border-none"
                        >
                          Show Shop Policy
                        </button>
                        <button
                          onClick={() => setPromotedTriggered(false)}
                          className="bg-zinc-800 hover:bg-zinc-750 text-zinc-400 font-semibold text-[9px] py-1.5 rounded uppercase border-none"
                        >
                          Skip / Exit
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Checker & Diagnostic Rules Layout */}
          <div className="lg:col-span-6 space-y-4 text-left">
            <div className="bg-[var(--surface3)] p-4 rounded-xl border border-[var(--border)]">
              <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider block">
                Rule Inspection Summary
              </span>
              <h5 className="font-bold text-sm text-[var(--text-highlight)] mt-1 font-sans">
                Paywall Disclosures & Core Assets First Party Compliance Review
              </h5>

              <div className="mt-4 space-y-3 font-sans">
                <div className="flex gap-2 text-xs">
                  <span className="mt-0.5 shrink-0 select-none">
                    {isCompliant ? "🟢" : "🔴"}
                  </span>
                  <div>
                    <p className="font-bold">
                      Apple Sign-In prominence & Placement
                    </p>
                    <p className="text-[10px] text-[var(--text-muted)] leading-relaxed mt-0.5">
                      {isCompliant
                        ? "Compliant. Sign in with Apple is displayed on the main viewport, sized equally as other options."
                        : "REJECTION RISK: Apple sign-in must be prominently featured alongside any alternative logins."}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 text-xs">
                  <span className="mt-0.5 shrink-0 select-none">
                    {isCompliant ? "🟢" : "🔴"}
                  </span>
                  <div>
                    <p className="font-bold">
                      Transparent Billing Frequency & Pricing
                    </p>
                    <p className="text-[10px] text-[var(--text-muted)] leading-relaxed mt-0.5">
                      {isCompliant
                        ? 'Compliant. Clear prices paired directly with duration prefixes ("Monthly @ $9.99", Weekly @ $2.99").'
                        : "REJECTION RISK: Ambiguous prices with hidden frequency secure immediate app rejection."}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 text-xs">
                  <span className="mt-0.5 shrink-0 select-none">
                    {isCompliant ? "🟢" : "🔴"}
                  </span>
                  <div>
                    <p className="font-bold">
                      Required Disclosures in First View
                    </p>
                    <p className="text-[10px] text-[var(--text-muted)] leading-relaxed mt-0.5">
                      {isCompliant
                        ? "Compliant. Direct writeups explain trial forfeitures, auto-renew mechanisms, and cancellation."
                        : "REJECTION RISK: Subscriptions must detail auto-renew disclosures directly on the primary viewport."}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 text-xs">
                  <span className="mt-0.5 shrink-0 select-none">
                    {isCompliant ? "🟢" : "🔴"}
                  </span>
                  <div>
                    <p className="font-bold">
                      EULA & Privacy policy visibility
                    </p>
                    <p className="text-[10px] text-[var(--text-muted)] leading-relaxed mt-0.5">
                      {isCompliant
                        ? 'Compliant. Explicit action buttons for "Terms of Use (EULA)" and "Privacy Policy" are easily legible during purchase flow.'
                        : "REJECTION RISK: Apple StoreKit demands actionable legal links prior to checkout initiating."}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {!isCompliant && (
              <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/10 text-xs text-red-500 space-y-1 font-sans">
                <p className="font-bold flex items-center gap-1.5 uppercase tracking-wide">
                  <X size={13} strokeWidth={3} /> Apple HIG Enforcement Action
                </p>
                <p className="text-[10px] leading-relaxed text-red-650 dark:text-red-400">
                  If this screen is submitted to App Review, it will trigger
                  rejection guidelines under{" "}
                  <strong>Subcategory 3.1.2 (Subscriptions)</strong>.
                </p>
              </div>
            )}

            {isCompliant && (
              <div className="p-4 rounded-xl bg-green-500/5 border border-green-500/10 text-xs text-green-500 space-y-1 font-sans">
                <p className="font-bold flex items-center gap-1.5 uppercase tracking-wide">
                  <Check size={13} strokeWidth={3} /> compliant architecture
                  check passed
                </p>
                <p className="text-[10px] leading-relaxed text-green-600 dark:text-green-400">
                  All required elements loaded on single view: Name, Price,
                  Auto-renew, cancellation conditions, and legal links.
                </p>
              </div>
            )}

            {/* Special Button to Trigger Promoted IAP demonstration */}
            <div className="pt-2 font-mono">
              <button
                onClick={() => setPromotedTriggered(true)}
                className="w-full text-xs font-mono py-2.5 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-xl hover:bg-indigo-500/20 transition-all text-center flex items-center justify-center gap-2 font-semibold cursor-pointer"
              >
                <span>🚀 Simulate App Store Promoted IAP Trigger</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PlayGamesServicesChecklist({
  tcs,
  executions,
  setStatus,
  setState,
  showToast,
  expandedTc,
  setExpandedTc,
}: any) {
  const GUIDELINE_DETAILS_MAP: Record<string, string[]> = {
    "And-GPGS-1.1": [
      "Automatic authentication will get players quickly authenticated and authorized to use the full set of features provided by the Google Play Games Services.",
      "If the user declines, your game should offer the opportunity for them to authenticate later (e.g. with a button in the game menu, etc.). The sign-in button should be easy for players to find; for example, it should be accessible from your main screen or located in the Settings screen. This button shouldn't be buried multiple levels deep in your game menu.",
    ],
    "And-GPGS-1.2": [
      "To provide players with an end-to-end experience that is attractive and consistent, implement the Google Play Games Services branding guidelines.",
    ],
    "And-GPGS-1.3": [
      'Give authenticated players an appropriate reminder or cue when your game performs some action on their behalf. For example, when an authenticated player finishes a level, you can provide a message like this to indicate that the player\'s score and achievements are being automatically uploaded: "You are authenticated with Google. Your achievements and scores will be saved automatically."',
    ],
    "And-GPGS-1.4": [
      "To ensure players don't lose their progress when switching or resetting devices, or if they play on multiple devices, ensure their progress is backed up to a Cloud Save solution, and use the Play Games Services ID as a key. When players authenticate with their Play Games Services ID, check whether progress exists for that account and if it does, allow the player to pick up where they left off.",
      "If the user is not authenticated, try to maintain the player's progress locally, then sync that progress when the player eventually authenticates. This helps to prevent losing any of the player's progress if the player postpones to authenticate your game.",
    ],
    "And-GPGS-ACH-1": [
      "At least 10 visible achievements must be in a revealed (non-hidden) state. Reveal achievements so that players can look over the goals and decide how to tackle them on launching your game.",
      "Do not lock or hide the description for these base achievements, as players need a clear initial roadmap of what is possible in the title.",
    ],
    "And-GPGS-ACH-2": [
      "At least four achievements should be reasonably and reliably achievable within an hour of gameplay by everyone who plays.",
      "This initial validation ensures immediate gratification for new players, helping build strong engagement and keeping them hooked early.",
    ],
    "And-GPGS-ACH-3": [
      "All achievements should have unique names and descriptions. These must make it clear to players what they need to do to unlock the achievement.",
      "Avoid copy-pasting description text across milestones, as this compromises user clarity and feels unpolished.",
    ],
    "And-GPGS-ACH-4": [
      "All achievements should have unique icons.",
      "Icons should be created as 512 x 512 pixels PNG, JPEG, or JPG files on transparent background. Avoid reusing artwork or default templates.",
    ],
    "And-GPGS-ACH-5": [
      "Ensure that all achievements are attainable. Players must be able to unlock all achievements you create.",
      "Double-check server-side triggers, progression math, and logical thresholds to guarantee zero broken trigger conditions.",
    ],
    "And-GPGS-ACH-6": [
      "Use incremental achievements to show progress. Incremental achievements are cumulative across game sessions (e.g. 23% complete).",
      "This helps players understand that their long-term efforts are being tracked faithfully by Play Services.",
    ],
    "And-GPGS-ACH-7": [
      "At least forty or more achievements spread across the lifetime of the game including ones that surprise and delight, recognise milestones, and capture player progress.",
    ],
    "And-GPGS-ACH-8": [
      "Use hidden achievements for element of surprise and delight.",
      "Hidden achievements means that details about the achievement are hidden from the player. These are perfect to shield players from early plot spoilers.",
    ],
    "And-GPGS-ACH-9": [
      "Add new achievements when new levels or episodes are added to the game to keep active users incentivized.",
    ],
    "And-GPGS-ACH-10": [
      "Score achievements proportionately. Achievement points should be proportional to the amount of time or skill required to earn that achievement.",
      "Easy achievements should yield modest points, while grueling end-game feats should offer heavy scores.",
    ],
    "And-GPGS-ACH-11": [
      "Design achievements for a variety of difficulty levels.",
      "Include some easy achievements that a player could earn through casual gameplay, intermediate achievements, and one or two very difficult achievements.",
    ],
    "And-GPGS-ACH-12": [
      "Don't frontload achievements.",
      "Avoid awarding more than one achievement in the first 5 minutes of gameplay, since players who are new to your game won't be deeply invested enough to care.",
      'Watch out for achievements likely to be trivially earned, such as "Complete a level without taking damage" at the absolute beginning of the game.',
    ],
    "And-GPGS-ACH-13": [
      "Define achievements around compelling in-game activities.",
      'Select metrics to build achievements that make your game more compelling and replayable (e.g., "number of zombies killed" is better than "number of miles walked").',
    ],
    "And-GPGS-ACH-14": [
      "Use color achievement icons.",
      "Play Games Services uses grayscale versions of achievement icons to show if they're earned or unearned. If you are restricted to using monochromatic icons, display them on a colored background.",
    ],
    "And-GPGS-ACH-15": [
      "Minimize the use of hidden achievements.",
      "Hidden achievements should only be used to avoid early-game spoilers; they shouldn't be the norm.",
    ],
    "And-GPGS-ACH-16": [
      "Avoid achievements that are too reliant on chance.",
      'For example, "Find 100 treasure chests" is a better achievement than "Find an item that has a 1% chance of appearing in a treasure chest" as it rewards player effort.',
    ],
    "And-GPGS-ACH-17": [
      'Think like an "Achievement Hunter".',
      "Some players will attempt to earn every achievement you create. Try to provide achievements that cater to this category, and avoid permanent story locks or unrecoverable lockouts.",
    ],
    "And-GPGS-LEAD-1": [
      "Make leaderboards visible in your main menu and after key transitions.",
      "Leaderboards should be readily accessible on the loading of a game. After critical transitions in a game (for example, at the end of a level, or when the player dies), players should immediately see links to the relevant leaderboards.",
    ],
    "And-GPGS-LEAD-2": [
      "Define upper limits for scores that can be submitted.",
      "If possible, add limits when defining your leaderboards so that obviously fake scores are discarded.",
    ],
    "And-GPGS-LEAD-3": [
      "Use custom icons.",
      "Create a custom icon for each leaderboard you define; don't just use your game's icon, as it will display poorly in the Google Play Games app.",
    ],
    "And-GPGS-LEAD-4": [
      "Keep the frequency of score submissions appropriate.",
      "Submit scores after critical transitions in the game, such as at the end of a level or when a player's game character dies. For games without critical transitions (for example, an \"endless runner\" type game), use good judgment on how frequently to submit scores. Scores shouldn't be submitted continuously or every second.",
    ],
    "And-GPGS-LEAD-5": [
      "Make use of scoretags.",
      "Scoretags are extra bits of data that can be sent with your score submission. For example, you can implement a scoretag as a flag to confirm that a player's submitted score is valid.",
      "Custom leaderboards can also read this tag data. If the scoretag consisted of an ID for a YouTube video containing that player's gameplay, for example, your game could create a link to view that video within your leaderboard.",
    ],
    "And-GPGS-LEAD-6": [
      "Creatively design your own leaderboard UI.",
      "If you have the resources, build your own custom leaderboard view on top of the social leaderboard data. Social leaderboards typically create a more engaging experience than public leaderboards. Check first to determine if there are any entries in the social leaderboard. If not, use the public leaderboard instead.",
    ],
    "And-GPGS-LEAD-7": [
      "Show players how they stack up against the competition.",
      "The leaderboards API supports showing score windows (for example, a player's rank within +/-10 spots). If you are creating a custom view, this can be a powerful way to motivate engagement. This could be shown right after a critical transition in the game (for example, at the end of a level or when a player's game character dies). Avoid putting unnecessary clicks between your players and their ranking information.",
    ],
    "And-GPGS-FRND-1": [
      "Show the Play Games Services icon next to users who have a Play Games profile in user lists.",
      "This list could be an existing friends list, a recently-played friends list, or another list of friends in the game interface.",
    ],
    "And-GPGS-FRND-2": [
      "The Play Games Services icon must be clickable.",
      "Pressing the icon should trigger a smooth visual view allowing the player to compare achievements, metrics, and profiles against the chosen player.",
    ],
    "And-GPGS-FRND-3": [
      "Player profiles and friend invitations support, for customizable in-game player names.",
      "If a player customizes their name within the game (rather than using their default Play Games name), the system should share this in-game nickname as context during friend invites and profile comparisons.",
      "This means that friend invitations sent from within the game provide clear context to both parties:",
      "• The recipient sees the active in-game display name of the person who sent the invite, plus the name of the game.",
      "• The sender sees the recipient's custom in-game nickname and the game name they connected from.",
    ],
    "And-GPGS-FRND-4": [
      "Use different icons to show which Play Games users are already friends, and which are not yet Play Games friends but have authenticated with Play Games.",
      'Use two icons for Play Games users, one for "Friends" and one for "Not friends" (or when the friendship status is unknown).',
    ],
    "And-GPGS-FRND-5": [
      "Keep your friends list automatically updated whenever displaying it.",
      "Ensure the game requests the latest social data from Google Play Games in the background whenever the player enters the friends panel, guaranteeing you see an up-to-date online list.",
    ],
    "And-GPGS-FRND-6": [
      "Incorporate Play Games Friends into existing in-game friends trackers.",
      'If your game already contains in-game friends, use the Friends service to increase the list of friends by adding the Play Games friends. If a player is in the in-game friends list and they are also a Play Games friend, show the icon for "Friends".',
    ],
    "And-GPGS-FRND-7": [
      "Do not show the Friends API access dialog repeatedly after denial.",
      'If a player has denied the request to access their friends list, don\'t show the dialog asking for access again unless the user has taken an action to indicate they want to give access (for example, pressing an "Import Play Games Friends" button).',
    ],
    "And-GPGS-FRND-8": [
      "Provide a recovery gateway mechanism to grant friends list access.",
      'If a player has denied access to the friends list, give them a way to grant friends list access in the future (for example, after pressing an "Import Play Games Friends" button).',
    ],
    "And-GPGS-FRND-9": [
      "Secure backend and social identity integration rules.",
      "If you verify user records using a backend service, ensure identifiers are queried and synced securely through recommended APIs.",
      "This guarantees that players always see uniform, correct, and secure account names across devices and game networks without identity mix-ups.",
    ],
    "And-GPGS-QUOTA-1": [
      "Utilize standardized game library components to optimize service usage.",
      "Integrating through standard libraries automates several key client-side performance saving actions:",
      "• Cache details offline: Locally holds achievement status and leaderboard info, allowing users to review their badges freely without triggering extra calls.",
      "• Filter score submissions: Only posts high scores if they actively exceed your previous record tier.",
      "• Combine rapid calls: Smoothly buffers frequent progress increments to bypass backend restrictions.",
    ],
    "And-GPGS-QUOTA-2": [
      "Combine highly frequent progress updates into spaced intervals.",
      "For fast-paced or highly repeatable actions (such as striking a target, executing standard jumps, or gathering coins), do not sync progress on every single individual count.",
      "Instead, wait until a natural level boundary or game-round completes to post the total sum, or queue and push increments in larger logical groups.",
    ],
    "And-GPGS-QUOTA-3": [
      "Coordinate and monitor your applet service quota usage.",
      "Be mindful of overall synchronizations to preserve internet bandwidth and device battery lifetimes.",
      "• Keep progress updates to every few minutes rather than submitting on every single tap or transition.",
      "• Defer leaderboard postings until active play sessions terminate.",
      "• Monitor system health and daily request limits from your cloud project portal.",
    ],
    "And-GPGS-SAVE-1": [
      "Add metadata to provide additional context for saved games.",
      "At minimum, you must include the following metadata when saving a game state:",
      "• Cover Image: A screenshot that captures active game progress to remind players of where they left the title.",
      '• Description: Short summary text that provides helpful context for the screenshot (e.g. "Level 4 - Ice Cavern").',
      "• Active Duration/Timestamp: Accurately indicates how long the player has spent playing the game for this specific slot.",
    ],
    "And-GPGS-SAVE-2": [
      "Allow players to load saved games.",
      "Confirm that the game successfully loads the exact requested saved file when players make a selection from the Google Play Games app or the default Saved Games selection UI.",
      "The title must restore the gameplay precisely to the appropriate checkpoint and state corresponding to that specific file.",
    ],
  };

  const allGuidelines = tcs.map((tc: any) => {
    const isAchievements =
      tc.id.includes("ACH") || tc.originalRef === "Achievements";
    const isLeaderboards =
      tc.id.includes("LEAD") || tc.originalRef === "Leaderboards";
    const isFriends = tc.id.includes("FRND") || tc.originalRef === "Friends";
    const isQuota =
      tc.id.includes("QUOTA") || tc.originalRef === "Quota and rate limiting";
    const isSavedGames =
      tc.id.includes("SAVE") || tc.originalRef === "Saved games";
    return {
      id: tc.id,
      isBestPractice: tc.type === "best_practice" || tc.isBestPractice,
      category: isAchievements
        ? "Achievements Design"
        : isLeaderboards
          ? "Leaderboards Design"
          : isFriends
            ? "Friends Integration"
            : isQuota
              ? "Quota & Rate Limiting"
              : isSavedGames
                ? "Saved Games"
                : tc.originalRef || "Platform authentication",
      title: tc.title,
      snippet: tc.steps ? tc.steps.split("\n")[0] : tc.title,
      steps: tc.steps || "",
      expected:
        tc.expected ||
        "Correct verification of specified game services policies.",
      details: GUIDELINE_DETAILS_MAP[tc.id] || [tc.title],
      link:
        tc.id === "And-GPGS-1.2"
          ? "https://developers.google.com/games/services/branding"
          : undefined,
    };
  });

  const platformItems = allGuidelines.filter(
    (i: any) =>
      !i.id.includes("ACH") &&
      !i.id.includes("LEAD") &&
      !i.id.includes("FRND") &&
      !i.id.includes("QUOTA") &&
      !i.id.includes("SAVE"),
  );
  const achievementsItems = allGuidelines.filter((i: any) =>
    i.id.includes("ACH"),
  );
  const leaderboardsItems = allGuidelines.filter((i: any) =>
    i.id.includes("LEAD"),
  );
  const friendsItems = allGuidelines.filter((i: any) => i.id.includes("FRND"));
  const quotaItems = allGuidelines.filter((i: any) => i.id.includes("QUOTA"));
  const savedGamesItems = allGuidelines.filter((i: any) =>
    i.id.includes("SAVE"),
  );

  const subsections = [
    {
      title: "Platform Authentication",
      badge: "Auth & Sync",
      description:
        "Google Play Games Services client integration, automatic sign-in workflows, and active cloud-save behaviors.",
      items: platformItems,
    },
    {
      title: "Achievements Design",
      badge: "Achievements",
      description:
        "Milestone distribution, early gameplay engagement, attainable parameters, scoring balance, and progression tracking rules.",
      items: achievementsItems,
    },
    {
      title: "Leaderboards Design",
      badge: "Leaderboards",
      description:
        "Establish intuitive access, secure anti-cheat score thresholds, custom dashboard art, and contextual local rank focus.",
      items: leaderboardsItems,
    },
    {
      title: "Friends Integration",
      badge: "Friends",
      description:
        "Represent social connections, merge custom in-game contacts with Play profile lists, and securely compare rankings.",
      items: friendsItems,
    },
    {
      title: "Quota and Rate Limiting",
      badge: "Quotas",
      description:
        "Optimize server calls, batch repetitive incremental milestones, and preserve mobile device battery efficiency.",
      items: quotaItems,
    },
    {
      title: "Saved Games",
      badge: "Saves",
      description:
        "Commit comprehensive cloud context metadata, include gameplay preview screenshots and session durations, and support seamless file restore states.",
      items: savedGamesItems,
    },
  ];

  const visibleSections = subsections.filter((s) => s.items.length > 0);

  return (
    <div className="space-y-10 font-sans">
      {visibleSections.map((sect, sectIdx) => (
        <div
          key={sect.title}
          className="bg-[var(--surface)] text-[var(--text-highlight)] rounded-2xl border border-[var(--border)] shadow-xl overflow-hidden"
        >
          {/* Subsection Header */}
          <div className="bg-[var(--surface2)]/50 border-b border-[var(--border)] px-6 py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-mono font-bold uppercase tracking-widest bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded">
                  {sect.badge}
                </span>
              </div>
              <h4 className="text-sm font-semibold text-[var(--text-highlight)] mt-1">
                {sect.title}
              </h4>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed max-w-2xl mt-0.5">
                {sect.description}
              </p>
            </div>
          </div>

          <div
            className="divide-y divide-[var(--border)] bg-[var(--surface)]"
            id={`playgames-sub-${sectIdx}`}
          >
            {sect.items.map((item, itemIdx) => {
              const tc = tcs.find((t: any) => t.id === item.id) || {
                id: item.id,
                expected: item.expected,
              };
              const status = executions[item.id]?.status || "not_tested";
              const isExpanded = expandedTc === item.id;

              return (
                <div
                  key={item.id}
                  className="transition-all duration-300 hover:bg-[var(--surface2)]/20"
                >
                  <div
                    className="grid grid-cols-12 gap-5 p-5 md:p-6 cursor-pointer select-none items-center"
                    onClick={() => setExpandedTc(isExpanded ? null : item.id)}
                  >
                    {/* Index column */}
                    <div className="col-span-12 md:col-span-1 flex items-center gap-3">
                      <span className="text-[10px] font-mono text-[var(--text-muted)] bg-[var(--surface2)] w-6 h-6 rounded-md flex items-center justify-center border border-[var(--border)] font-bold">
                        {itemIdx + 1}
                      </span>
                    </div>

                    {/* Left column: Type Tag */}
                    <div className="col-span-12 md:col-span-2">
                      {item.isBestPractice ? (
                        <span className="text-[9px] font-mono font-bold uppercase tracking-widest bg-amber-500/10 text-amber-500 border border-amber-500/30 py-1 px-3 rounded-md inline-block">
                          Best Practice
                        </span>
                      ) : (
                        <span className="text-[9px] font-mono font-bold uppercase tracking-widest bg-red-500/10 text-red-500 border border-red-500/30 py-1 px-3 rounded-md inline-block">
                          Required
                        </span>
                      )}
                    </div>

                    {/* Main Content Column */}
                    <div className="col-span-12 md:col-span-9 lg:col-span-5 space-y-1.5 pr-4">
                      {/* Guideline Title */}
                      <h4 className="text-xs font-bold text-[var(--text-highlight)] leading-snug">
                        {item.title}
                      </h4>
                      {/* Short snippet of description */}
                      <p className="text-[11px] text-[var(--text-muted)] leading-relaxed italic truncate">
                        {item.snippet}
                      </p>
                    </div>

                    {/* Right Column: Status & Expand controls */}
                    <div
                      className="col-span-12 lg:col-span-4 flex items-center justify-end gap-3"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex gap-1.5 flex-wrap justify-end">
                        <StatusBtn
                          active={status === "pass"}
                          onClick={() => {
                            setStatus(item.id, "pass");
                            showToast(`${item.id} Pass registered`);
                          }}
                          label="Pass"
                          color="bg-green-500/10 text-green-500 border border-green-500/20"
                          activeCls="bg-green-500 text-black border-green-500 shadow-glow-green"
                        />
                        <StatusBtn
                          active={status === "fail"}
                          onClick={() => {
                            setStatus(item.id, "fail");
                            showToast(`${item.id} Fail registered`);
                          }}
                          label="Fail"
                          color="bg-red-500/10 text-red-500 border border-red-500/20"
                          activeCls="bg-red-500 text-white border-red-500 shadow-glow-red"
                        />
                        <StatusBtn
                          active={status === "not_applicable"}
                          onClick={() => {
                            setStatus(item.id, "not_applicable");
                            showToast(`${item.id} N/A registered`);
                          }}
                          label="N/A"
                          color="bg-orange-500/10 text-orange-500 border border-orange-500/20"
                          activeCls="bg-orange-500 text-black border-orange-500 shadow-glow-orange"
                        />
                        <StatusBtn
                          active={status === "not_tested"}
                          onClick={() => setStatus(item.id, "not_tested")}
                          label="Not Tested"
                          color="bg-[var(--bg)]/40 text-[var(--text-muted)] border border-transparent"
                          activeCls="bg-[var(--text-highlight)] text-[var(--bg)] border-[var(--text-highlight)] shadow-glow"
                        />
                      </div>

                      <motion.div
                        animate={{ rotate: isExpanded ? 90 : 0 }}
                        className="text-[var(--text-muted)] hover:text-[var(--text-highlight)] transition-colors cursor-pointer p-1"
                        onClick={() =>
                          setExpandedTc(isExpanded ? null : item.id)
                        }
                      >
                        <ChevronRight size={14} />
                      </motion.div>
                    </div>
                  </div>

                  {/* Expandable test details */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-[var(--border)] bg-[var(--surface2)]/50 overflow-hidden"
                      >
                        <div className="p-5 md:p-6 space-y-6 max-w-4xl mx-auto">
                          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                            <div className="md:col-span-3 space-y-6">
                              {/* Test specification list */}
                              <div className="space-y-3">
                                <p className="text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-widest flex items-center gap-2 underline decoration-[var(--border)] underline-offset-4 font-mono">
                                  01 Play Games Guidelines Details
                                </p>
                                <div className="text-xs text-[var(--text)] leading-relaxed space-y-3 font-normal">
                                  {item.details.map((p, pIdx) => (
                                    <p key={pIdx}>
                                      {item.link &&
                                      p.includes("branding guidelines") ? (
                                        <>
                                          To provide players with an end-to-end
                                          experience that is attractive and
                                          consistent, implement the{" "}
                                          <a
                                            href={item.link}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-indigo-400 hover:underline hover:text-indigo-300 font-semibold cursor-pointer text-xs"
                                            onClick={(e) => e.stopPropagation()}
                                          >
                                            Google Play Games Services branding
                                            guidelines
                                          </a>
                                          .
                                        </>
                                      ) : (
                                        p
                                      )}
                                    </p>
                                  ))}
                                </div>
                              </div>

                              {/* Test steps block with Split lines */}
                              <div className="space-y-3">
                                <p className="text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-widest flex items-center gap-2 underline decoration-[var(--border)] underline-offset-4 font-mono">
                                  02 Test steps
                                </p>
                                <ul className="space-y-2.5">
                                  {item.steps
                                    .split("\n")
                                    .map((l: string, i: number) => (
                                      <li
                                        key={i}
                                        className="flex gap-4 group/step"
                                      >
                                        <span className="text-[10px] font-mono text-[var(--text)] font-bold bg-[var(--bg)] w-5 h-5 rounded flex items-center justify-center shrink-0 border border-[var(--border)] shadow-sm">
                                          {i + 1}
                                        </span>
                                        <span className="text-sm text-[var(--text)] group-hover/step:text-[var(--text-highlight)] transition-colors leading-relaxed">
                                          {l}
                                        </span>
                                      </li>
                                    ))}
                                </ul>
                              </div>

                              {/* Expected criteria block */}
                              <div className="p-4 rounded-xl border border-emerald-500/20 dark:border-emerald-800/20 bg-emerald-500/5 shadow-sm">
                                <p className="text-[9px] font-bold text-emerald-500 dark:text-emerald-400 uppercase tracking-widest mb-1.5 flex items-center gap-2 font-mono">
                                  03 Expected result
                                </p>
                                <p className="text-xs text-[var(--text)] leading-relaxed font-semibold italic">
                                  {item.expected}
                                </p>
                              </div>

                              {item.id === "And-GPGS-ACH-6" && (
                                <div className="space-y-3">
                                  <p className="text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-widest flex items-center gap-2 underline decoration-[var(--border)] underline-offset-4 font-mono">
                                    05 Incremental Progress UI Example
                                  </p>
                                  <div className="rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--surface3)] max-w-sm shadow-md mt-2">
                                    <img
                                      src={gpgIncrementalImg}
                                      alt="Google Play Games Incremental Achievement UI Example Representation"
                                      className="w-full h-auto object-cover"
                                      referrerPolicy="no-referrer"
                                    />
                                    <div className="p-3 bg-[var(--surface2)]/50 border-t border-[var(--border)]">
                                      <p className="text-[11px] text-[var(--text-muted)] leading-relaxed font-medium">
                                        An elegant visual layout of an active
                                        incremental achievement showing
                                        high-contrast progress checkpoints,
                                        descriptive rewards, and live completion
                                        counts.
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {item.id === "And-GPGS-ACH-11" && (
                                <div className="space-y-3">
                                  <p className="text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-widest flex items-center gap-2 underline decoration-[var(--border)] underline-offset-4 font-mono">
                                    05 High-Difficulty Achievement UI Example
                                  </p>
                                  <div className="rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--surface3)] max-w-sm shadow-md mt-2">
                                    <img
                                      src={gpgDifficultyImg}
                                      alt="Google Play Games High-Difficulty Achievement Milestone Example Representation"
                                      className="w-full h-auto object-cover"
                                      referrerPolicy="no-referrer"
                                    />
                                    <div className="p-3 bg-[var(--surface2)]/50 border-t border-[var(--border)]">
                                      <p className="text-[11px] text-[var(--text-muted)] leading-relaxed font-medium">
                                        For example, the following screenshot
                                        shows a hard-to-earn achievement that
                                        helps to motivate and retain fans of the
                                        title.
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {item.id === "And-GPGS-FRND-4" && (
                                <div className="space-y-3">
                                  <p className="text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-widest flex items-center gap-2 underline decoration-[var(--border)] underline-offset-4 font-mono">
                                    05 Friends vs Non-Friends Icon Status
                                    Example
                                  </p>
                                  <div className="rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--surface3)] max-w-sm shadow-md mt-2">
                                    <img
                                      src={gpgFriendsIconsImg}
                                      alt="Google Play Games Services Friends vs Non-Friends Social Icon Status Indicators"
                                      className="w-full h-auto object-cover"
                                      referrerPolicy="no-referrer"
                                    />
                                    <div className="p-3 bg-[var(--surface2)]/50 border-t border-[var(--border)]">
                                      <p className="text-[11px] text-[var(--text-muted)] leading-relaxed font-medium">
                                        Use distinct icon badge variations next
                                        to users to represent confirmed
                                        reciprocity vs un-linked or unknown
                                        friend statuses.
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Notes block */}
                            <div className="md:col-span-2 space-y-4">
                              <div className="space-y-2">
                                <label className="text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-widest flex items-center gap-2 underline decoration-[var(--border)] underline-offset-4 font-mono">
                                  04 Observations & Notes
                                </label>
                                <textarea
                                  placeholder="Log runtime anomalies, device specifics or play credentials..."
                                  className="w-full bg-[var(--bg)]/40 border border-[var(--border)] rounded-xl p-3 text-xs text-[var(--text-highlight)] outline-none focus:border-[var(--text-muted)] transition-all resize-none min-h-[110px] font-mono leading-relaxed shadow-inner"
                                  value={executions[item.id]?.notes || ""}
                                  onChange={(e) => {
                                    setState((prev: any) => {
                                      const key = `${prev.platform}_${prev.activeId}`;
                                      const platExecs =
                                        prev.execsByPlatform[key] || {};
                                      return {
                                        ...prev,
                                        execsByPlatform: {
                                          ...prev.execsByPlatform,
                                          [key]: {
                                            ...platExecs,
                                            [item.id]: {
                                              ...(platExecs[item.id] || {
                                                status: "not_tested",
                                              }),
                                              notes: e.target.value,
                                            },
                                          },
                                        },
                                      };
                                    });
                                  }}
                                />
                              </div>
                              <button
                                onClick={() =>
                                  showToast("Observations committed to session")
                                }
                                className="w-full bg-[var(--text-highlight)] text-[var(--bg)] text-[10px] font-bold py-2 rounded-lg hover:opacity-90 transition-all shadow-md flex items-center justify-center gap-2 active:scale-[0.98]"
                              >
                                <Save size={12} /> Commit Notes
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

function TestCaseRow({
  tc,
  tcNumber,
  execution,
  setStatus,
  setState,
  showToast,
  isExpanded,
  onToggle,
  setDeleteConf,
}: any) {
  const status = execution?.status || "not_tested";

  return (
    <div
      className={`group rounded-xl border transition-all duration-300 ${isExpanded ? "bg-[var(--surface3)] border-[var(--text-muted)] shadow-2xl z-10" : "bg-[var(--surface)] border-[var(--border)] shadow-lg hover:border-[var(--text-muted)]"}`}
    >
      <div
        className="px-6 py-4 flex items-center gap-6 cursor-pointer select-none"
        onClick={onToggle}
      >
        <div
          className={`w-1.5 h-1.5 rounded-full flex-shrink-0 shadow-glow ${status === "pass" ? "bg-green-500" : status === "fail" ? "bg-red-500" : status === "not_applicable" ? "bg-orange-500" : "bg-[var(--surface3)]"}`}
        />
        <span className="text-[11px] font-mono text-[var(--text-muted)] w-8">
          {tcNumber}
        </span>

        <div className="flex-1 min-w-0 h-14 flex items-center pr-4">
          <div className="max-h-full overflow-y-auto pr-2 custom-scrollbar w-full py-1">
            {tc.type && (
              <div className="flex items-center gap-2 mb-1.5 animate-in fade-in zoom-in-95 duration-200">
                {tc.type === "required" ? (
                  <span className="text-[8px] font-mono font-bold uppercase tracking-widest bg-red-500/10 text-red-400 border border-red-500/30 py-0.5 px-2 rounded">
                    &bull; Required
                  </span>
                ) : (
                  <span className="text-[8px] font-mono font-bold uppercase tracking-widest bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 py-0.5 px-2 rounded">
                    &bull; Best Practice
                  </span>
                )}
              </div>
            )}
            <h3
              className={`text-sm font-medium leading-[1.4] whitespace-pre-wrap transition-colors ${status === "not_tested" ? "text-[var(--text-muted)] group-hover:text-[var(--text-highlight)]" : "text-[var(--text-highlight)]"}`}
            >
              {tc.title}
            </h3>
          </div>
        </div>

        <div
          className="flex gap-2 items-center"
          onClick={(e) => e.stopPropagation()}
        >
          <StatusBtn
            active={status === "pass"}
            onClick={() => setStatus(tc.id, "pass")}
            label="Pass"
            color="bg-green-500/10 text-green-500 border border-green-500/20"
            activeCls="bg-green-500 text-black border-green-500 shadow-glow-green"
          />
          <StatusBtn
            active={status === "fail"}
            onClick={() => setStatus(tc.id, "fail")}
            label="Fail"
            color="bg-red-500/10 text-red-500 border border-red-500/20"
            activeCls="bg-red-500 text-white border-red-500 shadow-glow-red"
          />
          <StatusBtn
            active={status === "not_applicable"}
            onClick={() => setStatus(tc.id, "not_applicable")}
            label="N/A"
            color="bg-orange-500/10 text-orange-500 border border-orange-500/20"
            activeCls="bg-orange-500 text-black border-orange-500 shadow-glow-orange"
          />
          <StatusBtn
            active={status === "not_tested"}
            onClick={() => setStatus(tc.id, "not_tested")}
            label="Not Tested"
            color="bg-[var(--bg)]/40 text-[var(--text-muted)] border border-transparent"
            activeCls="bg-[var(--text-highlight)] text-[var(--bg)] border-[var(--text-highlight)] shadow-glow"
          />

          {tc.id.startsWith("custom-") && (
            <button
              onClick={() => {
                if (setDeleteConf) {
                  setDeleteConf({
                    title: "Delete Custom Checkpoint",
                    message: `Are you sure you want to permanently delete custom checkpoint "${tc.title}"? This action cannot be undone.`,
                    confirmText: "Delete Checkpoint",
                    onConfirm: () => {
                      setState((prev: any) => ({
                        ...prev,
                        customTcs: (prev.customTcs || []).filter(
                          (t: any) => t.id !== tc.id,
                        ),
                      }));
                      showToast("Custom checkpoint deleted");
                    },
                  });
                } else {
                  setState((prev: any) => ({
                    ...prev,
                    customTcs: (prev.customTcs || []).filter(
                      (t: any) => t.id !== tc.id,
                    ),
                  }));
                  showToast("Custom checkpoint deleted");
                }
              }}
              className="p-1.5 rounded bg-transparent border border-transparent hover:border-red-500/20 hover:bg-red-500/10 text-[var(--text-muted)] hover:text-red-500 transition-all ml-1"
              title="Delete custom test case"
            >
              <Trash2 size={13} />
            </button>
          )}
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 90 : 0 }}
          className="text-[var(--text-muted)] group-hover:text-[var(--text-highlight)] transition-colors"
        >
          <ChevronRight size={16} />
        </motion.div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-[var(--border)] bg-[var(--surface2)]/70 dark:bg-black/25 overflow-hidden"
          >
            <div className="p-8 space-y-8 max-w-4xl mx-auto">
              <ButtonComplianceDemo tcId={tc.id} />
              {tc.id === "And-FTC-4.9" && <RuntimePermissionsDemo />}
              <div className="grid grid-cols-5 gap-12">
                <div className="col-span-3 space-y-6">
                  <div className="space-y-4">
                    {tc.policyText && (
                      <div className="mb-6">
                        <p className="text-[10px] font-bold text-[var(--text)] uppercase tracking-widest flex items-center gap-2 underline decoration-[var(--border)] underline-offset-4 mb-3">
                          Policy Details
                        </p>
                        <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--surface2)] shadow-inner space-y-4 text-[13px] leading-[1.6] text-[var(--text-highlight)] font-medium max-h-[300px] overflow-y-auto pr-4 custom-scrollbar">
                          {tc.policyText
                            .split("\n\n")
                            .map((paragraph: string, idx: number) => (
                              <p key={idx} className="whitespace-pre-wrap">
                                {paragraph}
                              </p>
                            ))}
                          {tc.imageUrl && (
                            <div className="mt-4 border-t border-[var(--border)] pt-4">
                              <p className="text-[10px] uppercase font-bold text-[var(--text-muted)] mb-3">
                                Example Violation
                              </p>
                              <img
                                src={tc.imageUrl}
                                alt="Violation Example"
                                className="rounded-lg border border-[var(--border)] max-w-full h-auto max-h-[300px] object-contain bg-[var(--surface)]"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    <p className="text-[10px] font-bold text-[var(--text)] uppercase tracking-widest flex items-center gap-2 underline decoration-[var(--border)] underline-offset-4">
                      01 Test steps
                    </p>
                    <ul className="space-y-3">
                      {tc.steps.split("\n").map((l: string, i: number) => (
                        <li key={i} className="flex gap-4 group/step">
                          <span className="text-[10px] font-mono text-[var(--text)] font-bold bg-[var(--bg)] w-5 h-5 rounded flex items-center justify-center shrink-0 border border-[var(--border)] shadow-sm">
                            {i + 1}
                          </span>
                          <span className="text-sm text-[var(--text)] group-hover/step:text-[var(--text-highlight)] transition-colors leading-relaxed">
                            {l.replace(/^\d+\.\s*/, "")}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-5 rounded-xl border border-emerald-300 dark:border-emerald-800/30 bg-emerald-100/40 dark:bg-emerald-950/30 shadow-sm">
                    <p className="text-[10px] font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-widest mb-2 flex items-center gap-2 font-mono">
                      02 Expected result
                    </p>
                    <p className="text-sm text-emerald-950 dark:text-emerald-100 font-semibold leading-relaxed italic">
                      {tc.expected}
                    </p>
                  </div>
                </div>
                <div className="col-span-2 space-y-6">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest flex items-center gap-2 underline decoration-[var(--border)] underline-offset-4">
                      03 Observations
                    </label>
                    <textarea
                      placeholder="Log runtime anomalies, device specifics or build artifacts..."
                      className="w-full bg-[var(--bg)]/40 border border-[var(--border)] rounded-xl p-4 text-sm text-[var(--text-highlight)] outline-none focus:border-[var(--text-muted)] transition-all resize-none min-h-[160px] font-mono leading-relaxed shadow-inner"
                      value={execution?.notes || ""}
                      onChange={(e) =>
                        setState((prev: AppState) => {
                          const key = `${prev.platform}_${prev.activeId}`;
                          const platExecs = prev.execsByPlatform[key] || {};
                          return {
                            ...prev,
                            execsByPlatform: {
                              ...prev.execsByPlatform,
                              [key]: {
                                ...platExecs,
                                [tc.id]: {
                                  ...(platExecs[tc.id] || {
                                    status: "not_tested",
                                  }),
                                  notes: e.target.value,
                                },
                              },
                            },
                          };
                        })
                      }
                    />
                  </div>
                  <button
                    onClick={() =>
                      showToast("Observations committed to session")
                    }
                    className="w-full bg-[var(--text-highlight)] text-[var(--bg)] text-xs font-bold py-3 rounded-lg hover:opacity-90 transition-all shadow-lg flex items-center justify-center gap-2 active:scale-[0.98]"
                  >
                    <Save size={14} /> Commit Notes
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function StatusBtn({ active, onClick, label, color, activeCls }: any) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded text-[10px] font-bold transition-all duration-300 tracking-tight ${active ? activeCls : `text-[var(--text-muted)] hover:text-[var(--text-highlight)] bg-[var(--bg)]/40 border border-[var(--border)]`}`}
    >
      {label}
    </button>
  );
}

function SummaryView({
  stats,
  risk,
  activeSession,
  executions,
  activeTcs,
  db,
  state,
}: any) {
  if (!activeSession)
    return (
      <div className="text-center py-20 text-[var(--text-muted)] italic">
        Initiate a session instance to generate summary data.
      </div>
    );

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <ExecutiveReportView
        stats={stats}
        risk={risk}
        activeSession={activeSession}
        executions={executions}
        activeTcs={activeTcs}
        db={db}
        state={state}
      />
    </div>
  );
}

function GuidelinesView({ state, setState, db, icons, showToast }: any) {
  const setImpact = (glId: string, val: string) => {
    setState((prev: AppState) => ({
      ...prev,
      impacts: {
        ...prev.impacts,
        [glId]: { ...prev.impacts[glId], [state.platform]: val as any },
      },
    }));
    showToast("Impact updated");
  };

  const handleRestore = (tcId: string) => {
    setState((prev: AppState) => ({
      ...prev,
      deletedTcs: prev.deletedTcs.filter((id) => id !== tcId),
    }));
    showToast("Test case restored");
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div>
        <h1 className="text-4xl font-light text-[var(--text-highlight)] mb-2 tracking-tight">
          Guidelines impact
        </h1>
        <p className="text-[var(--text-muted)] text-sm">
          First-party submission impact per compliance section
        </p>
      </div>

      <div className="grid gap-4">
        {db.guidelines.map((gl: Guideline) => {
          const imp =
            state.impacts[gl.id]?.[state.platform as "ios" | "android"] ||
            gl.impact;
          const removedCount = state.deletedTcs.filter(
            (id: string) => db.testCases.find((t) => t.id === id)?.gl === gl.id,
          ).length;

          return (
            <div
              key={gl.id}
              className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-8 hover:border-[var(--text-muted)] transition-all shadow-lg"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-[var(--bg)]/40 border border-[var(--border)] rounded-lg flex items-center justify-center text-2xl shadow-inner">
                    {icons[gl.title] || "📁"}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--text-highlight)] flex items-center gap-3 mb-1">
                      {gl.title}
                      {removedCount > 0 && (
                        <span className="text-[10px] font-bold bg-red-500/10 text-red-500 border border-red-500/20 px-2 py-0.5 rounded uppercase tracking-widest">
                          {removedCount} Stashed
                        </span>
                      )}
                    </h3>
                    <p className="text-sm text-[var(--text-muted)] max-w-xl leading-relaxed">
                      {gl.description}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-6 border-t border-[var(--border)]">
                <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-[0.2em]">
                  Submission Impact Level
                </p>
                <div className="flex gap-2 bg-[var(--bg)]/20 p-1.5 rounded-lg w-fit border border-[var(--border)]">
                  {["high", "medium", "low"].map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => setImpact(gl.id, lvl)}
                      className={`px-6 py-2 rounded text-[10px] font-bold transition-all uppercase tracking-widest ${imp === lvl ? (lvl === "high" ? "bg-red-500 text-white shadow-glow-red" : lvl === "medium" ? "bg-orange-500 text-black shadow-glow-orange" : "bg-green-500 text-black shadow-glow-green") : "text-[var(--text-muted)] hover:text-[var(--text-highlight)]"}`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              {removedCount > 0 && (
                <div className="mt-8 space-y-3">
                  <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-[0.2em]">
                    Stashed Test Cases
                  </p>
                  <div className="grid gap-2">
                    {state.deletedTcs
                      .filter(
                        (id: string) =>
                          db.testCases.find((t) => t.id === id)?.gl === gl.id,
                      )
                      .map((id: string) => {
                        const tc = db.testCases.find(
                          (t: TestCase) => t.id === id,
                        );
                        const num = getTestCaseNumber(tc, db.testCases);
                        return (
                          <div
                            key={id}
                            className="flex items-center justify-between py-3 px-4 bg-[var(--bg)]/20 border border-[var(--border)] rounded-lg text-xs group"
                          >
                            <span className="text-[var(--text-muted)] group-hover:text-[var(--text-highlight)] transition-colors font-mono">
                              #{num} &middot; {tc?.title}
                            </span>
                            <button
                              onClick={() => handleRestore(id)}
                              className="text-[var(--text-highlight)] font-bold flex items-center gap-2 hover:underline tracking-tighter"
                            >
                              <Undo2 size={12} /> RESTORE TEST CASE
                            </button>
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
