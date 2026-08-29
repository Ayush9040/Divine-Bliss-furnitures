import React, { useEffect, useLayoutEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const TRANSPARENT_NAV_ROUTES = [
  '/about',
  '/contact',
  // '/services', // Services is intentionally disabled for now.
  '/collections',
  '/craftsmanship',
  '/materials',
  '/bespoke',
];
const PAGE_TITLES = {
  '/': 'Home',
  '/about': 'Our Story',
  '/contact': 'Contact',
  // '/services': 'Services', // Services is intentionally disabled for now.
  '/collections': 'Collections',
  '/craftsmanship': 'Craftsmanship',
  '/materials': 'Materials',
  '/bespoke': 'Bespoke',
};

const Layout = () => {
  const { pathname, key: locationKey } = useLocation();
  const normalizedPath = pathname !== '/' ? pathname.replace(/\/$/, '') : pathname;
  const variant = normalizedPath === '/'
    ? 'home'
    : TRANSPARENT_NAV_ROUTES.includes(normalizedPath)
      ? 'transparent'
      : 'solid';

  useLayoutEffect(() => {
    const scrollToPageTop = () => {
      const root = document.documentElement;
      const body = document.body;
      const previousRootBehavior = root.style.scrollBehavior;
      const previousBodyBehavior = body.style.scrollBehavior;

      root.style.scrollBehavior = 'auto';
      body.style.scrollBehavior = 'auto';
      root.scrollTop = 0;
      body.scrollTop = 0;
      window.scrollTo(0, 0);

      root.style.scrollBehavior = previousRootBehavior;
      body.style.scrollBehavior = previousBodyBehavior;
    };

    scrollToPageTop();
    const frame = window.requestAnimationFrame(scrollToPageTop);

    return () => window.cancelAnimationFrame(frame);
  }, [normalizedPath, locationKey]);

  useEffect(() => {
    if (!('scrollRestoration' in window.history)) return undefined;

    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';

    return () => {
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  useEffect(() => {
    const pageName = PAGE_TITLES[normalizedPath];
    document.title = pageName ? `${pageName} | Divine Bliss` : 'Divine Bliss';
  }, [normalizedPath]);

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
