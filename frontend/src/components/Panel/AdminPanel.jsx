import React, { useState, useEffect } from "react";
import {
  Settings,
  Home,
  Users,
  BookOpen,
  Building2,
  Phone,
  Calendar,
  Trophy,
  Save,
  Plus,
  Trash2,
  FileText,
  Clock,
  FolderOpen,
  Folder,
  GripVertical,
  GraduationCap,
  Info, LogOut
} from "lucide-react";


import { useNavigate } from "react-router-dom";
import axios from "axios";
import AddNewBlog from "../Pages/AddNewBlog";
import NewsArticlesManagement from "../Pages/NewsArticlesManagement";
import Institute from "../../../../Backend/models/Institute";
import NewsAdminPage from "../Pages/NewsAdminPage";
import {
  PencilSquareIcon,
  TrashIcon,
  EyeIcon,
  EyeSlashIcon,
  ClipboardIcon,
} from "@heroicons/react/24/solid";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Testimonial from "../Pages/Testimonial";
import FooterAdmin from "../Pages/FooterAdmin";
import CorporateTrainingProgramTable from "../Pages/CoorporateAdmin";
//import XLSX from "xlsx";
import RegistrationsAdminPanel from "../Pages/RegistrationAdmin";

const BASE_URL = import.meta.env.REACT_APP_BASE_URL || "http://localhost:4001";

