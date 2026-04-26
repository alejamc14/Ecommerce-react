import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto">
      <div className="mx-auto w-full max-w-6xl px-6 pt-8 pb-6">

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">

          {/* Marca */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 bg-indigo-600 rounded-md flex items-center justify-center text-white text-xs">
                🛍
              </div>
              <span className="font-semibold text-slate-900 text-sm">ShopReact</span>
            </div>
            <p className="text-slate-500 text-xs leading-relaxed mb-3">
              Proyecto E-commerce desarrollado con React, Vite y Tailwind CSS como parte del Fullstack Challenge.
            </p>
            <div className="flex gap-2 flex-wrap">
              {["React", "Vite", "Zustand", "Tailwind"].map(tag => (
                <span key={tag} className="text-xs bg-indigo-50 text-indigo-600 font-medium px-2 py-0.5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Navegación */}
          <div>
            <p className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-3">Navegación</p>
            <div className="flex flex-col gap-2">
              {[
                { label: "Productos", to: "/products" },
                { label: "Carrito", to: "/cart" },
                { label: "Mis compras", to: "/orders" },
              ].map(({ label, to }) => (
                <Link key={to} to={to} className="text-slate-500 hover:text-indigo-600 text-sm transition-colors">
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Recursos */}
          <div>
            <p className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-3">Recursos</p>
            <div className="flex flex-col gap-2">
              {[
                { label: "FakeStore API", url: "https://fakestoreapi.com" },
                { label: "Documentación React", url: "https://react.dev" },
                { label: "GitHub del proyecto", url: "https://github.com/alejamc14/Ecommerce-react" },
              ].map(({ label, url }) => (
                <a key={url} href={url} target="_blank" rel="noreferrer"
                  className="text-slate-500 hover:text-indigo-600 text-sm transition-colors">
                  {label}
                </a>
              ))}
            </div>
          </div>

        </div>

        <div className="border-t border-slate-100 pt-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-xs text-slate-400">© 2025 ShopReact — Proyecto educativo Fullstack Challenge</p>
          <p className="text-xs text-slate-400">Hecho con React + Vite</p>
        </div>

      </div>
    </footer>
  );
}