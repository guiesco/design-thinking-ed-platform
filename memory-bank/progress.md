# Progresso do Projeto

## Implementações Concluídas

### Backend

#### Entidades

- ✅ EmpathyMap
- ✅ ProblemDefinitionResponse
- ✅ ChallengeDefinitionResponse
- ✅ User
- ✅ Project
- ✅ ProblemDefinition
- ✅ ChallengeDefinition
- ✅ IdeationIdea
- ✅ IdeationPoint
- ✅ UploadedFile (parcial)
- ✅ Prototype (parcial)

#### Serviços

- ✅ EmpathyMapService
- ✅ ProblemDefinitionService
- ✅ ChallengeDefinitionService
- ✅ StepVerificationService
- ✅ UserService
- ✅ ProjectService
- ✅ IdeationService

#### DTOs

- ✅ CreatePrototypeDto
- ✅ UpdatePrototypeDto
- ✅ UploadFileDto

#### Testes

- ✅ IdeationService (Integração)

### Frontend

#### Componentes

- ✅ EmpathyStepComponent
- ✅ ProblemDefinitionStepComponent
- ✅ ChallengeDefinitionStepComponent
- ✅ ResponseFormComponent (reutilizável)
- ✅ ResponseListComponent (reutilizável)
- ✅ IdeationStepComponent
- ✅ IdeaPointsComponent
- ✅ FileUploadComponent (reutilizável)
- ✅ PrototypingStepComponent

#### Stores

- ✅ EmpathyMapStore
- ✅ ProblemDefinitionStore
- ✅ ChallengeDefinitionStore
- ✅ UserStore
- ✅ ProjectStore
- ✅ IdeationStore
- ✅ PrototypeStore

#### Testes

- ✅ IdeationService (Integração)
- ✅ IdeationStepComponent (Integração)

#### Refinamentos de UI/UX

- ✅ Responsividade para dispositivos móveis
- ✅ Feedback visual para ações de usuário
- ✅ Animações e transições
- ✅ Melhorias de usabilidade
- ✅ Estilos consistentes

## Etapa de Ideação

### Backend (Implementado)

#### Entidades

- ✅ IdeationIdea

  - id: number
  - title: string
  - projectId: number
  - userId: number
  - upvotes: number
  - timestamps: createdAt, updatedAt

- ✅ IdeationPoint
  - id: number
  - content: string
  - type: IdeationPointType (PRO/CON)
  - ideaId: number
  - userId: number
  - upvotes: number
  - timestamps: createdAt, updatedAt

#### DTOs

- ✅ CreateIdeationIdeaDto
- ✅ UpdateIdeationIdeaDto
- ✅ CreateIdeationPointDto
- ✅ UpdateIdeationPointDto

#### Serviço

- ✅ IdeationService
  - ✅ create, update, delete para Ideias
  - ✅ create, update, delete para Pontos
  - ✅ upvote para Ideias e Pontos
  - ✅ getByProject para listar todas as ideias de um projeto

#### Controlador

- ✅ IdeationController
  - ✅ POST /ideation/idea
  - ✅ GET /ideation/idea/:id
  - ✅ GET /ideation/idea?projectId=:id
  - ✅ PUT /ideation/idea/:id
  - ✅ DELETE /ideation/idea/:id
  - ✅ POST /ideation/idea/:id/upvote
  - ✅ POST /ideation/point
  - ✅ PUT /ideation/point/:id
  - ✅ DELETE /ideation/point/:id
  - ✅ POST /ideation/point/:id/upvote

#### Testes

- ✅ Testes de Integração para IdeationController
  - ✅ CRUD de ideias
  - ✅ CRUD de pontos
  - ✅ Upvote de ideias e pontos

### Frontend (Implementado)

#### Interfaces

- ✅ IdeationIdea
- ✅ IdeationPoint
- ✅ IdeationPointType (enum)
- ✅ CreateIdeationIdeaDto
- ✅ CreateIdeationPointDto
- ✅ UpdateIdeationIdeaDto
- ✅ UpdateIdeationPointDto

#### Store

- ✅ IdeationStore
  - ✅ Estado para ideias, pontos, loading, error
  - ✅ Ações para CRUD de ideias e pontos
  - ✅ Reducers para atualizar estado
  - ✅ Efeitos para operações assíncronas
  - ✅ Selectors para acessar partes do estado
  - ✅ Facade para abstrair complexidade

#### Componentes

- ✅ IdeationStepComponent (principal)

  - Exibir formulário para adicionar ideias
  - Listar todas as ideias em cards
  - Gerenciar estado geral da etapa
  - Feedback visual para ações
  - Layout responsivo

- ✅ IdeaPointsComponent

  - Exibir formulário para adicionar prós/contras
  - Listar prós/contras
  - Mostrar botões de upvote, editar, excluir
  - Animações para feedback visual
  - Layout responsivo

#### Roteamento

- ✅ Adicionar rota para IdeationStep em páginas-routing.module.ts
- ✅ Importar IdeationStepModule no ProjectModule

