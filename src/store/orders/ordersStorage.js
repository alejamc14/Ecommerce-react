import { getJson, setJson } from "../storage";

const ORDERS_KEY = "orders";

export function getOrders() {
  return getJson(ORDERS_KEY, []);
}

export function addOrder(order) {
  const prev = getOrders();
  const next = [order, ...prev];
  setJson(ORDERS_KEY, next);
  return next;
}

