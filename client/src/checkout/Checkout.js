import React from "react";
import CheckoutBody from "./CheckoutBody";
import CheckoutHeader from "./CheckoutHeader";

export default function Checkout(props) {
  return (
    <div className="Checkout">
      {/* <CheckoutHeader checkout={props.checkout} />
      <CheckoutBody phonesCheckout={props.phonesCheckout}/> */}
      <CheckoutHeader />
      <CheckoutBody />
    </div>
  );
}
