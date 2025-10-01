import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
  serialNumber: { type: Number, required: true, unique: true }, // Unique serial number
  newsTitle: { type: String, required: true },                  //  Headline of the news
  newsImage: { type: String, required: true },                  //  Image URL
  newsLink: { type: String, required: true },                   //  Link to full news
  videoTitle: { type: String },                                 //   video title
  videoLink: { type: String },                                  //   video link
}, 
{ timestamps: { createdAt: 'createdAt', updatedAt: false } 

});


const News = mongoose.model("News", newsSchema);

export default News; 
 