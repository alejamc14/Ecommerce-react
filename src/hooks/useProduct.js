import { useEffect, useState } from "react";
import { fetchProductById } from "../services/products";

export function useProduct(id) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    let alive = true;
    setLoading(true);
    setError("");
    fetchProductById(id)
      .then((item) => {
        if (!alive) return;
        setData(item);
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
  }, [id]);

  return { data, loading, error };
}

