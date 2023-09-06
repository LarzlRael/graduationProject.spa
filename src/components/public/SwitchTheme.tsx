import { useTheme } from '../../hooks/useTheme'
import { Switch } from '../../form/Switch'
export const SwitchTheme = () => {
  const { darkTheme, setTheme } = useTheme()
  return (
    <div>
      <div className="switchContainer">
        <Switch
          checked={darkTheme}
          onChange={setTheme}
          label={`${darkTheme ? 'Tema oscuro' : 'Tema Claro'}`}
        />
      </div>
    </div>
  )
}
