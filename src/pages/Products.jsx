import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useCart } from "../store/cart/CartContext";

export default function Products() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const q = (searchParams.get("q") ?? "").trim();
  const page = Number(searchParams.get("page") ?? "1") || 1;
  const pageSize = 8;

  useEffect(() => {
    let alive = true;
    setLoading(true);
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        if (!alive) return;
        setProducts(response.data);
        setLoading(false);
      })
      .catch((err) => {
        if (!alive) return;
        setError(err.message);
        setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, []);

  const filtered = useMemo(() => {
    const qq = q.toLowerCase();
    if (!qq) return products;
    return products.filter((p) => {
      const hay = `${p.title} ${p.category}`.toLowerCase();
      return hay.includes(qq);
    });
  }, [products, q]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);

  const paged = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, safePage]);

  const goToPage = useCallback(
    (next) => {
      const n = Math.min(Math.max(1, next), totalPages);
      const nextParams = new URLSearchParams(searchParams);
      nextParams.set("page", String(n));
      setSearchParams(nextParams, { replace: true });
    },
    [searchParams, setSearchParams, totalPages],
  );

  const onSearchChange = useCallback(
    (value) => {
      const nextParams = new URLSearchParams(searchParams);
      const v = value.trim();
      if (v) nextParams.set("q", v);
      else nextParams.delete("q");
      nextParams.set("page", "1");
      setSearchParams(nextParams, { replace: true });
    },
    [searchParams, setSearchParams],
  );

  if (loading) return <div className="rounded-2xl border border-slate-200 bg-white p-6">Cargando...</div>;
  if (error)
    return (
      <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-rose-800">
        Error: {error}
      </div>
    );

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Productos</h1>
          <p className="mt-1 text-sm text-slate-600">
            {filtered.length} resultados {q ? <>para “{q}”</> : null}
          </p>
        </div>

        <label className="w-full sm:w-80">
          <span className="sr-only">Buscar</span>
          <input
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-slate-400"
            placeholder="Buscar en tiempo real..."
            value={q}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </label>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {paged.map((product) => (
          <article
            key={product.id}
            className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <button
              type="button"
              className="w-full text-left"
              onClick={() => navigate(`/products/${product.id}`)}
            >
              <img
                src={product.image}
                alt={product.title}
                className="h-44 w-full rounded-xl border border-slate-100 bg-white object-contain p-4"
                loading="lazy"
              />
              <h3 className="mt-3 line-clamp-2 text-sm font-semibold text-slate-900 group-hover:underline">
                {product.title}
              </h3>
              <p className="mt-2 text-sm font-semibold text-slate-900">${product.price}</p>
              <p className="mt-1 text-xs text-slate-600">{product.category}</p>
            </button>

            <div className="mt-3 flex items-center gap-2">
              <button
                type="button"
                className="flex-1 rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white hover:bg-slate-800"
                onClick={() => addToCart(product, 1)}
              >
                Agregar
              </button>
              <Link
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50"
                to={`/products/${product.id}`}
              >
                Ver
              </Link>
            </div>
          </article>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <button
          type="button"
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 disabled:opacity-50"
          onClick={() => goToPage(safePage - 1)}
          disabled={safePage <= 1}
        >
          Anterior
        </button>
        <p className="text-sm text-slate-600">
          Página <span className="font-semibold text-slate-900">{safePage}</span> / {totalPages}
        </p>
        <button
          type="button"
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 disabled:opacity-50"
          onClick={() => goToPage(safePage + 1)}
          disabled={safePage >= totalPages}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
