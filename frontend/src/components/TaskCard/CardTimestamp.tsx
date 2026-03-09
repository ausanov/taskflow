import { formatDate } from "../../helpers/DateHelper";

interface Props {
  date: string;
}

export default function CardTimestamp({ date }: Props) {
  return (
    <p className="mt-2 mb-0 text-[11px] text-gray-300">
      {formatDate(date)}
    </p>
  );
}
