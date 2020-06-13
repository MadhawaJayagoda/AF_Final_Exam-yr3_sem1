let mongoose = require('mongoose');

const placeSchema = mongoose.Schema({
    place_name: {
        type: String,
        required: true
    },
    place_location: {
        type: String,
        required: true
    },
    description : {
        type : String,
        required : true,
    },
    todo_activities : {
        type : String,
        default : ''
    },
    imgSrc : {
        type : String,
        default: ''
    },
    editDetails : {
        type : Boolean,
        default : false
    }
});

module.exports = mongoose.model('places', placeSchema);