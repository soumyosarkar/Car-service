import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title fade-in">
                Professional Auto Care Services You Can Trust
              </h1>
              <p className="hero-subtitle fade-in">
                Expert automotive repair and maintenance services with over 15 years of experience. 
                From routine oil changes to complex engine repairs, we've got you covered.
              </p>
              <div className="hero-buttons fade-in">
                {isAuthenticated ? (
                  <Link to="/book-appointment" className="btn btn-primary btn-lg">
                    Book Service Now
                  </Link>
                ) : (
                  <Link to="/register" className="btn btn-primary btn-lg">
                    Get Started
                  </Link>
                )}
                <Link to="/services" className="btn btn-secondary btn-lg">
                  View Services
                </Link>
              </div>
            </div>
            <div className="hero-image">
              <img 
                src="https://images.pexels.com/photos/3807386/pexels-photo-3807386.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Professional Auto Mechanic"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features section">
        <div className="container">
          <h2 className="section-title">Why Choose AutoCare Pro?</h2>
          <div className="grid grid-3">
            <div className="feature-card card">
              <div className="feature-icon">🔧</div>
              <h3>Expert Technicians</h3>
              <p>ASE-certified mechanics with years of experience in all major car brands and models.</p>
            </div>
            <div className="feature-card card">
              <div className="feature-icon">⚡</div>
              <h3>Quick & Efficient</h3>
              <p>Fast turnaround times without compromising quality. Most services completed same day.</p>
            </div>
            <div className="feature-card card">
              <div className="feature-icon">💰</div>
              <h3>Fair Pricing</h3>
              <p>Transparent, competitive pricing with no hidden fees. Get the value you deserve.</p>
            </div>
            <div className="feature-card card">
              <div className="feature-icon">🛡️</div>
              <h3>Quality Guarantee</h3>
              <p>All repairs backed by our comprehensive warranty. Your satisfaction is guaranteed.</p>
            </div>
            <div className="feature-card card">
              <div className="feature-icon">📱</div>
              <h3>Easy Booking</h3>
              <p>Schedule appointments online 24/7. Track your service status in real-time.</p>
            </div>
            <div className="feature-card card">
              <div className="feature-icon">🚗</div>
              <h3>All Makes & Models</h3>
              <p>We service all vehicle types - from economy cars to luxury vehicles and trucks.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="services-preview section">
        <div className="container">
          <h2 className="section-title">Our Popular Services</h2>
          <div className="grid grid-2">
            <div className="service-preview-card card">
              <img 
                src="https://images.pexels.com/photos/4489702/pexels-photo-4489702.jpeg?auto=compress&cs=tinysrgb&w=600" 
                alt="Oil Change Service"
              />
              <div className="card-body">
                <h3>Oil Change & Filter</h3>
                <p>Keep your engine running smoothly with regular oil changes using premium oils.</p>
                <div className="price">Starting at ₹399</div>
              </div>
            </div>
            <div className="service-preview-card card">
              <img 
                src="https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=600" 
                alt="Brake Service"
              />
              <div className="card-body">
                <h3>Brake Inspection & Repair</h3>
                <p>Ensure your safety with comprehensive brake system inspection and repair.</p>
                <div className="price">Starting at ₹899</div>
              </div>
            </div>
          </div>
          <div className="text-center mt-4">
            <Link to="/services" className="btn btn-primary">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Get Started?</h2>
            <p>Join thousands of satisfied customers who trust AutoCare Pro for their vehicle needs.</p>
            {isAuthenticated ? (
              <Link to="/book-appointment" className="btn btn-accent btn-lg">
                Book Your Service Today
              </Link>
            ) : (
              <div className="cta-buttons">
                <Link to="/register" className="btn btn-accent btn-lg">
                  Create Account
                </Link>
                <Link to="/contact" className="btn btn-secondary btn-lg">
                  Contact Us
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;