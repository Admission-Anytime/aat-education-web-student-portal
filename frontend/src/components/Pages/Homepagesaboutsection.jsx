import { useState } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.REACT_APP_BASE_URL || "http://localhost:4001";

export default function AboutAdmin() {
  const [title, setTitle] = useState("About Our Institute");
  const [description, setDescription] = useState(
    "For over 40 years, Aayush Institute of Professional Studies has been committed to providing exceptional education that prepares students for success in an ever-changing world."
  );

  const [statistics, setStatistics] = useState([
    { icon: "Users", number: "10,000+", label: "Students Enrolled" },
    { icon: "GraduationCap", number: "100+", label: "Qualified Teachers" },
    { icon: "Award", number: "95%", label: "Success Rate" },
    { icon: "Star", number: "22+", label: "Years of Excellence" },
  ]);

  const handleStatChange = (index, field, value) => {
    const newStats = [...statistics];
    newStats[index][field] = value;
    setStatistics(newStats);
  };

  const SendandSave = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/api/about`, {
        title,
        description,
        statistics, // backend still expects stats
      });
      alert("About section saved to MongoDB ✅");
     console.log("✅ Server Response:", response.data);
     
    } catch (error) {
      console.error(error);
      alert("Error saving data ❌");
    }
  };
  


  return (
    <div className="space-y-6 max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
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
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
        <h3 className="text-lg font-semibold text-gray-900">Statistics</h3>

        {statistics.map((stat, index) => (
          <div key={index} className="border rounded-lg p-4 space-y-4">
            <h4 className="font-bold text-gray-800">
              Statistic {index + 1}
            </h4>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Icon
              </label>
              <input
                className="border rounded-lg p-2 w-full"
                value={stat.icon}
                onChange={(e) =>
                  handleStatChange(index, "icon", e.target.value)
                }
                placeholder="Icon (Users, GraduationCap, Award, Star)"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Number
              </label>
              <input
                className="border rounded-lg p-2 w-full"
                value={stat.number}
                onChange={(e) =>
                  handleStatChange(index, "number", e.target.value)
                }
                placeholder="Number (e.g. 10,000+)"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Label
              </label>
              <input
                className="border rounded-lg p-2 w-full"
                value={stat.label}
                onChange={(e) =>
                  handleStatChange(index, "label", e.target.value)
                }
                placeholder="Label (e.g. Students Enrolled)"
              />
            </div>
          </div>
        ))}
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
  );
}
