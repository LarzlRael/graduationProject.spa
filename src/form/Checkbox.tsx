interface Props {
  label: string
  isChecked?: boolean
  onChange?: (e: any) => void
}
const Checkbox = ({ label, isChecked,onChange }: Props) => {
  return (
    <div className="checkbox-wrapper">
      <label>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={(e) => onChange!(e)}
        />
        <span>{label}</span>
      </label>
    </div>
  )
}
export default Checkbox
