//InquiryForm jsx redesign with OTP verification and state-city dropdown
import React, { useState, useCallback } from "react";
import axios from "axios";
// All Indian states and sample major cities 
const BASE_URL = import.meta.env.REACT_APP_BASE_URL || "http://localhost:4001";
const stateCityData = {
  "Andhra Pradesh": ["Alluri Sitharama Raju", "Anakapalli", "Ananthapuramu", "Annamayya", "Bapatla", "Chittoor", "Dr. B.R. Ambedkar Konaseema", "East Godavari", "Eluru", "Guntur", "Kakinada", "Krishna", "Kurnool", "Nandyal", "Nellore", "NTR", "Palnadu", "Parvathipuram Manyam", "Prakasam", "Srikakulam", "Sri Sathya Sai", "Tirupati", "Visakhapatnam", "Vizianagaram", "West Godavari", "YSR Kadapa"],
  "Arunachal Pradesh": ["Anjaw", "Changlang", "Dibang Valley", "East Kameng", "East Siang", "Kamle", "Kra Daadi", "Kurung Kumey", "Lepa Rada", "Lohit", "Longding", "Lower Dibang Valley", "Lower Siang", "Lower Subansiri", "Namsai", "Pakke-Kessang", "Papum Pare", "Shi Yomi", "Siang", "Tawang", "Tirap", "Upper Dibang Valley", "Upper Siang", "Upper Subansiri", "West Kameng", "West Siang", "Capital Complex Itanagar"],
  "Assam": ["Baksa", "Barpeta", "Biswanath", "Bongaigaon", "Cachar", "Charaideo", "Chirang", "Darrang", "Dhemaji", "Dhubri", "Dibrugarh", "Dima Hasao", "Goalpara", "Golaghat", "Hailakandi", "Hojai", "Jorhat", "Kamrup Metropolitan", "Kamrup", "Karbi Anglong", "Karimganj", "Kokrajhar", "Lakhimpur", "Majuli", "Morigaon", "Nagaon", "Nalbari", "Sivasagar", "Sonitpur", "South Salmara-Mankachar", "Tinsukpur", "Udalguri", "West Karbi Anglong", "Bajali", "Tamulpur"],
  "Bihar": ["Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur", "Bhojpur", "Buxar", "Darbhanga", "East Champaran", "Gaya", "Gopalganj", "Jamui", "Jehanabad", "Kaimur", "Katihar", "Khagaria", "Kishanganj", "Lakhisarai", "Madhepura", "Madhubani", "Munger", "Muzaffarpur", "Nalanda", "Nawada", "Patna", "Purnia", "Rohtas", "Saharsa", "Samastipur", "Saran", "Sheikhpura", "Sheohar", "Sitamarhi", "Siwan", "Supaul", "Vaishali", "West Champaran"],
  "Chhattisgarh": ["Balod", "Baloda Bazar", "Balrampur", "Bastar", "Bemetara", "Bijapur", "Bilaspur", "Dantewala", "Dhamtari", "Durg", "Gariaband", "Gaurela-Pendra-Marwahi", "Janjgir-Champa", "Jashpur", "Kabirdham", "Kanker", "Kondagaon", "Korba", "Koriya", "Mahasamund", "Manendragarh-Chirmiri-Bharatpur", "Mohla-Manpur-Chowki", "Mungeli", "Narayanpur", "Raigarh", "Raipur", "Rajnandgaon", "Sarangarh-Bilaigarh", "Sukma", "Surajpur", "Surguja", "Khairagarh-Chhuikhadan-Gandai", "Shakti"],
  "Goa": ["North Goa", "South Goa"],
  "Gujarat": ["Ahmedabad", "Amreli", "Anand", "Aravalli", "Banaskantha", "Bharuch", "Bhavnagar", "Botad", "Chhota Udaipur", "Dahod", "Dang", "Devbhoomi Dwarka", "Gandhinagar", "Gir Somnath", "Jamnagar", "Junagadh", "Kheda", "Kutch", "Mahisagar", "Mehsana", "Morbi", "Narmada", "Navsari", "Panchmahal", "Patan", "Porbandar", "Rajkot", "Sabarkantha", "Surat", "Surendranagar", "Tapi", "Vadodara", "Valsad"],
  "Haryana": ["Ambala", "Bhiwani", "Charkhi Dadri", "Faridabad", "Fatehabad", "Gurugram", "Hisar", "Jhajjar", "Jind", "Kaithal", "Karnal", "Kurukshetra", "Mahendragarh", "Nuh", "Palwal", "Panchkula", "Panipat", "Rewari", "Rohtak", "Sirsa", "Sonipat", "Yamunanagar"],
  "Himachal Pradesh": ["Bilaspur", "Chamba", "Hamirpur", "Kangra", "Kinnaur", "Kullu", "Lahaul and Spiti", "Mandi", "Shimla", "Sirmaur", "Solan", "Una"],
  "Jharkhand": ["Bokaro", "Chatra", "Deoghar", "Dhanbad", "Dumka", "East Singhbhum", "Garhwa", "Giridih", "Godda", "Gumla", "Hazaribagh", "Jamtara", "Khunti", "Koderma", "Latehar", "Lohardaga", "Pakur", "Palamu", "Ramgarh", "Ranchi", "Sahebganj", "Seraikela-Kharsawan", "Simdega", "West Singhbhum"],
  "Karnataka": ["Bagalkot", "Ballari", "Belagavi", "Bengaluru Rural", "Bengaluru Urban", "Bidar", "Chamarajanagar", "Chikkaballapur", "Chikkamagaluru", "Chitradurga", "Dakshina Kannada", "Davanagere", "Dharwad", "Gadag", "Kalaburagi", "Hassan", "Haveri", "Kodagu", "Kolar", "Koppal", "Mandya", "Mysuru", "Raichur", "Ramanagara", "Shivamogga", "Tumakuru", "Udupi", "Uttara Kannada", "Vijayapura", "Yadgir", "Vijayanagara"],
  "Kerala": ["Alappuzha", "Ernakulam", "Idukki", "Kannur", "Kasaragod", "Kollam", "Kottayam", "Kozhikode", "Malappuram", "Palakkad", "Pathanamthitta", "Thiruvananthapuram", "Thrissur", "Wayanad"],
  "Madhya Pradesh": ["Agar Malwa", "Alirajpur", "Anuppur", "Ashoknagar", "Balaghat", "Barwani", "Betul", "Bhind", "Bhopal", "Burhanpur", "Chhatarpur", "Chhindwara", "Damoh", "Datia", "Dewas", "Dhar", "Dindori", "Guna", "Gwalior", "Harda", "Hoshangabad", "Indore", "Jabalpur", "Jhabua", "Katni", "Khandwa", "Khargone", "Mandla", "Mandsaur", "Morena", "Narsinghpur", "Neemuch", "Niwari", "Panna", "Raisen", "Rajgarh", "Ratlam", "Rewa", "Sagar", "Satna", "Sehore", "Seoni", "Shahdol", "Shajapur", "Sheopur", "Shivpuri", "Sidhi", "Singrauli", "Tikamgarh", "Ujjain", "Umaria", "Vidisha", "Maihar", "Pandhurna", "Mauganj"],
  "Maharashtra": ["Ahmednagar", "Akola", "Amravati", "Aurangabad", "Beed", "Bhandara", "Buldhana", "Chandrapur", "Dhule", "Gadchiroli", "Gondia", "Hingoli", "Jalgaon", "Jalna", "Kolhapur", "Latur", "Mumbai City", "Mumbai Suburban", "Nagpur", "Nanded", "Nandurbar", "Nashik", "Osmanabad", "Palghar", "Parbhani", "Pune", "Raigad", "Ratnagiri", "Sangli", "Satara", "Sindhudurg", "Solapur", "Thane", "Wardha", "Washim", "Yavatmal"],
  "Manipur": ["Bishnupur", "Churachandpur", "Chandel", "Imphal East", "Imphal West", "Jiribam", "Kakching", "Kamjong", "Kangpokpi", "Noney", "Pherzawl", "Senapati", "Tamenglong", "Tengnoupal", "Thoubal", "Ukhrul"],
  "Meghalaya": ["East Garo Hills", "East Jaintia Hills", "East Khasi Hills", "Eastern West Khasi Hills", "North Garo Hills", "Ri Bhoi", "South Garo Hills", "South West Garo Hills", "South West Khasi Hills", "West Garo Hills", "West Jaintia Hills", "West Khasi Hills"],
  "Mizoram": ["Aizawl", "Champhai", "Hnahthial", "Kolasib", "Lawngtlai", "Lunglei", "Mamit", "Saiha", "Saitual", "Serchhip", "Khawzawl"],
  "Nagaland": ["Chumoukedima", "Dimapur", "Kiphire", "Kohima", "Longleng", "Mokokchung", "Mon", "Noklak", "Peren", "Phek", "Shamator", "Tseminyu", "Tuensang", "Wokha", "Zunheboto", "Niuland"],
  "Odisha": ["Angul", "Balangir", "Balasore", "Bargarh", "Bhadrak", "Boudh", "Cuttack", "Debagarh", "Dhenkanal", "Gajapati", "Ganjam", "Jagatsinghpur", "Jajpur", "Jharsuguda", "Kalahandi", "Kandhamal", "Kendrapara", "Kendujhar", "Khordha", "Koraput", "Malkangiri", "Mayurbhanj", "Nabarangpur", "Nayagarh", "Nuapada", "Puri", "Rayagada", "Sambalpur", "Subarnapur", "Sundargarh"],
  "Punjab": ["Amritsar", "Barnala", "Bathinda", "Faridkot", "Fatehgarh Sahib", "Fazilka", "Ferozepur", "Gurdaspur", "Hoshiarpur", "Jalandhar", "Kapurthala", "Ludhiana", "Mansa", "Moga", "Muktsar", "Pathankot", "Patiala", "Rupnagar", "Sahibzada Ajit Singh Nagar", "Sangrur", "Shahid Bhagat Singh Nagar", "Tarn Taran", "Malerkotla"],
  "Rajasthan": ["Anupgarh", "Balotra", "Barmer", "Beawar", "Bharatpur", "Bhilwara", "Bikaner", "Bundi", "Chaksu", "Chittorgarh", "Dausa", "Didwana-Kuchaman", "Dholpur", "Dungarpur", "Ganganagar", "Gangapur City", "Hanumangarh", "Jaipur", "Jaisalmer", "Jalore", "Jhalawar", "Jhunjhunu", "Jodhpur", "Karauli", "Kekri", "Khairthal-Tijara", "Kota", "Kotputli-Behror", "Nagaur", "Neem Ka Thana", "Pali", "Phalodi", "Pratapgarh", "Rajsamand", "Salumbar", "Sanchore", "Sawai Madhopur", "Shahpura", "Sikar", "Sirohi", "Tonk", "Udaipur", "Deeg", "Didwana-Kuchaman", "Jaipur Rural", "Jodhpur Rural", "Kotputli-Behror", "Kherthal-Tijara", "Sanchore", "Shahpura"],
  "Sikkim": ["Gangtok", "Gyalshing", "Mangan", "Namchi", "Pakyong", "Soreng"],
  "Tamil Nadu": ["Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul", "Erode", "Kallakurichi", "Kanchipuram", "Kanyakumari", "Karur", "Krishnagiri", "Madurai", "Mayiladuthurai", "Nagapattinam", "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai", "Ramanathapuram", "Ranipet", "Salem", "Sivaganga", "Tenkasi", "Thanjavur", "Theni", "Thoothukudi", "Tiruchirappalli", "Tirunelveli", "Tirupattur", "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur", "Vellore", "Viluppuram", "Virudhunagar"],
  "Telangana": ["Adilabad", "Bhadradri Kothagudem", "Hyderabad", "Jagtial", "Jangaon", "Jayashankar Bhupalpally", "Jogulamba Gadwal", "Kamareddy", "Karimnagar", "Khammam", "Komaram Bheem", "Mahabubabad", "Mahabubnagar", "Mancherial", "Medak", "Medchal–Malkajgiri", "Mulugu", "Nagarkurnool", "Nalgonda", "Narayanpet", "Nirmal", "Nizamabad", "Peddapalli", "Rajanna Sircilla", "Ranga Reddy", "Sangareddy", "Siddipet", "Suryapet", "Vikarabad", "Wanaparthy", "Warangal", "Hanamkonda", "Yadadri Bhuvanagiri"],
  "Tripura": ["Dhalai", "Gomati", "Khowai", "North Tripura", "Sepahijala", "South Tripura", "Unakoti", "West Tripura"],
  "Uttar Pradesh": ["Agra", "Aligarh", "Ambedkarnagar", "Amethi", "Amroha", "Auraiya", "Ayodhya", "Azamgarh", "Baghpat", "Bahraich", "Ballia", "Balrampur", "Banda", "Barabanki", "Bareilly", "Basti", "Bhadohi", "Bijnor", "Budaun", "Bulandshahr", "Chandauli", "Chitrakoot", "Deoria", "Etah", "Etawah", "Farrukhabad", "Fatehpur", "Firozabad", "Gautam Buddha Nagar", "Ghaziabad", "Ghazipur", "Gonda", "Gorakhpur", "Hamirpur", "Hapur", "Hardoi", "Hathras", "Jalaun", "Jaunpur", "Jhansi", "Kannauj", "Kanpur Dehat", "Kanpur Nagar", "Kasganj", "Kaushambi", "Kheri", "Kushinagar", "Lalitpur", "Lucknow", "Maharajganj", "Mahoba", "Mainpuri", "Mathura", "Mau", "Meerut", "Mirzapur", "Moradabad", "Muzaffarnagar", "Pilibhit", "Pratapgarh", "Prayagraj", "Raebareli", "Rampur", "Saharanpur", "Sambhal", "Sant Kabir Nagar", "Shahjahanpur", "Shamli", "Shravasti", "Siddharthnagar", "Sitapur", "Sonbhadra", "Sultanpur", "Unnao", "Varanasi"],
  "Uttarakhand": ["Almora", "Bageshwar", "Chamoli", "Champawat", "Dehradun", "Haridwar", "Nainital", "Pauri Garhwal", "Pithoragarh", "Rudraprayag", "Tehri Garhwal", "Udham Singh Nagar", "Uttarkashi"],
  "West Bengal": ["Alipurduar", "Bankura", "Birbhum", "Cooch Behar", "Darjeeling", "Dakshin Dinajpur", "Hooghly", "Howrah", "Jalpaiguri", "Jhargram", "Kalimpong", "Kolkata", "Malda", "Murshidabad", "Nadia", "North 24 Parganas", "Paschim Bardhaman", "Paschim Medinipur", "Purba Bardhaman", "Purba Medinipur", "Purulia", "South 24 Parganas", "Uttar Dinajpur"],
  // Union Territories
  "Andaman and Nicobar": ["Nicobar", "North and Middle Andaman", "South Andaman"],
  "Chandigarh": ["Chandigarh"],
  "Dadra and Nagar Haveli": ["Dadra and Nagar Haveli"],
    "Daman and Diu": ["Daman", "Diu"],

  "NCT of Delhi": ["Central Delhi", "East Delhi", "New Delhi", "North Delhi", "North East Delhi", "North West Delhi", "Shahdara", "South Delhi", "South East Delhi", "South West Delhi", "West Delhi"],
  "Jammu and Kashmir": ["Anantnag", "Bandipora", "Baramulla", "Budgam", "Doda", "Ganderbal", "Jammu", "Kathua", "Kishtwar", "Kulgam", "Kupwara", "Poonch", "Pulwama", "Rajouri", "Ramban", "Reasi", "Samba", "Shopian", "Srinagar", "Udhampur"],
  "Ladakh": ["Kargil", "Leh"],
  "Lakshadweep": ["Lakshadweep"],
  "Puducherry": ["Karaikal", "Mahe", "Puducherry", "Yanam"]
};

