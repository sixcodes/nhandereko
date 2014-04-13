module.exports = function(app){
    var mongoose = require('mongoose'),
        Schema   = mongoose.Schema
        ,ObjectId = Schema.ObjectId;

    var modelUser = new Schema({
        id: ObjectId,
        firstName: String,
        lastName: String,
        username: {type: String, required: true, index: {unique: true}},
        email: String,
        country: String,
        city: String,
        photo: String,
        fbId: Number,
        fbAccessToken: String,
        fbData: Schema.Types.Mixed,
        why: String

    });
    return mongoose.model('users', modelUser)
};