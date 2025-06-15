import { useState, useEffect } from 'react';
import { Card } from '../components/components/ui/card';
import { Calendar, Users, Clock, TrendingUp } from 'lucide-react';

interface DashboardStats {
  totalAppointments: number;
  todayAppointments: number;
  totalPatients: number;
  cancelledAppointments: number;
}

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalAppointments: 0,
    todayAppointments: 0,
    totalPatients: 0,
    cancelledAppointments: 0,
  });

  useEffect(() => {
    const mockStats: DashboardStats = {
      totalAppointments: 1247,
      todayAppointments: 12,
      totalPatients: 387,
      cancelledAppointments: 23,
    };
    
    setTimeout(() => setStats(mockStats), 1000);
  }, []);

  const statCards = [
    {
      title: 'Agendamentos Hoje',
      value: stats.todayAppointments,
      icon: Calendar,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Total de Pacientes',
      value: stats.totalPatients,
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Total Agendamentos',
      value: stats.totalAppointments,
      icon: Clock,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Cancelamentos',
      value: stats.cancelledAppointments,
      icon: TrendingUp,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
  ];

  const upcomingAppointments = [
    { id: 1, patient: 'Maria Silva', time: '09:00', service: 'Consulta Geral' },
    { id: 2, patient: 'João Santos', time: '10:30', service: 'Exame' },
    { id: 3, patient: 'Ana Costa', time: '14:00', service: 'Retorno' },
    { id: 4, patient: 'Pedro Lima', time: '15:30', service: 'Consulta Geral' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Visão geral dos agendamentos e estatísticas</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{card.title}</p>
                <p className="text-3xl font-bold text-gray-900">{card.value}</p>
              </div>
              <div className={`p-3 rounded-full ${card.bgColor}`}>
                <card.icon className={`h-6 w-6 ${card.color}`} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Agendamentos de Hoje</h3>
          <div className="space-y-3">
            {upcomingAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-medium">{appointment.patient}</p>
                  <p className="text-sm text-gray-600">{appointment.service}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-blue-600">{appointment.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Horários Mais Agendados</h3>
          <div className="space-y-3">
            {[
              { time: '09:00 - 10:00', count: 45 },
              { time: '14:00 - 15:00', count: 38 },
              { time: '10:00 - 11:00', count: 32 },
              { time: '15:00 - 16:00', count: 28 },
            ].map((slot, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <p className="font-medium">{slot.time}</p>
                <div className="flex items-center space-x-2">
                  <div className="bg-blue-200 rounded-full px-2 py-1">
                    <span className="text-xs font-medium text-blue-800">
                      {slot.count} agendamentos
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
