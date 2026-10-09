import React from 'react'
import MainPage from './components/MainPage'
import { Routes, Route, Navigate } from 'react-router-dom'
import SchoolWebsite from './components/SchoolWebsite'
import AboutUs from './components/Pages/AboutUs'
import Courses from './components/Navbar/Courses'
import CooperateTrainingProgram from './components/Navbar/CooperateTrainingProgram'
import UniversityCourses from './components/Navbar/UniversityCourses'
import LiveProject from './components/Navbar/LiveProject'
import Placement from './components/Navbar/Placement'
import News from './components/Navbar/News'
import ContactUs from './components/Pages/ContactUs'
import RegistrationForm from './components/Pages/RegistrationForm'
import ImsLoginPage from './components/Pages/ImsLoginPage'
import ApplyNow from './components/Pages/ApplyNow'
import TermsAndConditions from './components/Pages/TermsAndConditions'
import FAQ from './components/Pages/FAQ'
import WebDevelopment from './components/Pages/WebDevelopment'
import ITFullStackDevelopment from './components/Pages/ITFullStackDevelopment'
import AppDevelopment from './components/Pages/AppDevelopment'
import PythonDevelopment from './components/Pages/PythonDevelopment'
import UIUXDesign from './components/Pages/UIUXDesign'
import DigitalMarketing from './components/Pages/DigitalMarketing'
import TallyAccounting from './components/Pages/TallyAccounting'
import AdminPanel from './components/Panel/AdminPanel'
import StudentProfile from './components/Pages/StudentProfile'
import BlogDetails from './components/Pages/BlogDetails'
import Layout from './components/Layout'
import ScrollToTop from './components/ScrollToTop'
import ErrorBoundary from './components/Common/ErrorBoundary'