const AdminPanel = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem("adminToken");

    // Redirect to login page
    navigate("/login");
  };
  // Subscribers State
  const [subscribers, setSubscribers] = useState([]);
  const [editingSubscriber, setEditingSubscriber] = useState(null);
  const [subscriberData, setSubscriberData] = useState({
    whatsapp: "",
    email: "",
  });
  const [showSubscriberForm, setShowSubscriberForm] = useState(false);

  // Fetch subscribers on mount
  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      console.log("Fetching subscribers...");
      const res = await axios.get("api/subscribers");
      console.log("Data received:", res.data);
      setSubscribers(res.data);
    } catch (err) {
      console.error("Error fetching subscribers:", err);
    }
  };

  // Delete subscriber
  const deleteSubscriber = async (id) => {
    try {
      await axios.delete(`api/subscribers/${id}`);
      setSubscribers(subscribers.filter((s) => s._id !== id));
    } catch (err) {
      console.error("Error deleting subscriber:", err);
    }
  };

  // Copy to clipboard
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert(`Copied: ${text}`);
  };

  // Open edit form
  const openSubscriberEditForm = (subscriber) => {
    setEditingSubscriber(subscriber);
    setSubscriberData({
      whatsapp: subscriber.whatsapp,
      email: subscriber.email,
    });
    setShowSubscriberForm(true);
  };

  // Handle input change
  const handleSubscriberChange = (e) => {
    const { name, value } = e.target;
    setSubscriberData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Cancel form
  const handleSubscriberCancel = () => {
    setShowSubscriberForm(false);
    setEditingSubscriber(null);
    setSubscriberData({ whatsapp: "", email: "" });
  };

  // Submit form
  const handleSubscriberSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingSubscriber) {
        // Update subscriber
        await axios.put(
          `api/subscribers/${editingSubscriber._id}`,
          subscriberData
        );
        setSubscribers((prev) =>
          prev.map((s) =>
            s._id === editingSubscriber._id ? { ...s, ...subscriberData } : s
          )
        );
      } else {
        // Add new subscriber
        const res = await axios.post("api/subscribers", subscriberData);
        setSubscribers((prev) => [...prev, res.data]);
      }
      // Reset form
      handleSubscriberCancel();
    } catch (err) {
      console.error("Error saving subscriber:", err);
    }
  };

  // ✅ Export subscribers to Excel
  const exportToExcel = () => {
    if (subscribers.length === 0) {
      alert("No subscribers to export.");
      return;
    }

    // Format data
    const formattedData = subscribers.map((s, index) => ({
      "S.No": index + 1,
      WhatsApp: s.whatsapp,
      Email: s.email,
      "Subscribed At": new Date(s.createdAt).toLocaleString(),
    }));

    // Create worksheet
    const worksheet = XLSX.utils.json_to_sheet(formattedData);

    // ✅ Set column widths
    worksheet["!cols"] = [
      { wch: 6 }, // S.No
      { wch: 20 }, // WhatsApp
      { wch: 30 }, // Email
      { wch: 25 }, // Subscribed At
    ];

    // Create workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Subscribers");

    // Save as Excel
    XLSX.writeFile(workbook, "subscribers.xlsx");
  };

  //news and upadtes info fetch

  const [news, setNews] = useState([]);
  const [showEditBlog, setShowEditBlog] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);
  const handlenewsEdit = (id) => {
    const entryToEdit = news.find((n) => n._id === id); // find the clicked entry
    setEditingEntry(entryToEdit); // set entry to state
    setShowEditBlog(true); // show the form
  };
  const handleEditBlogSubmit = async (updatedEntry) => {
    try {
      // 🔹 Update the entry in backend
      await axios.put(`/api/news/${updatedEntry._id}`, updatedEntry);

      // 🔹 Update the entry in state
      setNews((prevNews) =>
        prevNews.map((n) => (n._id === updatedEntry._id ? updatedEntry : n))
      );

      // 🔹 Close the edit form
      setShowEditBlog(false);
      setEditingEntry(null);
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("/api/news"); // Backend API endpoint
        setNews(response.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  //logo preview institue information
  const [instituteName, setInstituteName] = useState("");
  const [aboutInstitute, setAboutInstitute] = useState("");
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState("");
  const [isInstituteEditing, setIsInstituteEditing] = useState(false);

  // Fetch existing institute information on mount

  const fetchInstitute = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/institute/`);
      console.log("Fetched institute data adminpanel.jsx:", res.data);

      if (res.data) {
        // If API returns single object
        const institute = Array.isArray(res.data) ? res.data[0] : res.data;

        setInstituteName(institute.name || "");
        setAboutInstitute(institute.about || "");
        if (institute.logo) {
          setLogoPreview(`${BASE_URL}/Uploads/${institute.logo}`);
        }

        setIsInstituteEditing(true);
      } else {
        setIsInstituteEditing(false);
      }
    } catch (err) {
      console.error("Error fetching institute info:", err);
    }
  };
  useEffect(() => {
    fetchInstitute();
  }, []);

  // Handle add/update institute info
  const handleInstituteInfo = async () => {
    try {
      const formData = new FormData();
      formData.append("name", instituteName);
      formData.append("about", aboutInstitute);
      if (logoFile) formData.append("logo", logoFile);

      let res;
      if (isInstituteEditing) {
        res = await axios.put(
          `${BASE_URL}/api/institute/`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        alert("Institute info updated successfully!");
      } else {
        res = await axios.post(
          `${BASE_URL}/api/institute/`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        alert("Institute info added successfully!");
        setIsInstituteEditing(true);
      }

      // Sync state with DB after save
      if (res.data) {
        setInstituteName(res.data.name || "");
        setAboutInstitute(res.data.about || "");
        setLogoPreview(res.data.logo || "");
      }
      // Re-fetch updated data
      fetchInstitute();
    } catch (err) {
      console.error("Error saving institute info:", err);
    }
  };

  //slider or carousal data
  const [carouselItems, setCarouselItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [formData, setFormData] = useState({
    id: null,
    imagename: "",
    title: "",
    description: "",
    visible: true,
  });
  const [selectedFile, setSelectedFile] = useState(null);
  // Fetch carousel items from backend and assign to state carouselData
  useEffect(() => {
    const fetchCarousel = () => {
      axios
        .get(`${BASE_URL}/api/carousel`)
        .then((res) => setCarouselItems(res.data))
        .catch((err) => console.error("Error fetching carousel:", err));
    };

    fetchCarousel(); // initial fetch
    //polling not required
    //const interval = setInterval(fetchCarousel, 5000); // fetch every 2 sec see up changes  without reloading.
    //return () => clearInterval(interval); // cleanup
  }, []);

  // Open Add Form
  const openAddForm = () => {
    setIsEditing(false);
    setFormData({
      id: null,
      imagename: "",
      title: "",
      description: "",
      visible: true,
    });
    setPreviewUrl(null);
    setShowForm(true);
  };

  // Open Edit Form
  const openEditForm = (item) => {
    setIsEditing(true);
    setFormData({ ...item, id: item._id });
    setPreviewUrl(null);
    setShowForm(true);
  };

  // Cancel Form
  const handleCancel = () => {
    setShowForm(false);
    setIsEditing(false);
    setFormData({
      id: null,
      imagename: "",
      title: "",
      description: "",
      visible: true,
    });
    setPreviewUrl(null);
  };

  // Handle Add or Save
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || (!selectedFile && !isEditing)) {
      alert("Please upload an image and add a title.");
      return;
    }

    const data = new FormData();
    if (selectedFile) {
      data.append("image", selectedFile); // ✅ use state instead of DOM query
    }
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("visible", formData.visible);

    try {
      let res;
      if (isEditing) {
        res = await axios.put(
          `${BASE_URL}/api/carousel/${formData.id}`,
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        setCarouselItems(
          carouselItems.map((item) =>
            item._id === formData.id ? res.data : item
          )
        );
        // ✅ update state with latest data from backend
        setCarouselItems((prevItems) =>
          prevItems.map((item) => (item._id === formData.id ? res.data : item))
        );
      } else {
        res = await axios.post(`${BASE_URL}/api/carousel`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setCarouselItems([...carouselItems, res.data]);
      }

      handleCancel();
    } catch (err) {
      console.error(err);
      alert("Error saving item. Check console for details.");
    }
  };

  // Delete item
  const handlecarouselDelete = async (id) => {
    const res = await axios.delete(`${BASE_URL}/api/carousel/${id}`);
    console.log("Delete Button response:", res.data); // just check delete button response
    setCarouselItems(carouselItems.filter((item) => item._id !== id)); // Functional update ensures latest state is used
  };

  // Toggle visibility
  const toggleVisibility = async (id) => {
    try {
      const res = await axios.patch(
        `${BASE_URL}/api/carousel/${id}/toggle`
      );
      setCarouselItems((prevItems) =>
        prevItems.map((item) => (item._id === id ? res.data : item))
      );
    } catch (err) {
      console.error("Error toggling visibility:", err);
    }
  };

  //About Section of Home Page
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [statistics, setStatistics] = useState([]);

  // ✅ Fetch data on load

  const fetchAbout = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/about`);
      console.log("Fetched about data adminpanel.jsx:", res.data);
      if (res.data) {
        setHeading(res.data.heading || "");
        setDescription(res.data.description || "");
        setStatistics(res.data.statistics || []);
      }
    } catch (err) {
      console.error("Error fetching about data:", err);
    }
  };
  useEffect(() => {
    fetchAbout();
  }, []);

  // ✅ Handle stat change
  const handleStatChange = (index, field, value) => {
    const updatedStats = [...statistics];
    updatedStats[index][field] = value;
    setStatistics(updatedStats);
  };

  // ✅ Save handler
  const SendandSave = async () => {
    try {
      await axios.put("http://localhost:4001/api/about", {
        heading,
        description,
        statistics,
      });
      alert("Saved successfully!");
      fetchAbout(); // Refresh data from backend
    } catch (err) {
      console.error("Error saving:", err);
    }
  };

  //Action Tab
  const [activeTab, setActiveTab] = useState("institute");
  // Institute Information
  // const [instituteName, setInstituteName] = useState('Give Institute Name Here'); // Removed duplicate
  // const [aboutInstitute, setAboutInstitute] = useState('Explain about institute here...'); // Removed duplicate

  // Statistics
  const [stats, setStats] = useState([
    { value: "10,000+", label: "Students Enrolled" },
    { value: "100+", label: "Qualified Teachers" },
    { value: "95%", label: "Success Rate" },
    { value: "22+", label: "Years of Excellence" },
  ]);

  // News & Events
  /*const [news, setNews] = useState([
    {
      id: 1,
      title: "Annual Science Fair 2025",
      date: "2025-03-15",
      summary: "Students showcase innovative projects in our biggest science fair yet.",
      image: "https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=1"
    },
    {
      id: 2,
      title: "New AI & Machine Learning Course Launch",
      date: "2025-02-20",
      summary: "Introducing cutting-edge AI curriculum designed for industry readiness.",
      image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=1"
    }
  ]);*/
  const [showAddNews, setShowAddNews] = useState(false);

  // ✅ Dummy data (for development if backend is down)
  const dummyData = [
    {
      _id: "1",
      newsTitle: "Admissions Open for 2025 Batch",
      newsImage:
        "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=1via.placeholder.com/150",
      newsLink: "https://example.com/admission",
      createdAt: new Date().toISOString(),
      videoTitle: "Campus Tour 2025",
      videoLink: "https://youtube.com/watch?v=xyz123",
    },
    {
      _id: "2",
      newsTitle: "Annual Tech Fest Announced",
      newsImage:
        "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=1.placeholder.com/150",
      newsLink: "https://example.com/techfest",
      createdAt: new Date().toISOString(),
      videoTitle: "Highlights from Tech Fest",
      videoLink: "https://youtube.com/watch?v=abc456",
    },
  ];

  // Contact Information
  const [contactInfo, setContactInfo] = useState({
    address: "123 Education Street, Knowledge City, KC 12345",
    phone: "+91 9876543210",
    email: "info@excellencecoaching.com",
    socialMedia: {
      facebook: "https://facebook.com/excellencecoaching",
      instagram: "https://instagram.com/excellencecoaching",
      linkedin: "https://linkedin.com/company/excellencecoaching",
      youtube: "https://youtube.com/@excellencecoaching",
    },
  });

  // Corporate Training
  const [corporateTraining, setCorporateTraining] = useState([
    {
      id: 1,
      title: "Office Productivity & Business Automation",
      description:
        "Boost your team's efficiency through essential digital office tools.",
      courses: [
        "MS Office Mastery (Basic to Advanced)",
        "Advanced Excel & Dashboard Reporting",
        "Digital Office Administration Tools (Google Workspace / MS365)",
        "Tally Prime with GST for Business Accounting",
        "CRM Training (Zoho, Salesforce Basics)",
      ],
    },
    {
      id: 2,
      title: "Graphic Design, UI/UX & Creative Tools",
      description:
        "Design-focused training for branding, web, and user experience.",
      courses: [
        "Professional Graphic Designing (Photoshop, Illustrator, CorelDRAW)",
        "UI/UX Design & Prototyping (Figma, Adobe XD)",
        "Video Editing & Motion Graphics (Premiere Pro, After Effects)",
        "AutoCAD & Industrial Design Fundamentals",
      ],
    },
    {
      id: 3,
      title: "Web & App Development Programs",
      description:
        "Develop complete websites and mobile applications from scratch.",
      courses: [
        "Full Stack Web Development (MERN / Django Stack)",
        "Front-End Development (HTML, CSS, JavaScript, React)",
        "WordPress Development for Business Sites",
        "Mobile App UI Design with Figma + Flutter",
        "Android App Development (Using Java)",
      ],
    },
  ]);
  // Add new training program
  const addProgram = () => {
    const newProgram = {
      id: Date.now(),
      title: "",
      description: "",
      courses: [],
    };
    setCorporateTraining([...corporateTraining, newProgram]);
  };

  // Remove training program
  const removeProgram = (id) => {
    setCorporateTraining(
      corporateTraining.filter((program) => program.id !== id)
    );
  };

  // Add course to specific program
  const addCourse = (programId) => {
    const updated = corporateTraining.map((program) =>
      program.id === programId
        ? { ...program, courses: [...program.courses, ""] }
        : program
    );
    setCorporateTraining(updated);
  };

  // Update course text
  const updateCourse = (programId, index, value) => {
    const updated = corporateTraining.map((program) =>
      program.id === programId
        ? {
            ...program,
            courses: program.courses.map((course, i) =>
              i === index ? value : course
            ),
          }
        : program
    );
    setCorporateTraining(updated);
  };

  // Remove specific course
  const removeCourse = (programId, index) => {
    const updated = corporateTraining.map((program) =>
      program.id === programId
        ? {
            ...program,
            courses: program.courses.filter((_, i) => i !== index),
          }
        : program
    );
    setCorporateTraining(updated);
  };

  // Courses
  const [courseSections, setCourseSections] = useState([
    {
      id: 1,
      category: "Professional Courses",
      subcategories: [
        {
          id: 1,
          title: "Term Certificate Courses",
          duration: "1–2 Months",
          items: [
            {
              name: "MS Office Basics",
              description:
                "Covers Word, Excel, and PowerPoint fundamentals for everyday office tasks.",
            },
            {
              name: "Tally Prime Basics",
              description:
                "Introduces Tally Prime for basic accounting, billing, and inventory management.",
            },
            {
              name: "Typing & Data Entry",
              description:
                "Improves typing speed and accuracy for professional data entry tasks.",
            },
            {
              name: "Photoshop for Beginners",
              description:
                "Teaches basic photo editing, retouching, and design creation using Adobe Photoshop.",
            },
            {
              name: "Basic Video Editing",
              description:
                "Covers simple video cutting, transitions, and audio syncing using common tools.",
            },
            {
              name: "Social Media for Business",
              description:
                "Shows how to create, manage, and promote business pages on popular social platforms.",
            },
            {
              name: "HTML & CSS Basics",
              description:
                "Introduces basic web structure and styling concepts to create simple websites.",
            },
            {
              name: "Soft Skills & Interview Preparation",
              description:
                "Focuses on communication, teamwork, and techniques for job interview success.",
            },
          ],
        },
        {
          id: 2,
          title: "Certificate Courses",
          duration: "6 Months",
          items: [
            {
              name: "Advanced Office Management (with Tally)",
              description:
                "Combines MS Office, Tally Prime, and workflow management for office operations.",
            },
            {
              name: "Advanced Graphic Designing",
              description:
                "Covers advanced tools in Photoshop, Illustrator, and CorelDRAW for creative design.",
            },
            {
              name: "Advanced Tally & GST Accounting",
              description:
                "Focuses on taxation, GST filing, payroll, and advanced accounting reports in Tally.",
            },
            {
              name: "Web Designing Fundamentals",
              description:
                "Teaches HTML, CSS, basic JavaScript, and responsive design for beginner web developers.",
            },
            {
              name: "E-Commerce Website Management",
              description:
                "Covers creating and managing online stores, product listings, and order processing.",
            },
          ],
        },
      ],
    },
    {
      id: 2,
      category: "University Courses",
      subcategories: [
        {
          id: 1,
          title: "Distance Learning Courses",
          items: [
            {
              name: "BCA / MCA / BBA / MBA",
              description:
                "Undergraduate and postgraduate programs in computer applications, business administration, and management.",
            },
            {
              name: "BA / MA / B.Com / M.Com Etc",
              description:
                "Arts and commerce degrees available for distance learning to suit various career paths.",
            },
          ],
        },
        {
          id: 2,
          title: "Online Regular Courses",
          items: [
            {
              name: "Online B.A. / B.Com / BBA",
              description:
                "Fully online undergraduate programs with flexible schedules.",
            },
            {
              name: "Online Diploma in IT / HR / Marketing",
              description:
                "Specialized online diploma courses in technology, human resources, and marketing.",
            },
            {
              name: "Certificate Courses via LMS Access",
              description:
                "Short-term online certifications delivered via a Learning Management System.",
            },
          ],
        },
        {
          id: 3,
          title: "B.Voc Courses (NSQF-Aligned)",
          items: [
            {
              name: "Retail Management",
              description:
                "Covers store operations, sales strategies, and customer service.",
            },
            {
              name: "Hospitality & Hotel Management",
              description:
                "Prepares students for careers in hospitality, tourism, and hotel services.",
            },
            {
              name: "Beauty & Wellness",
              description:
                "Trains in cosmetology, skincare, and holistic wellness practices.",
            },
            {
              name: "Electrical / Technician Courses",
              description:
                "Practical training for electrical systems, maintenance, and safety.",
            },
            {
              name: "COPA (Computer Operator & Programming Assistant)",
              description:
                "Basic computer operation, programming fundamentals, and IT tools.",
            },
            {
              name: "Fashion Designing",
              description:
                "Covers clothing design, textile knowledge, and fashion trends.",
            },
            {
              name: "Mobile Repairing",
              description:
                "Hands-on training for diagnosing and repairing mobile devices.",
            },
          ],
        },
      ],
    },
  ]);

  // Add Category
  const addCategory = () => {
    setCourseSections((prev) => [
      ...prev,
      {
        id: Date.now(),
        category: "New Category",
        subcategories: [],
      },
    ]);
  };

  // Remove Category
  const removeCategory = (categoryId) => {
    setCourseSections((prev) =>
      prev.filter((section) => section.id !== categoryId)
    );
  };

  // Add Subcategory
  const addSubcategory = (categoryId) => {
    setCourseSections((prev) =>
      prev.map((section) =>
        section.id === categoryId
          ? {
              ...section,
              subcategories: [
                ...section.subcategories,
                {
                  id: Date.now(),
                  title: "New Subcategory",
                  duration: "",
                  items: [],
                },
              ],
            }
          : section
      )
    );
  };

  // Remove Subcategory
  const removeSubcategory = (categoryId, subcategoryId) => {
    setCourseSections((prev) =>
      prev.map((section) =>
        section.id === categoryId
          ? {
              ...section,
              subcategories: section.subcategories.filter(
                (sub) => sub.id !== subcategoryId
              ),
            }
          : section
      )
    );
  };

  // Add Item
  const addItem = (categoryId, subcategoryId) => {
    setCourseSections((prev) =>
      prev.map((section) =>
        section.id === categoryId
          ? {
              ...section,
              subcategories: section.subcategories.map((sub) =>
                sub.id === subcategoryId
                  ? {
                      ...sub,
                      items: [
                        ...sub.items,
                        { id: Date.now(), name: "New Item", description: "" },
                      ],
                    }
                  : sub
              ),
            }
          : section
      )
    );
  };

  // Remove Item
  const removeItem = (categoryId, subcategoryId, itemId) => {
    setCourseSections((prev) =>
      prev.map((section) =>
        section.id === categoryId
          ? {
              ...section,
              subcategories: section.subcategories.map((sub) =>
                sub.id === subcategoryId
                  ? {
                      ...sub,
                      items: sub.items.filter((item) => item.id !== itemId),
                    }
                  : sub
              ),
            }
          : section
      )
    );
  };

  // Update field
  const updateField = (categoryId, subcategoryId, itemId, field, value) => {
    setCourseSections((prev) =>
      prev.map((section) =>
        section.id === categoryId
          ? {
              ...section,
              subcategories: section.subcategories.map((sub) =>
                sub.id === subcategoryId
                  ? {
                      ...sub,
                      items: sub.items.map((item) =>
                        item.id === itemId ? { ...item, [field]: value } : item
                      ),
                    }
                  : sub
              ),
            }
          : section
      )
    );
  };

  const handleSave = () => {
    alert("Changes saved successfully!");
  };

  const addNews = () => {
    const newItem = {
      id: Date.now(),
      title: "New Event",
      date: new Date().toISOString().split("T")[0],
      summary: "Event description",
      image:
        "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=1",
    };
    setNews([...news, newItem]);
  };

  const removeNews = (id) => {
    setNews(news.filter((item) => item.id !== id));
  };

  const updateNews = (id, field, value) => {
    setNews(
      news.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const updateStat = (index, field, value) => {
    const newStats = [...stats];
    newStats[index] = { ...newStats[index], [field]: value };
    setStats(newStats);
  };

  const tabs = [
    { id: "institute", label: "Institute Info", icon: Building2 },
    { id: "home", label: "Home Page Slider", icon: Home },
    { id: "courses", label: "Courses", icon: GraduationCap },
    { id: "news", label: "News & Updates", icon: Calendar },
    { id: "corporate", label: "Corporate Training", icon: Users },
    { id: "registernow", label: "Registerations", icon: Users },
    { id: "contact", label: "Contact Info", icon: Phone },
    { id: "about", label: "about section", icon: Info },
    { id: "testimonial", label: "Testimonial", icon: Info },
    { id: "subscribe", label: "Subscribe", icon: Info },
    { id: "Footer", label: "Footer", icon: Info },
  ];

  const [entriesToShow, setEntriesToShow] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [blogEntries, setBlogEntries] = useState([]); // initially empty
  const [loading, setLoading] = useState(true);
  const [showAddBlog, setShowAddBlog] = useState(false);

  const fallbackImage =
    "https://media.istockphoto.com/id/1453843862/photo/business-meeting.jpg?s=612x612&w=0&k=20&c=4k9H7agmpn92B7bkUywvkK5Ckwm9Y8f8QrGs4DRDWpE=";

  // ✅ Fetch blogs from backend
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/blogs`);
        setBlogEntries(response.data); // backend should return array of blogs
      } catch (error) {
        console.error("Error fetching blogs:", error);
        alert("Failed to fetch blogs.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Pagination
  const totalPages = Math.ceil(blogEntries.length / entriesToShow);
  const indexOfLastEntry = currentPage * entriesToShow;
  const indexOfFirstEntry = indexOfLastEntry - entriesToShow;
  const currentEntries = blogEntries.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalEntries = blogEntries.length;

  // Handlers
  const handleDropdownChange = (e) => {
    setEntriesToShow(Number(e.target.value));
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEdit = (id) => {
    console.log(`Editing blog entry with ID: ${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`api/blogs/${id}`);
      setBlogEntries((prev) => prev.filter((entry) => entry._id !== id)); // backend uses _id
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("Failed to delete blog. Please try again.");
    }
  };
  const handlenewsDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this news item?"))
      return;

    try {
      // Call backend API to delete
      await axios.delete(`/api/news/${id}`);

      // Remove deleted item from state
      setNews((prevNews) => prevNews.filter((item) => item._id !== id));
      alert("News item deleted successfully!");
    } catch (error) {
      console.error("Error deleting news:", error);
      alert("Failed to delete news item");
    }
  };

  const handleAddBlog = () => {
    setShowAddBlog(true);
  };

  const handleNewBlogSubmit = (newBlog) => {
    setBlogEntries((prev) => [newBlog, ...prev]); // add on top
  };

  /* Only render if active tab is 'institute'
if (activeTab !== "institute") return null;*/

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-50">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left side */}
            <div className="flex items-center space-x-3">
              <Settings className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
            </div>

            {/* Right side */}
           <button
  onClick={handleLogout}
  className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
