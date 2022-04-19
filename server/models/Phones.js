const mongoose = require("./db");
const Schema = mongoose.Schema;

const phoneSchema = Schema({
  title: String,
  brand: String,
  image: String,
  stock: Number,
  seller: String,
  price: Number,
  reviews: Array
});

// phoneSchema.statics.findPhoneByBrand = function(brand, callback) {
//   return this.find({"brand": brand})
//   .select({"title": 1, "seller": 1, "brand": 1, "price": 1})
//   .limit(5)
//   .exec(callback);
// }

phoneSchema.statics.findPhoneById = function(id, callback) {
  return this.find({"_id": id})
  .select({"_id": 1, "stock": 1})
  .exec(callback);
}

// phoneSchema.statics.updatePhoneById = function(id, sell, inventory, callback) {
//   console.log(this.stock);
//   return this.update(
//       {"_id": id},
//       {$set: {"stock": inventory - sell}},
//       {multi: false}
//     )
//     .exec(callback);
//   }
    
// phoneSchema.methods.updatePhoneById = function(id, sell, inventory, callback) {
//   return this.model("Phone")
//   .where({"_id": id})  
//   .update({"stock": inventory - sell})
//   .exec(callback);
// }
    
module.exports = Phone = mongoose.model("Phone", phoneSchema, "phones");