import { NavLink } from 'react-router-dom';
import Logo from './Logo.jsx';
import { Button } from './ui/button.jsx';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import BurgerNav from './BurgerNav.jsx';
import { reviews } from './Reviews.jsx';

function PageNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between lg:justify-around bg-[#ad9405] p-2.5">
      <Logo className="h-[30px] sm:h-[50px]" />
      <ul className="items-center gap-16 hidden lg:flex">
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
          <NavLink to="/location">Locate Us</NavLink>
        </li>
        <li>
          <NavLink to="/contact-us">Contact Us</NavLink>
        </li>
      </ul>
      <div className="flex items-center gap-1">
        <NavLink to="/login">
          <Avatar className="lg:hidden">
            <AvatarImage src="/Tailung.png" alt="Login" />
            <AvatarFallback>{reviews[0].initials}</AvatarFallback>
          </Avatar>

          <Button
            variant="default"
            className="hidden lg:inline-flex  rounded-full"
          >
            Login
          </Button>
        </NavLink>
        <Button
          className="w-[30px] sm:w-12 lg:hidden rounded-full"
          onClick={() => setIsOpen(!isOpen)}
        >
          ≡
        </Button>
      </div>

      {isOpen && <BurgerNav />}
    </nav>
  );
}

export default PageNav;
