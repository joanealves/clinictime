import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/components/ui/card';
import { Button } from '../components/components/ui/button';
import { Input } from '../components/components/ui/input';
import { Label } from '../components/components/ui/label';
import { Textarea } from '../components/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/components/ui/select';
import { Badge } from '../components/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/components/ui/dialog';
import { Calendar, FileText, Plus, Search, Download, Trash2, Edit, User, Stethoscope, AlertTriangle, Clock, MapPin } from 'lucide-react';

export interface Exame {
  id: number;
  pacienteId: number;
  paciente: string;
  medico: string;
  crm?: string;
  tipo: string;
  categoria: 'laboratorial' | 'imagem' | 'cardiologico' | 'neurologico' | 'outro';
  data: string;
  dataColeta?: string;
  status: 'pendente' | 'coletado' | 'processando' | 'concluido' | 'cancelado';
  prioridade: 'normal' | 'urgente' | 'emergencia';
  observacoes?: string;
  preparo?: string;
  resultado?: ResultadoExame;
  local?: string;
  valor?: number;
}

export interface ResultadoExame {
  data: string;
  arquivo?: string;
  observacoes: string;
  valores?: { [key: string]: string | number };
  normal: boolean;
  medicoLaudante?: string;
}

type StatusExame = Exame['status'];
type PrioridadeExame = Exame['prioridade'];
type CategoriaExame = Exame['categoria'];

type NovoExameForm = Omit<Exame, 'id'>;

