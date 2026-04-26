import { useCallback, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth/AuthContext";
import Button from "../components/atoms/Button";
import Input from "../components/atoms/Input";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();
  const [error, setError] = useState("");

  const from = location.state?.from || "/products";
  if (isAuthenticated) return <Navigate to={from} replace />;

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setError("");

      const form = new FormData(e.currentTarget);
      const email = String(form.get("email") ?? "").trim();
      const password = String(form.get("password") ?? "");

      const result = login({ email, password });
      if (!result.ok) {
        setError(result.error);
        return;
      }
      navigate(from, { replace: true });
    },
    [from, login, navigate],
  );

  return (
    <div className="min-h-dvh bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-900">Iniciar sesión</h1>
        <p className="mt-1 text-sm text-slate-600">
          Accedé con tu cuenta local.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700" htmlFor="email">
              Email
            </label>
            <Input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700" htmlFor="password">
              Password
            </label>
            <Input
              type="password"
              id="password"
              name="password"
              autoComplete="current-password"
              required
            />
          </div>

          {error ? (
            <div className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
              {error}
            </div>
          ) : null}

          <Button type="submit" className="w-full">
            Entrar
          </Button>

          <p className="text-sm text-slate-600">
            ¿No tenés cuenta?{" "}
            <Link className="font-medium text-slate-900 underline" to="/register">
              Registrate
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
