import ProtectedRoute from '../../../components/ProtectedRoute';

const AdminDashboard = () => {
  return (
    <ProtectedRoute>
      <h1>Admin Dashboard</h1>
    </ProtectedRoute>
  );
};

export default AdminDashboard;
