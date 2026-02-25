import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function DashboardLayout() {
  const { user } = useAuth();

  return (
    <div className="site-shell flex min-h-screen flex-col bg-tribal-50">
      <Navbar />
      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-5 px-4 py-8 md:flex-row">
        <Sidebar role={user?.role} />
        <section className="min-w-0 flex-1 rounded-xl border border-tribal-200 bg-white p-5 shadow-card md:p-6">
          <Outlet />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default DashboardLayout;
