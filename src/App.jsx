import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Register from "./pages/Register.jsx";

function App() {
  return(
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/products" element={<Products/>}/>
      <Route path="/products/:id" element={<ProductDetail/>}/>
    </Routes>
  );
}
export default App