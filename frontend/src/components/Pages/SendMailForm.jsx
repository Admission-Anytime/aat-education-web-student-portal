import React, { useState } from "react";

const SendMailForm = ({ uncheckedSections, onClose }) => {
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("Please correct the registration fields");

  // Prepare the message with unchecked sections
  const prepareMessage = () => {
    if (uncheckedSections.length === 0) {
      return "All sections are correct.";
    }
    return `The following sections have incorrect or missing information:\n\n${uncheckedSections
      .map((sec) => "- " + sec)
      .join("\n")}\n\nPlease correct them.`;
  };

  const handleSendMail = () => {
    const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(prepareMessage())}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="mt-6 p-4 border rounded-lg bg-gray-50">
      <h3 className="text-lg font-semibold mb-2">Send Correction Mail</h3>
      <div className="mb-2">
        <label className="block text-sm font-medium">Recipient Email</label>
        <input
          type="email"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium">Message</label>
        <textarea
          value={prepareMessage()}
          readOnly
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          rows={6}
        />
      </div>
      <div className="flex space-x-2">
        <button
          type="button"
          onClick={handleSendMail}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Send Mail
        </button>
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SendMailForm;
