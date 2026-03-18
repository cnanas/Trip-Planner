export default function TopBar({ title = 'Road Trip', subtitle }) {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-4 bg-white border-b border-[#e2e8f0]"
      style={{
        paddingTop: 'calc(var(--safe-top) + 10px)',
        height: 'calc(var(--safe-top) + 52px)',
      }}
    >
      <div className="flex items-center gap-2">
        <span className="text-lg">🚛</span>
        <span className="font-mono text-sm font-bold text-[#0f172a] tracking-wide">{title}</span>
      </div>
      {subtitle && (
        <span className="font-mono text-xs text-[#64748b]">{subtitle}</span>
      )}
    </header>
  )
}
