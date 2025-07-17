# Contexto Técnico

## Stack Principal

### Frontend

- **Angular 16** + Material UI
- **NgRx** para gerenciamento de estado
- **Karma** para testes
- **Lazy loading** implementado
- **Responsividade mobile** completa

### Backend

- **NestJS** + TypeORM
- **PostgreSQL** como banco de dados
- **Jest** para testes
- **Clean Architecture** + Repository Pattern

## Estrutura de Dados

### Entidades Principais

- **User**: Usuários (professores/estudantes)
- **Class**: Turmas criadas por professores
- **Group**: Grupos dentro das turmas
- **Project**: Projetos de Design Thinking
- **Etapas**: ChallengeDefinition, EmpathyMap, ProblemDefinition, Ideation, Prototype, Conclusion

### Armazenamento de Arquivos

- **PostgreSQL bytea** para armazenamento direto
- **Limite**: 1MB por arquivo
- **Controle de acesso** por grupo
- **Metadados** associados no mesmo registro

## Padrões de Desenvolvimento

### Frontend

- Componentes reutilizáveis (@stores, @common)
- Stores centralizados por funcionalidade
- Interfaces tipadas em @stores
- Responsividade com mixins SCSS

### Backend

- Controllers RESTful
- Services com lógica de negócio
- DTOs para validação
- Entidades ORM com relacionamentos

## Autenticação

- **QueryParams** (sem JWT)
- userId passado via URL
- Controle de acesso por tipo de usuário
- Compatibilidade com sistema atual

## Dependências Principais

### Frontend

- @angular/core, @angular/material
- @ngrx/store, @ngrx/effects
- rxjs

### Backend

- @nestjs/common, @nestjs/typeorm
- typeorm, pg
- class-validator, class-transformer

## Ambiente

- Node.js 18+
- PostgreSQL 14+
- Angular CLI + NestJS CLI
