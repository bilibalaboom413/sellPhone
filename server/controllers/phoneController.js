const PhoneService = require("../service/phoneservice");
const Phone = require("../model/phone");
module.exports = class PhoneController{

    static async apiGetAllPhoneService(req, res, next){
        try {
            const phone = await Phone.find({},{
                _id : 1,
                "title":1,
                "brand":2,
                "image":3,
                "stock":4,
                "seller":5,
                "price":6
            });
            if(!phone){
                res.status(404).json("There are no phone published yet!")
            }
            res.json(phone);
        } catch (error) {
            res.status(500).json({error: error})
        }
    }

    static async apiGetSoldOutService(req, res, next){
        try {
            const phone = await Phone.find({"stock" : {$gt : 0}},{
                _id : 0,
                "title":1,
                "price":2,
            }).sort({"stock":1}).limit(5);
            if(!phone){
                res.status(404).json("There are no phone published yet!")
            }
            res.json(phone);
        } catch (error) {
            res.status(500).json({error: error})
        }
    }

    static async apiGetBestSellerService(req, res, next){
        try {
            const phone = await Phone.aggregate([
                {
                    $project : {
                        _id : 0 ,
                        "title" : 1 ,
                        "Ave_rating": { $avg: '$reviews.rating'}
                    }}
            ]).sort({"Ave_rating":-1}).limit(5);
            if(!phone){
                res.status(404).json("There are no phone published yet!")
            }
            res.json(phone);
        } catch (error) {
            res.status(500).json({error: error})
        }
    }
    static async apiGetBrandService(req, res, next){
        try {
            const phone = await Phone.find({},{
                _id : 0,
                "brand":1,
            }).distinct('brand');
            if(!phone){
                res.status(404).json("There are no phone published yet!")
            }
            res.json(phone);
        } catch (error) {
            res.status(500).json({error: error})
        }
    }
    static async apiGetHighestValue(req, res, next){
        try {
            const phone = await Phone.find({},{
                _id : 0,
                "price":1,
            }).sort({"price":-1}).limit(1);
            if(!phone){
                res.status(404).json("There are no phone published yet!")
            }
            res.send(phone[0]);
        } catch (error) {
            res.status(500).json({error: error})
        }
    }
    static async apiAddReview(req, res, next){
        try {
            const id = req.query.id;
            const reviewer = req.query.userId;
            const rating = req.query.rating;
            const comment = req.query.comment;
            console.log("Controller layer")
            const phone = await Phone.updateOne({"_id": id},
                { "$push":
                        {"reviews":
                                {
                                    "reviewer": reviewer,
                                    "rating": rating,
                                    "comment": comment
                                }
                        }
                }
            );
            if(!phone){
                res.status(404).json("There are no phone published yet!")
            }
            console.log("complete!")
            console.log(phone)
            res.send(phone);
        } catch (error) {
            res.status(500).json({error: error})
        }
    }
    // static async apiGetUserName(req, res, next){
    //     try {
    //         const user = await User.find({},{
    //             _id : 0,
    //             "":1,
    //         });
    //         if(!user){
    //             res.status(404).json("There are no user!")
    //         }
    //         res.json(user);
    //     } catch (error) {
    //         res.status(500).json({error: error})
    //     }
    // }
    static async apiGetSearchService(req, res, next){
        try {
            const _title= new RegExp(req.query.title);//模糊查询参数
            const _brand = new RegExp(req.query.brand);
            const _value = (req.query.value)
            const phone = await Phone.find({title: {$regex:_title,$options: 'i'},brand: {$regex:_brand,$options: 'i'},price:{$lte:_value}}, {
                _id: 0,
                "title": 1,
                "brand": 2,
                "image": 3,
                "stock": 4,
                "seller": 5,
                "price": 6,
            });
            if(!phone){
                res.status(404).json("There are no phone published yet!")
            }
            res.json(phone);
        } catch (error) {
            res.status(500).json({error: error})
        }
    }
    static async apiGetPhoneInfo(req, res, next){
        try {
            const id = req.query.id;
            const phone = await Phone.find({"_id": id}, {
                _id: 0,
                "title": 1,
                "brand": 2,
                "image": 3,
                "stock": 4,
                "seller": 5,
                "price": 6,
                "reviews.reviewer":7,
                "reviews.rating":8,
                "reviews.comment":9,
            });
            if(!phone){
                res.status(404).json("There are no phone published yet!")
            }
            res.json(phone);
        } catch (error) {
            res.status(500).json({error: error})
        }

    }
}
