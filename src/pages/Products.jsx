import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useCart } from "../store/cart/CartContext";
import ProductCard from "../components/molecules/ProductCard";
import Input from "../components/atoms/Input";
import { useProducts } from "../hooks/useProducts";
import Pagination from "../components/molecules/Pagination";
import CategorySelect from "../components/molecules/CategorySelect";
import Alert from "../components/atoms/Alert";

export default function Products() {
  const { addToCart } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();

  const { data: products, loading, error, categories } = useProducts();

  const q = (searchParams.get("q") ?? "").trim();
  const cat = (searchParams.get("cat") ?? "").trim();
  const page = Number(searchParams.get("page") ?? "1") || 1;
  const pageSize = 8;

  const filtered = useMemo(() => {
    const qq = q.toLowerCase();
    return products.filter((p) => {
      if (cat && p.category !== cat) return false;
      if (!qq) return true;
      const hay = `${p.title} ${p.category}`.toLowerCase();
      return hay.includes(qq);
    });
  }, [products, q, cat]);

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

  const onCategoryChange = useCallback(
    (value) => {
      const nextParams = new URLSearchParams(searchParams);
      const v = value.trim();
      if (v) nextParams.set("cat", v);
      else nextParams.delete("cat");
      nextParams.set("page", "1");
      setSearchParams(nextParams, { replace: true });
    },
    [searchParams, setSearchParams],
  );

  if (loading) return <Alert>Cargando...</Alert>;
  if (error)
    return <Alert variant="error">Error: {error}</Alert>;

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Productos</h1>
          <p className="mt-1 text-sm text-slate-600">
            {filtered.length} resultados {q ? <>para “{q}”</> : null}
          </p>
        </div>

        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-end">
          <CategorySelect value={cat} categories={categories} onChange={onCategoryChange} />

          <label className="w-full sm:w-80">
            <span className="text-xs font-medium text-slate-600">Buscar</span>
            <Input
              className="mt-1"
              placeholder="Buscar en tiempo real..."
              value={q}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {paged.map((product) => (
          <ProductCard key={product.id} product={product} onAdd={(p) => addToCart(p, 1)} />
        ))}
      </div>

      <Pagination
        page={safePage}
        totalPages={totalPages}
        onPrev={() => goToPage(safePage - 1)}
        onNext={() => goToPage(safePage + 1)}
      />
    </div>
  );
}
