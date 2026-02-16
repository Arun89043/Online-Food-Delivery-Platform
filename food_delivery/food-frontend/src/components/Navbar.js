import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../services/CartContext";

function Navbar() {
  const { cart } = useContext(CartContext);

  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      padding: "15px 30px",
      background: "#ff5722",
      color: "white",
      alignItems: "center"
    }}>
      <Link to="/" style={{color:"white", textDecoration:"none"}}>
        <h2>FoodExpress 🍔</h2>
      </Link>

      <div style={{display:"flex", gap:"20px"}}>
        <Link to="/orders" style={{color:"white", textDecoration:"none"}}>
          My Orders
        </Link>

        <Link to="/cart" style={{color:"white", textDecoration:"none"}}>
          Cart 🛒 ({cart.length})
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
