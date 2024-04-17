const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        required:true
    },
    taste:{
        type:String,
        enum:['Sweet','Spicy','Sour'],
        required:true
    },
    is_drink:{
        type:Boolean,
        default:false,
    },
    ingretients:{
        type:[String],
        default:[],
    },
    num_sales:{
        type:Number,
        default:0,
    }
})
//create menu model
const MenuItem = mongoose.model('MenuItem',menuItemSchema);
module.exports = MenuItem;