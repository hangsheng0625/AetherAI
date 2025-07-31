import { v2 as cloudinary } from 'cloudinary';

const connectCloudinary = () => {
    try {
        // Validate environment variables
        if (!process.env.CLOUDINARY_CLOUD_NAME || 
            !process.env.CLOUDINARY_API_KEY || 
            !process.env.CLOUDINARY_API_SECRET_KEY) {
            throw new Error('Missing Cloudinary environment variables');
        }

        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET_KEY
        });

        console.log('Cloudinary configured successfully');
        return true;
    } catch (error) {
        console.error('Cloudinary configuration failed:', error);
        throw error;
    }
};

export default connectCloudinary;