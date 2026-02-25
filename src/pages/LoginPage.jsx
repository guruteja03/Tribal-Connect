import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AnimatedPage from '../components/animations/AnimatedPage';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const rolePathMap = {
  admin: '/dashboard/admin',
  artisan: '/dashboard/artisan',
  customer: '/dashboard/customer',
  consultant: '/dashboard/consultant',
};

function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'customer',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const emailValid = useMemo(() => formData.email.includes('@') && formData.email.includes('.'), [formData.email]);
  const passwordValid = useMemo(() => formData.password.trim().length >= 6, [formData.password]);
  const isFormValid = emailValid && passwordValid;

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (errorMessage) setErrorMessage('');
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isFormValid) {
      setErrorMessage('Use a valid email and password with at least 6 characters.');
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 700));

    const user = login(formData);
    if (!user) {
      setIsLoading(false);
      setErrorMessage('Incorrect email, password, or role. Use the same credentials from Signup.');
      return;
    }

    const redirectPath = location.state?.from?.pathname || rolePathMap[user.role] || '/home';
    navigate(redirectPath, { replace: true });
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
          <h1>Welcome Back</h1>
          <p>
            Continue your journey across authentic indigenous craft collections with a secure, premium marketplace
            experience.
          </p>
          <svg className="auth-tribal-lines" viewBox="0 0 280 46" aria-hidden="true" focusable="false">
            <path d="M5 23H80L95 8L110 23L125 38L140 23H275" />
            <path d="M20 23H62M158 23H205M218 23H260" />
          </svg>
          <ul className="auth-points">
            <li>Verified handmade products</li>
            <li>Direct artisan support</li>
            <li>Cultural-first storytelling</li>
          </ul>
        </aside>

        <motion.div
          className="auth-card"
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.08 }}
        >
          <h2>Login</h2>
          <p className="auth-subtitle">Sign in to your account</p>

          <form onSubmit={handleSubmit} className="auth-form">
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
              className={`auth-input ${errorMessage && !emailValid ? 'is-error' : ''}`}
              placeholder="you@example.com"
            />

            <label className="auth-label" htmlFor="password">
              Password
            </label>
            <div className="auth-password-wrap">
              <input
                required
                id="password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`auth-input ${errorMessage && !passwordValid ? 'is-error' : ''}`}
                placeholder="Minimum 6 characters"
              />
              <button type="button" onClick={() => setShowPassword((prev) => !prev)} className="auth-toggle">
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>

            <label className="auth-label" htmlFor="role">
              Role
            </label>
            <select id="role" name="role" value={formData.role} onChange={handleChange} className="auth-input">
              <option value="admin">Admin</option>
              <option value="artisan">Artisan</option>
              <option value="customer">Customer</option>
              <option value="consultant">Cultural Consultant</option>
            </select>

            {errorMessage ? <p className="auth-error">{errorMessage}</p> : null}

            <button type="submit" className="auth-submit" disabled={isLoading}>
              {isLoading ? 'Signing In...' : 'Login'}
            </button>
          </form>

          <p className="auth-footer">
            New to Tribal Connect? <Link to="/register">Create account</Link>
          </p>
        </motion.div>
      </motion.section>
    </AnimatedPage>
  );
}

export default LoginPage;
