import { BadgeCheck } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Rating } from './ui/rating';

export const reviews = [
  {
    id: 1,
    name: 'Tailung',
    duration: 'Boxing · 2 years at CatGym',
    initials: 'TA',
    img: '/tailung-cat.png',
    rating: 5,
    quote:
      'Who filled my head with dreams? Who drove me to train until my bones cracked? It was YOU!',
  },
  {
    id: 2,
    name: 'BigBilly',
    duration: 'Powerlifting · 1 year at CatGym',
    initials: 'BB',
    img: '/bigwilly.png',
    rating: 5,
    quote:
      "I am Big Billy, the biggest wet willy. And I'm gonna go clearly, mhmmmm.",
  },
  {
    id: 3,
    name: 'MIMI💕',
    duration: 'Pilates · 6 months at CatGym',
    initials: 'MI',
    img: '/mimi.png',
    rating: 5,
    quote: 'Hmmmm, hmmmmmm.',
  },
];

function ReviewCard({ review }) {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex min-w-0 items-center gap-3">
          <Avatar size="lg">
            <AvatarImage src={review.img} alt={`${review.name} at CatGym`} />
            <AvatarFallback>{review.initials}</AvatarFallback>
          </Avatar>
          <div className="flex min-w-0 flex-col gap-[2px]">
            <CardTitle className="truncate">{review.name}</CardTitle>
            <CardDescription>{review.duration}</CardDescription>
          </div>
        </div>
        <CardAction>
          <Badge variant="secondary">
            <BadgeCheck />
            Verified
          </Badge>
        </CardAction>
      </CardHeader>
      <div className="flex flex-col flex-1">
        <CardContent>
          <blockquote className="text-pretty text-muted-foreground">
            “{review.quote}”
          </blockquote>
        </CardContent>
        <Rating
          rating={review.rating}
          maxRating={5}
          size="sm"
          className="mt-auto pl-3 pt-4"
        />
      </div>
    </Card>
  );
}

function Reviews() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-20">
      <div className="mb-10 text-center">
        <h2 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
          What our members say
        </h2>
        <p className="mt-2 text-muted-foreground text-pretty">
          Real words from the cats training at CatGym.
        </p>
      </div>

      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => (
          <li key={review.id}>
            <ReviewCard review={review} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Reviews;
