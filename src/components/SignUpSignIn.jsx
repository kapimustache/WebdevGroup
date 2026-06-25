import { useState } from 'react';
import '../styles/Auth.css';

export default function SignUpSignIn() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    artistName: '',
    genre: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignIn) {
      if (formData.email && formData.password) {
        setSubmitted(true);
        setFormData({ email: '', password: '', confirmPassword: '', artistName: '', genre: '' });
        setTimeout(() => setSubmitted(false), 3000);
      }
    } else {
      if (formData.email && formData.password && formData.confirmPassword && formData.artistName && formData.genre) {
        if (formData.password === formData.confirmPassword) {
          setSubmitted(true);
          setFormData({ email: '', password: '', confirmPassword: '', artistName: '', genre: '' });
          setTimeout(() => setSubmitted(false), 3000);
        } else {
          alert('Passwords do not match!');
        }
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

        <form onSubmit={handleSubmit} className="auth-form">
          <h2>{isSignIn ? 'Welcome Back' : 'Join as an Artist'}</h2>
          
          {!isSignIn && (
            <>
              <div className="form-group">
                <label>Artist Name</label>
                <input 
                  type="text" 
                  name="artistName"
                  value={formData.artistName}
                  onChange={handleInputChange}
                  placeholder="Your artist name"
                  required={!isSignIn}
                />
              </div>

              <div className="form-group">
                <label>Genre</label>
                <select 
                  name="genre"
                  value={formData.genre}
                  onChange={handleInputChange}
                  required={!isSignIn}
                >
                  <option value="">Select your genre</option>
                  <option value="Gospel">Gospel</option>
                  <option value="Afro Pop">Afro Pop</option>
                  <option value="Poetry & Spoken Word">Poetry & Spoken Word</option>
                  <option value="Jazz">Jazz</option>
                  <option value="Rock">Rock</option>
                  <option value="Classical">Classical</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </>
          )}

          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="••••••••"
              required
            />
          </div>

          {!isSignIn && (
            <div className="form-group">
              <label>Confirm Password</label>
              <input 
                type="password" 
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="••••••••"
                required={!isSignIn}
              />
            </div>
          )}

          <button type="submit" className="submit-btn">
            {isSignIn ? 'Sign In' : 'Create Account'}
          </button>

          {submitted && (
            <div className="success-message">
              ✅ {isSignIn ? 'Signed in successfully!' : 'Account created successfully!'}
            </div>
          )}
        </form>

        <div className="auth-footer">
          <p>{isSignIn ? "Don't have an account?" : 'Already have an account?'}</p>
          <button 
            className="link-btn"
            onClick={() => setIsSignIn(!isSignIn)}
          >
            {isSignIn ? 'Sign up here' : 'Sign in here'}
          </button>
        </div>
      </div>
    </div>
  );
}
