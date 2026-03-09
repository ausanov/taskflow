interface Props {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  placeholder?: string;
  autoFocus?: boolean;
  className?: string;
  required?: boolean;
  type?: "text" | "email" | "password";
}

export default function FormField({
  label,
  value,
  onChange,
  onSubmit,
  placeholder,
  autoFocus,
  className = "",
  required = false,
  type = "text",
}: Props) {
  return (
    <div className={className}>
      <label className="text-xs font-semibold text-gray-500 block mb-1">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={
          onSubmit ? (e) => e.key === "Enter" && onSubmit() : undefined
        }
        placeholder={placeholder}
        autoFocus={autoFocus}
        className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
      />
    </div>
  );
}
