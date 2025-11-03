import React, { useState, useEffect } from "react";
import axios from "axios";
import { Edit2 as PencilSquareIcon, Trash2 as TrashIcon } from "lucide-react";
const BASE_URL = import.meta.env.REACT_APP_BASE_URL || "http://localhost:4001";
const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesToShow, setEntriesToShow] = useState(5);

  const fallbackImage = "/fallback.png";

  const indexOfFirstEntry = (currentPage - 1) * entriesToShow;
  const currentEntries = testimonials.slice(
    indexOfFirstEntry,
    indexOfFirstEntry + entriesToShow
  );
  const totalPages = Math.ceil(testimonials.length / entriesToShow);
  const totalEntries = testimonials.length;

  // Fetch all testimonials
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/testimonials`);
        // Add profileImageUrl for each testimonial
        const dataWithUrl = res.data.map((t) => ({
          ...t,
          profileImageUrl: t.profileImage
            ? `${BASE_URL}${t.profileImage}`
            : fallbackImage,
        }));
        console.log("testimonials.jsx 35",dataWithUrl);
        setTestimonials(dataWithUrl);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTestimonials();
  }, []);

  // Add testimonial
  const handleAddSubmit = async (data) => {
    const res = await axios.post(`${BASE_URL}/api/testimonials`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    const newTestimonial = {
      ...res.data,
      profileImageUrl: res.data.profileImage
        ? `${BASE_URL}/Uploads/${res.data.profileImage}`
        : fallbackImage,
    };
    setTestimonials([newTestimonial, ...testimonials]);
    setShowAddForm(false);
  };

  // Edit testimonial
  const handleEditSubmit = async (data) => {
    const res = await axios.put(
      `${BASE_URL}/api/testimonials/${editingTestimonial._id}`,
      data,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

   const updatedTestimonial = {
  ...res.data,
  profileImageUrl: res.data.profileImage
    ? `${BASE_URL}${res.data.profileImage}?t=${Date.now()}`
    : fallbackImage,
};

console.log("Updated Testimonial:", updatedTestimonial);

    setTestimonials((prev) =>
      prev.map((t) =>
        t._id === editingTestimonial._id ? updatedTestimonial : t
      )
    );
    setShowEditForm(false);
    setEditingTestimonial(null);
  };

  // Delete testimonial
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this testimonial?"))
      return;
    try {
      await axios.delete(`${BASE_URL}/api/testimonials/${id}`);
      setTestimonials(testimonials.filter((t) => t._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete testimonial.");
    }
  };

  const handleDropdownChange = (e) =>
    setEntriesToShow(Number(e.target.value));
  const handlePageChange = (page) => setCurrentPage(page);

  // Open edit form
  const handleEditClick = (testimonial) => {
    const tWithUrl = {
      ...testimonial,
      profileImageUrl: testimonial.profileImage
        ? `${BASE_URL}/Uploads/${testimonial.profileImage}`
        : fallbackImage,
    };
    setEditingTestimonial(tWithUrl);
    setShowEditForm(true);
  };

  // Reusable form
  const TestimonialForm = ({ testimonial = {}, onCancel, onSubmit }) => {
    const [name, setName] = useState(testimonial.name || "");
    const [designation, setDesignation] = useState(
      testimonial.designation || ""
    );
    const [message, setMessage] = useState(testimonial.message || "");
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(fallbackImage);

    // Reset form when testimonial changes
    useEffect(() => {
      setName(testimonial.name || "");
      setDesignation(testimonial.designation || "");
      setMessage(testimonial.message || "");
      setFile(null);

      if (testimonial.profileImageUrl) {
        setPreview(testimonial.profileImageUrl);
      } else if (testimonial.profileImage) {
        setPreview(`${BASE_URL}/Uploads/${testimonial.profileImage}`);
      } else {
        setPreview(fallbackImage);
      }
    }, [testimonial._id, testimonial.profileImage, testimonial.profileImageUrl]);

    // Update preview when new file selected
    useEffect(() => {
      if (file) {
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);
        return () => URL.revokeObjectURL(objectUrl);
      }
    }, [file]);

    const handleFileChange = (e) => {
      if (e.target.files && e.target.files[0]) setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      const data = new FormData();
      data.append("name", name);
      data.append("designation", designation);
      data.append("message", message);
      if (file) data.append("profileImage", file);
      await onSubmit(data);
    };

    return (
      <div className="bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4">
          {testimonial._id ? "Edit Testimonial" : "Add Testimonial"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="w-full border rounded-md p-2"
            required
          />
          <input
            type="text"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            placeholder="Designation"
            className="w-full border rounded-md p-2"
            required
          />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message"
            className="w-full border rounded-md p-2"
            rows="4"
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full"
          />
          <div className="mt-2">
            <img
              src={preview}
              alt={name || "Profile"}
              className="w-24 h-24 rounded-full object-cover"
            />
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            >
              {testimonial._id ? "Update" : "Add"}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  };

  return (
    <div className="container mx-auto ">
      {showAddForm ? (
        <TestimonialForm
          onCancel={() => setShowAddForm(false)}
          onSubmit={handleAddSubmit}
        />
      ) : showEditForm ? (
        <TestimonialForm
          testimonial={editingTestimonial}
          onCancel={() => {
            setShowEditForm(false);
            setEditingTestimonial(null);
          }}
          onSubmit={handleEditSubmit}
        />
      ) : (
        <>
          <div className="flex flex-col sm:flex-row items-center justify-between mb-4 space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-2">
              <label
                htmlFor="entries-dropdown"
                className="text-gray-700 font-medium"
              >
                Show entries:
              </label>
              <select
                id="entries-dropdown"
                className="border border-gray-300 rounded-md p-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={entriesToShow}
                onChange={handleDropdownChange}
              >
                {[5, 10].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition-colors duration-200"
            >
              + Add Testimonial
            </button>
          </div>

          <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
            <table className="min-w-full divide-y divide-gray-200 text-xs sm:text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-center">#</th>
                  <th className="px-6 py-3 text-left">Profile</th>
                  <th className="px-6 py-3 text-left">Name</th>
                  <th className="px-6 py-3 text-left">Designation</th>
                  <th className="px-6 py-3 text-left">Message</th>
                  <th className="px-6 py-3 text-center rounded-tr-lg">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentEntries.map((t, idx) => (
                  <tr key={t._id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 text-center">
                      {indexOfFirstEntry + idx + 1}
                    </td>
                    <td className="px-4 py-4">
                      <img
                        src={t.profileImageUrl || fallbackImage}
                        alt={t.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    </td>
                    <td className="px-4 py-4">{t.name}</td>
                    <td className="px-4 py-4">{t.designation}</td>
                    <td className="px-4 py-4 max-w-xs truncate">{t.message}</td>
                    <td className="px-4 py-4 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => handleEditClick(t)}
                          className="p-2 rounded-full bg-green-100 hover:bg-green-200 text-green-600 hover:text-green-800 transition transform hover:scale-110"
                        >
                          <PencilSquareIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(t._id)}
                          className="p-2 rounded-full bg-red-100 hover:bg-red-200 text-red-600 hover:text-red-800 transition transform hover:scale-110"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex flex-col items-center justify-between sm:flex-row space-y-4 sm:space-y-0">
            <div className="text-sm text-gray-700 font-medium text-center sm:text-left">
              Showing <b>{indexOfFirstEntry + 1}</b> to{" "}
              <b>{indexOfFirstEntry + currentEntries.length}</b> of{" "}
              <b>{totalEntries}</b> entries
            </div>
            <div>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded-l-md"
              >
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handlePageChange(i + 1)}
                  className={`px-3 py-1 border ${
                    currentPage === i + 1 ? "bg-blue-100" : "bg-white"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded-r-md"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Testimonial;
