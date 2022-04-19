// const express = require("express");
const Phone = require("../models/Phones");
const User = require("../models/User");

module.exports.showCheckout = function(req, res) {
    // const id = req.query.id;
    const id = "625d127d2140a08eb1365d2a";
    let inventory = 0;
    let sell = 1;

    Phone.findPhoneById(id, function(err, phone) {
        console.log(id);
        if (err) {
            console.log("Cannot find phone: " + id);
        } else {
            console.log(phone);
            inventory = phone[0].stock;
            res.send(phone);
            console.log(inventory, sell);
            Phone.updateOne({"_id": id}, 
                            {"stock": inventory - sell},
                            function(err, result) {
                                if (err) {
                                    console.log("error");
                                } else {
                                    console.log(result);
                                }
                            }); 
        }
    });
    
}