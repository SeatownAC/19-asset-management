'use strict';

import express from 'express';
import multer from 'multer';
import auth from '../auth/middleware.js';
import Image from '../models/image.js'

import s3 from '../lib/s3.js';
//need to comment out for POL

const upload = multer({dest: `${__dirname}/../tmp`});
// telling multer where we should upload our stuff temporarily 
// will we need to comment this

const uploadRouter = express.Router();

uploadRouter.post('/upload', auth, upload.any(), (req, res, next) => {
  // after the auth middleware we want to add the file upload middleware that multer offers. upload function is a multer function where you can choose what file type you want to allow? to ssend up
  // multer puts files on request.files and thats an array

  //POL route without auth / add auth to make it a protected route
  // uploadRouter.post('/upload',auth, (req, res, next) => {

  let file = req.files[0];
  //multer return an array so for this reason we select from req.files the 1st one by [0]

  //amazon denotes filenames as "keys"
  //filename is going to be a hashed multer does this
  let key = `${file.filename}.${file.originalname}`;

  // console.log('body: ', req.body)
  // console.log('file: ', req.files)
  // console.log('key: ', key)
  // res.send('you uploaded it')
  // this is just to POL

  // if(!req.body.title || req.files.length > 1 || req.files[0].fieldname !== 'img')
  //   return next('title or sample was not provided');

  //uploading to s3 the file path from the multer object stored in file and the key derived from the filename multer hashed . the original filename
  let filename = file.originalname;
  let newImage = new Image({filename:filename, key:key});
  newImage.save()
    .then( () => console.log('NEW IMAGE ADDED TO image model'))
    .catch( next);


  return s3.upload(file.path, key)
    .then(url => {
      let output = {
        url: url,
      };
      res.send(output);
    })
    .catch(next);

  res.sendStatus(418);
  
});

export default uploadRouter;
