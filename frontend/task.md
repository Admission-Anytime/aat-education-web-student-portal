# Typography & Font Weight Design System Specification

> **Source of Truth**: Homepage (`src/components/MainPage.jsx`), `index.html`, and `src/index.css`.  
> **Primary Font Family**: `'Poppins', sans-serif` (Weights: 400, 500, 600, 700, 800)  
> **Cursive Accent Font**: `'Caveat', cursive, sans-serif` / `'Dancing Script', cursive` (Weights: 500, 600, 700)

---

## 1. Core Font Weight Scale & Usage Rules

| Weight Token | Numeric Value | Tailwind Class | Standard Element Usage |
| :--- | :--- | :--- | :--- |
| **Regular** | `400` | `font-normal` | Body paragraphs, course descriptions, excerpts, metadata, dates, input placeholders, bullet points. |
| **Medium** | `500` | `font-medium` | Section subtitles, form field labels, secondary pill badges, small action links ("Read More", "Explore"), stat labels. |
| **SemiBold** | `600` | `font-semibold` | Card titles (`<h4>`), subheadings, dropdown links, primary action buttons, key highlights, author names, feature items. |
| **Bold** | `700` | `font-bold` | Page hero titles (`<h1>`), section titles (`<h2>`, `<h3>`), modal titles, primary CTA buttons, numerical metrics. |
| **ExtraBold** | `800` | `font-extrabold` | *Reserved exclusively* for prominent single-token statistics (e.g., `95%`, `22+`, `100%`) when maximum visual impact is required. |

---

## 2. Element-by-Element Typographic Mapping

### 2.1 Headings Hierarchy
- **Hero Title (`<h1>`)**:
  - Font Weight: `font-bold` (700)
  - Color: `#00285e` / `#0a1f3c` with `#0062ff` or gradient accent
  - Tracking: `tracking-tight`
  - Leading: `leading-tight` or `leading-[1.14]`
- **Section Heading (`<h2>`, `<h3>`)**:
  - Font Weight: `font-bold` (700)
  - Size: `text-xl sm:text-2xl md:text-3xl`
  - Color: `#00285e` or `#0a2540`
  - Tracking: `tracking-tight`
- **Card & Module Titles (`<h4>`, `<h5>`)**:
  - Font Weight: `font-semibold` (600)
  - Size: `text-xs sm:text-sm md:text-base`
  - Color: `#00285e` / `#0a2540`
  - Hover: `group-hover:text-[#0052cc]`

### 2.2 Subtitles & Descriptions
- **Section Subtitles**:
  - Font Weight: `font-normal` (400) or `font-medium` (500)
  - Size: `text-xs sm:text-[13px] md:text-sm`
  - Color: `#1d5bd8`, `#3b516d`, or `#475569`
- **Paragraphs / Body Text (`<p>`)**:
  - Font Weight: `font-normal` (400)
  - Size: `text-xs sm:text-sm`
  - Line Height: `leading-relaxed`
  - Color: `text-slate-600` or `text-slate-700`

### 2.3 Interactive Elements
- **Primary Buttons (`<button>`, CTA `<NavLink>`)**:
  - Font Weight: `font-semibold` (600) or `font-bold` (700)
  - Size: `text-xs sm:text-[13.5px]`
  - Shape: `rounded-full` or `rounded-xl`
- **Secondary Links & Nav Items**:
  - Font Weight: `font-medium` (500) or `font-semibold` (600)
  - Text Links: `hover:underline` or arrow transition
- **Pills, Badges & Category Tags**:
  - Font Weight: `font-medium` (500) or `font-semibold` (600)
  - Size: `text-[10px]` to `text-[11.5px]`
  - Shape: `rounded-full`

### 2.4 Forms & Modals
- **Field Labels**: `font-medium` (500) `text-[#00285e] text-[11px] sm:text-xs`
- **Input Fields & Select Boxes**: `font-normal` (400) `text-xs sm:text-[13px]`
- **Modal Header**: `font-bold` (700) `text-xl sm:text-2xl text-[#00285e]`
- **Modal Subtitle**: `font-normal` (400) `text-xs sm:text-[13px] text-slate-500`

---

