import { Label } from '../ui/Label'

interface InputFieldProps {
  label?: string
  className?: string
  value: string
  setValue: (value: string) => void
}

export default function InputField({
  label,
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
        type="text"
        value={value}
        onChange={onChange}
      />
    </Label>
  )
}
