const mongoose = require('mongoose')

const ConnectDB = async ()=>
{
     mongoose.connect('mongodb://localhost:27017/learning',await console.log("connected ")
     )
}

module.exports = ConnectDB 