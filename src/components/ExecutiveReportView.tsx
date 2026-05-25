import React, { useState, useMemo } from 'react';
import { 
  Check, 
  X, 
  AlertTriangle, 
  ExternalLink, 
  Info,
  Printer
} from 'lucide-react';
import { motion } from 'motion/react';
import { TestCase, Guideline, AppState, ExecutionMap, Session } from '../types';

const getTestCaseNumber = (tc: TestCase | undefined, dbTestCases: TestCase[]) => {
  if (!tc) return 1;
  const originalSectionTcs = dbTestCases.filter(
    (t: TestCase) => t.gl === tc.gl && t.originalRef === tc.originalRef
  );
  const stableIdx = originalSectionTcs.findIndex((t: TestCase) => t.id === tc.id);
  return stableIdx >= 0 ? stableIdx + 1 : 1;
};

function PrintPieChart({ stats }: { stats: { pass: number; fail: number; na: number; nt: number; total: number } }) {
  const { pass, fail, na, nt, total } = stats;
  if (!total) return null;

  const circumference = 2 * Math.PI * 35; // R=35 => ~219.9
  
  // Slices definitions
  const slices = [
    { value: pass, color: '#10b981', label: 'Passed' },
    { value: fail, color: '#ef4444', label: 'Violations' },
    { value: na, color: '#f97316', label: 'N/A' },
    { value: nt, color: '#0ea5e9', label: 'Pending' }
  ].filter(s => s.value > 0);

  let accumulatedPercent = 0;

  return (
    <div className="flex items-center gap-10 p-5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl my-6 w-full max-w-md mx-auto print-no-split">
      <div className="relative w-28 h-28 shrink-0">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          <circle cx="50" cy="50" r="35" fill="none" stroke="#e4e4e7" strokeWidth="16" />
          {slices.map((slice, idx) => {
            const percent = slice.value / total;
            const strokeLength = percent * circumference;
            const strokeOffset = circumference - (accumulatedPercent * circumference);
            accumulatedPercent += percent;
            return (
              <circle
                key={idx}
                cx="50"
                cy="50"
                r="35"
                fill="none"
                stroke={slice.color}
                strokeWidth="16"
                strokeDasharray={`${strokeLength} ${circumference}`}
                strokeDashoffset={strokeOffset}
              />
            );
          })}
        </svg>
      </div>
      <div className="space-y-1.5 text-left flex-1">
        <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-extrabold mb-1">Metrics Distribution</p>
        {slices.map((slice, idx) => (
          <div key={idx} className="flex items-center justify-between text-xs text-zinc-800 dark:text-zinc-200 font-semibold gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: slice.color }} />
              <span>{slice.label}</span>
            </div>
            <span className="font-mono text-zinc-650 dark:text-zinc-400">{slice.value} ({Math.round((slice.value / total) * 100)}%)</span>
          </div>
        ))}
      </div>
    </div>
  );
}

interface ExecutiveReportViewProps {
  stats: {
    pass: number;
    fail: number;
    na: number;
    nt: number;
    total: number;
  };
  risk: {
    score: number;
    cls: string;
    label: string;
    icon: string;
  };
  activeSession: Session | undefined;
  executions: ExecutionMap;
  activeTcs: TestCase[];
  db: {
    guidelines: Guideline[];
    testCases: TestCase[];
  };
  state: AppState;
}

