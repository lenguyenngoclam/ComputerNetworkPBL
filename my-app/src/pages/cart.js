import React from "react";
import { useGlobalContext } from "../context";
import Navbar from "../components/navbar";
import CartContainer from "../components/cart-container";

function Cart(){
  const { loading } = useGlobalContext();
  if (loading) {
    return (
      <div className='loading'>
        <h1>Loading...</h1>
      </div>
    )
  }
  return (
    <main>
      <CartContainer />
    </main>
  )
}

export default Cart;
