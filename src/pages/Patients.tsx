import { useState } from 'react';
import { Button } from '../components/components/ui/button';
import { Card } from '../components/components/ui/card';
import { Input } from '../components/components/ui/input';
import { Label } from '../components/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/components/ui/table';
import { Plus, Trash2, User } from 'lucide-react';
import { toast } from 'sonner';

interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  birthDate: string;
  address: string;
  lastVisit?: string;
}

const Patients = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [patients, setPatients] = useState<Patient[]>([
    {
      id: '1',
      name: 'Maria Silva',
      email: 'maria@email.com',
      phone: '(11) 99999-9999',
      cpf: '123.456.789-00',
      birthDate: '1985-03-15',
      address: 'Rua das Flores, 123 - São Paulo/SP',
      lastVisit: '2024-01-15',
    },
    {
      id: '2',
      name: 'João Santos',
      email: 'joao@email.com',
      phone: '(11) 88888-8888',
      cpf: '987.654.321-00',
      birthDate: '1990-07-22',
      address: 'Av. Paulista, 456 - São Paulo/SP',
      lastVisit: '2024-01-10',
    },
  ]);

  const [newPatient, setNewPatient] = useState({
    name: '',
    email: '',
    phone: '',
    cpf: '',
    birthDate: '',
    address: '',
  });

  const handleCreatePatient = () => {
    const patient: Patient = {
      id: Date.now().toString(),
      ...newPatient,
    };

    setPatients([...patients, patient]);
    setNewPatient({
      name: '',
      email: '',
      phone: '',
      cpf: '',
      birthDate: '',
      address: '',
    });
    setIsDialogOpen(false);
    toast.success('Paciente cadastrado com sucesso!');
  };

  const handleDeletePatient = (id: string) => {
    setPatients(patients.filter(patient => patient.id !== id));
    toast.success('Paciente removido com sucesso!');
  };

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone.includes(searchTerm)
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pacientes</h1>
          <p className="text-gray-600">Gerencie os pacientes da clínica</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Novo Paciente
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Cadastrar Paciente</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input
                    id="name"
                    value={newPatient.name}
                    onChange={(e) => setNewPatient({...newPatient, name: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newPatient.email}
                    onChange={(e) => setNewPatient({...newPatient, email: e.target.value})}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    value={newPatient.phone}
                    onChange={(e) => setNewPatient({...newPatient, phone: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="cpf">CPF</Label>
                  <Input
                    id="cpf"
                    value={newPatient.cpf}
                    onChange={(e) => setNewPatient({...newPatient, cpf: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="birthDate">Data de Nascimento</Label>
                <Input
                  id="birthDate"
                  type="date"
                  value={newPatient.birthDate}
                  onChange={(e) => setNewPatient({...newPatient, birthDate: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="address">Endereço</Label>
                <Input
                  id="address"
                  value={newPatient.address}
                  onChange={(e) => setNewPatient({...newPatient, address: e.target.value})}
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleCreatePatient}>
                Cadastrar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="p-6">
        <div className="mb-4">
          <Input
            placeholder="Buscar pacientes por nome, e-mail ou telefone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Paciente</TableHead>
              <TableHead>Idade</TableHead>
              <TableHead>Contato</TableHead>
              <TableHead>CPF</TableHead>
              <TableHead>Última Consulta</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPatients.map((patient) => (
              <TableRow key={patient.id}>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <User className="h-8 w-8 text-gray-400 bg-gray-100 rounded-full p-2" />
                    <div>
                      <p className="font-medium">{patient.name}</p>
                      <p className="text-sm text-gray-500">{patient.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {calculateAge(patient.birthDate)} anos
                </TableCell>
                <TableCell>
                  <div>
                    <p>{patient.phone}</p>
                    <p className="text-sm text-gray-500 truncate max-w-xs">
                      {patient.address}
                    </p>
                  </div>
                </TableCell>
                <TableCell>{patient.cpf}</TableCell>
                <TableCell>
                  {patient.lastVisit ? formatDate(patient.lastVisit) : 'Nunca'}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeletePatient(patient.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {filteredPatients.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                  Nenhum paciente encontrado
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default Patients;
