import { Label } from '../ui/Label'

interface InputFieldProps {
  label?: string
  className?: string
  type: string
  min?: number
  max?: number
  value: any
  setValue: (value: any) => void
  labelClasses?: string
  labelWidth?: string
  inputWidth?: string
}

export default function InputField({
  label,
  type,
  min,
  max,
  value,
  setValue,
  labelClasses,
  labelWidth,
  inputWidth = '144px',
}: InputFieldProps) {
  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value)
  }

  return (
    <Label label={label} labelWidth={labelWidth} labelClasses={labelClasses}>
      <input
        className="input-field px-2 text-app-font-light border border-app-gray-600 rounded-md text-[15px]"
        style={{ width: inputWidth }}
        type={type}
        min={min}
        max={max}
        value={value}
        onChange={onChange}
      />
    </Label>
  )
}
