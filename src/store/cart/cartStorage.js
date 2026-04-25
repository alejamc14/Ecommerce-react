import { getJson, setJson } from "../storage";

const CART_KEY = "cart";

export function getCart() {
  return getJson(CART_KEY, []);
}

export function saveCart(cart) {
  setJson(CART_KEY, cart);
}

