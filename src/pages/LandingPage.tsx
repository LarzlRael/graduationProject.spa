
import { FilledButton } from '../components/widgets/buttons/FilledButton'
import { useNavigate } from 'react-router'
import { Switch } from '../form/Switch'
import { CommonContext } from '../context/commonContext/CommonContext'
import { useContext } from 'react'
import { Header } from '../components/public/Header'

export const LandingPage = () => {
  const navigate = useNavigate()
  const { setTheme, darkTheme } = useContext(CommonContext)
  return (
    <div className="LandingContainer">
      <Header />
      <div className="Landing__info">
        <div className="title">
          <h2 className="Landing__title">Controla y Protege Bolivia</h2>
        </div>
        <div className="Landing__info-container">
          <span>
            Mapeo preciso y alertas instantáneas para prevenir incendios
            forestales y proteger el medio ambiente.
          </span>
          {/* <a
            className="buttonMap"
            href={`${process.env.REACT_APP_SERVER_URL}/maps`}
            target="_blank"
            rel="noreferrer"
          >
            Ir a mapa interactivo
          </a> */}
          <FilledButton
            $margin="20px 0 0 0"
            /* backGroundColor="var(--primary-color)"
            borderRadius="40px" */
            padding="1rem 2rem"
            fontSize="1.2rem"
            /* width="100%" */
            onClick={() => {
              navigate('/mapa')
            }}
          >
            Ir a mapa interactivo
          </FilledButton>
        </div>

        <Switch
          checked={darkTheme}
          onChange={setTheme}
          label={`${darkTheme ? 'Tema oscuro' : 'Tema Claro'}`}
        />
      </div>
    </div>
  )
}
