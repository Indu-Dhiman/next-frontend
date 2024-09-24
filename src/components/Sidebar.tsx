import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { FiMenu, FiX, FiHome, FiSettings, FiUser } from 'react-icons/fi'; // Icons

const Sidebar = () => {
  const { role } = useAuth();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = role === 'admin'
    ? [
        { name: 'Dashboard', path: '/admin/dashboard', icon: <FiHome /> },
        { name: 'Settings', path: '/admin/settings', icon: <FiSettings /> },
      ]
    : [
        { name: 'Home', path: '/user/home', icon: <FiHome /> },
        { name: 'Profile', path: '/user/profile', icon: <FiUser /> },
      ];

  return (
    <div>
      {/* Mobile Menu Icon */}
      <div className="md:hidden p-4 flex justify-between items-center bg-[#164e63] text-white shadow-md">
        <button onClick={toggleSidebar}>
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
        <span className="text-lg font-bold">{role === 'admin' ? 'Admin Panel' : 'User Panel'}</span>
      </div>

      {/* Sidebar */}
      <aside className={`m-2 rounded-xl bg-[#164e63] text-white h-screen w-64 fixed md:static transition-transform duration-300 ease-in-out z-50 md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-8">{role === 'admin' ? 'Admin Panel' : 'User Panel'}</h2>
          <nav>
            <ul>
              {menuItems.map((item) => (
                <li key={item.path} className="mb-4">
                  <Link href={item.path}>
                    <span
                      className={`flex items-center py-2 px-4 rounded-md transition-colors duration-200 hover:bg-gray-700 ${
                        pathname === item.path ? 'bg-gray-700' : ''
                      }`}
                    >
                      <span className="mr-2 text-lg">{item.icon}</span>
                      {item.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>

      {/* Background overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};

export default Sidebar;
