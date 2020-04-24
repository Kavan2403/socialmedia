const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    fullname: {
        type: String,
        default: ''
    },
    firstname: {
        type: String,
        default: ''
    },
    lastname: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    image: {
        type: String,
        default: ''
    },
    phone: {
        type: Number
    },
    location: {
        type: String
    },
    fbTockens: Array,
    facebook: {
        type: String
    },
    google: {
        type: String
    },
    instagram: {
        type: String
    }
},{
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
});
module.exports = mongoose.model('user',userSchema);