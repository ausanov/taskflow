interface Props {
  children: React.ReactNode;
}

export default function CardTitle({ children }: Props) {
  return (
    <p className="m-0 font-medium text-sm text-gray-900 flex-1 leading-snug">
      {children}
    </p>
  );
}
