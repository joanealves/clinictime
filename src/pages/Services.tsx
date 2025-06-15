import { useState } from 'react';
import { Button } from '../components/components/ui/button';
import { Card } from '../components/components/ui/card';
import { Input } from '../components/components/ui/input';
import { Label } from '../components/components/ui/label';
import { Textarea } from '../components/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/components/ui/table';
import { Plus, Trash2, FileText } from 'lucide-react';
import { toast } from 'sonner';

interface Service {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  status: 'active' | 'inactive';
}

const Services = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const [services, setServices] = useState<Service[]>([
    {
      id: '1',
      name: 'Consulta Geral',
      description: 'Consulta médica geral para avaliação e diagnóstico',
      duration: 30,
      price: 150,
      status: 'active',
    },
    {
      id: '2',
      name: 'Exame de Rotina',
      description: 'Exames laboratoriais e check-up de rotina',
      duration: 60,
      price: 200,
      status: 'active',
    },
    {
      id: '3',
      name: 'Consulta de Retorno',
      description: 'Consulta de acompanhamento e reavaliação',
      duration: 20,
      price: 100,
      status: 'active',
    },
  ]);

  const [newService, setNewService] = useState({
    name: '',
    description: '',
    duration: 30,
    price: 0,
    status: 'active' as const,
  });

  const handleCreateService = () => {
    const service: Service = {
      id: Date.now().toString(),
      ...newService,
    };

    setServices([...services, service]);
    setNewService({
      name: '',
      description: '',
      duration: 30,
      price: 0,
      status: 'active',
    });
    setIsDialogOpen(false);
    toast.success('Serviço cadastrado com sucesso!');
  };

  const handleDeleteService = (id: string) => {
    setServices(services.filter(service => service.id !== id));
    toast.success('Serviço removido com sucesso!');
  };

  const getStatusColor = (status: string) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800';
  };

  const getStatusText = (status: string) => {
    return status === 'active' ? 'Ativo' : 'Inativo';
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Serviços</h1>
          <p className="text-gray-600">Gerencie os serviços oferecidos pela clínica</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Novo Serviço
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Cadastrar Serviço</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Nome do Serviço</Label>
                <Input
                  id="name"
                  value={newService.name}
                  onChange={(e) => setNewService({...newService, name: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={newService.description}
                  onChange={(e) => setNewService({...newService, description: e.target.value})}
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="duration">Duração (minutos)</Label>
                  <Input
                    id="duration"
                    type="number"
                    value={newService.duration}
                    onChange={(e) => setNewService({...newService, duration: parseInt(e.target.value)})}
                  />
                </div>
                <div>
                  <Label htmlFor="price">Preço (R$)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={newService.price}
                    onChange={(e) => setNewService({...newService, price: parseFloat(e.target.value)})}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleCreateService}>
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
              <TableHead>Serviço</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Duração</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.map((service) => (
              <TableRow key={service.id}>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <FileText className="h-8 w-8 text-gray-400 bg-gray-100 rounded-full p-2" />
                    <div>
                      <p className="font-medium">{service.name}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="max-w-xs truncate">{service.description}</TableCell>
                <TableCell>{service.duration} min</TableCell>
                <TableCell className="font-medium">{formatPrice(service.price)}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(service.status)}`}>
                    {getStatusText(service.status)}
                  </span>
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteService(service.id)}
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

export default Services;
