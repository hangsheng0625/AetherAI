import express from 'express';
import { auth } from '../middlewares/auth.js';
import { generateArticle, removeImageBackground, removeImageObject, resumeReview } from '../controllers/aiController.js';
import { generateBlogTitle } from '../controllers/aiController.js';
import { generateImage } from '../controllers/aiController.js';
import { upload } from '../configs/multer.js';

const aiRouter = express.Router();

// API endpoint to generate an article
aiRouter.post('/generate-article', auth, generateArticle);
aiRouter.post('/generate-blog-title', auth, generateBlogTitle);
aiRouter.post('/generate-image', auth, generateImage);
aiRouter.post('/remove-image-background', auth, upload.single('image'), removeImageBackground);
aiRouter.post('/remove-image-object', auth, upload.single('image'), removeImageObject);
aiRouter.post('/resume-review', auth, upload.single('resume'), resumeReview);

export default aiRouter;