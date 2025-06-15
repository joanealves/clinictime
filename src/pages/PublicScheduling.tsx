import { useState } from 'react';
import { Button } from '../components/components/ui/button';
import { Card } from '../components/components/ui/card';
import { Input } from '../components/components/ui/input';
import { Label } from '../components/components/ui/label';
import { Calendar } from '../components/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '../components/components/ui/popover';
import { CalendarIcon, Clock, User, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const PublicScheduling = () => {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [selectedProfessional, setSelectedProfessional] = useState('');
  const [patientData, setPatientData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const navigate = useNavigate();

  const services = [
    { id: '1', name: 'Consulta Geral', duration: 30, price: 150 },
    { id: '2', name: 'Exame de Rotina', duration: 60, price: 200 },
    { id: '3', name: 'Consulta de Retorno', duration: 20, price: 100 },
  ];

  const professionals = [
    { id: '1', name: 'Dr. João Santos', specialty: 'Clínico Geral' },
    { id: '2', name: 'Dra. Ana Costa', specialty: 'Cardiologista' },
  ];

  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30'
  ];

  const handleSchedule = () => {
    console.log('Agendamento realizado:', {
      date: selectedDate,
      time: selectedTime,
      service: selectedService,
      professional: selectedProfessional,
      patient: patientData,
    });

    toast.success('Agendamento realizado com sucesso! Você receberá uma confirmação por e-mail.');
    setStep(4);
  };

  const getSelectedService = () => {
    return services.find(s => s.id === selectedService);
  };

  const getSelectedProfessional = () => {
    return professionals.find(p => p.id === selectedProfessional);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-600 mb-2">ClinicTime</h1>
          <p className="text-xl text-gray-600">Agende sua consulta online</p>
          
          <Button
            variant="link"
            onClick={() => navigate('/login')}
            className="mt-4"
          >
            Área de profissionais
          </Button>
        </div>

        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= stepNumber 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {stepNumber}
                </div>
                {stepNumber < 4 && (
                  <div className={`w-12 h-1 mx-2 ${
                    step > stepNumber ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {step === 1 && (
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6">Escolha o serviço e profissional</h2>
            
            <div className="space-y-6">
              <div>
                <Label className="text-lg font-medium">Serviço</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  {services.map((service) => (
                    <div
                      key={service.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedService === service.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedService(service.id)}
                    >
                      <h3 className="font-medium">{service.name}</h3>
                      <p className="text-sm text-gray-600">{service.duration} minutos</p>
                      <p className="text-lg font-bold text-blue-600">{formatPrice(service.price)}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-lg font-medium">Profissional</Label>
                <Select value={selectedProfessional} onValueChange={setSelectedProfessional}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Selecione o profissional" />
                  </SelectTrigger>
                  <SelectContent>
                    {professionals.map((professional) => (
                      <SelectItem key={professional.id} value={professional.id}>
                        <div>
                          <p className="font-medium">{professional.name}</p>
                          <p className="text-sm text-gray-500">{professional.specialty}</p>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end mt-8">
              <Button
                onClick={() => setStep(2)}
                disabled={!selectedService || !selectedProfessional}
              >
                Próximo
              </Button>
            </div>
          </Card>
        )}

        {step === 2 && (
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6">Escolha a data e horário</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <Label className="text-lg font-medium mb-4 block">Data</Label>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date()}
                  className="rounded-md border"
                />
              </div>

              <div>
                <Label className="text-lg font-medium mb-4 block">Horário Disponível</Label>
                {selectedDate && (
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedTime(time)}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                )}
                {!selectedDate && (
                  <p className="text-gray-500">Selecione uma data para ver os horários disponíveis</p>
                )}
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <Button variant="outline" onClick={() => setStep(1)}>
                Voltar
              </Button>
              <Button
                onClick={() => setStep(3)}
                disabled={!selectedDate || !selectedTime}
              >
                Próximo
              </Button>
            </div>
          </Card>
        )}

        {step === 3 && (
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6">Seus dados</h2>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Nome Completo</Label>
                <Input
                  id="name"
                  value={patientData.name}
                  onChange={(e) => setPatientData({...patientData, name: e.target.value})}
                  placeholder="Seu nome completo"
                />
              </div>
              <div>
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  value={patientData.email}
                  onChange={(e) => setPatientData({...patientData, email: e.target.value})}
                  placeholder="seu@email.com"
                />
              </div>
              <div>
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  value={patientData.phone}
                  onChange={(e) => setPatientData({...patientData, phone: e.target.value})}
                  placeholder="(11) 99999-9999"
                />
              </div>
            </div>

            <div className="mt-8 p-6 bg-gray-50 rounded-lg">
              <h3 className="font-bold mb-4">Resumo do Agendamento</h3>
              <div className="space-y-2 text-sm">
                <p><strong>Serviço:</strong> {getSelectedService()?.name}</p>
                <p><strong>Profissional:</strong> {getSelectedProfessional()?.name}</p>
                <p><strong>Data:</strong> {selectedDate && format(selectedDate, 'dd/MM/yyyy')}</p>
                <p><strong>Horário:</strong> {selectedTime}</p>
                <p><strong>Valor:</strong> {getSelectedService() && formatPrice(getSelectedService()!.price)}</p>
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <Button variant="outline" onClick={() => setStep(2)}>
                Voltar
              </Button>
              <Button
                onClick={handleSchedule}
                disabled={!patientData.name || !patientData.email || !patientData.phone}
              >
                Confirmar Agendamento
              </Button>
            </div>
          </Card>
        )}

        {step === 4 && (
          <Card className="p-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-green-600 mb-4">Agendamento Confirmado!</h2>
            <p className="text-gray-600 mb-8">
              Seu agendamento foi realizado com sucesso. Você receberá um e-mail de confirmação em breve.
            </p>
            
            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h3 className="font-bold mb-4">Detalhes do Agendamento</h3>
              <div className="space-y-2 text-sm">
                <p><strong>Paciente:</strong> {patientData.name}</p>
                <p><strong>Serviço:</strong> {getSelectedService()?.name}</p>
                <p><strong>Profissional:</strong> {getSelectedProfessional()?.name}</p>
                <p><strong>Data:</strong> {selectedDate && format(selectedDate, 'dd/MM/yyyy')}</p>
                <p><strong>Horário:</strong> {selectedTime}</p>
                <p><strong>Valor:</strong> {getSelectedService() && formatPrice(getSelectedService()!.price)}</p>
              </div>
            </div>

            <Button onClick={() => window.location.reload()}>
              Fazer Novo Agendamento
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PublicScheduling;
