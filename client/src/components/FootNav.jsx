import { NavLink } from 'react-router-dom';
import Logo from './Logo';
import SocMed from './SocMed';

function FootNav() {
  return (
    <nav className="flex flex-col items-start gap-8 p-6 sm:p-8 md:flex-row md:items-center md:justify-between">
      <Logo className="h-10 sm:h-14" />

      <div className="flex flex-col items-start gap-4 md:items-end">
        <SocMed />

        <ul className="flex flex-wrap gap-4 sm:gap-6 text-sm">
          <li>
            <NavLink to="/contact-us">Contact Us</NavLink>
          </li>
          <li>
            <NavLink to="/term-condition">Terms & Conditions</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default FootNav;
