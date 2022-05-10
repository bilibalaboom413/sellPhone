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
      res.json(phone);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  static async apiGetSoldOutService(req, res, next) {
    try {
      const phone = await Phone.find(
        { stock: { $gt: 0 } },
        {
          _id: 1,
          title: 1,
          price: 1,
        }
      )
        .sort({ stock: 1 })
        .limit(5);
      if (!phone) {
        res.status(404).json("There are no phone published yet!");
      }
      res.json(phone);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  static async apiGetBestSellerService(req, res, next) {
    try {
      const phone = await Phone.aggregate([
        {
          $project: {
            _id: 1,
            title: 1,
            Ave_rating: { $avg: "$reviews.rating" },
          },
        },
      ])
        .sort({ Ave_rating: -1 })
        .limit(5);
      if (!phone) {
        res.status(404).json("There are no phone published yet!");
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
      const _title = new RegExp(req.query.title); //模糊查询参数
      const _brand = new RegExp(req.query.brand);
      const _value = req.query.value;
      const phone = await Phone.find(
        {
          title: { $regex: _title, $options: "i" },
          brand: { $regex: _brand, $options: "i" },
          price: { $lte: _value },
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
      );
      if (!phone) {
        res.status(404).json("There are no phone published yet!");
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
      res.json(phone);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  static async apiGetReview(req, res, next) {
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
        {
          $limit: 3,
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
