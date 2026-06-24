import { useState } from 'react';
import Dashboard from './Dashboard';
import BookingAndEvents from './BookingAndEvents';
import AdminDashboard from './AdminDashboard';
import ReviewsAndBackend from './ReviewsAndBackend';
import { artists, venues, events, initialBookings, initialReviews, adminUsers } from './data';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');

  return (
    <div className="app-shell">
      <header className="site-header">
        <div>
          <p className="eyebrow">Local Artist & Venue Platform</p>
          <h1>FaithLink</h1>
        </div>
        <nav className="nav-links">
          <button className={currentPage === 'landing' ? 'active' : ''} onClick={() => setCurrentPage('landing')}>
            Home
          </button>
          <button className={currentPage === 'dashboard' ? 'active' : ''} onClick={() => setCurrentPage('dashboard')}>
            Dashboard
          </button>
          <button className={currentPage === 'booking' ? 'active' : ''} onClick={() => setCurrentPage('booking')}>
            Booking
          </button>
          <button className={currentPage === 'admin' ? 'active' : ''} onClick={() => setCurrentPage('admin')}>
            Admin
          </button>
          <button className={currentPage === 'reviews' ? 'active' : ''} onClick={() => setCurrentPage('reviews')}>
            Reviews
          </button>
        </nav>
      </header>

      <header className="hero">
        <div>
          <p className="eyebrow">Platform Overview</p>
          <h1>Discover artists, book venues, and grow local events.</h1>
          <p className="hero-text">
            This unified app combines landing experiences, dashboards, bookings, reviews, and administrator controls into one clean workflow.
          </p>
        </div>
      </header>

      <main className="content">
        {currentPage === 'landing' && (
          <section className="page-card">
            <h2>Landing Experience</h2>
            <p>Visitors can browse artists, discover venues, and start booking opportunities from a single entry point.</p>
            <div className="cards">
              {artists.slice(0, 3).map((artist) => (
                <article className="card" key={artist.id}>
                  <h3>{artist.name}</h3>
                  <p>{artist.genre}</p>
                  <p>{artist.location}</p>
                </article>
              ))}
            </div>
            <div className="cards">
              {venues.map((venue) => (
                <article className="card" key={venue.id}>
                  <h3>{venue.name}</h3>
                  <p>{venue.location}</p>
                  <p>{venue.style}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        {currentPage === 'dashboard' && (
          <Dashboard artists={artists} venues={venues} bookings={initialBookings} />
        )}

        {currentPage === 'booking' && (
          <BookingAndEvents artists={artists} venues={venues} events={events} />
        )}

        {currentPage === 'admin' && (
          <AdminDashboard users={adminUsers} bookings={initialBookings} reviews={initialReviews} />
        )}

        {currentPage === 'reviews' && (
          <ReviewsAndBackend reviews={initialReviews} artists={artists} venues={venues} />
        )}
      </main>

      <footer className="site-footer">
        <p>FaithLink © 2026 • Built for discoverable local events and community growth</p>
      </footer>
    </div>
  );
}

export default App;
