import { useAuthStore } from "./store/useAuthStore";
import LoginForm from "./components/Auth/LoginForm";
import Board from "./components/Kanban/Board/Board";
import ErrorBoundary from "./components/UI/ErrorBoundary";

export default function App() {
  const authed = useAuthStore((s) => s.authed);

  return (
    <ErrorBoundary>
      {authed ? <Board /> : <LoginForm />}
    </ErrorBoundary>
  );
}
