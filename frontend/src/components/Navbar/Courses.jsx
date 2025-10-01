//testimonial navbar
import React, { useState, useEffect } from "react";
import axios from "axios";

const TestimonialPage = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6); // initial number to show
  const fallbackImage = "/fallback.png";

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await axios.get("http://localhost:4001/api/testimonials");
        const dataWithUrl = res.data.map((t) => ({
          ...t,
          profileImageUrl: t.profileImage
            ? `http://localhost:4001${t.profileImage}`
            : fallbackImage,
        }));
        setTestimonials(dataWithUrl);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTestimonials();
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 5); // show 5 more each time
  };

  return (
    <div className="bg-gray-50 container mx-auto p-6">
      <h2 className="text-3xl md:text-5xl  text-center font-extrabold text-gray-900 mb-2">
        Testimonials
      </h2>
      <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-gray-600 rounded-xl">
        Hear directly from people who have experienced our exceptional service.
      </p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 py-4">
        {testimonials.slice(0, visibleCount).map((t) => (
          <div
            key={t._id}
            className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center"
          >
            <img
              src={t.profileImageUrl}
              alt={t.name}
              className="w-24 h-24 rounded-full object-cover mb-4"
            />
            <h3 className="font-semibold text-lg">{t.name}</h3>
            <p className="text-gray-500 mb-2">{t.designation}</p>
            <p className="text-gray-700">{t.message}</p>
          </div>
        ))}
      </div>

      {visibleCount < testimonials.length && (
        <div className="text-center mt-6">
          {/* <button
            onClick={handleLoadMore}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Load More
          </button>*/}
          <button
            onClick={handleLoadMore}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Load More Articles
          </button>
        </div>
      )}
    </div>
  );
};

export default TestimonialPage;
