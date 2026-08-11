import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, Search, ChevronRight } from 'lucide-react';
import Logo from '../assets/Logo.webp';
import WhiteLogo from '../assets/w-logo.webp';
import './Navbar.css';
const navLinks = [
  { name: 'HOME', href: '/' },
  {
    name: 'PAGES',
    href: '#',
    hasDropdown: true,
    dropdownItems: [
      'About Us',
      'Services',
      'Our Team',
      'Single Team',
      'Philosophy',
      'History',
      "FAQ's",
      'Typography',
      'Elements',
      'Mega Menu Page',
      'Coming Soon',
      'Page 404',
    ],
  },
  {
    name: 'PORTFOLIO',
    href: '#',
    hasDropdown: true,
    dropdownItems: [
      {
        label: 'Grid',
        children: ['Grid 1', 'Grid 2', 'Grid 3'],
      },
      {
        label: 'Masonry',
        children: ['Masonry 1', 'Masonry 2', 'Masonry 3'],
      },
      { label: 'Portfolio Single' },
      { label: 'Portfolio Gallery' },
    ],
  },
  {
    name: 'BLOG',
    href: '#blog',
    hasDropdown: true,
    dropdownItems: ['Blog Grid', 'Blog List', 'Blog Single'],
  },
  { name: 'SHOP', href: '#shop' },
  { name: 'CONTACTS', href: '/contact' },
];

const Navbar = ({ variant = 'solid' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const prevScrollYRef = useRef(0);
  const location = useLocation();

  const isOverlayPage = variant === 'transparent';
  const showSolid = !isOverlayPage || isScrolledPastHero || isOpen;

  const checkScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    const prevScrollY = prevScrollYRef.current;

    // Check hero section height for solid/transparent styling
    const hero = document.querySelector('.page-hero, .mink-hero');
    if (!hero) {
      setIsScrolledPastHero(true);
    } else {
      const heroBottom = hero.getBoundingClientRect().bottom;
      const navbarHeight = window.innerWidth <= 480 ? 72 : 90;
      setIsScrolledPastHero(heroBottom <= navbarHeight);
    }

    // Auto-hiding navbar scroll direction check
    if (currentScrollY <= 50) {
      setIsVisible(true);
    } else if (currentScrollY > prevScrollY + 6) {
      // Scrolling DOWN
      setIsVisible(false);
    } else if (currentScrollY < prevScrollY - 6) {
      // Scrolling UP
      setIsVisible(true);
    }

    prevScrollYRef.current = currentScrollY;
  }, []);

  useEffect(() => {
    setIsScrolledPastHero(false);
    setIsOpen(false);
    setMobileExpanded(null);
    setIsVisible(true);
    prevScrollYRef.current = window.scrollY;

    checkScroll();

    window.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [location.pathname, checkScroll]);

  const isActive = (href) => {
    if (href === '/') return location.pathname === '/';
    if (href.startsWith('/')) return location.pathname === href;
    return false;
  };

  const closeMobile = () => {
    setIsOpen(false);
    setMobileExpanded(null);
  };

  const renderDropdownItem = (item, idx) => {
    if (typeof item === 'string') {
      return (
        <a key={idx} href="#" className="dropdown-item">
          {item}
        </a>
      );
    }

    if (item.children) {
      return (
        <div
          key={idx}
          className="dropdown-item-group"
          onMouseEnter={() => setActiveSubmenu(item.label)}
          onMouseLeave={() => setActiveSubmenu(null)}
        >
          <a href="#" className="dropdown-item has-submenu">
            {item.label}
            <ChevronRight size={14} className="submenu-arrow" />
          </a>
          {activeSubmenu === item.label && (
            <div className="submenu">
              {item.children.map((child, childIdx) => (
                <a key={childIdx} href="#" className="dropdown-item">
                  {child}
                </a>
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
      <a key={idx} href="#" className="dropdown-item">
        {item.label}
      </a>
    );
  };

  return (
    <header
      className={`navbar-header ${showSolid ? 'navbar-solid' : 'navbar-transparent'}${variant === 'home' ? ' navbar-home' : ''}${isScrolledPastHero ? ' navbar-scrolled' : ''}${
        !isVisible && !isOpen ? ' navbar-hidden' : ''
      }${isOpen ? ' navbar-menu-open' : ''}`}
    >
      <div className="navbar-container">
        <div className="navbar-wrapper">
          <Link to="/" className="navbar-logo" onClick={closeMobile}>
            <img src={showSolid ? Logo : WhiteLogo} alt="Mink Studio Logo" />
          </Link>

          <nav className="navbar-nav">
            <ul className="navbar-menu">
              {navLinks.map((link) => (
                <li
                  key={link.name}
                  className="nav-item"
                  onMouseEnter={() => link.hasDropdown && setActiveDropdown(link.name)}
                  onMouseLeave={() => {
                    if (link.hasDropdown) {
                      setActiveDropdown(null);
                      setActiveSubmenu(null);
                    }
                  }}
                >
                  {link.href.startsWith('/') ? (
                    <Link
                      to={link.href}
                      className={`nav-link ${isActive(link.href) ? 'active' : ''}`}
                    >
                      <span className="circle-icon" />
                      {link.name}
                    </Link>
                  ) : (
                    <a href={link.href} className="nav-link">
                      <span className="circle-icon" />
                      {link.name}
                    </a>
                  )}

                  {link.hasDropdown && activeDropdown === link.name && (
                    <div className="dropdown-menu">
                      {link.dropdownItems.map((item, idx) => renderDropdownItem(item, idx))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="navbar-actions">
            <button type="button" className="icon-button" aria-label="Cart">
              <ShoppingBag size={20} />
            </button>
            <button type="button" className="icon-button" aria-label="Search">
              <Search size={20} />
            </button>
            <Link to="/contact" className="cta-button">
              GET IN TOUCH
            </Link>
          </div>

          <button
            type="button"
            className="mobile-toggle"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
        {navLinks.map((link) => (
          <div key={link.name} className="mobile-nav-group">
            {link.href.startsWith('/') ? (
              <Link
                to={link.href}
                className={`nav-link ${isActive(link.href) ? 'active' : ''}`}
                onClick={closeMobile}
              >
                <span className="circle-icon" />
                {link.name}
              </Link>
            ) : link.hasDropdown ? (
              <>
                <button
                  type="button"
                  className="mobile-dropdown-trigger"
                  onClick={() =>
                    setMobileExpanded(mobileExpanded === link.name ? null : link.name)
                  }
                >
                  <span className="nav-link">
                    <span className="circle-icon" />
                    {link.name}
                  </span>
                  <ChevronRight
                    size={18}
                    className={`mobile-chevron ${mobileExpanded === link.name ? 'open' : ''}`}
                  />
                </button>
                {mobileExpanded === link.name && (
                  <div className="mobile-submenu">
                    {link.dropdownItems.map((item, idx) => {
                      const label = typeof item === 'string' ? item : item.label;
                      return (
                        <a key={idx} href="#" className="mobile-submenu-item" onClick={closeMobile}>
                          {label}
                        </a>
                      );
                    })}
                  </div>
                )}
              </>
            ) : (
              <a href={link.href} className="nav-link" onClick={closeMobile}>
                <span className="circle-icon" />
                {link.name}
              </a>
            )}
          </div>
        ))}
        <Link to="/contact" className="cta-button mobile-cta" onClick={closeMobile}>
          GET IN TOUCH
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
