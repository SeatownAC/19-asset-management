'use strict';

import express from 'express';
const getRouter = express.Router();

import Profile from '../models/profile.js';
import User from '../auth/model.js';

// import auth from './middleware.js';

// router.get('/getall', auth, (req, res, next) => {
//     Profile.find()
//       .populate('image')
//       .exec()//this quits the mongoose async / populate is async
//       .then( data => {
//         console.log('DATA Image: ', data);
//         sendJSON(data);})
//       .catch(err => {
//         console.log('ERROR: ', err);
//       });
//   });

  getRouter.get('/getall/:name', (req, res, next) => {
    console.log('GETALL Route')
    console.log('REQ PARAMS Name:', req.params.name)

    let name = req.params.name
    User.findOne({username:name})
      .populate('image')
      .exec()//this quits the mongoose async / populate is async
      .then( data => {
        // console.log('DATA Image: ', data);
        // sendJSON(data);
        res.send(data)
    })
      .catch(err => {
        console.log('ERROR: ', err);
      });
  });

  export default getRouter;