import type { InputTextProps } from '../type/type'

export function InputText({
  id,
  label,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  required = false,
}: InputTextProps) {
  return (
    <div className="flex flex-col mt-4">
      {label && (
        <label htmlFor={id} className="text-md mb-1 font-bold">
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="border-2 p-3 rounded-md text-sm outline-blue-950"
      />
    </div>
  )
}
