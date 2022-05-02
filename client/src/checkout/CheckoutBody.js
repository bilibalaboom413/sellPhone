import { React, useState, useEffect } from "react";
import axios from "axios";

export default function CheckoutBody() {
  const [totalPrice, setTotalPrice] = useState(0);

  const [phones, setPhones] = useState([
    {
      id: "625d127d2140a08eb1365d2a",
      title:
        '"CLEAR CLEAN ESN" Sprint EPIC 4G Galaxy SPH-D700*FRONT CAMERA*ANDROID*SLIDER*QWERTY KEYBOARD*TOUCH SCREEN',
      price: 1.99,
      addedQuantity: 1,
    },
    {
      id: "625d127d2140a08eb1365d2b",
      title: "Cricket Samsung Galaxy Discover R740 Phone",
      price: 2,
      addedQuantity: 1,
    },
    {
      id: "625d127d2140a08eb1365d2c",
      title: "Galaxy s III mini SM-G730V Verizon Cell Phone BLUE",
      price: 3,
      addedQuantity: 1,
    },
    {
      id: "625d127d2140a08eb1365d2d",
      title: "Galaxy S5 G900A Factory Unlocked Android Smartphone 16GB White",
      price: 1,
      addedQuantity: 1,
    },
  ]);

  const [quantity, setQuantity] = useState(
    phones.map((phone) => {
      return {
        id: phone.id,
        quantity: phone.addedQuantity,
      };
    })
  );

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

  function modifyQuantity(e) {
    const id = e.target.name;
    let num;
    for (let i = 0; i < quantity.length; i++) {
      if (quantity[i].id === id) {
        num = quantity[i].quantity;
      }
    }

    if (!isNaN(num)) {
      if (num === 0) {
        removeItem(e);
      } else {
        setPhones((prePhones) => {
          return prePhones.map((phone) => {
            return phone.id === id
              ? {
                  // forget to write return
                  ...phone,
                  addedQuantity: num,
                }
              : phone;
          });
        });
      }
    } else {
      alert("You have invalid input quantity!");
    }
  }

  function removeItem(e) {
    console.log("Removing item");
    const id = e.target.name;
    setPhones((prePhones) => prePhones.filter((phone) => phone.id !== id));
    setQuantity((preQuantity) =>
      preQuantity.filter((phone) => phone.id !== id)
    );
  }

  useEffect(() => {
    let total = 0;
    for (let i = 0; i < phones.length; i++) {
      total += phones[i].price * phones[i].addedQuantity;
    }
    total = total.toFixed(2);
    setTotalPrice(total);
  }, [phones]);

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

  function checkout(e) {
    e.preventDefault();
    axios
      .post("http://localhost:8000/checkout/transaction", phones)
      .then(
        (res) => {
          console.log(res.data);
        },
        (err) => {
          console.log(err);
        }
      )
      .then(alert("You have finish the transaction!"))
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
