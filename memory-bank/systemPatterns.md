# Padrões do Sistema

## Arquitetura

- Frontend: Angular 16 com arquitetura modular
- Backend: NestJS com arquitetura limpa
- Banco de Dados: PostgreSQL com TypeORM
- Gerenciamento de Estado: NgRx

## Padrões de Design

- Componentização reutilizável
- Injeção de dependência
- Repository Pattern
- Clean Architecture
- SOLID Principles

## Estrutura de Código

### Frontend

- Módulos lazy-loaded
- Componentes reutilizáveis
- Stores centralizados
- Interfaces tipadas
- Serviços especializados

### Backend

- Controllers RESTful
- Services com lógica de negócio
- Repositories para acesso a dados
- DTOs para transferência
- Entidades ORM

## Padrões de Estado

- Store centralizado
- Actions tipadas
- Reducers puros
- Effects para side-effects
- Selectors para queries

## Padrões de Segurança

- Autenticação via queryParams
- Validação de dados
- Sanitização de inputs
- Proteção contra XSS
- Rate limiting

## Padrões de Componentes

### Base Step Component

- Estende BaseStepComponent
- Implementa métodos abstratos
- Gerencia estado via facade
- Usa componentes comuns

### Response Components

- @response-list para listagem
- @response-form para entrada
- Upvote e seleção
- Edição inline

### Matriz de Definição

- Grid responsivo 3x2
- Campos de texto expansíveis
- Lista de respostas por quadrante
- Botões de ação consistentes

## Padrões de Dados

### Responses

- Tipo específico por quadrante
- Conteúdo em texto
- Metadados do usuário
- Sistema de votos

### Estados

- Loading por quadrante
- Erro global e por ação
- Seleção múltipla
- Cache de respostas

## Padrões de Navegação

- Roteamento por módulo
- Guards de autenticação
- Transições suaves
- Breadcrumb navigation

## Padrões de Teste

- Testes unitários por componente
- Testes de integração
- Testes E2E
- Mocks de serviços
