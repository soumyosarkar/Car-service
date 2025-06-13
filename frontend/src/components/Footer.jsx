import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">
              <span className="brand-icon">🚗</span>
              AutoCare Pro
            </h3>
            <p className="footer-text">
              Your trusted partner for professional automotive services. 
              Quality repairs, maintenance, and customer satisfaction guaranteed.
            </p>
            <div className="footer-social">
              <a href="#" className="social-link">📘</a>
              <a href="#" className="social-link">📷</a>
              <a href="#" className="social-link">🐦</a>
            </div>
          </div>

          <div className="footer-section">
            <h4 className="footer-subtitle">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/book-appointment">Book Service</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-subtitle">Services</h4>
            <ul className="footer-links">
              <li><a href="#oil-change">Oil Change</a></li>
              <li><a href="#brake-service">Brake Service</a></li>
              <li><a href="#tire-service">Tire Service</a></li>
              <li><a href="#engine-repair">Engine Repair</a></li>
              <li><a href="#inspection">Vehicle Inspection</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-subtitle">Contact Info</h4>
            <div className="contact-info">
              <p>📍 123 Auto Service Street</p>
              <p>City, State 12345</p>
              <p>📞 (555) 123-4567</p>
              <p>✉️ info@autocarepro.com</p>
              <p>🕒 Mon-Fri: 8AM-6PM</p>
              <p>🕒 Sat: 9AM-4PM</p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 AutoCare Pro. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background: linear-gradient(135deg, var(--dark-gray) 0%, var(--black) 100%);
          color: var(--white);
          padding: 3rem 0 1rem;
          margin-top: 4rem;
        }

        .footer-content {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .footer-section h3,
        .footer-section h4 {
          margin-bottom: 1rem;
        }

        .footer-title {
          display: flex;
          align-items: center;
          color: var(--primary-blue);
          font-size: 1.5rem;
          margin-bottom: 1rem;
        }

        .brand-icon {
          font-size: 2rem;
          margin-right: 0.5rem;
        }

        .footer-subtitle {
          color: var(--white);
          font-size: 1.2rem;
          margin-bottom: 1rem;
        }

        .footer-text {
          color: #d1d5db;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .footer-social {
          display: flex;
          gap: 1rem;
        }

        .social-link {
          display: inline-block;
          font-size: 1.5rem;
          transition: transform 0.3s ease;
        }

        .social-link:hover {
          transform: translateY(-3px);
        }

        .footer-links {
          list-style: none;
          padding: 0;
        }

        .footer-links li {
          margin-bottom: 0.5rem;
        }

        .footer-links a {
          color: #d1d5db;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .footer-links a:hover {
          color: var(--primary-blue);
        }

        .contact-info p {
          color: #d1d5db;
          margin-bottom: 0.5rem;
          display: flex;
          align-items: center;
        }

        .footer-bottom {
          border-top: 1px solid #374151;
          padding-top: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #9ca3af;
        }

        .footer-bottom-links {
          display: flex;
          gap: 1rem;
        }

        .footer-bottom-links a {
          color: #9ca3af;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .footer-bottom-links a:hover {
          color: var(--primary-blue);
        }

        @media (max-width: 768px) {
          .footer-content {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .footer-bottom {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;