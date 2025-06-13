import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/services');
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(service => service.category === selectedCategory);

  const categories = [
    { value: 'all', label: 'All Services' },
    { value: 'maintenance', label: 'Maintenance' },
    { value: 'repair', label: 'Repair' },
    { value: 'inspection', label: 'Inspection' },
    { value: 'emergency', label: 'Emergency' }
  ];

  if (loading) {
    return (
      <div className="services-page">
        <div className="container">
          <div className="loading-spinner">Loading services...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="services-page">
      {/* Hero Section */}
      <section className="services-hero">
        <div className="container">
          <h1 className="page-title">Our Professional Services</h1>
          <p className="page-subtitle">
            Comprehensive automotive care from routine maintenance to complex repairs
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-content section">
        <div className="container">
          {/* Category Filter */}
          <div className="category-filter">
            {categories.map(category => (
              <button
                key={category.value}
                className={`filter-btn ${selectedCategory === category.value ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.value)}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Services Grid */}
          {filteredServices.length > 0 ? (
            <div className="services-grid grid grid-3">
              {filteredServices.map(service => (
                <div key={service._id} className="service-card card">
                  <div className="service-icon">
                    {getCategoryIcon(service.category)}
                  </div>
                  <div className="card-body">
                    <h3 className="service-name">{service.name}</h3>
                    <p className="service-description">{service.description}</p>
                    <div className="service-details">
                      <div className="service-price">
                        ${service.price}
                      </div>
                      <div className="service-duration">
                        {service.duration} min
                      </div>
                    </div>
                    <div className="service-category">
                      <span className={`category-badge category-${service.category}`}>
                        {service.category}
                      </span>
                    </div>
                  </div>
                  <div className="card-footer">
                    {isAuthenticated ? (
                      <Link 
                        to="/book-appointment" 
                        state={{ selectedService: service }}
                        className="btn btn-primary full-width"
                      >
                        Book This Service
                      </Link>
                    ) : (
                      <Link to="/login" className="btn btn-primary full-width">
                        Login to Book
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-services">
              <h3>No services available</h3>
              <p>Please check back later or contact us for more information.</p>
            </div>
          )}

          {/* CTA Section */}
          <div className="services-cta">
            <div className="cta-card">
              <h2>Don't see what you need?</h2>
              <p>We offer many specialized services not listed here. Contact us for custom solutions.</p>
              <Link to="/contact" className="btn btn-accent">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .services-hero {
          background: linear-gradient(135deg, var(--dark-gray) 0%, var(--black) 100%);
          color: var(--white);
          padding: 4rem 0;
          text-align: center;
        }

        .page-title {
          font-size: 3rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }

        .page-subtitle {
          font-size: 1.2rem;
          opacity: 0.9;
          max-width: 600px;
          margin: 0 auto;
        }

        .category-filter {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 3rem;
          flex-wrap: wrap;
        }

        .filter-btn {
          padding: 10px 20px;
          border: 2px solid var(--primary-blue);
          background: transparent;
          color: var(--primary-blue);
          border-radius: 25px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 500;
        }

        .filter-btn:hover,
        .filter-btn.active {
          background: var(--primary-blue);
          color: var(--white);
        }

        .services-grid {
          margin-bottom: 4rem;
        }

        .service-card {
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .service-icon {
          font-size: 3rem;
          text-align: center;
          margin-bottom: 1rem;
        }

        .service-name {
          color: var(--primary-blue);
          margin-bottom: 1rem;
          text-align: center;
        }

        .service-description {
          color: var(--neutral-gray);
          margin-bottom: 1.5rem;
          flex-grow: 1;
        }

        .service-details {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          padding: 1rem;
          background: var(--light-gray);
          border-radius: 8px;
        }

        .service-price {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--accent-orange);
        }

        .service-duration {
          color: var(--neutral-gray);
          font-weight: 500;
        }

        .service-category {
          margin-bottom: 1rem;
          text-align: center;
        }

        .category-badge {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.875rem;
          font-weight: 500;
          text-transform: capitalize;
        }

        .category-maintenance { background-color: #dbeafe; color: #1e40af; }
        .category-repair { background-color: #fed7aa; color: #c2410c; }
        .category-inspection { background-color: #dcfce7; color: #166534; }
        .category-emergency { background-color: #fee2e2; color: #991b1b; }

        .full-width {
          width: 100%;
        }

        .no-services {
          text-align: center;
          padding: 4rem 2rem;
          color: var(--neutral-gray);
        }

        .services-cta {
          text-align: center;
        }

        .cta-card {
          background: linear-gradient(135deg, var(--primary-blue) 0%, var(--secondary-blue) 100%);
          color: var(--white);
          padding: 3rem;
          border-radius: 12px;
          max-width: 500px;
          margin: 0 auto;
        }

        .cta-card h2 {
          margin-bottom: 1rem;
        }

        .cta-card p {
          margin-bottom: 2rem;
          opacity: 0.9;
        }

        .loading-spinner {
          text-align: center;
          padding: 4rem 0;
          font-size: 1.2rem;
          color: var(--neutral-gray);
        }

        @media (max-width: 768px) {
          .page-title {
            font-size: 2.5rem;
          }

          .category-filter {
            flex-direction: column;
            align-items: center;
          }

          .filter-btn {
            width: 200px;
          }

          .services-grid {
            grid-template-columns: 1fr;
          }

          .service-details {
            flex-direction: column;
            gap: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

// Helper function to get category icons
const getCategoryIcon = (category) => {
  const icons = {
    maintenance: '🔧',
    repair: '⚙️',
    inspection: '🔍',
    emergency: '🚨'
  };
  return icons[category] || '🚗';
};

export default Services;