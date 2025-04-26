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

#### Serviços

- ✅ EmpathyMapService
- ✅ ProblemDefinitionService
- ✅ ChallengeDefinitionService
- ✅ StepVerificationService
- ✅ UserService
- ✅ ProjectService
- ✅ IdeationService

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

#### Stores

- ✅ EmpathyMapStore
- ✅ ProblemDefinitionStore
- ✅ ChallengeDefinitionStore
- ✅ UserStore
- ✅ ProjectStore
- ✅ IdeationStore

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

## Etapas de Prototipação e Conclusão (A Implementar)

### Tarefas e Passos para Implementação

#### 1. Componente de Upload de Arquivos

- **Criar Componente Reutilizável `FileUploadComponent`**

  - Interface de arrastar e soltar (drag-and-drop)
  - Seleção de arquivos via diálogo
  - Exibição de progresso de upload
  - Lista de arquivos enviados com opção de exclusão
  - Feedback visual para sucesso/erro
  - Configurações para:
    - Tipos de arquivo permitidos (variável configurável)
    - Tamanho máximo (variável configurável)
    - Múltiplos arquivos ou arquivo único

- **Implementar Serviço `FileUploadService`**
  - Método para upload de arquivo
  - Método para exclusão de arquivo
  - Método para download de arquivo
  - Tratamento de erro e progresso
  - Integração com HttpClient

#### 2. Backend para Gerenciamento de Arquivos

- **Entidades**

  - `UploadedFile`

    - id: number
    - originalName: string
    - storedName: string
    - path: string
    - size: number
    - mimeType: string
    - userId: number
    - projectId: number
    - groupId: number (para controle de acesso)
    - stepType: enum (PROTOTYPE/CONCLUSION)
    - timestamps: createdAt, updatedAt

  - `Prototype`

    - id: number
    - projectId: number
    - userId: number
    - description: string (configurado pelo professor)
    - fileIds: number[] (referência aos arquivos)
    - timestamps: createdAt, updatedAt

  - `Conclusion`
    - id: number
    - projectId: number
    - userId: number
    - description: string (configurado pelo professor)
    - fileIds: number[] (referência aos arquivos)
    - timestamps: createdAt, updatedAt

- **DTOs**

  - `UploadFileDto`

    - file: Express.Multer.File
    - projectId: number
    - userId: number
    - stepType: StepType

  - `CreatePrototypeDto` / `CreateConclusionDto`
    - projectId: number
    - userId: number
    - description: string (opcional, usado pelo professor)

- **Serviços**

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

- **Controladores**

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

- **Interfaces**

  - `UploadedFile`

    - id: number
    - originalName: string
    - size: number
    - mimeType: string
    - uploadDate: Date
    - userId: number
    - downloadUrl: string

  - `Prototype` / `Conclusion`

    - id: number
    - projectId: number
    - userId: number
    - description: string
    - files: UploadedFile[]
    - createdAt: Date
    - updatedAt: Date

  - `PrototypeStepConfig` / `ConclusionStepConfig`
    - descriptionTemplate: string
    - allowedFileTypes: string[]
    - maxFileSize: number
    - maxFileCount: number

- **Stores**

  - `PrototypeStore` / `ConclusionStore`
    - Estado para protótipos/conclusões, arquivos, configurações, loading, error
    - Ações para CRUD de protótipos/conclusões e upload/download/delete de arquivos
    - Reducers para atualizar estado
    - Efeitos para operações assíncronas
    - Selectors para acessar partes do estado
    - Facade para abstrair complexidade

- **Componentes**

  - `PrototypingStepComponent` / `ConclusionStepComponent`

    - Exibir campo para texto configurável (instruções do professor)
    - Integrar com FileUploadComponent
    - Listar arquivos enviados por membros do grupo
    - Exibir/ocultar baseado em existência de protótipo/conclusão
    - Botão para finalizar etapa
    - Layout responsivo

  - `FileListComponent`
    - Exibir lista de arquivos enviados
    - Opções para download e exclusão
    - Exibição de metadados (tamanho, tipo, data)
    - Organização por usuário/data

#### 4. Integração e Testes

- **Integração com Sistema Existente**

  - Adicionar rota para PrototypingStep e ConclusionStep
  - Atualizar verificação de etapas concluídas
  - Integrar com sistema de grupos para visibilidade de arquivos

- **Testes**
  - Testes para FileService e FileController
  - Testes para PrototypeService/ConclusionService e Controllers
  - Testes para componentes Frontend
  - Testes de integração para verificar fluxo completo

#### Passos de Implementação

1. **Infraestrutura de Armazenamento**

   - Configurar Multer para upload de arquivos
   - Criar estrutura de pastas para armazenamento local
   - Implementar interface de serviço para futura migração para cloud

2. **Backend**

   - Implementar entidades, repositórios, serviços e controladores
   - Configurar rotas para upload/download de arquivos
   - Implementar controle de acesso baseado em grupos

3. **Frontend - Componente de Upload**

   - Criar componente reutilizável
   - Implementar funcionalidades de arrastar e soltar
   - Adicionar feedback visual e tratamento de erros

4. **Frontend - Etapas**

   - Implementar componentes para Protótipo e Conclusão
   - Criar stores e serviços
   - Integrar com componente de upload
   - Implementar visibilidade de arquivos por grupo

5. **Testes e Refinamentos**
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

### 1. Documentação

1. **Documentação da API**

   - Documentar todos os endpoints
   - Incluir exemplos de requisição/resposta
   - Documentar parâmetros e possíveis erros

2. **Documentação do Código**

   - Adicionar documentação para componentes
   - Documentar funções e métodos principais
   - Atualizar comentários onde necessário

3. **Documentação de UI/UX**
   - Documentar padrões visuais implementados
   - Documentar padrões de interação
   - Criar guia de estilo para futuros desenvolvimentos

### 2. Otimizações Finais

1. **Otimização de Performance**

   - Revisar memoização de dados no store
   - Otimizar renderização de componentes
   - Melhorar carregamento inicial de dados

2. **Refatoração**
   - Identificar código duplicado
   - Extrair lógica comum para helpers/services
   - Revisar nomenclatura para consistência

## Notas

- Backend e frontend implementados seguindo os padrões da aplicação
- Entidades e DTOs criados conforme definido
- Serviço implementado com métodos CRUD e lógica de upvote
- Controlador com endpoints RESTful para todas as operações necessárias
- Integração com UserVoteService para gerenciar upvotes
- Testes de integração implementados para garantir o funcionamento correto
- Refinamentos de UI/UX implementados para melhorar a experiência do usuário
- Fases completadas: implementação do backend, implementação do frontend, testes de integração, refinamentos
- Próxima fase: documentação e otimizações finais
