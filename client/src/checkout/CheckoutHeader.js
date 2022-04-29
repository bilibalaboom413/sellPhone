import React from "react";

export default function CheckoutHeader() {
  function backToPreviousPage() {
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