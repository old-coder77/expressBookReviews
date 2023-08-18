const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
    let userswithsamename = users.filter((user)=>{
        return user.username === username
      });
      if(userswithsamename.length > 0){
        return true;
      } else {
        return false;
      }
    }




const authenticatedUser = (username,password)=>{ //returns boolean
        let validusers = users.filter((user)=>{
          return (user.username === username && user.password === password)
        });
        if(validusers.length > 0){
          return true;
        } else {
          return false;
        }
      }
    

//only registered users can login
regd_users.post("/login", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (!username || !password) {
        return res.status(404).json({message: "Error logging in"});
    }
    if (authenticatedUser(username,password)) {
      let accessToken = jwt.sign({
        data: password
      }, 'access', { expiresIn: 60 * 60 });
      req.session.authorization = {
        accessToken,username
    }
    return res.status(200).send("User successfully logged in");
    } else {
      return res.status(208).json({message: "Invalid Login. Check username and password"});
    }
  });


// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const review = req.query["review"];
    const user = req.user;
    console.log("The ISBN is: " + isbn);
    console.log("The review is " + review);
    console.log("The username is:" + user);
    if (!isNaN(isbn)) {
          const book = books[isbn];
          if (book) {
            Object.assign(book.reviews, { user: { "review": review } });
             console.log("The book reviews are: " + book.reviews);
              return res.send(JSON.stringify(book.reviews));
          } else {
              return res.status(300).json({message: "Sorry, we do  not carry this book"});
          } 
      }else {
          return res.status(300).json({message: "Please enter a number"});
      }
   });

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
