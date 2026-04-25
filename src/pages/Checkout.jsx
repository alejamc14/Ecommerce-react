import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../store/cart/CartContext";
import { addOrder } from "../store/orders/ordersStorage";
import Button from "../components/atoms/Button";
import Input from "../components/atoms/Input";

export default function Checkout() {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const [done, setDone] = useState(false);
  const [customer, setCustomer] = useState({ name: "", address: "" });

  useEffect(() => {
    try {
      const raw = localStorage.getItem("checkout_customer");
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object") {
        setCustomer({
          name: String(parsed.name ?? ""),
          address: String(parsed.address ?? ""),
        });
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("checkout_customer", JSON.stringify(customer));
  }, [customer]);

  const lines = useMemo(
    () =>
      items.map((it) => ({
        ...it,
        subtotal: it.price * it.quantity,
      })),
    [items],
  );

  const finalize = useCallback(() => {
    const order = {
      id: crypto.randomUUID(),
      createdAt: Date.now(),
      customer,
      total: totalPrice,
      items: items.map((it) => ({
        id: it.id,
        title: it.title,
        price: it.price,
        quantity: it.quantity,
      })),
    };
    addOrder(order);
    clearCart();
    setDone(true);
  }, [clearCart, customer, items, totalPrice]);

  if (items.length === 0 && !done) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <h1 className="text-xl font-semibold text-slate-900">Checkout</h1>
        <p className="mt-2 text-sm text-slate-600">No hay productos para finalizar.</p>
        <Button className="mt-4" onClick={() => navigate("/products")}>
          Ver productos
        </Button>
      </div>
    );
  }

  if (done) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <h1 className="text-xl font-semibold text-slate-900">Compra simulada</h1>
        <p className="mt-2 text-sm text-slate-600">Listo. Tu compra fue registrada (simulación).</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button onClick={() => navigate("/orders", { replace: true })}>Ver compras</Button>
          <Button variant="secondary" onClick={() => navigate("/products", { replace: true })}>
            Volver a productos
          </Button>
        </div>
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

        <div className="grid gap-3 px-5 py-4 sm:grid-cols-2">
          <label className="space-y-1">
            <span className="text-sm font-medium text-slate-700">Nombre</span>
            <Input
              value={customer.name}
              onChange={(e) => setCustomer((c) => ({ ...c, name: e.target.value }))}
              placeholder="Nombre y apellido"
            />
          </label>
          <label className="space-y-1 sm:col-span-2">
            <span className="text-sm font-medium text-slate-700">Dirección</span>
            <Input
              value={customer.address}
              onChange={(e) => setCustomer((c) => ({ ...c, address: e.target.value }))}
              placeholder="Calle, número, ciudad"
            />
          </label>
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
        <Button className="mt-4 w-full" onClick={finalize} disabled={!customer.name.trim() || !customer.address.trim()}>
          Finalizar compra
        </Button>
        <Button className="mt-3 w-full" variant="secondary" onClick={() => navigate("/cart")}>
          Volver al carrito
        </Button>
      </aside>
    </div>
  );
}

