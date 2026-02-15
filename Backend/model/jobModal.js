import { db } from "../config/db.js";

export const createJobModal = async ({
  title, jobtype, annual_Salary, remote, reqDegree,
  location, description, reqskills, institute_Logo,
  institute_Name, cid
}) => {
  try {
    const [res] = await db.execute(
      'INSERT INTO job_table (title, jobtype, annual_Salary, remote, reqDegree, location, description, reqskills, institute_Logo, institute_Name, company_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [title, jobtype, annual_Salary, remote, reqDegree, location, description, reqskills, institute_Logo, institute_Name, cid]
    );

    return res || null;
  } catch (error) {
    console.log(error);
  }
};



export const getSelfPostedJobModel = async (cid) => {
  try {
    const [rows] = await db.execute('SELECT * FROM job_table WHERE company_id=? ', [cid] )
  return rows || [];


  } catch (error) {
    console.log(error);
    
  }
}


export const getJobModel = async (jid) => {
  try {

    const [rows] = await db.execute('SELECT * FROM job_table WHERE job_Id = ? ' , [jid] )

return rows || []




  } catch (error) {
    console.log(error);
    
  }
}



export const getAllJobModel = async () => {
  try {

    const [rows] = await db.execute('SELECT * FROM job_table')

return rows || []




  } catch (error) {
    console.log(error);
    
  }
}


export const setTempStopJobModel = async (jid) => {
  try {
    const row = await getJobModel(jid);
    const newStatus = row[0]?.is_hiring ? false : true;

    const [rows] = await db.execute(
      'UPDATE job_table SET is_hiring = ? WHERE job_Id = ?', [newStatus, jid]
    );


    return rows || [];
  } catch (error) {
    console.log(error);
    return [];
  }
};




export const deleteJobModel = async (jid) => {
  try {
    const [rows] = await db.execute(
      'Delete from job_table  WHERE job_Id = ?', [jid]
    );


    return rows || [];
  } catch (error) {
    console.log(error);
    return [];
  }
};





export const applyJobModel = async ({uid,jid}) => {
  try {
    const [rows] = await db.execute(
      'INSERT INTO  applications_table (applierID,JobID) VALUES (?,?) ', [uid,jid]
    );

 
 return rows || [];


  } catch (error) {
    console.log(error);
    return [];
  }
};







export const getMyApplication = async (uid) => {
  try {
    const [rows] = await db.execute(
      'SELECT * FROM  applications_table WHERE applierID = ? ', [uid]
    );

 
 return rows || [];


  } catch (error) {
    console.log(error);
    return [];
  }
};







export const getApplicationDetailsModal = async ({uid,jid}) => {
  try {
    const [rows] = await db.execute(
      'SELECT * FROM  applications_table WHERE applierID=? AND  JobID   = ?   ', [uid,jid]
    );

 
 return rows || [];


  } catch (error) {
    console.log(error);
    return [];
  }
};





export const deleteMyApplicationModel = async ({uid,jid}) => {
  try {
    const [rows] = await db.execute(
      'Delete from applications_table WHERE  applierID=? AND  JobID   = ?   ', [uid,jid]
    );

    


    return rows || [];
  } catch (error) {
    console.log(error);
    return [];
  }
};








export const getAllApplicantsModel = async (jid) => {
  try {
    const [rows] = await db.execute(
      `SELECT applications_table.*, users.name,  users.profile_photo , users.Title ,users.post
       from applications_table JOIN users
       ON  applications_table.applierID = users.id WHERE JobID   = ? ORDER BY applications_table.created_at DESC    `, [jid]
    );

    


    return rows || [];
  } catch (error) {
    console.log(error);
    return [];
  }
};



export const getMyApplicationModel = async (uid) => {
 
  try {
    const [rows] = await db.execute(
      `SELECT applications_table.*, job_table.title, job_table.annual_Salary 
      ,job_table.institute_Name,job_table.institute_Logo  FROM  applications_table 
       JOIN job_table ON  applications_table.jobID = job_table.job_Id   WHERE applierID = ?  ORDER BY created_at DESC    `, [uid]
    );


    
    


    return rows || [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

 


export const updateApplicationStatusModel = async ({ status, aid }) => {
  try {
    const res = await db.execute(
      `UPDATE applications_table 
       SET application_status = ?, status_updated_at = NOW() 
       WHERE appication_id = ?`,
      [status, aid]
    );

    return res[0] || null;
  } catch (error) {
    console.log(error);
  }
};


export const cancelApplicModel = async (aid) => {
  try {const [res] =  await db.execute('DELETE from applications_table WHERE appication_id = ?', [aid] );

console.log('fsf',res);


    return res 
    
  } catch (error) {
    console.log(error);
    
  }
}