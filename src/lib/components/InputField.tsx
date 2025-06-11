import { Label } from '../ui/Label'

interface InputFieldProps {
  label?: string
  className?: string
  type: string
  min?: number
  max?: number
  value: any
  setValue: (value: any) => void
}

export default function InputField({
  label,
  type,
  min,
  max,
  value,
  setValue,
}: InputFieldProps) {
  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value)
  }

  return (
    <Label className={`flex flex-row`} label={label}>
      <input
        className="input-field w-36 px-2 text-app-font-light border border-app-gray-600 rounded-md text-[15px]"
        type={type}
        min={min}
        max={max}
        value={value}
        onChange={onChange}
      />
    </Label>
  )
}
