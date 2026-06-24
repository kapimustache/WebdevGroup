import { useState } from 'react';

function ReviewsAndBackend({ reviews, artists, venues }) {
  const [reviewList, setReviewList] = useState(reviews);
  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');
  const [rating, setRating] = useState('5');

  const addReview = (e) => {
    e.preventDefault();
    if (!author.trim() || !text.trim()) return;

    setReviewList([
      {
        id: Date.now(),
        author: author.trim(),
        text: text.trim(),
        rating: Number(rating),
        target: 'New review',
      },
      ...reviewList,
    ]);
    setAuthor('');
    setText('');
    setRating('5');
  };

  return (
    <section className="page-card">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Reviews & Backend</p>
          <h2>Ratings, reviews, and future-ready data flow</h2>
        </div>
      </div>

      <div className="dashboard-grid">
        <article className="card">
          <h3>Featured artists</h3>
          {artists.map((artist) => (
            <p key={artist.id}>{artist.name} — {artist.rating}/5</p>
          ))}
        </article>
        <article className="card">
          <h3>Featured venues</h3>
          {venues.map((venue) => (
            <p key={venue.id}>{venue.name} — {venue.capacity} seats</p>
          ))}
        </article>
      </div>

      <form onSubmit={addReview} className="form-card vertical">
        <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Your name" />
        <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Write a review" rows="3" />
        <select value={rating} onChange={(e) => setRating(e.target.value)}>
          <option value="5">5 stars</option>
          <option value="4">4 stars</option>
          <option value="3">3 stars</option>
          <option value="2">2 stars</option>
          <option value="1">1 star</option>
        </select>
        <button type="submit">Submit review</button>
      </form>

      <div className="cards">
        {reviewList.map((review) => (
          <article className="card" key={review.id}>
            <h3>{review.author}</h3>
            <p>{review.text}</p>
            <p>{'★'.repeat(review.rating)} {review.target}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ReviewsAndBackend;