>
  <LogOut className="w-5 h-5" />
  <span>Logout</span>
</button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex space-x-8">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg font-medium transition-colors duration-200 ${
                      activeTab === tab.id
                        ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 w-full overflow-x-auto ">
            <div className="bg-white rounded-xl shadow-sm border-gray-200 border min-w-full">
              <div className="p-8 ">
                {/* Home Page Slider Tab*/}
                {activeTab === "home" && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">
                        Manage Slider Data
                      </h2>
                    </div>
                    <div className="space-y-6">
                      {/* Add Button */}
                      {!showForm && (
                        <button
                          onClick={openAddForm}
                          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                          + Add New Slider Data
                        </button>
                      )}

                      {/* Form (Add/Edit) */}
                      {showForm && (
                        <div className="bg-white shadow rounded-lg p-6 mb-8">
                          <h2 className="text-xl font-semibold mb-4">
                            {isEditing
                              ? "Edit Slider Data"
                              : "Add New Slider Data"}
                          </h2>
                          <form
                            onSubmit={handleSubmit}
                            className="grid grid-cols-1 md:grid-cols-2 gap-4"
                          >
                            {/* File Upload */}
                            <div className="col-span-1 md:col-span-2">
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Upload Image
                              </label>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  if (e.target.files.length > 0) {
                                    const file = e.target.files[0];
                                    setSelectedFile(file); // store file in state
                                    setFormData({
                                      ...formData,
                                      imagename: file.name, // only for showing file name in UI
                                    });
                                    setPreviewUrl(URL.createObjectURL(file));
                                  }
                                }}
                                className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                              />

                              {formData.imagename && (
                                <p className="mt-2 text-sm text-gray-600">
                                  Selected file:{" "}
                                  <span className="font-medium">
                                    {formData.imagename}
                                  </span>
                                </p>
                              )}
                              {previewUrl && (
                                <img
                                  src={previewUrl}
                                  alt="Preview"
                                  className="mt-2 w-40 h-24 object-cover rounded border"
                                />
                              )}
                            </div>

                            <input
                              type="text"
                              placeholder="Image Caption or Title"
                              value={formData.title}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  title: e.target.value,
                                })
                              }
                              className="border p-2 rounded w-full"
                            />
                            <textarea
                              placeholder="Description"
                              value={formData.description}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  description: e.target.value,
                                })
                              }
                              className="border p-2 rounded w-full col-span-1 md:col-span-2"
                            />
                            <div className="col-span-1 md:col-span-2 flex gap-4">
                              <button
                                type="submit"
                                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                              >
                                {isEditing ? "Save Changes" : "Save Item"}
                              </button>
                              <button
                                type="button"
                                onClick={handleCancel}
                                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                              >
                                Cancel
                              </button>
                            </div>
                          </form>
                        </div>
                      )}

                      {/* Table */}
                      <h2 className="text-2xl font-semibold mb-4">
                        Slider Items
                      </h2>
                      {carouselItems.length === 0 ? (
                        <p className="text-gray-600">
                          No items found. Add some sliders above.
                        </p>
                      ) : (
                        <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-100">
                              <tr className="bg-gray-200 text-left text-sm uppercase tracking-wider">
                                <th className="p-3">Image </th>
                                <th className="p-3">Image Caption</th>
                                <th className="p-3">Description</th>
                                <th className="p-3">Visiblility</th>
                                <th className="p-3">Managae</th>
                              </tr>
                            </thead>
                            <tbody>
                              {carouselItems.map((item) => (
                                <tr key={item._id} className="">
                                  {/*{item.imagename}</td> same as DB Schema i.e "itemname"*/}
                                  <td className="p-3">
                                    {item.imagename ? (
                                      <img
                                        src={`${BASE_URL}/Uploads/${item.imagename}`}
                                        alt={item.title}
                                        className="w-20 h-12 object-cover rounded border"
                                      />
                                    ) : (
                                      <span className="text-gray-500 italic">
                                        No image
                                      </span>
                                    )}
                                  </td>
                                  <td className="p-3">{item.title}</td>
                                  <td className="p-3">{item.description}</td>
                                  <td className="p-3">
                                    <button
                                      onClick={() => toggleVisibility(item._id)}
                                      className={`flex items-center justify-center mx-auto px-4 py-1.5 rounded-full text-white text-xs font-semibold transition-colors duration-300 shadow-sm
                              ${
                                item.visible
                                  ? "bg-green-500 hover:bg-green-600"
                                  : "bg-gray-400 hover:bg-gray-500"
                              }
                            `}
                                    >
                                      {item.visible ? (
                                        <>
                                          <EyeIcon className="h-4 w-4 mr-1" />{" "}
                                          On
                                        </>
                                      ) : (
                                        <>
                                          <EyeSlashIcon className="h-4 w-4 mr-1" />{" "}
                                          Off
                                        </>
                                      )}
                                    </button>
                                  </td>
                                  <td className="flex p-3 space-x-2">
                                    <button
                                      onClick={() => openEditForm(item)}
                                      className="p-2 rounded-full bg-green-100 hover:bg-green-200 text-green-600 hover:text-green-800 transition transform hover:scale-110"
                                    >
                                      <PencilSquareIcon className="h-4 w-4 mr-1" />
                                    </button>
                                    <button
                                      onClick={() =>
                                        handlecarouselDelete(item._id)
                                      }
                                      className="p-2 rounded-full bg-red-100 hover:bg-red-200 text-red-600 hover:text-red-800 transition transform hover:scale-110"
                                    >
                                      <TrashIcon className="h-4 w-4 mr-1" />
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                {/* Institute Info Tab */}
                {activeTab === "institute" && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">
                        Institute Information
                      </h2>

                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Institute Name
                          </label>
                          <input
                            type="text"
                            value={instituteName}
                            onChange={(e) => setInstituteName(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            About the Institute
                          </label>
                          <textarea
                            value={aboutInstitute}
                            onChange={(e) => setAboutInstitute(e.target.value)}
                            rows={4}
                            className="w-1/2 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Logo
                          </label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              if (e.target.files.length > 0) {
                                const file = e.target.files[0];
                                setLogoFile(file); // store file in state
                                setLogoPreview(URL.createObjectURL(file));
                              }
                            }}
                            className="block w-auto bg-blue-600 text-bg-blue-600 text-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                          />
                          {/* Show preview if available */}
                          {logoPreview && (
                            <div className="mt-3">
                              <img
                                src={logoPreview}
                                alt="Logo Preview"
                                className="h-24 w-24 object-cover rounded-md border"
                              />
                            </div>
                          )}
                        </div>
                        {/* Add / Update Button */}
                        <button
                          onClick={handleInstituteInfo}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                        >
                          {isInstituteEditing
                            ? "Save Updated Info"
                            : "Add Info"}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Statistics Tab */}
                {activeTab === "stats" && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                      Statistics
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {stats.map((stat, index) => (
                        <div
                          key={index}
                          className="p-6 border border-gray-200 rounded-lg"
                        >
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Value
                              </label>
                              <input
                                type="text"
                                value={stat.value}
                                onChange={(e) =>
                                  updateStat(index, "value", e.target.value)
                                }
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Label
                              </label>
                              <input
                                type="text"
                                value={stat.label}
                                onChange={(e) =>
                                  updateStat(index, "label", e.target.value)
                                }
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* News & Updates Tab */}
                {activeTab === "news" && <NewsArticlesManagement />}

                {/* Contact Info Tab */}
                {activeTab === "contact" && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                      Contact Information
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-900">
                          Basic Information
                        </h3>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Address
                          </label>
                          <textarea
                            value={contactInfo.address}
                            onChange={(e) =>
                              setContactInfo({
                                ...contactInfo,
                                address: e.target.value,
                              })
                            }
                            rows={3}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone
                          </label>
                          <input
                            type="tel"
                            value={contactInfo.phone}
                            onChange={(e) =>
                              setContactInfo({
                                ...contactInfo,
                                phone: e.target.value,
                              })
                            }
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email
                          </label>
                          <input
                            type="email"
                            value={contactInfo.email}
                            onChange={(e) =>
                              setContactInfo({
                                ...contactInfo,
                                email: e.target.value,
                              })
                            }
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>

                      <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-900">
                          Social Media
                        </h3>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Facebook
                          </label>
                          <input
                            type="url"
                            value={contactInfo.socialMedia.facebook}
                            onChange={(e) =>
                              setContactInfo({
                                ...contactInfo,
                                socialMedia: {
                                  ...contactInfo.socialMedia,
                                  facebook: e.target.value,
                                },
                              })
                            }
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Instagram
                          </label>
                          <input
                            type="url"
                            value={contactInfo.socialMedia.instagram}
                            onChange={(e) =>
                              setContactInfo({
                                ...contactInfo,
                                socialMedia: {
                                  ...contactInfo.socialMedia,
                                  instagram: e.target.value,
                                },
                              })
                            }
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            LinkedIn
                          </label>
                          <input
                            type="url"
                            value={contactInfo.socialMedia.linkedin}
                            onChange={(e) =>
                              setContactInfo({
                                ...contactInfo,
                                socialMedia: {
                                  ...contactInfo.socialMedia,
                                  linkedin: e.target.value,
                                },
                              })
                            }
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            YouTube
                          </label>
                          <input
                            type="url"
                            value={contactInfo.socialMedia.youtube}
                            onChange={(e) =>
                              setContactInfo({
                                ...contactInfo,
                                socialMedia: {
                                  ...contactInfo.socialMedia,
                                  youtube: e.target.value,
                                },
                              })
                            }
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Corporate Training Tab */}
                {activeTab === "corporate" && (
                 <CorporateTrainingProgramTable />

                )}

                {/* Courses Tab */}
                {activeTab === "courses" && <NewsAdminPage />}

{/* Corporate Training Tab */}
                {activeTab === "registernow" && (
                 < RegistrationsAdminPanel/>

                )}

                {/* About Section Tab */}
                {activeTab === "about" && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                      Edit About Section
                    </h2>

                    {/* Title */}
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">
                        Section Title
                      </label>
                      <input
                        className="border rounded-lg p-2 w-full"
                        value={heading}
                        onChange={(e) => setHeading(e.target.value)}
                        placeholder="Enter section title"
                      />
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">
                        Description
                      </label>
                      <textarea
                        className="border rounded-lg p-2 w-full"
                        rows="4"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter description"
                      />
                    </div>

                  

                    {/* Statistics Section */}

                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Statistics
                      </h3>

                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                          <tr className="bg-gray-200">
                            <th className="border border-gray-300 p-2 text-left">
                              #
                            </th>
                            <th className="border border-gray-300 p-2 text-left">
                              Icon
                            </th>
                            <th className="border border-gray-300 p-2 text-left">
                              Number
                            </th>
                            <th className="border border-gray-300 p-2 text-left">
                              Label
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {statistics.map((stat, index) => (
                            <tr key={index}>
                              <td className="border border-gray-300 p-2 font-bold">
                                {index + 1}
                              </td>
                              <td className="border border-gray-300 p-2">
                                <input
                                  className="border rounded-lg p-2 w-full"
                                  value={stat.icon}
                                  onChange={(e) =>
                                    handleStatChange(
                                      index,
                                      "icon",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Icon (Users, GraduationCap, Award, Star)"
                                />
                              </td>
                              <td className="border border-gray-300 p-2">
                                <input
                                  className="border rounded-lg p-2 w-full"
                                  value={stat.number}
                                  onChange={(e) =>
                                    handleStatChange(
                                      index,
                                      "number",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Number (e.g. 10,000+)"
                                />
                              </td>
                              <td className="border border-gray-300 p-2">
                                <input
                                  className="border rounded-lg p-2 w-full"
                                  value={stat.label}
                                  onChange={(e) =>
                                    handleStatChange(
                                      index,
                                      "label",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Label (e.g. Students Enrolled)"
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Save Button */}
                    <div>
                      <button
                        onClick={SendandSave}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700"
                      >
                        Send & Save
                      </button>
                    </div>
                  </div>
                )}
                {/*testimonial */}
                {activeTab === "testimonial" && <Testimonial />}

                {/*subscribe*/}

                {activeTab === "subscribe" && (
                  <div className="max-w-7xl mx-auto p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-2xl font-bold">Subscribers List</h2>
                      <button
                        onClick={exportToExcel}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        Download As Excel
                      </button>
                    </div>

                    {/* Add / Edit Subscriber Form */}
                    {showSubscriberForm && (
                      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                        <h3 className="text-lg font-semibold mb-4">
                          {editingSubscriber
                            ? "Edit Subscriber"
                            : "Add New Subscriber"}
                        </h3>
                        <form
                          onSubmit={handleSubscriberSubmit}
                          className="space-y-4"
                        >
                          <input
                            type="text"
                            name="whatsapp"
                            value={subscriberData.whatsapp}
                            onChange={handleSubscriberChange}
                            placeholder="WhatsApp Number"
                            className="w-full border p-2 rounded"
                            required
                          />
                          <input
                            type="email"
                            name="email"
                            value={subscriberData.email}
                            onChange={handleSubscriberChange}
                            placeholder="Email Address"
                            className="w-full border p-2 rounded"
                            required
                          />
                          <div className="flex space-x-2">
                            <button
                              type="submit"
                              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                            >
                              {editingSubscriber ? "Update" : "Add"}
                            </button>
                            <button
                              type="button"
                              onClick={handleSubscriberCancel}
                              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      </div>
                    )}

                    {/* Show Subscribers Table */}
                    {subscribers.length === 0 ? (
                      <p className="text-gray-600">No subscribers found.</p>
                    ) : (
                      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-100">
                            <tr className="text-left text-sm font-semibold uppercase tracking-wider">
                              <th className="p-3">#</th>
                              <th className="p-3">WhatsApp</th>
                              <th className="p-3">Email</th>
                              <th className="p-3">Subscribed At</th>
                              <th className="p-3">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {subscribers.map((subscriber, index) => (
                              <tr
                                key={subscriber._id}
                                className="hover:bg-gray-50"
                              >
                                <td className="p-3">{index + 1}</td>

                                {/* WhatsApp */}
                                <td className="p-3">
                                  <div className="flex items-center space-x-2">
                                    <span>{subscriber.whatsapp}</span>
                                    <button
                                      onClick={() =>
                                        handleCopy(subscriber.whatsapp)
                                      }
                                      className="p-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-600"
                                      title="Copy WhatsApp"
                                    >
                                      <ClipboardIcon className="h-4 w-4" />
                                    </button>
                                  </div>
                                </td>

                                {/* Email */}
                                <td className="p-3">
                                  <div className="flex items-center space-x-2">
                                    <span>{subscriber.email}</span>
                                    <button
                                      onClick={() =>
                                        handleCopy(subscriber.email)
                                      }
                                      className="p-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-600"
                                      title="Copy Email"
                                    >
                                      <ClipboardIcon className="h-4 w-4" />
                                    </button>
                                  </div>
                                </td>

                                {/* Subscribed At */}
                                <td className="p-3">
                                  {new Date(
                                    subscriber.createdAt
                                  ).toLocaleString()}
                                </td>

                                {/* Actions */}
                                <td className="p-3">
                                  <div className="flex space-x-2">
                                    <button
                                      onClick={() =>
                                        openSubscriberEditForm(subscriber)
                                      }
                                      className="p-2 rounded-full bg-green-100 hover:bg-green-200 text-green-600 hover:text-green-800 transition transform hover:scale-110"
                                      title="Edit Subscriber"
                                    >
                                      <PencilSquareIcon className="h-4 w-4" />
                                    </button>
                                    <button
                                      onClick={() =>
                                        deleteSubscriber(subscriber._id)
                                      }
                                      className="p-2 rounded-full bg-red-100 hover:bg-red-200 text-red-600 hover:text-red-800 transition transform hover:scale-110"
                                      title="Delete Subscriber"
                                    >
                                      <TrashIcon className="h-4 w-4" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}

                {/* Inquiry Tab */}
                {activeTab === "Footer" && <FooterAdmin />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
