# Contexto Técnico

## Stack Principal

### Frontend

- Angular 16
- Material UI
- NgRx para gerenciamento de estado
- Karma para testes
- Estrutura baseada em módulos
- Lazy loading implementado

### Backend

- NestJS
- TypeORM
- PostgreSQL
- Jest para testes
- Clean Architecture
- Repository Pattern

## Estrutura de Dados

### Entidades Existentes

- EmpathyMap
- ProblemDefinitionResponse
- ChallengeDefinitionResponse
- User
- Project

### Novas Entidades

- ProblemDefinitionFinal
- ChallengeDefinitionFinal

## Padrões de Desenvolvimento

### Frontend

- Componentes reutilizáveis
- Stores centralizados
- Interfaces tipadas
- Serviços especializados
- Rotas lazy-loaded

### Backend

- Controllers RESTful
- Services com lógica de negócio
- Repositories para acesso a dados
- DTOs para validação
- Entidades ORM

## Dependências Principais

### Frontend

- @angular/core
- @angular/material
- @ngrx/store
- @ngrx/effects
- rxjs

### Backend

- @nestjs/common
- @nestjs/typeorm
- typeorm
- pg
- class-validator
- class-transformer

## Configurações

### Frontend

- ESLint + Prettier
- tsconfig.json
- angular.json
- karma.conf.js

### Backend

- nest-cli.json
- ormconfig.json
- package.json
- tsconfig.json

## Ambiente de Desenvolvimento

- Node.js 18+
- PostgreSQL 14+
- Angular CLI
- NestJS CLI
- Git para controle de versão
