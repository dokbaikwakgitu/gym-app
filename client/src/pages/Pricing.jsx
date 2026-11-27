import PageNav from '../components/PageNav';
import Footer from '../components/Footer';
import Section from '../components/Section';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { useEffect, useState } from 'react';
import api from '../api/axios';
import { Spinner } from '../components/ui/spinner';

// model Plan {
//   id              Int     @id @default(autoincrement())
//   name            String  @db.VarChar(255)
//   price           Int
//   desc            String  @db.VarChar(255)
//   famAccess       Boolean @default(false) @map("fam_access")
//   durationDays    Int     @map("duration_days")
//   isFirstTimeOnly Boolean @default(false) @map("is_first_time_only")

//   memberships Membership[]

//   @@map("plan")
// }

const dummyPlan = [
  {
    id: 1,
    name: 'monthy15',
    price: 50,
    desc: '15 week of quota per month. Suit for 3 day split.',
    famAccess: false,
    durationDays: 30,
    isFirstTimeOnly: false,
  },
  {
    id: 2,
    name: 'monthy30',
    price: 120,
    desc: '30 week of quota per month. Suit for 6 day split.',
    famAcces: false,
    durationDays: 30,
    isFirstTimeOnly: false,
  },
  {
    id: 3,
    name: 'monthyPREMIUM',
    price: 200,
    desc: '30 week of quota per month. Bring your +1, Suit for gymBros or Couples!!',
    famAcces: true,
    durationDays: 30,
    isFirstTimeOnly: false,
  },
];

function Pricing() {
  const [isLoading, setIsLoading] = useState(false);
  const [plan, setPlan] = useState([]);
  const [err, setErr] = useState();

  useEffect(function () {
    async function fetchPlan() {
      try {
        setIsLoading(true);
        const res = await api.get('/plans');
        console.log(res.data.data);

        setPlan(res.data.data);
      } catch (error) {
        setErr(
          error.response?.data?.message || 'There was an error loading data...',
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchPlan();
  }, []);

  return (
    <main className="min-h-screen flex flex-col">
      <PageNav />
      <Section>
        <h1 className="text-3xl font-semibold tracking-tight">Pricing</h1>
        <p className="mt-2 text-muted-foreground">
          Membership plans provided...
        </p>
        {isLoading ? (
          <div className="flex min-h-[60vh] items-center justify-center">
            <Spinner className="size-12" />
          </div>
        ) : (
          <div className="mt-8 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {plan.map((plan) => (
              <Card key={plan.id}>
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.desc}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Price: {plan.price}</p>
                  <p>Validity: {plan.durationDays}</p>
                  {plan.famAccess && <p>Special Feature:You Can Bring +1</p>}
                  {plan.isFirstTimeOnly && <p>Free for first timer</p>}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        {err && <p className="text-destructive">{err}</p>}
      </Section>
      <Footer />
    </main>
  );
}

export default Pricing;
