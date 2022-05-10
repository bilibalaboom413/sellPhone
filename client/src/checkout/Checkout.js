import React from "react";
import CheckoutBody from "./CheckoutBody";
import CheckoutHeader from "./CheckoutHeader";
import "./checkout.css";

export default function Checkout() {
  return (
    <div className="Checkout">
      <CheckoutHeader />
      <CheckoutBody />
    </div>
  );
}
