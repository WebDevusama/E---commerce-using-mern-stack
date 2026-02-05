import React from "react";
import "../ui/deals.css";
import { useCart } from "../../CartContext";

const deals = [
  { id: 1, title: "Smart watches", discount: "-25%", price: 100, img: "./assets/Images/tech/8.png" },
  { id: 2, title: "Laptops", discount: "-15%", price: 500, img: "./assets/Images/tech/image 34.png" },
  { id: 3, title: "GoPro cameras", discount: "-40%", price: 200, img: "./assets/Images/tech/6.png" },
  { id: 4, title: "Headphones", discount: "-25%", price: 50, img: "./assets/Images/tech/image 29.png" },
  { id: 5, title: "Canon cameras", discount: "-25%", price: 300, img: "./assets/Images/tech/6.png" },
];

const categories = [
  { id: 6, title: "Soft chairs", price: 19, img: "./assets/Images/interior/1.png" },
  { id: 7, title: "Blenders", price: 39, img: "./assets/Images/interior/9.png" },
  { id: 8, title: "Home appliance", price: 19, img: "./assets/Images/interior/6.png" },
  { id: 9, title: "Coffee maker", price: 10, img: "./assets/Images/interior/8.png" },
  { id: 10, title: "Pot", price: 10, img: "./assets/Images/interior/3.png" },
  { id: 11, title: "Stand", price: 10, img: "./assets/Images/interior/7.png" },
  { id: 12, title: "Show-pisc", price: 10, img: "./assets/Images/interior/image 89.png" },
  { id: 13, title: "Matress", price: 10, img: "./assets/Images/interior/image 93.png" },
  { id: 14, title: "Coffee maker", price: 10, img: "./assets/Images/interior/8.png" },
];

export default function DealsSection() {
  const { addToCart } = useCart();

  const handleAddToCart = (item) => {
    addToCart({
      id: item.id,
      title: item.title,
      price: item.price,
      image: item.img,
      qty: 1,
    });
    alert(`${item.title} added to cart!`);
  };

  return (
    <div className="container">
      {/* Deals */}
      <div className="deals">
        <div className="deal-banner">
          <h3>Deals and offers</h3>
          <p>Hygiene equipments</p>

          <div className="timer">
            <span>04<br />Days</span>
            <span>13<br />Hour</span>
            <span>34<br />Min</span>
            <span>56<br />Sec</span>
          </div>
        </div>

        {deals.map((item, index) => (
          <div className="deal-card" key={`deal-${item.id}-${index}`} onClick={() => handleAddToCart(item)} style={{ cursor: 'pointer' }}>
            <img src={item.img} alt={item.title} />
            <p>{item.title}</p>
            <span className="discount">{item.discount}</span>
            <button onClick={(e) => { e.stopPropagation(); handleAddToCart(item); }}>Add to Cart</button>
          </div>
        ))}
      </div>

      {/* Categories */}
      <div className="categories">
        <div className="category-banner">
          <h3>Home and outdoor</h3>
          <button>Source now</button>
        </div>

        {categories.map((item, index) => (
          <div className="category-card" key={`cat-${item.id}-${index}`} onClick={() => handleAddToCart(item)} style={{ cursor: 'pointer' }}>
            <div>
              <h4>{item.title}</h4>
              <p>From USD {item.price}</p>
            </div>
            <img src={item.img} alt={item.title} />
            <button onClick={(e) => { e.stopPropagation(); handleAddToCart(item); }}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}
