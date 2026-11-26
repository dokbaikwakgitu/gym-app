import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../components/ui/card';

function ClassCard({ card }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{card.name}</CardTitle>
        <CardDescription>{card.instructorName}</CardDescription>
        <CardDescription>{card.description || '...'}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Duration:{card.durationMinutes}</p>
        <p>Participant:{card.capacity}</p>
        <p>Price:Rm{card.price}</p>
        <p>Time:{new Date(card.startAt).toLocaleString()}</p>
      </CardContent>
    </Card>
  );
}

export default ClassCard;
