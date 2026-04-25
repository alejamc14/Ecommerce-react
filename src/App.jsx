import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";

function App() {
  return(
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/products" element={<Products/>}/>
      <Route path="/products/:id" element={<ProductDetail/>}/>
    </Routes>
  );
}
export default App