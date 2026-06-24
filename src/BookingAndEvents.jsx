import { useState } from 'react';

function BookingAndEvents({ artists, venues, events }) {
  const [step, setStep] = useState(1);
  const [selectionType, setSelectionType] = useState('artist');
  const [selectedId, setSelectedId] = useState(artists[0].id);
  const [eventTitle, setEventTitle] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('M-Pesa');
  const [confirmed, setConfirmed] = useState(false);

  const options = selectionType === 'artist' ? artists : venues;
  const selectedItem = options.find((item) => item.id === selectedId) || options[0];

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const previousStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const confirmBooking = () => {
    setConfirmed(true);
    setStep(3);
  };

  return (
    <section className="page-card">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Booking & Events</p>
          <h2>Plan a booking in three steps</h2>
        </div>
        <div className="stepper">
          <span className={step >= 1 ? 'active-step' : ''}>1</span>
          <span className={step >= 2 ? 'active-step' : ''}>2</span>
          <span className={step >= 3 ? 'active-step' : ''}>3</span>
        </div>
      </div>

      {step === 1 && (
        <div>
          <p>Select the kind of partner you want to book.</p>
          <div className="nav-pills">
            <button className={selectionType === 'artist' ? 'active' : ''} onClick={() => setSelectionType('artist')}>
              Artist
            </button>
            <button className={selectionType === 'venue' ? 'active' : ''} onClick={() => setSelectionType('venue')}>
              Venue
            </button>
          </div>

          <div className="cards">
            {options.map((item) => (
              <button key={item.id} className={`choice-card ${selectedId === item.id ? 'selected' : ''}`} onClick={() => setSelectedId(item.id)}>
                <h3>{item.name}</h3>
                <p>{item.location}</p>
                {item.capacity ? <p>Capacity: {item.capacity}</p> : <p>{item.genre}</p>}
              </button>
            ))}
          </div>
          <button onClick={nextStep}>Continue</button>
        </div>
      )}

      {step === 2 && (
        <div>
          <p>Book {selectedItem.name} for an upcoming event.</p>
          <div className="form-card vertical">
            <input value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} placeholder="Event name" />
            <input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
            <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
              <option value="M-Pesa">M-Pesa</option>
              <option value="Cash">Cash</option>
              <option value="Bank transfer">Bank transfer</option>
            </select>
          </div>
          <div className="button-row">
            <button onClick={previousStep}>Back</button>
            <button onClick={nextStep}>Review</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h3>Booking summary</h3>
          <div className="card">
            <p><strong>Partner:</strong> {selectedItem.name}</p>
            <p><strong>Event:</strong> {eventTitle || 'Community event'}</p>
            <p><strong>Date:</strong> {eventDate || 'TBD'}</p>
            <p><strong>Payment:</strong> {paymentMethod}</p>
          </div>
          <div className="button-row">
            <button onClick={previousStep}>Back</button>
            <button onClick={confirmBooking}>Confirm booking</button>
          </div>
          {confirmed && <p className="success-note">Booking request submitted successfully.</p>}
        </div>
      )}

      <div className="cards">
        {events.map((event) => (
          <article className="card" key={event.id}>
            <h3>{event.title}</h3>
            <p>{event.location}</p>
            <p>{event.date}</p>
            <span className="chip">{event.type}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

export default BookingAndEvents;
