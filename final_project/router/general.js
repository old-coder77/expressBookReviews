const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.send(JSON.stringify(books));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  console.log(isNaN(isbn));
  console.log(isbn);
  if (!isNaN(isbn)) {
        const book = books[isbn];
       
        if (book) {
            return res.send(JSON.stringify(book));
        } else {
            return res.status(300).json({message: "Sorry, we do  not carry this book"});
        } 
    }else {
        return res.status(300).json({message: "Please enter a number"});
    }
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const author = req.params.author;
  const keys = Object.keys(books);
  var bookSend = [];

  for (let i = 0; i < keys.length; i++) {
      const book = books[keys[i]];
      if (book.author === author) {
          bookSend.push(book);
      }
    }

    
    if (bookSend.length === 0) {
        return res.status(300).json({message: "We do not carry any books by this author"});
    } else {
        return res.send(JSON.stringify(bookSend));
    }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title;
    const keys = Object.keys(books);
    var bookSend = [];
  
    for (let i = 0; i < keys.length; i++) {
        const book = books[keys[i]]; 
        if (book.title === title) {
            bookSend.push(book);
        }
      }
  
      
      if (bookSend.length === 0) {
          return res.status(300).json({message: "We do not carry any books by this author"});
      } else {
          return res.send(JSON.stringify(bookSend));
      }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
