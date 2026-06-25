import { useState } from 'react';
import '../styles/Dashboard.css';

export default function ArtistsDashboard({ initialArtists }) {
  const [artists, setArtists] = useState(initialArtists || []);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    genre: '',
    location: '',
    rating: 4.5,
    style: '',
  });
  const [selectedArtist, setSelectedArtist] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' ? parseFloat(value) : value,
    }));
  };

  const handleAddArtist = () => {
    if (formData.name && formData.genre && formData.location) {
      const newArtist = {
        id: Date.now(),
        ...formData,
      };
      setArtists(prev => [...prev, newArtist]);
      setFormData({ name: '', genre: '', location: '', rating: 4.5, style: '' });
      setShowForm(false);
    }
  };

  const handleDeleteArtist = (id) => {
    setArtists(prev => prev.filter(artist => artist.id !== id));
    setSelectedArtist(null);
  };

  const handleUpdateRating = (id, newRating) => {
    setArtists(prev =>
      prev.map(artist =>
        artist.id === id ? { ...artist, rating: newRating } : artist
      )
    );
  };

  const genreColors = {
    'Gospel': '#FF6B6B',
    'Afro Pop': '#4ECDC4',
    'Poetry & Spoken Word': '#95E1D3',
    'Jazz': '#F38181',
    'Rock': '#AA96DA',
    'Classical': '#FCBAD3',
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>🎤 Artists Directory</h2>
        <button 
          className="btn-primary" 
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? '✕ Cancel' : '+ Add Artist'}
        </button>
      </div>

      {showForm && (
        <div className="form-card">
          <h3>Add New Artist</h3>
          <div className="form-group">
            <label>Name</label>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleInputChange}
              placeholder="Artist name"
            />
          </div>

          <div className="form-group">
            <label>Genre</label>
            <input 
              type="text" 
              name="genre" 
              value={formData.genre} 
              onChange={handleInputChange}
              placeholder="e.g., Gospel, Jazz, Afro Pop"
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
            <label>Rating (0-5)</label>
            <input 
              type="number" 
              name="rating" 
              min="0" 
              max="5" 
              step="0.1"
              value={formData.rating} 
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Performance Style</label>
            <input 
              type="text" 
              name="style" 
              value={formData.style} 
              onChange={handleInputChange}
              placeholder="e.g., Live performance, DJ, Band"
            />
          </div>

          <button className="btn-primary" onClick={handleAddArtist}>
            Add Artist
          </button>
        </div>
      )}

      <div className="cards-grid">
        {artists && artists.length > 0 ? (
          artists.map(artist => (
            <div 
              key={artist.id} 
              className="card artist-card"
              style={{ borderTop: `4px solid ${genreColors[artist.genre] || '#9C27B0'}` }}
            >
              <div className="card-header">
                <h3>{artist.name}</h3>
                <div className="rating">
                  {'⭐'.repeat(Math.floor(artist.rating))} {artist.rating}
                </div>
              </div>
              <div className="card-content">
                <p>
                  <strong>Genre:</strong> 
                  <span 
                    className="genre-badge"
                    style={{ backgroundColor: genreColors[artist.genre] || '#9C27B0' }}
                  >
                    {artist.genre}
                  </span>
                </p>
                <p><strong>Location:</strong> {artist.location}</p>
                <p><strong>Style:</strong> {artist.style}</p>
              </div>
              <div className="card-footer">
                <div className="rating-controls">
                  <button 
                    onClick={() => handleUpdateRating(artist.id, Math.max(0, artist.rating - 0.5))}
                  >
                    👇
                  </button>
                  <button 
                    onClick={() => handleUpdateRating(artist.id, Math.min(5, artist.rating + 0.5))}
                  >
                    👆
                  </button>
                </div>
                <button 
                  className="btn-danger"
                  onClick={() => handleDeleteArtist(artist.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="empty-state">No artists in directory yet. Add one to get started!</p>
        )}
      </div>

      <div className="stats-section">
        <div className="stat">
          <h4>Total Artists</h4>
          <p className="stat-number">{artists?.length || 0}</p>
        </div>
        <div className="stat">
          <h4>Avg. Rating</h4>
          <p className="stat-number">
            {artists?.length > 0 
              ? (artists.reduce((sum, a) => sum + a.rating, 0) / artists.length).toFixed(1)
              : 'N/A'
            }
          </p>
        </div>
        <div className="stat">
          <h4>Locations</h4>
          <p className="stat-number">{new Set(artists?.map(a => a.location)).size || 0}</p>
        </div>
      </div>
    </div>
  );
}
