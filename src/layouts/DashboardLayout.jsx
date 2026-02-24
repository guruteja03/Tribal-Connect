import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function DashboardLayout() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-tribal-50">
      <Navbar />
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-4 py-8 md:flex-row">
        <Sidebar role={user?.role} />
        <section className="flex-1 rounded-xl border border-tribal-200 bg-white p-5 shadow-card">
          <Outlet />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default DashboardLayout;
