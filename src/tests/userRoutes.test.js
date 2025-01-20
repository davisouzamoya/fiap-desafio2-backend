import request from "supertest";
import mongoose from "mongoose";
import app from "../../app.js";

let token; // Token global para ser usado nos testes

describe("User Routes", () => {
  beforeAll(async () => {
    try {
      // Limpar a coleção de usuários antes de iniciar os testes
      const db = mongoose.connection.db;
      if (db) {
        await db.collection("users").deleteMany({});
        console.log("Coleção 'users' limpa.");
      } else {
        throw new Error("Conexão com o banco de dados não estabelecida.");
      }

      // Criar um usuário para teste
      const registerRes = await request(app)
        .post("/users/register")
        .send({
          username: "testuser",
          password: "testpassword",
        });

      if (registerRes.status !== 200) {
        console.error("Erro ao registrar usuário:", registerRes.body);
        throw new Error("Erro ao criar usuário de teste.");
      }

      console.log("Usuário de teste criado com sucesso.");

      // Fazer login para obter o token
      const loginRes = await request(app)
        .post("/users/login")
        .send({
          username: "testuser",
          password: "testpassword",
        });

      if (loginRes.status !== 200) {
        console.error("Erro no login do usuário:", loginRes.body);
        throw new Error("Erro ao realizar login.");
      }

      token = loginRes.body.token;
      console.log("Token gerado com sucesso:", token);
    } catch (error) {
      console.error("Erro no setup do teste:", error.message);
      throw error;
    }
  });

  afterAll(async () => {
    await mongoose.connection.close();
    console.log("Conexão com o MongoDB encerrada.");
  });

  it("should return all users", async () => {
    const res = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${token}`); // Passar o token no cabeçalho

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("users");
  });

  it("should login user", async () => {
    const res = await request(app)
      .post("/users/login")
      .send({
        username: "testuser",
        password: "testpassword",
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
  });
});





