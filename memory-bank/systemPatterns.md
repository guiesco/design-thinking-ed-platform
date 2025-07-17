# Padrões do Sistema

## Arquitetura

### Backend

- **NestJS** com TypeORM e PostgreSQL
- **Clean Architecture** + Repository Pattern
- **Módulos dedicados** para cada funcionalidade
- **DTOs** para validação de dados

### Frontend

- **Angular 16** + Material UI
- **NgRx** para gerenciamento de estado
- **Lazy loading** para módulos
- **Componentes reutilizáveis** (@stores, @common)

## Padrões de Entidades

### Entidades de Resposta

- ID, Tipo (enum), Conteúdo, Upvotes, isSelected
- Relacionamentos com User e Project
- Timestamps automáticos

### Entidades Finais

- Consolidação das respostas selecionadas
- Relacionamento com User e Project
- Campos específicos por etapa

### Estrutura Hierárquica (Ideação)

- **IdeationIdea** (pai): título, upvotes, relacionamentos
- **IdeationPoint** (filho): conteúdo, tipo (PRO/CON), upvotes

### Upload de Arquivos

- **UploadedFile**: metadados + conteúdo (bytea)
- **Controle de acesso** por grupo
- **Limite de 1MB** por arquivo

## Padrões de Componentes

### BaseStep

- Componente base para todas as etapas
- Navegação e validações comuns
- Responsividade mobile

### ResponseList/ResponseForm

- Listagem e criação de respostas
- Sistema de upvote integrado
- Reutilização entre etapas

### FileUpload

- Interface drag-and-drop
- Progresso visual de upload
- Validação de tipos e tamanhos
- Listagem de arquivos enviados

## Padrões de Estado (NgRx)

### Store por Módulo

- Actions, Reducers, Effects, Selectors
- Facade para acesso simplificado
- Interfaces centralizadas em @stores

### Ações Padronizadas

- load, create, update, delete
- Efeitos para operações assíncronas
- Tratamento de erros consistente

## Padrões de API

### RESTful

- Endpoints padronizados por recurso
- DTOs para validação
- Tratamento de erros consistente

### Autenticação

- QueryParams (userId)
- Controle de acesso por tipo de usuário
- Validação de propriedade de recursos

## Padrões de UI/UX

### Material Design

- Cards para organização de conteúdo
- Formulários com validação em tempo real
- Feedback imediato para ações

### Responsividade

- Mobile-first approach
- Breakpoints consistentes
- Tipografia e espaçamento adaptativos
- Interações touch-friendly

## Padrões de Teste

- Testes unitários para serviços
- Testes de componentes
- Testes E2E para fluxos completos
