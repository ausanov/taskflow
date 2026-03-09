interface Props {
  onClick: () => void;
  variant?: "primary" | "secondary" | "link" | "icon";
  disabled?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}

const VARIANTS = {
  primary:
    "px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white border-none rounded-lg cursor-pointer disabled:cursor-not-allowed text-sm font-semibold transition-colors",
  secondary:
    "px-4 py-1.5 bg-transparent text-gray-400 border border-gray-200 rounded-lg cursor-pointer text-sm hover:bg-gray-50 transition-colors",
  link:
    "bg-transparent border-none text-indigo-600 cursor-pointer font-semibold p-0 hover:underline text-sm",
  icon:
    "bg-transparent border-none cursor-pointer text-gray-300 hover:text-red-400 text-lg pl-2 leading-none shrink-0 transition-colors",
};

export default function Button({
  onClick,
  variant = "primary",
  disabled = false,
  fullWidth = false,
  children,
}: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${VARIANTS[variant]} ${fullWidth ? "w-full py-3 text-[15px]" : ""}`}
    >
      {children}
    </button>
  );
}
