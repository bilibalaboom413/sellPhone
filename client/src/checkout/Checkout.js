import React from "react";
import CheckoutBody from "./CheckoutBody";
import CheckoutHeader from "./CheckoutHeader";

export default function Checkout() {
  return (
    <div className="checkout">
      <CheckoutHeader />
      <CheckoutBody />
    </div>
  );
}
