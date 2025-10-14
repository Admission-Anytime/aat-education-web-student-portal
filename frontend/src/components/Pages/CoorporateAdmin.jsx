import React, { useState, useEffect } from "react";
import axios from "axios";
import * as Icons from "lucide-react";
import { ChevronRight, Mail, X } from "lucide-react";
import AddNewProgram from "./AddNewProgram"; // Your form component for add/edit
import { PencilSquareIcon, TrashIcon,EyeSlashIcon, EyeIcon } from "@heroicons/react/24/outline";

const CorporateTrainingProgramTable = () => {
  const [programs, setPrograms] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesToShow, setEntriesToShow] = useState(5);
  const [showAddArticle, setShowAddArticle] = useState(false);

  // Fetch programs
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const res = await axios.get("/api/corporatetraining");
        setPrograms(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPrograms();
  }, []);

  // Filtered programs
  const filteredPrograms = programs.filter((p) => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return true;
    const inCourses = p.courses?.some((c) => c.toLowerCase().includes(term));
    return (
      p.title.toLowerCase().includes(term) ||
      p.description.toLowerCase().includes(term) ||
      inCourses
    );
  });

  // Pagination
  const indexOfFirst = (currentPage - 1) * entriesToShow;
  const currentEntries = filteredPrograms.slice(
    indexOfFirst,
    indexOfFirst + entriesToShow
  );
  const totalPages = Math.ceil(filteredPrograms.length / entriesToShow);

  // Edit program
  const handleEdit = (id) => {
    setSelectedProgram(id);
    setShowAddArticle(true);
  };

  // Delete program
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this program?")) {
      try {
        await axios.delete(`/api/corporatetraining/${id}`);
        setPrograms(programs.filter((p) => p._id !== id));
      } catch (err) {
        console.error("Failed to delete program:", err);
      }
    }
  };

  // View program details modal
  const renderModal = () => {
    const program = programs.find((p) => p._id === selectedProgram);
    if (!program) return null;

    const getIcon = (iconName, colorClass) => {
      const Icon = Icons[iconName] || Icons.Monitor;
      return <Icon className={`w-6 h-6 ${colorClass}`} />;
    };

    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        onClick={() => setSelectedProgram(null)}
      >
        <div
          className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className={`bg-gradient-to-br ${program.bgGradient} p-6 relative rounded-t-2xl border-b-4 border-blue-200`}
          >
            <div className={`${program.color} absolute top-6 left-6`}>
              {getIcon(program.iconName, program.color)}
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2 pt-10">
              {program.title}
            </h3>
            <button
              onClick={() => setSelectedProgram(null)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition-colors duration-200 bg-white p-2 rounded-full shadow-xl"
            >
              <X className="w-5 h-5" />
            </button>
            <p className="text-gray-700 mt-2">{program.description}</p>
          </div>

          <div className="p-6">
            <h4 className="font-bold text-gray-900 mb-4 text-xl border-l-4 border-blue-500 pl-3">
              Key Modules
            </h4>
            <ul className="space-y-3">
              {program.courses.map((course, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-gray-700 p-3 bg-gray-50 rounded-lg hover:bg-blue-50"
                >
                  <ChevronRight className="w-5 h-5 text-blue-600 mt-0.5" />
                  <span className="font-medium">{course}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex justify-center">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-all flex items-center gap-2 shadow-xl">
                <Mail className="w-5 h-5" /> Enroll / Discuss Program
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Add/Edit Program modal
  const renderAddArticleModal = () => {
    if (!showAddArticle) return null;
    return (
      <AddNewProgram
        editingProgram={selectedProgram ? programs.find((p) => p._id === selectedProgram) : null}
        onSubmit={(data) => {
          // Refresh table after add/edit
          setPrograms((prev) => {
            if (selectedProgram) {
              return prev.map((p) => (p._id === data.data._id ? data.data : p));
            } else {
              return [...prev, data.data];
            }
          });
          setShowAddArticle(false);
          setSelectedProgram(null);
        }}
        onBack={() => {
          setShowAddArticle(false);
          setSelectedProgram(null);
        }}
      />
    );
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      {/* Header + Add Button */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-2">
          <label htmlFor="entries-dropdown" className="text-gray-700 font-medium">
            Show entries:
          </label>
          <select
            id="entries-dropdown"
            className="border border-gray-300 rounded-md p-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={entriesToShow}
            onChange={(e) => setEntriesToShow(Number(e.target.value))}
          >
            {[5, 10].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <button
            onClick={() => {
              setSelectedProgram(null);
              setShowAddArticle(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition-colors duration-200"
          >
            + Add New Program
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
        <table className="min-w-full divide-y divide-gray-200 text-xs sm:text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-center">#</th>
              <th className="px-6 py-3 text-left">Program Title</th>
              <th className="px-6 py-3 text-left">Description</th>
              <th className="px-6 py-3 text-left">Key Modules</th>
              <th className="px-6 py-3 text-center rounded-tr-lg">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentEntries.map((p, idx) => (
              <tr key={p._id} className="hover:bg-gray-50">
                <td className="px-4 py-4 text-center">{indexOfFirst + idx + 1}</td>
                <td className="px-4 py-4 font-medium">{p.title}</td>
                <td className="px-4 py-4 max-w-xs truncate">{p.description}</td>
                <td className="px-4 py-4 max-w-xs truncate">{p.courses.join(", ")}</td>
                <td className="px-4 py-4 text-center flex justify-center gap-2">
                  {/*<button
                    onClick={() => handleEdit(p._id)}
                    className="px-3 py-1 bg-yellow-100 hover:bg-yellow-200 text-yellow-700 rounded-md text-sm font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded-md text-sm font-medium"
                  >
                    Delete
                  </button>*/}
                   <button
                    onClick={() => handleEdit(p._id)}
                    className="p-2 rounded-full bg-green-100 hover:bg-green-200 text-green-600 hover:text-green-800 transition transform hover:scale-110"
                  >
                    <PencilSquareIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
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

      {/* Pagination */}
      <div className="mt-6 flex flex-col items-center justify-between sm:flex-row space-y-4 sm:space-y-0">
        <div className="text-sm text-gray-700 font-medium text-center sm:text-left">
          Showing <b>{indexOfFirst + 1}</b> to <b>{indexOfFirst + currentEntries.length}</b> of <b>{filteredPrograms.length}</b> entries
        </div>
        <div>
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded-l-md disabled:opacity-50"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 border ${currentPage === i + 1 ? "bg-blue-100" : "bg-white"}`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded-r-md disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* Modals */}
      {selectedProgram && renderModal()}
      {renderAddArticleModal()}
    </div>
  );
};

export default CorporateTrainingProgramTable;
