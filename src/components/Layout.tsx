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
  ChevronRight,
  Settings,
  Bell,
  Search,
  LogOut
} from 'lucide-react';
import { Badge } from '../components/components/ui/badge';
import { Input } from '../components/components/ui/input';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator 
} from '../components/components/ui/dropdown-menu';

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
    { path: '/dashboard', label: 'Dashboard', icon: Calendar, badge: null },
    { path: '/appointments', label: 'Agendamentos', icon: CalendarDays, badge: '3' },
    { path: '/patients', label: 'Pacientes', icon: User, badge: null },
    ...(user?.role === 'admin' ? [
      { path: '/professionals', label: 'Profissionais', icon: User, badge: null },
      { path: '/services', label: 'Serviços', icon: FileText, badge: null },
    ] : []),
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
      <div className={`bg-white shadow-xl transition-all duration-300 ${
        sidebarCollapsed ? 'w-16' : 'w-64'
      } border-r border-gray-200`}>
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {!sidebarCollapsed && (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg"></div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                  ClinicTime
                </h1>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hover:bg-gray-100"
            >
              {sidebarCollapsed ? <ChevronRight /> : <ChevronLeft />}
            </Button>
          </div>
        </div>

        <nav className="p-4">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3 py-3 rounded-xl transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 shadow-sm border-l-4 border-blue-600'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }`
                  }
                >
                  <div className="flex items-center">
                    <item.icon className="h-5 w-5" />
                    {!sidebarCollapsed && (
                      <span className="ml-3 font-medium">{item.label}</span>
                    )}
                  </div>
                  {!sidebarCollapsed && item.badge && (
                    <Badge variant="secondary" className="bg-red-100 text-red-600">
                      {item.badge}
                    </Badge>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Bem-vindo ao ClinicTime
                </h2>
                <p className="text-gray-600 mt-1">
                  {new Date().toLocaleDateString('pt-BR', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input 
                    placeholder="Buscar..." 
                    className="pl-10 w-64 bg-gray-50 border-gray-200 focus:bg-white"
                  />
                </div>

                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-red-500">
                    3
                  </Badge>
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-white" />
                      </div>
                      <span className="font-medium">{user?.name}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      Perfil
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      Configurações
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Sair
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6 bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;