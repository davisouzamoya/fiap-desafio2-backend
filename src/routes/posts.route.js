import express from 'express';
const router = express.Router();
import postsRoute from '../controllers/postsController.js';
import ensureAuthenticated from '../middleware/ensureAuthenticated.js';

router.get('/', ensureAuthenticated, postsRoute.listPosts);
router.get('/search', ensureAuthenticated, postsRoute.searchPosts);
router.get('/:id', ensureAuthenticated, postsRoute.getPostById);
router.post('/', ensureAuthenticated, postsRoute.createPost); // Ajustado para seguir RESTful
router.put('/:id', ensureAuthenticated, postsRoute.updatePost); // Ajustado para seguir RESTful
router.delete('/:id', ensureAuthenticated, postsRoute.deletePost); // Ajustado para seguir RESTful

export default router;
