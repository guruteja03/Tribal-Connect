import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TribalBackground from '../components/animations/TribalBackground';

function MainLayout() {
  return (
    <div className="site-shell flex min-h-screen flex-col bg-tribal-50">
      <TribalBackground />
      <Navbar />
      <main className="relative z-10 mx-auto w-full max-w-7xl flex-1 px-4 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
