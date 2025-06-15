import { useState, useEffect } from 'react';
import { Card } from '../components/components/ui/card';
import { Button } from '../components/components/ui/button';
import { 
  Calendar, 
  Users, 
  DollarSign,
  AlertCircle,
  Activity
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface DashboardStats {
  totalAppointments: number;
  todayAppointments: number;
  totalPatients: number;
  cancelledAppointments: number;
  confirmedAppointments: number;
  revenue: number;
  pendingAppointments: number;
  completedAppointments: number;
}

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalAppointments: 0,
    todayAppointments: 0,
    totalPatients: 0,
    cancelledAppointments: 0,
    confirmedAppointments: 0,
    revenue: 0,
    pendingAppointments: 0,
    completedAppointments: 0,
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const mockStats: DashboardStats = {
      totalAppointments: 1247,
      todayAppointments: 12,
      totalPatients: 387,
      cancelledAppointments: 23,
      confirmedAppointments: 89,
      revenue: 45250,
      pendingAppointments: 8,
      completedAppointments: 156,
    };
    
    setTimeout(() => {
      setStats(mockStats);
      setIsLoading(false);
    }, 1000);
  }, []);

  const statCards = [
    {
      title: 'Agendamentos Hoje',
      value: stats.todayAppointments,
      icon: Calendar,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      gradient: 'from-blue-500 to-blue-600',
      change: '+12%',
      changeType: 'positive'
    },
    {
      title: 'Total de Pacientes',
      value: stats.totalPatients,
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      gradient: 'from-green-500 to-green-600',
      change: '+8%',
      changeType: 'positive'
    },
    {
      title: 'Receita do Mês',
      value: `R$ ${stats.revenue.toLocaleString('pt-BR')}`,
      icon: DollarSign,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      gradient: 'from-purple-500 to-purple-600',
      change: '+15%',
      changeType: 'positive'
    },
    {
      title: 'Pendentes',
      value: stats.pendingAppointments,
      icon: AlertCircle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      gradient: 'from-orange-500 to-orange-600',
      change: '-5%',
      changeType: 'negative'
    },
  ];

  const upcomingAppointments = [
    { 
      id: 1, 
      patient: 'Maria Silva', 
      time: '09:00', 
      service: 'Consulta Geral',
      status: 'confirmed',
      avatar: 'MS'
    },
    { 
      id: 2, 
      patient: 'João Santos', 
      time: '10:30', 
      service: 'Exame de Sangue',
      status: 'pending',
      avatar: 'JS'
    },
    { 
      id: 3, 
      patient: 'Ana Costa', 
      time: '14:00', 
      service: 'Retorno',
      status: 'confirmed',
      avatar: 'AC'
    },
    { 
      id: 4, 
      patient: 'Pedro Lima', 
      time: '15:30', 
      service: 'Consulta Geral',
      status: 'confirmed',
      avatar: 'PL'
    },
  ];

  const weeklyData = [
    { name: 'Seg', agendamentos: 12, receita: 1800 },
    { name: 'Ter', agendamentos: 19, receita: 2850 },
    { name: 'Qua', agendamentos: 15, receita: 2250 },
    { name: 'Qui', agendamentos: 22, receita: 3300 },
    { name: 'Sex', agendamentos: 18, receita: 2700 },
    { name: 'Sáb', agendamentos: 8, receita: 1200 },
    { name: 'Dom', agendamentos: 5, receita: 750 },
  ];

  const serviceData = [
    { name: 'Consulta Geral', value: 45, color: '#3B82F6' },
    { name: 'Exames', value: 30, color: '#10B981' },
    { name: 'Retorno', value: 15, color: '#8B5CF6' },
    { name: 'Emergência', value: 10, color: '#F59E0B' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmado';
      case 'pending':
        return 'Pendente';
      default:
        return status;
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="p-6 animate-pulse">
              <div className="h-20 bg-gray-200 rounded"></div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Visão geral dos agendamentos e estatísticas</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
          <Activity className="h-4 w-4 mr-2" />
          Relatório Completo
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <Card key={index} className="p-6 hover:shadow-lg transition-shadow border-0 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{card.title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{card.value}</p>
                <div className="flex items-center mt-2">
                  <span className={`text-xs font-medium ${
                    card.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {card.change}
                  </span>
                  <span className="text-xs text-gray-500 ml-1">vs. mês anterior</span>
                </div>
              </div>
              <div className={`p-4 rounded-xl bg-gradient-to-r ${card.gradient} shadow-lg`}>
                <card.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6 border-0 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Agendamentos da Semana</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="agendamentos" 
                stroke="#3B82F6" 
                strokeWidth={3}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 border-0 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Distribuição de Serviços</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={serviceData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {serviceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {serviceData.map((service, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: service.color }}
                  ></div>
                  <span className="text-sm text-gray-600">{service.name}</span>
                </div>
                <span className="text-sm font-medium">{service.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-6 border-0 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Agendamentos de Hoje</h3>
          <Button variant="outline" size="sm">
            Ver Todos
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {upcomingAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border hover:shadow-md transition-shadow"
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">{appointment.avatar}</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{appointment.patient}</p>
                  <p className="text-sm text-gray-600">{appointment.service}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-blue-600">{appointment.time}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                  {getStatusText(appointment.status)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;