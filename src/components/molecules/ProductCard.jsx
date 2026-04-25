import { Link, useNavigate } from "react-router-dom";
import Button from "../atoms/Button";

export default function ProductCard({ product, onAdd }) {
  const navigate = useNavigate();

  return (
    <article className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <button
        type="button"
        className="w-full flex-1 text-left"
        onClick={() => navigate(`/products/${product.id}`)}
      >
        <img
          src={product.image}
          alt={product.title}
          className="h-44 w-full rounded-xl border border-slate-100 bg-white object-contain p-4"
          loading="lazy"
        />
        <h3 className="mt-3 min-h-10 line-clamp-2 text-sm font-semibold text-slate-900 group-hover:underline">
          {product.title}
        </h3>
        <div className="mt-2 flex items-end justify-between gap-2">
          <p className="text-sm font-semibold text-slate-900">${product.price}</p>
          <p className="text-xs text-slate-600">{product.category}</p>
        </div>
      </button>

      <div className="mt-3 flex items-center gap-2">
        <Button className="flex-1" size="sm" onClick={() => onAdd(product)}>
          Agregar
        </Button>
        <Link
          className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 hover:bg-slate-50"
          to={`/products/${product.id}`}
        >
          Ver
        </Link>
      </div>
    </article>
  );
}

