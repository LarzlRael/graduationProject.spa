import { FaChevronLeft } from 'react-icons/fa'
import './NotFound.css'

import { useNavigate } from 'react-router-dom'
import { FilledButton } from '../buttons/FilledButton'

interface NotFoundProps {
  title: string
  subtitle: string
  showButtonBack?: boolean
  ref?: any
}
const NotFound = ({ title, subtitle, showButtonBack, ref }: NotFoundProps) => {
  return (
    <div className="not-found" ref={ref}>
      <div className="not-found__content">
        <img
          src="https://cdn-icons-png.flaticon.com/512/6179/6179016.png"
          alt="Not Found"
          className="not-found__icon"
        />
        <h1 className="not-found__title">{title}</h1>
        <p className="not-found__subtitle">{subtitle}</p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {showButtonBack && <ButtonBack />}
        </div>
      </div>
    </div>
  )
}

export const ButtonBack = () => {
  const navigate = useNavigate()
  return (
    <FilledButton
      onClick={() => navigate(-1)}
      padding="1rem 4rem"
      /* margin="2rem 0" */
      /* background="var(--secondary-color)" */
      borderRadius="15px"
    >
      <FaChevronLeft />
      Regresar
    </FilledButton>
  )
}

export default NotFound