#### Testes

- ✅ Testes do serviço IdeationService

  - ✅ Verificação de integração com a API
  - ✅ Testes para todas as operações CRUD
  - ✅ Testes para upvote

- ✅ Testes do componente IdeationStepComponent
  - ✅ Verificação de integração com o store
  - ✅ Testes para operações de usuário
  - ✅ Testes para manipulação de ideias e pontos

#### Refinamentos Implementados

- ✅ Design Responsivo

  - Adaptação para diferentes tamanhos de tela
  - Layout específico para dispositivos móveis
  - Melhor utilização do espaço em telas pequenas

- ✅ Feedback Visual

  - Mensagens de sucesso/erro via SnackBar
  - Destacar itens recém-criados ou alterados
  - Animação para indicar ações de upvote

- ✅ Melhorias de UX

  - Tooltip para botões de ação
  - Destaque visual para hover/focus
  - Transições suaves entre estados

- ✅ Estilização Aprimorada
  - Cards com sombreamento e transições
  - Ícones mais expressivos
  - Cores consistentes para tipo de pontos (prós/contras)

## Etapas de Prototipação e Conclusão (Em Implementação)

### Tarefas e Passos para Implementação

#### 1. Componente de Upload de Arquivos (Concluído)

- ✅ **Criado Componente Reutilizável `FileUploadComponent`**

  - ✅ Interface de arrastar e soltar (drag-and-drop)
  - ✅ Seleção de arquivos via diálogo
  - ✅ Exibição de progresso de upload
  - ✅ Lista de arquivos enviados com opção de exclusão
  - ✅ Feedback visual para sucesso/erro
  - ✅ Configurações para:
    - ✅ Tipos de arquivo permitidos (variável configurável)
    - ✅ Tamanho máximo (variável configurável)
    - ✅ Múltiplos arquivos ou arquivo único

- ✅ **Implementado Serviço `FileUploadService`**
  - ✅ Método para upload de arquivo
  - ✅ Método para exclusão de arquivo
  - ✅ Método para download de arquivo
  - ✅ Tratamento de erro e progresso
  - ✅ Integração com HttpClient

#### 2. Backend para Gerenciamento de Arquivos (Parcialmente Concluído)

- ✅ **Entidades**

  - ✅ `UploadedFile`

    - ✅ id: number
    - ✅ originalName: string
    - ✅ storedName: string
    - ✅ path: string
    - ✅ size: number
    - ✅ mimeType: string
    - ✅ userId: number
    - ✅ projectId: number
    - ✅ groupId: number (para controle de acesso)
    - ✅ stepType: enum (PROTOTYPE/CONCLUSION)
    - ✅ timestamps: createdAt, updatedAt

  - ✅ `Prototype`

    - ✅ id: number
    - ✅ projectId: number
    - ✅ userId: number
    - ✅ description: string (configurado pelo professor)
    - ✅ timestamps: createdAt, updatedAt

  - `Conclusion` (A implementar)
    - id: number
    - projectId: number
    - userId: number
    - description: string (configurado pelo professor)
    - timestamps: createdAt, updatedAt

- ✅ **DTOs**

  - ✅ `UploadFileDto`

    - ✅ projectId: number
    - ✅ userId: number
    - ✅ stepType: StepType

  - ✅ `CreatePrototypeDto` / `UpdatePrototypeDto`
    - ✅ projectId: number
    - ✅ userId: number
    - ✅ description: string (opcional)

- **Serviços** (A implementar)

  - `FileService`

    - uploadFile(file, userId, projectId, stepType): Promise<UploadedFile>
    - deleteFile(fileId, userId): Promise<void>
    - getFileById(fileId): Promise<UploadedFile>
    - getFilesByProject(projectId, stepType): Promise<UploadedFile[]>
    - getFilesByUser(userId, projectId, stepType): Promise<UploadedFile[]>
    - getFilesByGroup(groupId, stepType): Promise<UploadedFile[]>

  - `PrototypeService` / `ConclusionService`
    - createPrototype(dto): Promise<Prototype>
    - getPrototypeByProject(projectId): Promise<Prototype>
    - updatePrototype(id, dto): Promise<Prototype>
    - getPrototypeById(id): Promise<Prototype>

- **Controladores** (A implementar)

  - `FileController`

    - POST /files/upload (com Multer para processamento)
    - GET /files/:id
    - GET /files/project/:projectId
    - DELETE /files/:id

  - `PrototypeController` / `ConclusionController`
    - POST /prototype
    - GET /prototype/:id
    - GET /prototype/project/:projectId
    - PUT /prototype/:id
    - Endpoints equivalentes para conclusão

#### 3. Frontend para Etapas de Protótipo e Conclusão

