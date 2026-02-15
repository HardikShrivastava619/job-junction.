import { db } from '../config/db.js';

export const saveSkillsQuery = async (skillText,ratings,user_id) => {
    try {
        
const [result] = await db.execute(
  'INSERT INTO skillsTable (skillText, ratings, user_id) VALUES (?, ?, ?)',
  [skillText, ratings, user_id]
);

return result;


    } catch (error) {
        console.log(error);
        
    }
}


export const findSkillByUserId = async (user_id) => {
    try {
        const [rows] =await db.execute('SELECT * FROM skillsTable WHERE user_id = ?', [user_id] )
   
   return rows;
    } catch (error) {
        console.log(error);
        
    }
}


export const deleteSkillByskillsId = async (skills_id) => {
    try {
        const [result] = await db.execute('DELETE FROM skillsTable WHERE skills_id =? ', [skills_id] )
return result;

    } catch (error) {
        console.log(error);
        
    }
}