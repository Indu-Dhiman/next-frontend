// pages/admin/dashboard.tsx
import ProtectedRoute from '../../components/ProtectedRoute';

const AdminDashboard = () => {
  return (
    <ProtectedRoute>
      <h1>Admin Dashboard</h1>
      {/* Admin content here */}
    </ProtectedRoute>
  );
};

export default AdminDashboard;
