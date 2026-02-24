import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="mx-auto max-w-xl text-center card">
      <h1 className="text-4xl font-bold text-tribal-800">404</h1>
      <p className="mt-2 text-tribal-700">The page you are looking for does not exist.</p>
      <Link to="/" className="btn-primary mt-5 inline-block">
        Back to Landing
      </Link>
    </div>
  );
}

export default NotFoundPage;
