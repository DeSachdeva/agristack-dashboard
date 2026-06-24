const STATUS_STYLES = {
  "Live":        { bg: '#dcfce7', text: '#166534', dot: '#22c55e' },
  "In Progress": { bg: '#dbeafe', text: '#1e40af', dot: '#3b82f6' },
  "Complete":    { bg: '#f3e8ff', text: '#6b21a8', dot: '#a855f7' },
  "On Hold":     { bg: '#fef3c7', text: '#92400e', dot: '#f59e0b' },
  "Pending":     { bg: '#f3f4f6', text: '#374151', dot: '#9ca3af' },
}

export default function StatusBadge({ status, size = 'sm' }) {
  const s = STATUS_STYLES[status] || STATUS_STYLES['Pending']
  const pad = size === 'sm' ? '2px 10px' : '4px 14px'
  const fs  = size === 'sm' ? '11px' : '12px'
  return (
    <span style={{ background: s.bg, color: s.text, padding: pad, fontSize: fs,
                   borderRadius: 20, display: 'inline-flex', alignItems: 'center', gap: 5,
                   fontWeight: 500, whiteSpace: 'nowrap' }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: s.dot, flexShrink: 0 }} />
      {status}
    </span>
  )
}
