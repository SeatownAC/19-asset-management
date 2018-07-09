//following a new upload of an image create a new entry in this model connected to the profile model

import mongoose from 'mongoose';
const Image = mongoose.Schema({
  filename: { type: String, uppercase: true, required:true },
  key: { type: String, uppercase: true, required:true },

//   color: { type: String, uppercase: true, required:true },

});

export default mongoose.model('image', Image);