export default function ExecutiveReportView({ 
  stats, 
  risk, 
  activeSession, 
  executions, 
  activeTcs, 
  db, 
  state 
}: ExecutiveReportViewProps) {
  const [copySuccess, setCopySuccess] = useState(false);

  // Derive compliance state summary variables
  const platformLabel = state.platform === 'ios' ? 'Apple iOS App Store' : 'Google Android Play Store';
  const totalAssessed = stats.pass + stats.fail;
  const passRate = totalAssessed ? Math.round((stats.pass / totalAssessed) * 100) : 0;
  const isInsufficientData = totalAssessed === 0;

  // Derive actual failing test cases in order
  const failedTestCases = useMemo(() => {
    return activeTcs.filter(tc => executions[tc.id]?.status === 'fail');
  }, [activeTcs, executions]);

  // Determine overall posture label & detail points
  const posture = useMemo(() => {
    if (isInsufficientData) {
      return {
        status: 'Uncertain - Assessment Pending',
        badgeColor: 'border-yellow-500/20 bg-yellow-500/10 text-yellow-600 dark:text-yellow-500',
        textColor: 'text-yellow-600 dark:text-yellow-500',
        bullets: [
          'No test execution results have been recorded in this session yet.',
          'Stakeholders cannot verify store compliance. Critical business risks may remain unmitigated.',
          'Priority Recommendation: Initiate verification audits in the Test Execution first party compliance evaluation area immediately.'
        ]
      };
    }

    if (stats.fail === 0) {
      if (stats.nt > 0) {
        return {
          status: 'Compliant with Pending Verifications',
          badgeColor: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
          textColor: 'text-emerald-600 dark:text-emerald-400',
          bullets: [
            'All evaluated requirements currently meet platform compliance criteria.',
            `There are still ${stats.nt} outstanding test nodes that require active assessment.`,
            'Zero critical barriers identified in evaluated sections, but full store validation is blocked until pending assessments complete.'
          ]
        };
      }
      return {
        status: 'Fully Compliant - Ready for Submission',
        badgeColor: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shadow-glow-green',
        textColor: 'text-emerald-600 dark:text-emerald-400 font-extrabold',
        bullets: [
          'Excellent structural status: 100% pass rate achieved across all relevant criteria.',
          'No active violations or failure points detected. Store guidelines met fully.',
          'The application build conforms to release specifications and can be submitted immediately.'
        ]
      };
    }

    // Failures exist
    const hasHighSeverityFailures = activeTcs.some(tc => {
      if (executions[tc.id]?.status !== 'fail') return false;
      const gl = db.guidelines.find(g => g.id === tc.gl);
      const imp = state.impacts[gl?.id || '']?.[state.platform] || gl?.impact || 'medium';
      return imp === 'high';
    });

    if (hasHighSeverityFailures) {
      return {
        status: 'Non-Compliant - Immediate Rectification Required',
        badgeColor: 'border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400 shadow-glow-red animate-pulse',
        textColor: 'text-red-600 dark:text-red-400 font-bold',
        bullets: [
          'Critical vulnerabilities identified: High-severity violations will trigger immediate store review rejections.',
          `A total of ${stats.fail} failure points were registered during the first party compliance evaluations.`,
          'Store launch authorization is strictly locked because of structural policies around core platform directives.',
          'Identified codebase compliance failures must be resolved prior to store distribution.'
        ]
      };
    }

    return {
      status: 'Mostly Compliant with Critical Issues',
      badgeColor: 'border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400',
      textColor: 'text-amber-600 dark:text-amber-400',
      bullets: [
        'Moderate submission threat: Evaluated build meets basic framework policies, but holds outstanding active violations.',
        `Registered ${stats.fail} active failure nodes of medium/low risk score.`,
        'Approval probability is reduced to ~40% due to non-standard UX disclosures and warning flags.',
        'Apply remediation adjustments to secure standard platform approval.'
      ]
    };
  }, [stats, isInsufficientData, executions, activeTcs, db.guidelines, state.impacts, state.platform]);

  // Aggregate Key Risk Areas: Categories with the most failures
  const riskAreas = useMemo(() => {
    if (isInsufficientData) return [];

    const guidelinesMap: Record<string, { guideline: Guideline; count: number; highSeverity: boolean }> = {};
    
    activeTcs.forEach(tc => {
      if (executions[tc.id]?.status === 'fail') {
        const gl = db.guidelines.find(g => g.id === tc.gl);
        if (!gl) return;
        
        const imp = state.impacts[gl.id]?.[state.platform] || gl.impact;

        if (!guidelinesMap[gl.id]) {
          guidelinesMap[gl.id] = {
            guideline: gl,
            count: 0,
            highSeverity: false
          };
        }
        guidelinesMap[gl.id].count += 1;
        if (imp === 'high') {
          guidelinesMap[gl.id].highSeverity = true;
        }
      }
    });

    return Object.values(guidelinesMap)
      .sort((a, b) => b.count - a.count)
      .slice(0, 5); // top 5
  }, [activeTcs, executions, db.guidelines, state.impacts, state.platform, isInsufficientData]);

  // Construct text report for Copy to Clipboard
  const generateTextReport = () => {
    let text = `====================================================\n`;
    text += `COMPLIANCE REPORT\n`;
    text += `====================================================\n\n`;
    text += `Status: ${stats.fail === 0 && !isInsufficientData ? 'APPROVABLE' : 'ACTION REQUIRED'}\n`;
    text += `Date: ${activeSession ? new Date(activeSession.created).toLocaleDateString() : new Date().toLocaleDateString()}\n`;
    text += `Milestone: ${activeSession?.milestone || 'General Staging'}\n`;
    text += `App version: ${activeSession?.version || 'N/A'}\n`;
    text += `Build name: ${activeSession?.build || 'N/A'}\n`;
    text += `Lead tester: ${activeSession?.tester || 'QA Team'}\n`;
    text += `Target Platform: ${platformLabel}\n`;
    text += `Assessed Session Description: ${activeSession?.desc || 'N/A'}\n\n`;
    
    text += `----------------------------------------------------\n`;
    text += `1. COMPLIANCE SUMMARY\n`;
    text += `----------------------------------------------------\n`;
    text += `Overall Compliance Posture: ${posture.status}\n\n`;
    posture.bullets.forEach((b, i) => {
      text += ` * ${b}\n`;
    });
    text += `\n`;

    text += `----------------------------------------------------\n`;
    text += `2. COMPLIANCE SCORE OVERVIEW\n`;
    text += `----------------------------------------------------\n`;
    text += ` * Total Compliance Nodes: ${stats.total}\n`;
    text += ` * Requirements Passed: ${stats.pass} (${passRate}% of assessed)\n`;
    text += ` * Violations Identified: ${stats.fail}\n`;
    text += ` * Not Applicable (N/A): ${stats.na}\n`;
    text += ` * Pending Evaluation: ${stats.nt}\n\n`;

    if (riskAreas.length > 0) {
      text += `----------------------------------------------------\n`;
      text += `3. KEY RISK AREAS (POLICY CATEGORIES WITH FAILURES)\n`;
      text += `----------------------------------------------------\n`;
      riskAreas.forEach((r, i) => {
        text += ` [${i + 1}] Guideline Area: ${r.guideline.title}\n`;
        text += `     * Total Registered Failures: ${r.count} point(s)\n`;
        text += `     * Severity Level: ${state.impacts[r.guideline.id]?.[state.platform] || r.guideline.impact || 'medium'}\n\n`;
      });
    }

    if (failedTestCases.length > 0) {
      text += `----------------------------------------------------\n`;
      text += `4. NOTABLE VIOLATIONS (FAILING CHECKS)\n`;
      text += `----------------------------------------------------\n`;
      failedTestCases.forEach((tc, i) => {
        const gl = db.guidelines.find(g => g.id === tc.gl);
        const imp = state.impacts[tc.gl]?.[state.platform] || gl?.impact || 'medium';
        const tcNum = getTestCaseNumber(tc, db.testCases);
        const notes = executions[tc.id]?.notes;
        text += ` [TC #${tcNum}] ${tc.title}\n`;
        if (gl) {
          text += `     * Policy Area: ${gl.title} (${gl.id})\n`;
        }
        text += `     * Severity Level: ${imp}\n`;
        if (notes) {
          text += `     * Findings/Evidence: ${notes}\n`;
        }
        text += `\n`;
      });
    }

    text += `----------------------------------------------------\n`;
    text += `5. APPENDIX (METRICS SUMMARY)\n`;
    text += `----------------------------------------------------\n`;
    text += `Session Verification Density: ${totalAssessed}/${stats.total} guidelines evaluated.\n`;
    text += `Risk Multiplier Score: ${risk.score}\n`;
    text += `Recommended Staging Decision: ${risk.label}\n`;
    text += `\n====================================================`;

    return text;
  };

  const copyToClipboard = () => {
    const textReport = generateTextReport();
    navigator.clipboard.writeText(textReport).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 3000);
    });
  };

  return (
    <div className="w-full bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-8 shadow-2xl relative overflow-hidden text-left animate-in fade-in duration-300 print:shadow-none print:border-none print:bg-transparent print:p-0 print:rounded-none" id="executive-compliance-report">
      {/* Visual background highlights to represent formal auditing desk */}

      {/* Report Core Headings */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-[var(--border)] pb-6 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-1.5">
            <span className="text-[10px] font-mono bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded uppercase tracking-wider font-extrabold">Enterprise Audit</span>
            <span className="text-[10px] font-mono text-[var(--text-muted)]">Generated on {new Date().toLocaleDateString()}</span>
          </div>
          <h2 className="text-3xl font-light text-[var(--text-highlight)] tracking-tight uppercase">Compliance Report</h2>
          <p className="text-xs text-[var(--text-muted)] mt-1.5 font-sans leading-normal">
            Platform readiness, Store policy adherence report
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button 
            type="button"
            onClick={() => window.print()}
            className="px-4 py-2 text-xs font-bold rounded-lg border border-indigo-500/30 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 transition-all flex items-center gap-1.5 shadow-sm print:hidden"
            title="Saves report as a PDF using system print dialog"
          >
            <Printer size={13} /> Export PDF Report
          </button>
          <button 
            onClick={copyToClipboard}
            className={`px-4 py-2 text-xs font-bold rounded-lg border transition-all flex items-center gap-1.5 print:hidden ${copySuccess ? 'bg-emerald-500/15 border-emerald-500 text-emerald-400 font-extrabold' : 'bg-[var(--surface2)] border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text-highlight)] hover:bg-[var(--border)]'}`}
          >
            {copySuccess ? '✨ Copied Plain Text' : '📋 Copy Text Report'}
          </button>
        </div>
      </div>

      {/* Session Metadata Context Card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 bg-[var(--bg)]/40 border border-[var(--border)] rounded-xl p-6 mb-8 text-xs relative">
        <div className="space-y-1">
          <p className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider font-bold">Status</p>
          <p className="font-semibold text-[var(--text-highlight)]">{stats.fail === 0 && !isInsufficientData ? 'APPROVABLE' : 'ACTION REQUIRED'}</p>
        </div>
        <div className="space-y-1 md:border-l md:border-[var(--border)] md:pl-6">
          <p className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider font-bold">Date</p>
          <p className="font-semibold text-[var(--text-highlight)]">
            {activeSession ? new Date(activeSession.created).toLocaleDateString() : new Date().toLocaleDateString()}
          </p>
        </div>
        <div className="space-y-1 md:border-l md:border-[var(--border)] md:pl-6">
          <p className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider font-bold">Milestone</p>
          <p className="font-semibold text-[var(--text-highlight)]">{activeSession?.milestone || 'General Staging'}</p>
        </div>
        <div className="space-y-1 md:border-l md:border-[var(--border)] md:pl-6">
          <p className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider font-bold">App version</p>
          <p className="font-semibold text-[var(--text-highlight)]">
            v{activeSession?.version || '0.0.0'}
          </p>
        </div>
        <div className="space-y-1 md:border-l md:border-[var(--border)] md:pl-6">
          <p className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider font-bold">Build name</p>
          <p className="font-semibold text-[var(--text-highlight)]">
            {activeSession?.build || 'N/A'}
          </p>
        </div>
      </div>

      <div className="space-y-10">
        {/* SECTION 1: COMPLIANCE SUMMARY */}
        <section className="space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-3 bg-indigo-500 rounded-sm" />
            <h3 className="text-xs font-mono font-extrabold tracking-widest text-[var(--text-highlight)] uppercase">1. Compliance Summary</h3>
          </div>
          
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-xl border border-[var(--border)] bg-white dark:bg-black/20 shadow-sm print-no-split">
              <div>
                <p className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider">Assessed Posture</p>
                <h4 className="text-lg font-bold text-[var(--text-highlight)] mt-0.5 leading-tight">{posture.status}</h4>
              </div>
              <span className={`text-[10px] font-mono font-extrabold uppercase px-3 py-1 rounded-full border tracking-widest ${posture.badgeColor}`}>
                {stats.fail === 0 && !isInsufficientData ? 'APPROVABLE' : 'ACTION REQUIRED'}
              </span>
            </div>

            <ul className="space-y-3 pl-1 text-xs text-[var(--text)]">
              {posture.bullets.map((bullet, idx) => (
                <li key={idx} className="flex gap-3 leading-relaxed items-start print-no-split">
                  <span className="text-indigo-400 mt-1 select-none text-[8px] shrink-0">◆</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* SECTION 2: COMPLIANCE SCORE OVERVIEW */}
        <section className="space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-3 bg-indigo-500 rounded-sm" />
            <h3 className="text-xs font-mono font-extrabold tracking-widest text-[var(--text-highlight)] uppercase">2. Compliance Score Overview</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-1 print-no-split">
            <div className="bg-[var(--surface2)] border border-[var(--border)] rounded-xl p-4 flex flex-col justify-between h-24">
              <span className="text-[9px] font-mono text-[var(--text-muted)] uppercase">Pass Ratio</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-green-400">{passRate}%</span>
                <span className="text-[9px] text-[var(--text-muted)]">of assessments</span>
              </div>
            </div>
            <div className="bg-[var(--surface2)] border border-[var(--border)] rounded-xl p-4 flex flex-col justify-between h-24">
              <span className="text-[9px] font-mono text-[var(--text-muted)] uppercase">Violations Found</span>
              <div className="flex items-baseline gap-2">
                <span className={`text-2xl font-bold ${stats.fail > 0 ? 'text-red-400' : 'text-green-400'}`}>{stats.fail}</span>
                <span className="text-[9px] text-[var(--text-muted)]">critical issues</span>
              </div>
            </div>
            <div className="bg-[var(--surface2)] border border-[var(--border)] rounded-xl p-4 flex flex-col justify-between h-24">
              <span className="text-[9px] font-mono text-[var(--text-muted)] uppercase">Not Applicable</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-orange-400">{stats.na}</span>
                <span className="text-[9px] text-[var(--text-muted)]">dismissed</span>
              </div>
            </div>
            <div className="bg-[var(--surface2)] border border-[var(--border)] rounded-xl p-4 flex flex-col justify-between h-24">
              <span className="text-[9px] font-mono text-[var(--text-muted)] uppercase">Unverified Nodes</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-sky-400">{stats.nt}</span>
                <span className="text-[9px] text-[var(--text-muted)]">pending notes</span>
              </div>
            </div>
          </div>

          {/* Score distribution bar */}
          <div className="pt-2 print-no-split">
            <div className="h-2 w-full rounded-full bg-[var(--surface2)] overflow-hidden flex">
              <div className="bg-green-400 h-full" style={{ width: `${stats.total ? (stats.pass / stats.total) * 100 : 0}%` }} />
              <div className="bg-red-400 h-full" style={{ width: `${stats.total ? (stats.fail / stats.total) * 100 : 0}%` }} />
              <div className="bg-orange-400 h-full" style={{ width: `${stats.total ? (stats.na / stats.total) * 100 : 0}%` }} />
              <div className="bg-sky-400 h-full" style={{ width: `${stats.total ? (stats.nt / stats.total) * 100 : 0}%` }} />
            </div>
            <div className="flex flex-wrap justify-center gap-6 mt-3 text-[10px] font-mono text-[var(--text-muted)]">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-400" />
                <span>Passed: {stats.pass}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-400" />
                <span>Violations: {stats.fail}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-orange-400" />
                <span>N/A: {stats.na}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-sky-400" />
                <span>Untested: {stats.nt}</span>
              </div>
            </div>
          </div>
        </section>

        {/* PRINT ONLY PIE CHART */}
        <div className="hidden print:flex justify-center my-4">
          <PrintPieChart stats={stats} />
        </div>

        {/* SECTION 3: KEY RISK AREAS */}
        <section className="space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-3 bg-indigo-500 rounded-sm" />
            <h3 className="text-xs font-mono font-extrabold tracking-widest text-[var(--text-highlight)] uppercase font-bold">3. Key Risk Areas</h3>
          </div>

          {isInsufficientData ? (
            <div className="text-center py-6 text-xs text-[var(--text-muted)] italic border border-dashed border-[var(--border)] rounded-lg print-no-split">
              No risk scoring aggregates are compiled because execution metrics are insufficient. Evaluated areas will populate dynamically.
            </div>
          ) : riskAreas.length === 0 ? (
            <div className="p-4 bg-green-500/5 border border-green-500/20 text-xs text-green-400 rounded-lg flex items-center gap-3 print-no-split">
              <Check size={14} />
              <span>Perfect adherence. Zero policy category checkpoints register active failures. No risk hotspots identified.</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {riskAreas.map((area, idx) => {
                const subImpact = state.impacts[area.guideline.id]?.[state.platform] || area.guideline.impact || 'medium';
                return (
                  <div key={area.guideline.id} className="p-5 rounded-xl border border-[var(--border)] bg-[var(--surface2)] hover:border-[var(--text-muted)] transition-colors print-no-split">
                    <div className="flex justify-between items-start mb-2.5">
                      <div>
                        <h4 className="font-semibold text-sm text-[var(--text-highlight)] mt-0.5">{area.guideline.title}</h4>
                      </div>
                      <span className={`text-[8px] font-mono font-extrabold uppercase px-2 py-0.5 rounded border ${
                        subImpact === 'high' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 
                        subImpact === 'medium' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' : 
                        'bg-blue-500/10 text-blue-400 border-blue-500/20'
                      }`}>
                        {subImpact} severity
                      </span>
                    </div>
                    <p className="text-[11px] text-[var(--text-muted)] leading-relaxed mb-4">{area.guideline.description}</p>
                    <div className="flex items-center gap-2">
                      <div className="w-full bg-[var(--bg)] rounded-full h-1.5 overflow-hidden">
                        <div 
                           className={`h-full ${subImpact === 'high' ? 'bg-red-400' : 'bg-orange-400'}`}
                          style={{ width: `${Math.min(100, (area.count / stats.total) * 400)}%` }}
                        />
                      </div>
                      <span className="text-[10.5px] font-mono text-[var(--text-highlight)] font-bold shrink-0">{area.count} Failure{area.count > 1 ? 's' : ''}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* SECTION 4: NOTABLE VIOLATIONS (failing test cases imported directly) */}
        <section className="space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-3 bg-indigo-500 rounded-sm" />
            <h3 className="text-xs font-mono font-extrabold tracking-widest text-[var(--text-highlight)] uppercase font-bold">4. Notable Violations</h3>
          </div>

          {isInsufficientData ? (
            <div className="text-center py-6 text-xs text-[var(--text-muted)] italic border border-dashed border-[var(--border)] rounded-lg">
              No evidence points have been evaluated yet. Complete manual verifications to highlight representative model rejections.             
            </div>
          ) : stats.fail === 0 ? (
            <div className="p-4 bg-green-500/5 border border-green-500/20 text-xs text-green-400 rounded-lg flex items-center gap-3">
              <Check size={14} />
              <span>No critical layout or protocol failures found during review. Target is ready for distribution launch.</span>
            </div>
          ) : (
            <div className="space-y-4">
              {failedTestCases.map((tc, idx) => {
                const gl = db.guidelines.find(g => g.id === tc.gl);
                const imp = state.impacts[gl?.id || '']?.[state.platform] || gl?.impact || 'medium';
                const tcNum = getTestCaseNumber(tc, db.testCases);
                const notes = executions[tc.id]?.notes;

                return (
                  <div key={tc.id} className="p-5 rounded-xl border border-[var(--border)] bg-[var(--surface2)] hover:border-[var(--text-muted)] transition-colors relative overflow-hidden print-no-split">
                    {/* Visual left accent bar */}
                    <div className="absolute top-0 left-0 bottom-0 w-1 bg-red-500" />
                    
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-2.5 pl-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[9px] font-mono text-[var(--text-muted)] bg-[var(--surface3)] dark:bg-black/40 px-2 py-0.5 rounded border border-[var(--border)] uppercase font-semibold">
                          #{tcNum}
                        </span>
                        <span className="text-[9px] font-mono font-bold text-red-400 bg-red-405/10 border border-red-500/20 px-1.5 py-0.5 rounded uppercase tracking-wider">
                          Violation
                        </span>
                        {tc.ref && (
                          <span className="text-[10px] font-mono text-[var(--text-muted)]">
                            Ref: {tc.ref}
                          </span>
                        )}
                      </div>
                      
                      <span className={`text-[8px] font-mono font-extrabold uppercase px-2 py-0.5 rounded border tracking-wider ${
                        imp === 'high' ? 'bg-red-500/15 text-red-400 border-red-500/30' : 
                        imp === 'medium' ? 'bg-orange-500/15 text-orange-400 border-orange-500/30' : 
                        'bg-blue-500/15 text-blue-400 border-blue-500/30'
                      }`}>
                        {imp} severity
                      </span>
                    </div>

                    <div className="pl-2 space-y-2">
                      <h4 className="font-semibold text-sm text-[var(--text-highlight)] leading-tight whitespace-pre-wrap">
                        {tc.title}
                      </h4>
                      {gl && (
                        <p className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider">
                          Review Guideline Category: {gl.title} ({gl.id})
                        </p>
                      )}
                      
                      {tc.steps && (
                        <div className="mt-3 text-xs text-[var(--text-muted)] border-t border-[var(--border)]/60 pt-3">
                          <span className="font-semibold text-[var(--text-highlight)] block mb-1 text-[11px] uppercase tracking-wider font-mono">Evaluation Scenario:</span>
                          <p className="leading-relaxed pl-1 whitespace-pre-line">{tc.steps}</p>
                        </div>
                      )}

                      {notes && (
                        <div className="mt-3 bg-red-500/5 border border-red-400/10 p-3 rounded-lg text-xs">
                          <span className="font-bold text-red-400 block mb-1 uppercase tracking-wider font-mono text-[10px]">Auditor Findings & Evidence Summary:</span>
                          <p className="italic text-[var(--text)] pl-1 whitespace-pre-line leading-relaxed">“{notes}”</p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* SECTION 5: APPENDIX (SHORT STATS ONLY) */}
        <div className="pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-[10px] font-mono text-[var(--text-muted)] print-no-split">
          <div>
            <span>Audit density: {totalAssessed}/{stats.total} total criteria checked.</span>
          </div>
          <div>
            <span>Aggregate risk ratio: {risk.score} / recommendation coefficient.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
