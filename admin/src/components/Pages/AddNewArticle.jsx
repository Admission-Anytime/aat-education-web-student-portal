import React, { useState, useEffect } from "react";
import axios from "axios";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

//to edit or add news and updates page entries
function AddNewArticle({ editingEntry, onSubmit, onBack }) {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState(null);
  const [featured, setFeatured] = useState(false);
  const [readTime, setReadTime] = useState("");
  

  useEffect(() => {
    if (editingEntry) {
      setTitle(editingEntry.title);
      setExcerpt(editingEntry.excerpt);
      setContent(editingEntry.content);
      setCategory(editingEntry.category);
      setDate(editingEntry.date.split("T")[0]); // format for input[type=date]
       setFeatured(Boolean(editingEntry.featured)); // <-- ensure boolean
      //setReadTime(editingEntry.readTime);
          setReadTime(editingEntry.readTime || ""); // <-- fallback if undefined
console.log(editingEntry.readTime);
    }
  }, [editingEntry]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("excerpt", excerpt);
      formData.append("content", content);
      formData.append("category", category);
      formData.append("date", date);
      if (image) formData.append("image", image);
      formData.append("featured", featured);
      formData.append("readTime", readTime);
      

      let response;
      if (editingEntry) {
        // Edit
        response = await axios.put(
          `api/news/${editingEntry._id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        // Add
        response = await axios.post("api/news", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      onSubmit(response.data); // return updated/new entry
    } catch (error) {
      console.error("Error saving article:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">
        {editingEntry ? "Edit Article" : "Add New Article"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Excerpt */}
        {/*<div>
          <label className="block text-sm font-medium text-gray-700">Excerpt</label>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            rows={3}
            required
          />
        </div>*/}
        <div>
  <label className="block text-sm font-medium text-gray-700">Excerpt</label>
  <CKEditor
    editor={ClassicEditor}
    config={{
    toolbar: [
      'heading', '|',
      'bold', 'italic', 'underline', 'link', '|',
      'alignment', 'outdent', 'indent', '|',
      'fontColor', 'fontBackgroundColor', '|',
      'insertTable', 'undo', 'redo'
    ],
  }}
    data={excerpt}
    onChange={(event, editor) => {
      const data = editor.getData();
      setExcerpt(data);
    }}
  />
</div>

        {/* Content */}
       {/*} <div>
          <label className="block text-sm font-medium text-gray-700">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            rows={6}
            required
          />
        </div>*/}

        <div>
  <label className="block text-sm font-medium text-gray-700">Content</label>
  <CKEditor
    editor={ClassicEditor}
    data={content}
    onChange={(event, editor) => {
      const data = editor.getData();
      setContent(data);
    }}
  />
</div>


        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Image */}
       {/* Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Image</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="mt-1 block w-full text-sm text-gray-500"
          />
          {editingEntry && editingEntry.image && !image && (
            <img
              src={`http://localhost:4001/Uploads/${editingEntry.image}`}
              alt="current"
              className="mt-2 w-32 h-32 object-cover rounded"
            />
          )}
        </div>
        {/* Featured */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
          />
          <label className="text-sm text-gray-700">Featured</label>
        </div>

        {/* Read Time */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Read Time (minutes)</label>
          <input
            type="text"
            value={readTime}
            onChange={(e) => setReadTime(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Buttons */}
        <div className="flex space-x-4 mt-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg"
          >
            {editingEntry ? "Update Article" : "Add Article"}
          </button>
          <button
            type="button"
            onClick={onBack}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg shadow-lg"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddNewArticle;
