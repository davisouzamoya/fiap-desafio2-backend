import express from 'express'
import mongoose from 'mongoose'
import userRoute from './src/routes/users.route.js'
import postsRoute from './src/routes/posts.route.js'
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/users', userRoute);
app.use('/posts', postsRoute);

mongoose.connect("mongodb+srv://davismoya01:CAwq3AO6qi8jRcyO@cluster0.psvfg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});