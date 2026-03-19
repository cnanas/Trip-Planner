import { RotateCcw, CheckSquare, Square } from 'lucide-react'
import { useChecklistStore } from '../store/checklistStore'

// ── Data ──────────────────────────────────────────────────────────────────────

const TIMELINE = [
  { label: 'Today',         date: 'Thu Mar 19', type: 'today'     },
  { label: 'Pack & Prep',   date: 'Fri – Sat',  type: 'default'   },
  { label: 'Departure',     date: 'Sun Mar 23',  type: 'departure' },
  { label: 'Arrive Spokane',date: '~Fri Mar 28', type: 'arrive'    },
  { label: '30-Day Deadline',date: 'By Apr 27',  type: 'deadline'  },
]

const PHASES = [
  {
    id: 'phase1',
    title: 'Before You Leave',
    subtitle: 'Complete by Saturday March 22nd',
    accent: '#f97316',
    accentBg: '#fff7ed',
    items: [
      {
        id: '1',
        title: 'Locate your MA vehicle title',
        note: "You'll need this to register in WA. If a lender holds it, get their contact info so they can fax a copy to the WA DOL when the time comes.",
        tag: { label: 'Action Required', type: 'action' },
      },
      {
        id: '2',
        title: 'Confirm your MA excise tax is fully paid',
        note: "You mentioned it's already paid — just double-check there are no outstanding bills to avoid any collection action or license issues while you're in transit.",
        tag: { label: 'Already Done', type: 'done' },
      },
      {
        id: '3',
        title: 'Update your address with USPS (mail forwarding)',
        note: 'Do this at usps.com — takes 5 minutes. Forward mail from Sunderland address to your new Spokane address.',
        tag: { label: 'Action Required', type: 'action' },
      },
      {
        id: '4',
        title: 'Notify your auto insurance company of the move',
        note: "Tell them you're relocating to Spokane, WA. Your rate may change. Make sure you're covered during the drive and upon arrival.",
        tag: { label: 'Time-Sensitive', type: 'deadline' },
      },
      {
        id: '5',
        title: "Notify your bank(s) of address change",
        note: 'Prevents fraud flags on your cards while traveling and ensures statements reach you.',
        tag: { label: 'Action Required', type: 'action' },
      },
      {
        id: '6',
        title: 'Notify employer of new address (for tax withholding)',
        note: 'Important for state income tax purposes — WA has no state income tax, so your withholding will change.',
        tag: { label: 'Tax Impact', type: 'money' },
      },
    ],
  },
  {
    id: 'phase-utilities',
    title: 'Utilities & Insurance',
    subtitle: 'Set up new, shut down old',
    accent: '#8b5cf6',
    accentBg: '#f5f3ff',
    items: [
      {
        id: 'u1',
        title: 'New Apartment — Set up electricity',
        note: 'Contact the Spokane utility provider to establish service at your new address before or shortly after arrival.',
        tag: { label: 'New Apartment', type: 'action' },
      },
      {
        id: 'u2',
        title: 'New Apartment — Set up renters insurance',
        note: 'Get a renters insurance policy for the Spokane apartment. Many providers (Lemonade, State Farm, etc.) let you start same-day online.',
        tag: { label: 'New Apartment', type: 'action' },
      },
      {
        id: 'u3',
        title: 'Current Apartment — Shut down electricity',
        note: 'Call or go online to cancel/transfer your Sunderland electricity service. Set the end date to your move-out day.',
        tag: { label: 'Current Apartment', type: 'deadline' },
      },
      {
        id: 'u4',
        title: 'Current Apartment — Cancel renters insurance',
        note: 'Contact your current renters insurance provider to cancel your policy effective your move-out date. You may be owed a prorated refund.',
        tag: { label: 'Current Apartment', type: 'money' },
      },
    ],
  },
  {
    id: 'phase2',
    title: 'The Drive',
    subtitle: '5-day route along I-90 West · Sun Mar 23 → ~Fri Mar 28',
    accent: '#f59e0b',
    accentBg: '#fffbeb',
    items: [
      {
        id: '7',
        title: 'Drive safely to Spokane',
        note: 'Your pet-friendly hotel stops are planned along I-90 West. Enjoy the ride — this is the easy part!',
        tag: { label: 'Enjoy It', type: 'optional' },
      },
    ],
  },
  {
    id: 'phase3',
    title: 'After Arrival — Within 30 Days',
    subtitle: 'Deadline: ~April 27, 2026 · Do in this order',
    accent: '#2563eb',
    accentBg: '#eff6ff',
    items: [
      {
        id: '8',
        title: 'Step 1 — Pre-apply for WA driver\'s license online',
        note: 'Go to dol.wa.gov and pre-apply to save time at the office. You\'ll get a driver\'s license number and can schedule your appointment.',
        tag: { label: 'Do This First', type: 'action' },
      },
      {
        id: '9',
        title: 'Step 2 — Get your WA driver\'s license at Spokane DOL',
        note: "Bring: your MA driver's license, Social Security number, and 2 proofs of WA residency (lease, utility bill, or bank statement with Spokane address). You won't need to retake any tests. Fee: $54 for standard Class D license.",
        tag: { label: 'In-Person', type: 'form' },
      },
      {
        id: '10',
        title: 'Step 3 — Register your Tesla at WA licensing office',
        note: "Must have your WA license first. Bring: MA vehicle title (or lender fax), your new WA driver's license, odometer reading, and payment (~$225 for EV fees + standard registration).",
        tag: { label: 'Form TD-420-001', type: 'form' },
      },
      {
        id: '11',
        title: 'Update voter registration to WA',
        note: "You can do this at the DOL office when getting your license — just say yes when they ask. Or go to vote.wa.gov anytime.",
        tag: { label: 'Optional but Easy', type: 'optional' },
      },
    ],
  },
  {
    id: 'phase4',
    title: 'MA Loose Ends',
    subtitle: 'Handle once settled in Spokane · No hard deadline',
    accent: '#94a3b8',
    accentBg: '#f8fafc',
    items: [
      {
        id: '12',
        title: 'Mail MA license plates back to the RMV',
        note: 'Mail plates to MA RMV with a written cancellation request. They\'ll send you a plate return receipt, which you\'ll need for your excise abatement. Address: MA RMV, P.O. Box 55889, Boston, MA 02205.',
        tag: { label: 'Mail It In', type: 'action' },
      },
      {
        id: '13',
        title: 'File MA Excise Tax Abatement for prorated refund',
        note: "Since you already paid 2026 excise, you're owed a refund for months after you last registered in MA. File State Tax Form 126-MVE with your town's assessor. Attach: plate return receipt + copy of your new WA registration. You have up to 1 year to file.",
        tag: { label: 'Money Back', type: 'money' },
      },
      {
        id: '14',
        title: 'Update MA voter registration (cancel or transfer)',
        note: "Once registered in WA, notify your MA town clerk to cancel your MA registration. Not legally required but good practice.",
        tag: { label: 'Optional', type: 'optional' },
      },
      {
        id: '15',
        title: 'Update IRS address (file Form 8822)',
        note: "If you're expecting a tax refund or correspondence, file IRS Form 8822 (Change of Address) to make sure it reaches your new Spokane address.",
        tag: { label: 'Form IRS 8822', type: 'form' },
      },
    ],
  },
]