## 3. Global CSS Enforcement Baseline (`src/index.css`)

To ensure consistent base typography across all pages:

```css
*, *::before, *::after {
  font-family: 'Poppins', sans-serif;
}

html, body {
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  color: #1e293b;
}

/* Headings Defaults */
h1, h2, h3 {
  font-weight: 700; /* bold */
  letter-spacing: -0.02em;
}

h4, h5, h6 {
  font-weight: 600; /* semibold */
  letter-spacing: -0.01em;
}

p, li, span, blockquote {
  font-weight: 400; /* normal */
}

button, .btn {
  font-weight: 600; /* semibold */
}

label {
  font-weight: 500; /* medium */
}

input, select, textarea {
  font-weight: 400; /* normal */
}
```

---

## 4. Pages Audit & Implementation Matrix

| File Path | Status | Typography Standard Alignment |
| :--- | :--- | :--- |
| `src/components/MainPage.jsx` | Reference | Verified Homepage baseline. All H1-H3 are `font-bold`, cards `font-semibold`, body `font-normal`. |
| `src/index.css` | Implemented | Enforces Poppins font-weight hierarchy rules at the CSS base layer. |
| `src/components/Navbar/Header.jsx` | Audited | Navigation links `font-semibold` (600), badges `font-bold`, phone/email `font-semibold`. |
| `src/components/Navbar/Courses.jsx` | Audited | Harmonized `font-extrabold` section titles to `font-bold` matching Homepage standard. |
| `src/components/Navbar/News.jsx` | Audited | Hero title `font-bold`, cards `font-semibold`, body `font-normal`, badges `font-semibold`. |
| `src/components/Navbar/CooperateTrainingProgram.jsx` | Audited | Headings `font-bold`, program titles `font-semibold`, bullets `font-normal`. |
| `src/components/Navbar/LiveProject.jsx` | Audited | Harmonized hero & step weights to standard `font-bold` / `font-semibold`. |
| `src/components/Navbar/Placement.jsx` | Audited | Harmonized section headings to `font-bold` (700) and step cards to `font-semibold` (600). |
| `src/components/Navbar/UniversityCourses.jsx` | Audited | Harmonized section titles to `font-bold` and badges to `font-semibold` (600). |
| `src/components/Pages/AboutUs.jsx` | Audited | Headings `font-bold`, timeline milestones `font-semibold`, descriptions `font-normal`. |
| `src/components/Pages/ContactUs.jsx` | Audited | Form labels `font-medium`, card titles `font-semibold`, hero `font-bold`. |
| `src/components/Pages/TermsAndConditions.jsx` | Audited | Document headings `font-bold`, clause titles `font-semibold`, text `font-normal`. |
| `src/components/Pages/FAQ.jsx` | Audited | Accordion questions `font-semibold`, answers `font-normal`, category titles `font-bold`. |
| Individual Course Pages (`WebDevelopment.jsx`, etc.) | Audited | Module titles `font-semibold`, syllabus bullets `font-normal`, pricing/duration `font-medium`. |
| `src/components/SchoolWebsite.jsx` (Footer) | Audited | Column titles `font-semibold`, nav links `font-normal`/`font-medium`, brand title `font-bold`. |
| `src/components/Pages/ApplyNow.jsx` & `RegistrationForm.jsx` | Audited | Form headings `font-bold`, section indicators `font-semibold`, input labels `font-medium`. |
| `src/components/Pages/ImsLoginPage.jsx` | Audited | Portal headings `font-bold`, role cards `font-semibold`, input labels `font-medium`. |

---

## 5. News, Blogs & Vlogs Typography Specification (`src/components/Navbar/News.jsx`)

The News & Blogs/Vlogs section incorporates both institutional announcements and multimedia student video vlogs:

| Element / Component | Tailwind Classes | Numeric Weight | Description & Purpose |
| :--- | :--- | :--- | :--- |
| **Hero Badge** | `text-[10.5px] font-semibold` | `600` | Top badge reading "NEWS, EVENTS & ACADEMIC UPDATES". |
| **Hero Main Title (`<h1>`)** | `font-bold text-[#00285e] tracking-tight` | `700` | "Stay Updated with Latest News & Announcements". |
| **Hero Subtitle** | `font-normal text-xs sm:text-[13px]` | `400` | Clean informative description with zero text bloat. |
| **Trust Badges** | `text-[11.5px] font-medium` | `500` | "New Batch Alerts", "Placement Results", "Tech Masterclasses". |
| **Action Buttons** | `text-xs sm:text-[13px] font-semibold` | `600` | "Browse All Updates", "Enquire for Batch". |
| **Filter Navigation Pills** | `text-xs sm:text-[13px] font-semibold` | `600` | Filter buttons: All Updates, New Batches, Placements, Workshops, University, Announcements, Blogs & Vlogs. |
| **Active Pill Gradient** | `font-semibold text-white` | `600` | Highlighted category pill with subtle shadow glow. |
| **Search Input Field** | `text-xs sm:text-sm font-normal` | `400` | Keyword filter input with placeholder `font-normal`. |
| **Section Header (`<h2>`)** | `text-xl sm:text-2xl font-bold` | `700` | "Latest Institute Notices & Articles" or selected category heading. |
| **Featured Headlines Label** | `text-xs font-bold uppercase` | `700` | Section kicker with sparkle icon. |
| **Featured Article Title** | `text-sm sm:text-[15px] font-semibold` | `600` | Harmonized card heading to avoid bulky visual heaviness. |
| **Grid Card Titles (`<h4>`)** | `text-[13.5px] sm:text-[14px] font-semibold` | `600` | Clean card title hierarchy adhering to Homepage standard. |
| **Card Category Badges** | `text-[10px] font-semibold` | `600` | Color-coded category tags with subtle border. |
| **Vlog Video Badges** | `text-[10px] font-semibold` | `600` | Video vlog indicator with play icon. |
| **Read Time & Timestamps** | `text-[10px] sm:text-[11px] font-normal` | `400` | Calendar dates and clock read times. |
| **Author Footnotes** | `text-[11px] font-medium` | `500` | "By Academic Cell", "Placement Cell", etc. |
| **"Read Details" Action Link** | `text-[11px] font-semibold` | `600` | Interactive card footer link with animated chevron. |
| **Article Modal Title** | `text-base sm:text-lg font-bold` | `700` | Header title inside article reader pop-up modal. |
| **Article Modal Body** | `text-xs sm:text-sm font-normal` | `400` | Full content paragraph text with relaxed line-height. |
| **Instruction Box** | `text-xs font-semibold` | `600` | Guidance callout title with `font-normal` description. |
| **Bottom CTA Banner** | `font-bold text-xl sm:text-2xl` | `700` | "Want Personal Guidance on Courses or Batches?". |

---

## 6. Footer Component Typography Specification (`src/components/SchoolWebsite.jsx`)

The global footer serves as the primary navigation anchor across all pages:

| Element / Area | Tailwind Classes | Numeric Weight | Description & Purpose |
| :--- | :--- | :--- | :--- |
| **Top Quick Links Bar** | `text-xs sm:text-[13px] font-medium` | `500` | Quick navigation links (`About us`, `Contact us`, `Terms`, `Blog`, `Admission`, `Result`, `Career`, `FAQs`, `Staff`). |
| **Active Quick Link** | `font-semibold text-[#fed000]` | `600` | High-contrast gold indicator for the current active page route. |
| **Brand Title (`<h3>`)** | `text-white font-bold text-[16px] sm:text-[17px]` | `700` | "Aayush Institute Of Professional Studies". |
| **Brand Tagline** | `text-xs sm:text-[12.5px] font-semibold` | `600` | Three-point institutional motto: "Learn • Grow • Build Your Future". |
| **Campus Location** | `text-xs font-normal text-slate-400` | `400` | "Uttam Nagar East, New Delhi - 110059" with pin icon. |
| **Column Headings (`<h4>`)** | `text-white font-semibold text-xs sm:text-[13.5px]` | `600` | Resource categories: "Popular Course", "Admission", "Career After", "Best Career Options". |
| **Column Navigation Links** | `text-xs sm:text-[12px] font-normal` | `400` | Navigation items with `hover:text-gold/emerald/sky` interaction and truncate overflow. |
| **Bottom Bar Copyright** | `text-xs font-normal text-slate-400` | `400` | "&copy; 2026 Aayush Institute of Professional Studies. All Rights Reserved." |
| **"Follow Us" Label** | `text-white text-xs font-semibold` | `600` | Social section label preceding social media icon buttons. |

