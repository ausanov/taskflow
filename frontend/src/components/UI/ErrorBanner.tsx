interface Props {
  message: string;
  onDismiss: () => void;
}

export default function ErrorBanner({ message, onDismiss }: Props) {
  return (
    <div className="bg-red-50 text-red-600 px-4 py-2.5 rounded-lg mb-4 border border-red-200 flex justify-between items-center">
      <span>{message}</span>
      <button
        onClick={onDismiss}
        className="bg-transparent border-none cursor-pointer text-red-600 text-lg"
      >
        &times;
      </button>
    </div>
  );
}
