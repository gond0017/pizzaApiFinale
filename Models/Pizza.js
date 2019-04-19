const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    
        name: { type : String , minlength: 4, maxlength: 64, required: true},

        price:  { type : Number , minlength: 1000,maxlength: 64, maxlength: 64, default: 1000},

        size:   { type : String , trim: true,  ENUM : ['small','medium','large','extra large'],default : 'small'},

        isGlutenFree: {type : Boolean , default: false},

        imageUrl: {type : String , maxlength: 1024},

        ingredients: {type: mongoose.Schema.Types.ObjectId, ref : 'Ingredient'},

        extraToppings: {type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient'}

  })
  
  const Model = mongoose.model('Pizza', schema)
  
  module.exports = Model