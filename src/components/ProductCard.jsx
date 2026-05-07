import "../styles/products.css";
import { useState } from "react";

// ✅ FIX: Use Vite env
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const ProductCard = ({ product }) => {
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/enquiry`, { // ✅ FIXED
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          organization: "",
          category: product.maincategory || "Product Enquiry",
          message: formData.message,

          product: product.name,
          type: "product",
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      alert("✅ Product enquiry sent!");
      setShowModal(false);

      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });

    } catch (error) {
      console.error(error);
      alert("❌ Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="product-card-horizontal">

        {/* IMAGE */}
        <div className="product-image">
          <img src={product.image} alt={product.name} />
        </div>

        {/* CONTENT */}
        <div className="product-content">
          <h3>{product.name}</h3>

          <p className="product-description">
            {product.description}
          </p>

          <div className="product-footer">
            <span className="price">
              Price: {product.price || "On Request"}
            </span>

            <button
              className="enquiry-btn"
              onClick={() => setShowModal(true)}
            >
              Enquire Now
            </button>
          </div>
        </div>
      </div>

      {/* ================= MODAL ================= */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">

            <h2>Enquire for</h2>
            <h3 className="modal-product">{product.name}</h3>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <input
                type="tel"
                name="phone"
                placeholder="Your Phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />

              <textarea
                name="message"
                placeholder="Your Requirement..."
                value={formData.message}
                onChange={handleChange}
                required
              />

              <div className="modal-buttons">
                <button type="submit" disabled={loading}>
                  {loading ? "Sending..." : "Submit Enquiry"}
                </button>

                <button
                  type="button"
                  className="close-btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;