import request from "supertest";
import bcryptjs from 'bcryptjs';
import app from "../../app.js";
import Posts from "../models/postsModel.js"; 
const { hash } = bcryptjs;

jest.mock("../models/postsModel.js"); 


describe("Post Routes", () => {
  let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3OGU2OGU2MGRlNWM0MTg4NjdjNWRjNyIsImVtYWlsIjoiZGF2aWdsZjVAZXhhbXBsZS5jb20iLCJpYXQiOjE3Mzc0MDg3NjcsImV4cCI6MTczNzQ5NTE2N30.Fk-XfZDjHsq9vsS-i2W8hWabvPUAk32kwpvv6xXO-uk';
  let postId = '678c08c9a6e77e44d2bd945d';



  it("should create a new post", async () => {
    Posts.prototype.save = jest.fn().mockResolvedValue({
      titulo: "Titulo 1",
		  conteudo: "Conteudo 1",
      autor: "Autor 1",
      email:"daviglf7@example.com"
    });
    
    const response = await request(app)
      .post("/posts/")
      .set("authorization", token)
      .send({
        titulo: "Titulo 1",
		    conteudo: "Conteudo 1",
        autor: "Autor 1",
        email:"daviglf7@example.com"
      });

    expect(response.statusCode).toBe(201);
  });

  it("should get all posts", async () => {
    const response = await request(app)
      .get("/posts")
      .set("authorization", token)
      .send();

    expect(response.statusCode).toBe(200);
  });

  it("should get a specific post by ID", async () => {
    const post = {
      id: postId,
      titulo: "Vaginas",
      conteudo: "Com pelo ou sem?",
      autor: "Autor 1",
      email:"daviglf7@example.com"
    };

    Posts.findById = jest.fn().mockResolvedValue(post);

    const response = await request(app)
      .get(`/posts/${postId}`)
      .set("authorization", token)
      .send();

    expect(response.statusCode).toBe(200);
  });

  it("should update a post by ID", async () => {
    const updatedPost = {
      id: "678ec62e8c25f4e920efe8e7",
      titulo: "Vaginas",
      conteudo: "Com pelo ou sem?",
      autor: "Autor 1",
      email:"daviglf7@example.com"
    };

    Posts.findByIdAndUpdate = jest.fn().mockResolvedValue(updatedPost);

    const response = await request(app)
      .put(`/posts/${postId}`)
      .set("authorization", token)
      .send(updatedPost);

    expect(response.statusCode).toBe(200);
  });

  it("should delete a post by ID", async () => {
    
    const response = await request(app)
      .delete(`/posts/${postId}`)
      .set("authorization", token)
      .send();

    expect(response.statusCode).toBe(200);
  });
});