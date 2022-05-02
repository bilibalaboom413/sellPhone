import React from "react";

export default function CheckoutHeader(props) {
    // console.log(props.checkout);

    function backToPreviousPage() {
        // props.checkout(false);
        window.history.back();
  }
  return (
    <header className="header">
      <h1>Welcome to the Checkout Page</h1>
      <button className="back-button" onClick={backToPreviousPage}>
        Back
      </button>
    </header>
  );
}