const ExamsPage: React.FC = () => {
  const [exames, setExames] = useState<Exame[]>([]);
  const [novoExame, setNovoExame] = useState<NovoExameForm>({
    pacienteId: 0,
    paciente: '',
    medico: '',
    crm: '',
    tipo: '',
    categoria: 'laboratorial',
    data: '',
    dataColeta: '',
    status: 'pendente',
    prioridade: 'normal',
    observacoes: '',
    preparo: '',
    local: '',
    valor: 0
  });

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filtroStatus, setFiltroStatus] = useState<StatusExame | 'todos'>('todos');
  const [filtroPrioridade, setFiltroPrioridade] = useState<PrioridadeExame | 'todos'>('todos');
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    const initialExames: Exame[] = [
      {
        id: 1,
        pacienteId: 101,
        paciente: 'Maria Silva',
        medico: 'Dr. João Pereira',
        crm: 'SP12345',
        tipo: 'Hemograma Completo',
        categoria: 'laboratorial',
        data: '2023-01-15',
        dataColeta: '2023-01-14',
        status: 'concluido',
        prioridade: 'normal',
        observacoes: 'Paciente em jejum de 8h.',
        resultado: {
          data: '2023-01-16',
          observacoes: 'Resultados dentro da normalidade.',
          normal: true,
          valores: { 'Hemoglobina': 14.5, 'Leucócitos': 7500 }
        },
        local: 'Laboratório Central',
        valor: 85.00
      },
      {
        id: 2,
        pacienteId: 102,
        paciente: 'Carlos Eduardo',
        medico: 'Dra. Ana Santos',
        crm: 'RJ98765',
        tipo: 'Raio-X Tórax',
        categoria: 'imagem',
        data: '2023-01-20',
        status: 'pendente',
        prioridade: 'urgente',
        preparo: 'Nenhum preparo especial necessário.',
        local: 'Clínica de Imagem XYZ',
        valor: 150.00
      },
      {
        id: 3,
        pacienteId: 103,
        paciente: 'Fernanda Lima',
        medico: 'Dr. Ricardo Neves',
        crm: 'MG54321',
        tipo: 'Eletrocardiograma',
        categoria: 'cardiologico',
        data: '2023-02-01',
        status: 'processando',
        prioridade: 'normal',
        observacoes: 'Dor no peito relatada.',
        local: 'Hospital Municipal',
        valor: 70.00
      }
    ];
    setExames(initialExames);
  }, []);

  const tiposExame: Record<CategoriaExame, string[]> = {
    laboratorial: [
      'Hemograma Completo',
      'Glicemia',
      'Colesterol Total e Frações',
      'Triglicerídeos',
      'Ureia e Creatinina',
      'TGO/TGP',
      'Urina Tipo I',
      'TSH',
      'T4 Livre',
      'PSA',
      'Beta HCG'
    ],
    imagem: [
      'Raio-X Tórax',
      'Raio-X Abdome',
      'Ultrassom Abdome',
      'Ultrassom Pélvico',
      'Tomografia Computadorizada',
      'Ressonância Magnética',
      'Mamografia',
      'Densitometria Óssea'
    ],
    cardiologico: [
      'Eletrocardiograma',
      'Ecocardiograma',
      'Teste Ergométrico',
      'Holter 24h',
      'MAPA'
    ],
    neurologico: [
      'Eletroencefalograma',
      'Eletromiografia',
      'Doppler Transcraniano'
    ],
    outro: [
      'Exame Personalizado'
    ]
  };

  const onAdicionarExame = (exame: Omit<Exame, 'id'>): void => {
    const newId = exames.length > 0 ? Math.max(...exames.map(e => e.id)) + 1 : 1;
    setExames(prevExames => [...prevExames, { ...exame, id: newId }]);
  };

  const onAtualizarExame = (id: number, updates: Partial<Exame>): void => {
    setExames(prevExames =>
      prevExames.map(exame => (exame.id === id ? { ...exame, ...updates } : exame))
    );
  };

  const onRemoverExame = (id: number): void => {
    setExames(prevExames => prevExames.filter(exame => exame.id !== id));
  };

  const adicionarExame = (): void => {
    if (novoExame.paciente && novoExame.tipo) {
      onAdicionarExame({
        ...novoExame,
        pacienteId: Date.now() 
      });

      setNovoExame({
        pacienteId: 0,
        paciente: '',
        medico: '',
        crm: '',
        tipo: '',
        categoria: 'laboratorial',
        data: '',
        dataColeta: '',
        status: 'pendente',
        prioridade: 'normal',
        observacoes: '',
        preparo: '',
        local: '',
        valor: 0
      });
      setIsDialogOpen(false);
    }
  };

  const atualizarStatus = (id: number, novoStatus: StatusExame): void => {
    const updates: Partial<Exame> = { status: novoStatus };

    if (novoStatus === 'concluido') {
      const resultado = prompt('Digite o resultado do exame:');
      const medicoLaudante = prompt('Digite o nome do médico laudante (opcional):');
      if (resultado) {
        updates.resultado = {
          data: new Date().toISOString().split('T')[0],
          observacoes: resultado,
          normal: true, 
          valores: {},
          medicoLaudante: medicoLaudante || undefined
        };
      }
    }

    onAtualizarExame(id, updates);
  };

  const examesFiltrados = exames.filter((exame: Exame): boolean => {
    const matchSearch = exame.paciente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exame.tipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exame.medico.toLowerCase().includes(searchTerm.toLowerCase());

    const matchStatus = filtroStatus === 'todos' || exame.status === filtroStatus;
    const matchPrioridade = filtroPrioridade === 'todos' || exame.prioridade === filtroPrioridade;

    return matchSearch && matchStatus && matchPrioridade;
  });

  const StatusBadge: React.FC<{ status: StatusExame }> = ({ status }) => {
    const colors: Record<StatusExame, string> = {
      pendente: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      coletado: 'bg-blue-100 text-blue-800 border-blue-300',
      processando: 'bg-purple-100 text-purple-800 border-purple-300',
      concluido: 'bg-green-100 text-green-800 border-green-300',
      cancelado: 'bg-red-100 text-red-800 border-red-300'
    };

    return (
      <Badge className={`${colors[status]} border`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const PrioridadeBadge: React.FC<{ prioridade: PrioridadeExame }> = ({ prioridade }) => {
    const colors: Record<PrioridadeExame, string> = {
      normal: 'bg-gray-100 text-gray-800',
      urgente: 'bg-orange-100 text-orange-800',
      emergencia: 'bg-red-100 text-red-800'
    };

    const icons: Record<PrioridadeExame, React.ReactNode> = {
      normal: <Clock size={12} />,
      urgente: <AlertTriangle size={12} />,
      emergencia: <AlertTriangle size={12} />
    };

    return (
      <Badge className={`${colors[prioridade]} flex items-center gap-1`}>
        {icons[prioridade]}
        {prioridade.charAt(0).toUpperCase() + prioridade.slice(1)}
      </Badge>
    );
  };

  const handleCategoriaChange = (categoria: CategoriaExame): void => {
    setNovoExame({
      ...novoExame,
      categoria,
      tipo: ''
    });
  };

  const handleInputChange = (field: keyof NovoExameForm, value: string | number): void => {
    setNovoExame(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Gerenciamento de Exames</h1>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar exames..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Select
              value={filtroStatus}
              onValueChange={(value: StatusExame | 'todos') => setFiltroStatus(value)}
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos Status</SelectItem>
                <SelectItem value="pendente">Pendente</SelectItem>
                <SelectItem value="coletado">Coletado</SelectItem>
                <SelectItem value="processando">Processando</SelectItem>
                <SelectItem value="concluido">Concluído</SelectItem>
                <SelectItem value="cancelado">Cancelado</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filtroPrioridade}
              onValueChange={(value: PrioridadeExame | 'todos') => setFiltroPrioridade(value)}
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Prioridade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todas</SelectItem>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="urgente">Urgente</SelectItem>
                <SelectItem value="emergencia">Emergência</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus size={16} />
                Novo Exame
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Solicitar Novo Exame</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="paciente">Paciente</Label>
                    <Input
                      id="paciente"
                      value={novoExame.paciente}
                      onChange={(e) => handleInputChange('paciente', e.target.value)}
                      placeholder="Nome do paciente"
                    />
                  </div>
                  <div>
                    <Label htmlFor="medico">Médico Solicitante</Label>
                    <Input
                      id="medico"
                      value={novoExame.medico}
                      onChange={(e) => handleInputChange('medico', e.target.value)}
                      placeholder="Nome do médico"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="crm">CRM</Label>
                    <Input
                      id="crm"
                      value={novoExame.crm || ''}
                      onChange={(e) => handleInputChange('crm', e.target.value)}
                      placeholder="CRM do médico"
                    />
                  </div>
                  <div>
                    <Label htmlFor="categoria">Categoria</Label>
                    <Select
                      value={novoExame.categoria}
                      onValueChange={handleCategoriaChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="laboratorial">Laboratorial</SelectItem>
                        <SelectItem value="imagem">Imagem</SelectItem>
                        <SelectItem value="cardiologico">Cardiológico</SelectItem>
                        <SelectItem value="neurologico">Neurológico</SelectItem>
                        <SelectItem value="outro">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="tipo">Tipo de Exame</Label>
                  <Select
                    value={novoExame.tipo}
                    onValueChange={(value) => handleInputChange('tipo', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {tiposExame[novoExame.categoria]?.map((tipo) => (
                        <SelectItem key={tipo} value={tipo}>{tipo}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="data">Data Solicitação</Label>
                    <Input
                      id="data"
                      type="date"
                      value={novoExame.data}
                      onChange={(e) => handleInputChange('data', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="dataColeta">Data Coleta</Label>
                    <Input
                      id="dataColeta"
                      type="date"
                      value={novoExame.dataColeta || ''}
                      onChange={(e) => handleInputChange('dataColeta', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="prioridade">Prioridade</Label>
                    <Select
                      value={novoExame.prioridade}
                      onValueChange={(value: PrioridadeExame) => handleInputChange('prioridade', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="urgente">Urgente</SelectItem>
                        <SelectItem value="emergencia">Emergência</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="local">Local</Label>
                    <Input
                      id="local"
                      value={novoExame.local || ''}
                      onChange={(e) => handleInputChange('local', e.target.value)}
                      placeholder="Local do exame"
                    />
                  </div>
                  <div>
                    <Label htmlFor="valor">Valor (R$)</Label>
                    <Input
                      id="valor"
                      type="number"
                      step="0.01"
                      value={novoExame.valor || 0}
                      onChange={(e) => handleInputChange('valor', parseFloat(e.target.value) || 0)}
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="preparo">Preparo</Label>
                  <Textarea
                    id="preparo"
                    value={novoExame.preparo || ''}
                    onChange={(e) => handleInputChange('preparo', e.target.value)}
                    placeholder="Instruções de preparo..."
                  />
                </div>

                <div>
                  <Label htmlFor="observacoes">Observações</Label>
                  <Textarea
                    id="observacoes"
                    value={novoExame.observacoes || ''}
                    onChange={(e) => handleInputChange('observacoes', e.target.value)}
                    placeholder="Observações adicionais..."
                  />
                </div>

                <Button onClick={adicionarExame} className="w-full">
                  Solicitar Exame
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4">
          {examesFiltrados.map((exame) => (
            <Card key={exame.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Stethoscope className="h-5 w-5 text-blue-600" />
                    <div>
                      <CardTitle className="text-lg">{exame.tipo}</CardTitle>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                        <span className="flex items-center gap-1">
                          <User size={14} />
                          {exame.paciente}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {new Date(exame.data).toLocaleDateString('pt-BR')}
                        </span>
                        {exame.local && (
                          <span className="flex items-center gap-1">
                            <MapPin size={14} />
                            {exame.local}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <PrioridadeBadge prioridade={exame.prioridade} />
                    <StatusBadge status={exame.status} />
                    <Button variant="ghost" size="sm" onClick={() => onRemoverExame(exame.id)}>
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Médico:</span> {exame.medico}
                      {exame.crm && <span className="text-gray-500"> (CRM: {exame.crm})</span>}
                    </div>
                    <div>
                      <span className="font-medium">Categoria:</span> {exame.categoria}
                    </div>
                    {exame.dataColeta && (
                      <div>
                        <span className="font-medium">Data Coleta:</span> {new Date(exame.dataColeta).toLocaleDateString('pt-BR')}
                      </div>
                    )}
                    {exame.valor !== undefined && exame.valor > 0 && (
                      <div>
                        <span className="font-medium">Valor:</span> R$ {exame.valor.toFixed(2)}
                      </div>
                    )}
                  </div>

                  {exame.preparo && (
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <span className="font-medium text-blue-800">Preparo:</span>
                      <p className="text-blue-700 mt-1 text-sm">{exame.preparo}</p>
                    </div>
                  )}

                  {exame.observacoes && (
                    <div>
                      <span className="font-medium">Observações:</span>
                      <p className="text-gray-700 mt-1 text-sm">{exame.observacoes}</p>
                    </div>
                  )}

                  {exame.resultado && (
                    <div className="bg-green-50 p-3 rounded-lg">
                      <span className="font-medium text-green-800">Resultado:</span>
                      <p className="text-green-700 mt-1 text-sm">{exame.resultado.observacoes}</p>
                      {exame.resultado.medicoLaudante && (
                        <p className="text-green-600 mt-1 text-xs">
                          Laudante: {exame.resultado.medicoLaudante}
                        </p>
                      )}
                    </div>
                  )}

                  <div className="flex gap-2 pt-2">
                    {exame.status === 'pendente' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => atualizarStatus(exame.id, 'coletado')}
                      >
                        Coletar
                      </Button>
                    )}
                    {exame.status === 'coletado' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => atualizarStatus(exame.id, 'processando')}
                      >
                        Processar
                      </Button>
                    )}
                    {exame.status === 'processando' && (
                      <Button
                        size="sm"
                        onClick={() => atualizarStatus(exame.id, 'concluido')}
                      >
                        Finalizar
                      </Button>
                    )}
                    <Button size="sm" variant="outline">
                      <Download size={14} className="mr-1" />
                      Baixar
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit size={14} className="mr-1" />
                      Editar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {examesFiltrados.length === 0 && (
          <div className="text-center py-8">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Nenhum exame encontrado</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamsPage;