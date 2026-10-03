// Central source of truth for all Course & Subject data in Aayush Institute
// Shared across Courses.jsx, Admin/Staff Panel (AdminPanel.jsx), and services/api.js

export const defaultCategories = [
    {
        id: 'software',
        label: 'Software & Web Development',
        icon: null,
        eligibility: '12th / Diploma / BCA / B.Tech / MCA / Graduates / Career Changers',
        desc: 'Industry-ready software engineering, full stack web development, responsive interface design, and mobile applications.',
        activeGrad: 'from-blue-600 to-indigo-600',
        activeShadow: 'shadow-blue-500/30',
        badgeColor: 'bg-blue-50 text-blue-700 border-blue-200/90',
        iconColor: 'text-blue-600',
        headerGrad: 'from-blue-600 via-indigo-600 to-cyan-500'
    },
    {
        id: 'ai-data',
        label: 'AI, Data & Cloud',
        icon: null,
        eligibility: '12th / Diploma / BCA / B.Tech / B.Sc / Graduates / Working Professionals',
        desc: 'Cutting-edge Generative AI, Data Science & Business Intelligence, Cloud DevOps architecture, and Cyber Security defense.',
        activeGrad: 'from-purple-600 to-violet-600',
        activeShadow: 'shadow-purple-500/30',
        badgeColor: 'bg-purple-50 text-purple-700 border-purple-200/90',
        iconColor: 'text-purple-600',
        headerGrad: 'from-purple-600 via-violet-600 to-fuchsia-500'
    },
    {
        id: 'design',
        label: 'Design, UI/UX & Media',
        icon: null,
        eligibility: '10th / 12th / Diploma / Graduates / Creative Enthusiasts / Design Aspirants',
        desc: 'Digital product UI/UX with Figma, user research, visual branding with Photoshop/Illustrator, and cinematic video editing.',
        activeGrad: 'from-rose-600 to-pink-600',
        activeShadow: 'shadow-rose-500/30',
        badgeColor: 'bg-rose-50 text-rose-700 border-rose-200/90',
        iconColor: 'text-rose-600',
        headerGrad: 'from-rose-600 via-pink-600 to-rose-400'
    },
    {
        id: 'marketing',
        label: 'Digital Marketing & E-Commerce',
        icon: null,
        eligibility: '12th / Graduates / Entrepreneurs / Marketers / Freelancers',
        desc: 'End-to-end performance marketing, SEO, Google Ads, Meta advertising, and multi-channel e-commerce store scaling.',
        activeGrad: 'from-amber-500 to-orange-500',
        activeShadow: 'shadow-amber-500/30',
        badgeColor: 'bg-amber-50 text-amber-800 border-amber-200/90',
        iconColor: 'text-amber-600',
        headerGrad: 'from-amber-500 via-orange-500 to-yellow-500'
    },
    {
        id: 'business',
        label: 'Accounting & Business Skills',
        icon: null,
        eligibility: '10th / 12th / B.Com / BBA / Non-Commerce / Business Owners / Office Executives',
        desc: 'Computerized accounting with TallyPrime, GST taxation compliance, banking reconciliation, and Advanced Excel workplace skills.',
        activeGrad: 'from-emerald-600 to-teal-600',
        activeShadow: 'shadow-emerald-500/30',
        badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200/90',
        iconColor: 'text-emerald-600',
        headerGrad: 'from-emerald-600 via-teal-600 to-emerald-400'
    },
    {
        id: 'technical',
        label: 'Technical CAD & IT Support',
        icon: null,
        eligibility: 'ITI / Polytechnic / Diploma / B.Tech / 10th–12th with Technical Interest',
        desc: 'Precision AutoCAD 2D/3D engineering drafting, computer hardware troubleshooting, and enterprise network administration.',
        activeGrad: 'from-cyan-600 to-sky-600',
        activeShadow: 'shadow-cyan-500/30',
        badgeColor: 'bg-cyan-50 text-cyan-800 border-cyan-200/90',
        iconColor: 'text-cyan-600',
        headerGrad: 'from-cyan-600 via-sky-600 to-blue-500'
    },
    {
        id: 'languages',
        label: 'Foreign Languages & Test Prep',
        icon: null,
        eligibility: 'Open to All Students, Study-Abroad Aspirants, Professionals & Language Enthusiasts',
        desc: 'Global language proficiencies in German, French, and Japanese, alongside standardized IELTS and PTE exam preparation.',
        activeGrad: 'from-indigo-600 to-blue-700',
        activeShadow: 'shadow-indigo-500/30',
        badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200/90',
        iconColor: 'text-indigo-600',
        headerGrad: 'from-indigo-600 via-blue-700 to-violet-600'
    },
    {
        id: 'shortterm',
        label: 'Short-Term & Professional Skills',
        icon: null,
        eligibility: 'Job Seekers, College Students, Working Professionals & Career Starters',
        desc: 'Fast-track career-ready certifications: workplace communication, interview readiness, and essential digital productivity skills.',
        activeGrad: 'from-teal-600 to-emerald-600',
        activeShadow: 'shadow-teal-500/30',
        badgeColor: 'bg-teal-50 text-teal-800 border-teal-200/90',
        iconColor: 'text-teal-600',
        headerGrad: 'from-teal-600 via-emerald-600 to-green-400'
    }
];

