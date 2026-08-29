import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight } from 'lucide-react';
import Logo from '../assets/Logo.webp';
import WhiteLogo from '../assets/w-logo.webp';
import HeaderContactPanel from './HeaderContactPanel';
import './Navbar.css';
const navLinks = [
  { name: 'HOME', href: '/' },
  { name: 'OUR STORY', href: '/about' },
  { name: 'COLLECTIONS', href: '/collections' },
  {
    name: 'THE ATELIER',
    href: '/about',
    hasDropdown: true,
    dropdownItems: [
      { name: 'Craftsmanship', href: '/craftsmanship' },
      { name: 'Materials', href: '/materials' },
      { name: 'Bespoke', href: '/bespoke' },
    ],
  },
  { name: 'CONTACT US', href: '/contact', hasContactPanel: true },
];

const Navbar = ({ variant = 'solid' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const prevScrollYRef = useRef(0);
  const contactItemRef = useRef(null);
  const dropdownCloseTimerRef = useRef(null);
  const location = useLocation();

  const isOverlayPage = variant === 'transparent';
  const showSolid = !isOverlayPage || isScrolledPastHero;

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
    if (dropdownCloseTimerRef.current) {
      window.clearTimeout(dropdownCloseTimerRef.current);
      dropdownCloseTimerRef.current = null;
    }
    setActiveDropdown(null);
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
    const [pathname, hash] = href.split('#');
    if (href === '/') return location.pathname === '/' && !location.hash;
    if (hash) return location.pathname === pathname && location.hash === `#${hash}`;
    if (pathname.startsWith('/')) return location.pathname === pathname;
    return false;
  };

  const closeMobile = () => {
    setIsOpen(false);
    setMobileExpanded(null);
  };

  const cancelDropdownClose = () => {
    if (dropdownCloseTimerRef.current) {
      window.clearTimeout(dropdownCloseTimerRef.current);
      dropdownCloseTimerRef.current = null;
    }
  };

  const openDropdown = (name) => {
    cancelDropdownClose();
    setActiveDropdown(name);
  };

  const scheduleDropdownClose = (link, preserveFocusedContent = false) => {
    cancelDropdownClose();
    dropdownCloseTimerRef.current = window.setTimeout(() => {
      const contactItem = link.hasContactPanel ? contactItemRef.current : null;
      const cursorIsInside = contactItem?.matches(':hover');
      const focusIsInside = preserveFocusedContent && contactItem?.contains(document.activeElement);

      if (!cursorIsInside && !focusIsInside) setActiveDropdown(null);
      dropdownCloseTimerRef.current = null;
    }, 180);
  };

  useEffect(() => () => cancelDropdownClose(), []);

  return (
    <header
      className={`navbar-header ${showSolid ? 'navbar-solid' : 'navbar-transparent'}${variant === 'home' ? ' navbar-home' : ''}${isScrolledPastHero ? ' navbar-scrolled' : ''}${
        !isVisible && !isOpen ? ' navbar-hidden' : ''
      }${isOpen ? ' navbar-menu-open' : ''}`}
    >
      <div className="navbar-container">
        <div className="navbar-wrapper">
          <Link to="/" className="navbar-logo" onClick={closeMobile}>
            <img src={isOpen ? WhiteLogo : showSolid ? Logo : WhiteLogo} alt="Mink Studio Logo" />
          </Link>

          <nav className="navbar-nav">
            <ul className="navbar-menu">
              {navLinks.map((link) => (
                <li
                  key={link.name}
                  className="nav-item"
                  ref={link.hasContactPanel ? contactItemRef : undefined}
                  onMouseEnter={() => {
                    if (link.hasDropdown || link.hasContactPanel) openDropdown(link.name);
                  }}
                  onMouseLeave={() => {
                    if (link.hasDropdown || link.hasContactPanel) {
                      scheduleDropdownClose(link, false);
                    }
                  }}
                  onFocus={() => {
                    if (link.hasDropdown || link.hasContactPanel) openDropdown(link.name);
                  }}
                  onBlur={(event) => {
                    if ((link.hasDropdown || link.hasContactPanel) && !event.currentTarget.contains(event.relatedTarget)) {
                      scheduleDropdownClose(link, true);
                    }
                  }}
                >
                  {link.hasDropdown ? (
                    <button
                      type="button"
                      className="nav-link"
                      aria-haspopup="menu"
                      aria-expanded={activeDropdown === link.name}
                      aria-controls="atelier-dropdown"
                      onClick={() => openDropdown(link.name)}
                      onKeyDown={(event) => {
                        if (event.key === 'Escape') {
                          setActiveDropdown(null);
                          event.currentTarget.blur();
                        }
                      }}
                    >
                      <span className="circle-icon" />
                      {link.name}
                    </button>
                  ) : link.href.startsWith('/') ? (
                    <Link
                      to={link.href}
                      className={`nav-link ${isActive(link.href) ? 'active' : ''}`}
                      aria-haspopup={link.hasContactPanel ? 'dialog' : undefined}
                      aria-expanded={link.hasContactPanel ? activeDropdown === link.name : undefined}
                      onClick={link.hasContactPanel ? () => {
                        cancelDropdownClose();
                        setActiveDropdown(null);
                      } : undefined}
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
                    <div id="atelier-dropdown" className="dropdown-menu" role="menu">
                      {link.dropdownItems.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className="dropdown-item"
                          role="menuitem"
                          onClick={() => setActiveDropdown(null)}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}

                  {link.hasContactPanel && activeDropdown === link.name && (
                    <HeaderContactPanel />
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="navbar-actions">
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
            {link.hasDropdown ? (
              <>
                <button
                  type="button"
                  className="mobile-dropdown-trigger"
                  aria-expanded={mobileExpanded === link.name}
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
                    {link.dropdownItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="mobile-submenu-item"
                        onClick={closeMobile}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : link.href.startsWith('/') ? (
              <Link
                to={link.href}
                className={`nav-link ${isActive(link.href) ? 'active' : ''}`}
                onClick={closeMobile}
              >
                <span className="circle-icon" />
                {link.name}
              </Link>
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
