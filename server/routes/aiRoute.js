import express from 'express';
import { auth } from '../middlewares/auth.js';
import { generateArticle } from '../controllers/aiController.js';
import { generateBlogTitle } from '../controllers/aiController.js';
import { generateImage } from '../controllers/aiController.js';

const aiRouter = express.Router();

// API endpoint to generate an article
aiRouter.post('/generate-article', auth, generateArticle);
aiRouter.post('/generate-blog-title', auth, generateBlogTitle);
aiRouter.post('/generate-image', auth, generateImage);

export default aiRouter;