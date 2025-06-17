import { useState } from 'react';
import { Button } from '../components/components/ui/button';
import { Card } from '../components/components/ui/card';
import { Input } from '../components/components/ui/input';
import { Label } from '../components/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogOverlay } from '../components/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/components/ui/table';
import { Plus, Trash2, User, Search, Edit, X } from 'lucide-react';

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
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  
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

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!newPatient.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }
    
    if (!newPatient.email.trim()) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(newPatient.email)) {
      newErrors.email = 'E-mail inválido';
    }
    
    if (!newPatient.phone.trim()) {
      newErrors.phone = 'Telefone é obrigatório';
    }
    
    if (!newPatient.cpf.trim()) {
      newErrors.cpf = 'CPF é obrigatório';
    }
    
    if (!newPatient.birthDate) {
      newErrors.birthDate = 'Data de nascimento é obrigatória';
    }
    
    if (!newPatient.address.trim()) {
      newErrors.address = 'Endereço é obrigatório';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreatePatient = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (editingPatient) {
        setPatients(patients.map(patient => 
          patient.id === editingPatient.id 
            ? { ...patient, ...newPatient }
            : patient
        ));
        console.log('Paciente atualizado com sucesso!');
      } else {
        const patient: Patient = {
          id: Date.now().toString(),
          ...newPatient,
        };
        setPatients([...patients, patient]);
        console.log('Paciente cadastrado com sucesso!');
      }

      resetForm();
      
    } catch (error) {
      console.error('Erro ao salvar paciente:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setNewPatient({
      name: '',
      email: '',
      phone: '',
      cpf: '',
      birthDate: '',
      address: '',
    });
    setErrors({});
    setEditingPatient(null);
    setIsDialogOpen(false);
  };

  const handleEditPatient = (patient: Patient) => {
    setEditingPatient(patient);
    setNewPatient({
      name: patient.name,
      email: patient.email,
      phone: patient.phone,
      cpf: patient.cpf,
      birthDate: patient.birthDate,
      address: patient.address,
    });
    setIsDialogOpen(true);
  };

  const handleDeletePatient = (id: string, name: string) => {
    if (window.confirm(`Tem certeza que deseja remover o paciente ${name}?`)) {
      setPatients(patients.filter(patient => patient.id !== id));
      console.log('Paciente removido com sucesso!');
    }
  };

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone.includes(searchTerm) ||
    patient.cpf.includes(searchTerm)
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

  const formatCPF = (cpf: string) => {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  const formatPhone = (phone: string) => {
    return phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  };



  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Pacientes</h1>
            <p className="text-gray-600 mt-1">Gerencie os pacientes da clínica</p>
            <p className="text-sm text-gray-500 mt-1">
              Total: {patients.length} paciente{patients.length !== 1 ? 's' : ''}
            </p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Novo Paciente
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-white border shadow-xl">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold text-gray-900">
                  {editingPatient ? 'Editar Paciente' : 'Cadastrar Novo Paciente'}
                </DialogTitle>
                <p className="text-sm text-gray-600">
                  Preencha todos os campos obrigatórios para {editingPatient ? 'atualizar' : 'cadastrar'} o paciente.
                </p>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                      Nome Completo *
                    </Label>
                    <Input
                      id="name"
                      value={newPatient.name}
                      onChange={(e) => setNewPatient({...newPatient, name: e.target.value})}
                      className={`mt-1 ${errors.name ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'}`}
                      placeholder="Digite o nome completo"
                      aria-describedby={errors.name ? "name-error" : undefined}
                    />
                    {errors.name && (
                      <p id="name-error" className="mt-1 text-sm text-red-600" role="alert">
                        {errors.name}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                      E-mail *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={newPatient.email}
                      onChange={(e) => setNewPatient({...newPatient, email: e.target.value})}
                      className={`mt-1 ${errors.email ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'}`}
                      placeholder="exemplo@email.com"
                      aria-describedby={errors.email ? "email-error" : undefined}
                    />
                    {errors.email && (
                      <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                      Telefone *
                    </Label>
                    <Input
                      id="phone"
                      value={newPatient.phone}
                      onChange={(e) => setNewPatient({...newPatient, phone: e.target.value})}
                      className={`mt-1 ${errors.phone ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'}`}
                      placeholder="(11) 99999-9999"
                      aria-describedby={errors.phone ? "phone-error" : undefined}
                    />
                    {errors.phone && (
                      <p id="phone-error" className="mt-1 text-sm text-red-600" role="alert">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="cpf" className="text-sm font-medium text-gray-700">
                      CPF *
                    </Label>
                    <Input
                      id="cpf"
                      value={newPatient.cpf}
                      onChange={(e) => setNewPatient({...newPatient, cpf: e.target.value})}
                      className={`mt-1 ${errors.cpf ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'}`}
                      placeholder="000.000.000-00"
                      aria-describedby={errors.cpf ? "cpf-error" : undefined}
                    />
                    {errors.cpf && (
                      <p id="cpf-error" className="mt-1 text-sm text-red-600" role="alert">
                        {errors.cpf}
                      </p>
                    )}
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="birthDate" className="text-sm font-medium text-gray-700">
                    Data de Nascimento *
                  </Label>
                  <Input
                    id="birthDate"
                    type="date"
                    value={newPatient.birthDate}
                    onChange={(e) => setNewPatient({...newPatient, birthDate: e.target.value})}
                    className={`mt-1 ${errors.birthDate ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'}`}
                    aria-describedby={errors.birthDate ? "birthDate-error" : undefined}
                  />
                  {errors.birthDate && (
                    <p id="birthDate-error" className="mt-1 text-sm text-red-600" role="alert">
                      {errors.birthDate}
                    </p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="address" className="text-sm font-medium text-gray-700">
                    Endereço *
                  </Label>
                  <Input
                    id="address"
                    value={newPatient.address}
                    onChange={(e) => setNewPatient({...newPatient, address: e.target.value})}
                    className={`mt-1 ${errors.address ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'}`}
                    placeholder="Rua, número, bairro - Cidade/Estado"
                    aria-describedby={errors.address ? "address-error" : undefined}
                  />
                  {errors.address && (
                    <p id="address-error" className="mt-1 text-sm text-red-600" role="alert">
                      {errors.address}
                    </p>
                  )}
                </div>
                
                <div className="flex justify-end space-x-3 pt-4 border-t">
                  <Button 
                    variant="outline"
                    onClick={resetForm}
                    disabled={isLoading}
                  >
                    Cancelar
                  </Button>
                  <Button 
                    onClick={handleCreatePatient}
                    disabled={isLoading}
                    className="bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 text-white"
                  >
                    {isLoading ? (editingPatient ? 'Salvando...' : 'Cadastrando...') : (editingPatient ? 'Salvar' : 'Cadastrar')}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Card className="bg-white shadow-sm border">
          <div className="p-6">
            <div className="mb-6">
              <div className="relative max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar por nome, e-mail, telefone ou CPF..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {searchTerm && (
                <p className="mt-2 text-sm text-gray-600">
                  {filteredPatients.length} resultado{filteredPatients.length !== 1 ? 's' : ''} encontrado{filteredPatients.length !== 1 ? 's' : ''}
                </p>
              )}
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold text-gray-700">Paciente</TableHead>
                    <TableHead className="font-semibold text-gray-700">Idade</TableHead>
                    <TableHead className="font-semibold text-gray-700">Contato</TableHead>
                    <TableHead className="font-semibold text-gray-700">CPF</TableHead>
                    <TableHead className="font-semibold text-gray-700">Última Consulta</TableHead>
                    <TableHead className="font-semibold text-gray-700 text-center">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPatients.map((patient) => (
                    <TableRow key={patient.id} className="hover:bg-gray-50 transition-colors">
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="flex-shrink-0">
                            <User className="h-10 w-10 text-gray-400 bg-gray-100 rounded-full p-2" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-medium text-gray-900 truncate">{patient.name}</p>
                            <p className="text-sm text-gray-500 truncate">{patient.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-900">
                        <span className="font-medium">{calculateAge(patient.birthDate)}</span> anos
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="text-gray-900">{formatPhone(patient.phone)}</p>
                          <p className="text-sm text-gray-500 truncate max-w-xs">
                            {patient.address}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-900 font-mono text-sm">
                        {formatCPF(patient.cpf)}
                      </TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          patient.lastVisit 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {patient.lastVisit ? formatDate(patient.lastVisit) : 'Nunca'}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditPatient(patient)}
                            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                            aria-label={`Editar paciente ${patient.name}`}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeletePatient(patient.id, patient.name)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            aria-label={`Excluir paciente ${patient.name}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredPatients.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-12">
                        <div className="flex flex-col items-center space-y-3">
                          <User className="h-12 w-12 text-gray-300" />
                          <div className="space-y-1">
                            <p className="text-gray-500 font-medium">
                              {searchTerm ? 'Nenhum paciente encontrado' : 'Nenhum paciente cadastrado'}
                            </p>
                            <p className="text-sm text-gray-400">
                              {searchTerm 
                                ? 'Tente buscar com outros termos' 
                                : 'Clique em "Novo Paciente" para começar'
                              }
                            </p>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </Card>


      </div>
    </div>
  );
};

export default Patients;