# FIAP FASE 02 

## Descrição
A Blog API é uma aplicação backend desenvolvida em Node.js que fornece endpoints para criar, editar, excluir e buscar posts em um sistema de blog. A aplicação utiliza MongoDB como banco de dados e está configurada para CI/CD com GitHub Actions, além de suporte para containerização com Docker.

## Stack utilizada

### Back-end
- **Node.js**
- **Express.js**
- **MongoDB**

### Containerização
- **Docker**
- **Docker Compose**

### CI/CD
- **GitHub Actions**

### Testes
- **Jest**

## Regras de Negocio de Usuários

- **Listar Usuários:** Recupera uma lista de todos os usuários.
- **Buscar Usuário por ID:** Retorna os detalhes de um usuário específico pelo ID.
- **Criar Usuário:** Permite que novos usuários se registrem.
- **Editar Usuário:** Permite que usuários atualizem suas informações.
- **Excluir Usuário:** Permite que usuários removam suas contas.
- **Login de Usuário:** Permite que usuários façam login no sistema.

## Regras de Negocio de Posts

- **Listar Posts:** Recupera uma lista de todos os posts.
- **Buscar Post por ID:** Retorna os detalhes de um post específico pelo ID.
- **Criar Post:** Permite que professores criem novos posts.
- **Editar Post:** Permite que professores atualizem posts existentes.
- **Excluir Post:** Permite que professores removam posts.
- **Buscar Posts por Palavra-Chave:** Filtra posts com base em palavras-chave no título ou conteúdo.

## Pré-requisitos

1. **Docker:** Instalado e configurado.


## Configuração do Ambiente

1. Clone o repositório:
   ```bash
   git clone https://github.com/davisouzamoya/fiap-desafio2-backend.git
   ```

2. Clone o repositório:
    ```bash
    cd fiap-desafio2-backend
    ```

3. Instale as dependências:
   ```bash
   npm install
   ```

4. Configure o arquivo `.env` com as variáveis de ambiente:
   ```env
   MONGO_URI=mongodb://localhost:27017/blog
   PORT=3000
   ```

5. Inicie o servidor:
   ```bash
   npm start
   ```
## Endpoints da API

### Rotas de Usuários

- `GET /api/users`: Retorna a lista de usuários.
- `GET /api/users/:id`: Retorna os detalhes de um usuário específico.
- `POST /api/users`: Cria um novo usuário.
- `PUT /api/users/:id`: Atualiza as informações de um usuário específico.
- `DELETE /api/users/:id`: Remove um usuário específico.

router.get("/", ensureAuthenticated, userRoute.listUsers); 
router.get("/:id", ensureAuthenticated, userRoute.getUserById); 
router.put("/change", ensureAuthenticated, userRoute.updateUser); 
router.post("/register", userRoute.createUser); 
router.post("/login", userRoute.loginUser); 
router.delete("/delete/:id", ensureAuthenticated, userRoute.deleteUser);

### Rotas de Posts

- `GET /api/posts`: Retorna a lista de posts.
- `POST /api/posts`: Cria um novo post.
- `GET /api/posts/:id`: Retorna os detalhes de um post específico.
- `PUT /api/posts/:id`: Atualiza as informações de um post específico.
- `DELETE /api/posts/:id`: Remove um post específico.




Para iniciar a aplicação, é necessário criar um usuário e realizar o login.

1. Crie um usuário utilizando a rota `POST /api/users/register`.
2. Realize o login utilizando a rota `POST /api/users/login`.

## Modelo de Criação de Usuário

Para criar um usuário, envie uma requisição `POST` para a rota `/api/users` com o seguinte corpo JSON:

```json
{
    "nome": "nome do user",
    "email": "teste@example.com",
    "is_teacher": false,
    "password": "123"
}
```

## Modelo de Login

Para realizar o login, envie uma requisição `POST` para a rota `/api/login` com o seguinte corpo JSON:

```json
{
    "email": "teste@example.com",
    "password": "123"
}
```
## Autenticação

Após realizar o login, um token será gerado. Esse token deve ser passado no header `Authorization` com o valor `<token>` em todas as demais rotas que requerem autenticação.

Exemplo de header:

```
authorization: <token>
```

### Listar Posts
- **GET** `/posts`

### Buscar Post por ID
- **GET** `/posts/:id`

### Criar Post
- **POST** `/posts`
  - Body (JSON):
    ```json
    {
      "titulo": "Título do Post",
      "conteudo": "Conteúdo do Post",
      "autor": "Nome do Autor",
      "email": "emaildoautor@exemplo.com"
    }
    ```

### Editar Post
- **PUT** `/posts/:id`
  - Body (JSON):
    ```json
    {
      "titulo": "Novo Título",
      "conteudo": "Novo Conteúdo",
      "autor": "Nome do Autor"
    }
    ```

### Excluir Post
- **DELETE** `/posts/:id`

### Buscar Posts por Palavra-Chave
- **GET** `/posts/search?q=palavra-chave`


## Testes

1. Execute os testes automatizados:
   ```bash
   npm test
   ```

## CI/CD com GitHub Actions

- Workflows configurados para:
  - Testar a aplicação em cada pull request ou push na branch `master`.
  - Fazer deploy automático usando Docker.


## Estrutura do Projeto

```
backend/
├── src/
│   ├── controllers/     # Lógica dos endpoints
│   ├── models/          # Modelos do MongoDB
│   ├── routes/          # Definições de rotas
│   └── tests/           # Testes automatizados
├── .github/workflows/   # Configurações de CI/CD
├── Dockerfile           # Configuração para o Docker
├── docker-compose.yml   # Configuração para Docker Compose
├── package.json         # Dependências e scripts
└── README.md            # Documentação
```


## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/fooBar`)
3. Faça commit das suas alterações (`git commit -am 'Add some fooBar'`)
4. Faça push para a branch (`git push origin feature/fooBar`)
5. Abra um Pull Request

## Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.