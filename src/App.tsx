import React, { useState, useEffect, useMemo, useCallback } from 'react';
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
  Sun
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ALL_DATA, IOS_ICONS, AND_ICONS } from './data';
import { AppState, Session, TestCase, ExecutionMap, Guideline } from './types';

const INITIAL_STATE: AppState = {
  sessions: [],
  activeId: null,
  execsByPlatform: {},
  impacts: {},
  customSteps: {},
  deletedTcs: [],
  theme: 'dark',
  platform: 'ios',
  catOrder: {},
  catOrderAndroid: {}
};

const getTestCaseNumber = (tc: TestCase | undefined, dbTestCases: TestCase[]) => {
  if (!tc) return 1;
  const originalSectionTcs = dbTestCases.filter(
    (t: TestCase) => t.gl === tc.gl && t.originalRef === tc.originalRef
  );
  const stableIdx = originalSectionTcs.findIndex((t: TestCase) => t.id === tc.id);
  return stableIdx >= 0 ? stableIdx + 1 : 1;
};

export default function App() {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem('compliance-hub-state');
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

  const [activePage, setActivePage] = useState('dashboard');
  const [expandedTc, setExpandedTc] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [catFilter, setCatF] = useState('');
  const [statusFilter, setStsF] = useState('');
  const [toast, setToast] = useState<{ msg: string; show: boolean }>({ msg: '', show: false });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Persistence
  useEffect(() => {
    localStorage.setItem('compliance-hub-state', JSON.stringify(state));
    // Apply styling classes to body
    document.body.className = state.platform === 'android' ? 'android-mode' : '';
    document.body.setAttribute('data-theme', state.theme);
  }, [state]);

  const showToast = useCallback((msg: string) => {
    setToast({ msg, show: true });
    setTimeout(() => setToast(prev => ({ ...prev, show: false })), 2200);
  }, []);

  // Derived Data
  const currentPlatform = state.platform;
  const db = ALL_DATA[currentPlatform];
  const icons = currentPlatform === 'ios' ? IOS_ICONS : AND_ICONS;

  const activeExecKey = `${currentPlatform}_${state.activeId}`;
  const executions: ExecutionMap = state.execsByPlatform[activeExecKey] || {};

  const activeTcs = useMemo(() => {
    const combined = [...db.testCases, ...(state.customTcs || [])];
    return combined.filter(tc => !state.deletedTcs.includes(tc.id));
  }, [db.testCases, state.customTcs, state.deletedTcs]);

  const stats = useMemo(() => {
    let p = 0, f = 0, n = 0;
    activeTcs.forEach(tc => {
      const st = (executions[tc.id] || {}).status || 'not_tested';
      if (st === 'pass') p++;
      else if (st === 'fail') f++;
      else if (st === 'not_applicable') n++;
    });
    const tot = activeTcs.length;
    return { pass: p, fail: f, na: n, nt: tot - p - f - n, total: tot };
  }, [activeTcs, executions]);

  const risk = useMemo(() => {
    const impMap: Record<string, string> = {};
      db.guidelines.forEach(g => {
        impMap[g.id] = (state.impacts[g.id]?.[state.platform as 'ios' | 'android']) || g.impact;
      });

    let score = 0;
    activeTcs.forEach(tc => {
      if (executions[tc.id]?.status === 'fail') {
        const imp = impMap[tc.gl] || 'medium';
        const pts = { high: 5, medium: 3, low: 1 }[imp] || 3;
        score += pts;
      }
    });

    if (score <= 5) return { score, cls: 'pass', label: 'Safe to Submit', icon: '✅' };
    if (score <= 15) return { score, cls: 'warn', label: 'At Risk', icon: '⚠️' };
    return { score, cls: 'fail', label: 'Do Not Submit', icon: '🔴' };
  }, [db.guidelines, activeTcs, executions, state.impacts]);

  // Actions
  const switchPlatform = (p: 'ios' | 'android') => {
    setState(prev => ({ ...prev, platform: p }));
    showToast(`Switched to ${p === 'ios' ? 'iOS' : 'Android'}`);
  };

  const setStatus = (tcId: string, status: AppState['execsByPlatform'][string][string]['status']) => {
    if (!state.activeId) return;
    setState(prev => {
      const key = `${prev.platform}_${prev.activeId}`;
      const platExecs = prev.execsByPlatform[key] || {};
      const currentStatus = platExecs[tcId]?.status || 'not_tested';
      
      // If clicking same status, toggle back to not_tested
      const finalStatus = currentStatus === status ? 'not_tested' : status;

      return {
        ...prev,
        execsByPlatform: {
          ...prev.execsByPlatform,
          [key]: {
            ...platExecs,
            [tcId]: { ...(platExecs[tcId] || { notes: '' }), status: finalStatus }
          }
        }
      };
    });
  };

  const bulkSetStatus = (tcIds: string[], status: AppState['execsByPlatform'][string][string]['status']) => {
    if (!state.activeId) return;
    setState(prev => {
      const key = `${prev.platform}_${prev.activeId}`;
      const platExecs = { ...(prev.execsByPlatform[key] || {}) };
      
      // Determine if every selected TC already has this status (for toggling)
      const allAlreadyHaveStatus = tcIds.every(id => (platExecs[id]?.status || 'not_tested') === status);
      const finalStatus = allAlreadyHaveStatus ? 'not_tested' : status;

      tcIds.forEach(id => {
        platExecs[id] = { ...(platExecs[id] || { notes: '' }), status: finalStatus };
      });

      return {
        ...prev,
        execsByPlatform: {
          ...prev.execsByPlatform,
          [key]: platExecs
        }
      };
    });
    showToast(`Bulk updated ${tcIds.length} items`);
  };

  const createSession = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const ver = formData.get('version') as string;
    if (!ver) return;

    const newSess: Session = {
      id: 's' + Date.now(),
      version: ver,
      build: formData.get('build') as string || '',
      tester: formData.get('tester') as string || 'QA',
      desc: formData.get('desc') as string || '',
      created: new Date().toISOString(),
    };

    setState(prev => ({
      ...prev,
      sessions: [newSess, ...prev.sessions],
      activeId: newSess.id
    }));
    setIsModalOpen(false);
    showToast(`Session created: ${ver}`);
  };

  const deleteSession = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (!confirm('Delete this session and all results?')) return;
    setState(prev => {
      const newSess = prev.sessions.filter(s => s.id !== id);
      const newActive = prev.activeId === id ? (newSess[0]?.id || null) : prev.activeId;
      const newExecs = { ...prev.execsByPlatform };
      Object.keys(newExecs).forEach(k => { if (k.includes(id)) delete newExecs[k]; });
      return { ...prev, sessions: newSess, activeId: newActive, execsByPlatform: newExecs };
    });
    showToast('Session deleted');
  };

  const toggleTheme = () => {
    setState(prev => ({ ...prev, theme: prev.theme === 'dark' ? 'light' : 'dark' }));
  };

  const activeSession = state.sessions.find(s => s.id === state.activeId);

  return (
    <div className="flex min-h-screen transition-colors duration-300" style={{ color: 'var(--text)', backgroundColor: 'var(--bg)' }}>
      <div className="bg-mesh opacity-10 dark:opacity-15">
        <div className="bg-orb orb1 opacity-20 dark:opacity-100" />
        <div className="bg-orb orb2 opacity-20 dark:opacity-100" />
        <div className="bg-orb orb3 opacity-20 dark:opacity-100" />
        <div className="bg-orb orb4 opacity-20 dark:opacity-100" />
      </div>

      {/* Sidebar */}
      <nav className="w-80 flex-shrink-0 bg-[var(--surface)] border-r border-[var(--border)] fixed h-screen flex flex-col z-[100] transition-colors duration-300">
        <div className="h-16 px-6 border-b border-[var(--border)] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[var(--text-highlight)] rounded flex items-center justify-center">
              <Package size={20} className="text-[var(--bg)]" />
            </div>
            <span className="font-semibold text-[var(--text-highlight)] tracking-tight">Compliance Hub</span>
          </div>
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-[var(--surface2)] border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text-highlight)] transition-all"
          >
            {state.theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>

        <div className="p-4 flex gap-1 bg-[var(--accent-dim)] rounded-lg mx-4 my-4 border border-[var(--border)]">
          <button 
            onClick={() => switchPlatform('ios')}
            className={`flex-1 flex items-center justify-center gap-2 py-1.5 rounded text-xs font-medium transition-all ${state.platform === 'ios' ? 'bg-[var(--text-highlight)] text-[var(--bg)] shadow-sm' : 'text-[var(--text-muted)] hover:text-[var(--text-highlight)]'}`}
          >
            🍎 iOS
          </button>
          <button 
            onClick={() => switchPlatform('android')}
            className={`flex-1 flex items-center justify-center gap-2 py-1.5 rounded text-xs font-medium transition-all ${state.platform === 'android' ? 'bg-[var(--text-highlight)] text-[var(--bg)] shadow-sm' : 'text-[var(--text-muted)] hover:text-[var(--text-highlight)]'}`}
          >
            🤖 Android
          </button>
        </div>

        <div className="p-6 border-b border-[var(--border)]">
          <h3 className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-widest mb-4">Workspace</h3>
          <div className="space-y-1">
            <SidebarItem active={activePage === 'dashboard'} onClick={() => setActivePage('dashboard')} icon={<LayoutDashboard size={14} />} label="Dashboard" />
            <SidebarItem active={activePage === 'sessions'} onClick={() => setActivePage('sessions')} icon={<Package size={14} />} label="Sessions" />
          </div>
        </div>

        <div className="p-6 border-b border-[var(--border)] flex-1 overflow-hidden flex flex-col">
          <h3 className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-widest mb-4">Testing</h3>
          <div className="space-y-1">
            <SidebarItem active={activePage === 'execute'} onClick={() => setActivePage('execute')} icon={<Play size={14} />} label="Test Execution" />
            <SidebarItem active={activePage === 'summary'} onClick={() => setActivePage('summary')} icon={<BarChart3 size={14} />} label="Summary" />
          </div>
          
          <div className="mt-8">
            <h3 className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-widest mb-4">System</h3>
            <SidebarItem active={activePage === 'guidelines'} onClick={() => setActivePage('guidelines')} icon={<Settings size={14} />} label="Guidelines" />
          </div>
        </div>

        <div className="p-6 bg-[var(--bg)]/10 border-t border-[var(--border)]">
          <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest mb-2">Active Session</p>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${activeSession ? 'bg-green-500' : 'bg-[var(--surface3)]'}`} />
            <p className="text-sm text-[var(--text-highlight)] tracking-tight leading-none truncate">
              {activeSession ? activeSession.version : 'None Selected'}
            </p>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="ml-80 flex-1 flex flex-col min-h-screen relative overflow-hidden transition-colors duration-300">
        {/* Top Navbar */}
        <nav className="h-16 border-b border-[var(--border)] bg-[var(--surface)] flex items-center justify-between px-8 shrink-0 transition-colors duration-300">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-widest">Platform</span>
            <span className="text-sm text-[var(--text-highlight)]">{state.platform === 'ios' ? 'ios-production' : 'android-main'}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-[11px] font-bold text-green-500 uppercase tracking-wider">Live Preview</span>
            </div>
          </div>
        </nav>

        {/* Content Section */}
        <main className="flex-1 p-10 overflow-y-auto page-transition max-w-6xl mx-auto w-full">
        {activePage === 'dashboard' && <DashboardView stats={stats} risk={risk} activeSession={activeSession} onNewSess={() => setIsModalOpen(true)} onGoToTest={() => setActivePage('execute')} />}
        {activePage === 'sessions' && <SessionsView sessions={state.sessions} activeId={state.activeId} onSelect={id => setState(p => ({ ...p, activeId: id }))} onDelete={deleteSession} onNewSess={() => setIsModalOpen(true)} />}
        {activePage === 'execute' && <ExecuteView state={state} setState={setState} db={db} activeTcs={activeTcs} executions={executions} setStatus={setStatus} bulkSetStatus={bulkSetStatus} expandedTc={expandedTc} setExpandedTc={setExpandedTc} showToast={showToast} icons={icons} />}
        {activePage === 'summary' && <SummaryView stats={stats} risk={risk} activeSession={activeSession} executions={executions} activeTcs={activeTcs} db={db} state={state} />}
        {activePage === 'guidelines' && <GuidelinesView state={state} setState={setState} db={db} icons={icons} showToast={showToast} />}
      </main>
      </div>

      {/* Modal & Toast */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[1000] flex items-center justify-center p-4">
          <motion.form initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} onSubmit={createSession} className="bg-[var(--surface)] border border-[var(--border2)] rounded-[18px] p-6 w-full max-w-md shadow-2xl">
            <h2 className="text-lg font-bold mb-1">New Build Session</h2>
            <p className="text-sm text-[var(--text2)] mb-5">Create a tracking session for a specific build version.</p>
            
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-[var(--text3)] uppercase">Build Version *</label>
                <input name="version" required autoFocus placeholder="e.g. 2.4.1 (build 103)" className="w-full bg-[var(--surface2)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm outline-none focus:border-[var(--accent)] transition-colors" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[var(--text3)] uppercase">Build No.</label>
                  <input name="build" placeholder="103" className="w-full bg-[var(--surface2)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm outline-none focus:border-[var(--accent)] transition-colors" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[var(--text3)] uppercase">Tester</label>
                  <input name="tester" defaultValue="QA" className="w-full bg-[var(--surface2)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm outline-none focus:border-[var(--accent)] transition-colors" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-[var(--text3)] uppercase">Internal Note</label>
                <input name="desc" placeholder="e.g. Sprint 14 Release Candidate" className="w-full bg-[var(--surface2)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm outline-none focus:border-[var(--accent)] transition-colors" />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-lg text-sm font-medium text-[var(--text2)] hover:bg-[var(--surface2)] transition-colors">Cancel</button>
              <button type="submit" className="bg-[var(--accent)] text-white px-5 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-all shadow-lg active:scale-95">Create Session</button>
            </div>
          </motion.form>
        </div>
      )}

      {/* Toast Notification */}
      <AnimatePresence>
        {toast.show && (
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} className="fixed bottom-6 right-6 bg-[var(--surface2)] border border-[var(--border2)] px-4 py-2.5 rounded-xl shadow-xl z-[9999] flex items-center gap-3">
             <div className="w-5 h-5 rounded-full bg-[var(--accent-dim)] flex items-center justify-center text-[var(--accent)]"><Check size={12} strokeWidth={3} /></div>
             <span className="text-sm font-medium">{toast.msg}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SidebarItem({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2 rounded text-sm transition-all ${active ? 'bg-[var(--text-highlight)] text-[var(--bg)] font-semibold' : 'text-[var(--text-muted)] hover:text-[var(--text-highlight)]'}`}
    >
      <span className={active ? 'text-[var(--bg)]' : 'text-[var(--text-muted)] opacity-60'}>{icon}</span>
      {label}
    </button>
  );
}

function DashboardView({ stats, risk, activeSession, onNewSess, onGoToTest }: any) {
  if (!activeSession) {
    return (
      <div className="flex-1 bg-[var(--surface)] rounded-xl border border-[var(--border)] shadow-2xl p-12 flex flex-col items-center justify-center">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 bg-[var(--text-highlight)]/5 border border-[var(--text-highlight)]/10 rounded-2xl mx-auto mb-6 flex items-center justify-center text-[var(--text-highlight)]">
            <Package size={32} />
          </div>
          <h1 className="text-3xl font-light text-[var(--text-highlight)] mb-3 tracking-tight">Compliance Tracking</h1>
          <p className="text-[var(--text-muted)] text-sm mb-8 leading-relaxed italic">Your real-time compliance environment is not active. Create a build session to synchronize results and functional status.</p>
          <button onClick={onNewSess} className="px-6 py-2 bg-[var(--text-highlight)] text-[var(--bg)] text-sm font-medium rounded hover:opacity-90 transition-all shadow-lg active:scale-95">+ Start New Session</button>
        </div>
      </div>
    );
  }

  const completionPct = stats.total ? Math.round((stats.pass + stats.fail + stats.na) / stats.total * 100) : 0;

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-light text-[var(--text-highlight)] mb-2 tracking-tight">System Overview</h1>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${risk.cls === 'pass' ? 'bg-green-500' : 'bg-orange-500'}`} />
            <span className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-widest">{risk.label} &middot; Score {risk.score}</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest mb-1">Last Update</p>
          <p className="text-xs text-[var(--text-highlight)]">{new Date(activeSession.created).toLocaleTimeString()} Today</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <StatCard label="Total Items" val={stats.total} />
        <StatCard label="Clearance" val={stats.pass} color="#22c55e" />
        <StatCard label="Violations" val={stats.fail} color="#ef4444" />
        <StatCard label="Pending" val={stats.nt} />
      </div>

      <div className="bg-[var(--surface)] rounded-xl border border-[var(--border)] shadow-xl p-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-widest">Build Deployment Integrity</h3>
          <span className="text-sm font-mono text-[var(--text-highlight)]">{completionPct}%</span>
        </div>
        <div className="h-1.5 bg-[var(--bg)]/40 rounded-full overflow-hidden flex border border-[var(--border)]/50">
          <motion.div initial={{ width: 0 }} animate={{ width: `${(stats.pass/stats.total)*100}%` }} className="bg-[var(--text-highlight)] h-full" />
          <motion.div initial={{ width: 0 }} animate={{ width: `${(stats.fail/stats.total)*100}%` }} className="bg-red-500/80 h-full" />
          <motion.div initial={{ width: 0 }} animate={{ width: `${(stats.na/stats.total)*100}%` }} className="bg-[var(--text-muted)] h-full" />
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-[var(--bg)]/20 border border-[var(--border)]">
            <p className="text-[10px] uppercase tracking-wider text-[var(--text-muted)] mb-1">Active Version</p>
            <p className="text-xl font-medium text-[var(--text-highlight)]">{activeSession.version}</p>
          </div>
          <div className="p-4 rounded-lg bg-[var(--bg)]/20 border border-[var(--border)]">
            <p className="text-[10px] uppercase tracking-wider text-[var(--text-muted)] mb-1">Lead Tester</p>
            <p className="text-xl font-medium text-[var(--text-highlight)]">{activeSession.tester}</p>
          </div>
        </div>
        <div className="mt-8 flex gap-3">
          <button onClick={onGoToTest} className="px-5 py-2 bg-[var(--text-highlight)] text-[var(--bg)] text-sm font-medium rounded hover:opacity-90 transition-all shadow-lg active:scale-95">Open Workbench &rarr;</button>
          <button className="px-5 py-2 bg-transparent text-[var(--text-muted)] border border-[var(--border)] text-sm font-medium rounded hover:bg-[var(--surface2)] hover:text-[var(--text-highlight)] transition-all">View Details</button>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, val, color }: any) {
  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6 shadow-sm hover:border-[var(--text-muted)] transition-colors">
      <div className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest mb-2">{label}</div>
      <div className="text-3xl font-medium text-[var(--text-highlight)]" style={{ color: color }}>{val}</div>
    </div>
  );
}

