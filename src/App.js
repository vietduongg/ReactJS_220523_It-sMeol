import "./App.css";
import { createContext, useState } from "react";

//Import Components
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import { Routes, Route } from "react-router-dom";
import Product from "./Components/Product";
import DetailProduct from "./Components/DetailProduct";
import ProtectedRoutes from "./protectedRouter";
import Cart from "./Components/Cart";

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState({ loggedIn: false });
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="products" element={<Product />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="products/:id" element={<DetailProduct />} />
          <Route path="cart" element={<Cart />} />
        </Route>
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
