import React, { useState, useEffect } from "react";
import axios from "axios";
import { Edit2 as PencilIcon,  Plus as PlusIcon } from "lucide-react";
import { PencilSquareIcon, TrashIcon,EyeSlashIcon, EyeIcon } from "@heroicons/react/24/outline";

const FooterAdmin = () => {
  const [footer, setFooter] = useState(null);
  const [expandedMainLinks, setExpandedMainLinks] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});
  const [editingField, setEditingField] = useState({});

  useEffect(() => {
    const fetchFooter = async () => {
      try {
        const res = await axios.get("/api/footer");
        setFooter(res.data);
      } catch (err) {
        console.error("Error fetching footer:", err);
      }
    };
    fetchFooter();
  }, []);

  const toggleMainLinks = () => setExpandedMainLinks(!expandedMainLinks);
  const toggleSection = (idx) => setExpandedSections((prev) => ({ ...prev, [idx]: !prev[idx] }));

  const handleEditClick = (type, index, sectionIndex = null, linkOrTitle = null) => {
  if (type === "link" || type === "mainLink") {
    // links: store object { text, href }
    setEditingField({ type, index, sectionIndex, value: { text: linkOrTitle.text, href: linkOrTitle.href } });
  } else if (type === "sectionTitle") {
    // section title: store string
    setEditingField({ type, index, value: linkOrTitle }); // string
  }
};


  const handleSave = async () => {
    if (!footer) return;
    const updatedFooter = { ...footer };

    if (editingField.type === "mainLink") {
      updatedFooter.mainLinks[editingField.index] = { 
        text: editingField.value.text, 
        href: editingField.value.href 
      };
    } else if (editingField.type === "sectionTitle") {
      updatedFooter.sections[editingField.index].title = editingField.value;
    } else if (editingField.type === "link") {
      updatedFooter.sections[editingField.sectionIndex].links[editingField.index] = {
        text: editingField.value.text,
        href: editingField.value.href,
      };
    }

    try {
      const res = await axios.put(`/api/footer/${footer._id}`, updatedFooter);
      setFooter(res.data);
      setEditingField({});
    } catch (err) {
      console.error("Error saving footer:", err);
    }
  };

  const handleAddMainLink = () => {
    const updatedFooter = { ...footer };
    updatedFooter.mainLinks.push({ text: "New Link", href: "#" });
    setFooter(updatedFooter);
  };

  const handleDeleteMainLink = async (index) => {
    if (!window.confirm("Are you sure you want to delete this main link?")) return;
    const updatedFooter = { ...footer };
    updatedFooter.mainLinks.splice(index, 1);
    try {
      const res = await axios.put(`/api/footer/${footer._id}`, updatedFooter);
      setFooter(res.data);
    } catch (err) {
      console.error("Error deleting main link:", err);
    }
  };

  const handleAddSection = () => {
    const updatedFooter = { ...footer };
    updatedFooter.sections.push({
      title: "New Section",
      iconSvg: "",
      links: [],
      order: updatedFooter.sections.length + 1,
    });
    setFooter(updatedFooter);
  };

  const handleDeleteSection = async (sectionIdx) => {
    if (!window.confirm("Are you sure you want to delete this section?")) return;
    const updatedFooter = { ...footer };
    updatedFooter.sections.splice(sectionIdx, 1);

    updatedFooter.sections = updatedFooter.sections.map((sec, idx) => ({
      ...sec,
      order: idx + 1,
    }));

    try {
      const res = await axios.put(`/api/footer/${footer._id}`, updatedFooter);
      setFooter(res.data);
    } catch (err) {
      console.error("Error deleting section:", err);
    }
  };

  const handleAddLink = (sectionIdx) => {
    const updatedFooter = { ...footer };
    updatedFooter.sections[sectionIdx].links.push({ text: "New Link", href: "#" });
    setFooter(updatedFooter);
  };

  const handleDeleteLink = async (sectionIdx, linkIdx) => {
    if (!window.confirm("Are you sure you want to delete this link?")) return;
    const updatedFooter = { ...footer };
    updatedFooter.sections[sectionIdx].links.splice(linkIdx, 1);
    try {
      const res = await axios.put(`/api/footer/${footer._id}`, updatedFooter);
      setFooter(res.data);
    } catch (err) {
      console.error("Error deleting link:", err);
    }
  };

  if (!footer) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      {/* Add New Section Button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={handleAddSection}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-1"
        >
          <PlusIcon className="h-4 w-4" /> Add New Section
        </button>
      </div>

      {/* Main Links */}
      <div className="bg-gray-100 border border-gray-500 rounded-lg p-4 mb-6">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={toggleMainLinks}
        >
          <h2 className="font-bold text-lg">Footer Navbar Links</h2>
          <span>{expandedMainLinks ? "▲" : "▼"}</span>
        </div>

        {expandedMainLinks && (
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-xs sm:text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-center">#</th>
                  <th className="px-6 py-3 text-left">Text</th>
                  <th className="px-6 py-3 text-left">Href</th>
                  <th className="px-6 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {footer.mainLinks.map((link, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-4 py-4 text-center">{idx + 1}</td>
                    <td className="px-4 py-4">
                      {editingField.type === "mainLink" && editingField.index === idx ? (
                        <input
                          type="text"
                          value={editingField.value.text}
                          onChange={(e) =>
                            setEditingField({
                              ...editingField,
                              value: { ...editingField.value, text: e.target.value },
                            })
                          }
                          className="border rounded-md p-1 w-full"
                        />
                      ) : (
                        link.text
                      )}
                    </td>
                    <td className="px-4 py-4">
                      {editingField.type === "mainLink" && editingField.index === idx ? (
                        <input
                          type="text"
                          value={editingField.value.href}
                          onChange={(e) =>
                            setEditingField({
                              ...editingField,
                              value: { ...editingField.value, href: e.target.value },
                            })
                          }
                          className="border rounded-md p-1 w-full"
                        />
                      ) : (
                        link.href
                      )}
                    </td>
                    <td className="px-4 py-4 text-center flex justify-center gap-2">
                      {editingField.type === "mainLink" && editingField.index === idx ? (
                        <button
                          onClick={handleSave}
                          className="bg-blue-600 text-white px-2 py-1 rounded"
                        >
                          Save
                        </button>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEditClick("mainLink", idx, null, link)}
                            className="p-2 rounded-full bg-green-100 hover:bg-green-200 text-green-600 transition"
                          >
        <PencilSquareIcon className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteMainLink(idx)}
                            className="p-2 rounded-full bg-red-100 hover:bg-red-200 text-red-600 transition"
                          >
        <TrashIcon className="h-5 w-5" />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              onClick={handleAddMainLink}
              className="mt-2 bg-blue-600  hover:bg-blue-700 text-white px-4 py-1 rounded flex items-center gap-1"
            >
              <PlusIcon className="h-4 w-4" /> Add New
            </button>
          </div>
        )}
      </div>

      {/* Sections */}
      {footer.sections.map((section, idx) => (
        <div key={idx} className="bg-gray-100 border border-gray-500 rounded-lg p-4 mb-6">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleSection(idx)}
          >
            {editingField.type === "sectionTitle" && editingField.index === idx ? (
              <input
                type="text"
                value={editingField.value}
                onChange={(e) =>
                  setEditingField({ ...editingField, value: e.target.value })
                }
                className="border rounded-md p-1 w-full"
              />
            ) : (
              <h2 className="font-bold text-lg">{section.title}</h2>
            )}
            <div className="flex items-center gap-2">
              {editingField.type === "sectionTitle" && editingField.index === idx ? (
                <button
                  onClick={handleSave}
                  className="bg-blue-600 text-white px-2 py-1 rounded"
                >
                  Save
                </button>
              ) : (
                <>
                  <button
                    onClick={() =>
                      handleEditClick("sectionTitle", idx, null, section.title)
                    }
                    className="p-2 rounded-full bg-green-100 hover:bg-green-200 text-green-600 transition"
                  >
                    <PencilIcon className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteSection(idx)}
                    className="p-2 rounded-full bg-red-100 hover:bg-red-200 text-red-600 transition"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </>
              )}
              <span>{expandedSections[idx] ? "▲" : "▼"}</span>
            </div>
          </div>
          {expandedSections[idx] && (
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-xs sm:text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-center">#</th>
                    <th className="px-6 py-3 text-left">Link Text</th>
                    <th className="px-6 py-3 text-left">Href</th>
                    <th className="px-6 py-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {section.links.map((link, linkIdx) => (
                    <tr key={linkIdx} className="hover:bg-gray-50">
                      <td className="px-4 py-4 text-center">{linkIdx + 1}</td>
                      <td className="px-4 py-4">
                        {editingField.type === "link" &&
                        editingField.index === linkIdx &&
                        editingField.sectionIndex === idx ? (
                          <input
                            type="text"
                            value={editingField.value.text}
                            onChange={(e) =>
                              setEditingField({
                                ...editingField,
                                value: { ...editingField.value, text: e.target.value },
                              })
                            }
                            className="border rounded-md p-1 w-full"
                          />
                        ) : (
                          link.text
                        )}
                      </td>
                      <td className="px-4 py-4">
                        {editingField.type === "link" &&
                        editingField.index === linkIdx &&
                        editingField.sectionIndex === idx ? (
                          <input
                            type="text"
                            value={editingField.value.href}
                            onChange={(e) =>
                              setEditingField({
                                ...editingField,
                                value: { ...editingField.value, href: e.target.value },
                              })
                            }
                            className="border rounded-md p-1 w-full"
                          />
                        ) : (
                          link.href
                        )}
                      </td>
                      <td className="px-4 py-4 text-center flex justify-center gap-2">
                        {editingField.type === "link" &&
                        editingField.index === linkIdx &&
                        editingField.sectionIndex === idx ? (
                          <button
                            onClick={handleSave}
                            className="bg-blue-600 text-white px-2 py-1 rounded"
                          >
                            Save
                          </button>
                        ) : (
                          <>
                            <button
                              onClick={() => handleEditClick("link", linkIdx, idx, link)}
                              className="p-2 rounded-full bg-green-100 hover:bg-green-200 text-green-600 transition"
                            >
                              <PencilSquareIcon className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteLink(idx, linkIdx)}
                              className="p-2 rounded-full bg-red-100 hover:bg-red-200 text-red-600 transition"
                            >
                              <TrashIcon className="h-4 w-4" />
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button
                onClick={() => handleAddLink(idx)}
                className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded flex items-center gap-1"
              >
                <PlusIcon className="h-4 w-4" /> Add New Link
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FooterAdmin;
