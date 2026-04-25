import { Link, useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { useCart } from "../store/cart/CartContext";

export default function Cart() {
  const navigate = useNavigate();
  const { items, totalPrice, setQuantity, removeFromCart, clearCart } = useCart();

  const onQtyChange = useCallback(
    (id, next) => {
      const quantity = Number(next);
      if (Number.isFinite(quantity) && quantity > 0) setQuantity(id, quantity);
    },
    [setQuantity],
  );

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <h1 className="text-xl font-semibold text-slate-900">Tu carrito</h1>
        <p className="mt-2 text-sm text-slate-600">No hay productos cargados.</p>
        <Link
          className="mt-4 inline-flex rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
          to="/products"
        >
          Ver productos
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
      <section className="rounded-2xl border border-slate-200 bg-white">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <h1 className="text-xl font-semibold text-slate-900">Tu carrito</h1>
          <button
            type="button"
            className="text-sm font-medium text-rose-700 hover:underline"
            onClick={clearCart}
          >
            Vaciar
          </button>
        </div>

        <ul className="divide-y divide-slate-200">
          {items.map((it) => (
            <li key={it.id} className="flex gap-4 p-5">
              <img
                src={it.image}
                alt={it.title}
                className="h-20 w-20 rounded-lg border border-slate-200 bg-white object-contain p-2"
                loading="lazy"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-slate-900">{it.title}</p>
                <p className="mt-1 text-sm text-slate-700">${it.price}</p>

                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <label className="text-sm text-slate-600">
                    Cantidad{" "}
                    <input
                      className="ml-2 w-20 rounded-lg border border-slate-300 px-2 py-1 text-sm"
                      type="number"
                      min={1}
                      value={it.quantity}
                      onChange={(e) => onQtyChange(it.id, e.target.value)}
                    />
                  </label>

                  <button
                    type="button"
                    className="text-sm font-medium text-rose-700 hover:underline"
                    onClick={() => removeFromCart(it.id)}
                  >
                    Quitar
                  </button>
                </div>
              </div>

              <div className="text-right">
                <p className="text-sm text-slate-600">Subtotal</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  ${(it.price * it.quantity).toFixed(2)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="text-sm font-semibold text-slate-900">Resumen</h2>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm text-slate-600">Total</span>
          <span className="text-lg font-semibold text-slate-900">${totalPrice.toFixed(2)}</span>
        </div>
        <button
          type="button"
          className="mt-4 w-full rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
          onClick={() => navigate("/checkout")}
        >
          Continuar a checkout
        </button>
        <Link className="mt-3 inline-block text-sm font-medium text-slate-700 hover:underline" to="/products">
          Seguir comprando
        </Link>
      </aside>
    </div>
  );
}

