import React, { useState, useEffect } from "react";
import axios from "axios";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const BASE_URL = import.meta.env.REACT_APP_BASE_URL || "http://localhost:4001";

function AddNewArticle({ editingEntry, onSubmit, onBack }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [courses, setCourses] = useState([]);
  const [date, setDate] = useState("");
  const [image, setImage] = useState(null);
  const [featured, setFeatured] = useState(false);

  useEffect(() => {
    if (editingEntry) {
      setTitle(editingEntry.title);
      setDescription(editingEntry.description);
      setCourses(editingEntry.courses || []);
      setDate(editingEntry.date ? editingEntry.date.split("T")[0] : "");
      setFeatured(Boolean(editingEntry.featured));
    }
  }, [editingEntry]);

  // Add a new empty course
  const addCourse = () => setCourses([...courses, ""]);

  // Update course
  const updateCourse = (index, value) => {
    const updated = [...courses];
    updated[index] = value;
    setCourses(updated);
  };

  // Remove course
  const removeCourse = (index) => {
    const updated = [...courses];
    updated.splice(index, 1);
    setCourses(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("courses", JSON.stringify(courses)); // store as JSON
      formData.append("date", date);
      if (image) formData.append("image", image);
      formData.append("featured", featured);

      let response;
      if (editingEntry) {
        response = await axios.put(`/api/corporatetraining/${editingEntry._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        response = await axios.post("/api/corporatetraining", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      onSubmit(response.data);
    } catch (error) {
      console.error("Error saving program:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">
        {editingEntry ? "Edit Program" : "Add New Program"}
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

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <CKEditor
            editor={ClassicEditor}
            data={description}
            onChange={(event, editor) => {
              const data = editor.getData();
              setDescription(data);
            }}
          />
        </div>

        {/* Key Modules / Courses */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Key Modules</label>
          <div className="space-y-2 mt-1">
            {courses.map((course, idx) => (
              <div key={idx} className="flex gap-2 items-center">
                <input
                  type="text"
                  value={course}
                  onChange={(e) => updateCourse(idx, e.target.value)}
                  className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                  required
                />
                <button
                  type="button"
                  onClick={() => removeCourse(idx)}
                  className="bg-red-100 hover:bg-red-200 text-red-700 px-2 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addCourse}
              className="mt-2 bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded shadow"
            >
              + Add Module
            </button>
          </div>
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
        <div>
          <label className="block text-sm font-medium text-gray-700">Image</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="mt-1 block w-full text-sm text-gray-500"
          />
          {editingEntry && editingEntry.image && !image && (
            <img
              src={`${BASE_URL}/Uploads/${editingEntry.image}`}
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

        {/* Buttons */}
        <div className="flex space-x-4 mt-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg"
          >
            {editingEntry ? "Update Program" : "Add Program"}
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
