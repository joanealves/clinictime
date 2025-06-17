ClinicTime - Sistema de Gestão para Clínicas Médicas

🚀 Visão Geral
O ClinicTime é uma aplicação web completa, desenvolvida para otimizar a gestão de clínicas médicas e consultórios. Ele oferece um conjunto robusto de funcionalidades para auxiliar na organização de agendamentos, prontuários de pacientes, prescrições, exames e gerenciamento de profissionais e serviços. Com uma interface intuitiva e responsiva, o ClinicTime visa simplificar as operações diárias de uma clínica, permitindo que a equipe se concentre no que realmente importa: o cuidado com o paciente.

✨ Funcionalidades Principais
Autenticação e Autorização: Sistema de login com diferentes níveis de acesso (ex: admin, profissional de saúde).
Dashboard Interativo: Visão geral das principais informações e métricas da clínica.
Gerenciamento de Agendamentos:
Criação, edição e visualização de consultas.
Controle de status dos agendamentos (confirmado, cancelado, reagendado).
Notificações visuais para agendamentos pendentes.
Agendamento Público: Permite agendamentos de pacientes externos via interface dedicada.
Cadastro e Gestão de Pacientes:
Registro completo de informações demográficas e de contato.
Histórico de consultas e procedimentos.
Prescrições Eletrônicas:
Criação e gerenciamento de prescrições médicas.
Interface para adicionar medicamentos, dosagens e orientações.
Gerenciamento de Exames:
Solicitação e acompanhamento de exames laboratoriais e de imagem.
Registro de resultados e anexos.
Filtros por status, prioridade e paciente.
Controle de Profissionais (Admin):
Cadastro de médicos, enfermeiros e outros colaboradores.
Atribuição de funções e permissões de acesso.
Gestão de Serviços (Admin):
Definição e organização dos serviços oferecidos pela clínica.
Página Não Encontrada (404): Tratamento de rotas inexistentes.
Barra Lateral Colapsável: Design adaptável para otimizar o espaço da tela.
Header Dinâmico: Exibição da data atual e barra de pesquisa rápida.
Notificações: Ícone de sino com badge para alertas e avisos.
Menu de Usuário: Acesso rápido a perfil, configurações e logout.
🛠️ Tecnologias Utilizadas
Com base no seu package.json, vamos ser mais específicos:

React: Biblioteca JavaScript para construção de interfaces de usuário. (v19.0.0-rc.1)
TypeScript: Superconjunto tipado de JavaScript que melhora a segurança e manutenibilidade do código. (v~5.8.3)
React Router DOM: Para roteamento declarativo na aplicação. (v7.6.2)
Tailwind CSS: Framework CSS para estilização rápida e responsiva. (v4.0.0)
Vite: Ferramenta de build de próxima geração para projetos frontend. (v6.3.5)
Lucide React: Biblioteca de ícones moderna e personalizável. (v0.515.0)
Shadcn/ui: Componentes de UI headless e personalizáveis, construídos com Radix UI e Tailwind CSS. Inclui componentes como:
Button, Input, DropdownMenu, Badge, Dialog, Select, Textarea, Card, Toast, Accordion, AlertDialog, Avatar, Checkbox, Collapsible, ContextMenu, HoverCard, Label, Menubar, NavigationMenu, Popover, Progress, RadioGroup, ScrollArea, Separator, Slider, Slot, Switch, Tabs, Toggle, ToggleGroup, Tooltip.
Radix UI: Primitivos de componentes de UI de baixo nível para construir sistemas de design robustos.
Context API (React): Para gerenciamento de estado global de autenticação (AuthContext).
React Hook Form com Zod e Hookform Resolvers: Para gerenciamento de formulários e validação de esquemas.
React Query (@tanstack/react-query): Para gerenciamento de dados assíncronos e cache.
Date-fns: Biblioteca utilitária para manipulação de datas.
clsx e tailwind-merge: Para gerenciamento condicional de classes CSS.
Sonner: Componente de notificação de toast.
Recharts: Biblioteca de gráficos para visualização de dados no dashboard.
Embla Carousel React: Biblioteca de carrossel.
next-themes: Para gerenciamento de temas (claro/escuro).
input-otp: Componente para entrada de códigos OTP.
react-day-picker: Componente de seleção de data.
react-resizable-panels: Para layouts redimensionáveis.
cmdk: Componente de Command Menu.
tw-animate-css: Utilitário para animações com Tailwind.

🚀 Como Executar o Projeto (Desenvolvimento)
Para configurar e executar o ClinicTime em seu ambiente local, siga os passos abaixo:

Pré-requisitos
Certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

Node.js (versão 18 ou superior, compatível com as dependências)
npm (gerenciador de pacotes do Node.js) ou Yarn
Instalação
Clone o repositório:

Bash

git clone https://github.com/seu-usuario/clinictime.git
cd clinictime
Instale as dependências:

Bash

npm install
# ou
yarn install
Inicie o servidor de desenvolvimento:

Bash

npm run dev
# ou
yarn dev
O aplicativo estará disponível em http://localhost:5173 (ou outra porta disponível).

📂 Estrutura de Pastas
A estrutura do projeto está organizada da seguinte forma:

clinictime/
├── public/                     # Arquivos estáticos e assets
├── src/
│   ├── assets/                 # Imagens, ícones, etc.
│   ├── components/
│   │   ├── components/ui/      # Componentes Shadcn/ui (button, input, dialog, etc.)
│   │   └── Layout.tsx          # O layout principal da aplicação (sidebar, header)
│   ├── contexts/
│   │   └── AuthContext.tsx     # Contexto para gerenciamento de autenticação do usuário
│   ├── pages/                  # Todas as páginas/rotas da aplicação
│   │   ├── Appointments.tsx    # Gerenciamento de agendamentos
│   │   ├── Dashboard.tsx       # Visão geral e dashboard
│   │   ├── Exams.tsx           # Gerenciamento de exames
│   │   ├── Index.tsx           # Página inicial (pode ser um redirecionamento ou home)
│   │   ├── Login.tsx           # Página de autenticação
│   │   ├── NotFound.tsx        # Página 404 - Não Encontrada
│   │   ├── Patients.tsx        # Cadastro e gestão de pacientes
│   │   ├── Prescription.tsx    # Criação e gestão de prescrições
│   │   ├── Professionals.tsx   # Cadastro e gestão de profissionais
│   │   ├── PublicScheduling.tsx# Página para agendamento público (sem login)
│   │   └── Services.tsx        # Gerenciamento de serviços da clínica
│   ├── types/                  # Definições de tipos TypeScript
│   │   └── medical.ts          # Tipos relacionados a dados médicos (pacientes, exames, etc.)
│   ├── App.css                 # Estilos globais da aplicação
│   ├── App.tsx                 # Componente principal onde o roteamento é configurado
│   ├── index.css               # Estilos CSS base ou globais
│   ├── main.tsx                # Ponto de entrada da aplicação (renderiza o App.tsx)
│   └── vite-env.d.ts           # Definições de tipo para o ambiente Vite
├── .gitignore                  # Arquivos e pastas a serem ignorados pelo Git
├── package.json                # Metadados do projeto e lista de dependências
├── postcss.config.js           # Configuração do PostCSS (utilizado pelo Tailwind)
├── tailwind.config.js          # Configuração do Tailwind CSS
├── tsconfig.json               # Configurações do TypeScript
└── README.md                   # Este arquivo


📄 Licença
Este projeto está licenciado sob a licença MIT. Consulte o arquivo LICENSE para mais detalhes.

