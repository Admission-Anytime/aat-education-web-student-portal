import React, { useEffect, useState } from "react";
import axios from "axios";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import AddEditRegistration from "./AddEditRegistration"; // import your Add/Edit component

const BASE_URL = import.meta.env.REACT_APP_BASE_URL || "http://localhost:4001";

const RegistrationsAdmin = () => {
  const [registrations, setRegistrations] = useState([]); // Always start as an empty array
  const [editingRegistration, setEditingRegistration] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("All");

  // ✅ Fetch registrations from backend safely
  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/registrations`)
      .then((res) => {
        console.log("API Response:", res.data);
        // ✅ Handle different possible response structures
        const data =
          res.data.registrations || res.data.data || res.data || [];
        setRegistrations(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Error fetching registrations:", err);
        setRegistrations([]); // Always set to empty array on error
      });
  }, []);

  // ✅ Delete registration
  const handleDelete = (id) => {
    if (!registrations || registrations.length === 0) return;

    axios
      .delete(`${BASE_URL}/api/registrations/${id}`)
      .then(() => {
        setRegistrations((prev) =>
          (prev || []).filter((r) => r._id !== id)
        );
      })
      .catch((err) => console.error("Error deleting registration:", err));
  };

  // ✅ Edit registration
  const handleEdit = (registration) => {
    setEditingRegistration(registration);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ✅ Handle form submission (update existing registration)
  const handleFormSubmit = (updatedRegistration) => {
    setRegistrations((prev) =>
      (prev || []).map((r) =>
        r._id === updatedRegistration._id ? updatedRegistration : r
      )
    );
    setEditingRegistration(null);
  };

  // ✅ Cancel editing
  const handleFormCancel = () => {
    setEditingRegistration(null);
  };

  // ✅ Filter and sort registrations
  const statusOrder = ["Under Review", "Pending", "Approved", "Rejected"];
  const filteredAndSortedRegistrations = (registrations || [])
    .filter(
      (registration) =>
        selectedStatus === "All" || registration.status === selectedStatus
    )
    .sort(
      (a, b) =>
        statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status)
    );

  // ✅ If editing, render AddEditRegistration component
  if (editingRegistration) {
    return (
      <AddEditRegistration
        editingRegistration={editingRegistration}
        onSubmit={handleFormSubmit}
        onBack={handleFormCancel}
      />
    );
  }

  return (
    <div>
      <div>
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-6">
          Manage Registrations
        </h2>

        {/* Filter Dropdown */}
        <div className="mb-4">
          <label
            htmlFor="statusFilter"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Filter by Status:
          </label>
          <select
            id="statusFilter"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="block w-full max-w-xs px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="All">All</option>
            <option value="Under Review">Under Review</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-md p-4">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Registration ID
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Programme Name
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Student First Name
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Student Last Name
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Student Email
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Student Phone
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Status
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Created At
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {filteredAndSortedRegistrations.length > 0 ? (
              filteredAndSortedRegistrations.map((registration) => (
                <tr key={registration._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm font-medium text-gray-900">
                    {registration.registrationId}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {registration.programmeName}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {registration.studentFirstName}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {registration.studentLastName}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {registration.studentEmail}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {registration.studentPhone}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {registration.status}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {new Date(registration.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700 flex space-x-2 items-center">
                    <button
                      onClick={() => handleEdit(registration)}
                      className="p-2 rounded-full bg-green-100 hover:bg-green-200 text-green-600 hover:text-green-800 transition transform hover:scale-110"
                    >
                      <PencilSquareIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(registration._id)}
                      className="p-2 rounded-full bg-red-100 hover:bg-red-200 text-red-600 hover:text-red-800 transition transform hover:scale-110"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="9"
                  className="text-center py-4 text-gray-500 text-sm"
                >
                  No registrations found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RegistrationsAdmin;
