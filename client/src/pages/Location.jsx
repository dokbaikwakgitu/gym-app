import PageNav from '../components/PageNav';
import Footer from '../components/Footer';
import Section from '../components/Section';
import LocationCard from '../components/LocationCard';
import { use, useEffect, useState } from 'react';
import api from '../api/axios';

// const dummyLocation = [
//   {
//     id: 1,
//     name: 'CatGym Gong Badak',
//     state: 'Terengganu',
//     district: 'Kuala Nerus',
//     address: 'Lot 12, Jalan Gong Badak, 21300 Kuala Nerus, Terengganu',
//     hours: '6:00 AM – 11:00 PM',
//     phone: '+60 12-345 6789',
//     position: { lat: 5.3984, lng: 103.0744 },
//     embedUrl: 'https://www.google.com/maps?q=5.3984,103.0744&z=15&output=embed',
//   },
//   {
//     id: 2,
//     name: 'CatGym Kampung Jambu',
//     state: 'Pahang',
//     district: 'Pekan',
//     address: 'Lot 12, Kampung Jambu, 26600 Pekan, Pahang',
//     hours: '8:00 AM – 1:00 AM',
//     phone: '+60 12-444 4664',
//     position: {
//       lat: 3.54293,
//       lng: 103.3847,
//     },
//     embedUrl:
//       'https://www.google.com/maps?q=3.54293,103.3847&z=15&output=embed',
//   },
// ];

function Location() {
  const [locs, setLocs] = useState([]); //all location object array
  const [location, setLocation] = useState(null); //single location
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState('');

  useEffect(function () {
    async function locationFetch() {
      try {
        setIsLoading(true);
        setErr('');
        const res = await api.get('/locations');
        const data = res.data.data.locations;
        setLocs(data);
        setLocation(data[0] || null);
      } catch (err) {
        console.dir(err);
        setErr(
          err.response?.data?.message || 'There was an error loading data...',
        );
      } finally {
        setIsLoading(false);
      }
    }

    locationFetch();
  }, []);

  return (
    <main className="min-h-screen flex flex-col">
      <PageNav />

      <Section>
        <h1 className="text-3xl font-semibold tracking-tight">Locate Us</h1>
        <p className="mt-2 text-muted-foreground">Our gym locations.</p>
        <div className="mt-8 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {locs.map((item) => (
            <LocationCard
              item={item}
              key={item.id}
              setLocation={setLocation}
              location={location}
            />
          ))}
        </div>
        <div className="mt-8 rounded-xl overflow-hidden border">
          {locs.length > 0 && (
            <iframe
              key={location.id}
              title={location.name}
              width="100%"
              height="350"
              loading="lazy"
              src={`https://www.google.com/maps?q=${location.latitude},${location.longitude}&z=15&output=embed`}
            ></iframe>
          )}
        </div>
      </Section>
      <Footer />
    </main>
  );
}

export default Location;
