import mongoose, {Schema} from 'mongoose';

const Profile = mongoose.Schema({
  username: { type: String, uppercase: true, required:true },
//   color: { type: String, uppercase: true, required:true },
  //will make the dog constructor have a cat, what, youve never heard of Catdog

  ////////////////////////////////////////////


  image : {type: Schema.Types.ObjectId, ref : 'image'},

  ////////////////////////////////////////////
});

export default mongoose.model('profile', Profile);
//dogs is the name of the schemas