import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
function Nav({ className }) {
  return (
    <ul className={cn(className)}>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/classes">Classes</NavLink>
      </li>
      <li>
        <NavLink to="/pricing">Pricing</NavLink>
      </li>
      <li>
        <NavLink to="/locate-us">Locate Us</NavLink>
      </li>
      <li>
        <NavLink to="/contact-us">Contact Us</NavLink>
      </li>
    </ul>
  );
}

export default Nav;
// className="flex flex-col gap-4 p-4 lg:hidden"
