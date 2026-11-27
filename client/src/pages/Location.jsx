import PageNav from '../components/PageNav';
import Footer from '../components/Footer';
import Section from '../components/Section';
import LocationCard from '../components/LocationCard';

const dummyLocation = [
  {
    id: 1,
    name: 'IronPulse Gong Badak',
    state: 'Terengganu',
    district: 'Kuala Nerus',
    address: 'Lot 12, Jalan Gong Badak, 21300 Kuala Nerus, Terengganu',
    hours: '6:00 AM – 11:00 PM',
    phone: '+60 12-345 6789',
    position: { lat: 5.3984, lng: 103.0744 },
    embedUrl: 'https://www.google.com/maps?q=5.3984,103.0744&z=15&output=embed',
  },
  {
    id: 2,
    name: 'IronPulse Kampung Jambu',
    state: 'Pahang',
    district: 'Pekan',
    address: 'Lot 12, Kampung Jambu, 26600 Pekan, Pahang',
    hours: '8:00 AM – 1:00 AM',
    phone: '+60 12-444 4664',
    position: {
      lat: 3.54293,
      lng: 103.3847,
    },
    embedUrl:
      'https://www.google.com/maps?q=3.54293,103.3847&z=15&output=embed',
  },
];

function Location() {
  return (
    <main className="min-h-screen flex flex-col">
      <PageNav />
      <Section>
        <h1 className="text-3xl font-semibold tracking-tight">Locate Us</h1>
        <p className="mt-2 text-muted-foreground">
          Our gym locations are coming soon.
        </p>
        <div className="mt-8 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {dummyLocation.map((location) => (
            <LocationCard location={location} key={location.id} />
          ))}
        </div>
      </Section>
      <Footer />
    </main>
  );
}

export default Location;
