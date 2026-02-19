import React, { useContext, useState } from "react";
import { CartContext } from "../services/CartContext";
import { useNavigate } from "react-router-dom";
import { authFetch } from "../services/authFetch";

function Cart() {
  const { cart, setCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  // Remove Item
  const removeItem = (indexToRemove) => {
    const updatedCart = cart.filter((_, index) => index !== indexToRemove);
    setCart(updatedCart);
  };

  // Place Order (Uses authFetch ✅)
  const placeOrder = async () => {
    if (cart.length === 0) return;

    setLoading(true);

    try {
      const response = await authFetch(
        "http://127.0.0.1:8000/api/orders/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            items: cart.map((item) => ({
              menu_item_id: item.id,
              quantity: 1,
            })),
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Order Confirmed 🎉 Order ID: " + data.order_id);
        setCart([]);
        navigate("/orders");
      } else {
        alert("Error: " + JSON.stringify(data));
      }
    } catch (error) {
      alert("Server Error");
      console.log(error);
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "40px", maxWidth: "1000px", margin: "auto" }}>
      <h2 style={{ marginBottom: "30px" }}>🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 0" }}>
          <p style={{ fontSize: "18px", color: "#777" }}>
            Your cart is empty.
          </p>
        </div>
      ) : (
        <>
          {cart.map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "20px",
                marginBottom: "20px",
                borderRadius: "16px",
                backgroundColor: "#fff",
                boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
                transition: "all 0.3s ease",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: "90px",
                      height: "90px",
                      objectFit: "cover",
                      borderRadius: "12px",
                    }}
                  />
                )}

                <div>
                  <h3 style={{ marginBottom: "6px" }}>{item.name}</h3>
                  <p style={{ fontWeight: "bold" }}>₹ {item.price}</p>
                </div>
              </div>

              <button
                onClick={() => removeItem(index)}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#ff4d4d",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Remove ✖
              </button>
            </div>
          ))}

          {/* Total Section */}
          <div
            style={{
              marginTop: "40px",
              padding: "25px",
              borderRadius: "16px",
              backgroundColor: "#fff7f3",
              boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
            }}
          >
            <h3 style={{ marginBottom: "20px" }}>Total: ₹ {total}</h3>

            <button
              onClick={placeOrder}
              disabled={loading}
              style={{
                width: "100%",
                padding: "15px",
                backgroundColor: "#ff5722",
                color: "white",
                border: "none",
                borderRadius: "12px",
                cursor: "pointer",
                fontSize: "17px",
                fontWeight: "bold",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "Placing Order..." : "Place Order 🚀"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
