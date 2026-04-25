import { useMemo } from "react";
import { Link } from "react-router-dom";
import { getOrders } from "../store/orders/ordersStorage";
import Button from "../components/atoms/Button";

export default function Orders() {
  const orders = useMemo(() => getOrders(), []);

  if (orders.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <h1 className="text-xl font-semibold text-slate-900">Mis compras</h1>
        <p className="mt-2 text-sm text-slate-600">Todavía no hay compras registradas.</p>
        <Link to="/products" className="mt-4 inline-block">
          <Button>Ver productos</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white">
      <div className="border-b border-slate-200 px-5 py-4">
        <h1 className="text-xl font-semibold text-slate-900">Mis compras</h1>
        <p className="mt-1 text-sm text-slate-600">Historial guardado en <code>localStorage</code>.</p>
      </div>

      <ul className="divide-y divide-slate-200">
        {orders.map((o) => (
          <li key={o.id} className="p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm font-semibold text-slate-900">Orden #{o.id.slice(0, 8)}</p>
              <p className="text-sm font-semibold text-slate-900">${Number(o.total).toFixed(2)}</p>
            </div>
            <p className="mt-1 text-xs text-slate-600">{new Date(o.createdAt).toLocaleString()}</p>
            <p className="mt-3 text-sm text-slate-700">
              {o.items.length} ítems
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

