import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../store/cart/CartContext";

export default function ProductDetail() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((response) => {
        if (!alive) return;
        setProduct(response.data);
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
  }, [id]);

  const handleAdd = useCallback(() => {
    if (!product) return;
    addToCart(product, 1);
    navigate("/cart");
  }, [addToCart, navigate, product]);

  if (loading) return <div className="rounded-2xl border border-slate-200 bg-white p-6">Cargando...</div>;
  if (error)
    return (
      <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-rose-800">
        Error: {error}
      </div>
    );

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <img
          src={product.image}
          alt={product.title}
          className="h-96 w-full rounded-xl border border-slate-100 bg-white object-contain p-6"
        />
      </div>

      <div className="space-y-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex items-center justify-between gap-3">
            <h1 className="text-xl font-semibold text-slate-900">{product.title}</h1>
            <span className="text-xl font-semibold text-slate-900">${product.price}</span>
          </div>
          <p className="mt-2 text-sm text-slate-600">{product.category}</p>
          <p className="mt-4 text-sm text-slate-700">{product.description}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            <button
              type="button"
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
              onClick={handleAdd}
            >
              Agregar al carrito
            </button>
            <Link
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
              to="/products"
            >
              Volver
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}