const TAG_STYLES = {
  action:   'bg-[#fff7ed] text-[#f97316]',
  form:     'bg-[#eff6ff] text-[#2563eb]',
  deadline: 'bg-[#fffbeb] text-[#d97706]',
  optional: 'bg-[#f8fafc] text-[#64748b]',
  money:    'bg-[#f0fdf4] text-[#16a34a]',
  done:     'bg-[#f0fdf4] text-[#16a34a]',
}

// ── Sub-components ────────────────────────────────────────────────────────────

function TimelineNode({ node }) {
  const dotColors = {
    today:     'border-[#f97316] bg-[#fff7ed]',
    departure: 'border-[#2563eb] bg-[#eff6ff]',
    arrive:    'border-[#16a34a] bg-[#f0fdf4]',
    deadline:  'border-[#d97706] bg-[#fffbeb]',
    default:   'border-[#e2e8f0] bg-white',
  }
  const dateColors = {
    today:     'text-[#f97316]',
    departure: 'text-[#2563eb]',
    arrive:    'text-[#16a34a]',
    deadline:  'text-[#d97706]',
    default:   'text-[#0f172a]',
  }
  return (
    <div className="flex-1 flex flex-col items-center gap-2">
      <div className={`w-9 h-9 rounded-full border-2 flex items-center justify-center shrink-0 ${dotColors[node.type]}`}>
        <div className={`w-2 h-2 rounded-full ${node.type === 'today' ? 'bg-[#f97316]' : 'bg-[#e2e8f0]'}`} />
      </div>
      <div className="text-center">
        <p className={`text-xs font-semibold ${dateColors[node.type]}`}>{node.date}</p>
        <p className="text-[10px] text-[#94a3b8] leading-tight mt-0.5">{node.label}</p>
      </div>
    </div>
  )
}

