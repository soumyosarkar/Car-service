import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    // Validate password length
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    const { confirmPassword, ...userData } = formData;
    const result = await register(userData);
    
    if (result.success) {
      navigate('/');
    } else {
      setError(result.message);
    }
    
    setLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="container">
        <div className="auth-container">
          <div className="auth-form-section">
            <div className="auth-form">
              <h1 className="auth-title">Create Account</h1>
              <p className="auth-subtitle">Join AutoCare Pro for easy appointment booking and service tracking</p>

              {error && (
                <div className="error-message">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-input"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-input"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone" className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="form-input"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-input"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="Create a password (min. 6 characters)"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className="form-input"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    placeholder="Confirm your password"
                  />
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary full-width"
                  disabled={loading}
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                </button>
              </form>

              <div className="auth-footer">
                <p>Already have an account? <Link to="/login">Sign in here</Link></p>
              </div>
            </div>
          </div>

          <div className="auth-image-section">
            <img 
              src="https://images.pexels.com/photos/3807386/pexels-photo-3807386.jpeg?auto=compress&cs=tinysrgb&w=800" 
              alt="Professional Auto Service"
            />
            <div className="image-overlay">
              <h2>Welcome to AutoCare Pro</h2>
              <p>Professional automotive services with easy online booking and expert care</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .auth-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          background: var(--light-gray);
          padding: 2rem 0;
        }

        .auth-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          max-width: 1000px;
          margin: 0 auto;
          background: var(--white);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);
        }

        .auth-form-section {
          padding: 3rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .auth-form {
          width: 100%;
          max-width: 400px;
        }

        .auth-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--dark-gray);
          margin-bottom: 0.5rem;
          text-align: center;
        }

        .auth-subtitle {
          color: var(--neutral-gray);
          text-align: center;
          margin-bottom: 2rem;
          line-height: 1.5;
        }

        .error-message {
          background: #fee2e2;
          color: #991b1b;
          padding: 12px 16px;
          border-radius: 8px;
          margin-bottom: 1.5rem;
          text-align: center;
          font-weight: 500;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: var(--dark-gray);
        }

        .form-input {
          width: 100%;
          padding: 14px 16px;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .form-input:focus {
          outline: none;
          border-color: var(--primary-blue);
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }

        .full-width {
          width: 100%;
          padding: 14px;
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .auth-footer {
          text-align: center;
          margin-top: 2rem;
          padding-top: 2rem;
          border-top: 1px solid #e5e7eb;
        }

        .auth-footer a {
          color: var(--primary-blue);
          text-decoration: none;
          font-weight: 600;
        }

        .auth-footer a:hover {
          text-decoration: underline;
        }

        .auth-image-section {
          position: relative;
          background: linear-gradient(135deg, var(--primary-blue) 0%, var(--secondary-blue) 100%);
        }

        .auth-image-section img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.3;
        }

        .image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: var(--white);
          padding: 2rem;
          text-align: center;
        }

        .image-overlay h2 {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }

        .image-overlay p {
          font-size: 1.1rem;
          opacity: 0.9;
        }

        @media (max-width: 768px) {
          .auth-container {
            grid-template-columns: 1fr;
            margin: 1rem;
          }

          .auth-form-section {
            padding: 2rem;
          }

          .auth-title {
            font-size: 2rem;
          }

          .auth-image-section {
            min-height: 200px;
          }

          .image-overlay h2 {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Register;