'use strict';

import express from 'express';
// import multer from 'multer';
import auth from '../auth/middleware.js';
import Profile from '../models/profile.js';
import Image from '../models/image.js';


import s3 from '../lib/s3.js';
//need to comment out for POL

// const upload = multer({dest: `${__dirname}/../tmp`});

const deleteRouter = express.Router();

deleteRouter.get('/delete', auth, (req, res, next) => {

// let file = req.files[0];
  // instead i have to FIND the files from the image model
  let username = res.cookie

  /*
{
        "_id" : ObjectId("5b42bd32b54e45504db4982a"),
        "email" : "max@max.com",
        "password" : "$2b$10$/GPk4.jd4QylQJ6dweHbTe.PX8v5z35oq6Q4cqQe3B2mudok0v8au",
        "username" : "max",
        "__v" : 0
}
  */
  Profile.find({username : `${res.cookie}`})
  .populate('image')
  .exec()
  .then( data => {
    return s3.remove(file.path, key)
    .then(url => {
      let output = {
        url: url,
      };
      res.send(output);
    })
    .catch(next); 
  })


  let key = `${file.filename}.${file.originalname}`;

  return s3.remove(file.path, key)
    .then(url => {
      let output = {
        url: url,
      };
      res.send(output);
    })
    .catch(next);

  res.sendStatus(418);
  
});

export default deleteRouter;
