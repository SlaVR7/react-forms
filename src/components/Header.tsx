import { Link } from 'react-router-dom';
import React from 'react';

export function Header() {
  return (
    <header>
      <nav>
        <Link to="/controlled">Controlled</Link>
        <Link to="/">Main</Link>
        <Link to="/uncontrolled">Uncontrolled</Link>
      </nav>
    </header>
  );
}
