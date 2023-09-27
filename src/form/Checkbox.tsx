import './Checkbox.css'
interface Props {
  label: string
  isChecked?: boolean
  onChange: (e: any) => void
}
const Checkbox = ({ label, isChecked, onChange }: Props) => {
  return (
    <div className="checkbox-wrapper">
      <label>
        <input type="checkbox" checked={isChecked} onChange={onChange} />
        <span className="Checkbox__label">{label}</span>
      </label>
    </div>
  )
}
export default Checkbox
