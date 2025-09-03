// src/Pages/Deposit.jsx
import React, { useState } from "react";
import axios from "../axios";

const Deposit = () => {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const vendors = [
    { name: "Vendor 1", whatsapp: "2348012345678" },
    { name: "Vendor 2", whatsapp: "2348098765432" },
  ];

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return alert("Please select a receipt file first.");

    const formData = new FormData();
    formData.append("receipt", selectedFile);
    formData.append("amount", selectedAmount);

    try {
      await axios.post("/deposit/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Receipt uploaded successfully. Awaiting admin approval.");
      setSelectedFile(null);
      setSelectedAmount(null);
    } catch (error) {
      alert("Error uploading receipt.");
      console.error(error);
    }
  };

  const generateWhatsAppLink = (vendorNumber) => {
    if (!selectedAmount) {
      alert("Please select an amount first.");
      return "#";
    }
    const message = `Hello, I want to invest ₦${selectedAmount} in GrowRich. Please guide me through the payment.`;
    return `https://wa.me/${vendorNumber}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-yellow-700 mb-6">Deposit</h2>

      {/* Amount Selection */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Choose Investment Amount</h3>
        <table className="w-full border-collapse border rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-yellow-100 text-left">
              <th className="p-3 border">Amount</th>
              <th className="p-3 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {[5000, 10000, 15000].map((amount) => (
              <tr key={amount} className="hover:bg-gray-50">
                <td className="p-3 border">₦{amount.toLocaleString()}</td>
                <td className="p-3 border">
                  <button
                    onClick={() => setSelectedAmount(amount)}
                    className={`px-4 py-2 rounded-lg ${
                      selectedAmount === amount
                        ? "bg-yellow-600 text-white"
                        : "bg-yellow-200 text-yellow-900"
                    }`}
                  >
                    {selectedAmount === amount ? "Selected" : "Select"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Vendor Selection */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Choose Vendor</h3>
        <table className="w-full border-collapse border rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-yellow-100 text-left">
              <th className="p-3 border">Vendor</th>
              <th className="p-3 border">Contact</th>
            </tr>
          </thead>
          <tbody>
            {vendors.map((vendor, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="p-3 border">{vendor.name}</td>
                <td className="p-3 border">
                  <a
                    href={generateWhatsAppLink(vendor.whatsapp)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    WhatsApp Vendor
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Receipt Upload */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Upload Payment Receipt</h3>
        <input
          type="file"
          onChange={handleFileChange}
          className="block w-full mb-3 border p-2 rounded-lg"
        />
        {selectedFile && (
          <p className="mb-3 text-sm text-gray-600">
            Selected: {selectedFile.name}
          </p>
        )}
        <button
          onClick={handleUpload}
          className="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
        >
          Upload Receipt
        </button>
      </div>
    </div>
  );
};

export default Deposit;
