import React, { useState, useEffect } from "react";
import axios from "axios";
import { PencilSquareIcon, TrashIcon,EyeSlashIcon, EyeIcon } from "@heroicons/react/24/outline";
import AddNewArticle from "./AddNewArticle";
const BASE_URL = import.meta.env.REACT_APP_BASE_URL || "http://localhost:4001";
function NewsArticlesManagement() {
  const [articles, setArticles] = useState([]);
  const [showAddArticle, setShowAddArticle] = useState(false);
  const [showEditArticle, setShowEditArticle] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);

  const [entriesToShow, setEntriesToShow] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedContent, setExpandedContent] = useState({});
// Toggle visibility
const toggleVisibility = async (id) => {
  try {
    const response = await axios.patch(`${BASE_URL}/api/news/${id}/toggle-visibility`);
    const updatedArticle = response.data;

    // Update state
    setArticles((prev) =>
      prev.map((a) => (a._id === updatedArticle._id ? updatedArticle : a))
    );
  } catch (error) {
    console.error("Error toggling visibility:", error);
  }
};

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/news`); // new endpoint
        setArticles(response.data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };
    fetchArticles();
  }, []);

  const handleEditArticle = (id) => {
    const entryToEdit = articles.find((a) => a._id === id);
    setEditingEntry(entryToEdit);
    setShowEditArticle(true);
  };

  const handleEditArticleSubmit = async (updatedEntry) => {
    try {
      await axios.put(`${BASE_URL}/api/news/${updatedEntry._id}`, updatedEntry);
      setArticles((prev) =>
        prev.map((a) => (a._id === updatedEntry._id ? updatedEntry : a))
      );
      setShowEditArticle(false);
      setEditingEntry(null);
    } catch (error) {
      console.error("Error updating article:", error);
    }
  };

  const handleDeleteArticle = async (id) => {
    if (!window.confirm("Are you sure you want to delete this article?"))
      return;
    try {
      await axios.delete(`${BASE_URL}/api/news/${id}`);
      setArticles(articles.filter((a) => a._id !== id));
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  };

  // Helper function to truncate content to first 3 lines
  const truncateContent = (content, maxLines = 3) => {
    if (!content) return "";
    const lines = content.split("\n");
    return lines.slice(0, maxLines).join("\n");
  };

  // Toggle content expansion
  const toggleContentExpansion = (articleId) => {
    setExpandedContent((prev) => ({
      ...prev,
      [articleId]: !prev[articleId],
    }));
  };

  // Content Display Component
  const ContentDisplay = ({ content, articleId, className = "" }) => {
    const isExpanded = expandedContent[articleId];
    const truncatedContent = truncateContent(content);
    const needsTruncation = content && content.split("\n").length > 3;

    return (
      <div className={className}>
        <div className="whitespace-pre-wrap">
          {isExpanded ? content : truncatedContent}
        </div>
        {needsTruncation && (
          <button
            onClick={() => toggleContentExpansion(articleId)}
            className="text-blue-600 hover:text-blue-800 text-xs mt-1 underline focus:outline-none"
          >
            {isExpanded ? "View less" : "View more"}
          </button>
        )}
      </div>
    );
  };

  // Pagination
  const totalEntries = articles.length;
  const totalPages = Math.ceil(totalEntries / entriesToShow);
  const indexOfLastEntry = currentPage * entriesToShow;
  const indexOfFirstEntry = indexOfLastEntry - entriesToShow;
  const currentEntries = articles.slice(indexOfFirstEntry, indexOfLastEntry);

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      {showAddArticle ? (
        <AddNewArticle
          onBack={() => setShowAddArticle(false)}
          onSubmit={(newEntry) => {
            setArticles([newEntry, ...articles]);
            setShowAddArticle(false);
          }}
        />
      ) : showEditArticle ? (
        <AddNewArticle
          editingEntry={editingEntry}
          onBack={() => setShowEditArticle(false)}
          onSubmit={handleEditArticleSubmit}
        />
      ) : (
        <>
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-6">
            Manage News & Updates
          </h2>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between mb-4 space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-2">
              <label className="text-gray-700 font-medium">Show entries:</label>
              <select
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

            <button
              onClick={() => setShowAddArticle(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition-colors duration-200"
            >
              + Add New Article
            </button>
          </div>

          {/* Table for desktop */}
          <div className="hidden md:block overflow-x-auto bg-white rounded-lg shadow-lg">
            <table className="min-w-full divide-y divide-gray-200 text-xs sm:text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-center">#</th>
                  <th className="px-6 py-3 text-left">Title</th>
                  <th className="px-6 py-3 text-left">Excerpt</th>
                  <th className="px-6 py-3 text-left">Content</th>
                  <th className="px-6 py-3 text-left">Category</th>
                  <th className="px-6 py-3 text-center">Date</th>
                  <th className="px-6 py-3 text-center">Image</th>
                  <th className="px-6 py-3 text-center">Featured</th>
                  <th className="px-6 py-3 text-center">Read Time</th>
                  <th className="px-6 py-3 text-center">Show on Home Page</th>
                  <th className="px-6 py-3 text-center rounded-tr-lg">
                    Manage
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentEntries.map((entry, index) => (
                  <tr key={entry._id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-4 text-center">
                      {indexOfFirstEntry + index + 1}
                    </td>
                    <td className="px-4 py-4 break-words font-medium">
                      {entry.title}
                    </td>
                    <td className="px-4 py-4 break-words overflow-hidden">
                      {entry.excerpt}
                    </td>
                    <td className="px-4 py-4 break-words overflow-hidden line-clamp-5 leading-4">
                      {entry.content}
                    </td>

                    <td className="px-4 py-4">{entry.category}</td>
                    <td className="px-4 py-4 text-center">
                      {new Date(entry.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-4 text-center">
                      <img
                        src={`${BASE_URL}/Uploads/${entry.image}`}
                        alt={entry.title}
                        className="w-20 h-20 sm:w-16 sm:h-16 object-cover mx-auto rounded"
                      />
                    </td>
                    <td className="px-4 py-4 text-center">
                      {entry.featured ? "Yes" : "No"}
                    </td>
                    <td className="px-4 py-4 text-center">{entry.readTime}</td>

                    <td className="px-4 py-4 text-center">
                      {/*Toggle button to show news omn small post */}

                       <button
                                      onClick={() => toggleVisibility(entry._id)}
                                      className={`flex items-center justify-center mx-auto px-4 py-1.5 rounded-full text-white text-xs font-semibold transition-colors duration-300 shadow-sm
                              ${entry.visible ? "bg-green-500 hover:bg-green-600" : "bg-gray-400 hover:bg-gray-500"}
                            `}
                                    >
                                      {entry.visible ? (
                                        <>
                                          <EyeIcon className="h-4 w-4 mr-1" /> Yes
                                        </>
                                      ) : (
                                        <>
                                          <EyeSlashIcon className="h-4 w-4 mr-1" /> No
                                        </>
                                      )}
                                    </button>
                    </td>

                    <td className="px-4 py-4 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => handleEditArticle(entry._id)}
                          className="p-2 rounded-full bg-green-100 hover:bg-green-200 text-green-600 hover:text-green-800 transition transform hover:scale-110"
                        >
                          <PencilSquareIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteArticle(entry._id)}
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

          {/* Card view for mobile */}
          <div className="md:hidden flex flex-col space-y-4">
            {currentEntries.map((entry, index) => (
              <div
                key={entry._id}
                className="bg-white rounded-lg shadow-lg p-4 space-y-3"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-lg font-bold text-gray-900">
                    {indexOfFirstEntry + index + 1}.
                  </span>
                  <h3 className="text-sm font-semibold text-gray-800 break-words">
                    {entry.title}
                  </h3>
                </div>
                <div className="text-xs text-gray-700 break-words">
                  {entry.excerpt}
                </div>
                <ContentDisplay
                  content={entry.content}
                  articleId={entry._id}
                  className="text-xs text-gray-700 max-w-xs"
                />
                <div className="text-xs text-gray-700">
                  Category: {entry.category}
                </div>
                <div className="text-xs text-gray-700">
                  Date: {new Date(entry.date).toLocaleDateString()}
                </div>
                <div className="flex justify-center">
                  <img
                    src={`${BASE_URL}/Uploads/${entry.image}`}
                    alt={entry.title}
                    className="w-32 h-32 object-cover rounded"
                  />
                </div>
                <div className="text-xs text-gray-700">
                  Featured: {entry.featured ? "Yes" : "No"}
                </div>
                <div className="text-xs text-gray-700">
                  Read Time: {entry.readTime}
                </div>
                <div className="flex items-center justify-end space-x-2 mt-4">
                  <button
                    onClick={() => handleEditArticle(entry._id)}
                    className="p-2 rounded-full bg-green-100 hover:bg-green-200 text-green-600 hover:text-green-800 transition transform hover:scale-110"
                  >
                    <PencilSquareIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteArticle(entry._id)}
                    className="p-2 rounded-full bg-red-100 hover:bg-red-200 text-red-600 hover:text-red-800 transition transform hover:scale-110"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-6 flex flex-col items-center justify-between sm:flex-row space-y-4 sm:space-y-0">
            <div className="text-sm text-gray-700 font-medium text-center sm:text-left">
              Showing <b>{indexOfFirstEntry + 1}</b> to{" "}
              <b>{indexOfFirstEntry + currentEntries.length}</b> of{" "}
              <b>{totalEntries}</b> entries
            </div>
            <div className="flex space-x-1">
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
                  className={`px-3 py-1 border ${
                    currentPage === i + 1 ? "bg-blue-100" : "bg-white"
                  }`}
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
        </>
      )}
    </div>
  );
}

export default NewsArticlesManagement;
