import { useState } from 'react';
import '../styles/Auth.css';

export default function VenueSignUpSignIn() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [formData, setFormData] = useState({
    venueName: '',
    location: '',
    capacity: '',
    venueType: 'Select venue type',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isSignIn) {
      // Simple sign in validation
      if (formData.email && formData.password) {
        console.log('Venue Sign In:', { email: formData.email, password: formData.password });
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setFormData({ ...formData, email: '', password: '' });
        }, 3000);
      }
    } else {
      // Sign up validation
      if (formData.venueName && formData.location && formData.capacity && formData.venueType !== 'Select venue type' && formData.email && formData.password && formData.confirmPassword) {
        if (formData.password === formData.confirmPassword) {
          console.log('Venue Sign Up:', formData);
          setSubmitted(true);
          setTimeout(() => {
            setSubmitted(false);
            setFormData({
              venueName: '',
              location: '',
              capacity: '',
              venueType: 'Select venue type',
              email: '',
              password: '',
              confirmPassword: ''
            });
          }, 3000);
        } else {
          alert('Passwords do not match');
        }
      } else {
        alert('Please fill in all fields');
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-toggle">
          <button
            className={`toggle-btn ${isSignIn ? 'active' : ''}`}
            onClick={() => setIsSignIn(true)}
          >
            Sign In
          </button>
          <button
            className={`toggle-btn ${!isSignIn ? 'active' : ''}`}
            onClick={() => setIsSignIn(false)}
          >
            Sign Up
          </button>
        </div>

        {submitted && (
          <div className="success-message">
            ✓ {isSignIn ? 'Sign in' : 'Registration'} successful!
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          {isSignIn ? (
            <>
              <h2>Welcome Back</h2>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button type="submit" className="submit-btn">Sign In</button>
            </>
          ) : (
            <>
              <h2>Register Your Venue</h2>
              <div className="form-group">
                <label>Venue Name</label>
                <input
                  type="text"
                  name="venueName"
                  placeholder="Your venue name"
                  value={formData.venueName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  placeholder="City or address"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Capacity</label>
                <input
                  type="number"
                  name="capacity"
                  placeholder="Maximum attendees"
                  value={formData.capacity}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Venue Type</label>
                <select
                  name="venueType"
                  value={formData.venueType}
                  onChange={handleInputChange}
                  required
                >
                  <option>Select venue type</option>
                  <option>Indoor Studio</option>
                  <option>Outdoor Garden</option>
                  <option>Banquet Hall</option>
                  <option>Nightclub</option>
                  <option>Theater</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button type="submit" className="submit-btn">Create Account</button>
            </>
          )}
        </form>

        <div className="auth-link">
          {isSignIn ? (
            <>
              <p>Don't have a venue? <button onClick={() => setIsSignIn(false)}>Register here</button></p>
            </>
          ) : (
            <>
              <p>Already registered? <button onClick={() => setIsSignIn(true)}>Sign in here</button></p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
