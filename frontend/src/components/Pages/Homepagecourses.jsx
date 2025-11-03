import React, { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.REACT_APP_BASE_URL || "http://localhost:4001";

// BookOpen icon component
const BookOpenIcon = ({ size = 28 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-book-open"
  >
    <path d="M12 4v16M20 4h-6a2 2 0 0 0-2 2v12a2 2 0 0 1 2-2h6V4zM4 4h6a2 2 0 0 1 2 2v12a2 2 0 0 0-2-2H4V4z" />
  </svg>
);

const ProgramsSection = () => {
  const [programs, setPrograms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Replace with actual API call or keep mock data
    axios
      .get("/api/courses")
      .then((res) => {
        const visibleCourses = res.data.filter(course => course.visible);

        const formatted = visibleCourses.map((program) => ({
          title: program.title,
          description: program.description,
          iconSize: program.iconSize || 28, // dynamic icon size
          features: [
            `Duration:     ${program.duration}`,
            `Rating:     ⭐ ${program.rating}`,
            `Fees:     ${program.fees}`,
            ...(program.career?.length ? [`Careers:     ${program.career.join(", ")}`] : []),
            ...(program.universities?.length ? [`Universities:     ${program.universities.join(", ")}`] : []),
          ],
        }));

        setPrograms(formatted);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching courses:", err);
        setIsLoading(false);
      });
  }, []);

  return (
    <section id="programs" className="py-20 bg-gray-50 font-sans min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Academic Programs
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive educational programs designed to foster intellectual growth and personal development at every stage.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <p className="ml-4 text-lg text-gray-600">Loading programs...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-t-4 border-blue-600/70"
              >
                <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mb-6 text-blue-600 shadow-md">
                  <BookOpenIcon size={program.iconSize} />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  {program.title}
                </h3>
                <p className="text-gray-600 mb-6 text-sm">{program.description}</p>

                <ul className="space-y-3">
                  {program.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-start text-gray-700 text-sm"
                    >
                      <span className="text-blue-500 mr-3 mt-1">&#x2713;</span>
                      
                      <span className="flex-1">
                        <strong className="text-gray-900">
                          {feature.split(": ")[0]}:
                        </strong>
                        {feature.split(": ")[1]}
                      </span>
                    </li>
                  ))}
                </ul>

               {/* <button
                  className="mt-8 w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition duration-150 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Enroll Now
                </button>*/}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProgramsSection;
