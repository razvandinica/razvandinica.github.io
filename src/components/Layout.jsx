import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';

const Layout = () => {
  const getNavLinkClass = ({ isActive }) => {
    return isActive ? 'nav-link active fw-bold' : 'nav-link';
  };

  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-light bg-light shadow-sm">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            Razvan Dinica
          </NavLink>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <NavLink className={getNavLinkClass} to="/aboutme">
                  About Me
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={getNavLinkClass} to="/blog">
                  Blog
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={getNavLinkClass} to="/contact">
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <main className="container mt-4">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