---

## 7. Footer-Linked Pages Detailed Typography Alignment

All 10+ pages directly linked in the footer adhere strictly to this design system:

### 7.1 About Us (`src/components/Pages/AboutUs.jsx`)
- **Page Hero**: `font-bold` (700) for H1, `font-medium` (500) for intro pill.
- **Section Headings (`<h2>`)**: `font-bold` (700) with `-0.02em` tracking.
- **Milestone Timeline**: Step years `font-bold` (700), milestone titles `font-semibold` (600), descriptions `font-normal` (400).
- **Core Value Cards**: Value titles `font-semibold` (600), body copy `font-normal` (400).

### 7.2 Contact Us (`src/components/Pages/ContactUs.jsx`)
- **Hero Title**: `font-bold` (700) with gradient highlight.
- **Form Field Labels**: `font-medium` (500) `text-slate-700`.
- **Form Input Elements**: `font-normal` (400) `text-xs sm:text-sm` with smooth outline focus.
- **Office Location Cards**: City/Branch names `font-semibold` (600), phone & email text `font-medium` (500).

### 7.3 Terms & Conditions (`src/components/Pages/TermsAndConditions.jsx`)
- **Document Header**: H1 `font-bold` (700), policy badge `font-bold` (700) uppercase.
- **Section Clause Titles (`<h2>`)**: `font-bold` (700) with sequential clause number boxes.
- **Summary Cards (`<h4>`)**: Harmonized to `font-semibold` (600) for clean legal readability.
- **Clause Body & Bullets**: `font-normal` (400) with relaxed line spacing.
- **Sidebar Index Navigation**: `font-medium` (500) `text-[11px]`.

### 7.4 Frequently Asked Questions (`src/components/Pages/FAQ.jsx`)
- **Hero Heading**: `font-bold` (700), subtitle `font-semibold` (600).
- **Category Accordion Headers (`<h2>`)**: `font-bold` (700) `text-xs sm:text-sm`.
- **Question Buttons**: `font-semibold` (600) `text-xs sm:text-[13px]`.
- **Expanded Answer Text**: `font-normal` (400) `text-xs sm:text-[13px]` in soft slate color.

### 7.5 Admission / Apply Now & Registration (`src/components/Pages/RegistrationForm.jsx`)
- **Form Header**: `font-bold` (700) `text-2xl sm:text-3xl` for "Apply Now for 2026-2027 Academic Session".
- **Progress Step Numbers**: `font-medium` (500) circular indicators.
- **Input Field Labels**: `font-medium` (500) `text-sm text-gray-700`.
- **Submit & Navigation Buttons**: `font-semibold` (600) / `font-bold` (700).

### 7.6 IMS Login & Result Portal (`src/components/Pages/ImsLoginPage.jsx`)
- **Portal Heading**: `font-bold` (700) `text-2xl`.
- **Login Role Selection Cards** (Student, Staff, Alumni, Sign Up): Card titles `font-semibold` (600), subtitles `font-normal` (400).
- **Auth Inputs**: `font-normal` (400) with `font-medium` labels and security badges.

### 7.7 Placement & Career Cell (`src/components/Navbar/Placement.jsx`)
- **Hero & Process Section**: `font-bold` (700) headings.
- **6-Step Journey Cards**: Step numbers `font-extrabold` (800) metric, step titles `font-semibold` (600), descriptions `font-normal` (400).
- **Recruiter Logos & Statistics**: Prominent package figures (`7.5 LPA`, `250+`) `font-bold` (700).

### 7.8 Popular Course Pages (`WebDevelopment.jsx`, `ITFullStackDevelopment.jsx`, etc.)
- **Hero Title**: `font-bold` (700) with gradient accent.
- **Curriculum Modules (`<h4>`)**: `font-semibold` (600).
- **Syllabus Topics & Key Takeaways**: `font-normal` (400).
- **Action Buttons & Download Curriculum**: `font-bold` (700) / `font-semibold` (600).
