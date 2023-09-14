interface DrowdownProps {
  options: string[]
  value: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export const Dropdown = ({ options, value, onChange }: DrowdownProps) => {
  return (
    <div>
      <label htmlFor="">Buscar por departamento</label>
      <br />
      <select name="" id="" value={value} onChange={onChange}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      
    </div>
  )
}
