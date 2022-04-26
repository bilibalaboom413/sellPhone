// const express = require("express");
const Phone = require("../models/Phones");

module.exports.showCheckout = function (req, res) {
  let id = "625d127d2140a08eb1365d2a";
  Phone.findPhoneById(id, function (err, phone) {
    if (err) {
      console.log("Cannot find phone: " + id);
    } else {
      res.send(phone);
    }
  });
};

module.exports.transactionConfirm = function (req, res) {
  const phones = req.query.phones;
  for (let i = 0; i < phones.length; i++) {
    let id = phones[i].id;
    let inventory = phones[i].stock;
    let sell = phones[i].sell;

    Phone.findPhoneById(id, function (err, phone) {
      console.log(id);
      if (err) {
        console.log("Cannot find phone: " + id);
      } else {
        console.log(phone);
        inventory = phone[0].stock;
        // res.send(phone);
        console.log(inventory, sell);
        if (inventory >= sell) {
          Phone.updateOne(
            { _id: id },
            { stock: inventory - sell },
            function (err, result) {
              if (err) {
                console.log("Update error");
              } else {
                console.log(result);
              }
            }
          );
        } else {
          throw new Error("Not enough stock of phone: " + id);
        }
      }
    });
    console.log(res);
  }
};
