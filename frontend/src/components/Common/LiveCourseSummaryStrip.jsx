import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Clock,
  Award,
  CheckCircle2,
  Briefcase,
  Calendar,
  Monitor,
  GraduationCap,
  ChevronDown,
  Rocket,
  BookOpen,
  Sparkles,
  Tag
} from 'lucide-react';

/**
 * LiveCourseSummaryStrip renders live MongoDB course details (Fees, Duration,
 * Mode, Eligibility, Batch Schedule, Detailed Overview, Skills, Syllabus Modules,
 * Projects, and Course FAQs) on dedicated course pages with zero fallback errors.
 */
const LiveCourseSummaryStrip = ({ courseData }) => {
  const [openFaq, setOpenFaq] = useState(null);

  if (!courseData) return null;

  const skills = Array.isArray(courseData.skills) ? courseData.skills.filter(Boolean) : [];
  const highlights = Array.isArray(courseData.highlights) && courseData.highlights.length > 0
    ? courseData.highlights.filter(Boolean)
    : (Array.isArray(courseData.features) ? courseData.features.filter(Boolean) : []);
  const careers = Array.isArray(courseData.career) && courseData.career.length > 0
    ? courseData.career.filter(Boolean)
    : (courseData.careerAreas ? String(courseData.careerAreas).split(',').map((s) => s.trim()).filter(Boolean) : []);
  const modules = Array.isArray(courseData.syllabusModules) ? courseData.syllabusModules.filter((m) => m?.title) : [];
  const projects = Array.isArray(courseData.projectsList) ? courseData.projectsList.filter((p) => p?.title) : [];
  const faqs = Array.isArray(courseData.courseFaqs) ? courseData.courseFaqs.filter((f) => f?.q) : [];

  return (
    <section className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 py-6 sm:py-8 space-y-6">
      {/* Live Key Course Facts Bar */}
      <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-4 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100">
          <div>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
              <Sparkles className="w-3 h-3" /> Live Course Details
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 mt-1">
              {courseData.title || courseData.name}
            </h2>
          </div>
          <NavLink
            to="/ApplyNow"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold shadow-sm transition"
          >
            Enroll Now
          </NavLink>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
              <Clock className="w-3.5 h-3.5 text-blue-600" /> Duration
            </div>
            <div className="text-xs sm:text-sm font-bold text-slate-900 mt-1">{courseData.duration || '3–6 Months'}</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
              <Tag className="w-3.5 h-3.5 text-emerald-600" /> Course Fee
            </div>
            <div className="text-xs sm:text-sm font-bold text-emerald-700 mt-1">{courseData.fees || 'Contact for fee'}</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
              <Monitor className="w-3.5 h-3.5 text-indigo-600" /> Mode
            </div>
            <div className="text-xs sm:text-sm font-bold text-slate-900 mt-1">{courseData.mode || 'Classroom / Online'}</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
              <Calendar className="w-3.5 h-3.5 text-amber-600" /> Batches
            </div>
            <div className="text-xs sm:text-sm font-bold text-slate-900 mt-1">{courseData.batchSchedule || 'Weekday & Weekend'}</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
              <GraduationCap className="w-3.5 h-3.5 text-purple-600" /> Eligibility
            </div>
            <div className="text-xs sm:text-sm font-bold text-slate-900 mt-1 truncate" title={courseData.eligibility}>
              {courseData.eligibility || '10th / 12th / Graduates'}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
              <Award className="w-3.5 h-3.5 text-rose-600" /> Certification
            </div>
            <div className="text-xs sm:text-sm font-bold text-slate-900 mt-1 truncate" title={courseData.certification}>
              {courseData.certification || 'Certified Professional'}
            </div>
          </div>
        </div>

        {(courseData.detailedOverview || courseData.description) && (
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-4 pt-4 border-t border-slate-100">
            {courseData.detailedOverview || courseData.description}
          </p>
        )}

        {(skills.length > 0 || careers.length > 0 || highlights.length > 0) && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-slate-100">
            {skills.length > 0 && (
              <div>
                <h3 className="text-xs font-bold text-slate-800 mb-2">Key Skills Covered</h3>
                <div className="flex flex-wrap gap-1.5">
                  {skills.map((skill, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-[11px] font-semibold border border-blue-100">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {highlights.length > 0 && (
              <div>
                <h3 className="text-xs font-bold text-slate-800 mb-2">Program Highlights</h3>
                <ul className="space-y-1">
                  {highlights.slice(0, 6).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1.5 text-xs text-slate-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {careers.length > 0 && (
              <div>
                <h3 className="text-xs font-bold text-slate-800 mb-2 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-indigo-600" /> Career Opportunities
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {careers.map((role, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 text-[11px] font-semibold border border-indigo-100">
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Live Custom Syllabus Modules (when added from Admin Panel) */}
      {modules.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <span>Updated Course Modules ({modules.length})</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {modules.map((mod, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-bold text-slate-900">
                    {idx + 1}. {mod.title}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {mod.duration && (
                      <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-700 text-[10px] font-bold">
                        {mod.duration}
                      </span>
                    )}
                    {mod.badge && (
                      <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 text-[10px] font-bold">
                        {mod.badge}
                      </span>
                    )}
                  </div>
                </div>
                {Array.isArray(mod.topics) && mod.topics.length > 0 && (
                  <ul className="space-y-1 mt-2">
                    {mod.topics.map((t, tIdx) => (
                      <li key={tIdx} className="text-xs text-slate-600 flex items-start gap-1.5">
                        <span className="text-blue-500 font-bold">•</span>
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Live Custom Projects (when added from Admin Panel) */}
      {projects.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Rocket className="w-5 h-5 text-emerald-600" />
            <span>Live Projects Included ({projects.length})</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {projects.map((proj, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-emerald-50/40 border border-emerald-200/70">
                {proj.category && (
                  <span className="inline-block px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold mb-1.5">
                    {proj.category}
                  </span>
                )}
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">{proj.title}</h4>
                {proj.description && (
                  <p className="text-xs text-slate-600 mt-1">{proj.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Live Course FAQs (when added from Admin Panel) */}
      {faqs.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-3">Frequently Asked Questions</h3>
          <div className="space-y-2">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-4 py-3 text-left flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-800 bg-slate-50 hover:bg-slate-100 transition cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === idx && (
                  <div className="px-4 py-3 text-xs sm:text-sm text-slate-600 bg-white border-t border-slate-100">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default LiveCourseSummaryStrip;
