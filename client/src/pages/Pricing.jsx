import PageNav from '../components/PageNav';
import Footer from '../components/Footer';
import Section from '../components/Section';

function Pricing() {
  return (
    <main className="min-h-screen flex flex-col">
      <PageNav />
      <Section>
        <h1 className="text-3xl font-semibold tracking-tight">Pricing</h1>
        <p className="mt-2 text-muted-foreground">
          Membership plans are coming soon.
        </p>
      </Section>
      <Footer />
    </main>
  );
}

export default Pricing;
