import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { Button } from '../components/components/ui/button';
import { Card } from '../components/components/ui/card';
import { Input } from '../components/components/ui/input';
import { Label } from '../components/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/components/ui/dialog';
import { Plus, Trash2, FileText, Search, Edit, Clock, DollarSign } from 'lucide-react';

const Table = ({ children, ...props }: any) => (
  <table className="min-w-full divide-y divide-gray-200" {...props}>
    {children}
  </table>
);

const TableHeader = ({ children, ...props }: any) => (
  <thead className="bg-gray-50" {...props}>
    {children}
  </thead>
);

const TableBody = ({ children, ...props }: any) => (
  <tbody className="bg-white divide-y divide-gray-200" {...props}>
    {children}
  </tbody>
);

const TableRow = ({ children, className = '', ...props }: any) => (
  <tr className={className} {...props}>
    {children}
  </tr>
);

const TableHead = ({ children, className = '', ...props }: any) => (
  <th className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${className}`} {...props}>
    {children}
  </th>
);

const TableCell = ({ children, className = '', ...props }: any) => (
  <td className={`px-6 py-4 whitespace-nowrap text-sm ${className}`} {...props}>
    {children}
  </td>
);

const Textarea = ({ className = '', ...props }: any) => (
  <textarea 
    className={`flex min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50 ${className}`} 
    {...props} 
  />
);

interface Service {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  status: 'active' | 'inactive';
  category?: string;
}

const Services = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');
  
  const [services, setServices] = useState<Service[]>([
    {
      id: '1',
      name: 'Consulta Geral',
      description: 'Consulta médica geral para avaliação e diagnóstico inicial do paciente',
      duration: 30,
      price: 150,
      status: 'active',
      category: 'Consultas',
    },
    {
      id: '2',
      name: 'Exame de Rotina',
      description: 'Exames laboratoriais e check-up de rotina para prevenção e acompanhamento',
      duration: 60,
      price: 200,
      status: 'active',
      category: 'Exames',
    },
    {
      id: '3',
      name: 'Consulta de Retorno',
      description: 'Consulta de acompanhamento e reavaliação após tratamento inicial',
      duration: 20,
      price: 100,
      status: 'active',
      category: 'Consultas',
    },
    {
      id: '4',
      name: 'Procedimento Cirúrgico Menor',
      description: 'Pequenos procedimentos cirúrgicos ambulatoriais',
      duration: 45,
      price: 300,
      status: 'inactive',
      category: 'Procedimentos',
    },
  ]);

  const [newService, setNewService] = useState({
    name: '',
    description: '',
    duration: 30,
    price: 0,
    status: 'active' as const,
    category: '',
  });

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!newService.name.trim()) {
      newErrors.name = 'Nome do serviço é obrigatório';
    }
    
    if (!newService.description.trim()) {
      newErrors.description = 'Descrição é obrigatória';
    }
    
    if (!newService.duration || newService.duration <= 0) {
      newErrors.duration = 'Duração deve ser maior que zero';
    }
    
    if (!newService.price || newService.price <= 0) {
      newErrors.price = 'Preço deve ser maior que zero';
    }
    
    if (!newService.category.trim()) {
      newErrors.category = 'Categoria é obrigatória';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateService = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
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
        category: '',
      });
      setErrors({});
      setIsDialogOpen(false);
      
      console.log('Serviço cadastrado com sucesso!');
    } catch (error) {
      console.error('Erro ao cadastrar serviço:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteService = (id: string, name: string) => {
    if (window.confirm(`Tem certeza que deseja remover o serviço "${name}"?`)) {
      setServices(services.filter(service => service.id !== id));
      console.log('Serviço removido com sucesso!');
    }
  };

  const toggleServiceStatus = (id: string) => {
    setServices(services.map(service => 
      service.id === id 
        ? { ...service, status: service.status === 'active' ? 'inactive' : 'active' }
        : service
    ));
    console.log('Status do serviço atualizado!');
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewService({...newService, name: e.target.value});
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewService({...newService, description: e.target.value});
  };

  const handleDurationChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewService({...newService, duration: parseInt(e.target.value) || 0});
  };

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewService({...newService, price: parseFloat(e.target.value) || 0});
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setNewService({...newService, category: e.target.value});
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredServices = services.filter(service => {
    const matchesSearch = 
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.category?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || service.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-800 border-green-200' 
      : 'bg-red-100 text-red-800 border-red-200';
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

  const formatDuration = (minutes: number) => {
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}min` : `${hours}h`;
    }
    return `${minutes}min`;
  };

  const categories = ['Consultas', 'Exames', 'Procedimentos', 'Cirurgias', 'Outros'];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Serviços</h1>
            <p className="text-gray-600 mt-1">Gerencie os serviços oferecidos pela clínica</p>
            <p className="text-sm text-gray-500 mt-1">
              Total: {services.length} serviço{services.length !== 1 ? 's' : ''} | 
              Ativos: {services.filter(s => s.status === 'active').length}
            </p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Novo Serviço
              </Button>
            </DialogTrigger>
            <DialogContent 
              className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-white border shadow-lg"
              aria-describedby="dialog-description"
            >
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold text-gray-900">
                  Cadastrar Novo Serviço
                </DialogTitle>
                <p id="dialog-description" className="text-sm text-gray-600">
                  Preencha todos os campos obrigatórios para cadastrar um novo serviço.
                </p>
              </DialogHeader>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                    Nome do Serviço *
                  </Label>
                  <Input
                    id="name"
                    value={newService.name}
                    onChange={handleNameChange}
                    className={`mt-1 ${errors.name ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'}`}
                    placeholder="Ex: Consulta Cardiológica"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-1 text-sm text-red-600" role="alert">
                      {errors.name}
                    </p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="category" className="text-sm font-medium text-gray-700">
                    Categoria *
                  </Label>
                  <select
                    id="category"
                    value={newService.category}
                    onChange={handleCategoryChange}
                    className={`mt-1 w-full rounded-md border ${errors.category ? 'border-red-500' : 'border-gray-300'} bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 ${errors.category ? 'focus:ring-red-500' : 'focus:ring-blue-500'}`}
                    aria-invalid={!!errors.category}
                  >
                    <option value="">Selecione uma categoria</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="mt-1 text-sm text-red-600" role="alert">
                      {errors.category}
                    </p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                    Descrição *
                  </Label>
                  <Textarea
                    id="description"
                    value={newService.description}
                    onChange={handleDescriptionChange}
                    className={`mt-1 ${errors.description ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'}`}
                    rows={3}
                    placeholder="Descreva o serviço oferecido..."
                    aria-invalid={!!errors.description}
                    aria-describedby={errors.description ? "description-error" : undefined}
                  />
                  {errors.description && (
                    <p id="description-error" className="mt-1 text-sm text-red-600" role="alert">
                      {errors.description}
                    </p>
                  )}
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="duration" className="text-sm font-medium text-gray-700">
                      Duração (minutos) *
                    </Label>
                    <Input
                      id="duration"
                      type="number"
                      min="5"
                      max="480"
                      value={newService.duration}
                      onChange={handleDurationChange}
                      className={`mt-1 ${errors.duration ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'}`}
                      placeholder="30"
                      aria-invalid={!!errors.duration}
                      aria-describedby={errors.duration ? "duration-error" : undefined}
                    />
                    {errors.duration && (
                      <p id="duration-error" className="mt-1 text-sm text-red-600" role="alert">
                        {errors.duration}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="price" className="text-sm font-medium text-gray-700">
                      Preço (R$) *
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      min="0"
                      step="0.01"
                      value={newService.price}
                      onChange={handlePriceChange}
                      className={`mt-1 ${errors.price ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'}`}
                      placeholder="150.00"
                      aria-invalid={!!errors.price}
                      aria-describedby={errors.price ? "price-error" : undefined}
                    />
                    {errors.price && (
                      <p id="price-error" className="mt-1 text-sm text-red-600" role="alert">
                        {errors.price}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 pt-4 border-t">
                  <Button 
                    onClick={() => {
                      setIsDialogOpen(false);
                      setErrors({});
                    }}
                    disabled={isLoading}
                    variant="outline"
                  >
                    Cancelar
                  </Button>
                  <Button 
                    onClick={handleCreateService}
                    disabled={isLoading}
                    className="bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
                  >
                    {isLoading ? 'Cadastrando...' : 'Cadastrar'}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Card className="bg-white shadow-sm border">
          <div className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar serviços por nome, descrição ou categoria..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="pl-10 focus:ring-2 focus:ring-blue-500"
                  aria-label="Buscar serviços"
                />
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant={filterStatus === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterStatus('all')}
                >
                  Todos
                </Button>
                <Button
                  variant={filterStatus === 'active' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterStatus('active')}
                  className={filterStatus === 'active' ? 'bg-green-600 hover:bg-green-700' : ''}
                >
                  Ativos
                </Button>
                <Button
                  variant={filterStatus === 'inactive' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterStatus('inactive')}
                  className={filterStatus === 'inactive' ? 'bg-red-600 hover:bg-red-700' : ''}
                >
                  Inativos
                </Button>
              </div>
            </div>
            
            {searchTerm && (
              <p className="mb-4 text-sm text-gray-600">
                {filteredServices.length} resultado{filteredServices.length !== 1 ? 's' : ''} encontrado{filteredServices.length !== 1 ? 's' : ''}
              </p>
            )}

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-semibold text-gray-700">Serviço</TableHead>
                    <TableHead className="font-semibold text-gray-700">Descrição</TableHead>
                    <TableHead className="font-semibold text-gray-700">Duração</TableHead>
                    <TableHead className="font-semibold text-gray-700">Preço</TableHead>
                    <TableHead className="font-semibold text-gray-700">Status</TableHead>
                    <TableHead className="font-semibold text-gray-700 text-center">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredServices.map((service) => (
                    <TableRow key={service.id} className="hover:bg-gray-50 transition-colors">
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="flex-shrink-0">
                            <FileText className="h-10 w-10 text-blue-500 bg-blue-50 rounded-full p-2" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-medium text-gray-900 truncate">{service.name}</p>
                            {service.category && (
                              <p className="text-sm text-gray-500">{service.category}</p>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-xs">
                        <p className="text-gray-900 line-clamp-2 text-sm leading-relaxed">
                          {service.description}
                        </p>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-gray-900">
                          <Clock className="h-4 w-4 mr-1 text-gray-400" />
                          {formatDuration(service.duration)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-gray-900 font-medium">
                          <DollarSign className="h-4 w-4 mr-1 text-gray-400" />
                          {formatPrice(service.price)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <button
                          onClick={() => toggleServiceStatus(service.id)}
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border transition-colors ${getStatusColor(service.status)} hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                          aria-label={`Alterar status do serviço ${service.name}`}
                        >
                          {getStatusText(service.status)}
                        </button>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                            aria-label={`Editar serviço ${service.name}`}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteService(service.id, service.name)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            aria-label={`Remover serviço ${service.name}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredServices.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-12">
                        <div className="flex flex-col items-center space-y-3">
                          <FileText className="h-12 w-12 text-gray-300" />
                          <div className="space-y-1">
                            <p className="text-gray-500 font-medium">
                              {searchTerm ? 'Nenhum serviço encontrado' : 'Nenhum serviço cadastrado'}
                            </p>
                            <p className="text-sm text-gray-400">
                              {searchTerm 
                                ? 'Tente buscar com outros termos' 
                                : 'Clique em "Novo Serviço" para começar'
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

export default Services;