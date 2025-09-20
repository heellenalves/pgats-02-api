# API de Usuários e Transferências

Esta API permite realizar operações de registro, login, consulta de usuários e transferências de valores entre usuários. O banco de dados é em memória, ideal para aprendizado de testes e automação de APIs.

## Instalação

1. Clone o repositório ou copie os arquivos para seu ambiente.
2. Instale as dependências:
  ```powershell
  npm install
  ```

3. Configure a variável de ambiente JWT_SECRET antes de iniciar o servidor:
  ```powershell
  $env:JWT_SECRET="suaChaveSecretaAqui"
  ```

## Como executar

- Para iniciar o servidor:
  ```powershell
  node server.js
  ```
- A API estará disponível em `http://localhost:3000`.
- A documentação Swagger estará disponível em `http://localhost:3000/api-docs`.

## Endpoints principais

### Registro de usuário
- `POST /api/users/register`
  - Body: `{ "username": "string", "password": "string", "isFavorecido": true|false }`

### Login de usuário
- `POST /api/users/login`
  - Body: `{ "username": "string", "password": "string" }`
  - Resposta: `{ "token": "<JWT>" }`

### Consulta de usuários
- `GET /api/users`

### Transferências
- `POST /api/transfers`
  - Body: `{ "from": "string", "to": "string", "amount": number }`
- `GET /api/transfers`

## Regras de negócio
- Não é permitido registrar usuários duplicados.
- Login exige usuário e senha.
- Transferências acima de R$ 5.000,00 só podem ser feitas para usuários marcados como "favorecido".

## Testes
- Para testar a API com Supertest, importe o `app.js` diretamente em seus testes.

## Documentação Swagger
- Acesse `/api-docs` para visualizar e testar os endpoints via Swagger UI.
