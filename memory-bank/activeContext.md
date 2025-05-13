# Contexto Atual

## Foco Atual

- ✅ Implementação de uma seção de Métricas para professores no módulo de projeto
- ✅ A seção mostra métricas e estatísticas dos alunos do projeto/grupo
- ✅ Métricas incluem quantidade de interações, likes, respostas e respostas selecionadas
- ✅ Apenas usuários do tipo professor têm acesso a esta funcionalidade
- ✅ Implementação segue o padrão da aplicação com uma rota separada dentro do módulo de projeto

## Plano para Implementação da Página de Métricas

### 1. Estrutura do Componente

- Criar um novo componente de métricas como uma rota adicional dentro do módulo de projeto
- Adicionar uma nova opção "Métricas" no menu de navegação, visível apenas para usuários do tipo PROFESSOR
- Implementar guard para proteger a rota apenas para professores

### 2. Backend

- Criar um novo endpoint no controller de projeto para buscar métricas por projeto
- Implementar serviço que agrega dados de:
  - Contagem total de interações (likes dados, respostas criadas) por aluno
  - Contagem de likes recebidos por aluno
  - Contagem de respostas criadas por aluno
  - Contagem de respostas selecionadas (isSelected: true) por aluno
- Implementar filtro por etapa do Design Thinking

### 3. Frontend

- Criar store para gerenciar os dados de métricas
- Implementar componente de tabela principal com colunas:
  - Nome do aluno
  - Total de interações
  - Likes dados
  - Respostas criadas
  - Respostas selecionadas
- Adicionar filtro por etapa do projeto (Definição, Empatia, Problema, Ideação, etc)
- Implementar loading state e tratamento de erros

### 4. Integração

- Integrar a nova rota no módulo de projeto
- Atualizar o menu de navegação para incluir o link para métricas (apenas para professores)
- Testar a visibilidade condicional baseada no tipo de usuário

### 5. Testes

- Implementar testes unitários para os novos componentes e serviços
- Testar os diferentes filtros e visualizações

## Tarefas para Implementação

### Backend

1. Criar DTO para resposta de métricas (StudentMetricsDto)
2. Implementar método no ProjectService para coletar métricas por projeto
3. Adicionar endpoint `/metrics/:projectId` no ProjectController
4. Implementar lógica para contagem de interações no UserVoteService
5. Criar query para recuperar respostas selecionadas por aluno
6. Implementar filtro por etapa do projeto nos dados de métricas

### Frontend

1. Criar interface para modelo de métricas (student-metrics.interface.ts)
2. Criar store para métricas (metrics-store)
   - Criar ações, reducers, efeitos e selectors
   - Implementar facade para acesso simplificado
3. Criar serviço para comunicação com backend (metrics.service.ts)
4. Implementar componente de métricas (metrics-step.component)
   - Criar template com tabela de métricas
   - Implementar filtro por etapa
   - Adicionar lógica para exibição condicional
5. Adicionar rota para o componente de métricas
6. Atualizar menu de navegação do projeto para exibir opção de métricas apenas para professores

### Testes e Integração

1. Implementar testes unitários para serviços de backend
2. Implementar testes unitários para componentes de frontend
3. Testar visibilidade condicional (professor vs. aluno)
4. Verificar funcionamento dos filtros por etapa
5. Validar dados de métricas com cenários reais

## Decisões Ativas

- As métricas serão específicas para cada projeto, não comparando entre diferentes projetos
- A interface inicial será baseada em tabelas, sem gráficos visuais
- Será implementado um filtro por etapa do Design Thinking, mas não por aluno individual
- As métricas qualitativas serão baseadas na contagem de respostas marcadas como isSelected
- A visualização será restrita apenas aos usuários do tipo professor
- Não será implementada exportação de dados (CSV, PDF)
- As etapas de Prototipação e Conclusão completam o fluxo de Design Thinking
- Adição de um componente reutilizável para upload de arquivos:
  - Suporte a drag-and-drop
  - Exibição de progresso de upload
  - Listagem de arquivos enviados
  - Funcionalidade para remoção de arquivos
- Estratégia de armazenamento de arquivos:
  - Implementado armazenamento em PostgreSQL (bytea)
  - Adequado para arquivos menores (limite de 1MB)
  - Solução simples que não requer infraestrutura adicional
  - Controle de tamanho de arquivo para garantir performance
