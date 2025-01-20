import express from 'express';
import postsRoute from '../controllers/postsController.js';
import ensureAuthenticated from '../middleware/ensureAuthenticated.js';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from '../../swagger.js'; // Atualize o caminho conforme necessário


const router = express.Router();

// Rotas de posts
router.get('/', ensureAuthenticated, postsRoute.listPosts);
router.get('/search', ensureAuthenticated, postsRoute.searchPosts);
router.get('/:id', ensureAuthenticated, postsRoute.getPostById);
router.post('/', ensureAuthenticated, postsRoute.createPost);
router.put('/:id', ensureAuthenticated, postsRoute.updatePost);
router.delete('/:id', ensureAuthenticated, postsRoute.deletePost);

// Rota para a documentação Swagger
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

export default router;
