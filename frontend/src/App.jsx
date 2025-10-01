import React from "react";
import MainPage from "./components/MainPage";
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";

import SchoolWebsite from "./components/SchoolWebsite";
import AboutUs from "./components/Pages/AboutUs";
import Courses from "./components/Navbar/Courses";
import CooperateTrainingProgram from "./components/Navbar/CooperateTrainingProgram";
import News from "./components/Navbar/News";
import RegistrationForm from "./components/Pages/RegistrationForm";
import ImsLoginPage from "./components/Pages/ImsLoginPage";
import ApplyNow from "./components/Pages/ApplyNow";
import AdminPanel from "./components/Panel/AdminPanel";
import Layout from "./components/Layout";
//import SignUpandLogin from "./components/Pages/SignUpandLogin";
import AddNewBlog from "./components/Pages/AddNewBlog";
import BlogEntries from "./components/Pages/BlogEntries";
import Addnewblogwithckeditor from "./components/Pages/addnewblogwithckeditor";
//import Homepagesaboutsection from './components/Pages/Homepagesaboutsection'
//import Slidertest from "./components/Pages/Slidertest";
import Test from "./components/Pages/Test";
//import { isLoggedIn, handleLoginSuccess } from './components/Pages/SignUpandLogin'
import Slideradminpanel from "./components/Pages/NewsAdminPage";
import NewsAdminPage from "./components/Pages/NewsAdminPage";
import NewsDetail from "./components/Pages/NewsDetail";
import Homepagecourses from "./components/Pages/Homepagecourses";
import Newssectionnewlook from "./components/Pages/Newssectionnewlook";
import FooterAdmin from "./components/Pages/FooterAdmin";
import AdminLogin from "./components/Pages/AdminLogin";
import ProtectedRoute from "./components/Panel/ProtectedRoute";
//import inquiryformforrightcorner from "./components/inquiryformforrightcorner.jsx"
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="" element={<Layout />}>
          <Route path="" element={<SchoolWebsite />}>
            <Route path="" element={<MainPage />}></Route>
            <Route path="Aboutus" element={<AboutUs />} />
            <Route path="Courses" element={<Courses />} />
            {/*<Route
              path="CorporateTraining"
              element={<CooperateTrainingProgram />}
            />*/}
            <Route path="CorporateTraining" element={<Test />} />
           {/* <Route path="test" element={<Newssectionnewlook />} />*/}

            <Route path="News&Updates" element={<News />} />
            <Route path="apply-now" element={<ApplyNow />}>
              <Route path="registration-form" element={<RegistrationForm />} />
            </Route>
          </Route>
        </Route>
        {/* CONDITIONAL RENDERING after login by admin*/}

        <Route
          path="panel"
          element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          }
        />

        <Route path="login" element={<AdminLogin />} />
{/* Redirect all unknown routes to login
      <Route path="*" element={<Navigate to="/login" replace />} /> */}

        {/*<Route path="testing" element={<inquiryformforrightcorner/>} />*/}
        <Route path="slideer" element={<FooterAdmin />} />

        <Route path="/add-blog" element={<AddNewBlog />} />

        {/*news and updates route for read more */}
        <Route path="/news/:id" element={<NewsDetail />} />
      </Routes>
    </div>
  );
};

export default App;
