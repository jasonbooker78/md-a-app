/**
 * Banner — high-priority notification strip
 * variants: 'amendment' (orange), 'sae' (red), 'info' (blue)
 */
export default function Banner({ variant = 'amendment', title, body, action, onAction }) {
  const styles = {
    amendment: {
      wrapper: 'bg-orange-50 border-l-4 border-mda-orange',
      icon: '📋',
      titleColor: 'text-mda-orange',
      bodyColor: 'text-orange-800',
      btn: 'bg-mda-orange hover:bg-orange-700 text-white',
    },
    sae: {
      wrapper: 'bg-red-50 border-l-4 border-mda-red',
      icon: '⚠️',
      titleColor: 'text-mda-red',
      bodyColor: 'text-red-800',
      btn: 'bg-mda-red hover:bg-mda-red-dark text-white',
    },
    info: {
      wrapper: 'bg-blue-50 border-l-4 border-mda-blue',
      icon: 'ℹ️',
      titleColor: 'text-mda-blue',
      bodyColor: 'text-blue-800',
      btn: 'bg-mda-blue hover:bg-blue-800 text-white',
    },
  }

  const s = styles[variant]

  return (
    <div
      className={`${s.wrapper} rounded-r-lg px-5 py-4 flex items-start justify-between gap-4`}
      role={variant === 'sae' ? 'alert' : 'status'}
      aria-live={variant === 'sae' ? 'assertive' : 'polite'}
    >
      <div className="flex items-start gap-3">
        <span className="text-xl mt-0.5" aria-hidden="true">{s.icon}</span>
        <div>
          <p className={`font-semibold text-sm ${s.titleColor}`}>{title}</p>
          {body && <p className={`text-sm mt-0.5 ${s.bodyColor}`}>{body}</p>}
        </div>
      </div>
      {action && (
        <button
          onClick={onAction}
          className={`shrink-0 text-sm font-semibold px-4 py-1.5 rounded ${s.btn} transition-colors`}
        >
          {action}
        </button>
      )}
    </div>
  )
}
