import { NavLink } from 'react-router-dom';

function BurgerNav() {
  return (
    <ul className="flex flex-col gap-4 p-4 lg:hidden">
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
  );
}

export default BurgerNav;
