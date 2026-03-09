interface Props {
  text?: string;
}

export default function CardDescription({ text }: Props) {
  if (!text) return null;

  return (
    <p className="mt-1.5 mb-0 text-xs text-gray-400 leading-snug">
      {text}
    </p>
  );
}
