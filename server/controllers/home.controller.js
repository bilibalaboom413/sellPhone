const Phone = require("../models/Phones");

// module.exports.showCheckout = function (req, res) {
//     let id = "625d127d2140a08eb1365d2a";
//     Phone.findPhoneById(id, function (err, phone) {
//     if (err) {
//       console.log("Cannot find phone: " + id);
//     } else {
//       res.send(phone);
//     }
//   });
// };

module.exports.transactionConfirm = async (req, res) => {
  try {
    // get phones list
    const phones = req.body;

    // iterate to update phones
    for (let i = 0; i < phones.length; i++) {
      let id = phones[i].id;
      let title = phones[i].title;
      let stock;
      let addedQuantity = phones[i].addedQuantity;

      Phone.findPhoneById(id, function (err, phone) {
        if (err) {
          console.log("Cannot find phone: " + id);
        } else {
          try {
            // console.log(phone);
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
              throw new Error(`Not enough stock of phone: ${id}`);
            }
          } catch {
            console.log(`Not enough stock of phone: ${title}`);
          }
        }
      });
    }
  } catch (error) {
    res.stats(500).json({ error: error });
  }
};
