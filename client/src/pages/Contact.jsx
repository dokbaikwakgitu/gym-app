import PageNav from '../components/PageNav';
import Footer from '../components/Footer';
import Section from '../components/Section';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { Link } from 'react-router-dom';
import { Facebook } from '../components/ui/facebook';
import { Instagram } from '../components/ui/instagram';
import PhoneSvg from '../components/ui/phone';
import LocationSvg from '../components/ui/location-svg';
import EmailSvg from '../components/ui/email';
import { Label } from '../components/ui/label';
import { Input } from '@base-ui/react/input';
import { Textarea } from '../components/ui/textarea';

function Contact() {
  return (
    <main className="min-h-screen flex flex-col">
      <PageNav />
      <Section>
        <h1 className="text-3xl font-semibold tracking-tight">Contact Us</h1>
        <p className="mt-2 text-muted-foreground pb-2">
          Contact us for any enquiries.
        </p>
        <Card>
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* //--------------------NEW SECTION-------------------- */}
            <div className="flex flex-col p-6 gap-6 border-r-2">
              <div className="pb-4 border-b-2">
                <CardTitle>Are you new to Cat Gym?</CardTitle>
                <CardDescription>
                  Check out our <strong>Faq</strong>.
                </CardDescription>
              </div>
              <div className="pb-4 border-b-2">
                <CardTitle>Find a location</CardTitle>
                <CardDescription>
                  Find us at{' '}
                  <Link to="/locate-us">
                    <strong>Location</strong>
                  </Link>
                </CardDescription>
              </div>

              <div className="pb-4 border-b-2">
                <CardTitle>Connect with us on social media</CardTitle>
                <div className="flex gap-2 mt-2">
                  <Facebook className="w-5 h-5 grayscale " />
                  <Instagram className="w-5 h-5 grayscale " />
                </div>
              </div>

              <div className="pb-4 space-y-2 border-b-2 md:border-0">
                <CardTitle>Bussines Information</CardTitle>
                <div className="flex gap-2">
                  <PhoneSvg className="w-5 h-5 grayscale " />
                  <p>asdfasdf</p>
                </div>
                <div className="flex gap-2">
                  <LocationSvg className="w-5 h-5 grayscale " />
                  <p>asdfasdf</p>
                </div>
                <div className="flex gap-2">
                  <EmailSvg className="w-5 h-5 grayscale " />
                  <p>asdfasdf</p>
                </div>
              </div>
            </div>
            {/* //--------------------NEW SECTION-------------------- */}
            <div className="p-6 space-y-4">
              <CardTitle>What can we help you with?</CardTitle>
              <div className=" space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input className=" border-2 rounded-sm"></Input>
              </div>
              <div className=" space-y-2">
                <Label htmlFor="email">Email Addres</Label>
                <Input className=" border-2 rounded-sm"></Input>
              </div>
              <div className=" space-y-2">
                <Label htmlFor="phone-number">Mobile Number</Label>
                <Input className=" border-2 rounded-sm"></Input>
              </div>
              <div className=" space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea className=" border-2 rounded-sm"></Textarea>
              </div>
            </div>
          </div>
        </Card>
      </Section>

      <Footer />
    </main>
  );
}

export default Contact;
