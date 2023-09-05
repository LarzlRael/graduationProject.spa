import { Header } from '../components/Header'
import { SwitchTheme } from '../components/public/SwitchTheme'
import { FilledButton } from '../components/widgets/buttons/FilledButton'

export const LandingPage = () => {
  return (
    <div className="landingContainer">
      <Header />
      <div className="info">
        <div className="title">
          <h2>See the world</h2>
        </div>
        <div className="info-container">
          <span>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Voluptatibus illum labore vitae cumque. Ab ullam officia molestias
            blanditiis, ex aut quisquam.
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
            margin="20px 0 0 0"
            backGroundColor="var(--primary-color)"
            padding="1rem 2rem"
            borderRadius="40px"
            fontSize="1.2rem"
            /* width="100%" */
            onClick={() => {
              window.open(`${process.env.REACT_APP_SERVER_URL}/maps`, '_blank')
            }}
          >
            Ir a mapa interactivo
          </FilledButton>
        </div>

        <SwitchTheme />
      </div>
    </div>
  )
}
