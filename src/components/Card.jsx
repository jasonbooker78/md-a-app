/**
 * Card — content card with optional colored top border accent
 * accent: 'red' | 'orange' | 'purple' | 'blue' | 'gray' (default)
 */
const accents = {
  red: 'border-t-4 border-t-mda-red',
  orange: 'border-t-4 border-t-mda-orange',
  purple: 'border-t-4 border-t-mda-purple',
  blue: 'border-t-4 border-t-mda-blue',
  gray: 'border-t-4 border-t-mda-gray-200',
  none: '',
}

export default function Card({ accent = 'none', className = '', children }) {
  return (
    <div
      className={`bg-white rounded-lg shadow-sm border border-mda-gray-200 ${accents[accent]} ${className}`}
    >
      {children}
    </div>
  )
}
