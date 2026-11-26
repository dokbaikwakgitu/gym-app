import { NavLink } from 'react-router-dom';
import Logo from './Logo.jsx';
import { Button } from './ui/button.jsx';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import Nav from './Nav.jsx';
import { reviews } from './Reviews.jsx'; //might fetch from database... maybe ...probably

function PageNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between lg:justify-around bg-[#ad9405] p-2.5">
      <Logo className="h-[30px] sm:h-[50px]" />
      <Nav className="items-center gap-16 hidden lg:flex" />
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
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
        >
          {isOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {isOpen && <Nav className="flex flex-col gap-4 p-4 lg:hidden" />}
    </nav>
  );
}

export default PageNav;
