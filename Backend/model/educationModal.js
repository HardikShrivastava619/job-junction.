import { db } from "../config/db.js";

const ensureDirExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};


export const addEducDet = async (data) => {
    try {
        
const {user_id,instituteName,degree,startDate,endDate,certificate} = data


        const query = `INSERT INTO educationDetails (
        instituteName,degree,startDate,user_id,endDate,certificate
          
        ) VALUES (?, ?, ?, ?, ?,?)`

const [result] = await db.execute(query ,[instituteName,degree,startDate,user_id,endDate,certificate])


  return result;


    } catch (error) {
        console.log(error);
        
    }
}





export const findEducDetbyEducDetID = async (id) => {
  try {
    const  [rows] = await db.execute('SELECT * FROM educationDetails WHERE id = ?' ,  [id]  )

    return rows[0];



  } catch (error) {
    console.log(error);    
    
  }
}



export const findEducDetbyID = async (user_id) => {
  try {
    const  [rows] = await db.execute('SELECT * FROM educationDetails WHERE user_id = ?' ,  [user_id]  )

    return rows;



  } catch (error) {
    console.log(error);
    
  }
}


export const deleteEducDet = async (id) => {
  try {
    const [result] =  await db.execute('DELETE FROM educationdetails WHERE id =?' , [id] )


return result;

  } catch (error) {
    console.log(error);
    
  }
}