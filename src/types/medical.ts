export interface Paciente {
  id: number;
  nome: string;
  cpf: string;
  dataNascimento: string;
  telefone: string;
  email?: string;
  endereco?: string;
  alergias: Alergia[];
  historico: HistoricoMedico[];
}

export interface Alergia {
  id: number;
  substancia: string;
  severidade: 'leve' | 'moderada' | 'severa';
  sintomas: string;
  dataIdentificacao: string;
}

export interface HistoricoMedico {
  id: number;
  data: string;
  tipo: 'consulta' | 'cirurgia' | 'internacao' | 'exame' | 'medicacao';
  descricao: string;
  medico?: string;
  observacoes?: string;
}

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

export interface Receita {
  id: number;
  pacienteId: number;
  paciente: string;
  medico: string;
  crm: string;
  data: string;
  validade: string;
  medicamentos: Medicamento[];
  observacoes?: string;
  status: 'ativa' | 'vencida' | 'cancelada';
  tipo: 'simples' | 'controlada' | 'especial';
}

export interface Medicamento {
  id?: number;
  nome: string;
  principioAtivo?: string;
  concentracao: string;
  forma: 'comprimido' | 'capsula' | 'xarope' | 'gotas' | 'ampola' | 'pomada' | 'creme' | 'spray';
  dosagem: string;
  frequencia: string;
  duracao: string;
  quantidade: number;
  viaAdministracao?: 'oral' | 'topica' | 'injetavel' | 'nasal' | 'ocular';
  observacoes?: string;
  continuo?: boolean;
}

export interface Medico {
  id: number;
  nome: string;
  crm: string;
  especialidade: string;
  telefone?: string;
  email?: string;
}

export const StatusExame = {
  PENDENTE: 'pendente',
  COLETADO: 'coletado', 
  PROCESSANDO: 'processando',
  CONCLUIDO: 'concluido',
  CANCELADO: 'cancelado'
} as const;

export const StatusReceita = {
  ATIVA: 'ativa',
  VENCIDA: 'vencida',
  CANCELADA: 'cancelada'
} as const;

export const PrioridadeExame = {
  NORMAL: 'normal',
  URGENTE: 'urgente',
  EMERGENCIA: 'emergencia'
} as const;

export const SeveridadeAlergia = {
  LEVE: 'leve',
  MODERADA: 'moderada',
  SEVERA: 'severa'
} as const;