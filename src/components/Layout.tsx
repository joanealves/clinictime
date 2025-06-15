import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { Button } from '../components/components/ui/button';
import { 
  Calendar, 
  CalendarDays, 
  User, 
  FileText, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: Calendar },
    { path: '/appointments', label: 'Agendamentos', icon: CalendarDays },
    { path: '/patients', label: 'Pacientes', icon: User },
    ...(user?.role === 'admin' ? [
      { path: '/professionals', label: 'Profissionais', icon: User },
      { path: '/services', label: 'Serviços', icon: FileText },
    ] : []),
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className={`bg-white shadow-lg transition-all duration-300 ${
        sidebarCollapsed ? 'w-16' : 'w-64'
      }`}>
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            {!sidebarCollapsed && (
              <h1 className="text-xl font-bold text-blue-600">ClinicTime</h1>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            >
              {sidebarCollapsed ? <ChevronRight /> : <ChevronLeft />}
            </Button>
          </div>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-blue-100 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`
                  }
                >
                  <item.icon className="h-5 w-5" />
                  {!sidebarCollapsed && (
                    <span className="ml-3">{item.label}</span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          {!sidebarCollapsed && (
            <div className="p-3 bg-gray-100 rounded-lg">
              <p className="text-sm font-medium">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
          )}
          <Button
            variant="outline"
            onClick={handleLogout}
            className={`w-full mt-2 ${sidebarCollapsed ? 'px-2' : ''}`}
          >
            {sidebarCollapsed ? '⏻' : 'Sair'}
          </Button>
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b">
          <div className="px-6 py-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              Bem-vindo ao ClinicTime
            </h2>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
