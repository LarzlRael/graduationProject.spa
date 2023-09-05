import { departametsArray } from '../../data/data'

import Select from 'react-select'

interface ComboProps {
  setState: React.Dispatch<
    React.SetStateAction<{
      departamentSelected: string
      todosDepartamentos: boolean
    }>
  >
  nameDepartament: string
}
export const ComboBoxDepartamentos = ({
  nameDepartament,
  setState,
}: ComboProps) => {
  const optionsGenerated = departametsArray.map((departament) => ({
    value: departament.name,
    label: departament.name,
  }))

  return (
    <Select
      options={optionsGenerated}
      /* value={nameDepartament} */
      value={
        optionsGenerated.filter((option) => option.value === nameDepartament)[0]
      }
      onChange={(e) =>
        setState((previosState) => ({
          ...previosState,
          departamentSelected: e!.value,
          todosDepartamentos: e!.value === 'Bolivia',
        }))
      }
    />
  )
}
