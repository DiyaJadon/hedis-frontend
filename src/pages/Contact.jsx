import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "../styles/contact.css";

const Contact = () => {
  return (
    <>
      <Header />

      <main>
        <div className="contact-section">
          <div className="contact-details">
            <h2>GET IN TOUCH WITH US</h2>

            <div className="contact-item">
              <i className="fas fa-phone"></i>
              <div>
                <strong>Phone Number</strong>
                <a href="tel:+919540055005">+91 9540055005</a>
              </div>
            </div>

            <div className="contact-item">
              <i className="fas fa-envelope"></i>
              <div>
                <strong>Office Email Id</strong>
                <a href="mailto:Hedisassociates@gmail.com">
                  Hedisassociates@gmail.com
                </a>
              </div>
            </div>

            <div className="contact-item">
              <i className="fas fa-map-marker-alt"></i>
              <div>
                <strong>Office Address</strong>
                70, Prateek Sahkari Awas Samiti Ltd., Sector-PHI3, Greater Noida,
                <br />
                Dist. Gautam Buddha Nagar, Pincode-201310.
              </div>
            </div>
          </div>

          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3508.0938819890043!2d77.5245339!3d28.4465862"
              title="Hedis Location"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Contact;
