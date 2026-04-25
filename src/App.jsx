import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import {Products}  from "./pages/Products";
import {ProductDetail}  from "./pages/ProductDetail";


function App() {
  return(
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/products" element={<Products/>}>
        <Route path="/:id" element={<ProductDetail/>}/>
      </Route>
    </Routes>
  );
}
export default App