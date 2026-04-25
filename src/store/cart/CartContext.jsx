import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from "react";
import { getCart, saveCart } from "./cartStorage";

function calcTotals(items) {
  const totalItems = items.reduce((acc, it) => acc + it.quantity, 0);
  const totalPrice = items.reduce((acc, it) => acc + it.quantity * it.price, 0);
  return { totalItems, totalPrice };
}

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const { product, quantity } = action.payload;
      const existing = state.items.find((it) => it.id === product.id);
      const nextItems = existing
        ? state.items.map((it) =>
            it.id === product.id ? { ...it, quantity: it.quantity + quantity } : it,
          )
        : [
            ...state.items,
            {
              id: product.id,
              title: product.title,
              price: product.price,
              image: product.image,
              quantity,
            },
          ];
      return { items: nextItems };
    }
    case "SET_QTY": {
      const { id, quantity } = action.payload;
      const q = Math.max(1, quantity);
      return { items: state.items.map((it) => (it.id === id ? { ...it, quantity: q } : it)) };
    }
    case "REMOVE": {
      const { id } = action.payload;
      return { items: state.items.filter((it) => it.id !== id) };
    }
    case "CLEAR":
      return { items: [] };
    default:
      return state;
  }
}

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, undefined, () => ({
    items: getCart(),
  }));

  const persist = useCallback((nextItems) => saveCart(nextItems), []);

  const addToCart = useCallback(
    (product, quantity = 1) => {
      dispatch({ type: "ADD", payload: { product, quantity } });
    },
    [dispatch],
  );

  const setQuantity = useCallback((id, quantity) => {
    dispatch({ type: "SET_QTY", payload: { id, quantity } });
  }, []);

  const removeFromCart = useCallback((id) => {
    dispatch({ type: "REMOVE", payload: { id } });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR" });
  }, []);

  const items = state.items;
  const totals = useMemo(() => calcTotals(items), [items]);

  const value = useMemo(
    () => ({
      items,
      ...totals,
      addToCart,
      setQuantity,
      removeFromCart,
      clearCart,
      persist,
    }),
    [addToCart, clearCart, items, removeFromCart, setQuantity, totals, persist],
  );

  useEffect(() => {
    persist(items);
  }, [items, persist]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de CartProvider");
  return ctx;
}

