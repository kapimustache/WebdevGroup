import { useState } from 'react';
import '../styles/Dashboard.css';

export default function VenuesDashboard({ initialVenues }) {
  const [venues, setVenues] = useState(initialVenues || []);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    capacity: '',
    style: '',
    amenities: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'capacity' ? parseInt(value) || '' : value,
    }));
  };

  const handleAddVenue = () => {
    if (formData.name && formData.location && formData.capacity) {
      const newVenue = {
        id: Date.now(),
        ...formData,
      };
      setVenues(prev => [...prev, newVenue]);
      setFormData({ name: '', location: '', capacity: '', style: '', amenities: '' });
      setShowForm(false);
    }
  };

  const handleDeleteVenue = (id) => {
    setVenues(prev => prev.filter(venue => venue.id !== id));
  };

  const getCapacityCategory = (capacity) => {
    if (capacity < 150) return { label: 'Intimate', color: '#FFD700' };
    if (capacity < 300) return { label: 'Medium', color: '#87CEEB' };
    if (capacity < 500) return { label: 'Large', color: '#FF69B4' };
    return { label: 'Mega', color: '#FF4500' };
  };

  const capacityPercentage = (capacity) => {
    const max = Math.max(...venues.map(v => v.capacity), 500);
    return (capacity / max) * 100;
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>🏛️ Venues & Locations</h2>
        <button 
          className="btn-primary" 
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? '✕ Cancel' : '+ Add Venue'}
        </button>
      </div>

      {showForm && (
        <div className="form-card">
          <h3>Add New Venue</h3>
          <div className="form-group">
            <label>Venue Name</label>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleInputChange}
              placeholder="Venue name"
            />
          </div>

          <div className="form-group">
            <label>Location</label>
            <input 
              type="text" 
              name="location" 
              value={formData.location} 
              onChange={handleInputChange}
              placeholder="City/Region"
            />
          </div>

          <div className="form-group">
            <label>Capacity</label>
            <input 
              type="number" 
              name="capacity" 
              value={formData.capacity} 
              onChange={handleInputChange}
              placeholder="Number of people"
              min="1"
            />
          </div>

          <div className="form-group">
            <label>Venue Style</label>
            <input 
              type="text" 
              name="style" 
              value={formData.style} 
              onChange={handleInputChange}
              placeholder="e.g., Indoor, Outdoor, Garden"
            />
          </div>

          <div className="form-group">
            <label>Amenities</label>
            <input 
              type="text" 
              name="amenities" 
              value={formData.amenities} 
              onChange={handleInputChange}
              placeholder="e.g., Parking, WiFi, Catering"
            />
          </div>

          <button className="btn-primary" onClick={handleAddVenue}>
            Add Venue
          </button>
        </div>
      )}

      <div className="cards-grid">
        {venues && venues.length > 0 ? (
          venues.map(venue => {
            const capacityInfo = getCapacityCategory(venue.capacity);
            return (
              <div key={venue.id} className="card venue-card">
                <div className="card-header">
                  <h3>{venue.name}</h3>
                  <span 
                    className="capacity-badge"
                    style={{ backgroundColor: capacityInfo.color }}
                  >
                    {capacityInfo.label}
                  </span>
                </div>
                <div className="card-content">
                  <p><strong>Location:</strong> {venue.location}</p>
                  <p><strong>Capacity:</strong> {venue.capacity} people</p>
                  
                  <div className="capacity-bar">
                    <div 
                      className="capacity-fill"
                      style={{ 
                        width: `${capacityPercentage(venue.capacity)}%`,
                        backgroundColor: capacityInfo.color
                      }}
                    ></div>
                  </div>

                  <p><strong>Style:</strong> {venue.style}</p>
                  
                  {venue.amenities && (
                    <div className="amenities">
                      <strong>Amenities:</strong>
                      <div className="amenity-list">
                        {venue.amenities.split(',').map((amenity, idx) => (
                          <span key={idx} className="amenity-tag">
                            {amenity.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="card-footer">
                  <button 
                    className="btn-danger"
                    onClick={() => handleDeleteVenue(venue.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p className="empty-state">No venues yet. Add one to get started!</p>
        )}
      </div>

      <div className="stats-section">
        <div className="stat">
          <h4>Total Venues</h4>
          <p className="stat-number">{venues?.length || 0}</p>
        </div>
        <div className="stat">
          <h4>Total Capacity</h4>
          <p className="stat-number">
            {venues?.reduce((sum, v) => sum + v.capacity, 0).toLocaleString() || 0}
          </p>
        </div>
        <div className="stat">
          <h4>Avg. Capacity</h4>
          <p className="stat-number">
            {venues?.length > 0 
              ? Math.round(venues.reduce((sum, v) => sum + v.capacity, 0) / venues.length)
              : 'N/A'
            }
          </p>
        </div>
      </div>
    </div>
  );
}
