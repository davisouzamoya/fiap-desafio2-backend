# FIAP FASE 02 

## Descrição
Atualmente, a maioria dos professores e professoras da rede pública de educação não têm plataformas onde postar suas aulas e transmitir conhecimento para alunos e alunas de forma prática, centralizada e tecnológica. Para solucionar esse problema, nós criamos uma aplicação de blogging dinâmico. A aplicação foi um sucesso e, agora, escalará para um panorama nacional. Portanto, precisaremos refatorar nosso Back-end, utilizando a plataforma de desenvolvimento Node.js, e persistir esses dados em um banco de dados.

## Instalação

```bash
npm install
```
## Inicialização

As seguintes rotas estão disponíveis na aplicação:

### Rotas de Usuários

- `GET /api/users`: Retorna a lista de usuários.
- `POST /api/users`: Cria um novo usuário.
- `GET /api/users/:id`: Retorna os detalhes de um usuário específico.
- `PUT /api/users/:id`: Atualiza as informações de um usuário específico.
- `DELETE /api/users/:id`: Remove um usuário específico.

### Rotas de Posts

- `GET /api/posts`: Retorna a lista de posts.
- `POST /api/posts`: Cria um novo post.
- `GET /api/posts/:id`: Retorna os detalhes de um post específico.
- `PUT /api/posts/:id`: Atualiza as informações de um post específico.
- `DELETE /api/posts/:id`: Remove um post específico.

Para iniciar a aplicação, é necessário criar um usuário e realizar o login.

1. Crie um usuário utilizando a rota `POST /api/users`.
2. Realize o login utilizando a rota `POST /api/login`.
## Rotas
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


## Estrutura do Projeto

```
backend/
├── node_modules/
├── src/
│   ├── index.js
│   └── ...
├── package.json
└── README.md
```

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/fooBar`)
3. Faça commit das suas alterações (`git commit -am 'Add some fooBar'`)
4. Faça push para a branch (`git push origin feature/fooBar`)
5. Abra um Pull Request

## Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.