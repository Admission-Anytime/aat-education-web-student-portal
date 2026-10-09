import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Home,
  GraduationCap,
  Laptop,
  Briefcase,
  Headphones,
} from 'lucide-react';

const MobileTabBar = () => {
  const location = useLocation();
  const currentPath = location.pathname.toLowerCase();

  // Helper function to detect active routes including nested subpaths
  const isTabActive = (type) => {
    switch (type) {
      case 'home':
        return currentPath === '/' || currentPath === '';
      case 'courses':
        return currentPath.startsWith('/courses');
      case 'liveproject':
        return currentPath.startsWith('/liveproject');
      case 'placement':
        return currentPath.startsWith('/placement') || currentPath.startsWith('/career');
      case 'contact':
        return currentPath.startsWith('/contact');
      default:
        return false;
    }
  };

  const isLiveProjectActive = isTabActive('liveproject');

  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden px-3.5 pb-1.5 pt-0.5 pointer-events-none select-none transition-all duration-300"
    >
      <div className="pointer-events-auto max-w-md mx-auto bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-2xl shadow-[0_-3px_20px_rgba(0,0,0,0.08),0_8px_25px_rgba(0,0,0,0.1)] px-1.5 py-1 flex items-center justify-around relative">
        
        {/* Tab 1: Home */}
        <NavLink
          to="/"
          className="flex-1 flex flex-col items-center justify-center py-0.5 transition-all duration-200 active:scale-95 group"
        >
          {() => {
            const active = isTabActive('home');
            return (
              <>
                <div
                  className={`p-1 rounded-xl transition-all duration-200 relative ${
                    active
                      ? 'bg-blue-50 text-blue-600 shadow-xs'
                      : 'text-slate-500 group-hover:text-slate-700'
                  }`}
                >
                  <Home className="w-[18px] h-[18px] stroke-[2]" />
                  {active && (
                    <span className="w-1 h-1 bg-blue-600 rounded-full absolute -bottom-0.5 left-1/2 -translate-x-1/2 shadow-xs" />
                  )}
                </div>
                <span
                  className={`text-[9.5px] mt-0.5 leading-none tracking-tight transition-colors ${
                    active
                      ? 'text-blue-600 font-extrabold'
                      : 'text-slate-500 font-medium'
                  }`}
                >
                  Home
                </span>
              </>
            );
          }}
        </NavLink>

        {/* Tab 2: Courses */}
        <NavLink
          to="/Courses"
          className="flex-1 flex flex-col items-center justify-center py-0.5 transition-all duration-200 active:scale-95 group"
        >
          {() => {
            const active = isTabActive('courses');
            return (
              <>
                <div
                  className={`p-1 rounded-xl transition-all duration-200 relative ${
                    active
                      ? 'bg-blue-50 text-blue-600 shadow-xs'
                      : 'text-slate-500 group-hover:text-slate-700'
                  }`}
                >
                  <GraduationCap className="w-[18px] h-[18px] stroke-[2]" />
                  {active && (
                    <span className="w-1 h-1 bg-blue-600 rounded-full absolute -bottom-0.5 left-1/2 -translate-x-1/2 shadow-xs" />
                  )}
                </div>
                <span
                  className={`text-[9.5px] mt-0.5 leading-none tracking-tight transition-colors ${
                    active
                      ? 'text-blue-600 font-extrabold'
                      : 'text-slate-500 font-medium'
                  }`}
                >
                  Courses
                </span>
              </>
            );
          }}
        </NavLink>

        {/* Tab 3: Middle HERO Tab - Live Project (Standout elevated 3D circular design, compact height) */}
        <div className="flex-1 flex flex-col items-center justify-center relative -top-2.5">
          <NavLink
            to="/LiveProject"
            aria-label="Live Projects"
            className={`group relative flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-600 text-white shadow-[0_6px_18px_rgba(249,115,22,0.40)] border-[3px] border-white transition-all duration-300 transform active:scale-90 hover:scale-105 ${
              isLiveProjectActive ? 'ring-2 ring-orange-200' : ''
            }`}
          >
            {/* Ambient pulsed glow */}
            <span className="absolute inset-0 rounded-full bg-orange-400/20 animate-ping pointer-events-none" />

            {/* Live Indicator Badge Dot */}
            <span className="absolute top-0.5 right-0.5 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 border border-white"></span>
            </span>

            {/* Center Icon */}
            <Laptop className="w-[19px] h-[19px] stroke-[2.2] relative z-10 transition-transform group-hover:rotate-6" />
          </NavLink>

          <span
            className={`text-[9.5px] mt-0.5 leading-none tracking-tight transition-all text-center whitespace-nowrap ${
              isLiveProjectActive
                ? 'text-orange-600 font-black'
                : 'text-slate-700 font-bold'
            }`}
          >
            Live Project
          </span>
        </div>

        {/* Tab 4: Placement */}
        <NavLink
          to="/Placement"
          className="flex-1 flex flex-col items-center justify-center py-0.5 transition-all duration-200 active:scale-95 group"
        >
          {() => {
            const active = isTabActive('placement');
            return (
              <>
                <div
                  className={`p-1 rounded-xl transition-all duration-200 relative ${
                    active
                      ? 'bg-blue-50 text-blue-600 shadow-xs'
                      : 'text-slate-500 group-hover:text-slate-700'
                  }`}
                >
                  <Briefcase className="w-[18px] h-[18px] stroke-[2]" />
                  {active && (
                    <span className="w-1 h-1 bg-blue-600 rounded-full absolute -bottom-0.5 left-1/2 -translate-x-1/2 shadow-xs" />
                  )}
                </div>
                <span
                  className={`text-[9.5px] mt-0.5 leading-none tracking-tight transition-colors ${
                    active
                      ? 'text-blue-600 font-extrabold'
                      : 'text-slate-500 font-medium'
                  }`}
                >
                  Placement
                </span>
              </>
            );
          }}
        </NavLink>

        {/* Tab 5: Contact Us */}
        <NavLink
          to="/ContactUs"
          className="flex-1 flex flex-col items-center justify-center py-0.5 transition-all duration-200 active:scale-95 group"
        >
          {() => {
            const active = isTabActive('contact');
            return (
              <>
                <div
                  className={`p-1 rounded-xl transition-all duration-200 relative ${
                    active
                      ? 'bg-blue-50 text-blue-600 shadow-xs'
                      : 'text-slate-500 group-hover:text-slate-700'
                  }`}
                >
                  <Headphones className="w-[18px] h-[18px] stroke-[2]" />
                  {active && (
                    <span className="w-1 h-1 bg-blue-600 rounded-full absolute -bottom-0.5 left-1/2 -translate-x-1/2 shadow-xs" />
                  )}
                </div>
                <span
                  className={`text-[9.5px] mt-0.5 leading-none tracking-tight transition-colors ${
                    active
                      ? 'text-blue-600 font-extrabold'
                      : 'text-slate-500 font-medium'
                  }`}
                >
                  Contact
                </span>
              </>
            );
          }}
        </NavLink>

      </div>
    </nav>
  );
};

export default MobileTabBar;
