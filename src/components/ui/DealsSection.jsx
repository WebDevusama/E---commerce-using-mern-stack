import React from "react";
import "../ui/deals.css";

const deals = [
  { title: "Smart watches", discount: "-25%", img: "./assets/Images/tech/8.png" },
  { title: "Laptops", discount: "-15%", img: "./assets/Images/tech/image 34.png" },
  { title: "GoPro cameras", discount: "-40%", img: "./assets/Images/tech/6.png" },
  { title: "Headphones", discount: "-25%", img: "./assets/Images/tech/image 29.png" },
  { title: "Canon cameras", discount: "-25%", img: "./assets/Images/tech/6.png" },
];

const categories = [
  { title: "Soft chairs", price: "From USD 19", img: "./assets/Images/interior/1.png" },
  { title: "Blenders", price: "From USD 39", img: "./assets/Images/interior/9.png" },
  { title: "Home appliance", price: "From USD 19", img: "./assets/Images/interior/6.png" },
  { title: "Coffee maker", price: "From USD 10", img: "./assets/Images/interior/8.png" },
  { title: "Pot", price: "From USD 10", img: "./assets/Images/interior/3.png" },
  { title: "Stand", price: "From USD 10", img: "./assets/Images/interior/7.png" },
  { title: "Show-pisc", price: "From USD 10", img: "./assets/Images/interior/image 89.png" },
  { title: "Matress", price: "From USD 10", img: "./assets/Images/interior/image 93.png" },
  { title: "Coffee maker", price: "From USD 10", img: "./assets/Images/interior/8.png" },



];

export default function DealsSection() {
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
          <div className="deal-card" key={index}>
            <img src={item.img} alt={item.title} />
            <p>{item.title}</p>
            <span className="discount">{item.discount}</span>
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
          <div className="category-card" key={index}>
            <div>
              <h4>{item.title}</h4>
              <p>{item.price}</p>
            </div>
            <img src={item.img} alt={item.title} />
          </div>
        ))}
      </div>
    </div>
  );
}
