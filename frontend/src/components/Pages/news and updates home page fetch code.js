//temporry
import React, { useEffect, useState } from "react";
import axios from "axios";
const BASE_URL = import.meta.env.REACT_APP_BASE_URL || "http://localhost:4001";
const NewsSection = () => {
  const [news, setNews] = useState([]);
  const [featuredPost, setFeaturedPost] = useState(null);
  const [smallPosts, setSmallPosts] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get($`{BASE_URL}/api/news`); // your backend route
        const sortedNews = res.data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        const featured = sortedNews.find((n) => n.featured) || sortedNews[0];
        const others = sortedNews.filter((n) => n._id !== featured._id);

        setFeaturedPost(featured);
        setSmallPosts(others);
      } catch (err) {
        console.error(err);
      }
    };

    fetchNews();
  }, []);

  return (
    <section id="news">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            News and Updates
          </h2>
          <p className="text-xl text-gray-600">
            We'd love to hear from you. Contact us for admissions or any queries.
          </p>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column: Featured Post */}
          <div className="w-full lg:w-1/3">
            {featuredPost && (
              <div className="rounded-lg overflow-hidden h-full flex flex-col shadow-lg">
                <a href="#" className="block overflow-hidden rounded-t-lg">
                  <img
                    src={`${BASE_URL}/Uploads/${featuredPost.image}`}
                    alt={featuredPost.title}
                    className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
                  />
                </a>
                <div className="p-4 bg-white flex flex-col justify-between flex-grow rounded-b-lg">
                  <span className="text-sm text-gray-500 mb-2">
                    {new Date(featuredPost.date).toLocaleDateString()}
                  </span>
                  <h4 className="text-lg font-medium mb-2">
                    {featuredPost.title}
                  </h4>
                  <p className="text-gray-700 text-sm line-clamp-3">
                    {featuredPost.excerpt}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Middle Column: Read All News List */}
          <div className="w-full lg:w-1/3">
            <h3 className="text-xl font-bold text-right text-red-800 mb-4">
              Read All News
            </h3>
            <div className="flex flex-col gap-4">
              {smallPosts.map((post) => (
                <div
                  key={post._id}
                  className="flex gap-4 items-start bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex-shrink-0 w-20 h-20 rounded-md overflow-hidden">
                    <img
                      src={`${BASE_URL}/Uploads/${post.image}`}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <span className="text-xs text-gray-500 mb-1 block">
                      {new Date(post.date).toLocaleDateString()}
                    </span>
                    <h4 className="text-lg font-medium leading-snug mt-1">
                      {post.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Video Section */}
          <div className="lg:w-1/3 flex justify-center items-center">
            <div className="relative w-full h-64 md:h-80 lg:h-full bg-black rounded-lg overflow-hidden flex flex-col justify-center items-center p-4">
              <a
                href="https://www.youtube.com/watch?v=yP_BQX5cgRs"
                className="absolute inset-0 z-10 flex justify-center items-center group"
              >
                <div className="w-20 h-20 bg-white/30 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="white"
                    className="w-12 h-12 ml-1"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.5 5.653c0-1.426 1.529-2.38 2.79-1.613l11.54 6.348c1.26 1.427 1.26 3.326 0 4.753L7.29 20.31c-1.261.767-2.79.21-2.79-1.613V5.653z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </a>
              <h3 className="text-white text-2xl font-bold mt-4 z-20">
                Campus Video
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
