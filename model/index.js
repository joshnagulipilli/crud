const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  UserName: {
    type: String,
    require: true,
    uppercase: true,
  },
  age: {
    type: Number,
    require: true,
  },
  email: {
    type: String,
    require: true,
    minlength: 10,
  },
  password: {
    type: String,
    require: true,
  },
  gender: {
    type: String,
    require: true,
  },

  State: {
    type: String,
    require: true,
  }
});


module.exports=mongoose.model("User" , UserSchema)
