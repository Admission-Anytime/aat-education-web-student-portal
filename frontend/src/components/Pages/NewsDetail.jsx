import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronRight, Calendar } from "lucide-react";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;
function NewsDetail() {
  const { id } = useParams(); // id from URL
  const navigate = useNavigate();
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [articlesByCategory, setArticlesByCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch single article
  useEffect(() => {
    if (id) {
      setLoading(true);
      axios
        .get(`${BASE_URL}/api/news/${id}`)
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

  // Fetch all articles for sidebar
  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/news`)
      .then((res) => {
        if (res.data) {
          // filter out current article
          const filtered = res.data.filter((a) => a._id !== id);

          // Sort by newest first
          const sorted = [...filtered].sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          );
          setRelatedArticles(sorted.slice(0, 5)); // show top 5

          // Group articles by category
          const grouped = {};
          filtered.forEach((a) => {
            if (!grouped[a.category]) grouped[a.category] = [];
            grouped[a.category].push(a);
          });
          setArticlesByCategory(grouped);
        }
      })
      .catch((err) => {
        console.error("Error fetching related news:", err);
      });
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
    <div className="font-sans p-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-10">
      {/* MAIN ARTICLE */}
      <div className="lg:col-span-3">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="flex items-center gap-2 mb-8 text-blue-600 hover:text-gray-900 transition-colors"
        >
          <ChevronRight className="rotate-180 h-5 w-5" />
          <span>Back to all articles</span>
        </button>

        {/* Article Image */}
        {selectedArticle.image && (
          <div className="rounded-xl overflow-hidden mb-8">
            <img
              src={`${BASE_URL}/Uploads/${selectedArticle.image}`}
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

     
        {/* Content dangerouslySetInnerHTML*/}
        <div
          className="text-gray-700 text-lg leading-relaxed mb-6 prose"
          dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
        />
      </div>

      {/* SIDEBAR */}
      <aside className="lg:col-span-1 border-t lg:border-t-0 lg:border-l lg:pl-6 border-gray-200 space-y-10">
        {/* Latest Updates */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Latest Updates
          </h2>
          <ul className="space-y-4">
            {relatedArticles.length > 0 ? (
              relatedArticles.map((article) => (
                <li
                  key={article._id}
                  className="cursor-pointer group"
                  onClick={() => navigate(`/news/${article._id}`)}
                >
                  <h3 className="font-semibold text-gray-700 group-hover:text-indigo-600">
                    {article.title}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {formatDate(article.date)}
                  </p>
                </li>
              ))
            ) : (
              <li className="text-gray-500 text-sm">No related articles.</li>
            )}
          </ul>
        </div>

        {/* Category Wise */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Browse by Category
          </h2>
          {Object.keys(articlesByCategory).length > 0 ? (
            Object.entries(articlesByCategory).map(([category, articles]) => (
              <div key={category} className="mb-6">
                <h3 className="font-semibold text-indigo-700 mb-2">
                  {category}
                </h3>
                <ul className="space-y-2 pl-3 border-l border-gray-200">
                  {articles.map((a) => (
                    <li
                      key={a._id}
                      className="cursor-pointer text-sm text-gray-800 font-semibold hover:text-indigo-600"
                      onClick={() => navigate(`/news/${a._id}`)}
                    >
                      {a.title}
                    </li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No categories available.</p>
          )}
        </div>
      </aside>
    </div>
  );
}

export default NewsDetail;
