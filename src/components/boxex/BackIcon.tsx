import { FaChevronCircleLeft } from 'react-icons/fa'
/* import './BackIcon.scss' */
import { useNavigate } from 'react-router-dom'
import ToolTip from './ToolTip'
import styled from 'styled-components'
interface BackIconProps {
  onClick?: () => void
}
const BackButtonStyled = styled.button`
  text-align: start;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  background: var(--white);
  width: fit-content;
  padding: 5px 10px;
  border-radius: 10px;
  color: var(--secondary-color);
  border: 1px solid var(--secondary-color);
  display: flex;
  align-items: center;
  gap: 5px;
  transition: all 0.3s ease;

  &:hover {
    color: var(--secondary-color-hover);
    border: 1px solid var(--secondary-color-hover);
  }
  .BackIcon i {
    font-size: 2rem;
  }
`
const BackIcon = ({ onClick }: BackIconProps) => {
  const navigate = useNavigate()
  const handleClick = () => {
    if (onClick) {
      onClick()
    } else {
      navigate(-1)
    }
  }

  return (
    <ToolTip content="Volver">
      <BackButtonStyled className="BackIcon" onClick={handleClick}>
        <FaChevronCircleLeft size={20} />
        <span>Volver</span>
      </BackButtonStyled>
    </ToolTip>
  )
}

export default BackIcon
