import PageNav from '../components/PageNav';
import Footer from '../components/Footer';
import Section from '../components/Section';

function Contact() {
  return (
    <main>
      <PageNav />
      <Section>
        <h1 className="text-3xl font-semibold tracking-tight">Contact Us</h1>
        <p className="mt-2 text-muted-foreground">
          Contact details are coming soon.
        </p>
      </Section>
      <Footer />
    </main>
  );
}

export default Contact;
