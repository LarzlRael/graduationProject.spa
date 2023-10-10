import { Link, useNavigate } from 'react-router-dom'
import '../styles/ButtonIcons.css'
interface Props {
  to?: string
  icon?: string
  style?: React.CSSProperties
  className?: string
  $color?: string
}
export const ButtonIcon = ({
  to,
  icon = 'chevron-left',
  style,
  className,
  $color = 'var(--primary-color)',
}: Props) => {
  const navigator = useNavigate()
  return (
    <div style={style} className={className}>
      <button
        onClick={() => (to ? navigator('/') : navigator(-1))}
        className="ButtonIcon"
      >
        <i className={`fas fa-${icon}`} style={{ color: $color }}></i>
      </button>
    </div>
  )
}
