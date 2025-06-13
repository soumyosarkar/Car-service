import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    fetchAppointments();
  }, [isAuthenticated, navigate]);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/appointments/my-appointments');
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'status-pending',
      confirmed: 'status-confirmed',
      'in-progress': 'status-in-progress',
      completed: 'status-completed',
      cancelled: 'status-cancelled'
    };
    return colors[status] || 'status-pending';
  };

  if (loading) {
    return (
      <div className="my-appointments-page">
        <div className="container">
          <div className="loading-spinner">Loading your appointments...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="my-appointments-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">My Appointments</h1>
          <p className="page-subtitle">Track and manage your service appointments</p>
          <Link to="/book-appointment" className="btn btn-primary">
            Book New Appointment
          </Link>
        </div>

        {appointments.length > 0 ? (
          <div className="appointments-grid">
            {appointments.map(appointment => (
              <div key={appointment._id} className="appointment-card card">
                <div className="card-header">
                  <div className="appointment-header">
                    <h3 className="service-name">{appointment.service?.name}</h3>
                    <span className={`status-badge ${getStatusColor(appointment.status)}`}>
                      {appointment.status}
                    </span>
                  </div>
                </div>
                
                <div className="card-body">
                  <div className="appointment-details">
                    <div className="detail-row">
                      <span className="detail-label">📅 Date:</span>
                      <span className="detail-value">
                        {new Date(appointment.appointmentDate).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <div className="detail-row">
                      <span className="detail-label">🕒 Time:</span>
                      <span className="detail-value">{appointment.appointmentTime}</span>
                    </div>
                    
                    <div className="detail-row">
                      <span className="detail-label">🚗 Vehicle:</span>
                      <span className="detail-value">
                        {appointment.vehicleInfo.year} {appointment.vehicleInfo.make} {appointment.vehicleInfo.model}
                      </span>
                    </div>
                    
                    <div className="detail-row">
                      <span className="detail-label">🏷️ Plate:</span>
                      <span className="detail-value">{appointment.vehicleInfo.plateNumber}</span>
                    </div>
                    
                    <div className="detail-row">
                      <span className="detail-label">💰 Price:</span>
                      <span className="detail-value price">${appointment.service?.price}</span>
                    </div>
                    
                    <div className="detail-row">
                      <span className="detail-label">⏱️ Duration:</span>
                      <span className="detail-value">{appointment.service?.duration} min</span>
                    </div>

                    {appointment.notes && (
                      <div className="notes-section">
                        <span className="detail-label">📝 Notes:</span>
                        <p className="notes-text">{appointment.notes}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="card-footer">
                  <div className="appointment-actions">
                    <small className="created-date">
                      Booked on {new Date(appointment.createdAt).toLocaleDateString()}
                    </small>
                    {appointment.status === 'pending' && (
                      <div className="status-info">
                        <span className="info-text">⏳ Awaiting confirmation</span>
                      </div>
                    )}
                    {appointment.status === 'confirmed' && (
                      <div className="status-info">
                        <span className="info-text">✅ Confirmed - See you soon!</span>
                      </div>
                    )}
                    {appointment.status === 'in-progress' && (
                      <div className="status-info">
                        <span className="info-text">🔧 Service in progress</span>
                      </div>
                    )}
                    {appointment.status === 'completed' && (
                      <div className="status-info">
                        <span className="info-text">🎉 Service completed</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-appointments">
            <div className="no-appointments-content">
              <div className="no-appointments-icon">📅</div>
              <h3>No Appointments Yet</h3>
              <p>You haven't booked any appointments yet. Get started by scheduling your first service!</p>
              <Link to="/book-appointment" className="btn btn-primary btn-lg">
                Book Your First Appointment
              </Link>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 3rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .page-title {
          font-size: 2.5rem;
          color: var(--dark-gray);
          margin: 0;
        }

        .page-subtitle {
          color: var(--neutral-gray);
          margin: 0.5rem 0 0 0;
        }

        .appointments-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
          gap: 2rem;
        }

        .appointment-card {
          height: fit-content;
        }

        .appointment-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .service-name {
          color: var(--primary-blue);
          margin: 0;
          font-size: 1.3rem;
        }

        .appointment-details {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .detail-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid #f3f4f6;
        }

        .detail-row:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .detail-label {
          font-weight: 500;
          color: var(--neutral-gray);
          font-size: 0.9rem;
        }

        .detail-value {
          font-weight: 600;
          color: var(--dark-gray);
        }

        .price {
          color: var(--accent-orange);
          font-size: 1.1rem;
        }

        .notes-section {
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid #e5e7eb;
        }

        .notes-text {
          margin-top: 0.5rem;
          color: var(--neutral-gray);
          line-height: 1.5;
          font-style: italic;
        }

        .appointment-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .created-date {
          color: var(--neutral-gray);
          font-size: 0.875rem;
        }

        .status-info {
          text-align: right;
        }

        .info-text {
          font-size: 0.875rem;
          font-weight: 500;
        }

        .no-appointments {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 400px;
        }

        .no-appointments-content {
          text-align: center;
          max-width: 400px;
        }

        .no-appointments-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
        }

        .no-appointments-content h3 {
          color: var(--dark-gray);
          margin-bottom: 1rem;
        }

        .no-appointments-content p {
          color: var(--neutral-gray);
          margin-bottom: 2rem;
          line-height: 1.6;
        }

        .loading-spinner {
          text-align: center;
          padding: 4rem 0;
          font-size: 1.2rem;
          color: var(--neutral-gray);
        }

        @media (max-width: 768px) {
          .page-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .page-title {
            font-size: 2rem;
          }

          .appointments-grid {
            grid-template-columns: 1fr;
          }

          .appointment-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }

          .appointment-actions {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }

          .status-info {
            text-align: left;
          }
        }
      `}</style>
    </div>
  );
};

export default MyAppointments;