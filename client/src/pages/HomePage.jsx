import Footer from '../components/Footer';
import PageNav from '../components/PageNav';
import Image from '../components/Image';
import Reviews from '../components/Reviews';

function HomePage() {
  return (
    <main>
      <PageNav />
      <Image />
      <Reviews />
      <Footer />
    </main>
  );
}

export default HomePage;
