import { React, useState, useEffect } from "react";
import axios from "axios";

export default function CheckoutBody() {
  // Load the cart information
  const phonesCheckout = [];
  const numOfCategory = parseInt(localStorage.getItem("numOfCategory"));
  let remain = numOfCategory;
  let curIndex = 1;
  while (remain) {
    if (localStorage.getItem(curIndex)) {
      remain--;
      phonesCheckout.push(JSON.parse(localStorage.getItem(curIndex)));
    }
    curIndex++;
  }

  // Initialize state
  const [totalPrice, setTotalPrice] = useState(0);
  const [phones, setPhones] = useState(phonesCheckout || []);
  const [quantity, setQuantity] = useState(
    phones.map((phone) => {
      return {
        id: phone.id,
        quantity: phone.addedQuantity,
      };
    })
  );

  // Quantity that to be modified
  function quantityInput(e) {
    const newQuantity = e.target.value;
    const id = e.target.name;
    setQuantity((preQuantity) => {
      return preQuantity.map((preQ) => {
        return preQ.id === id
          ? {
              ...preQ,
              quantity: isNaN(newQuantity)
                ? newQuantity
                : parseInt(newQuantity),
            }
          : preQ;
      });
    });
  }

  // Modify the phone quantity
  function modifyQuantity(e) {
    const id = e.target.name;
    let num;
    for (let i = 0; i < quantity.length; i++) {
      if (quantity[i].id === id) {
        num = quantity[i].quantity;
      }
    }

    if (!isNaN(num) && num >= 0) {
      if (num === 0) {
        removeItem(e);
      } else {
        setPhones((prePhones) => {
          return prePhones.map((phone) => {
            return phone.id === id
              ? {
                  ...phone,
                  addedQuantity: num,
                }
              : phone;
          });
        });

        // Update the localStorage of cart information
        let found = false;
        let curIndex = 1;
        while (!found) {
          if (localStorage.getItem(curIndex)) {
            const phone = JSON.parse(localStorage.getItem(curIndex));
            if (phone.id === id) {
              found = true;
              phone.addedQuantity = num;
              localStorage.setItem(curIndex, JSON.stringify(phone));
              break;
            }
          }
          curIndex++;
        }
      }
    } else {
      alert("Please input a valid quantity!");
    }
  }

  // Remove phone
  function removeItem(e) {
    e.stopPropagation();
    const id = e.target.name;
    setPhones((prePhones) => prePhones.filter((phone) => phone.id !== id));
    setQuantity((preQuantity) =>
      preQuantity.filter((phone) => phone.id !== id)
    );

    // Update the localStorage of cart information
    let found = false;
    let curIndex = 1;
    while (!found) {
      if (localStorage.getItem(curIndex)) {
        const phone = JSON.parse(localStorage.getItem(curIndex));
        if (phone.id === id) {
          found = true;
          localStorage.removeItem(curIndex);
          localStorage.setItem("numOfCategory", numOfCategory - 1);
          break;
        }
      }
      curIndex++;
    }
  }

  // Update total price
  useEffect(() => {
    let total = 0;
    for (let i = 0; i < phones.length; i++) {
      total += phones[i].price * phones[i].addedQuantity;
    }
    total = total.toFixed(2);
    setTotalPrice(total);
  }, [phones]);

  // Create cart list
  const phonesElement = phones.map((val) => {
    return (
      <tr key={val.id}>
        <td>{val.title}</td>
        <td>{val.price}</td>
        <td>{val.addedQuantity}</td>
        <td>
          <input
            className="quantity-input"
            name={val.id}
            onChange={quantityInput}
            placeholder="quantity"
            type="text"
          />
          <button
            type="button"
            className="input-button"
            name={val.id}
            onClick={modifyQuantity}
          >
            Modify
          </button>
        </td>
        <td>
          <button
            type="button"
            className="remove-button"
            name={val.id}
            onClick={removeItem}
          >
            Remove
          </button>
        </td>
      </tr>
    );
  });

  // Checkout
  function checkout(e) {
    e.preventDefault();
    axios
      .post("/checkout/transaction", phones)
      .then(
        (res) => {
          console.log(res.data);
        },
        (err) => {
          console.log(err);
        }
      )
      .then(alert("You have finish the transaction!"))
      .then(localStorage.clear())
      .then((window.location = "/"));
  }

  return (
    <main className="main-body">
      <form onSubmit={checkout}>
        <table>
          <thead>
            <tr>
              <th colSpan="5" className="table-title">
                Added Items
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Title</th>
              <th>Price</th>
              <th>Quantity</th>
              <th colSpan="2">Modify your Cart</th>
            </tr>
            {phonesElement}
          </tbody>
        </table>
        <div className="main-bottom">
          <label className="total-price-label">Total Price: $</label>
          <span className="total-price">{totalPrice}</span>
          <input type="submit" className="submit-button" value="Pay" />
        </div>
      </form>
    </main>
  );
}
