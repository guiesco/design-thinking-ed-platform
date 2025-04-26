# Progresso

## Etapas do Design Thinking

A plataforma implementa diferentes etapas do processo de Design Thinking, cada uma com suas características e funcionalidades específicas:

1. ✅ **Definição do Desafio**

   - ✅ Criação de desafios pelo professor
   - ✅ Visualização de desafios pelos alunos
   - ✅ Edição de desafios existentes

2. ✅ **Mapa de Empatia**

   - ✅ Interface para as 4 quadrantes (Sente, Pensa, Fala, Faz)
   - ✅ Sistema de envio e visualização de respostas
   - ✅ Seleção de insights mais relevantes
   - ✅ Consolidação de respostas selecionadas

3. ✅ **Definição do Problema**

   - ✅ Template para criação de problems statements
   - ✅ Sistema de upvote para problem statements
   - ✅ Seleção de problema final
   - ✅ Consolidação da definição do problema

4. ✅ **Ideação**

   - ✅ Criação e visualização de ideias em formato de cards
   - ✅ Adição de pontos positivos e negativos para cada ideia
   - ✅ Sistema de upvote para ideias
   - ✅ Interface para gerenciamento de pros e cons

5. ✅ **Prototipação**

   - ✅ Interface para descrição do protótipo
   - ✅ Funcionalidade de upload de arquivos
   - ✅ Visualização de arquivos enviados
   - ✅ Controle de acesso por grupo
   - ✅ Armazenamento em banco de dados (bytea)

6. ✅ **Conclusão**
   - ✅ Interface para descrição da conclusão
   - ✅ Funcionalidade de upload de arquivos
   - ✅ Visualização de arquivos enviados
   - ✅ Controle de acesso por grupo
   - ✅ Armazenamento em banco de dados (bytea)

## Funcionalidades Implementadas

### 1. ✅ Estrutura Base e Autenticação

1. ✅ **Backend Core**

   - ✅ Configuração do NestJS e TypeORM
   - ✅ Estruturação de módulos
   - ✅ Implementação de entidades base

2. ✅ **Frontend Core**

   - ✅ Configuração do Angular e Material UI
   - ✅ Implementação do NgRx
   - ✅ Estrutura base de componentes

3. ✅ **Autenticação**
   - ✅ Sistema de registro
   - ✅ Sistema de login
   - ✅ Integração com parâmetros de query

### 2. ✅ Sistema de Turmas e Grupos

1. ✅ **Gerenciamento de Turmas**

   - ✅ Criação e edição de turmas
   - ✅ Adição de alunos às turmas
   - ✅ Visualização de turmas e alunos

2. ✅ **Gerenciamento de Grupos**
   - ✅ Criação de grupos dentro de turmas
   - ✅ Gerenciamento de membros de grupos
   - ✅ Interface para visualização de grupos

### 3. ✅ Mapa de Empatia

1. ✅ **Backend**

   - ✅ Implementação de entidades
   - ✅ Implementação de serviços
   - ✅ Implementação de controladores

2. ✅ **Frontend**
   - ✅ Componente para visualização dos quadrantes
   - ✅ Formulário para adição de respostas
   - ✅ Listagem de respostas com upvote
   - ✅ Seleção de respostas para consolidação

### 4. ✅ Definição do Desafio

1. ✅ **Backend**

   - ✅ Implementação de entidades
   - ✅ Implementação de serviços
   - ✅ Implementação de controladores

2. ✅ **Frontend**
   - ✅ Criação de interface para definição de desafios
   - ✅ Visualização de desafios existentes
   - ✅ Edição e exclusão de desafios

### 5. ✅ Definição do Problema

1. ✅ **Backend**

   - ✅ Implementação de entidades
   - ✅ Implementação de serviços
   - ✅ Implementação de controladores

2. ✅ **Frontend**
   - ✅ Visualização de insights do mapa de empatia
   - ✅ Criação de problem statements
   - ✅ Sistema de upvote para statements
   - ✅ Seleção e consolidação de problema principal

