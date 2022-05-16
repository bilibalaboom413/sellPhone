const express = require("express");
const Phone = require("../models/Phone");
const alert = require("alert");

module.exports.transactionConfirm = async (req, res) => {
  try {
    // Get phones list
    const phones = req.body;

    // Iterate to update phones
    for (let i = 0; i < phones.length; i++) {
      let id = phones[i].id;
      let title = phones[i].title;
      let stock;
      let addedQuantity = phones[i].addedQuantity;

      await Phone.findPhoneById(id, function (err, phone) {
        if (err) {
          console.log("Cannot find phone: " + id);
        } else {
          try {
            stock = phone[0].stock;
            if (stock >= addedQuantity) {
              Phone.updateOne(
                { _id: id },
                { stock: stock - addedQuantity },
                function (err) {
                  if (err) {
                    console.log("Update error");
                  }
                }
              );
            } else {
              throw new Error(`Not enough stock of phone: ${title}`);
            }
          } catch (err) {
            console.log(err.message);
            alert(err.message);
          }
        }
      });
    }
  } catch (error) {
    res.stats(500).json({ error: error });
  }
};
