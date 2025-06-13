import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

const AdminDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("appointments");
  const [showAddServiceForm, setShowAddServiceForm] = useState(false);
  const [newService, setNewService] = useState({
    name: "",
    description: "",
    price: "",
    duration: "",
    category: "maintenance", // Default category
  });
  const { user, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      navigate("/");
      return;
    }
    fetchData();
  }, [isAuthenticated, isAdmin, navigate]);

  const fetchData = async () => {
    try {
      const [appointmentsRes, servicesRes] = await Promise.all([
        axios.get(
          "https://car-service-backend-zqmk.onrender.com/api/appointments"
        ),
        axios.get("https://car-service-backend-zqmk.onrender.com/api/services"),
      ]);
      setAppointments(appointmentsRes.data);
      setServices(servicesRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateAppointmentStatus = async (appointmentId, newStatus) => {
    try {
      await axios.put(
        `https://car-service-backend-zqmk.onrender.com/api/appointments/${appointmentId}/status`,
        {
          status: newStatus,
        }
      );
      fetchData(); // Refresh data
    } catch (error) {
      console.error("Error updating appointment status:", error);
      alert("Failed to update appointment status");
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: "status-pending",
      confirmed: "status-confirmed",
      "in-progress": "status-in-progress",
      completed: "status-completed",
      cancelled: "status-cancelled",
    };
    return colors[status] || "status-pending";
  };

  const getStats = () => {
    const totalAppointments = appointments.length;
    const pendingAppointments = appointments.filter(
      (apt) => apt.status === "pending"
    ).length;
    const todayAppointments = appointments.filter((apt) => {
      const today = new Date().toDateString();
      const aptDate = new Date(apt.appointmentDate).toDateString();
      return today === aptDate;
    }).length;
    const totalRevenue = appointments
      .filter((apt) => apt.status === "completed")
      .reduce((sum, apt) => sum + (apt.service?.price || 0), 0);

    return {
      totalAppointments,
      pendingAppointments,
      todayAppointments,
      totalRevenue,
    };
  };

  const stats = getStats();

  const handleAddService = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://car-service-backend-zqmk.onrender.com/api/services",
        newService
      );
      fetchData();
      setShowAddServiceForm(false);
      setNewService({
        name: "",
        description: "",
        price: "",
        duration: "",
        category: "maintenance",
      });
    } catch (error) {
      console.error("Error adding new service:", error);
      alert("Failed to add new service");
    }
  };

  const handleNewServiceChange = (e) => {
    const { name, value } = e.target;
    setNewService((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="container">
          <div className="loading-spinner">Loading dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Admin Dashboard</h1>
          <p className="dashboard-subtitle">Welcome back, {user?.name}</p>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card card">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <div className="stat-number">{stats.totalAppointments}</div>
              <div className="stat-label">Total Appointments</div>
            </div>
          </div>
          <div className="stat-card card">
            <div className="stat-icon">⏳</div>
            <div className="stat-content">
              <div className="stat-number">{stats.pendingAppointments}</div>
              <div className="stat-label">Pending Approval</div>
            </div>
          </div>
          <div className="stat-card card">
            <div className="stat-icon">📅</div>
            <div className="stat-content">
              <div className="stat-number">{stats.todayAppointments}</div>
              <div className="stat-label">Today's Appointments</div>
            </div>
          </div>
          <div className="stat-card card">
            <div className="stat-icon">💰</div>
            <div className="stat-content">
              <div className="stat-number">${stats.totalRevenue}</div>
              <div className="stat-label">Total Revenue</div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="tab-navigation">
          <button
            className={`tab-btn ${
              activeTab === "appointments" ? "active" : ""
            }`}
            onClick={() => setActiveTab("appointments")}
          >
            Appointments ({appointments.length})
          </button>
          <button
            className={`tab-btn ${activeTab === "services" ? "active" : ""}`}
            onClick={() => setActiveTab("services")}
          >
            Services ({services.length})
          </button>
          <button
            className="tab-btn btn-primary"
            onClick={() => setShowAddServiceForm(!showAddServiceForm)}
          >
            {showAddServiceForm ? "Cancel Add Service" : "Add New Service"}
          </button>
        </div>

        {/* Add New Service Form */}
        {showAddServiceForm && (
          <div className="add-service-form-section">
            <h2 className="section-title">Add New Service</h2>
            <form onSubmit={handleAddService} className="form-grid">
              <div className="form-group">
                <label htmlFor="serviceName" className="form-label">
                  Service Name *
                </label>
                <input
                  type="text"
                  id="serviceName"
                  name="name"
                  className="form-input"
                  value={newService.name}
                  onChange={handleNewServiceChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="serviceDescription" className="form-label">
                  Description *
                </label>
                <textarea
                  id="serviceDescription"
                  name="description"
                  className="form-input"
                  value={newService.description}
                  onChange={handleNewServiceChange}
                  rows="3"
                  required
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="servicePrice" className="form-label">
                  Price *
                </label>
                <input
                  type="number"
                  id="servicePrice"
                  name="price"
                  className="form-input"
                  value={newService.price}
                  onChange={handleNewServiceChange}
                  step="0.01"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="serviceDuration" className="form-label">
                  Duration (minutes) *
                </label>
                <input
                  type="number"
                  id="serviceDuration"
                  name="duration"
                  className="form-input"
                  value={newService.duration}
                  onChange={handleNewServiceChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="serviceCategory" className="form-label">
                  Category *
                </label>
                <select
                  id="serviceCategory"
                  name="category"
                  className="form-select"
                  value={newService.category}
                  onChange={handleNewServiceChange}
                  required
                >
                  <option value="maintenance">Maintenance</option>
                  <option value="repair">Repair</option>
                  <option value="inspection">Inspection</option>
                  <option value="emergency">Emergency</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary">
                Add Service
              </button>
            </form>
          </div>
        )}

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === "appointments" && (
            <div className="appointments-section">
              <h2 className="section-title">Manage Appointments</h2>
              {appointments.length > 0 ? (
                <div className="appointments-table">
                  <div className="table-header">
                    <div className="header-cell">Customer</div>
                    <div className="header-cell">Service</div>
                    <div className="header-cell">Date & Time</div>
                    <div className="header-cell">Vehicle</div>
                    <div className="header-cell">Status</div>
                    <div className="header-cell">Actions</div>
                  </div>
                  {appointments.map((appointment) => (
                    <div key={appointment._id} className="table-row">
                      <div className="table-cell">
                        <div className="customer-info">
                          <div className="customer-name">
                            {appointment.customer?.name}
                          </div>
                          <div className="customer-email">
                            {appointment.customer?.email}
                          </div>
                        </div>
                      </div>
                      <div className="table-cell">
                        <div className="service-info">
                          <div className="service-name">
                            {appointment.service?.name}
                          </div>
                          <div className="service-price">
                            ${appointment.service?.price}
                          </div>
                        </div>
                      </div>
                      <div className="table-cell">
                        <div className="datetime-info">
                          <div className="appointment-date">
                            {new Date(
                              appointment.appointmentDate
                            ).toLocaleDateString()}
                          </div>
                          <div className="appointment-time">
                            {appointment.appointmentTime}
                          </div>
                        </div>
                      </div>
                      <div className="table-cell">
                        <div className="vehicle-info">
                          <div className="vehicle-details">
                            {appointment.vehicleInfo.year}{" "}
                            {appointment.vehicleInfo.make}{" "}
                            {appointment.vehicleInfo.model}
                          </div>
                          <div className="vehicle-plate">
                            {appointment.vehicleInfo.plateNumber}
                          </div>
                        </div>
                      </div>
                      <div className="table-cell">
                        <span
                          className={`status-badge ${getStatusColor(
                            appointment.status
                          )}`}
                        >
                          {appointment.status}
                        </span>
                      </div>
                      <div className="table-cell">
                        <div className="action-buttons">
                          {appointment.status === "pending" && (
                            <button
                              className="btn btn-sm btn-success"
                              onClick={() =>
                                updateAppointmentStatus(
                                  appointment._id,
                                  "confirmed"
                                )
                              }
                            >
                              Confirm
                            </button>
                          )}
                          {appointment.status === "confirmed" && (
                            <button
                              className="btn btn-sm btn-warning"
                              onClick={() =>
                                updateAppointmentStatus(
                                  appointment._id,
                                  "in-progress"
                                )
                              }
                            >
                              Start
                            </button>
                          )}
                          {appointment.status === "in-progress" && (
                            <button
                              className="btn btn-sm btn-success"
                              onClick={() =>
                                updateAppointmentStatus(
                                  appointment._id,
                                  "completed"
                                )
                              }
                            >
                              Complete
                            </button>
                          )}
                          {(appointment.status === "pending" ||
                            appointment.status === "confirmed") && (
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() =>
                                updateAppointmentStatus(
                                  appointment._id,
                                  "cancelled"
                                )
                              }
                            >
                              Cancel
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-data">
                  <p>No appointments found.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === "services" && (
            <div className="services-section">
              <h2 className="section-title">Manage Services</h2>
              {services.length > 0 ? (
                <div className="services-grid">
                  {services.map((service) => (
                    <div key={service._id} className="service-admin-card card">
                      <div className="card-header">
                        <h3 className="service-name">{service.name}</h3>
                        <span
                          className={`category-badge category-${service.category}`}
                        >
                          {service.category}
                        </span>
                      </div>
                      <div className="card-body">
                        <p className="service-description">
                          {service.description}
                        </p>
                        <div className="service-details">
                          <div className="detail-item">
                            <span className="detail-label">Price:</span>
                            <span className="detail-value">
                              ${service.price}
                            </span>
                          </div>
                          <div className="detail-item">
                            <span className="detail-label">Duration:</span>
                            <span className="detail-value">
                              {service.duration} min
                            </span>
                          </div>
                          <div className="detail-item">
                            <span className="detail-label">Status:</span>
                            <span className="detail-value">
                              {service.isActive ? "✅ Active" : "❌ Inactive"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-data">
                  <p>No services found.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .dashboard-header {
          margin-bottom: 3rem;
        }

        .dashboard-title {
          font-size: 2.5rem;
          color: var(--dark-gray);
          margin-bottom: 0.5rem;
        }

        .dashboard-subtitle {
          color: var(--neutral-gray);
          font-size: 1.1rem;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 3rem;
        }

        .stat-card {
          display: flex;
          align-items: center;
          padding: 2rem;
          background: linear-gradient(
            135deg,
            var(--primary-blue) 0%,
            var(--secondary-blue) 100%
          );
          color: var(--white);
        }

        .stat-icon {
          font-size: 2.5rem;
          margin-right: 1.5rem;
        }

        .stat-number {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .stat-label {
          opacity: 0.9;
          font-size: 0.9rem;
        }

        .tab-navigation {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
          border-bottom: 2px solid #e5e7eb;
        }

        .tab-btn {
          padding: 1rem 2rem;
          border: none;
          background: none;
          color: var(--neutral-gray);
          font-weight: 500;
          cursor: pointer;
          border-bottom: 3px solid transparent;
          transition: all 0.3s ease;
        }

        .tab-btn.active {
          color: var(--primary-blue);
          border-bottom-color: var(--primary-blue);
        }

        .section-title {
          color: var(--dark-gray);
          margin-bottom: 2rem;
          font-size: 1.5rem;
        }

        .appointments-table {
          background: var(--white);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .table-header {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1fr 0.8fr 1.2fr;
          background: var(--light-gray);
          padding: 1rem;
          font-weight: 600;
          color: var(--dark-gray);
        }

        .table-row {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1fr 0.8fr 1.2fr;
          padding: 1rem;
          border-bottom: 1px solid #e5e7eb;
          align-items: center;
        }

        .table-row:last-child {
          border-bottom: none;
        }

        .customer-name {
          font-weight: 600;
          color: var(--dark-gray);
        }

        .customer-email {
          font-size: 0.875rem;
          color: var(--neutral-gray);
        }

        .service-name {
          font-weight: 600;
          color: var(--primary-blue);
        }

        .service-price {
          font-size: 0.875rem;
          color: var(--accent-orange);
          font-weight: 600;
        }

        .appointment-date {
          font-weight: 600;
          color: var(--dark-gray);
        }

        .appointment-time {
          font-size: 0.875rem;
          color: var(--neutral-gray);
        }

        .vehicle-details {
          font-weight: 600;
          color: var(--dark-gray);
        }

        .vehicle-plate {
          font-size: 0.875rem;
          color: var(--neutral-gray);
        }

        .action-buttons {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .btn-sm {
          padding: 6px 12px;
          font-size: 0.8rem;
        }

        .btn-success {
          background-color: var(--success-green);
          color: var(--white);
        }

        .btn-warning {
          background-color: var(--warning-yellow);
          color: var(--black);
        }

        .btn-danger {
          background-color: var(--error-red);
          color: var(--white);
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 1.5rem;
        }

        .service-admin-card .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .service-admin-card .service-name {
          color: var(--primary-blue);
          margin: 0;
        }

        .service-description {
          color: var(--neutral-gray);
          margin-bottom: 1.5rem;
        }

        .service-details {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .detail-item {
          display: flex;
          justify-content: space-between;
        }

        .detail-label {
          font-weight: 500;
          color: var(--neutral-gray);
        }

        .detail-value {
          font-weight: 600;
          color: var(--dark-gray);
        }

        .no-data {
          text-align: center;
          padding: 3rem;
          color: var(--neutral-gray);
        }

        .loading-spinner {
          text-align: center;
          padding: 4rem 0;
          font-size: 1.2rem;
          color: var(--neutral-gray);
        }

        @media (max-width: 768px) {
          .dashboard-title {
            font-size: 2rem;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .tab-navigation {
            flex-direction: column;
          }

          .appointments-table {
            overflow-x: auto;
          }

          .table-header,
          .table-row {
            grid-template-columns: 200px 150px 150px 150px 100px 150px;
            min-width: 900px;
          }

          .services-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