- Backend implementado seguindo os padrões dos outros módulos:
  - Entidades com relacionamentos apropriados
  - DTOs para validação de dados
  - Serviços com operações CRUD
  - Controladores com endpoints RESTful
- Visibilidade de arquivos:
  - Membros do mesmo grupo podem visualizar uploads
  - Sem interações (comentários, avaliações) nas últimas etapas

## Implementações Concluídas

### Frontend

- Componente FileUpload reutilizável
  - Interface de arrastar e soltar (drag-and-drop)
  - Exibição de progresso de upload
  - Listagem de arquivos enviados
  - Funcionalidade para exclusão de arquivos
- Store para etapa de Prototipação
  - Ações, reducers, efeitos, selectors, facade
  - Serviços para comunicação com backend
- PrototypingStepComponent para a interface da etapa
  - Formulário para descrição
  - Integração com componente de upload
  - Estilo responsivo
- Store para etapa de Conclusão
  - Ações, reducers, efeitos, selectors, facade
  - Serviço para comunicação com backend
- ConclusionStepComponent para a interface da etapa
  - Formulário para descrição
  - Integração com componente de upload
  - Estilo responsivo
- Integração com navegação do projeto
  - Adição de rota para a etapa de conclusão
  - Inclusão no menu de navegação do projeto
- Correções de alinhamento com backend
  - Correção de métodos HTTP (PUT → PATCH)
  - Alinhamento de limites de tamanho de arquivo (1MB)
  - Correção de parâmetros em chamadas de API

### Backend

- Entidades para gerenciamento de arquivos e protótipos
  - UploadedFile (completa e atualizada para usar bytea)
  - Prototype (completa)
  - Conclusion (completa)
- DTOs para validação de dados
  - CreatePrototypeDto / UpdatePrototypeDto
  - UploadFileDto
  - CreateConclusionDto / UpdateConclusionDto
- Serviços para gerenciamento de arquivos e protótipos
  - FileService (completo, incluindo armazenamento bytea)
  - PrototypeService (completo)
  - ConclusionService (completo)
- Controladores com endpoints RESTful
  - FileController (completo e atualizado para bytea)
  - PrototypeController (completo)
  - ConclusionController (completo)
- Infraestrutura de armazenamento
  - Implementação de armazenamento em banco de dados (bytea)
  - Manutenção de metadados associados
  - Limite de tamanho de arquivo configurável (1MB)
- Controle de acesso baseado em usuário/grupo

## Implementações Pendentes

### Testes e Refinamentos

- Testes de integração para backend
- Testes de componentes para frontend
- Testes com dados reais para todas as etapas
- Verificação de robustez com diferentes tipos de arquivo

## Próximas Etapas

1. **Implementação da Seção de Métricas**

   - Desenvolver backend para agregar métricas dos alunos
   - Implementar componente frontend para visualização
   - Controlar acesso baseado no tipo de usuário

2. **Testes de Integração e E2E**

   - Testar todas as etapas do Design Thinking em sequência
   - Verificar persistência e recuperação de dados entre etapas
   - Validar integridade dos arquivos armazenados em bytea
   - Testar limites de upload e downloads múltiplos

3. **Refinamentos e Otimizações**
   - Otimizar carregamento de arquivos grandes
   - Melhorar feedback visual durante operações de upload/download
   - Implementar paginação para listagens com muitos arquivos
   - Refinar controles de acesso para diferentes perfis de usuário

## Considerações

- A implementação do armazenamento em PostgreSQL com bytea está concluída e pronta para uso
- Esta abordagem simplifica a infraestrutura necessária, eliminando a necessidade de gerenciar arquivos no sistema de arquivos
- A solução é adequada para arquivos menores (como documentos e imagens pequenas)
- Esta implementação permitirá uma futura migração para armazenamento em nuvem, se necessário
- Controle de acesso por usuário/grupo implementado para garantir visibilidade adequada
- Interfaces e serviços seguem o padrão estabelecido no restante da aplicação
- Testes unitários foram criados para validar comportamentos esperados
- O alinhamento entre frontend e backend foi concluído, garantindo compatibilidade

## Plano de Implementação de Tarefas Pendentes

### 1. Responsividade Mobile