- ✅ **Interfaces**

  - ✅ `UploadedFile`

    - ✅ id: number
    - ✅ originalName: string
    - ✅ size: number
    - ✅ mimeType: string
    - ✅ uploadDate: Date
    - ✅ userId: number
    - ✅ downloadUrl: string

  - ✅ `Prototype` / `Conclusion`

    - ✅ id: number
    - ✅ projectId: number
    - ✅ userId: number
    - ✅ description: string
    - ✅ createdAt: Date
    - ✅ updatedAt: Date

  - ✅ `CreatePrototypeDto` / `UpdatePrototypeDto`
    - ✅ projectId: number
    - ✅ userId: number
    - ✅ description: string

- ✅ **Stores**

  - ✅ `PrototypeStore`

    - ✅ Estado para protótipos, arquivos, configurações, loading, error
    - ✅ Ações para CRUD de protótipos e upload/download/delete de arquivos
    - ✅ Reducers para atualizar estado
    - ✅ Efeitos para operações assíncronas
    - ✅ Selectors para acessar partes do estado
    - ✅ Facade para abstrair complexidade

  - `ConclusionStore` (A implementar)

- ✅ **Componentes**

  - ✅ `PrototypingStepComponent`

    - ✅ Exibir campo para texto configurável (instruções do professor)
    - ✅ Integrar com FileUploadComponent
    - ✅ Listar arquivos enviados por membros do grupo
    - ✅ Exibir/ocultar baseado em existência de protótipo/conclusão
    - ✅ Botão para finalizar etapa
    - ✅ Layout responsivo

  - `ConclusionStepComponent` (A implementar)

#### 4. Integração e Testes (A implementar)

- **Integração com Sistema Existente**

  - ✅ Adicionar rota para PrototypingStep
  - Adicionar rota para ConclusionStep (A implementar)
  - Atualizar verificação de etapas concluídas (A implementar)
  - Integrar com sistema de grupos para visibilidade de arquivos (A implementar)

- **Testes**
  - Testes para FileService e FileController (A implementar)
  - Testes para PrototypeService/ConclusionService e Controllers (A implementar)
  - Testes para componentes Frontend (A implementar)
  - Testes de integração para verificar fluxo completo (A implementar)

#### Passos de Implementação Restantes

1. **Infraestrutura de Armazenamento**

   - Configurar Multer para upload de arquivos
   - Criar estrutura de pastas para armazenamento local
   - Implementar interface de serviço para futura migração para cloud

2. **Backend**

   - Implementar controladores e serviços
   - Configurar rotas para upload/download de arquivos
   - Implementar controle de acesso baseado em grupos

3. **Frontend - Etapa de Conclusão**

   - Implementar componente de Conclusão
   - Criar store e serviços
   - Integrar com componente de upload
   - Implementar visibilidade de arquivos por grupo

4. **Testes e Refinamentos**
   - Testar fluxo completo
   - Verificar visibilidade por grupo
   - Validar tratamento de erros e edge cases

## Notas Importantes para Implementação

- **Armazenamento de Arquivos**

  - Inicialmente armazenar no servidor local em pasta configurável
  - Criar interface abstrata para facilitar migração futura para cloud
  - Implementar variáveis de configuração para:
    - Tamanho máximo de arquivo
    - Tipos de arquivo permitidos
    - Número máximo de arquivos por etapa

- **Controle de Acesso**

  - Verificar pertencimento ao grupo antes de exibir arquivos
  - Permitir que apenas o proprietário exclua seus arquivos
  - Professores têm acesso a todos os arquivos da turma

- **UI/UX**
  - Seguir padrões visuais do resto da aplicação
  - Feedback claro para sucesso/erro de uploads
  - Indicações visuais para arquivos em processamento
  - Layout responsivo para todos os tamanhos de tela

## Próximos Passos Detalhados

### 1. Completar Backend para Gerenciamento de Arquivos

1. **Implementar FileService**

   - Criar métodos para upload, download e exclusão
   - Implementar controle de acesso baseado em grupos
   - Configurar armazenamento local com Multer

2. **Implementar PrototypeService**

   - Criar métodos CRUD para protótipos
   - Implementar validação e manipulação de dados
   - Relacionar protótipos com arquivos enviados

3. **Implementar Controllers**
   - Criar endpoints RESTful para operações
   - Documentar API com Swagger
   - Implementar tratamento de erros

### 2. Implementar Etapa de Conclusão

1. **Criar Entidade e DTOs**

   - Implementar entidade Conclusion
   - Criar DTOs para operações CRUD

2. **Implementar Store e Componente**
   - Criar ConclusionStore seguindo padrão do PrototypeStore
   - Implementar ConclusionStepComponent
   - Integrar com componente de upload

### 3. Testes e Refinamentos

1. **Testes de Integração**

   - Validar fluxo completo de prototipação
   - Testar controle de acesso por grupo
   - Verificar limite de tamanho e tipos de arquivo

2. **Otimizações Finais**
   - Refinar UI/UX para melhor experiência
   - Otimizar carregamento de arquivos
   - Melhorar feedback visual

## Notas

- Backend e frontend implementados seguindo os padrões da aplicação
- Entidades e DTOs criados conforme definido
- Implementação parcial concluída com componente reutilizável de upload
- Estrutura preparada para adição da etapa de Conclusão
