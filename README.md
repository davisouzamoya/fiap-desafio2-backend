# node-app
# Blog API

## Visão Geral
A Blog API é uma aplicação backend desenvolvida em Node.js que fornece endpoints para criar, editar, excluir e buscar posts em um sistema de blog. A aplicação utiliza MongoDB como banco de dados e está configurada para CI/CD com GitHub Actions, além de suporte para containerização com Docker.

## Funcionalidades

- **Listar Posts:** Recupera uma lista de todos os posts.
- **Buscar Post por ID:** Retorna os detalhes de um post específico pelo ID.
- **Criar Post:** Permite que professores criem novos posts.
- **Editar Post:** Permite que professores atualizem posts existentes.
- **Excluir Post:** Permite que professores removam posts.
- **Buscar Posts por Palavra-Chave:** Filtra posts com base em palavras-chave no título ou conteúdo.

## Tecnologias Utilizadas

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

## Pré-requisitos

1. **Node.js:** Versão 16 ou superior.
2. **Docker:** Instalado e configurado.
3. **MongoDB:** Instância local ou em container.

## Configuração do Ambiente

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/blog-api.git
   cd blog-api
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure o arquivo `.env` com as variáveis de ambiente:
   ```env
   MONGO_URI=mongodb://localhost:27017/blog
   PORT=3000
   ```

4. Inicie o servidor:
   ```bash
   npm start
   ```

## Utilização com Docker

1. Construa e execute os containers:
   ```bash
   docker-compose up --build
   ```

2. Acesse a API em `http://localhost:3000`.

## Endpoints da API

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
  - Testar a aplicação em cada pull request ou push na branch `main`.
  - Fazer deploy automático usando Docker.

## Estrutura do Projeto

```
blog-api/
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

1. Faça um fork do repositório.
2. Crie uma branch para sua feature: `git checkout -b minha-feature`.
3. Faça commit das alterações: `git commit -m 'Adiciona nova feature'`.
4. Envie para o repositório remoto: `git push origin minha-feature`.
5. Abra um Pull Request no GitHub.

## Licença
Este projeto está licenciado sob a Licença MIT. Consulte o arquivo LICENSE para mais detalhes.

---

Para dúvidas ou sugestões, entre em contato com o mantenedor do projeto.