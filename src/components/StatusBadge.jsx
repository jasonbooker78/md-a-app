/**
 * StatusBadge
 * variants: 'acknowledged', 'pending', 'sae', 'reminder'
 */
const config = {
  acknowledged: {
    label: 'Acknowledged ✓',
    classes: 'bg-green-100 text-green-800 border-green-200',
  },
  pending: {
    label: 'Pending',
    classes: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  },
  sae: {
    label: 'SAE',
    classes: 'bg-red-100 text-mda-red border-red-200 font-bold',
  },
  reminder: {
    label: 'Reminder queued',
    classes: 'bg-orange-100 text-mda-orange border-orange-200',
  },
}

export default function StatusBadge({ variant, label: labelOverride }) {
  const { label, classes } = config[variant] ?? { label: labelOverride ?? variant, classes: 'bg-mda-gray-100 text-mda-gray-600 border-mda-gray-200' }
  return (
    <span className={`inline-block text-xs font-medium px-2.5 py-0.5 rounded-full border ${classes}`}>
      {labelOverride ?? label}
    </span>
  )
}
