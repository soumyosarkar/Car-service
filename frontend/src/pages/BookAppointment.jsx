import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const BookAppointment = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    service: "",
    appointmentDate: "",
    appointmentTime: "",
    vehicleInfo: {
      make: "",
      model: "",
      year: "",
      plateNumber: "",
    },
    notes: "",
  });

  const { user, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      navigate("/");
      return;
    }
    fetchServices();

    // If a service was selected from the services page
    if (location.state?.selectedService) {
      setFormData((prev) => ({
        ...prev,
        service: location.state.selectedService._id,
      }));
    }
  }, [isAuthenticated, isAdmin, navigate, location]);

  const fetchServices = async () => {
    try {
      const response = await axios.get(
        "https://car-service-backend-zqmk.onrender.com/api/services"
      );
      setServices(response.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("vehicle.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        vehicleInfo: {
          ...prev.vehicleInfo,
          [field]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("http://localhost:5000/api/appointments", formData);
      alert("Appointment booked successfully!");
      navigate("/my-appointments");
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Failed to book appointment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const selectedService = services.find((s) => s._id === formData.service);

  // Generate time slots
  const timeSlots = [
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
  ];

  // Get minimum date (tomorrow)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  return (
    <div className="book-appointment-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Book Your Service Appointment</h1>
          <p className="page-subtitle">
            Schedule your vehicle service with our expert technicians
          </p>
        </div>

        <div className="appointment-container">
          <div className="appointment-form-section">
            <form onSubmit={handleSubmit} className="appointment-form">
              {/* Service Selection */}
              <div className="form-section">
                <h3 className="section-title">Select Service</h3>
                <div className="form-group">
                  <label htmlFor="service" className="form-label">
                    Service Type *
                  </label>
                  <select
                    id="service"
                    name="service"
                    className="form-select"
                    value={formData.service}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Choose a service...</option>
                    {services.map((service) => (
                      <option key={service._id} value={service._id}>
                        {service.name} - ${service.price} ({service.duration}{" "}
                        min)
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Date & Time Selection */}
              <div className="form-section">
                <h3 className="section-title">Select Date & Time</h3>
                <div className="datetime-grid">
                  <div className="form-group">
                    <label htmlFor="appointmentDate" className="form-label">
                      Date *
                    </label>
                    <input
                      type="date"
                      id="appointmentDate"
                      name="appointmentDate"
                      className="form-input"
                      value={formData.appointmentDate}
                      onChange={handleChange}
                      min={minDate}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="appointmentTime" className="form-label">
                      Time *
                    </label>
                    <select
                      id="appointmentTime"
                      name="appointmentTime"
                      className="form-select"
                      value={formData.appointmentTime}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select time...</option>
                      {timeSlots.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Vehicle Information */}
              <div className="form-section">
                <h3 className="section-title">Vehicle Information</h3>
                <div className="vehicle-grid">
                  <div className="form-group">
                    <label htmlFor="vehicle.make" className="form-label">
                      Make *
                    </label>
                    <input
                      type="text"
                      id="vehicle.make"
                      name="vehicle.make"
                      className="form-input"
                      value={formData.vehicleInfo.make}
                      onChange={handleChange}
                      placeholder="e.g., Toyota"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="vehicle.model" className="form-label">
                      Model *
                    </label>
                    <input
                      type="text"
                      id="vehicle.model"
                      name="vehicle.model"
                      className="form-input"
                      value={formData.vehicleInfo.model}
                      onChange={handleChange}
                      placeholder="e.g., Camry"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="vehicle.year" className="form-label">
                      Year *
                    </label>
                    <input
                      type="number"
                      id="vehicle.year"
                      name="vehicle.year"
                      className="form-input"
                      value={formData.vehicleInfo.year}
                      onChange={handleChange}
                      placeholder="e.g., 2020"
                      min="1990"
                      max={new Date().getFullYear() + 1}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="vehicle.plateNumber" className="form-label">
                      License Plate *
                    </label>
                    <input
                      type="text"
                      id="vehicle.plateNumber"
                      name="vehicle.plateNumber"
                      className="form-input"
                      value={formData.vehicleInfo.plateNumber}
                      onChange={handleChange}
                      placeholder="e.g., ABC123"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Additional Notes */}
              <div className="form-section">
                <h3 className="section-title">Additional Information</h3>
                <div className="form-group">
                  <label htmlFor="notes" className="form-label">
                    Special Notes or Concerns
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    className="form-textarea"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Please describe any specific issues or requests..."
                    rows="4"
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg full-width"
                disabled={loading}
              >
                {loading ? "Booking Appointment..." : "Book Appointment"}
              </button>
            </form>
          </div>

          {/* Appointment Summary */}
          <div className="appointment-summary">
            <div className="summary-card card">
              <div className="card-header">
                <h3>Appointment Summary</h3>
              </div>
              <div className="card-body">
                {selectedService ? (
                  <>
                    <div className="summary-item">
                      <span className="label">Service:</span>
                      <span className="value">{selectedService.name}</span>
                    </div>
                    <div className="summary-item">
                      <span className="label">Price:</span>
                      <span className="value price">
                        ${selectedService.price}
                      </span>
                    </div>
                    <div className="summary-item">
                      <span className="label">Duration:</span>
                      <span className="value">
                        {selectedService.duration} minutes
                      </span>
                    </div>
                    {formData.appointmentDate && (
                      <div className="summary-item">
                        <span className="label">Date:</span>
                        <span className="value">
                          {new Date(
                            formData.appointmentDate
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                    {formData.appointmentTime && (
                      <div className="summary-item">
                        <span className="label">Time:</span>
                        <span className="value">
                          {formData.appointmentTime}
                        </span>
                      </div>
                    )}
                  </>
                ) : (
                  <p className="no-service">
                    Please select a service to see details
                  </p>
                )}
              </div>
            </div>

            <div className="contact-info card">
              <div className="card-header">
                <h4>Need Help?</h4>
              </div>
              <div className="card-body">
                <p>📞 (555) 123-4567</p>
                <p>✉️ info@autocarepro.com</p>
                <p>🕒 Mon-Fri: 8AM-6PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .page-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .page-title {
          font-size: 2.5rem;
          color: var(--dark-gray);
          margin-bottom: 1rem;
        }

        .page-subtitle {
          font-size: 1.1rem;
          color: var(--neutral-gray);
        }

        .appointment-container {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 3rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .appointment-form {
          background: var(--white);
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .form-section {
          margin-bottom: 2rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid #e5e7eb;
        }

        .form-section:last-child {
          border-bottom: none;
          margin-bottom: 0;
        }

        .section-title {
          color: var(--primary-blue);
          margin-bottom: 1.5rem;
          font-size: 1.3rem;
        }

        .datetime-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .vehicle-grid {
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

        .appointment-summary {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .summary-card {
          position: sticky;
          top: 100px;
        }

        .summary-item {
          display: flex;
          justify-content: space-between;
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid #f3f4f6;
        }

        .summary-item:last-child {
          border-bottom: none;
          margin-bottom: 0;
        }

        .label {
          font-weight: 500;
          color: var(--neutral-gray);
        }

        .value {
          font-weight: 600;
          color: var(--dark-gray);
        }

        .price {
          color: var(--accent-orange);
          font-size: 1.2rem;
        }

        .no-service {
          text-align: center;
          color: var(--neutral-gray);
          font-style: italic;
        }

        .contact-info {
          background: linear-gradient(
            135deg,
            var(--primary-blue) 0%,
            var(--secondary-blue) 100%
          );
          color: var(--white);
        }

        .contact-info .card-header h4 {
          color: var(--white);
          margin: 0;
        }

        .contact-info p {
          margin-bottom: 0.5rem;
          opacity: 0.9;
        }

        @media (max-width: 768px) {
          .page-title {
            font-size: 2rem;
          }

          .appointment-container {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .datetime-grid,
          .vehicle-grid {
            grid-template-columns: 1fr;
          }

          .appointment-form {
            padding: 1.5rem;
          }

          .summary-card {
            position: static;
          }
        }
      `}</style>
    </div>
  );
};

export default BookAppointment;
