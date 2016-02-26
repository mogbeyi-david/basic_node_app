var express = require('express');
var router = express.Router();
var User   = require('../model/userModel');



/* GET users listing. */
router.get('/', function(req, res, next) {
  var query = {};
  //checking if genre is not null
  if(req.query.genre){
    query.genre = req.query.genre;
  }
  //console.log("query"+query.genre);
  User.find(query,function(err,books){
    if(err)
      res.status(400).send(err);
    else
      res.json(books);
  });
});

router.post('/',function(req,res){
  var user =  new User(req.body);
  user.save();
  res.status(201).send(user);
});





module.exports = router;
