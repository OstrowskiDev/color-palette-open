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
}

export function SelectField({
  options,
  value,
  setValue,
  label,
}: SelectFieldProps) {
  function onChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const selected = JSON.parse(event.target.value)
    setValue(selected)
  }
  return (
    <Label tailwind="flex flex-row ml-6 ">
      {label && <span className="label mr-2">{label}: </span>}
      <select
        className="select-field px-2 py-[2px] border border-app-gray-600 rounded-md hover:cursor-pointer"
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
