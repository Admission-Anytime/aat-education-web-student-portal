import React, { useState } from "react";
import axios from "axios";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const AddNewBlogwithckeditor = () => {
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [status, setStatus] = useState("Draft");

  const handleImageChange = (e) => {
    setCoverImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Title:", title);
      console.log("Short Description:", shortDescription);
      console.log("Long Description:", longDescription);
      console.log("Cover Image:", coverImage);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("shortDescription", shortDescription);
      formData.append("longDescription", longDescription);
      formData.append("status", status);
      if (coverImage) formData.append("coverImage", coverImage);

      const response = await axios.post(
        "http://localhost:4001/api/blogs",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log("Blog created successfully:", response.data);
      alert("Blog created successfully!");
      // Reset form
      setTitle("");
      setShortDescription("");
      setLongDescription("");
      setCoverImage(null);
      setStatus("Draft");
    } catch (error) {
      console.error("Error submitting blog:", error);
      alert("Error submitting blog: " + error.message);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add New Blog</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            className="mt-1 block w-full border rounded-md p-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-1 block w-full border rounded-md p-2"
          >
            <option value="Draft">Draft</option>
            <option value="Published">Published</option>
          </select>
        </div>

        {/* Short Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Short Description
          </label>
          <CKEditor
            editor={ClassicEditor}
            data={shortDescription}
            onChange={(event, editor) =>
              setShortDescription(editor.getData())
            }
          />
        </div>

        {/* Long Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Full Description
          </label>
          <CKEditor
            editor={ClassicEditor}
            data={longDescription}
            onChange={(event, editor) => setLongDescription(editor.getData())}
          />
        </div>

        {/* Cover Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Cover Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 block w-full border rounded-md p-2"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Submit Blog
        </button>
      </form>
    </div>
  );
};

export default AddNewBlogwithckeditor;
