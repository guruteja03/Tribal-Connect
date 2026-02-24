import { Link } from 'react-router-dom';
import AnimatedPage from '../components/animations/AnimatedPage';

function LandingPage() {
  return (
    <AnimatedPage className="space-y-12">
      <section className="rounded-2xl bg-gradient-to-r from-[#3e1127] via-[#2d2f7f] to-[#00696f] p-8 text-tribal-50 shadow-2xl md:p-14">
        <p className="mb-3 text-sm uppercase tracking-widest">TribalCraft Connect</p>
        <h1 className="max-w-2xl text-3xl font-bold leading-tight md:text-5xl">
          Promote Value-Added Handicrafts Through Ethical Digital Commerce
        </h1>
        <p className="mt-4 max-w-2xl text-tribal-100">
          Connect artisans, customers, cultural consultants, and administrators on one platform that protects heritage while growing livelihoods.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/register" className="btn-primary bg-tribal-100 text-tribal-800 hover:bg-white">
            Join Platform
          </Link>
          <Link to="/products" className="btn-secondary border-tribal-100 text-tribal-100 hover:bg-tribal-500/30">
            Explore Crafts
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <article className="card tribal-glass-card">
          <h3 className="text-xl font-semibold text-tribal-800">For Artisans</h3>
          <p className="mt-2 text-tribal-700">Showcase your work, manage products, and receive direct market feedback.</p>
        </article>
        <article className="card tribal-glass-card">
          <h3 className="text-xl font-semibold text-tribal-800">For Customers</h3>
          <p className="mt-2 text-tribal-700">Buy authentic craft products and support indigenous creative economies.</p>
        </article>
        <article className="card tribal-glass-card">
          <h3 className="text-xl font-semibold text-tribal-800">For Consultants</h3>
          <p className="mt-2 text-tribal-700">Review product narratives to preserve cultural meaning and context.</p>
        </article>
      </section>
    </AnimatedPage>
  );
}

export default LandingPage;
