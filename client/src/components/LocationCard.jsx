import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { Button } from '../components/ui/button';

function LocationCard({ item, setLocation, location }) {
  return (
    <Card className={location.id === item.id ? 'border border-gray-300' : null}>
      <CardHeader>
        <CardTitle>{item.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-pretty">
          {item.address}
        </CardDescription>
        <CardDescription>{item.phone}</CardDescription>
        <CardDescription>{item.hours}</CardDescription>
      </CardContent>
      <CardFooter className="border-0">
        <Button onClick={() => setLocation(item)}>View More</Button>
      </CardFooter>
    </Card>
  );
}

export default LocationCard;
