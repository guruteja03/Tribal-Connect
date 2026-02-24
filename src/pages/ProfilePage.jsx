import { useAuth } from '../context/AuthContext';

function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="mx-auto max-w-2xl card">
      <h1 className="section-title">Profile</h1>
      <div className="mt-5 space-y-2 text-tribal-700">
        <p><span className="font-semibold">Name:</span> {user?.name}</p>
        <p><span className="font-semibold">Email:</span> {user?.email}</p>
        <p><span className="font-semibold">Role:</span> {user?.role}</p>
      </div>
    </div>
  );
}

export default ProfilePage;
