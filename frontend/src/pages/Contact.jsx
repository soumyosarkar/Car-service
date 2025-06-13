import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 1000);
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <h1 className="hero-title">Get in Touch</h1>
          <p className="hero-subtitle">
            Have questions? Need to schedule service? We're here to help!
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="contact-content section">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Form */}
            <div className="contact-form-section">
              <h2>Send Us a Message</h2>
              
              {success && (
                <div className="success-message">
                  ✅ Thank you for your message! We'll get back to you within 24 hours.
                </div>
              )}

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="form-input"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your full name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-input"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone" className="form-label">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="form-input"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="subject" className="form-label">Subject *</label>
                    <select
                      id="subject"
                      name="subject"
                      className="form-select"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a subject</option>
                      <option value="general-inquiry">General Inquiry</option>
                      <option value="appointment">Appointment Request</option>
                      <option value="service-question">Service Question</option>
                      <option value="complaint">Complaint</option>
                      <option value="compliment">Compliment</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    className="form-textarea"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Tell us how we can help you..."
                    rows="6"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary btn-lg full-width"
                  disabled={loading}
                >
                  {loading ? 'Sending Message...' : 'Send Message'}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="contact-info-section">
              <div className="contact-info-card card">
                <h3>Contact Information</h3>
                
                <div className="contact-item">
                  <div className="contact-icon">📍</div>
                  <div className="contact-details">
                    <h4>Visit Our Shop</h4>
                    <p>123 Auto Service Street<br />Automotive City, AC 12345</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">📞</div>
                  <div className="contact-details">
                    <h4>Call Us</h4>
                    <p>Main: (555) 123-4567<br />Emergency: (555) 123-4568</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">✉️</div>
                  <div className="contact-details">
                    <h4>Email Us</h4>
                    <p>info@autocarepro.com<br />service@autocarepro.com</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">🕒</div>
                  <div className="contact-details">
                    <h4>Business Hours</h4>
                    <p>
                      Monday - Friday: 8:00 AM - 6:00 PM<br />
                      Saturday: 9:00 AM - 4:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>

              <div className="emergency-card card">
                <h3>Emergency Service</h3>
                <p>Need immediate roadside assistance? We offer 24/7 emergency towing and basic repairs.</p>
                <a href="tel:5551234568" className="btn btn-accent full-width">
                  📞 Call Emergency Line
                </a>
              </div>

              <div className="social-card card">
                <h3>Follow Us</h3>
                <p>Stay connected for updates, tips, and special offers!</p>
                <div className="social-links">
                  <a href="#" className="social-link">📘 Facebook</a>
                  <a href="#" className="social-link">📷 Instagram</a>
                  <a href="#" className="social-link">🐦 Twitter</a>
                  <a href="#" className="social-link">💼 LinkedIn</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <div className="container">
          <h2 className="section-title">Find Our Location</h2>
          <div className="map-container">
            <div className="map-placeholder">
              <div className="map-content">
                <div className="map-icon">🗺️</div>
                <h3>Interactive Map</h3>
                <p>123 Auto Service Street, Automotive City, AC 12345</p>
                <div className="map-actions">
                  <a href="#" className="btn btn-secondary">Get Directions</a>
                  <a href="#" className="btn btn-primary">View on Google Maps</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .contact-hero {
          background: linear-gradient(135deg, var(--dark-gray) 0%, var(--black) 100%);
          color: var(--white);
          padding: 4rem 0;
          text-align: center;
        }

        .hero-title {
          font-size: 3rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }

        .hero-subtitle {
          font-size: 1.2rem;
          opacity: 0.9;
          max-width: 600px;
          margin: 0 auto;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 3rem;
        }

        .contact-form-section h2 {
          color: var(--primary-blue);
          margin-bottom: 2rem;
          font-size: 2rem;
        }

        .success-message {
          background: #dcfce7;
          color: #166534;
          padding: 1rem;
          border-radius: 8px;
          margin-bottom: 2rem;
          font-weight: 500;
        }

        .contact-form {
          background: var(--white);
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .form-textarea {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          font-size: 1rem;
          font-family: inherit;
          resize: vertical;
          transition: border-color 0.3s ease;
        }

        .form-textarea:focus {
          outline: none;
          border-color: var(--primary-blue);
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }

        .contact-info-section {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .contact-info-card {
          padding: 2rem;
        }

        .contact-info-card h3 {
          color: var(--primary-blue);
          margin-bottom: 2rem;
          font-size: 1.3rem;
        }

        .contact-item {
          display: flex;
          align-items: flex-start;
          margin-bottom: 2rem;
          gap: 1rem;
        }

        .contact-item:last-child {
          margin-bottom: 0;
        }

        .contact-icon {
          font-size: 1.5rem;
          margin-top: 0.25rem;
        }

        .contact-details h4 {
          color: var(--dark-gray);
          margin-bottom: 0.5rem;
          font-size: 1rem;
        }

        .contact-details p {
          color: var(--neutral-gray);
          line-height: 1.5;
          margin: 0;
        }

        .emergency-card {
          background: linear-gradient(135deg, var(--accent-orange) 0%, #ea580c 100%);
          color: var(--white);
          padding: 2rem;
        }

        .emergency-card h3 {
          color: var(--white);
          margin-bottom: 1rem;
        }

        .emergency-card p {
          opacity: 0.9;
          margin-bottom: 1.5rem;
        }

        .social-card {
          padding: 2rem;
        }

        .social-card h3 {
          color: var(--primary-blue);
          margin-bottom: 1rem;
        }

        .social-card p {
          color: var(--neutral-gray);
          margin-bottom: 1.5rem;
        }

        .social-links {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .social-link {
          color: var(--primary-blue);
          text-decoration: none;
          padding: 0.5rem 0;
          transition: color 0.3s ease;
        }

        .social-link:hover {
          color: var(--secondary-blue);
        }

        .map-section {
          background-color: var(--light-gray);
        }

        .section-title {
          text-align: center;
          color: var(--dark-gray);
          margin-bottom: 3rem;
          font-size: 2rem;
        }

        .map-container {
          max-width: 800px;
          margin: 0 auto;
        }

        .map-placeholder {
          background: var(--white);
          border-radius: 12px;
          padding: 4rem 2rem;
          text-align: center;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .map-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
        }

        .map-content h3 {
          color: var(--primary-blue);
          margin-bottom: 1rem;
        }

        .map-content p {
          color: var(--neutral-gray);
          margin-bottom: 2rem;
        }

        .map-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }

          .contact-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .contact-form {
            padding: 1.5rem;
          }

          .map-actions {
            flex-direction: column;
            align-items: center;
          }

          .map-actions .btn {
            width: 200px;
          }
        }
      `}</style>
    </div>
  );
};

export default Contact;