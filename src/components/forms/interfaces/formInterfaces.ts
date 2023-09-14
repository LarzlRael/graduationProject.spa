export interface GlobalFormInterface {
  inputJson: InputJsonI[]
  onSubmit: (data: any) => void
  data?: any
  formTitle?: string
  loading?: boolean
  titleButton?: string
}
export interface InputJsonI {
  type?: string | 'text' | 'number' | 'email' | 'area' | 'select' | 'checkbox'
  name: string
  placeholder?: string
  label?: string
  initialValue?: string | boolean | any[]
  validate?: any
  options?: OptionsI[]
  reference?: string
  condition?: string
}
export interface OptionsI {
  key: string
  value: string
}