O objetivo é adaptar todas as páginas do frontend para proporcionar uma boa experiência em dispositivos móveis, com foco na orientação portrait (retrato).

#### Tarefas:

1. **Criação de Mixins e Utilitários (1 dia)**

   - Criar arquivo `responsive-mixins.scss` com breakpoints padrão
   - Implementar classes utilitárias para visibilidade responsiva
   - Configurar variáveis para tamanhos de fonte e espaçamento em mobile

2. **Responsividade para Etapa de Definição do Desafio (1 dia)**

   - Adaptar layout de grid para coluna única em dispositivos móveis
   - Ajustar formulários para utilizar largura total
   - Melhorar navegação e botões para touchscreen

3. **Responsividade para Etapa de Mapa de Empatia (1 dia)**

   - Reorganizar quadrantes para visualização vertical
   - Otimizar componentes de lista para touchscreen
   - Ajustar formulários para entrada em dispositivos móveis

4. **Responsividade para Etapa de Definição do Problema (1 dia)**

   - Adaptar listas de insights para visualização vertical
   - Aumentar área de toque para ações de upvote
   - Otimizar cards para leitura em telas pequenas

5. **Responsividade para Etapa de Ideação (2 dias)**

   - Reorganizar layout de cards para coluna única
   - Adaptar visualização de prós/contras para layout vertical
   - Melhorar interações de formulário para dispositivos touch

6. **Responsividade para Etapas de Prototipação e Conclusão (1 dia)**

   - Otimizar componente de upload para touchscreen
   - Melhorar visualização de arquivos em telas pequenas
   - Ajustar formulários para facilitar entrada em dispositivos móveis

7. **Responsividade para Página de Métricas (1 dia)**
   - Implementar tabelas responsivas com scroll horizontal
   - Adaptar filtros para visualização em telas pequenas
   - Melhorar legibilidade de dados em dispositivos móveis

### 2. Funcionalidade de "Submit Final"

Implementar a funcionalidade de finalização em etapas que ainda não possuem essa feature.

#### Tarefas:

1. **Ideação - Frontend (2 dias)**

   - Adicionar campo `isSelected` na interface `Idea`
   - Implementar UI para seleção de ideia final
   - Adicionar botão "Finalizar Ideação" com diálogo de confirmação
   - Implementar validações (pelo menos uma ideia, uma selecionada)

2. **Ideação - Backend (1 dia)**

   - Adicionar campo `isSelected` na entidade `Idea`
   - Criar endpoint para atualizar o status de seleção
   - Implementar endpoint para finalizar a etapa

3. **Prototipação - Frontend (1 dia)**

   - Adicionar botão "Finalizar Prototipação" com diálogo de confirmação
   - Implementar validações (descrição preenchida, pelo menos um arquivo)
   - Atualizar store com ações para finalização

4. **Prototipação - Backend (1 dia)**

   - Adicionar status de finalização na entidade `Prototype`
   - Implementar endpoint para finalizar a etapa
   - Adicionar validações necessárias

5. **Conclusão - Frontend (1 dia)**

   - Adicionar botão "Finalizar Projeto" com diálogo de confirmação
   - Implementar validações (descrição preenchida, pelo menos um arquivo)
   - Atualizar store com ações para finalização

6. **Conclusão - Backend (1 dia)**
   - Adicionar status de finalização na entidade `Conclusion`
   - Implementar endpoint para finalizar a etapa
   - Adicionar validações necessárias

### 3. Transformação do Modal de Turmas em Página

Substituir o modal de turmas por uma página completa com funcionalidades expandidas para o professor.

#### Tarefas:

1. **Estrutura Base da Página (1 dia)**

   - Criar componente `ClassDetailComponent`
   - Adicionar rota `/class/:classId` no módulo
   - Implementar layout base seguindo padrões da aplicação

2. **Visualização de Alunos (2 dias)**

   - Implementar listagem de alunos convidados
   - Criar visualização de alunos registrados
   - Adicionar indicador de status para cada aluno
   - Implementar filtros e busca de alunos

3. **Gerenciamento de Grupos (2 dias)**

   - Criar interface para visualização detalhada de grupos
   - Implementar funcionalidade para criar/editar grupos
   - Adicionar drag-and-drop para mover alunos entre grupos
   - Implementar confirmações para ações de grupo

