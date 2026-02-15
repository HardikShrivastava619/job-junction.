import { db } from "../config/db.js";

export const addFollower = async (followers_id,followed_id) => {
    try {
        
const [result] = await db.execute('INSERT INTO   followers   ( followers_id, followed_id) VALUES (?, ?) ' ,[followers_id,followed_id] )

return result;

    } catch (error) {
        console.log(error);
        
    }
}


export const findFillowInTable= async (followers_id, followed_id) => {
  try {
    const [result] = await db.execute(
      'SELECT * FROM followers WHERE followers_id = ? AND followed_id = ?',
      [followers_id, followed_id]
    );

    return result[0] ;
  } catch (error) {
    console.log('Error fetching follower:', error);
    return []; 
  }
};


export const deleteFollower = async (id) => {
    try {
        const [result] = await db.execute('DELETE FROM followers WHERE id=?' , [id] )

return result
        
    } catch (error) {
        console.log(error);
        
    }
}

export const findAllFollowersByFollowedId = async (followed_id) => {
  try {
    const [result] = await db.execute(`

      SELECT followers.*,
        users.name,
        users.profile_photo
       FROM followers
      JOIN users ON followers.followers_id = users.id
      WHERE followers.followed_id = ?
    `, [followed_id]);




    return result;
  } catch (error) {
    console.log("Error in findAllFollowersByFollowedId:", error);
    return []; 
  }
};




export const findAllFollowingsByFollowerId = async (followers_id) => {
  try {
    const [result] = await db.execute(`

      SELECT followers.*,
        users.name,
        users.profile_photo
       FROM followers
      JOIN users ON followers.followed_id = users.id
      WHERE followers.followers_id = ?
    `, [followers_id]);




    return result;
  } catch (error) {
    console.log("Error in server:", error);
    return []; 
  }
};

