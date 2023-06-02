const mongoose = require('mongoose')

const ConnectDB = async ()=>
{
     mongoose.connect('mongodb+srv://joshnagulipilli:Joshna@cluster0.f3e9guv.mongodb.net/learning',await console.log("connected ")
     )
}

module.exports = ConnectDB 