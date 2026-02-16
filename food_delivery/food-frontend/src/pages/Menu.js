import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { getMenu } from "../services/api";
import { CartContext } from "../services/CartContext";
import "./Menu.css";

/* Import all images */
import chickenBiryani from "../assets/images/chicken-biryani.png";
import muttonBiryani from "../assets/images/mutton-biryani.png";
import chickenTandoori from "../assets/images/chicken-tandoori.png";
import butterChicken from "../assets/images/butter-chicken.png";
import chicken from "../assets/images/chicken.png";
import chickenKebab from "../assets/images/chicken-kebab.png";
import fishFry from "../assets/images/fish-fry.png";
import paneerButterMasala from "../assets/images/paneer-butter-masala.png";
import gobiManchurian from "../assets/images/gobi-manchurian.png";
import alooGobi from "../assets/images/aloo-gobi.png";
import vegFriedRice from "../assets/images/veg-fried-rice.png";
import dalTadka from "../assets/images/dal-tadka.png";

function Menu() {
  const { id } = useParams();
  const [menu, setMenu] = useState([]);
  const { addToCart } = useContext(CartContext);

 useEffect(() => {
  fetch(`http://127.0.0.1:8000/api/restaurants/${id}/menu/?category=food`)
    .then(res => res.json())
    .then(data => setMenu(data));
}, [id]);


  /* Map food name to image */
  const imageMap = {
    "Chicken Biryani": chickenBiryani,
    "Mutton Biryani": muttonBiryani,
    "Chicken Tandoori": chickenTandoori,
    "Butter Chicken": butterChicken,
    "Chicken": chicken,
    "Chicken Kebab": chickenKebab,
    "Fish Fry": fishFry,
    "Paneer Butter Masala": paneerButterMasala,
    "Gobi Manchurian": gobiManchurian,
    "Aloo Gobi": alooGobi,
    "Veg Fried Rice": vegFriedRice,
    "Dal Tadka": dalTadka,
  };

  return (
    <div className="menu-container">
      <h2 className="menu-title">Restaurant Menu 🍽️</h2>

      <div className="menu-grid">
        {menu.map(item => (
          <div key={item.id} className="menu-card">

            <img
              src={imageMap[item.name]}
              alt={item.name}
              className="menu-img"
            />

            <div className="menu-content">
              <h4>{item.name}</h4>
              <p className="menu-price">₹ {item.price}</p>

              <button
                onClick={() => addToCart(item)}
                className="add-btn"
              >
                Add to Cart 🛒
              </button>
            </div>

          </div>
        ))}
      </div>

      <div className="cart-btn-wrapper">
        <Link to="/cart">
          <button className="cart-btn">
            Go To Cart →
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Menu;
