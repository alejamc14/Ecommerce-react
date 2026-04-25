import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../store/cart/CartContext";

export default function Checkout() {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const [done, setDone] = useState(false);

  const lines = useMemo(
    () =>
      items.map((it) => ({
        ...it,
        subtotal: it.price * it.quantity,
      })),
    [items],
  );

  if (items.length === 0 && !done) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <h1 className="text-xl font-semibold text-slate-900">Checkout</h1>
        <p className="mt-2 text-sm text-slate-600">No hay productos para finalizar.</p>
        <button
          type="button"
          className="mt-4 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
          onClick={() => navigate("/products")}
        >
          Ver productos
        </button>
      </div>
    );
  }

  if (done) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <h1 className="text-xl font-semibold text-slate-900">Compra simulada</h1>
        <p className="mt-2 text-sm text-slate-600">Listo. Tu compra fue registrada (simulación).</p>
        <button
          type="button"
          className="mt-4 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
          onClick={() => navigate("/products", { replace: true })}
        >
          Volver a productos
        </button>
      </div>
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
      <section className="rounded-2xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 px-5 py-4">
          <h1 className="text-xl font-semibold text-slate-900">Checkout</h1>
          <p className="mt-1 text-sm text-slate-600">Previsualización antes de finalizar (simulado).</p>
        </div>

        <ul className="divide-y divide-slate-200">
          {lines.map((it) => (
            <li key={it.id} className="flex items-center justify-between gap-4 p-5">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-900">{it.title}</p>
                <p className="mt-1 text-sm text-slate-600">
                  ${it.price} × {it.quantity}
                </p>
              </div>
              <p className="text-sm font-semibold text-slate-900">${it.subtotal.toFixed(2)}</p>
            </li>
          ))}
        </ul>
      </section>

      <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="text-sm font-semibold text-slate-900">Total</h2>
        <p className="mt-2 text-2xl font-semibold text-slate-900">${totalPrice.toFixed(2)}</p>
        <button
          type="button"
          className="mt-4 w-full rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
          onClick={() => {
            clearCart();
            setDone(true);
          }}
        >
          Finalizar compra
        </button>
        <button
          type="button"
          className="mt-3 w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
          onClick={() => navigate("/cart")}
        >
          Volver al carrito
        </button>
      </aside>
    </div>
  );
}

