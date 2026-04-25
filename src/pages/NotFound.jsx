import { Link } from "react-router-dom";
import Button from "../components/atoms/Button";

export default function NotFound() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <h1 className="text-xl font-semibold text-slate-900">Página no encontrada</h1>
      <p className="mt-2 text-sm text-slate-600">La ruta que intentaste abrir no existe.</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Link to="/products">
          <Button>Ir a productos</Button>
        </Link>
        <Link to="/">
          <Button variant="secondary">Ir al login</Button>
        </Link>
      </div>
    </div>
  );
}

