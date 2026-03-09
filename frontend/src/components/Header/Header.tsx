import { useAuthStore } from "../../store/useAuthStore";
import Button from "../UI/Button";

interface Props {
  onNewTask: () => void;
}

export default function Header({ onNewTask }: Props) {
  const logout = useAuthStore((s) => s.logout);

  return (
    <header className="bg-white border-b border-gray-200 px-6 h-15 flex items-center justify-between shadow-sm">
      <h1 className="m-0 text-xl font-bold text-gray-900">TaskFlow</h1>
      <div className="flex gap-2.5">
        <Button onClick={onNewTask}>+ New Task</Button>
        <Button onClick={logout} variant="secondary">
          Logout
        </Button>
      </div>
    </header>
  );
}
