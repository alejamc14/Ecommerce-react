import { http } from "./http";

export async function fetchProducts() {
  const { data } = await http.get("/products");
  return data;
}

export async function fetchProductById(id) {
  const { data } = await http.get(`/products/${id}`);
  return data;
}

