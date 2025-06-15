import { useState } from 'react';
import { Button } from '../components/components/ui/button';
import { Card } from '../components/components/ui/card';
import { Input } from '../components/components/ui/input';
import { Label } from '../components/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/components/ui/table';
import { Plus, Trash2, User } from 'lucide-react';
import { toast } from 'sonner';

interface Professional {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialty: string;
  crm: string;
  status: 'active' | 'inactive';
}

const Professionals = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const [professionals, setProfessionals] = useState<Professional[]>([
    {
      id: '1',
      name: 'Dr. João Santos',
      email: 'joao@clinictime.com',
      phone: '(11) 99999-9999',
      specialty: 'Clínico Geral',
      crm: 'CRM/SP 123456',
      status: 'active',
    },
    {
      id: '2',
      name: 'Dra. Ana Costa',
      email: 'ana@clinictime.com',
      phone: '(11) 88888-8888',
      specialty: 'Cardiologista',
      crm: 'CRM/SP 654321',
      status: 'active',
    },
  ]);

  const [newProfessional, setNewProfessional] = useState({
    name: '',
    email: '',
    phone: '',
    specialty: '',
    crm: '',
    status: 'active' as const,
  });

  const specialties = [
    'Clínico Geral',
    'Cardiologista',
    'Dermatologista',
    'Neurologista',
    'Ortopedista',
    'Pediatra',
    'Ginecologista',
    'Psiquiatra',
  ];

  const handleCreateProfessional = () => {
    const professional: Professional = {
      id: Date.now().toString(),
      ...newProfessional,
    };

    setProfessionals([...professionals, professional]);
    setNewProfessional({
      name: '',
      email: '',
      phone: '',
      specialty: '',
      crm: '',
      status: 'active',
    });
    setIsDialogOpen(false);
    toast.success('Profissional cadastrado com sucesso!');
  };

  const handleDeleteProfessional = (id: string) => {
    setProfessionals(professionals.filter(prof => prof.id !== id));
    toast.success('Profissional removido com sucesso!');
  };

  const getStatusColor = (status: string) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800';
  };

  const getStatusText = (status: string) => {
    return status === 'active' ? 'Ativo' : 'Inativo';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Profissionais</h1>
          <p className="text-gray-600">Gerencie os profissionais da clínica</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Novo Profissional
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Cadastrar Profissional</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Nome Completo</Label>
                <Input
                  id="name"
                  value={newProfessional.name}
                  onChange={(e) => setNewProfessional({...newProfessional, name: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  value={newProfessional.email}
                  onChange={(e) => setNewProfessional({...newProfessional, email: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  value={newProfessional.phone}
                  onChange={(e) => setNewProfessional({...newProfessional, phone: e.target.value})}
                />
              </div>
              <div>
                <Label>Especialidade</Label>
                <Select
                  value={newProfessional.specialty}
                  onValueChange={(value) => setNewProfessional({...newProfessional, specialty: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a especialidade" />
                  </SelectTrigger>
                  <SelectContent>
                    {specialties.map((specialty) => (
                      <SelectItem key={specialty} value={specialty}>
                        {specialty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2">
                <Label htmlFor="crm">CRM</Label>
                <Input
                  id="crm"
                  value={newProfessional.crm}
                  onChange={(e) => setNewProfessional({...newProfessional, crm: e.target.value})}
                  placeholder="Ex: CRM/SP 123456"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleCreateProfessional}>
                Cadastrar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Profissional</TableHead>
              <TableHead>Especialidade</TableHead>
              <TableHead>CRM</TableHead>
              <TableHead>Contato</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {professionals.map((professional) => (
              <TableRow key={professional.id}>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <User className="h-8 w-8 text-gray-400 bg-gray-100 rounded-full p-2" />
                    <div>
                      <p className="font-medium">{professional.name}</p>
                      <p className="text-sm text-gray-500">{professional.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{professional.specialty}</TableCell>
                <TableCell>{professional.crm}</TableCell>
                <TableCell>{professional.phone}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(professional.status)}`}>
                    {getStatusText(professional.status)}
                  </span>
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteProfessional(professional.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default Professionals;
