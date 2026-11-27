import { cn } from '@/lib/utils';

function Section({ children }) {
  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-20 flex-1">
      {children}
    </section>
  );
}

export default Section;
