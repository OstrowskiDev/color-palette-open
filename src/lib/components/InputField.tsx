import { twMerge } from 'tailwind-merge'
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
  inputTailwind?: string
}

export default function InputField({
  label,
  type,
  min,
  max,
  value,
  setValue,
  labelClasses,
  inputTailwind,
}: InputFieldProps) {
  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value)
  }

  return (
    <Label label={label} labelClasses={labelClasses}>
      <input
        className={`input-field ${twMerge(`w-36 px-2 text-app-font-light border border-app-gray-600 rounded-md text-[15px] ${inputTailwind}`)} `}
        type={type}
        min={min}
        max={max}
        value={value}
        onChange={onChange}
      />
    </Label>
  )
}
