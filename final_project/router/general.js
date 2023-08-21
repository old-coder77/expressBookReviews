const express = require('express');
let books = require("./booksdb.js");
letisValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

const doesExist = (username)=>{
    let userswithsamename = users.filter((user)=>{
      return user.username === username
    });
    if(userswithsamename.length > 0){
      return true;
    } else {
      return false;
    }
  }


public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username && password) {
      if (!doesExist(username)) {
        users.push({"username":username,"password":password});
        return res.status(200).json({message: "Customer successfully registred. Now you can login"});
      } else {
        return res.status(404).json({message: "Customer already exists!"});
      }
    }
    return res.status(404).json({message: "You must provide both a username and a password"});
  });



// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.send(JSON.stringify(books));
});

// Get the book list available in the shop via Promise
public_users.get('/allbooks',function (req, res) {
    //Write your code here
    const all_books = new Promise((resolve,reject) => {
        resolve(res.send(JSON.stringify({books}, null, 4)));
    });
    all_books.then(() => console.log("Promise for Task 10 resolved"));
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

 // Get book details based on ISBN
public_users.get('/isbnpromise/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    console.log(isNaN(isbn));
    console.log(isbn);
   const book = new Promise((resolve,reject) => {
        if (!isNaN(isbn)) {
            const book = books[isbn];
            if (book) {
                resolve(res.send(JSON.stringify({book}, null, 4)));
            } else {
                reject(res.status(300).json({message: "Sorry, we do  not carry this book"}));
            }


        } else {
            reject(res.status(300).json({message: "Please enter a number"}));
        }
    });

    book.then(function() {
        console.log("Promise for Task 11 resolved");
    }).catch(function () {
        console.log('Promise for Task 11 rejected');
});
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

public_users.get('/authorpromise/:author',function (req, res) {
  const author = req.params.author;
  const keys = Object.keys(books);
  const resolved = new Promise((resolve,reject) => {
  	var bookSend = [];

  	for (let i = 0; i < keys.length; i++) {
      		const book = books[keys[i]];
      		if (book.author === author) {
          		bookSend.push(book);
      		}
    	}


    	if (bookSend.length === 0) {
        reject(res.status(300).json({message: "We do not carry any books by this author"}));
    	} else {
    	    resolve(res.send(JSON.stringify(bookSend,null,4)));
    	}
    });
    
    resolved.then(function() {
            console.log("Promise for Task 12 resolved");
        }).catch(function () {
            console.log('Promise for Task 12 rejected');
});
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
          return res.status(300).json({message: "We do not carry any books with this title"});
      } else {
          return res.send(JSON.stringify(bookSend));
      }
});

// Get all books based on title

public_users.get('/titlepromise/:title',function (req, res) {
    const title = req.params.title;
    const keys = Object.keys(books);
    const resolved = new Promise((resolve,reject) => {
    	var bookSend = [];

    	for (let i = 0; i < keys.length; i++) {
    	    const book = books[keys[i]];
    	    if (book.title === title) {
    	        bookSend.push(book);
    	    }
    	  }


    	  if (bookSend.length === 0) {
    	      reject(res.status(300).json({message: "We do not carry any books with this title"}));
    	  } else {
    	      resolve(res.send(JSON.stringify(bookSend,null,4)));
    	  }
      
      });
          
          resolved.then(function() {
                  console.log("Promise for Task 13 resolved");
              }).catch(function () {
            console.log('Promise for Task 13 rejected');
});
});
//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    console.log(isNaN(isbn));
    console.log(isbn);
    if (!isNaN(isbn)) {
          const book = books[isbn];

          if (book) {
              return res.send(JSON.stringify(book.reviews));
          } else {
              return res.status(300).json({message: "Sorry, we do  not carry this book"});
          }
      }else {
          return res.status(300).json({message: "Please enter a number"});
      }
   });
module.exports.general = public_users;
