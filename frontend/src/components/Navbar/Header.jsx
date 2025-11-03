import React, { useState, useEffect } from "react";
import logo_image from "../../assets/img/Logo.jpg";
import { NavLink } from "react-router-dom";
import { Menu } from "lucide-react";
import axios from "axios";

const BASE_URL = import.meta.env.REACT_APP_BASE_URL || "http://localhost:4001";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  //dynamic institute info fetching

  const [institute, setInstitute] = useState(null);

  useEffect(() => {
    const fetchInstitute = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/institute`);
        //setInstitute(res.data);
        setInstitute(Array.isArray(res.data) ? res.data[0] : res.data);
        console.log("Fetched institute data in header.jsx:", res.data);
      } catch (err) {
        console.error("Error fetching institute info:", err);
      }
    };

    fetchInstitute();
  }, []);

  if (!institute) return <p>Loading...</p>;

  return (
    <div>
      <header className="bg-white sticky top-0 z-50">
        <div className="">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-12 m-4 bg-blue-600 rounded-full flex items-center justify-center">
                {institute.logo && (
                  <img
                    className="h-20"
                    src={`${BASE_URL}/Uploads/${institute.logo}`}
                    alt="Institute Logo"
                  />
                )}
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-blue-900">
                  {institute.name}
                </h1>
                <p className="text-sm text-gray-600 hidden sm:block">
                  {institute.about}
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <NavLink
                to=""
                className="text-blue-900 hover:text-blue-600 font-semibold transition-colors"
              >
                Home
              </NavLink>
              
             
              <NavLink
                to="Courses"
                className="text-blue-900 font-semibold hover:text-blue-600  transition-colors"
              >
                Courses
                </NavLink>
                <NavLink
                to="CorporateTraining"
                className="text-blue-900 font-semibold hover:text-blue-600  transition-colors"
              >
                Coorporate Trainings
              </NavLink>
 <NavLink
                to="News&Updates"
                className="text-blue-900 font-semibold hover:text-blue-600  transition-colors"
              >
                News & Updates
              </NavLink>
               <a href="apply-now" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors font-medium">
                Apply Now
              </button></a> 
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-md hover:bg-gray-100"
            >
              {mobileMenuOpen ? (
                <Menu className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="lg:hidden mt-4 pb-4 border-t pt-4">
              <div className="flex flex-col space-y-3">
                <NavLink
                  onClick={() => setMobileMenuOpen(!setMobileMenuOpen)}
                  to=""
                  className="text-blue-900 hover:text-blue-600 font-semibold transition-colors"
                >
                  Home
                </NavLink>
                <NavLink
                  onClick={() => setMobileMenuOpen(!setMobileMenuOpen)}
                  to="Courses"
                  className="text-blue-900 font-semibold hover:text-blue-600  transition-colors"
                >
                  Courses
                </NavLink>
                <NavLink
                  onClick={() => setMobileMenuOpen(!setMobileMenuOpen)}
                  to="CorporateTraining"
                  className="text-blue-900 font-semibold hover:text-blue-600  transition-colors"
                >
                  Corporate Training
                </NavLink>
                <NavLink
                  onClick={() => setMobileMenuOpen(!setMobileMenuOpen)}
                  to="News&Updates"
                  className="text-blue-900 font-semibold hover:text-blue-600  transition-colors"
                >
                  News & Updates
                </NavLink>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors font-medium w-fit">
                  Apply Now
                </button>
              </div>
            </nav>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
