import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card';

function LocationCard({ location }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{location.name}</CardTitle>
        <CardContent>
          <CardDescription>{location.address}</CardDescription>
          <CardDescription>{location.phone}</CardDescription>
          <CardDescription>{location.hours}</CardDescription>
        </CardContent>
      </CardHeader>
    </Card>
  );
}

export default LocationCard;
