import PageNav from '../components/PageNav';
import Footer from '../components/Footer';
import Section from '../components/Section';

import { Children, useEffect, useState } from 'react';
import api from '../api/axios';
import { Spinner } from '../components/ui/spinner';
import ClassCard from '../components/ClassCard';

function Classes() {
  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(function () {
    async function fetchClasses() {
      try {
        setIsLoading(true);
        setError('');
        const res = await api.get('/classes');
        setClasses(res.data.data.classes);
      } catch (err) {
        setError(
          err.response?.data?.message || 'There was an error loading data...',
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchClasses();
  }, []);

  return (
    <main className="min-h-screen flex flex-col">
      <PageNav />
      <Section>
        <h1 className="text-3xl font-semibold tracking-tight">Classes</h1>
        <p className="mt-2 text-muted-foreground ">
          Collection of Classes Provided By our Gym.
        </p>
        {isLoading ? (
          <div className="flex min-h-[60vh] items-center justify-center">
            <Spinner className="size-12" />
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {classes.map((card) => (
              <ClassCard card={card} key={card.id} />
            ))}
          </div>
        )}
        {error && <p className="text-destructive">{error}</p>}
      </Section>

      <Footer />
    </main>
  );
}

export default Classes;
