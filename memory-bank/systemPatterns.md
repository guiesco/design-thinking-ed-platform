# Padrões do Sistema

## Arquitetura

### Backend

- NestJS com TypeORM
- PostgreSQL como banco de dados
- Clean Architecture
- Repository Pattern
- DTOs para transferência de dados
- Módulos dedicados para funcionalidades específicas
  - Cada recurso/funcionalidade possui seu próprio módulo
  - Separação clara de responsabilidades entre módulos
  - Melhor manutenibilidade e testabilidade

### Frontend

- Angular 16
- Material UI
- NgRx para gerenciamento de estado
- Lazy loading para módulos
- Componentes reutilizáveis

## Padrões de Entidades

### Entidades de Resposta

- Todas as entidades de resposta seguem o mesmo padrão:
  - ID
  - Tipo (enum)
  - Conteúdo
  - Upvotes
  - isSelected
  - Relacionamentos com User e Project
  - Timestamps

### Entidades Finais

- Cada etapa tem uma entidade final que:
  - Consolida as respostas selecionadas
  - Mantém relacionamento com User e Project
  - Inclui timestamps
  - Campos específicos baseados no enum da etapa

### Nova Estrutura para Ideação

- Implementação de estrutura hierárquica:
  - IdeationIdea (entidade pai)
    - Título da ideia
    - Relacionamento com projeto e usuário
    - Upvotes
  - IdeationPoint (entidade filha)
    - Conteúdo do ponto
    - Tipo (PRO/CON)
    - Relacionamento com ideia e usuário
    - Upvotes

### Estrutura para Protótipo e Conclusão

- Padrão para gerenciamento de arquivos:
  - UploadedFile (entidade base)
    - Metadados do arquivo (nome, tamanho, tipo)
    - Conteúdo do arquivo armazenado como bytea
    - Relacionamentos (usuário, projeto, grupo)
    - Tipo de etapa (enum)
  - Prototype/Conclusion (entidades finais)
    - Descrição configurável (enunciado do professor)
    - Referências para arquivos enviados
    - Relacionamentos com usuário e projeto

## Padrões de Navegação

- Verificação de etapas anteriores antes de avançar
- Manutenção do contexto entre etapas
- Exibição de artefatos finais das etapas anteriores

## Padrões de Estado

- Store por módulo
- Interfaces centralizadas em @stores
- Ações padronizadas (load, create, update, delete)
- Efeitos para operações assíncronas

## Padrões de Componentes

- BaseStep como componente base
- ResponseList para listagem
- ResponseForm para criação/edição
- Reutilização de componentes comuns

### Padrão Específico para Ideação

- Layout em cards com três colunas:
  - Título da ideia
  - Prós (formulário + lista)
  - Contras (formulário + lista)
- Formulários simples com botões de ação
- Sistema de upvote para ideias e pontos
- Ações de edição e exclusão
- Feedback visual para interações

### Padrão para Upload de Arquivos

- Componente reutilizável FileUpload:
  - Interface drag-and-drop
  - Progresso visual de upload
  - Configuração flexível (tipos, tamanhos)
  - Validação visual de arquivos
- Padrão de armazenamento:
  - Armazenamento direto no PostgreSQL usando bytea
  - Adequado para arquivos pequenos (~1MB)
  - Limite de tamanho para manter performance
  - Metadados associados no mesmo registro
- Visibilidade baseada em grupos:
  - Acesso compartilhado dentro do grupo
  - Controle de propriedade para exclusão
  - Acesso total para professores

## Padrões de API

- RESTful
- Endpoints padronizados por recurso
- DTOs para validação
- Tratamento de erros consistente

## Padrões de Segurança

- Autenticação via queryParams
- Validação de propriedade de recursos
- Verificação de etapas completas

## Padrões de Teste

- Testes unitários para serviços
- Testes de componentes
- Testes E2E para fluxos completos

## Padrões de UI/UX

- Material Design como base
- Cards para organização de conteúdo
- Formulários com validação em tempo real
- Feedback imediato para ações do usuário
- Animações sutis para melhoria da experiência
- Responsividade para diferentes dispositivos
