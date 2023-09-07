import { departametsArray, namesDepartamentos } from '../../data/data'

import Select from 'react-select'

interface ComboProps {
  onChange: (e: any) => void
  nameDepartament: string
}
export const ComboBoxDepartamentos = ({
  nameDepartament,
  onChange,
}: ComboProps) => {
  const optionsGenerated = namesDepartamentos.map((departament) => ({
    value: departament,
    label: departament,
  }))

  return (
    <Select
      options={optionsGenerated}
      /* value={nameDepartament} */
      value={
        optionsGenerated.filter((option) => option.value === nameDepartament)[0]
      }
      onChange={onChange}
    />
  )
}
