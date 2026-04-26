import { Link, NavLink, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../store/auth/AuthContext";
import { useCart } from "../../store/cart/CartContext";

function classNames(...xs) {
  return xs.filter(Boolean).join(" ");
}

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const [q, setQ] = useState("");

  useEffect(() => {
    if (!location.pathname.startsWith("/products")) return;
    setQ((searchParams.get("q") ?? "").trim());
  }, [location.pathname, searchParams]);

  const onSearchChange = useCallback((value) => {
    setQ(value);
    const nextParams = new URLSearchParams(searchParams);
    const v = value.trim();
    if (v) nextParams.set("q", v);
    else nextParams.delete("q");
    nextParams.set("page", "1");
    navigate(`/products?${nextParams.toString()}`, {
      replace: location.pathname.startsWith("/products"),
    });
  }, [location.pathname, navigate, searchParams]);

  const initials = user?.name
    ? user.name.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase()
    : "?";

  return (
    <header className="sticky top-0 z-10 bg-white border-b border-slate-200">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 h-14">

        {/* Logo + Nav */}
        <div className="flex items-center gap-6">
          <Link to="/products" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center text-white text-sm">
              🛍
            </div>
            <span className="font-semibold text-slate-900 text-sm">ShopReact</span>
          </Link>

          <nav className="hidden sm:flex items-center gap-1">
            <NavLink to="/products" className={({ isActive }) =>
              classNames("flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors",
                isActive ? "bg-indigo-50 text-indigo-700 font-medium" : "text-slate-600 hover:bg-slate-100")}>
              Productos
            </NavLink>
            <NavLink to="/cart" className={({ isActive }) =>
              classNames("flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors",
                isActive ? "bg-indigo-50 text-indigo-700 font-medium" : "text-slate-600 hover:bg-slate-100")}>
              Carrito
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-indigo-600 text-white text-xs font-medium">
                {totalItems}
              </span>
            </NavLink>
            <NavLink to="/orders" className={({ isActive }) =>
              classNames("px-3 py-1.5 rounded-lg text-sm transition-colors",
                isActive ? "bg-indigo-50 text-indigo-700 font-medium" : "text-slate-600 hover:bg-slate-100")}>
              Compras
            </NavLink>
          </nav>
        </div>

        {/* Buscador + usuario + botón */}
        <div className="flex items-center gap-3">
          <div className="relative hidden sm:block">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔍</span>
            <input
              className="w-52 pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 text-sm text-slate-900 bg-white outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition"
              placeholder="Buscar productos..."
              value={q}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs font-semibold">
              {initials}
            </div>
            {user && (
              <span className="text-sm text-slate-600 max-w-[120px] truncate">
                {user.name}
              </span>
            )}
          </div>

          <button
            onClick={() => { logout(); navigate("/", { replace: true }); }}
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-1.5 rounded-lg transition-colors"
          >
            Salir
          </button>
        </div>

      </div>
    </header>
  );
}