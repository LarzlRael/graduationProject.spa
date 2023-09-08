import { Link, useNavigate } from 'react-router-dom'
import '../styles/ButtonIcons.css'
interface Props {
  to?: string
  icon?: string
  style: React.CSSProperties
}
export const ButtonIcon = ({
  to = '/',
  icon = 'chevron-left',
  style,
}: Props) => {
  const navigator = useNavigate()
  return (
    <div style={style}>
      <button
        onClick={() => (to === '/' ? navigator('/') : navigator(-1))}
        className="ButtonIcon"
      >
        <i className={`fas fa-${icon}`}></i>
      </button>
    </div>
  )
}
