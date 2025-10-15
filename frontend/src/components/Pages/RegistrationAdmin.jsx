import React, { useEffect, useState } from "react";
import axios from "axios";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import AddEditRegistration from "./AddEditRegistration"; // Assume you have this component; adapt from AddEditCourse

const RegistrationsAdminPanel = () => {
  const [registrations, setRegistrations] = useState([]);
  const [editingRegistration, setEditingRegistration] = useState(null);
console.log(registrations);
  // Fetch registrations from backend
  /*useEffect(() => {
    axios
      .get("/api/registrations")
      .then((res) => setRegistrations(res.data))
      .catch((err) => console.error("Error fetching registrations:", err));
  }, []);*/
  useEffect(() => {
  axios
    .get("/api/registrations")
    .then((res) => setRegistrations(res.data.registrations)) // <-- use .registration  need only the registrations array from the response object 
    .catch((err) => console.error("Error fetching registrations:", err));
}, []);


  const handleDelete = (id) => {
    axios
      .delete(`/api/registrations/${id}`)
      .then(() => setRegistrations(registrations.filter((r) => r._id !== id)))
      .catch((err) => console.error("Error deleting registration:", err));
  };

  const handleEdit = (registration) => {
    setEditingRegistration(registration);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFormSubmit = (updatedRegistration) => {
    setRegistrations((prev) =>
      prev.map((r) => (r._id === updatedRegistration._id ? updatedRegistration : r))
    );
    setEditingRegistration(null);
  };

  const handleFormCancel = () => {
    setEditingRegistration(null);
  };

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
      </div>
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
            {registrations.map((registration) => (
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RegistrationsAdminPanel;
