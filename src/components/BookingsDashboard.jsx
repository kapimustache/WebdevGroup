import { useState } from 'react';
import '../styles/Dashboard.css';

export default function BookingsDashboard({ initialBookings, artists, venues }) {
  const [bookings, setBookings] = useState(initialBookings || []);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    artist: '',
    venue: '',
    date: '',
    status: 'pending',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddBooking = () => {
    if (formData.artist && formData.venue && formData.date) {
      const newBooking = {
        id: Date.now(),
        artistId: parseInt(formData.artist),
        venueId: parseInt(formData.venue),
        date: formData.date,
        status: formData.status,
      };
      setBookings(prev => [...prev, newBooking]);
      setFormData({ artist: '', venue: '', date: '', status: 'pending' });
      setShowForm(false);
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setBookings(prev =>
      prev.map(booking =>
        booking.id === id ? { ...booking, status: newStatus } : booking
      )
    );
  };

  const handleDeleteBooking = (id) => {
    setBookings(prev => prev.filter(booking => booking.id !== id));
  };

  const getArtistName = (id) => artists?.find(a => a.id === id)?.name || 'Unknown';
  const getVenueName = (id) => venues?.find(v => v.id === id)?.name || 'Unknown';

  const statusColors = {
    pending: '#FFA500',
    confirmed: '#4CAF50',
    cancelled: '#F44336',
    completed: '#2196F3',
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>📅 Bookings Management</h2>
        <button 
          className="btn-primary" 
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? '✕ Cancel' : '+ New Booking'}
        </button>
      </div>

      {showForm && (
        <div className="form-card">
          <h3>Create New Booking</h3>
          <div className="form-group">
            <label>Artist</label>
            <select 
              name="artist" 
              value={formData.artist} 
              onChange={handleInputChange}
            >
              <option value="">Select an artist</option>
              {artists?.map(artist => (
                <option key={artist.id} value={artist.id}>
                  {artist.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Venue</label>
            <select 
              name="venue" 
              value={formData.venue} 
              onChange={handleInputChange}
            >
              <option value="">Select a venue</option>
              {venues?.map(venue => (
                <option key={venue.id} value={venue.id}>
                  {venue.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Date</label>
            <input 
              type="date" 
              name="date" 
              value={formData.date} 
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Status</label>
            <select 
              name="status" 
              value={formData.status} 
              onChange={handleInputChange}
            >
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <button className="btn-primary" onClick={handleAddBooking}>
            Create Booking
          </button>
        </div>
      )}

      <div className="cards-grid">
        {bookings && bookings.length > 0 ? (
          bookings.map(booking => (
            <div key={booking.id} className="card">
              <div className="card-header">
                <h3>{getArtistName(booking.artistId)}</h3>
                <span 
                  className="status-badge"
                  style={{ backgroundColor: statusColors[booking.status] }}
                >
                  {booking.status}
                </span>
              </div>
              <div className="card-content">
                <p><strong>Venue:</strong> {getVenueName(booking.venueId)}</p>
                <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
              </div>
              <div className="card-footer">
                <select 
                  value={booking.status}
                  onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                  className="status-select"
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="completed">Completed</option>
                </select>
                <button 
                  className="btn-danger"
                  onClick={() => handleDeleteBooking(booking.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="empty-state">No bookings yet. Create one to get started!</p>
        )}
      </div>

      <div className="stats-section">
        <div className="stat">
          <h4>Total Bookings</h4>
          <p className="stat-number">{bookings?.length || 0}</p>
        </div>
        <div className="stat">
          <h4>Confirmed</h4>
          <p className="stat-number">{bookings?.filter(b => b.status === 'confirmed').length || 0}</p>
        </div>
        <div className="stat">
          <h4>Pending</h4>
          <p className="stat-number">{bookings?.filter(b => b.status === 'pending').length || 0}</p>
        </div>
      </div>
    </div>
  );
}
