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

function LocationCard({ location, setLoc, loc }) {
  return (
    <Card className={loc.id === location.id ? 'border border-gray-300' : null}>
      <CardHeader>
        <CardTitle>{location.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-pretty">
          {location.address}
        </CardDescription>
        <CardDescription>{location.phone}</CardDescription>
        <CardDescription>{location.hours}</CardDescription>
      </CardContent>
      <CardFooter className="border-0">
        <Button onClick={() => setLoc(location)}>View More</Button>
      </CardFooter>
    </Card>
  );
}

export default LocationCard;
