import sql from "../configs/db.js";

export const getUserCreations = async (req, res) => {
  try {
    const { userId } = req.auth();
    const creations = await sql`
      SELECT * FROM creations WHERE user_id = ${userId} ORDER BY created_at DESC
    `;
    res.json({ success: true, creations });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}

export const deleteCreation = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { creationId } = req.params;

    // Check if the creation exists and belongs to the user
    const [creation] = await sql`
      SELECT * FROM creations WHERE id = ${creationId} AND user_id = ${userId}
    `;

    if (!creation) {
      return res.json({
        success: false,
        message: 'Creation not found or unauthorized'
      });
    }

    // Delete the creation
    await sql`
      DELETE FROM creations WHERE id = ${creationId} AND user_id = ${userId}
    `;

    res.json({ 
      success: true, 
      message: 'Creation deleted successfully' 
    });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}

export const getPublishCreations = async (req, res) => {
  try {
    const creations = await sql`
      SELECT * FROM creations WHERE publish = true ORDER BY created_at DESC
    `;
    res.json({ success: true, creations });
    
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}

export const toggleLikeCreations = async (req, res) => {
  try {
    const {userId} = req.auth();
    const {creationId} = req.body;

    const [creation] = await sql`
      SELECT * FROM creations WHERE id = ${creationId} `

    if (!creation) {
      return res.json({
        success: false,
        message: 'Creation not found'
      });
    }

    const currentLikes = creation.likes;
    const userIdStr = userId.toString();
    let updatedLikes;
    let message;

    if (currentLikes.includes(userIdStr)){
        updatedLikes = currentLikes.filter((user)=> user !== userIdStr);
        message = 'Creation Unliked'
    } else {
        updatedLikes = [...currentLikes, userIdStr]
        message = 'Creation Liked'
    }

    const formattedArray = `{${updatedLikes.join(',')}}`

    await sql`UPDATE creations SET likes = ${formattedArray}::text[] WHERE id = ${creationId}`
    res.json({ success: true, message });
    
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}