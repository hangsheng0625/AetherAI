# 🚀 AetherAI - Advanced AI-Powered SaaS Platform

![AetherAI Banner](client/src/assets/AetherAI-logo-with-text.svg)

## 🌐 Live Demo

- **Frontend**: [https://aether-ai-client.vercel.app](https://aether-ai-client.vercel.app)
- **Backend API**: [https://aether-ai-server.vercel.app](https://aether-ai-server.vercel.app)

## 📖 Overview

**AetherAI** is a comprehensive Software-as-a-Service (SaaS) platform that harnesses the power of multiple AI models and cloud services to provide users with cutting-edge artificial intelligence tools. Built with modern web technologies, AetherAI offers a seamless experience for content creation, image manipulation, and document analysis.

## ✨ Key Features

### 🤖 AI-Powered Content Creation
- **AI Article Writer**: Generate high-quality, engaging articles on any topic using Google's Gemini 2.0 Flash model
- **Blog Title Generator**: Create catchy, SEO-optimized blog titles with AI assistance
- **Resume Reviewer**: Get intelligent feedback and suggestions to improve your resume using PDF parsing and AI analysis

### 🎨 Advanced Image Processing
- **AI Image Generation**: Create stunning visuals from text prompts using ClipDrop API
- **Background Removal**: Effortlessly remove backgrounds from images with AI-driven precision
- **Object Removal**: Seamlessly remove unwanted objects from photos using Cloudinary's generative AI

### 👥 Community & Collaboration
- **Community Gallery**: Share and discover AI-generated content from other users
- **Creation Management**: Save, organize, and manage all your AI-generated content in one place

### 💎 Flexible Subscription System
- **Free Tier**: 10 free AI generations for new users
- **Premium Plans**: Unlimited access to all features with Clerk-powered subscription management

## 🛠️ Technology Stack

### Frontend
- **React 18** with Vite for lightning-fast development
- **Tailwind CSS v4** for modern, responsive styling
- **React Router** for seamless navigation
- **Clerk** for authentication and subscription management
- **Lucide React** for beautiful icons
- **React Hot Toast** for user notifications
- **React Markdown** for rendering markdown content

### Backend
- **Node.js** with Express.js framework
- **NeonDB** (PostgreSQL) for reliable data storage
- **Clerk Express** for server-side authentication
- **Cloudinary** for image storage and processing
- **Multer** for file upload handling

### AI & External APIs
- **Google Gemini 2.0 Flash** for text generation
- **ClipDrop API** for AI image generation
- **Cloudinary AI** for image background/object removal
- **PDF-Parse** for resume document analysis

## 🏗️ Architecture

```
AetherAI/
├── client/                    # React frontend
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/           # Application pages
│   │   ├── assets/          # Static assets and data
│   │   └── main.jsx         # Application entry point
│   └── public/              # Public assets
├── server/                   # Express.js backend
│   ├── controllers/         # Business logic
│   ├── routes/              # API endpoints
│   ├── configs/             # Configuration files
│   ├── middlewares/         # Custom middleware
│   └── server.js            # Server entry point
└── README.md
```

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

### 🎯 Frontend Setup

1. **Create the React application**
   ```powershell
   npm create vite@latest client
   cd client
   ```

2. **Install core dependencies**
   ```powershell
   npm install
   npm install react-router-dom
   npm install lucide-react
   ```

3. **Setup Tailwind CSS v4**
   ```powershell
   npm install tailwindcss @tailwindcss/vite
   ```

4. **Install authentication and UI libraries**
   ```powershell
   npm install @clerk/clerk-react
   npm install react-markdown
   npm install axios
   npm install react-hot-toast
   ```

### ⚙️ Backend Setup

1. **Initialize the Node.js project**
   ```powershell
   mkdir server
   cd server
   npm init -y
   ```

2. **Install core server dependencies**
   ```powershell
   npm install express dotenv cors axios
   npm install cloudinary multer
   npm install --save-dev nodemon
   ```

3. **Install database and authentication**
   ```powershell
   npm install @neondatabase/serverless
   npm install @clerk/express
   ```

4. **Install AI and document processing**
   ```powershell
   npm install openai
   npm install pdf-parse
   ```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in both `client` and `server` directories:

#### Client (.env)
```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_BASE_URL=your_backend_url
```

#### Server (.env)
```env
# Database
DATABASE_URL=your_neon_database_url

# Authentication
CLERK_SECRET_KEY=your_clerk_secret_key

# AI APIs
GEMINI_API_KEY=your_gemini_api_key
CLIPDROP_API_KEY=your_clipdrop_api_key

# Cloud Storage
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Server
PORT=3000
```

### Database Schema

The application uses PostgreSQL with the following main tables:

```sql
-- Users table (managed by Clerk)
-- creations table for storing AI-generated content
CREATE TABLE creations (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  prompt TEXT NOT NULL,
  content TEXT NOT NULL,
  type VARCHAR(50) NOT NULL,
  publish BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 📋 Features Deep Dive

### 🎯 AI Content Generation
- Utilizes **Google Gemini 2.0 Flash** for natural language processing
- Supports variable-length content generation (articles, titles, reviews)
- Implements usage tracking and rate limiting for different subscription tiers

### 🖼️ Image Processing Pipeline
1. **Generation**: Text-to-image using ClipDrop's advanced AI models
2. **Storage**: Secure cloud storage via Cloudinary CDN
3. **Processing**: Real-time background removal and object elimination
4. **Optimization**: Automatic image compression and format optimization

### 👤 User Management & Subscriptions
- **Clerk Integration**: Seamless authentication with social login options
- **Subscription Tiers**: 
  - **Free**: 10 AI generations, basic features
  - **Premium**: Unlimited generations, advanced image processing
- **Usage Tracking**: Real-time monitoring of API usage per user

### 🔒 Security Features
- JWT-based authentication via Clerk
- Input validation and sanitization
- Rate limiting to prevent API abuse
- Secure file upload handling with type validation

## 🚀 Deployment

### Frontend (Vercel)
- **Live URL**: [https://aether-ai-client.vercel.app](https://aether-ai-client.vercel.app)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard:
   - `VITE_CLERK_PUBLISHABLE_KEY`
   - `VITE_BASE_URL=https://aether-ai-server.vercel.app`
3. Deploy with automatic CI/CD

### Backend (Vercel)
- **API URL**: [https://aether-ai-server.vercel.app](https://aether-ai-server.vercel.app)
1. Configure environment variables in Vercel dashboard
2. Set up database connection (NeonDB)
3. Configure all required API keys (Gemini, ClipDrop, Cloudinary, Clerk)
4. Deploy with automatic CI/CD from GitHub

## 🔮 Future Enhancements

- [ ] **Video Generation**: AI-powered video creation
- [ ] **Voice Synthesis**: Text-to-speech functionality
- [ ] **Advanced Analytics**: Usage analytics dashboard
- [ ] **Team Collaboration**: Multi-user workspaces
- [ ] **API Access**: RESTful API for third-party integrations
- [ ] **Mobile App**: React Native mobile application

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google Gemini** for advanced language processing
- **ClipDrop** for AI image generation capabilities
- **Cloudinary** for image processing and storage
- **Clerk** for authentication and user management
- **Vercel** for seamless deployment and hosting
---

*Empowering creativity through artificial intelligence*