function CheckItem({ item }) {
  const { isChecked, toggle } = useChecklistStore()
  const checked = isChecked(item.id)

  return (
    <button
      onClick={() => toggle(item.id)}
      className={`w-full flex items-start gap-3 text-left px-4 py-3.5 rounded-2xl border transition-all ${
        checked
          ? 'bg-[#f8fafc] border-[#e2e8f0] opacity-50'
          : 'bg-white border-[#e2e8f0] shadow-sm hover:border-[#f97316]/40'
      }`}
    >
      <div className="shrink-0 mt-0.5">
        {checked
          ? <CheckSquare size={18} className="text-[#22c55e]" />
          : <Square size={18} className="text-[#cbd5e1]" />
        }
      </div>
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium leading-snug ${checked ? 'line-through text-[#94a3b8]' : 'text-[#0f172a]'}`}>
          {item.title}
        </p>
        {!checked && (
          <p className="text-xs text-[#64748b] mt-1 leading-relaxed">{item.note}</p>
        )}
        <span className={`inline-block mt-2 text-[10px] font-semibold tracking-wide px-2 py-0.5 rounded-full ${TAG_STYLES[item.tag.type]}`}>
          {item.tag.label}
        </span>
      </div>
    </button>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ChecklistPage() {
  const { checked, reset } = useChecklistStore()

  const total = PHASES.reduce((n, p) => n + p.items.length, 0)
  const done = Object.values(checked).filter(Boolean).length
  const pct = total > 0 ? (done / total) * 100 : 0

  return (
    <div className="px-4 pt-4 pb-8 space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-[#0f172a] tracking-tight">Move Checklist</h1>
        <p className="text-xs text-[#64748b] mt-0.5">Sunderland, MA → Spokane, WA</p>

        {/* Progress */}
        <div className="flex items-center gap-3 mt-3">
          <div className="flex-1 h-1.5 bg-[#f1f5f9] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #f97316, #2563eb)' }}
            />
          </div>
          <span className="text-xs font-semibold text-[#64748b] shrink-0">{done} / {total}</span>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-2xl border border-[#e2e8f0] p-4 shadow-sm">
        <p className="text-[10px] font-semibold tracking-widest uppercase text-[#94a3b8] mb-4">Timeline</p>
        <div className="relative flex">
          {/* Connecting line */}
          <div className="absolute top-[17px] left-[18px] right-[18px] h-px bg-[#e2e8f0]" />
          {TIMELINE.map((node) => (
            <TimelineNode key={node.label} node={node} />
          ))}
        </div>
      </div>

      {/* Phases */}
      {PHASES.map((phase) => {
        const phaseDone = phase.items.filter((item) => checked[item.id]).length
        return (
          <div key={phase.id}>
            {/* Phase header */}
            <div
              className="flex items-start justify-between px-4 py-3 rounded-2xl mb-2"
              style={{ backgroundColor: phase.accentBg, borderLeft: `3px solid ${phase.accent}` }}
            >
              <div>
                <p className="text-sm font-semibold" style={{ color: phase.accent }}>{phase.title}</p>
                <p className="text-xs text-[#64748b] mt-0.5">{phase.subtitle}</p>
              </div>
              <span className="text-xs font-mono font-bold text-[#94a3b8] shrink-0 ml-3 mt-0.5">
                {phaseDone}/{phase.items.length}
              </span>
            </div>

            {/* Items */}
            <div className="space-y-2">
              {phase.items.map((item) => (
                <CheckItem key={item.id} item={item} />
              ))}
            </div>
          </div>
        )
      })}

      {/* Reset */}
      <button
        onClick={() => { if (window.confirm('Reset all checkboxes?')) reset() }}
        className="flex items-center gap-2 mx-auto text-xs text-[#94a3b8] hover:text-[#64748b] transition-colors py-2"
      >
        <RotateCcw size={13} />
        Reset all checkboxes
      </button>
    </div>
  )
}
