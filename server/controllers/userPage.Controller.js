const User = require("../models/User");
const Phone = require("../models/Phone");
const { ObjectId } = require("mongodb");

module.exports = class UserPage {
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

  static async apiSetUserInfo(req, res, next) {
    console.log("apiSetUserInfo");
    const back = JSON.stringify(req.body);
    const back1 = JSON.parse(back);

    console.log("back :" + back);

    console.log("id: " + back1.user[0]._id);
    console.log("firstname :" + back1.user[0].firstname);
    console.log("lastname :" + back1.user[0].lastname);
    console.log("email :" + back1.user[0].email);

    try {
      const Id = back1.user[0]._id;
      const user = await User.find({ _id: Id });

      /* console.log('before fname '+user.firstname)
            user.firstname = back1.user[0].firstname;
            console.log('after fname '+user.firstname)
            user.lastname = back1.user[0].lastname;
            user.email = back1.user[0].email;
            user.updated_at=Date.now(); */

      /*     User.update({_id:Id},{$set:{firstname:back1.user[0].firstname}})
            User.update({_id:Id},{$set:{lastname:back1.user[0].lastname}})
            User.update({_id:Id},{$set:{email:back1.user[0].email}}) */

      const updateData = await User.findOneAndUpdate(
        { _id: Id },
        {
          firstname: back1.user[0].firstname,
          lastname: back1.user[0].lastname,
          email: back1.user[0].email,
        },
        { new: true }
      );

      console.log("update result: " + updateData);

      /*  user.update(lastname,back1.user[0].lastname)
            user.update(email,back1.user[0].email) */
      /* 
            user.save(); */
      if (!user) {
        res.status(404).json("No such user.");
      }
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  static async apiSetPassword(req, res, next) {
    console.log("apiSetPassword");
    const back = JSON.stringify(req.body);
    const back1 = JSON.parse(back);

    console.log("back :" + back);

    console.log("id: " + back1.user[0]._id);
    console.log("new password: " + back1.user[0].newpassword);

    try {
      const Id = back1.user[0]._id;

      /* const updateData = await User.updateOne(
                {_id:Id},
                {$set:{password:back1.user[0].password}}
            ) */

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
      //         console.log('The user data is: '+user);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  /*  static async apiGetPhone(req, res, next){
        const back = JSON.stringify(req.body)
        const back1 = JSON.parse(back)

        console.log(back1)

        try {
            const seller = back1.phone[0].seller;
            const phone = await Phone.find({"seller": seller}, {
                _id: 1,
                "title": 2,
                "brand": 3,
                "image": 4,
                "stock": 5,
                "seller": 6,
                "price": 7,
                "reviews.reviewer":8,
                "reviews.rating":9,
                "reviews.comment":10,
            });
            if(!phone){
                res.status(404).json("There are no phone published yet!")
            }
            res.json(phone);
        } catch (error) {
            res.status(500).json({error: error})
        }

    } */

  static async apigetPhoneInfo(req, res, next) {
    console.log("apigetPhoneInfo");
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

      /*  for(var i=0;i<phone.length;i++){
                console.log('test1')
                console.log('reviews: '+phone[0].reviews)
                console.log('reviews.length: '+typeof(phone[0].reviews))
                console.log('reviews.length: '+Object.keys(phone[0].reviews).length)
             
                
                
                if(Object.keys(phone[i].reviews).length>0){
                    console.log('test2')
                 //   console.log('inner review: '+phone[i].reviews)
                    for(var j=0;j < Object.keys(phone[i].reviews).length;j++){
                        console.log('test3')
                        console.log('reviews j '+phone[i].reviews[j])
                        console.log('reviews j id '+phone[i].reviews[j].reviewer)
                        const Id = phone[i].reviews[j].reviewer;
                        const user = await User.find({"_id":Id})
                       
                        console.log(user[0].firstname)
                        phone[i].reviews[j].reviewer = user[0].firstname + " " + user[0].lastname;
                    }
                }
            } */

      for (const x in phone) {
        console.log("test1 " + x);
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

        console.log("phone: " + phone);
      }

      res.json(phone);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  static async apiAddList(req, res, next) {
    console.log("apiAddList");
    const back = JSON.stringify(req.body);
    const back1 = JSON.parse(back);

    console.log("back :" + back);

    console.log("title: " + back1.phone[0].title);
    console.log("brand :" + back1.phone[0].brand);
    console.log("image :" + back1.phone[0].image);
    console.log("stock :" + back1.phone[0].stock);
    console.log("price :" + back1.phone[0].price);
    console.log("sellerid :" + back1.phone[0].seller);

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

  static async apideletePhone(req, res, next) {
    console.log("apideletePhone");
    const back = JSON.stringify(req.body);
    const back1 = JSON.parse(back);

    console.log(back1);

    try {
      const id = back1[0]._id;

      const remove = await Phone.deleteOne({ _id: id });
      res.json("sucess");
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  static async apiDisable(req, res, next) {
    console.log("apideletePhone");
    const back = JSON.stringify(req.body);
    const back1 = JSON.parse(back);

    console.log(back1);

    try {
      const id = back1[0]._id;

      const enable = await Phone.updateOne(
        { _id: id },
        { $set: { disabled: "" } }
      );
      console.log("enable: " + enable);
      res.json("sucess");
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  static async apiEnable(req, res, next) {
    console.log("apideletePhone");
    const back = JSON.stringify(req.body);
    const back1 = JSON.parse(back);

    console.log(back1);

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

  static async apigetComments(req, res, next) {
    console.log("apiGetComment");
    const back = JSON.stringify(req.body);
    const back1 = JSON.parse(back);

    console.log(back1);

    try {
      const seller = back1[0].seller;
      const phone = await Phone.find(
        { seller: seller, reviews: { $elemMatch: { $ne: null } } },
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
      console.log("phone: " + phone);
      res.json(phone);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  static async apiGetReviewerInfo(req, res, next) {
    console.log("apiGetReviewer");
    const back = JSON.stringify(req.body);
    const back1 = JSON.parse(back);

    console.log("the return of request is " + back1[0]._id);

    try {
      const testId = back1[0]._id;
      const user = await User.find({ _id: testId });
      if (!user) {
        res.status(404).json("No such user.");
      }

      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
};
