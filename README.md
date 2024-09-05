# 📝 Servico de Atendimento

API backend para gerenciamento de registros e tickets, com arquitetura em camadas (Controller, Service, Repository) para separar responsabilidades.

## 🚀 Tecnologias

- **Node.js**, **Express**, **Mongoose**

## 🔧 Como Rodar

1. Clone o repositório.
2. Instale as dependências: `npm install`
3. Inicie: `npm start`

## Desenho de arquitetura simples:

```mermaid
---
config:
  theme: neo-dark
  look: handDrawn
---
flowchart TD
 subgraph Client
    E1[Mobile]
 end
 subgraph Backend["Backend"]
    A1[ControllerRegistros]
    A2[ControllerTickets]
    B1[ServiceRegistros]
    B2[ServiceTickets]
    C1[RepositoryRegistros]
    C2[RepositoryTickets]
  end
  subgraph DataBase
    D1[MongoDB]
  end
    A1 --> B1
    B1 --> C1
    A2 --> B2
    B2 --> C2
    E1 --> A1
    E1 --> A2
    C1 --> D1
    C2 --> D1
```