export const defaultCategoryCourses = {
    // 1. SOFTWARE & WEB DEVELOPMENT (Courses 2, 6, 10 & Frontend UI)
    software: [
        {
            id: 2,
            name: "Software & Full Stack Development",
            subgroup: "Full Stack & Web Engineering",
            oneLiner: "Build modern web applications using programming, frontend, backend, APIs and full stack technologies.",
            icon: null,
            image: '/course_mern.jpg',
            popular: true,
            path: "/it-stack-development",
            skills: ["Programming", "Web Development", "Full Stack", "React", "Node.js", "REST APIs", "SQL/NoSQL"],
            level: "Beginner to Advanced",
            duration: "4–6 Months",
            eligibility: "12th / BCA / B.Tech / MCA / Graduates",
            careerAreas: "Full Stack Developer, Software Engineer, Backend Engineer, Web Developer",
            details: "Master end-to-end software development from frontend architecture to backend APIs, database management, and scalable cloud deployment.",
            features: ["Programming Fundamentals", "Web Development Architecture", "Frontend (React/Next.js)", "Backend & RESTful APIs", "SQL & NoSQL Databases", "Full Stack Capstone Projects"],
            certification: "Certified Full Stack Software Developer"
        },
        {
            id: 6,
            name: "Web Designing",
            subgroup: "Web & Frontend Design",
            oneLiner: "Create modern, responsive and user-friendly websites using HTML, CSS, JavaScript and modern web tools.",
            icon: null,
            image: '/course_web_design.jpg',
            popular: true,
            path: "/web-development",
            skills: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "WordPress", "Bootstrap", "Web Hosting"],
            level: "Beginner to Intermediate",
            duration: "3–4 Months",
            eligibility: "10th / 12th / Any Stream / Creative Aspirants",
            careerAreas: "Web Designer, Frontend Specialist, WordPress Developer, UI Layout Designer",
            details: "Build dynamic, responsive, and mobile-friendly websites with clean semantic HTML5, CSS3, modern JavaScript, and WordPress CMS themes.",
            features: ["HTML5 & Modern CSS3 Layouts", "Responsive Mobile-First Design", "Core JavaScript & DOM Events", "CSS Flexbox & CSS Grid Mastery", "WordPress Setup & Theme Customization", "Live Website Deployment"],
            certification: "Certified Professional Web Designer"
        },
        {
            id: 10,
            name: "Mobile App Development",
            subgroup: "Mobile Applications",
            oneLiner: "Learn to design and develop Android and cross-platform mobile applications using modern technologies.",
            icon: null,
            image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=800&q=80',
            popular: true,
            path: "/app-development",
            skills: ["Android", "Kotlin", "Flutter", "React Native", "Firebase", "REST APIs", "Play Store"],
            level: "Beginner to Advanced",
            duration: "4–6 Months",
            eligibility: "12th / IT Diploma / BCA / B.Tech / Enthusiasts",
            careerAreas: "Mobile App Developer, Flutter Engineer, Android Developer, Cross-Platform Specialist",
            details: "Create high-performance native Android and cross-platform iOS/Android apps using Kotlin, Flutter, and React Native with Firebase backend integration.",
            features: ["Android Architecture & Kotlin", "Cross-Platform Flutter & Dart", "React Native Architecture", "State Management & App Lifecycle", "REST APIs & Cloud Database Sync", "Play Store Publishing Workflow"],
            certification: "Certified Mobile Application Developer"
        },
        {
            id: 101,
            name: "Python Full Stack & Django Engineering",
            subgroup: "Backend & Web Architecture",
            oneLiner: "Build robust, scalable backend web applications, REST APIs, and database-driven portals with Python & Django.",
            icon: null,
            image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=800&q=80",
            popular: true,
            path: "/python-programming",
            skills: ["Python", "Django", "PostgreSQL", "REST APIs", "Docker", "Git", "Celery"],
            level: "Beginner to Advanced",
            duration: "4–6 Months",
            eligibility: "12th / Diploma / BCA / B.Tech / MCA / Graduates",
            careerAreas: "Python Developer, Backend Engineer, Django Specialist, Full Stack Engineer",
            details: "Master end-to-end Python web development with the Django framework, ORM database modeling, RESTful API design, authentication, and cloud deployment.",
            features: ["Python Programming Core & Advanced", "Django Architecture & MVT Pattern", "PostgreSQL Database & Django ORM", "Building & Consuming REST APIs", "Asynchronous Tasks with Celery & Redis", "Cloud Deployment on AWS & Heroku"],
            certification: "Certified Python Full Stack Engineer"
        },
        {
            id: 102,
            name: "Java Enterprise Full Stack & Spring Boot",
            subgroup: "Enterprise Software Engineering",
            oneLiner: "Master enterprise Java programming, Spring Boot microservices, Hibernate ORM, and full-stack React integration.",
            icon: null,
            image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
            popular: false,
            skills: ["Core Java", "Spring Boot", "Microservices", "Hibernate", "React", "MySQL", "Kafka"],
            level: "Intermediate to Advanced",
            duration: "5–6 Months",
            eligibility: "Diploma / BCA / B.Tech / MCA / Java Aspirants",
            careerAreas: "Java Developer, Spring Boot Specialist, Enterprise Software Architect",
            details: "Build high-concurrency enterprise software with Core & Advanced Java, Spring Boot microservices ecosystem, Hibernate JPA, and scalable database backends.",
            features: ["OOPs & Java 17+ Modern Features", "Spring Boot Microservices Architecture", "Hibernate JPA & Relational Databases", "Spring Security & JWT Authentication", "Event-Driven Systems with Apache Kafka", "Frontend Integration with Modern React"],
            certification: "Certified Java Enterprise Architect"
        },
        {
            id: 103,
            name: "MERN Stack & Next.js 14 Full Stack Specialist",
            subgroup: "Modern JavaScript Stacks",
            oneLiner: "Develop cutting-edge full-stack web applications with MongoDB, Express.js, React 18, Node.js and Next.js 14 App Router.",
            icon: null,
            image: "/course_mern.jpg",
            popular: true,
            skills: ["MongoDB", "Express", "React 18", "Node.js", "Next.js 14", "TypeScript", "Tailwind CSS"],
            level: "Beginner to Advanced",
            duration: "4–6 Months",
            eligibility: "12th / Graduates / BCA / B.Tech / Frontend Developers",
            careerAreas: "MERN Stack Developer, Next.js Engineer, Full Stack JavaScript Developer",
            details: "Comprehensive hands-on training covering the modern JavaScript ecosystem from React components and Next.js server actions to Node/Express microservices.",
            features: ["React 18 Hooks & State Architecture", "Next.js 14 App Router & SSR/SSG", "RESTful & GraphQL API Architecture", "MongoDB NoSQL Aggregation Pipelines", "TypeScript for Production Stacks", "Complete Live Production Deployment"],
            certification: "Certified MERN & Next.js Specialist"
        }
    ],

    // 2. AI, DATA & CLOUD (Courses 1, 3, 4, 5)
    'ai-data': [
        {
            id: 1,
            name: "Artificial Intelligence & Generative AI",
            subgroup: "Artificial Intelligence",
            oneLiner: "Learn Generative AI, AI tools, prompt engineering and practical AI applications for modern work and business.",
            icon: null,
            image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80',
            popular: true,
            skills: ["AI", "Generative AI", "AI Tools", "Automation", "Prompt Engineering", "LLMs", "Custom GPTs"],
            level: "Beginner to Advanced",
            duration: "3–6 Months",
            eligibility: "12th / BCA / B.Tech / Working Professionals / Business Owners",
            careerAreas: "AI Specialist, Prompt Engineer, AI Automation Consultant, AI Product Lead",
            details: "Comprehensive hands-on training on large language models (LLMs), prompt engineering frameworks, OpenAI APIs, workflow automations, and practical generative tools.",
            features: ["Generative AI & LLM Architecture", "Advanced Prompt Engineering Frameworks", "AI Workflow Automation (Make/Zapier)", "OpenAI APIs & Custom GPT Development", "AI Image & Video Generation Tools", "Enterprise AI Implementation Use Cases"],
            certification: "Certified Generative AI & Automation Specialist"
        },
        {
            id: 3,
            name: "Data Science, Data Analytics & Business Intelligence",
            subgroup: "Data Science & BI",
            oneLiner: "Learn Python, SQL, Power BI, data visualization and analytics to turn data into useful business insights.",
            icon: null,
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
            popular: true,
            skills: ["Python", "SQL", "Power BI", "Data Analytics", "Machine Learning", "Pandas", "Excel"],
            level: "Beginner to Advanced",
            duration: "4–6 Months",
            eligibility: "Graduates / B.Sc / B.Com / BCA / B.Tech / Analysts",
            careerAreas: "Data Analyst, BI Developer, Data Scientist, Business Analytics Specialist",
            details: "Transform complex enterprise data into decision-ready business intelligence through Python data science stacks, advanced SQL queries, and Power BI interactive reports.",
            features: ["Python for Data Analysis (NumPy, Pandas)", "Enterprise SQL Querying & Aggregations", "Power BI DAX & Interactive Dashboards", "Statistical Analysis & EDA Techniques", "Intro to Machine Learning Models", "Real-World Business Intelligence Projects"],
            certification: "Certified Data Science & BI Professional"
        },
        {
            id: 4,
            name: "Cyber Security & Networking",
            subgroup: "Security & Networking",
            oneLiner: "Build foundational skills in networking, cyber security, ethical hacking concepts and digital protection.",
            icon: null,
            image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
            popular: true,
            skills: ["Cyber Security", "Ethical Hacking", "Networking", "Security", "Firewalls", "Wireshark", "Kali Linux"],
            level: "Beginner to Advanced",
            duration: "4–6 Months",
            eligibility: "12th / IT Diploma / BCA / B.Tech / Tech Enthusiasts",
            careerAreas: "Cyber Security Analyst, Network Security Engineer, Ethical Hacker, SOC Analyst",
            details: "Master cybersecurity principles, network protocols, defensive architecture, ethical hacking penetration tools, and threat protection best practices.",
            features: ["Network Protocols & TCP/IP Architecture", "Ethical Hacking & Penetration Testing", "Kali Linux & Vulnerability Scanning", "Firewalls, VPNs & IDS/IPS Systems", "Threat Detection & SOC Fundamentals", "Web Application Security (OWASP Top 10)"],
            certification: "Certified Cyber Security & Network Defense Specialist"
        },
        {
            id: 5,
            name: "Cloud Computing & DevOps",
            subgroup: "Cloud & Infrastructure",
            oneLiner: "Learn cloud platforms, Linux, Docker, deployment, CI/CD and essential DevOps practices.",
            icon: null,
            image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
            popular: true,
            skills: ["AWS", "Azure", "Linux", "Docker", "DevOps", "Cloud", "CI/CD", "Kubernetes"],
            level: "Intermediate to Advanced",
            duration: "4–6 Months",
            eligibility: "Diploma / BCA / B.Tech / SysAdmins / Developers",
            careerAreas: "Cloud Engineer, DevOps Engineer, AWS Solutions Specialist, Site Reliability Engineer",
            details: "Design and orchestrate resilient cloud architectures on AWS and Azure with Docker containerization, Linux sysadmin fundamentals, and CI/CD pipelines.",
            features: ["AWS & Azure Cloud Architecture", "Linux Administration & Bash Scripting", "Docker Containerization & Multi-Stage Builds", "Kubernetes Cluster Orchestration", "CI/CD Pipeline Automation (GitHub Actions/Jenkins)", "Infrastructure as Code (IaC) & Cloud Security"],
            certification: "Certified Cloud Architect & DevOps Practitioner"
        },
        {
            id: 104,
            name: "Machine Learning & Deep Learning Specialist",
            subgroup: "Machine Learning & Neural Networks",
            oneLiner: "Master predictive modeling, deep learning architectures, CNNs, NLP, PyTorch, and TensorFlow from scratch.",
            icon: null,
            image: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=800&q=80",
            popular: true,
            skills: ["Machine Learning", "Deep Learning", "TensorFlow", "PyTorch", "Computer Vision", "NLP", "Scikit-Learn"],
            level: "Intermediate to Advanced",
            duration: "4–6 Months",
            eligibility: "BCA / B.Tech / B.Sc / Math or Tech Graduates / Programmers",
            careerAreas: "Machine Learning Engineer, Deep Learning Specialist, NLP Developer, Computer Vision Engineer",
            details: "Hands-on implementation of machine learning algorithms, deep neural network architectures, image classification with CNNs, natural language processing with Transformers, and model deployment.",
            features: ["Supervised & Unsupervised Machine Learning", "Neural Networks & Backpropagation Math", "TensorFlow & PyTorch Deep Learning Pipelines", "Computer Vision & Object Detection (YOLO/OpenCV)", "NLP & Transformers (BERT/HuggingFace)", "MLOps Model Deployment & Monitoring"],
            certification: "Certified Machine Learning & Deep Learning Specialist"
        },
        {
            id: 105,
            name: "Big Data Engineering & Apache Spark",
            subgroup: "Data Engineering Architecture",
            oneLiner: "Design distributed data pipelines, ETL workflows, data lakes, and streaming architectures with Spark and Hadoop.",
            icon: null,
            image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
            popular: false,
            skills: ["Apache Spark", "Hadoop", "PySpark", "Kafka", "Data Warehousing", "Snowflake", "ETL Pipelines"],
            level: "Advanced",
            duration: "4–5 Months",
            eligibility: "Software Developers, Data Analysts, SysAdmins, B.Tech / MCA",
            careerAreas: "Big Data Engineer, Data Platform Architect, PySpark Developer, ETL Consultant",
            details: "Master distributed computing architectures to process massive enterprise data streams with Hadoop HDFS, PySpark DataFrames, real-time Kafka event streaming, and cloud data warehouses.",
            features: ["Hadoop Ecosystem & Distributed Storage", "Apache Spark Core & PySpark DataFrames", "Real-Time Streaming with Apache Kafka", "Data Lakehouse Architecture (Delta Lake/Snowflake)", "Airflow Orchestration & Automated ETL", "Enterprise Big Data Capstone Implementation"],
            certification: "Certified Big Data & Distributed Systems Engineer"
        }
    ],

    // 3. DESIGN, UI/UX & MEDIA (Courses 7, 8, 9 & Motion Graphics)
    design: [
        {
            id: 7,
            name: "UI/UX & Product Design",
            subgroup: "Product & Interface Design",
            oneLiner: "Design intuitive websites and mobile products through UX research, Figma, wireframing and prototyping.",
            icon: null,
            image: '/course_ui_ux.jpg',
            popular: true,
            path: "/ui-ux-design",
            skills: ["Figma", "UX Research", "Wireframing", "Prototyping", "Product Design", "Design Systems", "Usability Testing"],
            level: "Beginner to Advanced",
            duration: "3–4 Months",
            eligibility: "10th / 12th / Any Stream / Creative Design Aspirants",
            careerAreas: "UI/UX Designer, Product Designer, Interaction Designer, Figma Specialist",
            details: "Transform complex user problems into intuitive digital experiences using industry-standard design thinking, Figma auto-layouts, micro-interactions, and design systems.",
            features: ["User Research & Empathy Mapping", "Information Architecture & User Journeys", "Wireframing & Low/High Fidelity UI", "Interactive Prototyping in Figma", "Building Scalable Design Systems", "Usability Testing & Real Client Case Studies"],
            certification: "Certified UI/UX Product Designer"
        },
        {
            id: 8,
            name: "Graphic Design & Branding",
            subgroup: "Visual & Brand Identity",
            oneLiner: "Develop professional visual communication skills in Photoshop, Illustrator, CorelDRAW, branding and digital design.",
            icon: null,
            image: '/course_graphic_design.jpg',
            popular: true,
            skills: ["Photoshop", "Illustrator", "CorelDRAW", "Branding", "Creative Design", "Typography", "Print Media"],
            level: "Beginner to Intermediate",
            duration: "3–4 Months",
            eligibility: "10th / 12th / Any Graduate / Creative Aspirants",
            careerAreas: "Graphic Designer, Brand Identity Designer, Visual Communicator, Print Production Lead",
            details: "Master digital aesthetics, vector typography, brand style guides, photo manipulation, social media banners, and commercial print design.",
            features: ["Adobe Photoshop Photo Manipulation", "Adobe Illustrator Vector Graphic Art", "CorelDRAW Vector & Print Layouts", "Brand Identity & Logo Creation", "Social Media Creatives & Ad Assets", "Commercial Print Production Guidelines"],
            certification: "Certified Graphic & Brand Designer"
        },
        {
            id: 9,
            name: "Video Editing & Motion Graphics",
            subgroup: "Video & Motion Media",
            oneLiner: "Create professional videos, reels, motion graphics and digital content using modern editing tools.",
            icon: null,
            image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80',
            popular: true,
            skills: ["Premiere Pro", "After Effects", "Motion Graphics", "Reels", "Color Grading", "Sound Design", "VFX"],
            level: "Beginner to Intermediate",
            duration: "3–4 Months",
            eligibility: "10th / 12th / Content Creators / Media Enthusiasts",
            careerAreas: "Video Editor, Motion Graphics Artist, YouTube Content Creator, Reels & Video Producer",
            details: "Produce viral short-form social reels, YouTube productions, motion typography, and corporate video packages with Adobe Premiere Pro and After Effects.",
            features: ["Adobe Premiere Pro Timeline Editing", "Adobe After Effects Motion Animations", "Color Grading & Cinematic LUTs", "Sound Design & Audio Mastering", "Kinetic Typography & Lower Thirds", "Short-Form Reels & Long-Form Video Projects"],
            certification: "Certified Video Editor & Motion Artist"
        },
        {
            id: 106,
            name: "3D Animation & Visual Effects (VFX)",
            subgroup: "3D Art & CGI Media",
            oneLiner: "Create photorealistic 3D models, character animation, CGI environments, and visual effects using Blender and Maya.",
            icon: null,
            image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
            popular: true,
            skills: ["Blender", "Autodesk Maya", "3D Modeling", "Texturing", "Character Animation", "VFX Compositing"],
            level: "Beginner to Advanced",
            duration: "4–6 Months",
            eligibility: "10th / 12th / Creative Aspirants / Designers / Animators",
            careerAreas: "3D Modeler, Character Animator, VFX Artist, Lighting & Rendering Specialist",
            details: "Master digital 3D sculpting, polygon modeling, PBR texturing, rigging, character keyframing, dynamic fluid simulations, and cinematic VFX compositing in Blender and Autodesk Maya.",
            features: ["Hard Surface & Organic 3D Modeling", "PBR Shading, UV Unwrapping & Substance Textures", "Biped Character Rigging & Weight Painting", "Keyframe Animation & Walk Cycles", "Particle Simulations, Smoke & Fire Dynamics", "Cycles & Arnold Lighting and Final Rendering"],
            certification: "Certified 3D Animation & VFX Artist"
        }
    ],

    // 4. DIGITAL MARKETING & E-COMMERCE (Courses 11, 12 & Social/SEO)
    marketing: [
        {
            id: 11,
            name: "Digital Marketing & Performance Marketing",
            subgroup: "Performance & Digital Marketing",
            oneLiner: "Learn SEO, Google Ads, Meta Ads, social media, content and performance marketing for digital growth.",
            icon: null,
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
            popular: true,
            path: "/digital-marketing",
            skills: ["SEO", "Google Ads", "Meta Ads", "Social Media", "Performance Marketing", "Content Strategy", "Analytics"],
            level: "Beginner to Advanced",
            duration: "3–5 Months",
            eligibility: "12th / Graduates / Marketing Enthusiasts / Business Owners",
            careerAreas: "Performance Marketer, SEO Specialist, PPC Campaign Manager, Digital Growth Strategist",
            details: "Execute ROI-driven growth marketing campaigns across Google Search, Meta Ads, organic search engine optimization, content funnels, and web analytics.",
            features: ["Search Engine Optimization (On-Page & Off-Page)", "Google Search, Display & Video Ads", "Meta (Facebook & Instagram) Ad Campaigns", "Social Media Strategy & Content Marketing", "Conversion Rate Optimization (CRO)", "Google Analytics 4 & Tag Manager Tracking"],
            certification: "Certified Performance Marketing Specialist"
        },
        {
            id: 12,
            name: "E-Commerce & Digital Business",
            subgroup: "E-Commerce & Marketplaces",
            oneLiner: "Learn Shopify, WooCommerce, marketplace operations, e-commerce marketing and online business fundamentals.",
            icon: null,
            image: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=800&q=80',
            popular: true,
            skills: ["Shopify", "WooCommerce", "Marketplaces", "E-Commerce Marketing", "Amazon", "Product Listing", "Dropshipping"],
            level: "Beginner to Intermediate",
            duration: "2–3 Months",
            eligibility: "12th / Graduates / Entrepreneurs / Business Owners",
            careerAreas: "E-Commerce Manager, Shopify Store Specialist, Marketplace Operations Executive, D2C Brand Builder",
            details: "Build, launch, and scale profitable digital stores on Shopify, WooCommerce, and leading marketplaces like Amazon with automated payment gateways and logistics.",
            features: ["Shopify Store Setup & Optimization", "WooCommerce WordPress Store Development", "Amazon & Flipkart Marketplace Listing", "Inventory, Logistics & Payment Gateways", "E-Commerce Ad Strategies & ROAS Scaling", "Dropshipping & Direct-to-Consumer (D2C) Basics"],
            certification: "Certified E-Commerce Business Executive"
        },
        {
            id: 107,
            name: "Growth Hacking & Performance Scaling",
            subgroup: "Growth Marketing & Viral Strategy",
            oneLiner: "Scale digital brands through viral content strategies, influencer outreach, funnel optimization, and high-ROAS marketing.",
            icon: null,
            image: "https://images.unsplash.com/photo-1533750516457-a7f992034fec?auto=format&fit=crop&w=800&q=80",
            popular: true,
            skills: ["Growth Hacking", "Social Media Funnels", "Influencer Marketing", "Viral Video Strategy", "Brand Scaling", "Google Analytics 4"],
            level: "Beginner to Intermediate",
            duration: "2–3 Months",
            eligibility: "12th / Graduates / Marketing Aspirants / E-Commerce Founders",
            careerAreas: "Growth Hacker, Social Media Strategist, Influencer Marketer, Viral Content Lead",
            details: "Master rapid experimentation across marketing funnels, viral reels frameworks, algorithmic social distribution, and data-driven customer acquisition.",
            features: ["AARRR Pirate Funnel Implementation", "Viral Short-Form Content Creation Workflows", "Influencer Campaign Negotiation & Tracking", "High-ROAS Meta Ads & Performance Max Setup", "Retention Marketing & Email Automation (Klaviyo)", "Omnichannel Analytics & Heatmap Optimization"],
            certification: "Certified Growth Marketing Strategist"
        }
    ],

    // 5. ACCOUNTING, GST & BUSINESS FINANCE (Courses 13, 14 & MIS/Taxation)
    business: [
        {
            id: 14,
            name: "Accounting, GST & Business Finance",
            subgroup: "Accounting & GST Taxation",
            oneLiner: "Learn Tally Prime, computerized accounting, GST, billing, payroll and essential business finance skills.",
            icon: null,
            image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
            popular: true,
            path: "/tally-accounting",
            skills: ["Tally Prime", "GST", "Accounting", "Billing", "Payroll", "TDS", "Balance Sheet"],
            level: "Beginner to Advanced",
            duration: "3–4 Months",
            eligibility: "10th / 12th / B.Com / Non-Commerce / Office Executives",
            careerAreas: "Accountant, GST Practitioner, Tally Executive, Tax Compliance Associate",
            details: "Hands-on computerized corporate accounting with TallyPrime, GST filing, e-way bills, inventory tracking, TDS deductions, and financial statement finalization.",
            features: ["Computerized Accounting with TallyPrime", "GST Computation, Invoicing & GSTR Filing", "TDS & TCS Statutory Compliance", "Inventory Valuation & Stock Management", "Payroll Processing & Employee Records", "Bank Reconciliation & Final Balance Sheets"],
            certification: "Certified Corporate Accountant & GST Specialist"
        },
        {
            id: 13,
            name: "Advanced Office & Business Skills",
            subgroup: "Office Productivity & Analytics",
            oneLiner: "Build practical workplace skills in MS Office, Advanced Excel, digital productivity and professional communication.",
            icon: null,
            image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
            popular: true,
            skills: ["MS Office", "Advanced Excel", "AI Productivity", "Workplace Skills", "PowerPoint", "Word", "Email Etiquette"],
            level: "Beginner to Intermediate",
            duration: "2–3 Months",
            eligibility: "10th / 12th / Graduates / Job Seekers / Office Staff",
            careerAreas: "MIS Executive, Office Administrator, Executive Assistant, Operations Associate",
            details: "Master enterprise office productivity using Advanced Excel (XLOOKUP, Pivot Tables, Dashboards), professional business presentations, and AI-assisted workflows.",
            features: ["Advanced Excel (XLOOKUP, Formulas, Arrays)", "Dynamic Pivot Tables & Executive Dashboards", "Professional MS Word Business Formatting", "High-Impact MS PowerPoint Presentations", "AI Productivity Tools for Corporate Operations", "Workplace Email Etiquette & Communication"],
            certification: "Certified Advanced Business & Office Specialist"
        },
        {
            id: 108,
            name: "Financial Modeling & Corporate Valuation",
            subgroup: "Corporate Finance & Analytics",
            oneLiner: "Build dynamic 3-statement financial models, DCF valuations, and executive investment analysis dashboards in Excel.",
            icon: null,
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
            popular: true,
            skills: ["Financial Modeling", "DCF Valuation", "M&A Analysis", "Excel Analytics", "Corporate Finance", "Sensitivity Analysis"],
            level: "Intermediate to Advanced",
            duration: "3–4 Months",
            eligibility: "B.Com / BBA / MBA / Finance Aspirants / Accounting Professionals",
            careerAreas: "Financial Analyst, Equity Research Associate, Investment Banking Analyst, Corporate Finance Executive",
            details: "Practical hands-on financial statement modeling, discounted cash flow (DCF) company valuations, leveraged buyout (LBO) fundamentals, and scenario forecasting.",
            features: ["Dynamic 3-Statement Financial Forecasting", "Discounted Cash Flow (DCF) Company Valuation", "Comparable Company & Precedent Transaction Analysis", "Sensitivity Matrices & Scenario Planning", "Executive Pitch Decks & Data Visualization", "Real-World M&A Deal Case Studies"],
            certification: "Certified Financial Modeling & Valuation Analyst"
        }
    ],

    // 6. TECHNICAL CAD & IT SUPPORT (Courses 15, 16 & 3D CAD/Networking)
    technical: [
        {
            id: 15,
            name: "AutoCAD & Technical Design",
            subgroup: "Engineering Drafting & CAD",
            oneLiner: "Develop practical CAD and technical drawing skills for engineering, architecture and technical design applications.",
            icon: null,
            image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
            popular: true,
            skills: ["AutoCAD", "CAD", "Engineering Drawing", "Technical Design", "2D Drafting", "3D Modeling", "Civil/Mechanical"],
            level: "Beginner to Advanced",
            duration: "2–4 Months",
            eligibility: "ITI / Polytechnic / Diploma / B.Tech / 12th with Technical Interest",
            careerAreas: "CAD Drafter, Architectural CAD Designer, Civil/Mechanical CAD Technician",
            details: "Industry-standard precision CAD drafting for civil, mechanical, and architectural layouts: 2D floor plans, elevations, section views, and 3D modeling fundamentals.",
            features: ["AutoCAD 2D Precision Drafting & Coordinates", "Layer Management, Dimensions & Blocks", "Architectural Floor Plans & Elevations", "Mechanical Engineering Component Drawings", "3D Solid Modeling & Isometrics", "Plotting, Scale Standards & Construction Sheets"],
            certification: "Certified AutoCAD Technical Draftsman"
        },
        {
            id: 16,
            name: "Hardware, IT Support & System Administration",
            subgroup: "Hardware & IT Support",
            oneLiner: "Learn computer hardware, operating systems, troubleshooting, networking and essential IT support skills.",
            icon: null,
            image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
            popular: true,
            skills: ["Hardware", "IT Support", "Linux", "Windows", "Troubleshooting", "Networking", "System Admin"],
            level: "Beginner to Intermediate",
            duration: "3–4 Months",
            eligibility: "10th / 12th / Diploma / Tech Enthusiasts",
            careerAreas: "IT Support Engineer, Desktop Support Technician, Hardware Specialist, Network Admin",
            details: "Learn practical computer hardware assembly, OS installation (Windows & Linux), peripheral troubleshooting, LAN networking, and helpdesk support ticketing.",
            features: ["Computer Hardware Architecture & Assembly", "BIOS/UEFI & OS Installation (Windows/Linux)", "Peripheral Configuration & Hardware Diagnostics", "LAN Setup, Crimping, Routers & Switches", "Active Directory & User Permissions", "Enterprise Helpdesk & Troubleshooting Methods"],
            certification: "Certified IT Support & System Administrator"
        },
        {
            id: 109,
            name: "Revit Architecture & BIM 3D Modeling",
            subgroup: "Architectural BIM & Construction",
            oneLiner: "Learn building information modeling (BIM), parametric architectural drafting, schedules, and 3D detailing with Autodesk Revit.",
            icon: null,
            image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
            popular: true,
            skills: ["Autodesk Revit", "BIM Modeling", "Architectural 3D", "Structural Detailing", "Rendering", "Quantity Takeoffs"],
            level: "Beginner to Advanced",
            duration: "3–4 Months",
            eligibility: "Civil / Architecture Diploma, ITI Drafters, B.Tech, Design Students",
            careerAreas: "BIM Modeler, Revit Architectural Drafter, BIM Coordinator, 3D Building Visualizer",
            details: "Master parametric building information modeling (BIM) workflows: intelligent walls, curtain systems, structural framing, MEP coordination, component schedules, and realistic renderings.",
            features: ["Revit Parametric Modeling Fundamentals", "Architectural Floor Plans, Elevations & Sections", "Families Creation & Custom Component Design", "Automated Schedules & Material Quantity Takeoffs", "Enscape / V-Ray Photorealistic Rendering", "BIM Collaboration & Worksharing Standards"],
            certification: "Certified Revit Architecture & BIM Specialist"
        }
    ],

    // 7. FOREIGN LANGUAGES & TEST PREPARATION (Courses 17, 18, 19, 20, 21)
    languages: [
        {
            id: 17,
            name: "IELTS – English Proficiency Test Preparation",
            subgroup: "English Proficiency Tests",
            oneLiner: "Develop Listening, Reading, Writing and Speaking skills with structured IELTS preparation and mock practice.",
            icon: null,
            image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
            popular: true,
            skills: ["IELTS Academic", "IELTS General", "Listening", "Reading", "Writing", "Speaking", "Mock Tests"],
            level: "Structured Exam Preparation",
            duration: "1–3 Months",
            eligibility: "Students, Study-Abroad Aspirants, Work Visa Seekers",
            careerAreas: "Study Abroad (UK, Canada, Australia, US), Immigration, Global Careers",
            details: "Comprehensive preparation for both IELTS Academic & General tests covering all four modules: Listening, Reading, Writing (Task 1 & 2), and Speaking interview readiness.",
            features: ["Listening Section Strategies & Accent Training", "Skimming & Scanning Academic Reading Passages", "Task 1 (Reports/Letters) & Task 2 Essay Writing", "1-on-1 Interactive Speaking Mock Interviews", "Band Score Improvement Techniques", "Official Cambridge Mock Tests & Detailed Feedback"],
            certification: "IELTS Exam Readiness Certificate"
        },
        {
            id: 18,
            name: "PTE – Pearson Test of English",
            subgroup: "English Proficiency Tests",
            oneLiner: "Prepare for PTE Academic with focused practice in Speaking, Writing, Reading and Listening skills.",
            icon: null,
            image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
            popular: true,
            skills: ["PTE Academic", "Speaking", "Reading", "Writing", "Listening", "AI Scoring", "Mock Tests"],
            level: "Structured Exam Preparation",
            duration: "1–2 Months",
            eligibility: "Students, Working Professionals, Visa Aspirants",
            careerAreas: "International Higher Education, Overseas Work Permits, PR Applications",
            details: "Master the computer-delivered PTE Academic test with AI scoring algorithms, templates, oral fluency drills, and scored full-length mock tests.",
            features: ["Read Aloud, Repeat Sentence & Pronunciation", "Summarize Written Text & Structured Essays", "Re-order Paragraphs & Fill in the Blanks", "Write from Dictation & Listening Drills", "AI Scoring Strategies & Time Management", "Computer Lab Mock Exams with Analysis"],
            certification: "PTE Academic Prep Certificate"
        },
        {
            id: 19,
            name: "German Language",
            subgroup: "Foreign Languages",
            oneLiner: "Learn German from A1 to B2 with structured training in communication, grammar, vocabulary and practical language skills.",
            icon: null,
            image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=800&q=80',
            popular: true,
            skills: ["A1 Level", "A2 Level", "B1 Level", "B2 Level", "German Grammar", "Spoken German", "Goethe Prep"],
            level: "A1 to B2 (Common European Framework)",
            duration: "2–6 Months (Per Level / Package)",
            eligibility: "Students aiming for Germany, Job Seekers, Nurses & Engineers",
            careerAreas: "Higher Education in Germany, EU Work Opportunities, Translation, Bilingual Specialist",
            details: "Structured CEFR-aligned German language program from beginner A1 to advanced B2 with emphasis on everyday conversational fluency, German grammar, and Goethe-Zertifikat exam prep.",
            features: ["A1 Beginner (Basic Sentences, Self-Intro, Daily Routines)", "A2 Elementary (Social Conversations, Work Situations)", "B1 Intermediate (Independent Communication, Job Interviews)", "B2 Upper-Intermediate (Fluent Workplace & Academic German)", "Goethe & Telc Examination Preparation", "Interactive Speaking Practice & Audio Sessions"],
            certification: "German Language CEFR Certificate (A1–B2)"
        },
        {
            id: 20,
            name: "French Language",
            subgroup: "Foreign Languages",
            oneLiner: "Develop French language skills from A1 to B2 through practical speaking, listening, reading and writing practice.",
            icon: null,
            image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
            popular: true,
            skills: ["A1 Level", "A2 Level", "B1 Level", "B2 Level", "DELF Prep", "French Phonetics", "Conversation"],
            level: "A1 to B2 (CEFR Aligned)",
            duration: "2–6 Months (Per Level / Package)",
            eligibility: "Canada Immigration (TEF/TCF), European Studies, Enthusiasts",
            careerAreas: "Canada PR Aspirants (Express Entry), International Diplomacy, Hospitality, MNC Careers",
            details: "Learn the language of international culture, business, and diplomacy. Complete training covering DELF exam formats, French phonetics, sentence structuring, and fluent conversations.",
            features: ["A1-A2 Foundational French Grammar & Phonetics", "B1-B2 Professional French for Corporate & Diplomatic Use", "Listening Comprehension with Native Audio Clips", "French Writing, Essay Formats & Email Drafting", "DELF / TEF / TCF Canada Exam Orientation", "Cultural Insights & Interactive Role-Plays"],
            certification: "French Language CEFR Certificate (A1–B2)"
        },
        {
            id: 21,
            name: "Japanese Language",
            subgroup: "Foreign Languages",
            oneLiner: "Learn Japanese from N5 to N2 with structured training in communication, grammar, vocabulary, Kanji and practical Japanese.",
            icon: null,
            image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
            popular: true,
            skills: ["N5 Level", "N4 Level", "N3 Level", "N2 Level", "Hiragana", "Katakana", "Kanji", "JLPT Prep"],
            level: "N5 to N2 (JLPT Aligned)",
            duration: "3–6 Months (Per Level)",
            eligibility: "IT Professionals, Japan Career Aspirants, Manga & Anime Enthusiasts",
            careerAreas: "IT Careers in Tokyo, Japanese MNCs, Technical Translation, Bilingual Coordinator",
            details: "Master Japanese script (Hiragana, Katakana, Kanji), grammar particles, polite corporate speech (Keigo), and preparation for the worldwide JLPT (Japanese Language Proficiency Test).",
            features: ["Hiragana & Katakana Script Mastery", "Essential Kanji Characters & Vocabulary Stacks", "Japanese Sentence Construction & Particles", "JLPT Exam Preparation (N5, N4, N3, N2 Levels)", "Conversational Practice for Japan Work Visas", "Japanese Business Etiquette & Culture"],
            certification: "Japanese Language JLPT Prep Certificate (N5–N2)"
        },
        {
            id: 110,
            name: "Spanish Language (DELE A1–B2)",
            subgroup: "Foreign Languages",
            oneLiner: "Learn conversational and professional Spanish from A1 to B2 aligned with official Instituto Cervantes DELE standards.",
            icon: null,
            image: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=800&q=80",
            popular: true,
            skills: ["Spanish A1", "Spanish A2", "Spanish B1", "DELE Prep", "Spoken Spanish", "Grammar", "Phonetics"],
            level: "A1 to B2 (CEFR Aligned)",
            duration: "3–6 Months",
            eligibility: "Open to All Students, Travel Enthusiasts, Latin America Career Seekers",
            careerAreas: "International Trade, Bilingual Customer Support, Translation, Tourism & Hospitality",
            details: "Comprehensive Spanish training covering Spanish phonetics, verb conjugations (present, past, subjunctive), conversational vocabulary, and official DELE exam preparation.",
            features: ["A1-A2 Everyday Conversational Spanish", "B1-B2 Business & Academic Spanish Fluency", "Listening Comprehension with Native Podcasts", "Spanish Writing & Corporate Email Drafting", "DELE Exam Strategy & Mock Tests", "Cultural Immersion & Interactive Role-Plays"],
            certification: "Spanish Language CEFR Certificate (A1–B2)"
        }
    ],

    // 8. SHORT-TERM & PROFESSIONAL SKILLS (Course 22 & Targeted Rapid Tracks)
    shortterm: [
        {
            id: 22,
            name: "Short-Term & Professional Skills",
            subgroup: "Professional Upskilling Bootcamp",
            oneLiner: "Upgrade your career with focused short-term training in digital, office, communication, AI and professional skills.",
            icon: null,
            image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
            popular: true,
            skills: ["Quick Skills", "Career Skills", "Professional Upskilling", "Interview Prep", "AI Productivity", "Communication"],
            level: "All Levels (Rapid Bootcamps)",
            duration: "2–4 Weeks",
            eligibility: "Job Seekers, College Students, Working Professionals, Career Starters",
            careerAreas: "Immediate Job Readiness, Career Transition, Enhanced Workplace Productivity",
            details: "Accelerated skill development bootcamps designed for job seekers, working professionals, and students needing rapid career upskilling.",
            features: ["Quick Practical Technical Skills", "Interview & CV Preparation", "Corporate Workplace Communication", "Digital Productivity Tools", "Professional Upskilling Certifications"],
            certification: "Professional Skill Certificate"
        },
        {
            id: 23,
            name: "AI Productivity & Office Automation Bootcamp",
            subgroup: "AI Workplace Tools",
            oneLiner: "Master ChatGPT, Copilot, prompt frameworks, and smart automation to speed up daily office and business workflows.",
            icon: null,
            image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
            popular: true,
            skills: ["ChatGPT", "MS Copilot", "Prompting", "Workflow Automation", "Canva AI", "Excel AI"],
            level: "Beginner to Intermediate",
            duration: "2–4 Weeks",
            eligibility: "Students, Working Professionals, Business Owners, Freelancers",
            careerAreas: "AI-Powered Workplace Efficiency, Smart Automation, Modern Executive Assistant",
            details: "Supercharge your productivity with practical hands-on generative AI tools, prompt engineering templates, and automated workflows for everyday office tasks.",
            features: ["ChatGPT & Copilot for Business Documents", "Data Analysis & Presentation Automation", "AI Email Drafting & Minutes of Meeting", "Custom AI Prompts for Faster Workflows", "AI Image & Graphic Generation Tools"],
            certification: "Certified AI Workplace Productivity Specialist"
        },
        {
            id: 24,
            name: "Executive Communication & Interview Mastery",
            subgroup: "Career Acceleration",
            oneLiner: "Sharpen corporate communication, dynamic public speaking, resume optimization, and high-impact interview skills.",
            icon: null,
            image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
            popular: true,
            skills: ["Corporate Communication", "Interview Mastery", "Resume ATS", "Public Speaking", "Email Etiquette"],
            level: "All Levels",
            duration: "2–3 Weeks",
            eligibility: "Fresh Graduates, Job Aspirants, Corporate Employees, Team Leads",
            careerAreas: "MNC Placement Readiness, Leadership Presence, Confident Professional Communication",
            details: "Intensive career preparation bootcamp featuring mock interviews, personalized body language coaching, ATS resume building, and corporate verbal fluency.",
            features: ["1-on-1 Mock Interviews & Feedback", "ATS-Friendly Resume & LinkedIn Optimization", "Corporate Email & Meeting Etiquette", "Public Speaking & Presentation Skills", "Salary Negotiation & Offer Evaluation"],
            certification: "Certified Professional Communication & Interview Specialist"
        },
        {
            id: 111,
            name: "Agile Scrum Master & Product Management Sprint",
            subgroup: "Agile Leadership & Tech Management",
            oneLiner: "Learn Scrum frameworks, agile sprint ceremonies, user story mapping, JIRA backlog management, and PSM I exam preparation.",
            icon: null,
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
            popular: true,
            skills: ["Scrum Master", "Agile Methodology", "JIRA", "Sprint Planning", "Product Backlog", "Kanban", "User Stories"],
            level: "All Levels (Professional Bootcamp)",
            duration: "3–4 Weeks",
            eligibility: "Software Engineers, Team Leads, QA Engineers, Aspiring Scrum Masters",
            careerAreas: "Scrum Master, Agile Project Manager, Product Owner Associate, Agile Coach",
            details: "Intensive career-ready certification training in Scrum theory, daily standups, sprint reviews, retrospectives, story point estimation, and real enterprise JIRA project simulations.",
            features: ["Scrum Artifacts & Ceremonies in Practice", "JIRA & Confluence Agile Project Management", "User Story Mapping & Acceptance Criteria", "Sprint Velocity & Burndown Chart Tracking", "PSM I & CSM Certification Exam Prep", "Real Agile Team Role-Playing Simulations"],
            certification: "Certified Agile & Scrum Master Practitioner"
        }
    ]
};

