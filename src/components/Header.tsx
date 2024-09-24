import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { FiLogOut, FiUser } from 'react-icons/fi'; 

const Header = () => {
  const {  role, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/auth/login');
  };

  return (
    <header className="bg-[#164e63] text-white p-4 mt-2 flex justify-between items-center shadow-md rounded-2xl">
      <div className="flex items-center">
        <FiUser className="text-2xl mr-2" />
        <h1 className="text-xl font-bold">
          {role === 'admin' ? 'Welcome Admin' : 'Welcome User'}
        </h1>
      </div>
      <button
        onClick={handleLogout}
        className="bg-red-500 px-4 py-2 rounded-md flex items-center hover:bg-red-600 transition duration-150"
        title="Logout"
      >
        <FiLogOut className="mr-2" />
        Logout
      </button>
    </header>
  );
};

export default Header;
