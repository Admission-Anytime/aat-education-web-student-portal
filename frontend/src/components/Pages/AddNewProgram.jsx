//to add ot edit corporate training programs
import React, { useState, useEffect } from "react";
import axios from "axios";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const BASE_URL = import.meta.env.REACT_APP_BASE_URL || "http://localhost:4001";

const AddNewProgram = ({ editingProgram, onSubmit, onBack }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [courses, setCourses] = useState([""]);
  const [iconName, setIconName] = useState("Monitor");
  const [color, setColor] = useState("text-blue-500");
  const [bgGradient, setBgGradient] = useState("from-blue-100 to-blue-300");

  useEffect(() => {
    if (editingProgram) {
      setTitle(editingProgram.title || "");
      setDescription(editingProgram.description || "");
      setCourses(editingProgram.courses || [""]);
      setIconName(editingProgram.iconName || "Monitor");
      setColor(editingProgram.color || "text-blue-500");
      setBgGradient(editingProgram.bgGradient || "from-blue-100 to-blue-300");
    }
  }, [editingProgram]);

  const handleCourseChange = (index, value) => {
    const newCourses = [...courses];
    newCourses[index] = value;
    setCourses(newCourses);
  };

  const addCourseField = () => setCourses([...courses, ""]);
  const removeCourseField = (index) => {
    const newCourses = courses.filter((_, i) => i !== index);
    setCourses(newCourses);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        title,
        description,
        courses: courses.filter((c) => c.trim() !== ""),
        iconName,
        color,
        bgGradient,
      };

      let response;
      if (editingProgram) {
        response = await axios.put(`/api/corporatetraining/${editingProgram._id}`, data);
      } else {
        response = await axios.post("/api/corporatetraining", data);
      }

      onSubmit(response); // Return updated/new program
    } catch (err) {
      console.error("Error saving program:", err);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={onBack}
    >
      <div
        className="bg-white rounded-2xl max-w-3xl w-full p-6 shadow-2xl overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-6">
          {editingProgram ? "Edit Program" : "Add New Program"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Program Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Description */}
          {/*<div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <CKEditor
              editor={ClassicEditor}
              data={description}
              onChange={(event, editor) => setDescription(editor.getData())}
            />
          </div>*/}
{/* Description - Plain Text */}
<div>
  <label className="block text-sm font-medium text-gray-700">Description</label>
  <textarea
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
    placeholder="Enter program description"
    rows={3} // Adjust height as needed
    required
  />
</div>

          {/* Courses / Key Modules */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Key Modules</label>
            {courses.map((course, idx) => (
              <div key={idx} className="flex items-center mt-2 space-x-2">
                <input
                  type="text"
                  value={course}
                  onChange={(e) => handleCourseChange(idx, e.target.value)}
                  className="flex-1 border border-gray-300 rounded-md p-2"
                  placeholder={`Module ${idx + 1}`}
                  required
                />
                {courses.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeCourseField(idx)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addCourseField}
              className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              + Add Module
            </button>
          </div>

          {/* Icon Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Icon Name</label>
            <input
              type="text"
              value={iconName}
              onChange={(e) => setIconName(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
              placeholder="e.g., Monitor, Palette, Code"
            />
          </div>

          {/* Color */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Color Class</label>
            <input
              type="text"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
              placeholder="e.g., text-blue-500"
            />
          </div>

          {/* Background Gradient */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Background Gradient</label>
            <input
              type="text"
              value={bgGradient}
              onChange={(e) => setBgGradient(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
              placeholder="e.g., from-blue-100 to-blue-300"
            />
          </div>

          {/* Buttons */}
          <div className="flex space-x-4 mt-4">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg"
            >
              {editingProgram ? "Update Program" : "Add Program"}
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
    </div>
  );
};

export default AddNewProgram;