// Helper to get all default courses in a flat list formatted with categoryId and categoryName
export const getAllDefaultCoursesFlat = () => {
    const list = [];
    for (const [catKey, courses] of Object.entries(defaultCategoryCourses)) {
        const catInfo = defaultCategories.find(c => c.id === catKey || c.categoryId === catKey);
        if (Array.isArray(courses)) {
            courses.forEach(course => {
                list.push({
                    ...course,
                    categoryId: catKey,
                    categoryName: catInfo ? catInfo.label : catKey
                });
            });
        }
    }
    return list;
};

// Storage keys
export const STORAGE_KEY_CUSTOM_COURSES = 'aayush_custom_courses';
export const STORAGE_KEY_DELETED_COURSE_IDS = 'aayush_deleted_course_ids';

// Get deleted course IDs from localStorage
export const getDeletedCourseIds = () => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY_DELETED_COURSE_IDS);
        return raw ? JSON.parse(raw).map(id => String(id)) : [];
    } catch {
        return [];
    }
};

// Record a deleted course ID
export const addDeletedCourseId = (id) => {
    if (!id && id !== 0) return;
    try {
        const existing = getDeletedCourseIds();
        const strId = String(id);
        if (!existing.includes(strId)) {
            existing.push(strId);
            localStorage.setItem(STORAGE_KEY_DELETED_COURSE_IDS, JSON.stringify(existing));
        }
    } catch (e) {
        console.warn('Failed to save deleted course ID:', e);
    }
};

// Clear all deleted course IDs (for restore/sync)
export const clearDeletedCourseIds = () => {
    try {
        localStorage.removeItem(STORAGE_KEY_DELETED_COURSE_IDS);
    } catch {}
};

// Helper to get formatted default categories with both id and categoryId
export const getAllDefaultCategories = () => {
    return defaultCategories.map(c => ({
        ...c,
        id: c.id,
        categoryId: c.categoryId || c.id
    }));
};

