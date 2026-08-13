import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const TRANSPARENT_NAV_ROUTES = ['/about', '/contact', '/services'];

const Layout = () => {
  const { pathname } = useLocation();
  const variant = pathname === '/'
    ? 'home'
    : TRANSPARENT_NAV_ROUTES.includes(pathname)
      ? 'transparent'
      : 'solid';

  return (
    <>
      <Navbar variant={variant} />
      {variant === 'solid' && <div className="navbar-spacer" aria-hidden="true" />}
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
