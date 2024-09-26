import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { FiLogOut, FiUser } from "react-icons/fi";

const Header = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/auth/login");
  };

  return (
    <header className="bg-[#164e63] text-white p-4 mt-2 flex justify-between items-center shadow-md rounded-2xl">
      <div className="flex items-center">
        <FiUser className="text-2xl mr-2" />
        <h1 className="text-xl font-bold">{`Welcome ${user?.username}`}</h1>
      </div>

      <FiLogOut className="mr-2" size={25} onClick={handleLogout} />
    </header>
  );
};

export default Header;
