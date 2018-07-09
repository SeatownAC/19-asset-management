'use strict';

require('dotenv').config({path: `${__dirname}/../../../../.env`});
// this is a way to bring in your env file for your tests but you can use this method anywhere

const mongoose = require('mongoose');
const supertest = require('supertest');
const {app} = require('../../../../src/app.js');

const request = supertest(app);

describe('/upload', () => {

  beforeAll( () => {
    mongoose.connect(process.env.MONGODB_URI);
  });
  afterAll( () => {
    mongoose.connection.close();
  });

  it('POST /upload  200', () => {

    // return request.get('/signin')
    //   .auth('john','john')
    //   .then(response => {
    //     console.log('RESPONSE: ',response.text)
    //   })
    //   .catch( () => {
    //     console.log('ERROR')
    //   })

    return request.get('/signin')
      .auth('max','max')
      .then(response => {
        return request.post(`/upload`)
          .set('Authorization', `Bearer ${response.text}`)
          .field('title', 'my image')
          .attach('img', `${__dirname}/asset/mario-sell.gif`)
          .then(res => {
            expect(res.status).toEqual(200);
            expect(res.body.url).toBeTruthy();
          });
      });

  });
});


