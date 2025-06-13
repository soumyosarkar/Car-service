const About = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">About AutoCare Pro</h1>
            <p className="hero-subtitle">
              Your trusted automotive service partner for over 15 years
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="story-section section">
        <div className="container">
          <div className="story-content">
            <div className="story-text">
              <h2>Our Story</h2>
              <p>
                Founded in 2008, AutoCare Pro began as a small family-owned garage with a simple mission: 
                to provide honest, reliable automotive service that customers can trust. What started with 
                just two mechanics and a passion for cars has grown into the region's premier automotive 
                service center.
              </p>
              <p>
                Today, we proudly serve thousands of customers with our team of ASE-certified technicians, 
                state-of-the-art equipment, and unwavering commitment to quality. Our reputation is built 
                on transparency, expertise, and genuine care for our customers and their vehicles.
              </p>
            </div>
            <div className="story-image">
              <img 
                src="https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="AutoCare Pro Workshop"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section section">
        <div className="container">
          <h2 className="section-title">Our Core Values</h2>
          <div className="values-grid grid grid-3">
            <div className="value-card card">
              <div className="value-icon">🏆</div>
              <h3>Excellence</h3>
              <p>We strive for perfection in every service, using only the highest quality parts and latest diagnostic equipment.</p>
            </div>
            <div className="value-card card">
              <div className="value-icon">🤝</div>
              <h3>Integrity</h3>
              <p>Honest pricing, transparent communication, and ethical practices are the foundation of our business.</p>
            </div>
            <div className="value-card card">
              <div className="value-icon">⚡</div>
              <h3>Efficiency</h3>
              <p>We respect your time and work efficiently to get you back on the road as quickly as possible.</p>
            </div>
            <div className="value-card card">
              <div className="value-icon">💡</div>
              <h3>Innovation</h3>
              <p>We continuously invest in the latest technology and training to stay ahead of automotive advances.</p>
            </div>
            <div className="value-card card">
              <div className="value-icon">🌱</div>
              <h3>Sustainability</h3>
              <p>Environmental responsibility guides our practices, from waste disposal to energy-efficient operations.</p>
            </div>
            <div className="value-card card">
              <div className="value-icon">❤️</div>
              <h3>Community</h3>
              <p>We're proud to be part of this community and actively support local initiatives and charities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section section">
        <div className="container">
          <h2 className="section-title">Meet Our Expert Team</h2>
          <div className="team-grid grid grid-3">
            <div className="team-member card">
              <img 
                src="https://images.pexels.com/photos/1516706/pexels-photo-1516706.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Mike Johnson"
              />
              <div className="member-info">
                <h3>Mike Johnson</h3>
                <p className="member-title">Master Technician & Owner</p>
                <p className="member-description">
                  With 20+ years in automotive repair, Mike is ASE Master certified and leads our team with expertise and passion.
                </p>
              </div>
            </div>
            <div className="team-member card">
              <img 
                src="https://images.pexels.com/photos/762080/pexels-photo-762080.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Sarah Martinez"
              />
              <div className="member-info">
                <h3>Sarah Martinez</h3>
                <p className="member-title">Service Advisor</p>
                <p className="member-description">
                  Sarah ensures every customer receives personalized attention and clear communication throughout their service experience.
                </p>
              </div>
            </div>
            <div className="team-member card">
              <img 
                src="https://images.pexels.com/photos/1139743/pexels-photo-1139743.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="David Chen"
              />
              <div className="member-info">
                <h3>David Chen</h3>
                <p className="member-title">Diagnostic Specialist</p>
                <p className="member-description">
                  David's expertise in computerized diagnostics helps us quickly identify and resolve even the most complex issues.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">15+</div>
              <div className="stat-label">Years in Business</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">10,000+</div>
              <div className="stat-label">Happy Customers</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">25,000+</div>
              <div className="stat-label">Services Completed</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">98%</div>
              <div className="stat-label">Customer Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="certifications-section section">
        <div className="container">
          <h2 className="section-title">Our Certifications & Partnerships</h2>
          <div className="certifications-grid">
            <div className="certification-item">
              <div className="cert-icon">🏅</div>
              <h4>ASE Certified</h4>
              <p>All our technicians are ASE certified, ensuring the highest standards of automotive service.</p>
            </div>
            <div className="certification-item">
              <div className="cert-icon">🛡️</div>
              <h4>AAA Approved</h4>
              <p>Proud member of the AAA Approved Auto Repair network, meeting strict quality standards.</p>
            </div>
            <div className="certification-item">
              <div className="cert-icon">🌟</div>
              <h4>Better Business Bureau</h4>
              <p>A+ rating with the BBB, reflecting our commitment to customer satisfaction and ethical practices.</p>
            </div>
            <div className="certification-item">
              <div className="cert-icon">🔧</div>
              <h4>Factory Authorized</h4>
              <p>Authorized service center for major automotive brands, ensuring proper repairs and warranty coverage.</p>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .about-hero {
          background: linear-gradient(135deg, var(--primary-blue) 0%, var(--secondary-blue) 100%);
          color: var(--white);
          padding: 6rem 0;
          text-align: center;
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }

        .hero-subtitle {
          font-size: 1.3rem;
          opacity: 0.9;
          max-width: 600px;
          margin: 0 auto;
        }

        .story-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        .story-text h2 {
          color: var(--primary-blue);
          margin-bottom: 2rem;
          font-size: 2.5rem;
        }

        .story-text p {
          color: var(--neutral-gray);
          line-height: 1.8;
          margin-bottom: 1.5rem;
          font-size: 1.1rem;
        }

        .story-image img {
          width: 100%;
          height: 400px;
          object-fit: cover;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .values-section {
          background-color: var(--light-gray);
        }

        .section-title {
          text-align: center;
          color: var(--dark-gray);
          margin-bottom: 3rem;
          font-size: 2.5rem;
        }

        .value-card {
          text-align: center;
          padding: 2.5rem 2rem;
          height: 100%;
        }

        .value-icon {
          font-size: 3.5rem;
          margin-bottom: 1.5rem;
        }

        .value-card h3 {
          color: var(--primary-blue);
          margin-bottom: 1rem;
          font-size: 1.3rem;
        }

        .value-card p {
          color: var(--neutral-gray);
          line-height: 1.6;
        }

        .team-member img {
          width: 100%;
          height: 250px;
          object-fit: cover;
        }

        .member-info {
          padding: 1.5rem;
        }

        .member-info h3 {
          color: var(--primary-blue);
          margin-bottom: 0.5rem;
        }

        .member-title {
          color: var(--accent-orange);
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .member-description {
          color: var(--neutral-gray);
          line-height: 1.6;
        }

        .stats-section {
          background: linear-gradient(135deg, var(--dark-gray) 0%, var(--black) 100%);
          color: var(--white);
          padding: 4rem 0;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
          text-align: center;
        }

        .stat-number {
          font-size: 3rem;
          font-weight: 700;
          color: var(--accent-orange);
          margin-bottom: 0.5rem;
        }

        .stat-label {
          font-size: 1.1rem;
          opacity: 0.9;
        }

        .certifications-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }

        .certification-item {
          text-align: center;
          padding: 2rem;
          background: var(--white);
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease;
        }

        .certification-item:hover {
          transform: translateY(-5px);
        }

        .cert-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .certification-item h4 {
          color: var(--primary-blue);
          margin-bottom: 1rem;
        }

        .certification-item p {
          color: var(--neutral-gray);
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }

          .story-content {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .story-text h2 {
            font-size: 2rem;
          }

          .section-title {
            font-size: 2rem;
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .stat-number {
            font-size: 2.5rem;
          }

          .certifications-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default About;