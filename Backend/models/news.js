import mongoose from "mongoose";

/*const newsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true },
    date: { type: Date, required: true },
    image: { type: String, required: true },
    featured: { type: Boolean, default: false },
    readTime: { type: String },
    visible: { type: Boolean, default: true }       // Toggle visibility
 
}, { timestamps: true });

export default mongoose.model("News", newsSchema);*/
 
const newsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true },
    date: { type: Date, required: true },
    image: { type: String, required: true },
    featured: { type: Boolean, default: false },
    readTime: { type: String },
    
    visible: { type: Boolean, default: true } // Toggle visibility
}, { timestamps: true });

export default mongoose.models.News || mongoose.model("News", newsSchema);
