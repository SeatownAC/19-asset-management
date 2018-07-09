'use strict';

const fs = require('fs-extra');
const aws = require('aws-sdk');
//
const s3 = new aws.S3();

// resolve a url

const upload = (path, key) => {

  let config = {
    Bucket: process.env.AWS_BUCKET,
    Key: key,
    ACL: 'public-read',
    Body: fs.createReadStream(path)
  };

  return s3.upload(config)
    .promise()
    //this is how you turn it into a promise at amazon
    .then(res => { // onSuccess
      console.log("AWS URL", res.Location);
      return fs.remove(path) // delete local file
        .then(() => res.Location); // resolve s3 url 
    })
    .catch(err => { // onFailure
      console.error("ERROR", err);
      return fs.remove(path) // delete local file
        .then(() => Promise.reject(err)); // continue rejecting error
    });
    
};


//from AWS docs
// var params = {
//   Bucket: 'STRING_VALUE', /* required */
//   Key: 'STRING_VALUE', /* required */
//   MFA: 'STRING_VALUE',
//   RequestPayer: requester,
//   VersionId: 'STRING_VALUE'
// };
// s3.deleteObject(params, function(err, data) {
//   if (err) console.log(err, err.stack); // an error occurred
//   else     console.log(data);           // successful response
// });

const remove = (key) => {
  return s3.deleteObject({
    Key: key,
    Bucket: process.env.AWS_BUCKET,
  })
    .promise();
}; 

export default {upload,remove};


