import { useState } from 'react';
import { Button } from '../components/components/ui/button';
import { Card } from '../components/components/ui/card';
import { Input } from '../components/components/ui/input';
import { Label } from '../components/components/ui/label';
import { Calendar } from '../components/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../components/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/components/ui/table';
import { CalendarIcon, Plus, Trash2, User } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';

interface Appointment {
  id: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  service: string;
  professional: string;
  date: Date;
  time: string;
  status: 'scheduled' | 'confirmed' | 'cancelled';
}

const Appointments = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [view, setView] = useState<'day' | 'week'>('day');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      patientName: 'Maria Silva',
      patientEmail: 'maria@email.com',
      patientPhone: '(11) 99999-9999',
      service: 'Consulta Geral',
      professional: 'Dr. João Santos',
      date: new Date(),
      time: '09:00',
      status: 'confirmed',
    },
    {
      id: '2',
      patientName: 'Pedro Lima',
      patientEmail: 'pedro@email.com',
      patientPhone: '(11) 88888-8888',
      service: 'Exame',
      professional: 'Dr. Ana Costa',
      date: new Date(),
      time: '14:00',
      status: 'scheduled',
    },
  ]);

  const [newAppointment, setNewAppointment] = useState({
    patientName: '',
    patientEmail: '',
    patientPhone: '',
    service: '',
    professional: '',
    date: new Date(),
    time: '',
  });

  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30'
  ];

  const services = ['Consulta Geral', 'Exame', 'Retorno', 'Cirurgia'];
  const professionals = ['Dr. João Santos', 'Dr. Ana Costa', 'Dr. Maria Lima'];

  const handleCreateAppointment = () => {
    const appointment: Appointment = {
      id: Date.now().toString(),
      ...newAppointment,
      status: 'scheduled',
    };

    setAppointments([...appointments, appointment]);
    setNewAppointment({
      patientName: '',
      patientEmail: '',
      patientPhone: '',
      service: '',
      professional: '',
      date: new Date(),
      time: '',
    });
    setIsDialogOpen(false);
    toast.success('Agendamento criado com sucesso!');
  };

  const handleDeleteAppointment = (id: string) => {
    setAppointments(appointments.filter(apt => apt.id !== id));
    toast.success('Agendamento removido com sucesso!');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmado';
      case 'scheduled':
        return 'Agendado';
      case 'cancelled':
        return 'Cancelado';
      default:
        return status;
    }
  };

  const filteredAppointments = appointments.filter(apt => 
    format(apt.date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Agendamentos</h1>
          <p className="text-gray-600">Gerencie os agendamentos da clínica</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Novo Agendamento
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Novo Agendamento</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="patientName">Nome do Paciente</Label>
                <Input
                  id="patientName"
                  value={newAppointment.patientName}
                  onChange={(e) => setNewAppointment({...newAppointment, patientName: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="patientEmail">E-mail</Label>
                <Input
                  id="patientEmail"
                  type="email"
                  value={newAppointment.patientEmail}
                  onChange={(e) => setNewAppointment({...newAppointment, patientEmail: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="patientPhone">Telefone</Label>
                <Input
                  id="patientPhone"
                  value={newAppointment.patientPhone}
                  onChange={(e) => setNewAppointment({...newAppointment, patientPhone: e.target.value})}
                />
              </div>
              <div>
                <Label>Serviço</Label>
                <Select
                  value={newAppointment.service}
                  onValueChange={(value) => setNewAppointment({...newAppointment, service: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o serviço" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((service) => (
                      <SelectItem key={service} value={service}>
                        {service}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Profissional</Label>
                <Select
                  value={newAppointment.professional}
                  onValueChange={(value) => setNewAppointment({...newAppointment, professional: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o profissional" />
                  </SelectTrigger>
                  <SelectContent>
                    {professionals.map((professional) => (
                      <SelectItem key={professional} value={professional}>
                        {professional}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Data</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {format(newAppointment.date, "dd/MM/yyyy")}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={newAppointment.date}
                      onSelect={(date) => date && setNewAppointment({...newAppointment, date})}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Label>Horário</Label>
                <Select
                  value={newAppointment.time}
                  onValueChange={(value) => setNewAppointment({...newAppointment, time: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o horário" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleCreateAppointment}>
                Criar Agendamento
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-1 p-4">
          <h3 className="font-semibold mb-4">Selecionar Data</h3>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => date && setSelectedDate(date)}
            className="rounded-md border"
          />
        </Card>

        <Card className="lg:col-span-3 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">
              Agendamentos - {format(selectedDate, 'dd/MM/yyyy')}
            </h3>
            <div className="flex space-x-2">
              <Button
                variant={view === 'day' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setView('day')}
              >
                Dia
              </Button>
              <Button
                variant={view === 'week' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setView('week')}
              >
                Semana
              </Button>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Horário</TableHead>
                <TableHead>Paciente</TableHead>
                <TableHead>Serviço</TableHead>
                <TableHead>Profissional</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAppointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell className="font-medium">{appointment.time}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <div>
                        <p className="font-medium">{appointment.patientName}</p>
                        <p className="text-xs text-gray-500">{appointment.patientPhone}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{appointment.service}</TableCell>
                  <TableCell>{appointment.professional}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                      {getStatusText(appointment.status)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteAppointment(appointment.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filteredAppointments.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    Nenhum agendamento para esta data
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
};

export default Appointments;
