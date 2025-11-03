import React, { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.REACT_APP_BASE_URL || "http://localhost:4001";

function AddEditCourse({ editingCourse, onSubmit, onBack }) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [rating, setRating] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [fees, setFees] = useState("");
  const [career, setCareer] = useState("");
  const [universities, setUniversities] = useState("");
  const [topics, setTopics] = useState("");
  const [prerequisites, setPrerequisites] = useState("");
  const [structure, setStructure] = useState("");

  useEffect(() => {
    if (editingCourse) {
      setTitle(editingCourse.title || "");
      setType(editingCourse.type || "");
      setRating(editingCourse.rating || "");
      setDescription(editingCourse.description || "");
      setDuration(editingCourse.duration || "");
      setFees(editingCourse.fees || "");
      setCareer(editingCourse.career?.join(", ") || "");
      setUniversities(editingCourse.universities?.join(", ") || "");
      setTopics(editingCourse.topics?.join(", ") || "");
      setPrerequisites(editingCourse.prerequisites?.join(", ") || "");
      setStructure(editingCourse.structure?.join(", ") || "");
    }
  }, [editingCourse]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        title,
        type,
        rating,
        description,
        duration,
        fees,
        career: career.split(",").map((c) => c.trim()),
        universities: universities.split(",").map((u) => u.trim()),
        topics: topics.split(",").map((t) => t.trim()),
        prerequisites: prerequisites.split(",").map((p) => p.trim()),
        structure: structure.split(",").map((s) => s.trim()),
      };

      let response;
      if (editingCourse) {
        response = await axios.put(`/api/courses/${editingCourse._id}`, data);
      } else {
        response = await axios.post("/api/courses", data);
      }

      onSubmit(response.data);
    } catch (err) {
      console.error("Error saving course:", err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">
        {editingCourse ? "Edit Course" : "Add New Course"}
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

        {/* Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Type</label>
          <input
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Rating</label>
          <input
            type="number"
            step="0.1"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            rows={3}
          />
        </div>

        {/* Duration */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Duration</label>
          <input
            type="text"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Fees */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Fees</label>
          <input
            type="text"
            value={fees}
            onChange={(e) => setFees(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Career */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Career (comma separated)</label>
          <input
            type="text"
            value={career}
            onChange={(e) => setCareer(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Universities */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Universities (comma separated)</label>
          <input
            type="text"
            value={universities}
            onChange={(e) => setUniversities(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Topics */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Topics (comma separated)</label>
          <input
            type="text"
            value={topics}
            onChange={(e) => setTopics(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Prerequisites */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Prerequisites (comma separated)</label>
          <input
            type="text"
            value={prerequisites}
            onChange={(e) => setPrerequisites(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Structure */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Structure (comma separated)</label>
          <input
            type="text"
            value={structure}
            onChange={(e) => setStructure(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Buttons */}
        <div className="flex space-x-4 mt-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg"
          >
            {editingCourse ? "Update Course" : "Add Course"}
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

export default AddEditCourse;
