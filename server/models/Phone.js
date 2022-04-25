const mongoose = require("mongoose");
const {ObjectId} = require("mongodb");
const Schema = mongoose.Schema;


const phoneSchema = Schema({
    _id:{
        type: ObjectId,
        required: true,
    },

    brand:{
        type: String,
        required: true,
    },

    image: {
        type: String,
        required: false,
    },

    price:{
        type: Number,
        required: false,
    },
    reviews:{
        reviewer:{
            type: String,
            required: false,
        },
        rating:{
            type: Number,
            required: false,
        },
        comment:{
            type: String,
            required: false,
        }
    },
    seller:{
        type: String,
        required: false,
    },

    stock:{
        type: Number,
        required: true,
    },
    title:{
        type: String,
        required: true,
    }
});


module.exports = Phone = mongoose.model("Phone", phoneSchema,'phone');
