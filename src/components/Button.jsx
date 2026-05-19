/**
 * Button
 * variant: 'primary' | 'secondary' | 'ghost' | 'danger'
 * size: 'sm' | 'md' | 'lg'
 */
const variants = {
  primary: 'bg-mda-red text-white hover:bg-mda-red-dark border border-transparent',
  secondary: 'bg-white text-mda-red border border-mda-red hover:bg-red-50',
  ghost: 'bg-transparent text-mda-gray-600 border border-mda-gray-200 hover:bg-mda-gray-100',
  danger: 'bg-white text-mda-red border border-mda-red hover:bg-red-50',
}

const sizes = {
  sm: 'text-xs px-3 py-1.5',
  md: 'text-sm px-4 py-2',
  lg: 'text-base px-6 py-2.5',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  onClick,
  type = 'button',
  children,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center gap-2 font-semibold rounded transition-colors
        ${variants[variant]}
        ${sizes[size]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
    >
      {children}
    </button>
  )
}
