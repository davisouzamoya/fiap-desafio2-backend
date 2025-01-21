import express from 'express';
const router = express.Router();
import userRoute from '../controllers/usersController.js';
import ensureAuthenticated from '../middleware/ensureAuthenticated.js';

router.get("/", ensureAuthenticated, userRoute.listUsers); 
router.get("/:id", ensureAuthenticated, userRoute.getUserById); 
router.put("/change", ensureAuthenticated, userRoute.updateUser); 
router.post("/register", userRoute.createUser); 
router.post("/login", userRoute.loginUser); 
router.delete("/delete/:id", ensureAuthenticated, userRoute.deleteUser);

export default router;
