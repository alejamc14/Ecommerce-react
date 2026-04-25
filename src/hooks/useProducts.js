import { useEffect, useMemo, useState } from "react";
import { fetchProducts } from "../services/products";

export function useProducts() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setError("");
    fetchProducts()
      .then((items) => {
        if (!alive) return;
        setData(items);
        setLoading(false);
      })
      .catch((e) => {
        if (!alive) return;
        setError(String(e?.message ?? e));
        setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, []);

  const categories = useMemo(() => {
    const set = new Set(data.map((p) => p.category).filter(Boolean));
    return ["", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, [data]);

  return { data, loading, error, categories };
}

