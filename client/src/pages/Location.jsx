import PageNav from '../components/PageNav';
import Footer from '../components/Footer';

function Location() {
  return (
    <main>
      <PageNav />
      <section className="mx-auto max-w-5xl px-4 py-20">
        <h1 className="text-3xl font-semibold tracking-tight">Locate Us</h1>
        <p className="mt-2 text-muted-foreground">
          Our gym locations are coming soon.
        </p>
      </section>
      <Footer />
    </main>
  );
}

export default Location;
