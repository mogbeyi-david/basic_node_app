/**
 * Created by samparsky on 2/26/16.
 */
var mongoose = require('mongoose');
var Schema  = mongoose.Schema;

var userModel = new Schema({
    username :
    {
        type : String
    },
    email :
    {
        type : String
    },
    password :
    {
        type : String
    }
});
module.exports = mongoose.model('User',userModel);