4. **Configuração de Etapas (1 dia)**

   - Adicionar seletor para alterar etapa atual da turma
   - Implementar atualizações em tempo real do status
   - Adicionar visualização do progresso dos grupos

5. **Configuração de Enunciados (2 dias)**

   - Criar interface para editar enunciados das etapas
   - Implementar formulários para protótipo e conclusão
   - Adicionar editor de texto com formatação básica
   - Implementar salvamento automático de rascunhos

6. **Backend e Integração (2 dias)**

   - Adicionar endpoints para novas funcionalidades
   - Implementar serviços para gerenciamento de enunciados
   - Atualizar modelos de dados conforme necessário
   - Implementar testes para os novos endpoints

7. **Remoção do Modal e Finalização (1 dia)**
   - Atualizar links na página principal para direcionar à nova página
   - Remover componente de diálogo após implementação completa
   - Testar fluxo completo de navegação
   - Corrigir eventuais bugs de UI/UX

## Cronograma de Implementação

1. **Fase 1: Responsividade Mobile** (8 dias)

   - Prioridade alta para melhorar experiência em dispositivos móveis
   - Implementação por etapa para entregas incrementais
   - Testes em diferentes dispositivos ao longo do desenvolvimento

2. **Fase 2: Submit Final** (7 dias)

   - Implementação em paralelo com responsividade
   - Priorizar etapa de ideação (mais complexa) primeiro
   - Testes integrados após implementação de cada etapa

3. **Fase 3: Página de Turma** (9 dias)
   - Iniciar após conclusão da fase 1
   - Implementação incremental com entregas por funcionalidade
   - Remoção do modal somente após página completa

## Considerações para Implementação

- Manter padrões visuais consistentes em toda a aplicação
- Priorizar a experiência do usuário em dispositivos móveis
- Garantir validações adequadas antes do submit final
- Implementar feedback visual claro para todas as ações
- Testar exaustivamente em diferentes dispositivos e tamanhos de tela
- Documentar novas funcionalidades e alterações na arquitetura

## Bugs Corrigidos

### Loop Infinito nas Etapas de Protótipo e Conclusão

- Identificamos e corrigimos um bug importante nas etapas de protótipo e conclusão onde o botão "Atualizar" causava um loop infinito de requisições.
- A causa raiz foi o uso incorreto de `takeUntil(this.destroyed$)` em subscriptions temporárias dentro do método `onSubmit()`.
- O problema ocorria porque:
  1. A subscription permanecia ativa até o componente ser destruído
  2. Quando a store era atualizada, o observable emitia um novo valor
  3. Isso acionava a subscription novamente, causando um novo update
  4. O ciclo se repetia indefinidamente
- A solução aplicada foi substituir `takeUntil(this.destroyed$)` por `take(1)` nas subscriptions temporárias, garantindo que sejam canceladas após receberem o primeiro valor.

#### Lição Aprendida

- Para operações pontuais onde apenas precisamos do valor atual de um observable:
  - Use `take(1)` em vez de `takeUntil(this.destroyed$)`
  - Isso evita loops infinitos e memory leaks em situações onde não queremos monitorar mudanças futuras
  - Reserve `takeUntil(this.destroyed$)` para subscriptions que precisam permanecer ativas durante todo o ciclo de vida do componente

### Inicialização Incorreta de IDs nas Etapas de Protótipo e Conclusão

- Identificamos e corrigimos um problema importante nos componentes de protótipo e conclusão onde os IDs de projeto e usuário não estavam sendo corretamente inicializados.
- Os componentes utilizavam `@Input()` sem receber valores apropriadamente, resultando em:
  - ProjectId sempre 0 (padrão)
  - UserId sempre 0 (padrão)
  - Criação de registros com IDs inválidos no backend
  - Falha na associação de arquivos enviados aos projetos corretos
- A solução implementada foi:
  1. Remover os `@Input()` que não estavam sendo utilizados
  2. Adicionar a injeção de `UserFacade` e `ActivatedRoute`
  3. Implementar métodos `initializeUser()` e `initializeProjectId()`
  4. Substituir referências a `userId` por `currentUserId`
  5. Obter o projectId diretamente da rota usando `route.parent?.snapshot.params['projectId']`

#### Impacto da Correção

