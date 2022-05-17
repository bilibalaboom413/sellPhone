const User = require("../models/User");
const Phone = require("../models/Phone");
const { ObjectId } = require("mongodb");

module.exports = class UserPage {
  /* api used to get userInformation */
  static async apiGetUserInfo(req, res, next) {
    console.log("apiGetUserInfo");
    try {
      const testId = req.query.id;
      const user = await User.find(
        { _id: testId },
        {
          _id: 1,
          firstname: 2,
          lastname: 3,
          email: 4,
          password: 5,
        }
      );
      if (!user) {
        res.status(404).json("No such user.");
      }
      console.log(user);
      res.json(user);
    } catch (error) {
      consolo.log("error");
      res.status(500).json({ error: error });
    }
  }

  /* api use to update user information */
  static async apiSetUserInfo(req, res, next) {
    console.log("apiSetUserInfo");
    const back = JSON.stringify(req.body);
    const back1 = JSON.parse(back);

    try {
      const Id = back1.user[0]._id;
      const user = await User.find({ _id: Id });

      const updateData = await User.findOneAndUpdate(
        { _id: Id },
        {
          firstname: back1.user[0].firstname,
          lastname: back1.user[0].lastname,
          email: back1.user[0].email,
        },
        { new: true }
      );

      if (!user) {
        res.status(404).json("No such user.");
      }
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  /*  api use to update user password */
  static async apiSetPassword(req, res, next) {
    const back = JSON.stringify(req.body);
    const back1 = JSON.parse(back);

    try {
      const Id = back1.user[0]._id;

      const updateData = await User.findOneAndUpdate(
        { _id: Id },
        { password: back1.user[0].newpassword },
        { new: true }
      );

      const user = await User.find(
        { _id: Id },
        {
          _id: 1,
          firstname: 2,
          lastname: 3,
          email: 4,
          password: 5,
        }
      );

      console.log("update result: " + user);

      if (!user) {
        res.status(404).json("No such user.");
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  /*  api use to get phone information */
  static async apigetPhoneInfo(req, res, next) {
    const back = JSON.stringify(req.body);
    const back1 = JSON.parse(back);

    console.log(back1);

    try {
      const seller = back1[0].seller;
      const phone = await Phone.find(
        { seller: seller },
        {
          _id: 1,
          title: 2,
          brand: 3,
          image: 4,
          stock: 5,
          seller: 6,
          price: 7,
          "reviews.reviewer": 8,
          "reviews.rating": 9,
          "reviews.comment": 10,
        }
      );
      if (!phone) {
        res.status(404).json("There are no phone published yet!");
      }

      for (const x in phone) {
        if (phone[x].reviews.reviewer != null) {
          const name = await User.find(
            { _id: phone[x].reviews.reviewer },
            {
              _id: 0,
              firstname: 1,
              lastname: 2,
            }
          );

          const fullname = [];

          for (let i = 0; i < name.length; i++) {
            fullname[i] = name[i].firstname + " " + name[i].lastname;
          }

          const cache = JSON.stringify(phone[x]);
          const cache1 = JSON.parse(cache);

          cache1.reviews[0].reviewer = fullname[0];

          for (let i = 0; i < cache1.reviews.length; i++) {
            cache1.reviews[i].reviewer = fullname[i];
          }

          phone[x] = cache1;
        }
      }

      res.json(phone);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  /*  api use to add new phone */
  static async apiAddList(req, res, next) {
    const back = JSON.stringify(req.body);
    const back1 = JSON.parse(back);

    const newPhone = [
      {
        _id: ObjectId(),
        title: back1.phone[0].title,
        brand: back1.phone[0].brand,
        image: back1.phone[0].image,
        stock: back1.phone[0].stock,
        price: back1.phone[0].price,
        seller: back1.phone[0].seller,
      },
    ];

    try {
      Phone.create(newPhone, (err) => {
        if (err) return console.log(err);
      });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  /*  api use to delete phone item */
  static async apideletePhone(req, res, next) {
    const back = JSON.stringify(req.body);
    const back1 = JSON.parse(back);

    try {
      const id = back1[0]._id;

      const remove = await Phone.deleteOne({ _id: id });
      res.json("sucess");
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  /*  api use to set phone item to disable */
  static async apiDisable(req, res, next) {
    const back = JSON.stringify(req.body);
    const back1 = JSON.parse(back);

    console.log(back1);

    try {
      const id = back1[0]._id;

      const enable = await Phone.updateOne(
        { _id: id },
        { $set: { disabled: "" } }
      );

      res.json("sucess");
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  /* api use to set phone item to enable */
  static async apiEnable(req, res, next) {
    const back = JSON.stringify(req.body);
    const back1 = JSON.parse(back);

    try {
      const id = back1[0]._id;

      const enable = await Phone.updateOne(
        { _id: id },
        { $unset: { disabled: null } }
      );
      res.json("sucess");
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
};
