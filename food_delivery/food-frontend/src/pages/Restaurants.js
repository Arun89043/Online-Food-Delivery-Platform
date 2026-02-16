import React, { useEffect, useState } from "react";
import { getRestaurants } from "../services/api";
import { Link } from "react-router-dom";

function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    getRestaurants().then(data => setRestaurants(data));
  }, []);

  return (
    <div>

      {/* ================= HERO SECTION ================= */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "60px 80px",
          background: "linear-gradient(135deg, #ff6a00, #ee0979)",
          color: "white"
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "48px",
              fontWeight: "800",
              marginBottom: "15px"
            }}
          >
            Delicious Food Delivered Fast 🍕
          </h1>

          <p
            style={{
              fontSize: "18px",
              opacity: 0.9
            }}
          >
            Order from your favourite restaurants near you
          </p>
        </div>

        <div style={{ display: "flex", gap: "25px" }}>
          <img
            src="https://images.unsplash.com/photo-1604908176997-125f25cc6f3d"
            alt="food1"
            style={{
              width: "220px",
              borderRadius: "20px",
              boxShadow: "0 15px 30px rgba(0,0,0,0.3)",
              transition: "transform 0.3s ease"
            }}
          />
          <img
            src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
            alt="food2"
            style={{
              width: "220px",
              borderRadius: "20px",
              boxShadow: "0 15px 30px rgba(0,0,0,0.3)",
              transition: "transform 0.3s ease"
            }}
          />
        </div>
      </div>

      {/* ================= RESTAURANTS SECTION ================= */}
      <h2
        style={{
          margin: "50px 40px 20px",
          fontSize: "30px",
          fontWeight: "700"
        }}
      >
        Restaurants
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
          gap: "30px",
          padding: "0 40px 60px"
        }}
      >
        {restaurants.map((r) => (
          <div
            key={r.id}
            style={{
              padding: "40px",
              borderRadius: "20px",
              background: "linear-gradient(135deg, #ff6a00, #ff9800)",
              color: "white",
              boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
              position: "relative",
              overflow: "hidden",
              transition: "transform 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-10px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {/* Decorative Glow */}
            <div
              style={{
                position: "absolute",
                top: "-50px",
                right: "-50px",
                width: "200px",
                height: "200px",
                background: "rgba(255,255,255,0.15)",
                borderRadius: "50%",
                filter: "blur(60px)"
              }}
            ></div>

            <h2
              style={{
                fontSize: "28px",
                fontWeight: "800",
                marginBottom: "12px"
              }}
            >
              Arun Malge Biryani Hotel
            </h2>

            <p
              style={{
                fontSize: "16px",
                lineHeight: "1.6",
                marginBottom: "15px"
              }}
            >
              Authentic flavors crafted with tradition and passion.
            </p>

            <p style={{ opacity: 0.9, marginBottom: "25px" }}>
              Banashankari, Bengaluru 560050
            </p>
<div style={{ display: "flex", gap: "15px" }}>

  <Link to={`/menu/${r.id}`}>
    <button
      style={{
        padding: "12px 28px",
        backgroundColor: "white",
        color: "#ff5722",
        border: "none",
        borderRadius: "30px",
        fontWeight: "bold",
        cursor: "pointer"
      }}
    >
      View Menu →
    </button>
  </Link>

  <Link to={`/cooldrinks/${r.id}`}>
    <button
      style={{
        padding: "12px 28px",
        backgroundColor: "#222",
        color: "white",
        border: "none",
        borderRadius: "30px",
        fontWeight: "bold",
        cursor: "pointer"
      }}
    >
      Cool Drinks 🥤
    </button>
  </Link>

</div>

          </div>
        ))}
      </div>

    </div>
  );
}

export default Restaurants;
