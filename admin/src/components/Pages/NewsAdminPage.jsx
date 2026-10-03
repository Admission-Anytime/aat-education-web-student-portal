//this page is for admin panel courses tab
import React, { useEffect, useState } from "react";
import axios from "axios";
import AddEditCourse from "./AddEditCourse";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid"; // for visibility toggle

const CoursesAdminPanel = () => {
  const [courses, setCourses] = useState([]);
  const [editingCourse, setEditingCourse] = useState(null);

  // Fetch courses from backend
  useEffect(() => {
    axios
      .get("/api/courses")
      .then((res) => setCourses(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`/api/courses/${id}`)
      .then(() => setCourses(courses.filter((c) => c._id !== id)))
      .catch((err) => console.error(err));
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFormSubmit = (updatedCourse) => {
    setCourses((prev) =>
      prev.map((c) => (c._id === updatedCourse._id ? updatedCourse : c))
    );
    setEditingCourse(null);
  };

  const handleFormCancel = () => {
    setEditingCourse(null);
  };

  // Toggle visibility function
  const toggleVisibility = (id) => {
    const course = courses.find((c) => c._id === id);
    if (!course) return;

    const updatedVisibility = !course.visible;

    // Update backend
    axios
      .patch(`/api/courses/${id}`, { visible: updatedVisibility })
      .then(() => {
        // Update frontend
        setCourses((prev) =>
          prev.map((c) =>
            c._id === id ? { ...c, visible: updatedVisibility } : c
          )
        );
      })
      .catch((err) => console.error("Error toggling visibility:", err));
  };

  if (editingCourse) {
    return (
      <AddEditCourse
        editingCourse={editingCourse}
        onSubmit={handleFormSubmit}
        onBack={handleFormCancel}
      />
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-6">
        Manage Courses
      </h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Title
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Type
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Rating
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Description
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Duration
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Fees
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Career
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Universities
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Topics
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Prerequisites
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Structure
            </th>
              {/* New Column for visibility */}
    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
      Show on Home Page
    </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {courses.map((course) => (
            <tr key={course._id} className="hover:bg-gray-50">
              <td className="px-4 py-2 text-sm font-medium text-gray-900">
                {course.title}
              </td>
              <td className="px-4 py-2 text-sm text-gray-700">{course.type}</td>
              <td className="px-4 py-2 text-sm text-gray-700">{course.rating}</td>
              <td className="px-4 py-2 text-sm text-gray-700">
                {course.description}
              </td>
              <td className="px-4 py-2 text-sm text-gray-700">{course.duration}</td>
              <td className="px-4 py-2 text-sm text-gray-700">{course.fees}</td>
              <td className="px-4 py-2 text-sm text-gray-700">
                {course.career?.join(", ") || "N/A"}
              </td>
              <td className="px-4 py-2 text-sm text-gray-700">
                {course.universities?.join(", ") || "N/A"}
              </td>
              <td className="px-4 py-2 text-sm text-gray-700">
                {course.topics?.join(", ") || "N/A"}
              </td>
              <td className="px-4 py-2 text-sm text-gray-700">
                {course.prerequisites?.join(", ") || "N/A"}
              </td>
              <td className="px-4 py-2 text-sm text-gray-700">
                {course.structure?.join(", ") || "N/A"}
              </td>
              {/* New visibility toggle column */}
      <td className="px-4 py-2 text-sm text-gray-700">
        <button
          onClick={() => toggleVisibility(course._id)}
          className={`flex items-center justify-center px-4 py-1.5 rounded-full text-white text-xs font-semibold transition-colors duration-300 shadow-sm ${
            course.visible
              ? "bg-green-500 hover:bg-green-600"
              : "bg-gray-400 hover:bg-gray-500"
          }`}
        >
          {course.visible ? (
            <>
              <EyeIcon className="h-4 w-4 mr-1" /> Yes
            </>
          ) : (
            <>
              <EyeSlashIcon className="h-4 w-4 mr-1" /> No
            </>
          )}
        </button>
      </td>
              <td className="px-4 py-2 text-sm text-gray-700 flex flex-col md:flex-row md:space-x-2 space-y-1 md:space-y-0 items-center">
                {/* Edit */}
                <button
                  onClick={() => handleEdit(course)}
                  className="p-2 rounded-full bg-green-100 hover:bg-green-200 text-green-600 hover:text-green-800 transition transform hover:scale-110"
                >
                  <PencilSquareIcon className="h-5 w-5" />
                </button>

                {/* Delete */}
                <button
                  onClick={() => handleDelete(course._id)}
                  className="p-2 rounded-full bg-red-100 hover:bg-red-200 text-red-600 hover:text-red-800 transition transform hover:scale-110"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>

                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoursesAdminPanel;
