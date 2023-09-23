const mongoose = require('mongoose');


const grocery = new mongoose.Schema({
    category:String,
    name: String,
    price: String,
    area: String,
    priceInQuintal: String,
    priceInKg: String,
    contactNumber: String,
    
  
});

const Grocery = mongoose.model('grocerys', grocery);

module.exports = Grocery;
