import express from 'express'
const router = express.Router();
import postsRoute from '../controllers/postsController.js'
import ensureAuthenticated from '../middleware/ensureAuthenticated.js'


router.get("/",ensureAuthenticated, postsRoute.listPosts); 
router.get("/search",ensureAuthenticated, postsRoute.searchPosts); 
router.get("/:id",ensureAuthenticated, postsRoute.getPostById); 
router.put("/change",ensureAuthenticated, postsRoute.updatePost); 
router.post("/create",ensureAuthenticated, postsRoute.createPost); 
router.delete("/delete/:id",ensureAuthenticated, postsRoute.deletePost); 


export default router;