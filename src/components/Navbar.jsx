import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const roleDashboardPath = {
  admin: '/dashboard/admin',
  artisan: '/dashboard/artisan',
  customer: '/dashboard/customer',
  consultant: '/dashboard/consultant',
};

function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = () => {
    setMenuOpen(false);
    logout();
    navigate('/login');
  };

  const closeMenu = () => setMenuOpen(false);

  const sharedLinks = (
    <>
      <NavLink to="/about" onClick={closeMenu} className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}>
        About
      </NavLink>
      <NavLink to="/contact" onClick={closeMenu} className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}>
        Contact
      </NavLink>
      <NavLink to="/products" onClick={closeMenu} className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}>
        Products
      </NavLink>
    </>
  );

  return (
    <header className={`tribal-navbar sticky top-0 z-50 ${scrolled ? 'is-scrolled' : ''}`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.55 }}>
          <Link to="/" className="logo-mark text-lg font-bold">
            <span className="logo-mark-symbol" aria-hidden="true" />
            Tribal Connect
          </Link>
        </motion.div>

        <div className="hidden items-center gap-4 text-sm md:flex">
          {sharedLinks}
          {!isAuthenticated ? (
            <>
              <NavLink to="/login" className="btn-secondary">
                Login
              </NavLink>
              <NavLink to="/register" className="btn-primary">
                Signup
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/home" className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}>
                Home
              </NavLink>
              <NavLink to={roleDashboardPath[user.role]} className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}>
                Dashboard
              </NavLink>
              {user.role === 'customer' ? (
                <NavLink to="/cart" className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}>
                  Cart
                </NavLink>
              ) : null}
              <NavLink to="/profile" className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}>
                {user.name}
              </NavLink>
              <button type="button" onClick={handleLogout} className="btn-secondary">
                Logout
              </button>
            </>
          )}
        </div>

        <button
          type="button"
          className="inline-flex items-center rounded-xl border border-[var(--tc-accent)]/35 px-3 py-2 text-sm font-semibold text-[var(--tc-ink)] md:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          Menu
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            initial={{ opacity: 0, x: 90 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 110 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mobile-nav md:hidden"
          >
            <div className="flex flex-col gap-3 text-[var(--tc-ink)]">
              {sharedLinks}
              {!isAuthenticated ? (
                <>
                  <NavLink to="/login" onClick={closeMenu} className="btn-secondary text-center">
                    Login
                  </NavLink>
                  <NavLink to="/register" onClick={closeMenu} className="btn-primary text-center">
                    Signup
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink to="/home" onClick={closeMenu} className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}>
                    Home
                  </NavLink>
                  <NavLink
                    to={roleDashboardPath[user.role]}
                    onClick={closeMenu}
                    className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
                  >
                    Dashboard
                  </NavLink>
                  {user.role === 'customer' ? (
                    <NavLink to="/cart" onClick={closeMenu} className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}>
                      Cart
                    </NavLink>
                  ) : null}
                  <NavLink to="/profile" onClick={closeMenu} className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}>
                    {user.name}
                  </NavLink>
                  <button type="button" onClick={handleLogout} className="btn-secondary">
                    Logout
                  </button>
                </>
              )}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
