import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronRight, Calendar } from "lucide-react";
import axios from "axios";

function NewsDetail() {
  const { id } = useParams(); // id from URL
  const navigate = useNavigate();
  const [selectedArticle, setSelectedArticle] = useState(null); // State for the fetched article
  const [loading, setLoading] = useState(true); // Optional loading state
  const [error, setError] = useState(null); // Optional error state

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:4001/api/news/${id}`) // Use MongoDB _id
        .then((res) => {
          setSelectedArticle(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching news:", err);
          setError("Failed to load article.");
          setLoading(false);
        });
    }
  }, [id]);

  const handleBack = () => {
    navigate("/News&Updates");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return <div className="p-8 text-center">Loading article...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-600">{error}</div>;
  }

  if (!selectedArticle) {
    return <div className="p-8 text-center">Article not found.</div>;
  }

  return (
    <div className="font-sans p-8 max-w-4xl mx-auto">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="flex items-center gap-2 mb-8 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ChevronRight className="rotate-180 h-5 w-5" />
        <span>Back to all articles</span>
      </button>

      {/* Article Image */}
      {selectedArticle.image && (
        <div className="rounded-xl overflow-hidden mb-8">
          <img
            src={`http://localhost:4001/Uploads/${selectedArticle.image}`}
            alt={selectedArticle.title}
            className="w-full h-80 object-cover rounded-xl shadow-lg"
          />
        </div>
      )}

      {/* Category and Date */}
      <div className="flex items-center gap-4 mb-4">
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            selectedArticle.category === "Results"
              ? "bg-green-100 text-green-800"
              : selectedArticle.category === "Announcements"
              ? "bg-blue-100 text-blue-800"
              : selectedArticle.category === "Exam Updates"
              ? "bg-orange-100 text-orange-800"
              : "bg-purple-100 text-purple-800"
          }`}
        >
          {selectedArticle.category}
        </span>
        <div className="flex items-center gap-1 text-gray-500 text-sm">
          <Calendar className="h-4 w-4" />
          {formatDate(selectedArticle.date)}
        </div>
      </div>

      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
        {selectedArticle.title}
      </h1>

      {/* Content */}
      <p className="text-gray-700 text-lg leading-relaxed mb-6">
        {selectedArticle.content}
      </p>
    </div>
  );
}

export default NewsDetail;