const App = () => {
  return (
    <div>
      <ScrollToTop />
      <ErrorBoundary>
        <Routes>

        <Route path='' element={<Layout />} >
          <Route path='' element={<SchoolWebsite />} >
            <Route index element={<MainPage />} />
            <Route path='Aboutus' element={<AboutUs />} />
            <Route path='AboutUs' element={<AboutUs />} />
            <Route path='about' element={<AboutUs />} />
            <Route path='about-us' element={<AboutUs />} />
            <Route path='Courses/Aboutus' element={<AboutUs />} />
            <Route path='Courses/AboutUs' element={<AboutUs />} />
            <Route path='Courses/about' element={<AboutUs />} />
            <Route path='Courses/about-us' element={<AboutUs />} />
            <Route path='Courses' element={<Courses />} />
            <Route path='Courses/web-development' element={<WebDevelopment />} />
            <Route path='Courses/it-stack-development' element={<ITFullStackDevelopment />} />
            <Route path='Courses/app-development' element={<AppDevelopment />} />
            <Route path='Courses/python-programming' element={<PythonDevelopment />} />
            <Route path='Courses/ui-ux-design' element={<UIUXDesign />} />
            <Route path='Courses/digital-marketing' element={<DigitalMarketing />} />
            <Route path='Courses/tally-accounting' element={<TallyAccounting />} />
            <Route path='Courses/*' element={<Courses />} />
            <Route path='courses/*' element={<Courses />} />
            <Route path='Courses/Courses' element={<Courses />} />
            <Route path='courses/courses' element={<Courses />} />
            <Route path='CorporateTraining/Courses' element={<Courses />} />
            <Route path='CorporateTraining/courses' element={<Courses />} />
            <Route path='UniversityCourses/Courses' element={<Courses />} />
            <Route path='UniversityCourses/courses' element={<Courses />} />
            <Route path='LiveProject/Courses' element={<Courses />} />
            <Route path='LiveProject/courses' element={<Courses />} />
            <Route path='Placement/Courses' element={<Courses />} />
            <Route path='Placement/courses' element={<Courses />} />
            <Route path='panel/Courses' element={<Courses />} />
            <Route path='panel/courses' element={<Courses />} />
            <Route path='Aboutus/Courses' element={<Courses />} />
            <Route path='AboutUs/Courses' element={<Courses />} />
            <Route path='contact/Courses' element={<Courses />} />
            <Route path='CorporateTraining' element={<CooperateTrainingProgram />} />
            <Route path='corporatetraining' element={<CooperateTrainingProgram />} />
            <Route path='UniversityCourses' element={<UniversityCourses />} />
            <Route path='universitycourses' element={<UniversityCourses />} />
            <Route path='LiveProject' element={<LiveProject />} />
            <Route path='Placement' element={<Placement />} />
            <Route path='career' element={<Placement />} />
            <Route path='Career' element={<Placement />} />
            <Route path='contact' element={<ContactUs />} />
            <Route path='ContactUs' element={<ContactUs />} />
            <Route path='Contact' element={<ContactUs />} />
            <Route path='terms' element={<TermsAndConditions />} />
            <Route path='terms-and-conditions' element={<TermsAndConditions />} />
            <Route path='terms-conditions' element={<TermsAndConditions />} />
            <Route path='faq' element={<FAQ />} />
            <Route path='FAQ' element={<FAQ />} />
            <Route path='faqs' element={<FAQ />} />
            <Route path='web-development' element={<WebDevelopment />} />
            <Route path='webdevelopment' element={<WebDevelopment />} />
            <Route path='WebDevelopment' element={<WebDevelopment />} />
            <Route path='web-dev' element={<WebDevelopment />} />
            <Route path='it-stack-development' element={<ITFullStackDevelopment />} />
            <Route path='it-and-stack-development' element={<ITFullStackDevelopment />} />
            <Route path='it-full-stack-development' element={<ITFullStackDevelopment />} />
            <Route path='it-and-full-stack-development' element={<ITFullStackDevelopment />} />
            <Route path='it-stack' element={<ITFullStackDevelopment />} />
            <Route path='full-stack-development' element={<ITFullStackDevelopment />} />
            <Route path='fullstack' element={<ITFullStackDevelopment />} />
            <Route path='it-software' element={<ITFullStackDevelopment />} />
            <Route path='it-and-software' element={<ITFullStackDevelopment />} />
            <Route path='itsoftware' element={<ITFullStackDevelopment />} />
            <Route path='ITSoftware' element={<ITFullStackDevelopment />} />
            <Route path='ITFullStackDevelopment' element={<ITFullStackDevelopment />} />
            <Route path='itfullstackdevelopment' element={<ITFullStackDevelopment />} />
            <Route path='app-development' element={<AppDevelopment />} />
            <Route path='appdevelopment' element={<AppDevelopment />} />
            <Route path='AppDevelopment' element={<AppDevelopment />} />
            <Route path='app-dev' element={<AppDevelopment />} />
            <Route path='mobile-app-development' element={<AppDevelopment />} />
            <Route path='mobile-development' element={<AppDevelopment />} />
            <Route path='python-programming' element={<PythonDevelopment />} />
            <Route path='python-development' element={<PythonDevelopment />} />
            <Route path='python' element={<PythonDevelopment />} />
            <Route path='PythonProgramming' element={<PythonDevelopment />} />
            <Route path='PythonDevelopment' element={<PythonDevelopment />} />
            <Route path='python-dev' element={<PythonDevelopment />} />
            <Route path='ui-ux-design' element={<UIUXDesign />} />
            <Route path='ui-ux' element={<UIUXDesign />} />
            <Route path='uiux' element={<UIUXDesign />} />
            <Route path='ui-ux-designing' element={<UIUXDesign />} />
            <Route path='UIUXDesign' element={<UIUXDesign />} />
            <Route path='uiux-design' element={<UIUXDesign />} />
            <Route path='ui-ux-design-programming' element={<UIUXDesign />} />
            <Route path='digital-marketing' element={<DigitalMarketing />} />
            <Route path='digitalmarketing' element={<DigitalMarketing />} />
            <Route path='DigitalMarketing' element={<DigitalMarketing />} />
            <Route path='digital-marketing-course' element={<DigitalMarketing />} />
            <Route path='digital-marketing-design' element={<DigitalMarketing />} />
            <Route path='digital-marketing-programming' element={<DigitalMarketing />} />
            <Route path='tally-accounting' element={<TallyAccounting />} />
            <Route path='tally' element={<TallyAccounting />} />
            <Route path='tally-and-accounting' element={<TallyAccounting />} />
            <Route path='tallyaccounting' element={<TallyAccounting />} />
            <Route path='TallyAccounting' element={<TallyAccounting />} />
            <Route path='tally-accounting-course' element={<TallyAccounting />} />
            <Route path='tally-programming' element={<TallyAccounting />} />
            <Route path='News&Updates' element={<News />} />
            <Route path='news' element={<News />} />
            <Route path='News' element={<News />} />
            <Route path='news-updates' element={<News />} />
            <Route path='news-and-updates' element={<News />} />
            <Route path='blogs' element={<News />} />
            <Route path='blog' element={<News />} />
            <Route path='Blogs' element={<News />} />
            <Route path='Blog' element={<News />} />
            <Route path='blog/:id' element={<BlogDetails />} />
            <Route path='blogs/:id' element={<BlogDetails />} />
            <Route path='Blog/:id' element={<BlogDetails />} />
            <Route path='Blogs/:id' element={<BlogDetails />} />
            <Route path='news/:id' element={<BlogDetails />} />
            <Route path='vlogs' element={<News />} />
            <Route path='vlog' element={<News />} />
            <Route path='Vlogs' element={<News />} />
            <Route path='Vlog' element={<News />} />
            <Route path='apply-now' element={<ApplyNow />}>
              <Route path='registration-form' element={<RegistrationForm />} />
            </Route>
            <Route path='admission' element={<ApplyNow />} />
            <Route path='profile' element={<StudentProfile />} />
            <Route path='student-profile' element={<StudentProfile />} />
            <Route path='dashboard' element={<StudentProfile />} />
            <Route path='staff' element={<Navigate to="/" replace />} />
            <Route path='faculty' element={<Navigate to="/" replace />} />
          </Route>
        </Route>

        {/* Standalone Pages (No Header, No Footer) */}
        <Route path='login' element={<ImsLoginPage />} />
        <Route path='result' element={<ImsLoginPage />} />
        <Route path='panel' element={<AdminPanel />} />

        {/* Catch-all fallback route to prevent blank screens on unmatched URLs */}
        <Route path='staff' element={<Navigate to="/" replace />} />
        <Route path='faculty' element={<Navigate to="/" replace />} />
        <Route path='*' element={<Navigate to="/" replace />} />

      </Routes>
      </ErrorBoundary>

    </div>
  )
}

export default App