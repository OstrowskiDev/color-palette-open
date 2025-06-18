import { Label } from './Label'

interface Option {
  value: any
  label: string
}

interface SelectFieldProps {
  options: Option[]
  value: any
  setValue: (value: any) => void
  label?: string
  labelWidth?: string
  labelClasses?: string
  optionsWidth?: string
}

export function SelectField({
  options,
  value,
  setValue,
  label,
  labelWidth,
  labelClasses,
  optionsWidth = '144px',
}: SelectFieldProps) {
  function onChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const selected = JSON.parse(event.target.value)
    setValue(selected)
  }
  return (
    <Label label={label} labelWidth={labelWidth} labelClasses={labelClasses}>
      <select
        className="select-field px-2 text-app-font-light border border-app-gray-600 rounded-md hover:cursor-pointer text-[15px]"
        style={{ width: optionsWidth }}
        value={JSON.stringify(value)}
        onChange={onChange}
      >
        {options.map((opt, i) => (
          <option
            className="text-app-gray-900"
            key={i}
            value={JSON.stringify(opt.value)}
          >
            {opt.label}
          </option>
        ))}
      </select>
    </Label>
  )
}
