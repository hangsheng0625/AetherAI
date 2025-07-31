import OpenAI from "openai";
import sql from "../configs/db.js";
import { clerkClient } from "@clerk/express";
import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';
import axios from 'axios';
import pdf from 'pdf-parse/lib/pdf-parse.js';
import e from "express";

const AI = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

export const generateArticle = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt, length } = req.body;
    const plan = req.plan;
    const freeUsage = req.free_usage;

    // Free usage limit check
    if (plan === 'free' && freeUsage >= 10) {
      return res.status(403).json({
        success: false,
        message: 'Free usage limit exceeded. Upgrade to premium for more requests.'
      });
    }

    // Generate article using Gemini
    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: length,
    });

    const content = response.choices[0].message.content;

    // Save result to database
    await sql`
      INSERT INTO creations (user_id, prompt, content, type) 
      VALUES (${userId}, ${prompt}, ${content}, 'Article')
    `;

    // Update usage count for free plan users
    if (plan !== 'premium') {
      await clerkClient.users.updateUser(userId, {
        privateMetadata: { free_usage: freeUsage + 1 }
      });
    }

    res.json({
      success: true,
      content
    });

  } catch (error) {
    console.error('Error generating article:', error);
    res.status(500).json({
      success: false,
      message: 'Error generating article'
    });
  }
};

export const generateBlogTitle = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt } = req.body;
    const plan = req.plan;
    const freeUsage = req.free_usage;

    // Free usage limit check
    if (plan === 'free' && freeUsage >= 10) {
      return res.json({
        success: false,
        message: 'Free usage limit exceeded. Upgrade to premium for more requests.'
      });
    }

    // Generate blog title using Gemini
    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 100,
    });

    const content = response.choices[0].message.content;

    // Save result to database
    await sql`
      INSERT INTO creations (user_id, prompt, content, type) 
      VALUES (${userId}, ${prompt}, ${content}, 'Blog-Title')
    `;

    // Update usage count for free plan users
    if (plan !== 'premium') {
      await clerkClient.users.updateUser(userId, {
        privateMetadata: { free_usage: freeUsage + 1 }
      });
    }

    res.json({
      success: true,
      content
    });

  } catch (error) {
    console.error('Error generating blog title:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const generateImage = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt, publish } = req.body;
    const plan = req.plan;

    // Free usage limit check
    if (plan === 'free') {
      return res.json({
        success: false,
        message: 'This feature is only available for premium users.'
      });
    }

    const formData = new FormData()
    formData.append('prompt', prompt)

    const { data } = await axios.post('https://clipdrop-api.co/text-to-image/v1', formData, {
        headers: {'x-api-key': process.env.CLIPDROP_API_KEY,},
        responseType: 'arraybuffer'
    })

    const base64Image = `data:image/png;base64,${Buffer.from(data, 'binary').toString('base64')}`;

    const {secure_url} = await cloudinary.uploader.upload(base64Image)

      // Save result to database
      await sql`
        INSERT INTO creations (user_id, prompt, content, type, publish) 
        VALUES (${userId}, ${prompt}, ${secure_url}, 'image', ${publish ?? false})
      `;

      res.json({
        success: true,
        content: secure_url
      });


  } catch (error) {
    console.error('Error generating image:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const removeImageBackground = async (req, res) => {
  try {
    const { userId } = req.auth();
    const image = req.file;
    const plan = req.plan;

    // Free usage limit check
    if (plan === 'free') {
      return res.json({
        success: false,
        message: 'This feature is only available for premium users.'
      });
    }

    const {secure_url} = await cloudinary.uploader.upload(image.path, {
      transformation: [
        { effect: "background_removal" },
        { background_removal: "cloudinary_ai" }
      ]
    });

      // Save result to database
      await sql`
        INSERT INTO creations (user_id, prompt, content, type) 
        VALUES (${userId}, 'Remove background from image', ${secure_url}, 'image')
      `;

      res.json({
        success: true,
        content: secure_url
      });


  } catch (error) {
    console.error('Error removing image background:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const removeImageObject = async (req, res) => {
  try {
    const { userId } = req.auth();
    const image = req.file;
    const plan = req.plan;
    const { object } = req.body;


    // Free usage limit check
    if (plan === 'free') {
      return res.json({
        success: false,
        message: 'This feature is only available for premium users.'
      });
    }

    const {public_id} = await cloudinary.uploader.upload(image.path);

    const imageUrl = cloudinary.url(public_id, {
        transformation: [{ effect: `gen_remove:${object}` }],
        resource_type: "image"
    })

      // Save result to database
      await sql`
        INSERT INTO creations (user_id, prompt, content, type) 
        VALUES (${userId}, ${`Remove ${object} from image`}, ${imageUrl}, 'image')
      `;

      res.json({
        success: true,
        content: imageUrl
      });


  } catch (error) {
    console.error('Error removing object:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const resumeReview = async (req, res) => {
  try {
    const { userId } = req.auth();
    const resume = req.file;
    const plan = req.plan;


    // Free usage limit check
    if (plan === 'free') {
      return res.json({
        success: false,
        message: 'This feature is only available for premium users.'
      });
    }

    if(resume.size > 5 * 1024 * 1024) { // 5MB limit
      return res.json({
        success: false,
        message: 'Resume file size exceeds 5MB limit.'
      });
    }

    const dataBuffer = fs.readFileSync(resume.path);
    const pdfData = await pdf(dataBuffer);

    const prompt = `Review the following resume and provide constructive feedbacks based on its strengths, weakness and areas of improvent: Resume Content: \n\n${pdfData.text}`;

    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const content = response.choices[0].message.content;

    // Save result to database
    await sql`
    INSERT INTO creations (user_id, prompt, content, type) 
    VALUES (${userId}, 'Review the uploaded resume', ${content}, 'Resume-review')
    `;

    res.json({
    success: true,
    content
    });


  } catch (error) {
    console.error('Error generating feedbacks:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};