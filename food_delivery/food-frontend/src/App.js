import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Restaurants from "./pages/Restaurants";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import MyOrders from "./pages/MyOrders";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import CoolDrinks from "./pages/CoolDrinks";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Restaurants />} />
        <Route path="/menu/:id" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<MyOrders />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cooldrinks/:id" element={<CoolDrinks />} />

      </Routes>
    </Router>
  );
}

export default App;
