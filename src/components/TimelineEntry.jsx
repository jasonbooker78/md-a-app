/**
 * TimelineEntry — one row in a chronological regulatory timeline
 * isHighlighted: boolean — visually calls out the most recent/important entry
 */
const typeColors = {
  activation: 'bg-mda-blue',
  amendment: 'bg-mda-orange',
  consent: 'bg-mda-purple',
  sae: 'bg-mda-red',
  icf: 'bg-mda-purple',
  default: 'bg-mda-gray-400',
}

export default function TimelineEntry({ type = 'default', date, actor, description, isHighlighted = false }) {
  const dotColor = typeColors[type] ?? typeColors.default

  return (
    <div className={`flex gap-4 ${isHighlighted ? 'bg-red-50 -mx-4 px-4 rounded-lg py-3' : 'py-3'}`}>
      {/* Timeline spine */}
      <div className="flex flex-col items-center">
        <div className={`w-3 h-3 rounded-full mt-1 shrink-0 ${dotColor} ${isHighlighted ? 'ring-2 ring-mda-red ring-offset-2' : ''}`} />
        <div className="w-px flex-1 bg-mda-gray-200 mt-1" />
      </div>

      {/* Content */}
      <div className="pb-2 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`text-xs font-semibold uppercase tracking-wide ${isHighlighted ? 'text-mda-red' : 'text-mda-gray-600'}`}>
            {type.toUpperCase()}
          </span>
          <span className="text-xs text-mda-gray-400">{date}</span>
          {actor && <span className="text-xs text-mda-gray-400">· {actor}</span>}
          {isHighlighted && (
            <span className="text-xs font-bold text-mda-red bg-red-100 px-1.5 py-0.5 rounded">NEW</span>
          )}
        </div>
        <p className={`text-sm mt-0.5 ${isHighlighted ? 'text-mda-gray-800 font-medium' : 'text-mda-gray-600'}`}>
          {description}
        </p>
      </div>
    </div>
  )
}
