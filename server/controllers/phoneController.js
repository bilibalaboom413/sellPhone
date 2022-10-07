const Phone = require("../models/Phone");
const User = require("../models/User");
const mongoose = require("mongoose");

module.exports = class PhoneController {
  static async apiGetAllPhoneService(req, res, next) {
    try {
      const phone = await Phone.find(
        {},
        {
          _id: 1,
          title: 1,
          brand: 1,
          image: 1,
          stock: 1,
          seller: 1,
          price: 1,
        }
      );
      if (!phone) {
        res.status(404).json("There are no phone published yet!");
      }
      for (const x in phone) {
        phone[x].image = "/phone_default_images/" + phone[x].brand + ".jpeg";
      }
      res.json(phone);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  static async apiGetSoldOutService(req, res, next) {
    try {
      const phone = await Phone.find(
        {
          stock: { $gt: 0 }, // stock > 0
          disabled: { $exists: false }, // not disabled
        },
        {
          _id: 1,
          image: 1,
          brand: 1,
          price: 1,
        }
      )
        .sort({ stock: 1 }) // sort by stock ascending
        .limit(5); // top five
      if (!phone) {
        res.status(404).json("There are no phone published yet!");
      }
      for (const x in phone) {
        phone[x].image = "/phone_default_images/" + phone[x].brand + ".jpeg";
      }
      res.json(phone);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  static async apiGetBestSellerService(req, res, next) {
    try {
      // aggregate([{}, {}])
      const phone = await Phone.aggregate([
        {
          $match: {
            reviews: {
              $not: { $size: 1 }, // reviews !== 1 ?
            },
            disabled: { $exists: false },
          },
        },
        {
          $project: {
            _id: 1,
            image: 1,
            brand: 1,
            Ave_rating: { $avg: "$reviews.rating" },
          },
        },
      ])
        .sort({ Ave_rating: -1 })
        .limit(5);
      if (!phone) {
        res.status(404).json("There are no phone published yet!");
      }
      for (const x in phone) {
        phone[x].image = "/phone_default_images/" + phone[x].brand + ".jpeg";
        phone[x].Ave_rating = Number(phone[x].Ave_rating).toFixed(2);
      }
      res.json(phone);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  static async apiGetBrandService(req, res, next) {
    try {
      const phone = await Phone.find(
        {},
        {
          _id: 1,
          brand: 1,
        }
      ).distinct("brand");
      if (!phone) {
        res.status(404).json("There are no phone published yet!");
      }
      res.json(phone);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  static async apiGetHighestValue(req, res, next) {
    try {
      const phone = await Phone.find(
        {},
        {
          _id: 0,
          price: 1,
        }
      )
        .sort({ price: -1 })
        .limit(1);
      if (!phone) {
        res.status(404).json("There are no phone published yet!");
      }
      res.send(phone[0]);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  static async apiAddReview(req, res, next) {
    try {
      // TODO change to POST method
      const id = req.query.id;
      const reviewer = req.query.userId;
      const rating = req.query.rating;
      const comment = req.query.comment;
      const phone = await Phone.updateOne(
        { _id: id },
        {
          $push: {
            reviews: {
              reviewer: reviewer,
              rating: rating,
              comment: comment,
            },
          },
        }
      );
      if (!phone) {
        res.status(404).json("There are no phone published yet!");
      }
      res.send(phone);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  static async apiGetSearchService(req, res, next) {
    try {
      const _title = new RegExp(req.query.title);
      const _brand = new RegExp(req.query.brand);
      const _value = req.query.value;
      let listNumber = req.query.listNumber;
      const phone = await Phone.find(
        {
          title: { $regex: _title, $options: "i" },
          brand: { $regex: _brand, $options: "i" },
          price: { $lte: _value },
          disabled: { $exists: false },
        },
        {
          _id: 1,
          title: 1,
          brand: 1,
          image: 1,
          stock: 1,
          seller: 1,
          price: 1,
        }
      ).limit(Number(listNumber));
      if (!phone) {
        res.status(404).json("There are no phone published yet!");
      }
      for (const x in phone) {
        phone[x].image = "/phone_default_images/" + phone[x].brand + ".jpeg";
      }
      res.json(phone);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  static async apiGetPhoneInfo(req, res, next) {
    try {
      const id = req.query.id;
      const phone = await Phone.aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(id),
          },
        },
        {
          $project: {
            title: 1,
            brand: 1,
            image: 1,
            stock: 1,
            seller: 1,
            price: 1,
          },
        },
      ]);

      if (!phone) {
        res.status(404).json("There are no phone published yet!");
      }

      const name = await User.find(
        { _id: phone[0].seller },
        {
          _id: 0,
          firstname: 1,
          lastname: 2,
        }
      );
      phone[0].seller = name[0].firstname + " " + name[0].lastname;
      phone[0].image = "/phone_default_images/" + phone[0].brand + ".jpeg";
      res.json(phone);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  static async apiGetReview(req, res, next) {
    try {
      const id = req.query.id;
      let reviewNumber = req.query.reviewNumber;
      const phone = await Phone.aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(id),
          },
        },
        {
          // The following aggregation uses the $unwind stage to
          // output a document for each element in the reviews array:
          $unwind: "$reviews",
        },
        {
          $project: {
            "reviews.reviewer": 1,
            "reviews.rating": 1,
            "reviews.comment": 1,
          },
        },
        {
          $limit: Number(reviewNumber),
        },
      ]);

      if (!phone) {
        res.status(404).json("There are no phone published yet!");
      }

      for (const x in phone) {
        const name = await User.find(
          { _id: phone[x].reviews.reviewer },
          {
            _id: 0,
            firstname: 1,
            lastname: 2,
          }
        );

        const fullname = name[0].firstname + " " + name[0].lastname;
        phone[x].reviews.reviewer = fullname.toString();
      }
      res.json(phone);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  static async apiGetAllReview(req, res, next) {
    try {
      const id = req.query.id;
      const phone = await Phone.aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(id),
          },
        },
        {
          $unwind: "$reviews",
        },
        {
          $project: {
            "reviews.reviewer": 1,
            "reviews.rating": 1,
            "reviews.comment": 1,
          },
        },
      ]);
      if (!phone) {
        res.status(404).json("There are no phone published yet!");
      }
      for (const x in phone) {
        const name = await User.find(
          { _id: phone[x].reviews.reviewer },
          {
            _id: 0,
            firstname: 1,
            lastname: 2,
          }
        );
        const fullname = name[0].firstname + " " + name[0].lastname;
        phone[x].reviews.reviewer = fullname.toString();
      }
      res.json(phone);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
};
