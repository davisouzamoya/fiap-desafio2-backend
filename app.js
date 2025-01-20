import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./src/routes/users.route.js"; // Importação correta
import postsRoute from "./src/routes/posts.route.js"; // Certifique-se de que este arquivo exista

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para interpretar JSON
app.use(express.json());

// Rotas principais
app.use("/users", userRoute); 
app.use("/posts", postsRoute); // Certifique-se de que as rotas de posts estão configuradas corretamente

// Rota básica para verificar o funcionamento da API
app.get("/", (req, res) => {
  res.send("API está funcionando! Acesse /users ou /posts.");
});

// Configuração de conexão com o MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true, // Remove aviso relacionado ao uso do parser de URL antigo
    useUnifiedTopology: true, // Remove aviso relacionado à topologia unificada
  })
  .then(() => {
    console.log("Conexão com MongoDB estabelecida com sucesso!");
  })
  .catch((err) => {
    console.error("Erro ao conectar ao MongoDB:", err.message);
  });

// Exportar o app sem iniciar o servidor (para evitar conflitos nos testes)
export default app;

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}


