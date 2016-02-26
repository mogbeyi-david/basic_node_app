/**
 * Created by samparsky on 2/26/16.
 */
var express = require('express');
var router  = express.Router();
var  Book    = require('../model/bookModel');

router.post('/',function(req,res){
    var book =  new Book(req.body);
    book.save();
    res.status(201).send(book);
});

router.use('/:bookId',function(req,res,next){
    Book.findById(req.params.bookId,function(err,books){
        if(err){
            res.status(400).send(err);
        }
        else if(book) {
            req.book = book;
            next();
        }
        else
        {
            res.status(404).send('No book found');
        }
    });
});

router.put('/:bookId',function(req,res){
    Book.findById(req.params.bookId,function(err,book){
            req.book.title  = req.body.title;
            req.book.author = req.body.author;
            req.book.genre  = req.body.genre;
            req.book.read   = req.body.read;
            req.book.save(function(err){
                if(err)
                    res.status(500).send(err);
                else
                    res.json(req.book);
            });
    });
});
router.patch('/:bookId',function(req,res){
    if(req.body._id )
        delete req.body._id;

   for(var p in req.body){
       req.book[p] = req.body[p];
   }
    req.book.save(function(err){
        if(err)
            res.status(500).send(err);
        else
            res.json(req.book);
    });
});
router.patch('/:bookId',function(req,res){
   req.book.remove(function(err){
       if(err)
           res.status(500).send(err);
       else
           res.status(204).send("Removed Successfully");
   })
});

router.get('/',function(req,res,next){

    var query = {};
    //checking if genre is not null
    if(req.query.genre){
        query.genre = req.query.genre;
    }
    console.log("query"+query.genre);
    Book.find(query,function(err,books){
        if(err)
            res.status(400).send(err);
        else
            res.json(books);
    });
    //res.send('hello');
});

router.get('/:bookId',function(req,res){
    res.json(req.book);
});

module.exports = router;
