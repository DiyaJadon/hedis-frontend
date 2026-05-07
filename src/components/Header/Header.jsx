import { useNavigate, useLocation, Link } from "react-router-dom";
import "../../styles/header.css";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ UNIVERSAL SCROLL FUNCTION
  const scrollToSection = (sectionId) => {
    if (location.pathname !== "/") {
      // Navigate to home with hash
      navigate(`/#${sectionId}`);
    } else {
      // Scroll directly
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header className="header">

      {/* ✅ LOGO → HERO */}
      <div
        className="logo"
        onClick={() => scrollToSection("hero-section")}
      >
        <img src="/images/logo.png" alt="Hedis Logo" />
        <div className="company-name">
          <h1>HEDIS</h1>
          <p>Associates Pvt. Ltd.</p>
        </div>
      </div>

      <nav className="nav-links">

        {/* ✅ HOME */}
        <span
          className="nav-link"
          onClick={() => scrollToSection("hero-section")}
        >
          Home
        </span>

        {/* ✅ PRODUCTS DROPDOWN */}
        <div className="dropdown">
          <span className="nav-link dropdown-trigger">
            Products
          </span>

          <div className="dropdown-content">
            <Link to="/products?category=Educational Products">
              Educational Products
            </Link>
            <Link to="/products?category=lights and Poles">
              Lights & Poles
            </Link>
            <Link to="/products?category=Solar Products">
              Solar Products
            </Link>
            <Link to="/products?category=Swachh">
              Swachh Bharat Mission Products
            </Link>
          </div>
        </div>

        {/* ✅ CONTACT */}
        <span
          className="nav-link"
          onClick={() => scrollToSection("contact-section")}
        >
          Contact
        </span>

      </nav>
    </header>
  );
};

export default Header;