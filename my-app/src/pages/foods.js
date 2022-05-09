import React from "react";
import Menu from "../components/food-menu";
import { useState } from "react";
import FoodCategories from "../components/food-category";
import { useGlobalContext } from "../context";

function FoodMenu() {
  const { foodData } = useGlobalContext();
  const [menuItems, setMenuItems] = useState(foodData); 

  const allCategory = ['All', ...new Set(foodData.map((item) => item.category))];
  const [categories, setCategories] = useState(allCategory);

  const filterItems = (category) => {
    if (category === 'All') {
      setMenuItems(foodData);
      return;
    } 
    const newMenuItems = foodData.filter((item) => item.category === category);
    setMenuItems(newMenuItems);
  }

  return (
    <main>
      <section className="menu section">
        <div className="title">
          <h2>Our menu</h2>
          <div className="underline"></div>
        </div>
      </section>
      <FoodCategories categories={categories} filterItems={filterItems} />
      <Menu items={menuItems} />
    </main>
  );
}

export default FoodMenu;
