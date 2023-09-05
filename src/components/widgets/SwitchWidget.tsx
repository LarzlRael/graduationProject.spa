import { useContext } from 'react'
import { HeatSourcesContext } from '../../context/HeatSources/HeatSourceContext'
import { Switch } from '../../form/Switch'

export const SwitchWidget = () => {
  const { showProvinvicaMun, showProvMun } = useContext(HeatSourcesContext)
  return (
    <Switch
      checked={showProvMun}
      onChange={(e) => showProvinvicaMun(e.target.checked)}
      label={`Buscando por ${showProvMun ? 'Provincia' : 'Municipio'}`}
    />
  )
}
