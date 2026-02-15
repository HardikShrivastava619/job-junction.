import { db } from "../config/db.js";

export const saveLangQuery = async (langText,ratings,user_id) => {
    try {
        const [result] =await db.execute('INSERT INTO languagetable (langText,ratings,user_id) VALUES (?, ?, ?)' , [langText,ratings,user_id] );


        return result;


    } catch (error) {
        console.log(error);
        
    }
} 


export const findLangByUserId = async (user_id) => {
    try {
        const [rows] = await db.execute('SELECT * FROM languagetable WHERE user_id =? '  , [user_id] );
        return rows;



    } catch (error) {
        console.log(error);
        
    }
}


export const deleteLangByLanguageId = async (language_id) => {
    try {
const [result] = await db.execute('DELETE FROM languagetable WHERE language_id=?', [language_id] );
return result;
    } catch (error) {
        console.log(error);
        
    }
}