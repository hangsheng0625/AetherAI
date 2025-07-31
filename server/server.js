import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { clerkMiddleware, requireAuth } from '@clerk/express'
import aiRouter from './routes/aiRoute.js';
import connectCloudinary from './configs/cloudinary.js';
import userRouter from './routes/userRoute.js';

const app = express();

// Initialize services
const initializeServices = async () => {
  try {
    connectCloudinary(); // Remove await if using the simple version
    console.log('Cloudinary connected successfully');
  } catch (error) {
    console.error('Failed to connect to Cloudinary:', error);
    // Don't throw here - let the app start even if Cloudinary fails
  }
};

// Middleware
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

// Public routes (before requireAuth)
app.get('/', (req, res) => {
  res.send('Welcome to the QuickAI Server!');
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Protected routes (after requireAuth)
app.use('/api/ai', requireAuth(), aiRouter);
app.use('/api/user', requireAuth(), userRouter);

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// For Vercel, we don't need app.listen
// Instead, we initialize services and export the app
const startApp = async () => {
  await initializeServices();
  
  // Only listen if not in Vercel environment
  if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }
};

startApp().catch(console.error);

export default app;