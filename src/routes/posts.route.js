import express from 'express';
const router = express.Router();
import postsRoute from '../controllers/postsController.js';
import ensureAuthenticated from '../middleware/ensureAuthenticated.js';

router.get('/', ensureAuthenticated, postsRoute.listPosts);
router.get('/search', ensureAuthenticated, postsRoute.searchPosts);
router.get('/:id', ensureAuthenticated, postsRoute.getPostById);
router.post('/', ensureAuthenticated, postsRoute.createPost); 
router.put('/:id', ensureAuthenticated, postsRoute.updatePost); 
router.delete('/:id', ensureAuthenticated, postsRoute.deletePost); 

export default router;