### 6. ✅ Ideação

1. ✅ **Backend**

   - ✅ Implementação de entidades hierárquicas (ideia -> pontos)
   - ✅ Implementação de serviços para ideias e pontos
   - ✅ Implementação de controladores e rotas

2. ✅ **Frontend**
   - ✅ Interface de cards para ideias
   - ✅ Colunas para pros e cons
   - ✅ Sistema de upvote para ideias e pontos
   - ✅ Visualização e gerenciamento de ideias

### 7. ✅ Prototipação

1. ✅ **Backend**

   - ✅ Implementar Entidades e DTOs

     - ✅ Criar entidade UploadedFile
     - ✅ Criar entidade Prototype
     - ✅ Implementar DTOs para validação

   - ✅ Implementar FileService

     - ✅ Criar métodos para upload, download e exclusão
     - ✅ Implementar controle de acesso baseado em grupos
     - ✅ Migrar de armazenamento em sistema de arquivos para PostgreSQL (bytea)

   - ✅ Implementar PrototypeService

     - ✅ Criar métodos CRUD para protótipos
     - ✅ Implementar validação e manipulação de dados
     - ✅ Relacionar protótipos com arquivos enviados

   - ✅ Implementar Controllers
     - ✅ Criar endpoints RESTful para operações
     - ✅ Implementar tratamento de erros
     - ✅ Atualizar para suportar arquivos em bytea

2. ✅ **Frontend**

   - ✅ Componente de Upload de Arquivos

     - ✅ Interface drag-and-drop
     - ✅ Exibição de progresso de upload
     - ✅ Validação de tipos de arquivo
     - ✅ Listagem de arquivos enviados

   - ✅ Implementar PrototypeStore

     - ✅ Criar actions, reducers, effects e selectors
     - ✅ Implementar serviço para comunicação com backend
     - ✅ Gerenciar estado de protótipos e arquivos

   - ✅ Implementar PrototypingStepComponent
     - ✅ Criar interface de descrição do protótipo
     - ✅ Integrar componente de upload
     - ✅ Implementar visualização de arquivos
     - ✅ Adicionar estilo responsivo

### 8. ✅ Conclusão

1. ✅ **Backend**

   - ✅ **Criar Entidade e DTOs**

     - ✅ Implementar entidade Conclusion
     - ✅ Criar DTOs para operações CRUD

   - ✅ **Implementar Serviço e Controlador**
     - ✅ Criar ConclusionService com métodos CRUD
     - ✅ Implementar ConclusionController com endpoints RESTful
     - ✅ Atualizar para suportar arquivos em bytea

2. ✅ **Frontend**

   - ✅ **Criar ConclusionStore**

     - ✅ Implementar estado, ações, reducers, efeitos e selectors
     - ✅ Desenvolver serviço para comunicação com backend

   - ✅ **Implementar ConclusionStepComponent**

     - ✅ Criar interface para edição de descrição
     - ✅ Integrar com componente de upload
     - ✅ Implementar visualização de arquivos do grupo
     - ✅ Adicionar estilos responsivos

   - ✅ **Integração com o Projeto**
     - ✅ Adicionar rota para a etapa de conclusão
     - ✅ Incluir no menu de navegação do projeto

### 9. ✅ Armazenamento de Arquivos

1. ✅ **Migração para Banco de Dados**

   - ✅ **Atualizar Entidade UploadedFile**

     - ✅ Adicionar campo para conteúdo binário (bytea)
     - ✅ Remover campos relacionados ao sistema de arquivos

   - ✅ **Modificar FileService**

     - ✅ Atualizar métodos para trabalhar com dados binários
     - ✅ Implementar limite de tamanho de arquivo (1MB)

   - ✅ **Atualizar Controllers**
     - ✅ Adaptar upload e download para dados binários
     - ✅ Manter compatibilidade com frontend

