//news and updates navbar
import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Calendar, Clock, ChevronRight } from "lucide-react";
import axios from "axios";

const categories = ["All", "Announcements", "Exam Updates", "Results", "Events"];

function News() {
  const navigate = useNavigate();
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(6); // show 6 initially


  useEffect(() => {
    axios
      .get("http://localhost:4001/api/news")
      .then((res) => {
        setNewsList(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching news:", err);
        setError("Failed to load news.");
        setLoading(false);
      });
  }, []);

  const handleReadMore = (article) => {
    navigate(`/news/${article._id}`);
  };

  const filteredNews = useMemo(() => {
    return newsList.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      const matchesSearch =
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [newsList, selectedCategory, searchTerm]);

  const featuredNews = newsList.find((item) => item.featured);
  const regularNews = filteredNews.filter((item) => !item.featured);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
const handleLoadMore = () => {
  setVisibleCount((prev) => prev + 6); // load 6 more articles each time
};

  if (loading) return <div className="p-8 text-center">Loading news...</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      {/*<header className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            News & Updates
          </h1>
         <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            Stay updated with the latest announcements, exam updates, and success stories from our coaching institute
          </p>
        </div>
      </header>*/}
       {/* Header */}
        {/* Header section */}
            <header className="pt-8">
              <div className="text-center mb-4 md:mb-6">
                <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-2">
            News & Updates
              </h2>
            <p className="text-gray-600 text-lg md:text-xl">
                 Stay updated with the latest announcements, exam updates, and success stories from our coaching institute
              </p>
            </div>
            </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="mb-8 flex flex-wrap flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search news and updates..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Featured News */}
        {featuredNews && selectedCategory === "All" && !searchTerm && (
          <section className="mb-12">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden md:flex">
              <div className="md:w-1/2">
                <img
                  src={`http://localhost:4001/Uploads/${featuredNews.image}`}
                  alt={featuredNews.title}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-4">
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Featured
                  </span>
                  <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                    {featuredNews.category}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                  {featuredNews.title}
                </h2>
                <p className="text-gray-600 mb-6 text-lg leading-relaxed">{featuredNews.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {formatDate(featuredNews.date)}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {featuredNews.readTime}
                    </div>
                  </div>
                  <button
                    onClick={() => handleReadMore(featuredNews)}
                    className="flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700 transition-colors"
                  >
                    Read More
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* News Grid */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
{regularNews.slice(0, visibleCount).map((item) => (
              <article
                key={item._id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative">
                  <img
                    src={`http://localhost:4001/Uploads/${item.image}`}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        item.category === "Results"
                          ? "bg-green-100 text-green-800"
                          : item.category === "Announcements"
                          ? "bg-blue-100 text-blue-800"
                          : item.category === "Exam Updates"
                          ? "bg-orange-100 text-orange-800"
                          : "bg-purple-100 text-purple-800"
                      }`}
                    >
                      {item.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                    {item.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {formatDate(item.date)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {item.readTime}
                      </div>
                    </div>
                    <button
                      onClick={() => handleReadMore(item)}
                      className="text-blue-600 font-medium hover:text-blue-700 transition-colors"
                    >
                      Read More
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredNews.length === 0 && (
            <div className="text-center py-12">
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-600">Try adjusting your search terms or selected category.</p>
            </div>
          )}
        </section>

        {/* Load More */}
        {regularNews.length > 0 && (
          <div className="text-center mt-12">
            <button 
                  onClick={handleLoadMore}

            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Load More Articles
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default News;