// --- SVG Icons for a modern look (Lucide-react substitutes) ---
const PhoneIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
);

const CheckCircleIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
);

const UserIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);

const MailIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
);

const BriefcaseIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
);

const MapPinIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2c-3.86 0-7 3.14-7 7 0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7z"/><circle cx="12" cy="9" r="3"/></svg>
);


const InquiryFormRedesign = () => {
  // State for controlling widget visibility and form data
  const [isCollapsed, setIsCollapsed] = useState(true ); // Initially collapsed
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "", 
    program: "",
    state: "",
    city: "",
    consent: false,
    otp: "",
  });
  // State for OTP flow management
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  
  // UI states
  const [message, setMessage] = useState(null);
  const [availableCities, setAvailableCities] = useState([]);
  const [loading, setLoading] = useState(false);

  // Toggle Collapse logic
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  // Handle input changes
  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    let newValue = value;

    // Enforce digit-only for phone and OTP
    if (name === "phone" || name === "otp") {
        newValue = value.replace(/\D/g, '');
    }

    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : newValue }));
  }, []);

  // Handle State change and update available cities
  const handleStateChange = useCallback((e) => {
    const state = e.target.value;
    setFormData((prev) => ({ ...prev, state, city: "" }));
    setAvailableCities(stateCityData[state] || []);
  }, []);

  // Custom message alert handler
  const showMessage = (msg, isError = false) => {
    setMessage({ text: msg, isError });
    setTimeout(() => setMessage(null), 4000);
  };

  // Simulate OTP sending
 const sendOtp = async () => {
  if (formData.phone.length !== 10) {
    showMessage("Please enter a valid 10-digit mobile number.", true);
    return;
  }

  setLoading(true);

  try {
    // Call backend API
    const response = await axios.post("/api/inquiry/send-otp", {
      phone: formData.phone,
    });

    // Backend response
    setOtpSent(true);
    showMessage(response.data.message, false); // e.g., "OTP sent"
  } catch (err) {
    console.error(err);
    showMessage(
      err.response?.data?.message || "Failed to send OTP",
      true
    );
  } finally {
    setLoading(false);
  }
};
  // Simulate OTP verification
