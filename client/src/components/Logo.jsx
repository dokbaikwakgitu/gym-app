import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

function Logo({ className }) {
  return (
    <Link to="/">
      <img
        src="/logo.png"
        alt="Cat Logo"
        className={cn('h-15 w-auto mx-auto', className)}
      />
    </Link>
  );
}

export default Logo;
