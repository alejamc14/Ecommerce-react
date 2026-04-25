import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth/AuthContext";
import { useCart } from "../../store/cart/CartContext";

function classNames(...xs) {
  return xs.filter(Boolean).join(" ");
}

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <div className="flex items-center gap-3">
          <Link to="/products" className="text-sm font-semibold text-slate-900">
            E-commerce
          </Link>
          <nav className="hidden items-center gap-1 sm:flex">
            <NavLink
              to="/products"
              className={({ isActive }) =>
                classNames(
                  "rounded-lg px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-100",
                  isActive && "bg-slate-100 text-slate-900",
                )
              }
            >
              Productos
            </NavLink>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                classNames(
                  "rounded-lg px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-100",
                  isActive && "bg-slate-100 text-slate-900",
                )
              }
            >
              Carrito
            </NavLink>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigate("/cart")}
            className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-800 hover:bg-slate-50"
          >
            Carrito <span className="ml-1 rounded-md bg-slate-900 px-2 py-0.5 text-xs text-white">{totalItems}</span>
          </button>
          <div className="hidden text-sm text-slate-600 sm:block">
            {user ? <span className="truncate max-w-48 inline-block">Hola, {user.name}</span> : null}
          </div>
          <button
            type="button"
            onClick={() => {
              logout();
              navigate("/", { replace: true });
            }}
            className="rounded-lg bg-slate-900 px-3 py-1.5 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Salir
          </button>
        </div>
      </div>
    </header>
  );
}