const verifyOtp = async () => {
  if (formData.otp.length !== 4) {
    showMessage("OTP must be 4 digits.", true);
    return;
  }

  setLoading(true);

  try {
    const response = await axios.post("/api/inquiry/verify-otp", {
      phone: formData.phone,
      otp: formData.otp,
    });

    // If backend returns success
    setOtpVerified(true);
    showMessage(response.data.message || "Phone verified successfully!", false);
  } catch (err) {
    console.error(err);
    showMessage(
      err.response?.data?.message || "Invalid OTP. Please try again.",
      true
    );
  } finally {
    setLoading(false);
  }
};

  // Form submission handler
  const handleSubmit = async (e) => {
  e.preventDefault(); // Prevent page reload
  if (!otpVerified || !formData.consent) return;

  setLoading(true);

  try {
const response = await axios.post(`${BASE_URL}/api/inquiry/submit-form`, formData);

    // Axios puts response data in response.data
    const data = response.data;

    alert("Form submitted successfully!", data);

    // Optionally reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      program: "",
      state: "",
      city: "",
      consent: false,
    });
    setOtpVerified(false);
  } catch (err) {
    console.error("Error submitting form:", err);
    // Axios error handling
    alert(err.response?.data?.message || "Submission failed. Please try again.");
  } finally {
    setLoading(false);
  }
};

  // Mock submission function (replace with actual API call)
  const mockSubmit = () => {
    if (!otpVerified) {
      showMessage("Please verify your phone number before submitting.", true);
      return;
    }
    if (!formData.consent) {
      showMessage("Please provide consent to proceed.", true);
      return;
    }
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log("Form submitted:", { ...formData, phone: `+91${formData.phone}` });
      showMessage("Thank you! Your inquiry has been submitted. We will contact you shortly.", false);
      
      // Reset form state
      setFormData({
        name: "",
        email: "",
        phone: "",
        program: "",
        state: "",
        city: "",
        consent: false,
        otp: "",
      });
      setOtpSent(false);
      setOtpVerified(false);
      setIsCollapsed(true); // Collapse after successful submission
    }, 2000);
  };

  // Utility function for button styling based on state
  const getButtonClass = (isActive) =>
    `w-full font-bold text-base py-2 rounded-xl shadow-lg  flex items-center justify-center gap-2 ${
      isActive
        ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-300/50"
        : "bg-gray-300 text-gray-500 cursor-not-allowed"
    }`;

  // Custom Input Field Component
  const InputField = ({ name, type = "text", placeholder, value, onChange, required, icon: Icon }) => (
    <div className="relative mb-3">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 w-10 pointer-events-none text-gray-400">
        <Icon className="w-5 h-5" />
      </div>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition-shadow placeholder:text-gray-400"
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );

  // Custom Select Field Component
  const SelectField = ({ name, placeholder, value, onChange, required, children, icon: Icon, disabled = false }) => (
    <div className="relative mb-3 flex-1">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
        <Icon className="w-5 h-5" />
      </div>
      <select
        name={name}
        className={`w-full appearance-none pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 text-base focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition-shadow ${disabled ? 'bg-gray-50 opacity-70 text-gray-400' : 'bg-white text-gray-800'}`}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {children}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
        {/* Dropdown arrow icon */}
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
      </div>
    </div>
  );


  return (
    // Outer container for context/styling (assumes Inter font via Tailwind config)
   <div className="font-sans antialiased bg-transparent text-gray-800">
  {/* Floating Widget Container */}
  <div
    className={`fixed bg-white text-gray-800 rounded-2xl shadow-2xl border-2 border-indigo-100 z-[999] font-inter bottom-5 right-5 overflow-hidden
      ${isCollapsed 
        ? "max-h-16 w-44 sm:w-52" // Collapsed: small width
        : "max-h-[80vh] w-[90vw] sm:max-w-[260px]" // Expanded: responsive height and width
      } `}
  >
    {/* Header/Toggle Bar */}
  {/* Header/Toggle Bar */}
  <div
    onClick={toggleCollapse}
    className={`h-16 flex items-center justify-between px-5 pt-1 bg-indigo-600 text-white shadow-lg hover:bg-indigo-700
      ${isCollapsed ? 'rounded-2xl' : 'rounded-t-2xl sticky top-0 z-10'}`}
  >
    {/* Header Content */}
    <div className="flex items-center gap-3 overflow-hidden whitespace-nowrap">
      <PhoneIcon className="w-6 h-6 animate-pulse flex-shrink-0" />
      <h2 className={`font-bold ${isCollapsed ? 'text-base' : 'text-lg'}`}>
        {isCollapsed ? 'Inquire Now' : 'Free Consultation'}
      </h2>
    </div>

    {/* Collapse/Expand Icon */}
    <svg
      className={`w-6 h-6 transform ${isCollapsed ? 'rotate-0' : 'rotate-180'}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
    </svg>
  </div>

    {/* Form Content */}
    <div className="p-4 sm:p-1 overflow-y-auto max-h-[calc(90vh-64px)]">
      <p className="text-sm mb-1 text-gray-600">
        Fill out the form below to receive a consultation within 24 hours.
      </p>

      <form onSubmit={handleSubmit} className="">
        {/* Name Input */}
        <InputField
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          icon={UserIcon}
        />

        {/* Email Input */}
        <InputField
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
          icon={MailIcon}
        />

        {/* Phone + OTP Section */}
        <div className="flex flex-col gap-3">
          <div className={`flex items-stretch rounded-xl overflow-hidden shadow-sm transition-all duration-300 ${otpVerified ? 'border-2 border-green-500' : 'border border-gray-300'}`}>
            <div className="flex items-stretch w-full">
              <div className="flex items-center pl-3 pr-2 text-gray-800 bg-gray-100 font-semibold border-r border-gray-300">
                <PhoneIcon className="w-5 h-5 text-gray-500 mr-2" />
                +91
              </div>
              <input
                type="tel"
                name="phone"
                placeholder="Mobile Number (10 digits)"
                className="flex-1 w-full p-2.5 text-gray-800 focus:ring-0 focus:border-0 border-none outline-none placeholder:text-gray-400"
                value={formData.phone}
                onChange={handleChange}
                maxLength={10}
                required
                disabled={otpVerified || otpSent || loading}
              />
            </div>

            {!otpVerified && (
              <button
                type="button"
                onClick={otpSent ? verifyOtp : sendOtp}
                className={`flex items-center justify-center p-3 text-sm font-semibold transition-all duration-300 focus:outline-none min-w-[90px] h-full ${
                  otpSent ? "bg-indigo-500 hover:bg-indigo-600" : "bg-green-500 hover:bg-green-600"
                } text-white disabled:opacity-70`}
                disabled={loading || formData.phone.length !== 10}
              >
                {loading && !otpVerified ? (
                  <svg className="h-5 w-5 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : otpSent ? "Verify" : "Send OTP"}
              </button>
            )}
            {otpVerified && (
              <div className="flex items-center justify-center p-3 bg-green-500 text-white min-w-[50px]">
                <CheckCircleIcon className="w-6 h-6"/>
              </div>
            )}
          </div>

          {/* OTP Input */}
          {otpSent && !otpVerified && (
            <div className="flex items-center gap-2">
              <input
                type="text"
                name="otp"
                placeholder="Enter 4-digit OTP"
                className="flex-1 p-2.5 rounded-xl border border-gray-300 text-gray-800 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 placeholder:text-gray-400"
                value={formData.otp}
                onChange={handleChange}
                required
                maxLength={4}
                disabled={loading}
              />
              <button
                type="button"
                onClick={sendOtp}
                className="text-sm text-indigo-600 hover:text-indigo-800 font-medium whitespace-nowrap disabled:opacity-50"
                disabled={loading}
              >
                Resend OTP
              </button>
            </div>
          )}           
        </div>  

        {/* Program Select */}
        <SelectField
          name="program"
          placeholder="Select Program of Interest"
          value={formData.program}
          onChange={handleChange}
          required
          icon={BriefcaseIcon}
        >
          <option value="web_dev">Web Development</option>
          <option value="data_science">Data Science</option>
          <option value="ux_ui_design">UX/UI Design</option>
          <option value="digital_marketing">Digital Marketing</option>
          <option value="mba">MBA/BBA</option>
          <option value="engineering">Engineering</option>
        </SelectField>

        {/* State -> City */}
        <div className="flex flex-col sm:flex-row gap-3">
          <SelectField
            name="state"
            placeholder="Select State"
            value={formData.state}
            onChange={handleStateChange}
            required
            icon={MapPinIcon}
          >
            {Object.keys(stateCityData).map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </SelectField>
          <SelectField
            name="city"
            placeholder="Select City"
            value={formData.city}
            onChange={handleChange}
            disabled={!formData.state}
            required
            icon={MapPinIcon}
          >
            {availableCities.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </SelectField>
        </div>

        {/* Consent */}
        <div className="flex items-start ">
          <input
            type="checkbox"
            name="consent"
            id="consent-checkbox-new"
            className="mt-1 mr-2 rounded text-indigo-600 focus:ring-indigo-500 border-gray-300 w-4 h-4 shadow-sm"
            checked={formData.consent}
            onChange={handleChange}
            required
          />
          <label htmlFor="consent-checkbox-new" className="text-xs leading-snug text-gray-500">
            I agree to the terms and conditions by <strong>Admission Anytime.com</strong>
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className={getButtonClass(otpVerified && formData.consent && !loading)}
          disabled={!otpVerified || !formData.consent || loading}
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5 inline-block mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting...
            </>
          ) : "Get Free Consultation"}
        </button>
      </form>
    </div>
  </div>

  {/* Toast Message */}
  {message && (
    <div
      className={`fixed bottom-20 right-5 max-w-xs p-3 rounded-xl shadow-xl transition-opacity duration-500 opacity-100 font-medium z-[1000]
        ${message.isError ? "bg-red-500 text-white" : "bg-green-500 text-white"}`}
    >
      {message.text}
    </div>
  )}
</div>

  );
};

export default InquiryFormRedesign;
