import { useCallback, useState } from "react";
import { authApi } from "../../api/authService";
import { useAuthStore } from "../../store/useAuthStore";
import FormField from "../UI/FormField";
import Button from "../UI/Button";
import ErrorBanner from "../UI/ErrorBanner";

export default function LoginForm() {
  const login = useAuthStore((s) => s.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(async () => {
    if (!email || !password) return setError("Please fill in all fields");
    setLoading(true);
    setError("");

    try {
      const { data } = isRegister
        ? await authApi.register(email, password, displayName || email.split("@")[0])
        : await authApi.login(email, password);

      login(data.token);
    } catch {
      setError(
        isRegister
          ? "Registration failed. Try a different email."
          : "Invalid email or password.",
      );
    } finally {
      setLoading(false);
    }
  }, [email, password, displayName, isRegister, login]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-sans">
      <div className="w-[420px] p-10 bg-white rounded-2xl shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="m-0 text-3xl font-bold text-gray-900">TaskFlow</h1>
          <p className="mt-2 text-gray-400 text-sm">
            {isRegister ? "Create your account" : "Sign in to your board"}
          </p>
        </div>

        {error && <ErrorBanner message={error} onDismiss={() => setError("")} />}

        <FormField
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="Email address"
          className="mt-2.5"
        />
        <FormField
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
          onSubmit={!isRegister ? handleSubmit : undefined}
          placeholder="Password"
          className="mt-2.5"
        />
        {isRegister && (
          <FormField
            label="Display name"
            value={displayName}
            onChange={setDisplayName}
            onSubmit={handleSubmit}
            placeholder="Display name (optional)"
            className="mt-2.5"
          />
        )}

        <div className="mt-5">
          <Button onClick={handleSubmit} disabled={loading} fullWidth>
            {loading ? "Please wait..." : isRegister ? "Create Account" : "Sign In"}
          </Button>
        </div>

        <p className="text-center mt-5 text-sm text-gray-400">
          {isRegister ? "Already have an account? " : "Don't have an account? "}
          <Button onClick={() => { setIsRegister(!isRegister); setError(""); }} variant="link">
            {isRegister ? "Sign in" : "Register"}
          </Button>
        </p>
      </div>
    </div>
  );
}
