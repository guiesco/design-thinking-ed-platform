# Padrões do Sistema

## Arquitetura

### Backend

- NestJS com TypeORM
- PostgreSQL como banco de dados
- Clean Architecture
- Repository Pattern
- DTOs para transferência de dados

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
