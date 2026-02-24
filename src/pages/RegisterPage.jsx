import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import AnimatedPage from '../components/animations/AnimatedPage';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'customer',
  });
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    register(formData);
    navigate('/login');
  };

  return (
    <AnimatedPage className="auth-page">
      <motion.section
        className="auth-shell"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45 }}
      >
        <aside className="auth-promo">
          <div className="auth-shape auth-shape-one" />
          <div className="auth-shape auth-shape-two" />
          <p className="auth-kicker">Tribal Connect</p>
          <h1>Create Account</h1>
          <p>
            Join the platform as a buyer, artisan, consultant, or admin and help build a stronger tribal craft economy.
          </p>
          <svg className="auth-tribal-lines" viewBox="0 0 280 46" aria-hidden="true" focusable="false">
            <path d="M5 23H80L95 8L110 23L125 38L140 23H275" />
            <path d="M20 23H62M158 23H205M218 23H260" />
          </svg>
          <ul className="auth-points">
            <li>Easy profile setup</li>
            <li>Role-based marketplace access</li>
            <li>Seamless onboarding flow</li>
          </ul>
        </aside>

        <motion.div
          className="auth-card"
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.08 }}
        >
          <h2>Signup</h2>
          <p className="auth-subtitle">Create your account in a few steps</p>

          <form onSubmit={handleSubmit} className="auth-form">
            <label className="auth-label" htmlFor="name">
              Full Name
            </label>
            <input
              required
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="auth-input"
              placeholder="Your full name"
            />

            <label className="auth-label" htmlFor="email">
              Email
            </label>
            <input
              required
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="auth-input"
              placeholder="you@example.com"
            />

            <label className="auth-label" htmlFor="password">
              Password
            </label>
            <input
              required
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="auth-input"
              placeholder="Choose a secure password"
            />

            <label className="auth-label" htmlFor="role">
              Role
            </label>
            <select id="role" name="role" value={formData.role} onChange={handleChange} className="auth-input">
              <option value="artisan">Artisan</option>
              <option value="customer">Customer</option>
              <option value="consultant">Cultural Consultant</option>
              <option value="admin">Admin</option>
            </select>

            <button type="submit" className="auth-submit">
              Create Account
            </button>
          </form>

          <p className="auth-footer">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </motion.div>
      </motion.section>
    </AnimatedPage>
  );
}

export default RegisterPage;