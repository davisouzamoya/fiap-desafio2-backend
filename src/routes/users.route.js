import express from 'express';
import userRoute from '../controllers/usersController.js';
import ensureAuthenticated from '../middleware/ensureAuthenticated.js';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from '../../swagger.js'; // Atualize o caminho conforme necessário


const router = express.Router();

// Rotas de usuários
router.get("/", ensureAuthenticated, userRoute.listUsers);
router.get("/:id", ensureAuthenticated, userRoute.getUserById);
router.put("/change", ensureAuthenticated, userRoute.updateUser);
router.post("/register", userRoute.createUser);
router.post("/login", userRoute.loginUser);
router.delete("/delete/:id", ensureAuthenticated, userRoute.deleteUser);

// Rota para a documentação Swagger
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

export default router;
