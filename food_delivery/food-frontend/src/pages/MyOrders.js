import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authFetch } from "../services/authFetch";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      const access = localStorage.getItem("access");

      if (!access) {
        navigate("/login");
        return;
      }

      try {
        const response = await authFetch(
          "http://127.0.0.1:8000/api/orders/my/"
        );

        if (!response.ok) {
          navigate("/login");
          return;
        }

        const data = await response.json();

        if (Array.isArray(data)) {
          setOrders(data);
        } else {
          setOrders([]);
        }
      } catch (error) {
        console.log("Fetch Error:", error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  return (
    <div style={{ padding: "40px", maxWidth: "900px", margin: "auto" }}>
      <h2 style={{ marginBottom: "30px" }}>📦 My Orders</h2>

      {loading ? (
        <p>Loading...</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.order_id}
            style={{
              borderRadius: "14px",
              padding: "20px",
              marginBottom: "25px",
              backgroundColor: "#ffffff",
              boxShadow: "0 6px 18px rgba(0,0,0,0.08)"
            }}
          >
            {/* Order Header */}
            <div style={{ marginBottom: "12px" }}>
              <h3 style={{ marginBottom: "6px" }}>
                Order ID: {order.order_id}
              </h3>
              <p>Status: <b>{order.status}</b></p>
              <p>Payment: <b>{order.payment_status}</b></p>
            </div>

            {/* Ordered Items */}
            <div style={{ marginTop: "15px" }}>
              <h4 style={{ marginBottom: "10px" }}>Items Ordered:</h4>

              {order.items && order.items.map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "6px 0",
                    borderBottom: "1px solid #eee"
                  }}
                >
                  <span>
                    {item.menu_item} × {item.quantity}
                  </span>
                  <span>
                    ₹ {item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            {/* Total */}
            <div style={{ marginTop: "15px", textAlign: "right" }}>
              <h4>Total: ₹ {order.total_price}</h4>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default MyOrders;