2. ✅ **Validação e Alinhamento de Interface**
   - ✅ Corrigir métodos HTTP (PUT → PATCH) para atualização de dados
   - ✅ Alinhar limites de tamanho de arquivo entre frontend (1MB) e backend (1MB)
   - ✅ Corrigir parâmetros de exclusão de arquivos (adicionar userId)
   - ✅ Testar controle de acesso por grupo
   - ✅ Verificar limite de tamanho e tipos de arquivo

## Notas

- Frontend e backend para as etapas de Prototipação e Conclusão implementados
- Migração do armazenamento de arquivos do sistema de arquivos para PostgreSQL usando bytea concluída
- Adequado para arquivos pequenos (~1MB) em contexto acadêmico
- Controle de acesso baseado em usuário e grupo implementado
- Testes unitários implementados para verificar funcionamento
- Alinhamento entre frontend e backend concluído (métodos HTTP, parâmetros e limites de tamanho)

## 2024-06-16: Correção de bugs

### Loop infinito nas etapas de Protótipo e Conclusão

- Identificado problema de loop infinito ao clicar em "Atualizar" nos componentes de Protótipo e Conclusão
- O problema era causado pelo uso incorreto de `takeUntil` dentro do método `onSubmit()`, o que mantinha subscriptions ativas indefinidamente
- Nas chamadas de update, uma nova emissão do Observable causava um loop de requisições
- Corrigido usando o operador `take(1)` para garantir que as subscriptions sejam encerradas após receberem o primeiro valor
- Arquivos corrigidos:
  - `design-thinking-ed-platform-fe/src/app/pages/project/components/prototyping-step/prototyping-step.component.ts`
  - `design-thinking-ed-platform-fe/src/app/pages/project/components/conclusion-step/conclusion-step.component.ts`

### ProjectId e UserId vazios nas etapas de Protótipo e Conclusão

- Identificado problema onde os componentes de Protótipo e Conclusão não estavam obtendo corretamente os IDs de projeto e usuário
- Diferente dos outros componentes da aplicação, esses não herdavam da classe `BaseStepComponent` e não tinham a inicialização adequada
- Ao invés de usar um @Input sem valor passado, agora os componentes obtêm os valores dinâmicamente:
  - ProjectId do parâmetro de rota usando `this.route.parent?.snapshot.params['projectId']`
  - UserId do serviço de usuário usando `this.userFacade.user$.pipe(take(1))`
- Adicionados métodos `initializeUser()` e `initializeProjectId()` em ambos componentes
- Com essa correção, as operações de criação, atualização e manipulação de arquivos agora são associadas corretamente ao usuário e projeto
- Arquivos corrigidos:
  - `design-thinking-ed-platform-fe/src/app/pages/project/components/prototyping-step/prototyping-step.component.ts`
  - `design-thinking-ed-platform-fe/src/app/pages/project/components/conclusion-step/conclusion-step.component.ts`

### Problemas no upload de arquivos

- Identificados problemas no processo de upload de arquivos:
  1. O backend estava usando `MulterModule` com armazenamento em disco, o que resultava em arquivos sendo salvos mesmo quando a requisição falhava
  2. Os parâmetros no DTO não estavam sendo convertidos corretamente para números no backend
  3. No frontend, não havia validação dos IDs antes do envio
- Soluções implementadas:
  1. Atualizado o `MulterModule` para usar `memoryStorage()` ao invés de `diskStorage()`
  2. Modificado o controller para converter explicitamente os parâmetros recebidos para o tipo numérico
  3. Adicionada validação no `FileUploadService` do frontend para garantir que userId e projectId são números válidos
- Essas correções garantem que:
  - Arquivos só são salvos quando a requisição é bem-sucedida
  - Valores de userId e projectId são sempre tratados como números
  - Melhor validação no frontend e backend para evitar requisições inválidas
- Arquivos corrigidos:
  - `design-thinking-ed-platform-be/src/modules/file/file.module.ts`
  - `design-thinking-ed-platform-be/src/modules/file/file.controller.ts`
  - `design-thinking-ed-platform-fe/src/app/common/services/file-upload.service.ts`
