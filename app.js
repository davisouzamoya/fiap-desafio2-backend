import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./src/routes/users.route.js"; 
import postsRoute from "./src/routes/posts.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/users", userRoute); 
app.use("/posts", postsRoute); 

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
  })
  .then(() => {
    // console.log("Conexão com MongoDB estabelecida com sucesso!");
  })
  .catch((err) => {
    // console.error("Erro ao conectar ao MongoDB:", err.message);
  });




if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;


