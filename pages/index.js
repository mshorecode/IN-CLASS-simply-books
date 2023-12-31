/* eslint-disable react-hooks/exhaustive-deps */
import { useAuth } from '../utils/context/authContext';

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="text-center my-4">
      <h1>Welcome {user.displayName}!</h1>
    </div>
  );
}
