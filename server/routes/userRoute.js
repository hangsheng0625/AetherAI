import express from 'express';
import { auth } from '../middlewares/auth.js';
import { getUserCreations, getPublishCreations, toggleLikeCreations, deleteCreation } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.get('/get-user-creations', auth, getUserCreations);
userRouter.get('/get-published-creations', auth, getPublishCreations);
userRouter.post('/toggle-like-creations', auth, toggleLikeCreations);
userRouter.delete('/delete-creation/:creationId', auth, deleteCreation);

export default userRouter;
