import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "../styles/home.css";  

const API_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";


const Home = () => {
  const scrollRef = useRef(null);
  const productRef = useRef(null); // ✅ NEW
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    category: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  /* ================= HANDLE FORM ================= */

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
      const res = await fetch(`${API_URL}/enquiry`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          type: "general",
          product: "",
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      alert("✅ Enquiry sent successfully!");

      setFormData({
        name: "",
        email: "",
        phone: "",
        organization: "",
        category: "",
        message: "",
      });

    } catch (error) {
      console.error("Error:", error);
      alert("❌ Failed to send enquiry");
    } finally {
      setLoading(false);
    }
  };

  /* ================= SCROLL HANDLER ================= */

  const scrollToProducts = () => {
    productRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Header />

      {/* ================= HERO ================= */}
      <section id="hero-section" className="hero-section animate-section">
        <div className="hero-text">
          <h1>Smart Solutions for Education & Urban Infrastructure</h1>
          <p>
            Providing energy-efficient LED interactive panels, smart classroom
            solutions, lighting systems, solar products, and public
            infrastructure equipment across India.
          </p>

          <div className="hero-buttons">
            {/* ✅ FIXED BUTTON */}
            <button onClick={scrollToProducts} className="btn primary-btn">
              Explore Products
            </button>
          </div>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section className="about-hedis animate-section">
        <h2>ABOUT HEDIS ASSOCIATES</h2>
        <p>
          M/s HEDIS Associates Pvt. Ltd., established in 2017, is engaged in
          supplying world-class LED interactive panels, smart classroom
          solutions, LED lighting systems, solar products, high-mast poles,
          octagonal poles, and Swachh Bharat Mission products.
        </p>
      </section>

      {/* ================= PRODUCT CATEGORIES ================= */}
      <section
        ref={productRef}  // ✅ IMPORTANT
        className="product-categories animate-section"
      >
        <h2>Our Products</h2>

        <div className="oval-scroll-wrapper">
          <div className="oval-scroll" ref={scrollRef}>

            {[
              {
                title: "Educational Products",
                cls: "category-education",
                value: "Educational Products",
              },
              {
                title: "Lights & Poles",
                cls: "category-lighting",
                value: "lights and Poles",
              },
              {
                title: "Solar Products",
                cls: "category-solar",
                value: "Solar Products",
              },
              {
                title: "Swachh Bharat Mission Products",
                cls: "category-swachh",
                value: "Swachh",
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`oval-card ${item.cls}`}
                onClick={() =>
                  navigate(
                    `/products?category=${encodeURIComponent(item.value)}`
                  )
                }
                style={{ cursor: "pointer" }}
              >
                <span>{item.title}</span>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* ================= QUERY ================= */}
      <section id="query" className="query-section animate-section">
        <div className="query-wrapper">

          <div className="query-form-box">
            <form onSubmit={handleSubmit}>
              <input name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
              <input name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
              <input name="phone" placeholder="Your Phone" value={formData.phone} onChange={handleChange} required />
              <input name="organization" placeholder="Organization" value={formData.organization} onChange={handleChange} />

              <select name="category" value={formData.category} onChange={handleChange} required>
                <option value="">Select Product Category</option>
                <option value="Educational Products">Educational Products</option>
                <option value="Lights & Poles">Lights & Poles</option>
                <option value="Solar Products">Solar Products</option>
                <option value="Swachh Bharat Mission Products">Swachh Bharat Mission Products</option>
              </select>

              <textarea name="message" rows="4" placeholder="Describe your requirement..." value={formData.message} onChange={handleChange} required />

              <button type="submit" disabled={loading}>
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          <div className="query-content">
            <p className="query-subtitle">Have any query?</p>
            <h2>CONTACT US</h2>
            <p>Share your project or product requirement with us.</p>
          </div>

        </div>
      </section>

      {/* ================= CONTACT ================= */}
      <section id="contact-section" className="contact-section animate-section">
        <div className="contact-wrapper">

          <div className="contact-left">
            <p className="contact-subtitle">// Contact us</p>
            <h2>GET IN <br /> TOUCH</h2>
          </div>

          <div className="contact-right">

            <div className="contact-card">
              <div className="contact-icon">📍</div>
              <h3>Office Location</h3>
              <p>Greater Noida, Uttar Pradesh</p>
            </div>

            <div className="contact-card">
              <div className="contact-icon">⏰</div>
              <h3>Working Hours</h3>
              <p>Mon - Sat: 10am - 6pm</p>
            </div>

            <div className="contact-card">
              <div className="contact-icon">📞</div>
              <h3>Communication</h3>
              <p>+91 9540055005</p>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Home;