import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/components/ui/card';
import { Badge } from '../components/components/ui/badge';
import { Button } from '../components/components/ui/button';
import { Input } from '../components/components/ui/input';
import { Label } from '../components/components/ui/label';
import { Textarea } from '../components/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/components/ui/select';
import { AlertTriangle, Calendar, Clock, Plus, Search, User, FileText, Shield, Pill } from 'lucide-react';

interface Allergy {
  id: string;
  substance: string;
  severity: 'Leve' | 'Moderada' | 'Grave';
  reaction: string;
}

interface Prescription {
  id: string;
  date: string;
  doctor: string;
  medications: {
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
  }[];
  diagnosis: string;
  status: 'Ativo' | 'Concluído' | 'Cancelado';
}

interface NewMedication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

const MedicalPrescriptionSystem: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'historico' | 'alergias' | 'nova'>('historico');
  const [searchTerm, setSearchTerm] = useState('');
  
  const [allergies, setAllergies] = useState<Allergy[]>([
    {
      id: '1',
      substance: 'Penicilina',
      severity: 'Grave',
      reaction: 'Anafilaxia, erupção cutânea'
    },
    {
      id: '2',
      substance: 'Aspirina',
      severity: 'Moderada',
      reaction: 'Dor de estômago, náusea'
    }
  ]);

  const [prescriptions, setPrescriptions] = useState<Prescription[]>([
    {
      id: '1',
      date: '2024-06-10',
      doctor: 'Dr. Carlos Silva',
      medications: [
        {
          name: 'Losartana 50mg',
          dosage: '50mg',
          frequency: '1x ao dia',
          duration: '30 dias'
        },
        {
          name: 'Sinvastatina 20mg',
          dosage: '20mg',
          frequency: '1x ao dia (noite)',
          duration: '30 dias'
        }
      ],
      diagnosis: 'Hipertensão arterial e dislipidemia',
      status: 'Ativo'
    },
    {
      id: '2',
      date: '2024-05-15',
      doctor: 'Dra. Ana Santos',
      medications: [
        {
          name: 'Amoxicilina 500mg',
          dosage: '500mg',
          frequency: '3x ao dia',
          duration: '7 dias'
        }
      ],
      diagnosis: 'Infecção respiratória',
      status: 'Concluído'
    }
  ]);

  const [newMedications, setNewMedications] = useState<NewMedication[]>([]);
  const [currentMedication, setCurrentMedication] = useState<NewMedication>({
    name: '',
    dosage: '',
    frequency: '',
    duration: '',
    instructions: ''
  });

  const addMedication = () => {
    if (currentMedication.name && currentMedication.dosage) {
      setNewMedications([...newMedications, { ...currentMedication }]);
      setCurrentMedication({
        name: '',
        dosage: '',
        frequency: '',
        duration: '',
        instructions: ''
      });
    }
  };

  const removeMedication = (index: number) => {
    setNewMedications(newMedications.filter((_, i) => i !== index));
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Grave': return 'destructive';
      case 'Moderada': return 'default';
      case 'Leve': return 'secondary';
      default: return 'default';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ativo': return 'default';
      case 'Concluído': return 'secondary';
      case 'Cancelado': return 'destructive';
      default: return 'default';
    }
  };

  const filteredPrescriptions = prescriptions.filter(prescription =>
    prescription.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prescription.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prescription.medications.some(med => 
      med.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Sistema de Receituário</h1>
                <p className="text-gray-600">Gestão completa de medicações e histórico médico</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <User className="h-4 w-4" />
              <span>Paciente: João Silva</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('historico')}
              className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors ${
                activeTab === 'historico'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Clock className="h-4 w-4" />
              <span>Histórico de Receitas</span>
            </button>
            <button
              onClick={() => setActiveTab('alergias')}
              className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors ${
                activeTab === 'alergias'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Shield className="h-4 w-4" />
              <span>Alergias</span>
            </button>
            <button
              onClick={() => setActiveTab('nova')}
              className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors ${
                activeTab === 'nova'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Plus className="h-4 w-4" />
              <span>Nova Receita</span>
            </button>
          </div>
        </div>

        {activeTab === 'historico' && (
          <div className="space-y-6">
            <Card>
              <CardContent className="p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Pesquisar por médico, diagnóstico ou medicação..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              {filteredPrescriptions.map((prescription) => (
                <Card key={prescription.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Calendar className="h-5 w-5 text-blue-600" />
                        <div>
                          <CardTitle className="text-lg">
                            {new Date(prescription.date).toLocaleDateString('pt-BR')}
                          </CardTitle>
                          <CardDescription>{prescription.doctor}</CardDescription>
                        </div>
                      </div>
                      <Badge variant={getStatusColor(prescription.status)}>
                        {prescription.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Diagnóstico:</h4>
                        <p className="text-gray-700">{prescription.diagnosis}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Medicações:</h4>
                        <div className="grid gap-3">
                          {prescription.medications.map((med, index) => (
                            <div key={index} className="bg-gray-50 rounded-lg p-3">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <Pill className="h-4 w-4 text-blue-600" />
                                  <span className="font-medium">{med.name}</span>
                                </div>
                                <div className="text-sm text-gray-600">
                                  {med.dosage} • {med.frequency} • {med.duration}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'alergias' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  <CardTitle>Alergias Conhecidas</CardTitle>
                </div>
                <CardDescription>
                  Informações importantes sobre alergias medicamentosas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {allergies.map((allergy) => (
                    <div key={allergy.id} className="border rounded-lg p-4 bg-red-50 border-red-200">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{allergy.substance}</h3>
                        <Badge variant={getSeverityColor(allergy.severity)}>
                          {allergy.severity}
                        </Badge>
                      </div>
                      <p className="text-gray-700 text-sm">
                        <strong>Reação:</strong> {allergy.reaction}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'nova' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Nova Receita Médica</CardTitle>
                <CardDescription>
                  Adicione medicações para uma nova prescrição
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="med-name">Nome da Medicação</Label>
                    <Input
                      id="med-name"
                      placeholder="Ex: Paracetamol 500mg"
                      value={currentMedication.name}
                      onChange={(e) => setCurrentMedication({
                        ...currentMedication,
                        name: e.target.value
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dosage">Dosagem</Label>
                    <Input
                      id="dosage"
                      placeholder="Ex: 500mg"
                      value={currentMedication.dosage}
                      onChange={(e) => setCurrentMedication({
                        ...currentMedication,
                        dosage: e.target.value
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="frequency">Frequência</Label>
                    <Select
                      value={currentMedication.frequency}
                      onValueChange={(value) => setCurrentMedication({
                        ...currentMedication,
                        frequency: value
                      })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a frequência" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1x ao dia">1x ao dia</SelectItem>
                        <SelectItem value="2x ao dia">2x ao dia</SelectItem>
                        <SelectItem value="3x ao dia">3x ao dia</SelectItem>
                        <SelectItem value="4x ao dia">4x ao dia</SelectItem>
                        <SelectItem value="A cada 8 horas">A cada 8 horas</SelectItem>
                        <SelectItem value="A cada 12 horas">A cada 12 horas</SelectItem>
                        <SelectItem value="Quando necessário">Quando necessário</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duração</Label>
                    <Input
                      id="duration"
                      placeholder="Ex: 7 dias"
                      value={currentMedication.duration}
                      onChange={(e) => setCurrentMedication({
                        ...currentMedication,
                        duration: e.target.value
                      })}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="instructions">Instruções Especiais</Label>
                  <Textarea
                    id="instructions"
                    placeholder="Ex: Tomar com alimentos, evitar álcool..."
                    value={currentMedication.instructions}
                    onChange={(e) => setCurrentMedication({
                      ...currentMedication,
                      instructions: e.target.value
                    })}
                  />
                </div>

                <Button onClick={addMedication} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Medicação
                </Button>
              </CardContent>
            </Card>

            {newMedications.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Medicações Adicionadas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {newMedications.map((med, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <Pill className="h-4 w-4 text-green-600" />
                            <span className="font-medium">{med.name}</span>
                          </div>
                          <div className="text-sm text-gray-600 mt-1">
                            {med.dosage} • {med.frequency} • {med.duration}
                          </div>
                          {med.instructions && (
                            <div className="text-sm text-gray-600 mt-1">
                              <strong>Instruções:</strong> {med.instructions}
                            </div>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeMedication(index)}
                          className="text-red-600 hover:bg-red-100"
                        >
                          Remover
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-4" size="lg">
                    Finalizar Receita
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicalPrescriptionSystem;