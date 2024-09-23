// pages/user/home.tsx
import ProtectedRoute from '../../components/ProtectedRoute';

const UserHome = () => {
  return (
    <ProtectedRoute>
      <h1>User Home</h1>
      {/* User content here */}
    </ProtectedRoute>
  );
};

export default UserHome;
