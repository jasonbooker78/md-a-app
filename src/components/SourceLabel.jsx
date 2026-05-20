/**
 * SourceLabel — "Imported from Epic · timestamp" provenance badge
 */
export default function SourceLabel({ source = 'Epic', timestamp }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-mda-blue bg-blue-50 border border-blue-200 rounded px-2 py-0.5">
      <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.172 13.828a4 4 0 015.656 0l4 4a4 4 0 01-5.656 5.656l-1.102-1.101" />
      </svg>
      Imported from {source}{timestamp ? ` · ${timestamp}` : ''}
    </span>
  )
}
