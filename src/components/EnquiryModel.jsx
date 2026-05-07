import { useState } from "react";
import "../styles/enquiryModal.css";

// ✅ FIX: use env-based API
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const EnquiryModal = ({ product, category, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_BASE_URL}/enquiry`, { // ✅ FIXED
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          category: category || "",
          product: product,
          type: "product",
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      alert("Product Enquiry sent!");
      onClose();
    } catch (error) {
      console.error(error);
      alert("Failed to send enquiry");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>Enquire for {product}</h2>

        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Name" onChange={handleChange} required />
          <input name="email" placeholder="Email" onChange={handleChange} required />
          <input name="phone" placeholder="Phone" onChange={handleChange} required />
          <textarea name="message" placeholder="Your requirement" onChange={handleChange} required />

          <button type="submit">Submit</button>
        </form>

        <button className="close-btn" onClick={onClose}>X</button>
      </div>
    </div>
  );
};

export default EnquiryModal;