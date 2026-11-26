import { cn } from '@/lib/utils';

function Section({ children }) {
  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-20 flex-1">
      {children}
    </section>
  );
}

export default Section;

//  <h1 className="text-3xl font-semibold tracking-tight">Classes</h1>
//       <p className="mt-2 text-muted-foreground ">
//         Our class schedule is coming soon.
//       </p>
