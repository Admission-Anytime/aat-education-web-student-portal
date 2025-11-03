import React, { useState, useEffect } from "react";
import axios from "axios";
import * as Icons from "lucide-react";
import { ChevronRight, Mail, Search, X } from "lucide-react";

const BASE_URL = import.meta.env.REACT_APP_BASE_URL || "http://localhost:4001";

const CorporateTrainingProgram = () => {
  const [programs, setPrograms] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(6); // 👈 Show 6 initially

  // ✅ Fetch programs
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await axios.get("/api/corporatetraining");
        setPrograms(response.data);
      } catch (error) {
        console.error("Error fetching training programs:", error);
      }
    };
    fetchPrograms();
  }, []);

  // ✅ Close modal with ESC
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setSelectedProgram(null);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // ✅ Search filter
  const filteredPrograms = programs.filter((program) => {
    const lower = searchTerm.toLowerCase().trim();
    if (!lower) return true;
    const inCourses = program.courses?.some((c) =>
      c.toLowerCase().includes(lower)
    );
    return (
      program.title.toLowerCase().includes(lower) ||
      program.description.toLowerCase().includes(lower) ||
      inCourses
    );
  });

  // ✅ Dynamic icon fetch
  const getIconComponent = (iconName, colorClass) => {
    const LucideIcon = Icons[iconName] || Icons.Monitor;
    return <LucideIcon className={`w-6 h-6 ${colorClass}`} />;
  };

  // ✅ Load more functionality
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
    setTimeout(() => {
      window.scrollBy({ top: 400, behavior: "smooth" });
    }, 200);
  };

  // ✅ Modal
  const renderModal = () => {
    const program = programs.find((p) => p._id === selectedProgram);
    if (!program) return null;
    console.log("Selected Program Description:", program.description); // Debug this

    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        onClick={() => setSelectedProgram(null)}
      >
        <div
          className="bg-white rounded-2xl w-full max-w-lg sm:max-w-xl md:max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl mx-2 sm:mx-0"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className={`bg-gradient-to-br ${program.bgGradient} p-6 relative rounded-t-2xl border-b-4 border-blue-200`}
          >
            <div className={`${program.color} absolute top-6 left-6`}>
              {getIconComponent(program.iconName, program.color)}
            </div>

            <h3
              id="modal-title"
              className="text-3xl font-bold text-gray-900 mb-2 pt-10"
            >
              {program.title}
            </h3>

            <button
              onClick={() => setSelectedProgram(null)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition-colors duration-200 bg-white p-2 rounded-full shadow-xl"
              aria-label="Close program details"
            >
              <X className="w-5 h-5" />
            </button>

            {/*<p className="text-gray-700 mt-2">{program.description}</p>*/}
            <div
              className="text-gray-700 mt-2 prose max-w-none"
              dangerouslySetInnerHTML={{ __html: program.description }}
            ></div>
          </div>

          <div className="p-6">
            <h4 className="font-bold text-gray-900 mb-4 text-xl border-l-4 border-blue-500 pl-3">
              Comprehensive Course Modules
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
                <Mail className="w-5 h-5" />
                Enroll / Discuss Program
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ✅ Filter + limit results
  const displayedPrograms = filteredPrograms.slice(0, visibleCount);

  return (
    <div className="min-h-screen font-sans bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="text-black text-center py-10 px-4">
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-gray-800 leading-tight">
          Corporate Training
        </h1>
        <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto mt-3">
          Empower your workforce with essential skills for corporate excellence
          and digital transformation.
        </p>

        {/* Search */}
        <div className="max-w-md sm:max-w-xl md:max-w-3xl mx-auto mt-6 sm:mt-8 relative px-2">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search programs or courses (e.g., Python, UI/UX, Excel)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-5 py-3 border border-gray-300 rounded-xl shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
          />
        </div>
      </div>

      {/* Program Cards */}
      <div className="px-4 sm:px-6 md:px-8 lg:px-8 pb-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-col-3 gap-6">
          {displayedPrograms.length > 0 ? (
            displayedPrograms.map((program) => (
              <div
                key={program._id}
                onClick={() => setSelectedProgram(program._id)}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl hover:ring-2 ring-blue-500 transition-all duration-300 overflow-hidden group cursor-pointer flex flex-col justify-between"
              >
                <div className="p-4 sm:p-5 flex-grow">
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className={`p-2 rounded-full bg-opacity-10 ${program.color}`}
                    >
                      {getIconComponent(program.iconName, program.color)}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 leading-snug">
                      {program.title}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                    {program.description}
                  </p>

                  <div>
                    <h4 className="text-xs font-semibold uppercase text-gray-400 mb-2">
                      Key Modules:
                    </h4>
                    <ul className="space-y-1.5 text-gray-700 text-sm">
                      {program.courses.slice(0, 4).map((course, i) => (
                        <li key={i} className="flex items-center">
                          <ChevronRight className="w-4 h-4 text-blue-500 mr-2" />
                          <span>{course}</span>
                        </li>
                      ))}
                      {program.courses.length > 4 && (
                        <li className="text-blue-500 font-medium text-sm">
                          +{program.courses.length - 4} more modules
                        </li>
                      )}
                    </ul>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProgram(program._id);
                  }}
                  className={`w-full text-center py-3 bg-gradient-to-t ${program.bgGradient} text-blue-700 font-bold text-sm flex items-center justify-center gap-1 hover:bg-blue-100`}
                >
                  View Full Program Details <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-16 bg-white rounded-xl shadow-xl border border-gray-100">
              <p className="text-2xl font-bold text-gray-800">
                No matching programs found
              </p>
              <p className="text-gray-500 mt-2">
                Try searching for a different skill, like "Python" or "Design".
              </p>
            </div>
          )}
        </div>

        {/* ✅ Load More Button */}
        {visibleCount < filteredPrograms.length && (
          <div className="flex justify-center mt-10">
            <button
              onClick={handleLoadMore}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Load More Articles
            </button>
          </div>
        )}
      </div>

      {selectedProgram && renderModal()}
    </div>
  );
};

export default CorporateTrainingProgram;
