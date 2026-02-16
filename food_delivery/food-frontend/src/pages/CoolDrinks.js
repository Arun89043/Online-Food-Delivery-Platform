import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { CartContext } from "../services/CartContext";
import "./Menu.css";

/* Import all cool drink images */
import cocaCola from "../assets/cooldrinks/coca-cola.png";
import pepsi from "../assets/cooldrinks/pepsi.png";
import sprite from "../assets/cooldrinks/sprite.png";
import fanta from "../assets/cooldrinks/fanta.png";
import thumbsUp from "../assets/cooldrinks/thumbs-up.png";
import lemonSoda from "../assets/cooldrinks/lemon-soda.png";
import butterMilk from "../assets/cooldrinks/butter-milk.png";
import mangoJuice from "../assets/cooldrinks/mango-juice.png";
import waterBottle from "../assets/cooldrinks/water-bottle.png";
import coldCoffee from "../assets/cooldrinks/cold-coffee.png";

function CoolDrinks() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/restaurants/${id}/menu/?category=drink`)
      .then(res => res.json())
      .then(data => setDrinks(data));
  }, [id]);

  /* Map drink name to image */
  const imageMap = {
    "Coca Cola": cocaCola,
    "Pepsi": pepsi,
    "Sprite": sprite,
    "Fanta": fanta,
    "Thumbs Up": thumbsUp,
    "Lemon Soda": lemonSoda,
    "Butter Milk": butterMilk,
    "Mango Juice": mangoJuice,
    "Water Bottle": waterBottle,
    "Cold Coffee": coldCoffee,
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2 style={{ marginBottom: "20px" }}>
        Cool Drinks Menu 🥤
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px"
        }}
      >
        {drinks.map(item => (
          <div
            key={item.id}
            style={{
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
              backgroundColor: "#fff",
              transition: "all 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow =
                "0 14px 28px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 6px 18px rgba(0,0,0,0.08)";
            }}
          >
            <img
              src={imageMap[item.name]}
              alt={item.name}
              style={{
                width: "100%",
                height: "180px",
                objectFit: "cover"
              }}
            />

            <div style={{ padding: "15px" }}>
              <h4>{item.name}</h4>
              <p style={{ fontWeight: "bold", margin: "8px 0" }}>
                ₹ {item.price}
              </p>

              <button
                onClick={() => addToCart(item)}
                style={{
                  width: "100%",
                  padding: "8px",
                  backgroundColor: "#ff5722",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "bold"
                }}
              >
                Add to Cart 🛒
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <Link to="/cart">
          <button
            style={{
              padding: "10px 20px",
              backgroundColor: "#ff9800",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            Go To Cart →
          </button>
        </Link>
      </div>
    </div>
  );
}

export default CoolDrinks;
