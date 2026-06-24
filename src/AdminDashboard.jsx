import { useState } from 'react';

function AdminDashboard({ users, bookings, reviews }) {
  const [usersData, setUsersData] = useState(users);

  const toggleStatus = (id) => {
    setUsersData((prev) =>
      prev.map((user) => (user.id === id ? { ...user, status: user.status === 'Active' ? 'Pending' : 'Active' } : user))
    );
  };

  return (
    <section className="page-card">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Administration</p>
          <h2>Platform controls and insights</h2>
        </div>
      </div>

      <div className="stat-grid">
        <article className="stat-card">
          <h3>Active users</h3>
          <p>{usersData.filter((user) => user.status === 'Active').length}</p>
        </article>
        <article className="stat-card">
          <h3>Bookings</h3>
          <p>{bookings.length}</p>
        </article>
        <article className="stat-card">
          <h3>Reviews</h3>
          <p>{reviews.length}</p>
        </article>
      </div>

      <div className="dashboard-grid">
        <article className="card">
          <h3>User management</h3>
          <ul className="list-card">
            {usersData.map((user) => (
              <li key={user.id}>
                {user.name} — {user.role} ({user.status})
                <button className="small-btn" onClick={() => toggleStatus(user.id)}>
                  Toggle status
                </button>
              </li>
            ))}
          </ul>
        </article>
        <article className="card">
          <h3>Platform notes</h3>
          <p>Featured listings can be promoted from the admin console.</p>
          <p>Analytics can later be connected to live backend data.</p>
        </article>
      </div>
    </section>
  );
}

export default AdminDashboard;
