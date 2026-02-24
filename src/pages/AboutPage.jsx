import AnimatedPage from '../components/animations/AnimatedPage';

function AboutPage() {
  return (
    <AnimatedPage className="space-y-6">
      <h1 className="section-title text-white">About Tribal Connect</h1>
      <div className="card tribal-glass-card space-y-3">
        <p>
          TribalCraft Connect is a digital platform that helps tribal artisans showcase value-added handicrafts and reach wider markets.
        </p>
        <p>
          We emphasize ethical trade, transparent storytelling, and cultural respect by integrating consultants into the product review process.
        </p>
      </div>
    </AnimatedPage>
  );
}

export default AboutPage;