- Os registros agora são criados com os IDs corretos de projeto e usuário
- Os arquivos enviados são corretamente associados ao projeto atual
- As operações de update funcionam corretamente

### Falhas no Upload de Arquivos

- Identificamos problemas no sistema de upload de arquivos que causavam comportamentos indesejados:
  1. Arquivos eram salvos em disco pelo Multer mesmo quando a requisição falhava (por exemplo, devido a parâmetros inválidos)
  2. Parâmetros numéricos enviados como strings não eram convertidos corretamente no backend
  3. Falta de validação no frontend para garantir a integridade dos IDs antes do envio

#### Soluções Implementadas

1. **No Backend**:
   - Modificado `MulterModule` para usar `memoryStorage()` em vez de armazenamento em disco
   - Isso garante que os arquivos só são processados quando toda a validação é aprovada
   - Implementada conversão explícita de tipos no controller para garantir que parâmetros como `userId` e `projectId` sejam tratados como números
2. **No Frontend**:
   - Adicionada validação no `FileUploadService` para garantir que `userId` e `projectId` são números válidos
   - Implementadas verificações para evitar o envio de requisições com IDs inválidos ou zerados
   - Melhorada a manipulação de erros durante o processo de upload

#### Lições Aprendidas

- Ao usar Multer, prefira `memoryStorage()` quando o destino final não é o sistema de arquivos
- Sempre valide e converta explicitamente tipos em FormData, pois todos os valores são enviados como strings
- Implemente validações tanto no frontend quanto no backend para garantir integridade dos dados

## Implementações Recentes

### Funcionalidade "Submit Final" para Ideação

Implementamos a funcionalidade de "Submit Final" para a etapa de Ideação, permitindo aos usuários selecionar ideias finais e concluir a etapa:

1. **Extensão do Modelo de Dados**

   - Adicionamos o campo `isSelected` à entidade `IdeationIdea`
   - Atualizamos os DTOs para suportar a marcação/desmarcação de ideias
   - Mantivemos a compatibilidade com o restante do sistema

2. **Novas Funcionalidades no Backend**

   - Implementamos um endpoint `POST /ideation/idea/:id/toggle-selection` para alternar o status de seleção
   - Adicionamos um endpoint `GET /ideation/selected` para recuperar apenas as ideias selecionadas de um projeto
   - Seguimos o mesmo padrão de autenticação via userId em queryParams

3. **Melhorias na Interface do Usuário**

   - Adicionamos um botão de seleção para cada ideia
   - Implementamos um chip "Selecionada" para identificar visualmente ideias selecionadas
   - Criamos um botão de "Finalizar Ideação" com validações apropriadas
   - Adicionamos estilos visuais para destacar ideias selecionadas

4. **Gerenciamento de Estado**
   - Atualizamos a store de Ideação para suportar as novas ações
   - Implementamos seletores para contar ideias selecionadas
   - Adicionamos validações para garantir pelo menos uma ideia selecionada

### Melhorias na UX

1. **Feedback Contextual**

   - Mensagens de sucesso ao selecionar/desmarcar ideias
   - Diálogo de confirmação antes de finalizar a etapa
   - Feedback visual imediato ao realizar ações

2. **Validações Aprimoradas**
   - O botão de finalização é desabilitado quando não há ideias selecionadas
   - Mensagem explicativa orienta o usuário a selecionar pelo menos uma ideia
   - Prevenção de submissões inválidas

A implementação segue o mesmo padrão das outras etapas da aplicação (como Definição do Problema), mantendo a coerência da experiência do usuário. A próxima etapa será implementar funcionalidade similar para as etapas de Prototipação e Conclusão.

## Próximas Etapas

Com a conclusão da implementação da seção de métricas, todas as funcionalidades planejadas para o projeto foram implementadas. As próximas etapas incluem:

1. **Testes e Validações**

   - Realizar testes completos de todas as funcionalidades implementadas
   - Validar o funcionamento em diferentes ambientes e dispositivos
   - Verificar edge cases e situações de erro

2. **Documentação Completa**

   - Atualizar a documentação do projeto
   - Documentar APIs e componentes
   - Criar guias de uso para diferentes tipos de usuário

3. **Otimizações de Performance**
   - Identificar e resolver gargalos de desempenho
   - Otimizar queries de banco de dados
   - Melhorar a experiência do usuário em conexões lentas
