export const artists = [
  {
    id: 1,
    name: 'Maya Wanjiru',
    genre: 'Gospel',
    location: 'Nairobi',
    rating: 4.8,
    style: 'Live worship performance',
  },
  {
    id: 2,
    name: 'Kiptoo Band',
    genre: 'Afro Pop',
    location: 'Mombasa',
    rating: 4.6,
    style: 'High-energy stage show',
  },
  {
    id: 3,
    name: 'Amina Rose',
    genre: 'Poetry & Spoken Word',
    location: 'Kisumu',
    rating: 4.9,
    style: 'Community storytelling',
  },
];

export const venues = [
  {
    id: 1,
    name: 'The Lantern Hall',
    location: 'Nairobi',
    capacity: 250,
    style: 'Indoor events and showcases',
  },
  {
    id: 2,
    name: 'Sunset Garden',
    location: 'Nakuru',
    capacity: 400,
    style: 'Outdoor performances',
  },
  {
    id: 3,
    name: 'Studio 7',
    location: 'Eldoret',
    capacity: 120,
    style: 'Intimate acoustic events',
  },
];

export const events = [
  {
    id: 1,
    title: 'Open Mic Night',
    location: 'Nairobi',
    date: '2026-07-12',
    type: 'Community',
  },
  {
    id: 2,
    title: 'Live Gospel Festival',
    location: 'Mombasa',
    date: '2026-07-20',
    type: 'Festival',
  },
  {
    id: 3,
    title: 'Youth Talent Showcase',
    location: 'Kisumu',
    date: '2026-08-01',
    type: 'Youth',
  },
];

export const initialBookings = [
  {
    id: 1,
    title: 'Sunday Worship Set',
    status: 'Confirmed',
    partner: 'The Lantern Hall',
    date: '2026-06-28',
  },
  {
    id: 2,
    title: 'Community Talent Night',
    status: 'Pending',
    partner: 'Sunset Garden',
    date: '2026-07-04',
  },
];

export const initialReviews = [
  {
    id: 1,
    author: 'Njeri',
    text: 'Very smooth booking process and great venue matching.',
    rating: 5,
    target: 'The Lantern Hall',
  },
  {
    id: 2,
    author: 'Otieno',
    text: 'I found quality performers quickly and the dashboard was easy to use.',
    rating: 4,
    target: 'Maya Wanjiru',
  },
];

export const adminUsers = [
  { id: 1, name: 'Grace M.', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Daniel O.', role: 'Moderator', status: 'Active' },
  { id: 3, name: 'Sarah K.', role: 'Support', status: 'Pending' },
];
