import { useState } from 'react';

function Dashboard({ artists, venues, bookings }) {
  const [activeDashboard, setActiveDashboard] = useState('artist');

  const selectedArtist = artists[0];
  const selectedVenue = venues[0];

  return (
    <section className="page-card">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Dashboard System</p>
          <h2>Artist and venue insights</h2>
        </div>
        <div className="nav-pills">
          <button className={activeDashboard === 'artist' ? 'active' : ''} onClick={() => setActiveDashboard('artist')}>
            Artist
          </button>
          <button className={activeDashboard === 'venue' ? 'active' : ''} onClick={() => setActiveDashboard('venue')}>
            Venue
          </button>
        </div>
      </div>

      <div className="stat-grid">
        <article className="stat-card">
          <h3>Upcoming bookings</h3>
          <p>{bookings.length}</p>
        </article>
        <article className="stat-card">
          <h3>Profile rating</h3>
          <p>{activeDashboard === 'artist' ? `${selectedArtist.rating}/5` : `${selectedVenue.capacity} seats`}</p>
        </article>
        <article className="stat-card">
          <h3>Message activity</h3>
          <p>8 new conversations</p>
        </article>
      </div>

      {activeDashboard === 'artist' ? (
        <div className="dashboard-grid">
          <article className="card">
            <h3>{selectedArtist.name}</h3>
            <p>{selectedArtist.genre}</p>
            <p>{selectedArtist.location}</p>
            <p>{selectedArtist.style}</p>
          </article>
          <article className="card">
            <h3>Booking summary</h3>
            <ul className="list-card">
              {bookings.map((booking) => (
                <li key={booking.id}>{booking.title} — {booking.status}</li>
              ))}
            </ul>
          </article>
        </div>
      ) : (
        <div className="dashboard-grid">
          <article className="card">
            <h3>{selectedVenue.name}</h3>
            <p>Capacity: {selectedVenue.capacity}</p>
            <p>{selectedVenue.location}</p>
            <p>{selectedVenue.style}</p>
          </article>
          <article className="card">
            <h3>Venue notes</h3>
            <p>Best for live shows, workshops, and community events.</p>
            <p>Profile management tools are ready for future updates.</p>
          </article>
        </div>
      )}
    </section>
  );
}

export default Dashboard;
