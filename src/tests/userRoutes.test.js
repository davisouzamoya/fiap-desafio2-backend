import request from "supertest";
import bcryptjs from 'bcryptjs';
import app from "../../app.js";
import User from "../models/user.js"; 
const { hash } = bcryptjs;

jest.mock("../models/user.js"); 

describe("User Routes", () => {
  
  let token = '';
  
  const userData = {
    nome: "Usuario 2 True",
    email: "daviglf5@example.com",
    is_teacher: false,
    password: "123"
  };
  
  //Para realizar a validação deve ser alterado os valores de id e nome com de um usuario criado
  const updatedUserData = {
    id: '678c08c9a6e77e44d2bd945d',
    nome: "Usuario 2 Updated"
  };

  //Para realizar a validação deve ser alterado o com um id criado no banco
  const deleteUserId = '678bf012747f47fe24701cd8';

  it("should create a new user", async () => {
    User.prototype.save = jest.fn().mockResolvedValue(userData);
    
    const response = await request(app)
      .post("/users/register")
      .send(userData);

    expect(response.statusCode).toBe(201);
  });

  it("should login an existing user", async () => {
    const hashedPassword = await hash(userData.password, 10);
    User.findOne = jest.fn().mockResolvedValue({
      email: userData.email,
      password: hashedPassword
    });

    const response = await request(app)
      .post("/users/login")
      .send({
        email: userData.email,
        password: userData.password
      });

    expect(response.statusCode).toBe(200);
    token = response.body.token;
  });

  it("should update a user by ID", async () => {
    User.findByIdAndUpdate = jest.fn().mockResolvedValue(updatedUserData);

    const response = await request(app)
      .put(`/users/change`)
      .set("authorization", token)
      .send(updatedUserData);

    expect(response.statusCode).toBe(200);
  });

  it("should delete a user by ID", async () => {
    User.findByIdAndDelete = jest.fn().mockResolvedValue({
      id: deleteUserId,
      nome: userData.nome
    });

    const response = await request(app)
      .delete(`/users/delete/${deleteUserId}`)
      .set("authorization", token)
      .send();

    expect(response.statusCode).toBe(200);
  });

});
