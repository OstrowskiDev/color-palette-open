import { twMerge } from 'tailwind-merge'
import { Label } from './Label'

interface Option {
  value: any
  label: string
  hidden?: boolean
}

interface SelectFieldProps {
  options: Option[]
  value: any
  setValue: (value: any) => void
  label?: string
  labelClasses?: string
  selectClasses?: string
  optionsWidth?: string
}

export function SelectField({
  options,
  value,
  setValue,
  label,
  labelClasses,
  selectClasses,
  optionsWidth = '144px',
}: SelectFieldProps) {
  function onChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const selected = JSON.parse(event.target.value)
    setValue(selected)
  }
  return (
    <Label label={label} labelClasses={labelClasses}>
      <select
        className={twMerge(
          `select-field px-2 text-app-font-light border border-app-gray-600 rounded-md hover:cursor-pointer text-[15px] ${selectClasses}`,
        )}
        style={{ width: optionsWidth }}
        value={JSON.stringify(value)}
        onChange={onChange}
      >
        {options.map((opt, i) => (
          <option
            className="text-app-gray-900"
            key={i}
            value={JSON.stringify(opt.value)}
            hidden={opt?.hidden ?? false}
          >
            {opt.label}
          </option>
        ))}
      </select>
    </Label>
  )
}
