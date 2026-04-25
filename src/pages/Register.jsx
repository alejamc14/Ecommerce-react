import { useCallback, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth/AuthContext";
import Button from "../components/atoms/Button";
import Input from "../components/atoms/Input";

export default function Register() {
  const navigate = useNavigate();
  const { register, isAuthenticated } = useAuth();
  const [error, setError] = useState("");

  if (isAuthenticated) return <Navigate to="/products" replace />;

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setError("");

      const form = new FormData(e.currentTarget);
      const name = String(form.get("name") ?? "").trim();
      const email = String(form.get("email") ?? "").trim();
      const password = String(form.get("password") ?? "");

      const result = register({ name, email, password });
      if (!result.ok) {
        setError(result.error);
        return;
      }
      navigate("/products", { replace: true });
    },
    [navigate, register],
  );

  return (
    <div className="min-h-dvh bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-900">Registro</h1>
        <p className="mt-1 text-sm text-slate-600">Cuenta local persistida en <code>localStorage</code>.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700" htmlFor="name">
              Nombre
            </label>
            <Input
              type="text"
              id="name"
              name="name"
              autoComplete="name"
              required
            />
          </div>

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
              autoComplete="new-password"
              required
              minLength={6}
            />
            <p className="text-xs text-slate-500">Mínimo 6 caracteres.</p>
          </div>

          {error ? (
            <div className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
              {error}
            </div>
          ) : null}

          <Button type="submit" className="w-full">
            Crear cuenta
          </Button>

          <p className="text-sm text-slate-600">
            ¿Ya tenés cuenta?{" "}
            <Link className="font-medium text-slate-900 underline" to="/">
              Ir al login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