function SessionsView({ sessions, activeId, onSelect, onDelete, onNewSess }: any) {
  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-light text-[var(--text-highlight)] mb-2 tracking-tight">Build Sessions</h1>
          <p className="text-[var(--text-muted)] text-sm italic">Historical archive of compliance deployment phases</p>
        </div>
        <button onClick={onNewSess} className="px-5 py-2 bg-[var(--text-highlight)] text-[var(--bg)] text-sm font-medium rounded hover:opacity-90 transition-all shadow-lg">+ New Session</button>
      </div>

      <div className="grid gap-4">
        {sessions.length === 0 ? (
          <div className="py-20 text-center text-[var(--text-muted)] border border-dashed border-[var(--border)] rounded-2xl bg-[var(--surface)]/10">No sessions recorded yet.</div>
        ) : sessions.map((s: Session) => (
          <div 
            key={s.id} 
            onClick={() => onSelect(s.id)}
            className={`group relative flex items-center justify-between p-6 rounded-xl border transition-all cursor-pointer ${s.id === activeId ? 'bg-[var(--text-highlight)] border-[var(--text-highlight)] text-[var(--bg)]' : 'bg-[var(--surface)] border-[var(--border)] hover:border-[var(--text-muted)] text-[var(--text-highlight)]'}`}
          >
            <div className="flex items-center gap-6">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${s.id === activeId ? 'bg-[var(--bg)] text-[var(--text-highlight)]' : 'bg-[var(--surface2)] text-[var(--text-muted)]'}`}>
                <Package size={24} />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-semibold text-lg tracking-tight">{s.version}</h3>
                  {s.id === activeId && <span className="text-[10px] font-bold bg-[var(--bg)] text-[var(--text-highlight)] px-2 py-0.5 rounded uppercase tracking-widest">Active</span>}
                </div>
                <p className={`text-xs ${s.id === activeId ? 'text-[var(--bg)]/60' : 'text-[var(--text-muted)]'} font-mono`}>{s.tester} &middot; Build {s.build || 'N/A'} &middot; {new Date(s.created).toLocaleDateString()}</p>
              </div>
            </div>
            <button onClick={(e) => onDelete(e, s.id)} className={`p-2 transition-all ${s.id === activeId ? 'text-[var(--bg)]/40 hover:text-red-600' : 'text-[var(--text-muted)] hover:text-red-400'}`}>
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExecuteView({ state, setState, db, activeTcs, executions, setStatus, bulkSetStatus, expandedTc, setExpandedTc, showToast, icons }: any) {
  const [filterQuery, setFilterQuery] = useState('');
  const [activeSectionId, setActiveSectionId] = useState('all');
  
  // Custom Node form states
  const [showAddForm, setShowAddForm] = useState(false);
  const [newRef, setNewRef] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newSteps, setNewSteps] = useState('');
  const [newExpected, setNewExpected] = useState('');
  const [newOriginalRef, setNewOriginalRef] = useState('');

  const filtered = activeTcs.filter((tc: TestCase) => {
    if (activeSectionId !== 'all' && tc.gl !== activeSectionId) return false;
    const num = getTestCaseNumber(tc, db.testCases);
    const text = (tc.title + tc.ref + " " + num).toLowerCase();
    return text.includes(filterQuery.toLowerCase());
  });

  // Grouping logic for "guideline bundles" with full Section > Header hierarchy
  const grouped = useMemo(() => {
    const sectionMap: Record<string, { guideline: Guideline; bundles: { header: string; tcs: TestCase[] }[] }> = {};
    
    filtered.forEach((tc: TestCase) => {
      const glId = tc.gl;
      if (!sectionMap[glId]) {
        const guideline = db.guidelines.find(g => g.id === glId);
        if (guideline) {
          sectionMap[glId] = { guideline, bundles: [] };
        } else {
          sectionMap[glId] = { 
            guideline: { id: glId, title: "Section", description: "", category: "", impact: "medium" }, 
            bundles: [] 
          };
        }
      }

      const bundles = sectionMap[glId].bundles;
      const tcHeader = tc.originalRef || 'General';
      
      let bundle = bundles.find(b => b.header === tcHeader);
      if (!bundle) {
        bundle = { header: tcHeader, tcs: [] };
        bundles.push(bundle);
      }
      bundle.tcs.push(tc);
    });

    return Object.values(sectionMap);
  }, [filtered, db.guidelines]);

  const handleCreateNode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const targetGl = activeSectionId === 'all' ? (db.guidelines[0]?.id || 'GL-001') : activeSectionId;
    const newTc: TestCase = {
      id: 'custom-' + Date.now(),
      gl: targetGl,
      ref: newRef.trim() || '1.0',
      title: newTitle.trim(),
      steps: newSteps.trim() || '1. Run manual policy validation checks.\n2. Confirm target complies with standard rules.',
      expected: newExpected.trim() || 'No policy or security failures detected during evaluation.',
      originalRef: newOriginalRef.trim() || (db.guidelines.find(g => g.id === targetGl)?.title || 'General')
    };

    setState((prev: any) => ({
      ...prev,
      customTcs: [...(prev.customTcs || []), newTc]
    }));

    // Clear form fields
    setNewRef('');
    setNewTitle('');
    setNewSteps('');
    setNewExpected('');
    setNewOriginalRef('');
    setShowAddForm(false);
    showToast('Custom compliance checkpoint created successfully.');
  };

  const activeGlObject = db.guidelines.find((g: any) => g.id === activeSectionId);

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-light text-[var(--text-highlight)] mb-2 tracking-tight">Workbench</h1>
          <p className="text-[var(--text-muted)] text-sm">Interactive compliance verification engine &bull; Excel workbook-style tabs</p>
        </div>
        <div className="text-right">
           <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest mb-1">Complexity</p>
           <p className="text-xs text-[var(--text-highlight)] font-mono">{filtered.length} active nodes</p>
        </div>
      </div>

      {/* Spreadsheet / Excel Sheet Tabs */}
      <div className="flex items-end border-b border-[var(--border)] overflow-x-auto scrollbar-none pt-2 -mb-2 gap-1 select-none">
        <button
          onClick={() => {
            setActiveSectionId('all');
            setShowAddForm(false);
          }}
          className={`px-4 py-2 text-xs font-mono tracking-tight border-t border-x rounded-t transition-all flex items-center gap-2 -mb-[1px] ${
            activeSectionId === 'all'
              ? 'bg-[var(--surface)] text-[var(--text-highlight)] font-bold border-[var(--border)] border-b-[var(--surface)] z-10'
              : 'bg-transparent text-[var(--text-muted)] border-transparent hover:text-[var(--text-highlight)] hover:bg-[var(--surface2)]/50'
          }`}
          style={{ borderBottomColor: activeSectionId === 'all' ? 'var(--surface)' : undefined }}
        >
          <span>📋</span>
          <span>All Guidelines</span>
        </button>
        {db.guidelines.map((gl: any) => {
          const glIcon = icons[gl.title] || '📄';
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
                  ? 'bg-[var(--surface)] text-[var(--text-highlight)] font-bold border-[var(--border)] border-b-[var(--surface)] z-10'
                  : 'bg-transparent text-[var(--text-muted)] border-transparent hover:text-[var(--text-highlight)] hover:bg-[var(--surface2)]/50'
              }`}
              style={{ borderBottomColor: isActive ? 'var(--surface)' : undefined }}
            >
              <span>{glIcon}</span>
              <span>{gl.title}</span>
            </button>
          );
        })}
      </div>

      {/* Manual Custom Node Builder panel (rendered conditionally or inline) */}
      {showAddForm && (
        <form onSubmit={handleCreateNode} className="space-y-4 bg-[var(--surface)] border border-[var(--border2)] p-6 rounded-xl animate-in slide-in-from-top-4 duration-300">
          <div className="flex justify-between items-center pb-2 border-b border-[var(--border)]">
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[var(--text-highlight)]">
              Manual Node Builder &rarr; {activeSectionId === 'all' ? 'Compliance' : (activeGlObject?.title || 'Section')}
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
              <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1">Index / Ref Code</label>
              <input 
                placeholder="e.g. 5.1.1" 
                value={newRef}
                onChange={e => setNewRef(e.target.value)}
                className="w-full bg-[var(--bg)]/50 border border-[var(--border)] rounded px-3 py-1.5 text-xs text-[var(--text-highlight)] outline-none focus:border-[var(--text-muted)]"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1">Sub-Category Grouping (originalRef)</label>
              <input 
                placeholder="e.g. Camera & Media, VPN Apps, MDM" 
                value={newOriginalRef}
                onChange={e => setNewOriginalRef(e.target.value)}
                className="w-full bg-[var(--bg)]/50 border border-[var(--border)] rounded px-3 py-1.5 text-xs text-[var(--text-highlight)] outline-none focus:border-[var(--text-muted)]"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1">Guideline Title / Core Rule Description *</label>
            <input 
              required
              placeholder="e.g. Sweepstakes and contests must be sponsored by the developer" 
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              className="w-full bg-[var(--bg)]/50 border border-[var(--border)] rounded px-3 py-1.5 text-xs text-[var(--text-highlight)] outline-none focus:border-[var(--text-muted)]"
            />
          </div>
          
          <div>
            <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1">Manual Evaluation Steps (one workflow per line)</label>
            <textarea 
              rows={3}
              placeholder="1. Open App interface and review contest rules.&#10;2. Confirm Apple is declared not to be involved." 
              value={newSteps}
              onChange={e => setNewSteps(e.target.value)}
              className="w-full bg-[var(--bg)]/50 border border-[var(--border)] rounded p-3 text-xs text-[var(--text-highlight)] outline-none focus:border-[var(--text-muted)] font-mono resize-none leading-relaxed"
            />
          </div>
          
          <div>
            <label className="block text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1">Deterministic Expected Result Outcome</label>
            <input 
              placeholder="e.g. Disclaimers are clearly visible; Apple is completely separated from sponsorship labels." 
              value={newExpected}
              onChange={e => setNewExpected(e.target.value)}
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
              <Plus size={11} strokeWidth={3} /> Add Manual Node
            </button>
          </div>
        </form>
      )}

      {/* Control Filters */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-1 flex items-center gap-3 shadow-inner shadow-black/20">
        <input 
          placeholder={`Filter ${activeSectionId === 'all' ? 'all guidelines' : (activeGlObject?.title || 'current')} nodes by identifier or keyword...`}
          className="flex-1 bg-transparent border-none outline-none px-3 py-1.5 text-xs text-[var(--text-highlight)] placeholder:text-[var(--text-muted)]"
          value={filterQuery}
          onChange={e => setFilterQuery(e.target.value)}
        />
        <div className="px-3 border-l border-[var(--border)] text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-widest flex items-center gap-3">
          <span>{filtered.length} total</span>
          <button 
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-1 px-2 py-0.5 bg-[var(--surface2)] hover:bg-[var(--surface3)] border border-[var(--border)] text-[8px] font-bold uppercase text-[var(--text-highlight)] rounded transition-all"
          >
            <Plus size={9} strokeWidth={2.5} /> {showAddForm ? 'Hide Builder' : 'Create Node'}
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
              <h2 className="text-lg font-mono text-[var(--text-highlight)] uppercase tracking-wider mb-2">No Compliance Nodes Found</h2>
              <p className="text-sm text-[var(--text-muted)] italic leading-relaxed">
                The "{activeSectionId === 'all' ? 'All' : (activeGlObject?.title || activeSectionId)}" section does not have any active compliance check nodes recorded. 
              </p>
              <p className="text-xs text-[var(--text-muted)] mt-2">
                Click "Build Nodes Manually" to open the interactive builder and specify your checklist rules directly in the app!
              </p>
            </div>
            <button 
              onClick={() => setShowAddForm(true)}
              className="px-4 py-2 bg-[var(--text-highlight)] text-[var(--bg)] text-xs font-bold rounded hover:opacity-90 transition-all shadow-md inline-flex items-center gap-1"
            >
              <Plus size={12} strokeWidth={3} /> Build Nodes Manually
            </button>
          </div>
        ) : (
          grouped.map((section, sIdx) => (
            <div key={sIdx} className="space-y-12">
              {/* Section Name */}
              <div className="relative">
                <div className="flex items-baseline gap-4 mb-2">
                  <span className="text-[10px] font-mono text-[var(--text-muted)]">Section</span>
                  <h2 className="text-2xl font-light text-[var(--text-highlight)] uppercase tracking-[0.2em]">{section.guideline.title}</h2>
                </div>
                <div className="h-[2px] w-24 bg-[var(--text-highlight)]" />
              </div>

              <div className="space-y-12 ml-4">
                {section.bundles.map((bundle, bIdx) => (
                  <div key={bIdx} className="space-y-6">
                    {/* Section Header */}
                    {bundle.header && (
                      <div className="flex items-center gap-4 group/header">
                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--text-muted)]" />
                        <h3 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-[0.2em]">{bundle.header}</h3>
                        <div className="h-px bg-[var(--surface2)] flex-1" />
                        <div className="flex gap-2">
                          <button 
                            onClick={() => bulkSetStatus(bundle.tcs.map((t: TestCase) => t.id), 'pass')}
                            className="px-3 py-1 rounded text-[9px] font-bold uppercase tracking-tighter bg-green-500/10 text-green-500 border border-green-500/20 hover:bg-green-500 hover:text-black transition-all"
                          >
                            Bulk Pass
                          </button>
                          <button 
                            onClick={() => bulkSetStatus(bundle.tcs.map((t: TestCase) => t.id), 'not_applicable')}
                            className="px-3 py-1 rounded text-[9px] font-bold uppercase tracking-tighter bg-orange-500/10 text-orange-500 border border-orange-500/20 hover:bg-orange-500 hover:text-black transition-all"
                          >
                            Bulk N/A
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="space-y-3">
                      {bundle.tcs.map((tc: TestCase) => {
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
                            onToggle={() => setExpandedTc(expandedTc === tc.id ? null : tc.id)}
                          />
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function TestCaseRow({ tc, tcNumber, execution, setStatus, setState, showToast, isExpanded, onToggle }: any) {
  const status = execution?.status || 'not_tested';
  
  return (
    <div className={`group rounded-xl border transition-all duration-300 ${isExpanded ? 'bg-[var(--surface3)] border-[var(--text-muted)] shadow-2xl z-10' : 'bg-[var(--surface)] border-[var(--border)] shadow-lg hover:border-[var(--text-muted)]'}`}>
      <div 
        className="px-6 py-4 flex items-center gap-6 cursor-pointer select-none"
        onClick={onToggle}
      >
        <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 shadow-glow ${status === 'pass' ? 'bg-green-500' : status === 'fail' ? 'bg-red-500' : status === 'not_applicable' ? 'bg-orange-500' : 'bg-[var(--surface3)]'}`} />
        <span className="text-[11px] font-mono text-[var(--text-muted)] w-8">{tcNumber}</span>
        
        <div className="flex-1 min-w-0 h-14 flex items-center pr-4">
          <div className="max-h-full overflow-y-auto pr-2 custom-scrollbar w-full py-1">
            <h3 className={`text-sm font-medium leading-[1.4] whitespace-pre-wrap transition-colors ${status === 'not_tested' ? 'text-[var(--text-muted)] group-hover:text-[var(--text-highlight)]' : 'text-[var(--text-highlight)]'}`}>
              {tc.title}
            </h3>
          </div>
        </div>
        
        <div className="flex gap-2 items-center" onClick={e => e.stopPropagation()}>
          <StatusBtn active={status === 'pass'} onClick={() => setStatus(tc.id, 'pass')} label="Pass" color="bg-green-500/10 text-green-500 border border-green-500/20" activeCls="bg-green-500 text-black border-green-500 shadow-glow-green" />
          <StatusBtn active={status === 'fail'} onClick={() => setStatus(tc.id, 'fail')} label="Fail" color="bg-red-500/10 text-red-500 border border-red-500/20" activeCls="bg-red-500 text-white border-red-500 shadow-glow-red" />
          <StatusBtn active={status === 'not_applicable'} onClick={() => setStatus(tc.id, 'not_applicable')} label="N/A" color="bg-orange-500/10 text-orange-500 border border-orange-500/20" activeCls="bg-orange-500 text-black border-orange-500 shadow-glow-orange" />
          <StatusBtn active={status === 'not_tested'} onClick={() => setStatus(tc.id, 'not_tested')} label="Not Tested" color="bg-[var(--bg)]/40 text-[var(--text-muted)] border border-transparent" activeCls="bg-[var(--text-highlight)] text-[var(--bg)] border-[var(--text-highlight)] shadow-glow" />
          
          {tc.id.startsWith('custom-') && (
            <button 
              onClick={() => {
                if (confirm('Permanently delete this custom compliance checkpoint?')) {
                  setState((prev: any) => ({
                    ...prev,
                    customTcs: (prev.customTcs || []).filter((t: any) => t.id !== tc.id)
                  }));
                  showToast('Custom checkpoint deleted');
                }
              }}
              className="p-1.5 rounded bg-transparent border border-transparent hover:border-red-500/20 hover:bg-red-500/10 text-[var(--text-muted)] hover:text-red-500 transition-all ml-1"
              title="Delete custom node"
            >
              <Trash2 size={13} />
            </button>
          )}
        </div>
        <motion.div animate={{ rotate: isExpanded ? 90 : 0 }} className="text-[var(--text-muted)] group-hover:text-[var(--text-highlight)] transition-colors">
          <ChevronRight size={16} />
        </motion.div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-[var(--border)] bg-black/5 dark:bg-black/20 overflow-hidden"
          >
            <div className="p-8 space-y-8 max-w-4xl mx-auto">
               <div className="grid grid-cols-5 gap-12">
                 <div className="col-span-3 space-y-6">
                   <div className="space-y-4">
                     <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest flex items-center gap-2 underline decoration-[var(--border)] underline-offset-4">01 Execution Protocol</p>
                     <ul className="space-y-3">
                       {tc.steps.split('\n').map((l: string, i: number) => (
                         <li key={i} className="flex gap-4 group/step">
                           <span className="text-[10px] font-mono text-[var(--text-muted)] font-bold bg-[var(--bg)]/50 w-5 h-5 rounded flex items-center justify-center shrink-0 border border-[var(--border)]">{i+1}</span>
                           <span className="text-sm text-[var(--text-muted)] group-hover/step:text-[var(--text-highlight)] transition-colors leading-relaxed">{l.replace(/^\d+\.\s*/, '')}</span>
                         </li>
                       ))}
                     </ul>
                   </div>
                   <div className="p-5 bg-green-500/5 rounded-xl border border-green-500/10">
                     <p className="text-[10px] font-bold text-green-500 uppercase tracking-widest mb-2 flex items-center gap-2">02 Expected Deterministic State</p>
                     <p className="text-sm text-[var(--text-highlight)] leading-relaxed italic">{tc.expected}</p>
                   </div>
                 </div>
                 <div className="col-span-2 space-y-6">
                   <div className="space-y-3">
                     <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest flex items-center gap-2 underline decoration-[var(--border)] underline-offset-4">03 Field Observations</label>
                     <textarea 
                       placeholder="Log runtime anomalies, device specifics or build artifacts..." 
                       className="w-full bg-[var(--bg)]/40 border border-[var(--border)] rounded-xl p-4 text-sm text-[var(--text-highlight)] outline-none focus:border-[var(--text-muted)] transition-all resize-none min-h-[160px] font-mono leading-relaxed shadow-inner"
                       value={execution?.notes || ''}
                       onChange={e => setState((prev: AppState) => {
                         const key = `${prev.platform}_${prev.activeId}`;
                         const platExecs = prev.execsByPlatform[key] || {};
                         return {
                           ...prev,
                           execsByPlatform: {
                             ...prev.execsByPlatform,
                             [key]: {
                               ...platExecs,
                               [tc.id]: { ...(platExecs[tc.id] || { status: 'not_tested' }), notes: e.target.value }
                             }
                           }
                         };
                       })}
                     />
                   </div>
                   <button 
                     onClick={() => showToast('Observations committed to session')}
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

function SummaryView({ stats, risk, activeSession, executions, activeTcs, db, state }: any) {
  if (!activeSession) return <div className="text-center py-20 text-[var(--text-muted)] italic">Initiate a session instance to generate summary data.</div>;

  const tested = stats.pass + stats.fail;
  const rate = tested ? Math.round(stats.pass / tested * 100) : 0;
  
  const failed = activeTcs.filter((tc: TestCase) => executions[tc.id]?.status === 'fail');

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-light text-[var(--text-highlight)] mb-2 tracking-tight">Summary Status</h1>
          <p className="text-[var(--text-muted)] text-sm italic">Automated submission readiness assessment</p>
        </div>
        <button onClick={() => window.print()} className="px-5 py-2 bg-[var(--surface)] text-[var(--text)] text-xs font-bold rounded-lg border border-[var(--border)] hover:bg-[var(--surface2)] transition-all flex items-center gap-2">
          <ExternalLink size={14} /> System Export
        </button>
      </div>

      <div className={`p-12 rounded-2xl text-center border shadow-2xl transition-all ${risk.cls === 'pass' ? 'bg-green-500/5 border-green-500/20' : risk.cls === 'warn' ? 'bg-orange-500/5 border-orange-500/20' : 'bg-red-500/5 border-red-500/20'}`}>
        <div className="text-6xl mb-6 drop-shadow-lg">{risk.icon}</div>
        <h3 className="text-4xl font-light text-[var(--text-highlight)] mb-3 tracking-tighter uppercase">{risk.label}</h3>
        <p className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-[0.2em]">Risk Coefficient: <span className="text-[var(--text-highlight)] font-bold">{risk.score}</span></p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <StatCard label="Passed" val={stats.pass} color="#4ade80" />
        <StatCard label="Violations" val={stats.fail} color="#f87171" />
        <StatCard label="Criticality Rate" val={`${rate}%`} color="var(--text-highlight)" />
      </div>

      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-8 shadow-xl">
        <h3 className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
          <div className="w-1 h-3 bg-red-500 rounded-full" /> Hardware & Policy Failures ({failed.length})
        </h3>
        <div className="space-y-3">
          {failed.length === 0 ? (
            <div className="text-center py-12 text-sm text-[var(--text-muted)] font-light italic">No critical anomalies detected in the current build.</div>
          ) : failed.map((tc: TestCase) => {
            const gl = db.guidelines.find((g: Guideline) => g.id === tc.gl);
            const imp = (state.impacts[gl?.id]?.[state.platform as 'ios' | 'android']) || gl?.impact || 'medium';
            const num = getTestCaseNumber(tc, db.testCases);
            return (
              <div key={tc.id} className="flex gap-6 p-5 rounded-lg bg-[var(--bg)]/20 border border-[var(--border)] items-start hover:border-[var(--text-muted)] transition-colors group">
                <span className="text-[10px] font-mono text-[var(--text-muted)] bg-[var(--surface2)] px-2 py-1 rounded border border-[var(--border)] uppercase tracking-tighter">#{num}</span>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-[var(--text-highlight)] leading-tight mb-2 whitespace-pre-wrap group-hover:text-[var(--text-highlight)] transition-colors">{tc.title}</h4>
                  <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">{gl?.title}</p>
                </div>
                <span className={`text-[9px] font-bold uppercase px-2 py-1 rounded border ${imp === 'high' ? 'bg-red-500/10 text-red-500 border-red-500/20' : imp === 'medium' ? 'bg-orange-500/10 text-orange-500 border-orange-500/20' : 'bg-green-500/10 text-green-500 border-green-500/20'} tracking-tighter`}>{imp}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function GuidelinesView({ state, setState, db, icons, showToast }: any) {
  const setImpact = (glId: string, val: string) => {
    setState((prev: AppState) => ({
      ...prev,
      impacts: {
        ...prev.impacts,
        [glId]: { ...prev.impacts[glId], [state.platform]: val as any }
      }
    }));
    showToast('Impact updated');
  };

  const handleRestore = (tcId: string) => {
    setState((prev: AppState) => ({
      ...prev,
      deletedTcs: prev.deletedTcs.filter(id => id !== tcId)
    }));
    showToast('Test case restored');
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
       <div>
        <h1 className="text-4xl font-light text-[var(--text-highlight)] mb-2 tracking-tight">System Configuration</h1>
        <p className="text-[var(--text-muted)] text-sm">Manage impact weights and visibility per-platform</p>
      </div>

      <div className="grid gap-4">
        {db.guidelines.map((gl: Guideline) => {
          const imp = (state.impacts[gl.id]?.[state.platform as 'ios' | 'android']) || gl.impact;
          const removedCount = state.deletedTcs.filter((id: string) => db.testCases.find(t => t.id === id)?.gl === gl.id).length;
          
          return (
            <div key={gl.id} className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-8 hover:border-[var(--text-muted)] transition-all shadow-lg">
               <div className="flex justify-between items-start mb-8">
                 <div className="flex gap-6 items-start">
                   <div className="w-12 h-12 bg-[var(--bg)]/40 border border-[var(--border)] rounded-lg flex items-center justify-center text-2xl shadow-inner">
                     {icons[gl.title] || '📁'}
                   </div>
                   <div>
                     <h3 className="text-lg font-semibold text-[var(--text-highlight)] flex items-center gap-3 mb-1">
                        {gl.title} 
                        {removedCount > 0 && <span className="text-[10px] font-bold bg-red-500/10 text-red-500 border border-red-500/20 px-2 py-0.5 rounded uppercase tracking-widest">{removedCount} Stashed</span>}
                     </h3>
                     <p className="text-sm text-[var(--text-muted)] max-w-xl leading-relaxed">{gl.description}</p>
                   </div>
                 </div>
               </div>

               <div className="space-y-4 pt-6 border-t border-[var(--border)]">
                 <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-[0.2em]">Violation Criticality</p>
                 <div className="flex gap-2 bg-[var(--bg)]/20 p-1.5 rounded-lg w-fit border border-[var(--border)]">
                    {['high', 'medium', 'low'].map(lvl => (
                      <button 
                        key={lvl}
                        onClick={() => setImpact(gl.id, lvl)}
                        className={`px-6 py-2 rounded text-[10px] font-bold transition-all uppercase tracking-widest ${imp === lvl ? (lvl === 'high' ? 'bg-red-500 text-white shadow-glow-red' : lvl === 'medium' ? 'bg-orange-500 text-black shadow-glow-orange' : 'bg-green-500 text-black shadow-glow-green') : 'text-[var(--text-muted)] hover:text-[var(--text-highlight)]'}`}
                      >
                        {lvl}
                      </button>
                    ))}
                 </div>
               </div>

               {removedCount > 0 && (
                 <div className="mt-8 space-y-3">
                    <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-[0.2em]">Stashed Nodes</p>
                    <div className="grid gap-2">
                      {state.deletedTcs.filter((id: string) => db.testCases.find(t => t.id === id)?.gl === gl.id).map((id: string) => {
                        const tc = db.testCases.find((t: TestCase) => t.id === id);
                        const num = getTestCaseNumber(tc, db.testCases);
                        return (
                          <div key={id} className="flex items-center justify-between py-3 px-4 bg-[var(--bg)]/20 border border-[var(--border)] rounded-lg text-xs group">
                            <span className="text-[var(--text-muted)] group-hover:text-[var(--text-highlight)] transition-colors font-mono">#{num} &middot; {tc?.title}</span>
                            <button onClick={() => handleRestore(id)} className="text-[var(--text-highlight)] font-bold flex items-center gap-2 hover:underline tracking-tighter"><Undo2 size={12} /> RESTORE NODE</button>
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
