import AnimatedPage from '../components/animations/AnimatedPage';

function ContactPage() {
  return (
    <AnimatedPage className="mx-auto max-w-2xl space-y-5">
      <h1 className="section-title text-white">Contact</h1>
      <div className="card tribal-glass-card space-y-3">
        <p>Email: support@tribalcraftconnect.org</p>
        <p>Phone: +1 (555) 010-2233</p>
        <p>Address: 28 Heritage Lane, Craft District</p>
      </div>
    </AnimatedPage>
  );
}

export default ContactPage;
