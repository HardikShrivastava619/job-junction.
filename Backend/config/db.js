import mysql2 from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

let db;

const initDB = async () => {
  try {
    const connection = await mysql2.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
    });




    await connection.query(
      `CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`,
    );
    console.log(`✅ Database '${process.env.DB_NAME}' is ready.`);

    await connection.changeUser({ database: process.env.DB_NAME });

 



    await connection.query(`
    CREATE TABLE IF NOT EXISTS users(
       
id INT AUTO_INCREMENT PRIMARY KEY ,
role VARCHAR(50)  NULL,
email VARCHAR(100) NOT NULL UNIQUE,
verificationCode INT NULL,
otp_created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
password VARCHAR(100) NULL,  
name VARCHAR(100) NULL ,
dob DATE NULL,
gender ENUM('Male', 'Female','Prefer Not to Say' ) DEFAULT 'Prefer Not to Say',
Title VARCHAR(100) NULL,
state_or_UT VARCHAR(100) NULL,
city VARCHAR(100) NULL, 
landMark VARCHAR(100) NULL, 
pincode VARCHAR(10)NULL, 
phone VARCHAR(15) NULL,  
currentStatus ENUM('Fresher', 'Intern','Currently Working')  DEFAULT 'Fresher' ,
company VARCHAR(100) NULL DEFAULT 'Fresher',    
post VARCHAR(100) NULL DEFAULT 'Fresher' ,
AboutME VARCHAR(100) NULL,
twitterURL VARCHAR(200) NULL,
facebookURL VARCHAR(200) NULL,
GitHubURL VARCHAR(200) NULL,
instagramURL VARCHAR(200) NULL,
isVerify BOOLEAN DEFAULT FALSE , 
profile_photo VARCHAR(250) NULL,
ExpectedCtC VARCHAR(100) NULL,
  owned_by VARCHAR(100)  NULL,                  
  type ENUM('Pvt', 'Ltd', 'OPC', 'Govt')  NULL, 
  chro VARCHAR(100) NULL ,                               
  hq VARCHAR(100) NULL,                                 
  total_branches INT  NULL,                              
  net_worth DECIMAL(15, 2) NULL,                        
  total_employees INT NULL,    
  official_site_url VARCHAR(255) NULL,                  
  logo_url TEXT NULL,                                   
  industry_type VARCHAR(100) NULL,                      
  license_doc_url TEXT NULL,                            
  viewers TEXT NULL ,                         
  license_verified BOOLEAN DEFAULT FALSE NULL, 
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP        
        
        )`);

    console.log("✅ 'users'  table is ready.");

    await connection.query(
      `CREATE TABLE IF NOT EXISTS job_table( 
  
job_Id INT AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(30) NULL,
jobtype  VARCHAR(30) NULL,
annual_Salary VARCHAR(20) NULL,
remote VARCHAR(10) NULL,
reqDegree VARCHAR(400) NULL,
location VARCHAR(40) NOT NULL,
description VARCHAR(350)  NULL,
reqskills VARCHAR(400) NULL,
institute_Name VARCHAR(30) NOT NULL,
is_hiring  BOOLEAN DEFAULT true,
institute_Logo TEXT NULL,
company_id INT NOT NULL,
FOREIGN KEY (company_id) REFERENCES users(id) ON DELETE CASCADE,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
)`,
    );

    console.log("✅ 'job_table' table is ready.");

    await connection.query(`
  CREATE TABLE IF NOT EXISTS educationDetails(
user_id INT NOT NULL,
id INT AUTO_INCREMENT PRIMARY KEY,

  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
instituteName VARCHAR(200) NULL,
degree VARCHAR(200) NULL,
startDate Date Null,
endDate Date Null,
certificate  VARCHAR(500) NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

)`);

    console.log("education Table is ready");

    await connection.query(`
  CREATE TABLE IF NOT EXISTS skillsTable(
  skills_id INT AUTO_INCREMENT PRIMARY KEY,

  user_id INT NOT NULL,
  skillText VARCHAR(100) NOT NULL , 
  ratings INT NOT NULL ,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
  `);

    console.log("skills Table is ready");

    await connection.query(
      `CREATE TABLE IF NOT EXISTS languageTable(
  language_id INT AUTO_INCREMENT PRIMARY KEY,

  user_id INT NOT NULL,
  langText VARCHAR(100) NOT NULL , 
  ratings INT NOT NULL ,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  
  )

  `,
    );

    console.log("lang table is ready");

    await connection.query(`
  CREATE TABLE IF NOT EXISTS Posts(
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  description VARCHAR(100) NULL,
  likes TEXT NULL,
  disLikes TEXT NULL,
  comments TEXT NULL,
 commentsOn BOOLEAN DEFAULT '1',
  photo_uploads TEXT null,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
  `);

    console.log("Post table is ready");

    await connection.query(`
  CREATE TABLE IF NOT EXISTS projects(
  
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(100) NULL,
  description VARCHAR(100) NULL,
  likes TEXT NULL,
  disLikes TEXT NULL,
  comments TEXT NULL,
 commentsOn BOOLEAN DEFAULT '1',
projectUrl varchar(500) NULL,
tech_used TEXT NULL,
startDate Date Null,
endDate Date Null,
 photo_uploads TEXT null,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`);

    console.log("project table is ready");

    await connection.query(`
  CREATE TABLE IF NOT EXISTS followers(
  id INT AUTO_INCREMENT PRIMARY KEY,
  followers_id INT NOT NULL,
  followed_id INT NOT NULL,
  FOREIGN KEY (followers_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (followed_id) REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

  )`);

    console.log("followers table is ready");

    await connection.query(`
  CREATE TABLE IF NOT EXISTS chat(
  msg_id INT AUTO_INCREMENT PRIMARY KEY,
  sender_id INTEGER NOT NULL,
  reciever_id INTEGER NOT NULL,
text TEXT null,
imgURL TEXT null, 
 is_seen BOOLEAN DEFAULT FALSE,
FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
FOREIGN KEY (reciever_id) REFERENCES users(id) ON DELETE CASCADE,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`);

    console.log("chat table is ready");

    await connection?.query(`
CREATE TABLE IF NOT EXISTS applications_table(
appication_id INT PRIMARY KEY AUTO_INCREMENT,
applierID INT NOT NULL,
JobID INT NOT NULL,
application_status ENUM('applied', 'underConsideration', 'shortListed', 'rejected') DEFAULT 'applied',
status_updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
FOREIGN KEY (applierID) REFERENCES users(id) ON DELETE CASCADE,
FOREIGN KEY (JobID) REFERENCES job_table(job_id) ON DELETE CASCADE,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`);

    console.log("application table table is ready");

    await connection.query(`
CREATE TABLE IF NOT EXISTS notifications (
notf_id INT PRIMARY KEY AUTO_INCREMENT,
sender_id INT NOT NULL,
receiver_id INT NOT NULL,
type ENUM('like', 'comment', 'follow', 'views' ) NOT NULL,
text TEXT NULL, 
entity_id INT NULL , 
is_read BOOLEAN DEFAULT FALSE,
FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
FOREIGN KEY (receiver_id) REFERENCES users(id) ON DELETE CASCADE,
FOREIGN KEY (entity_id) REFERENCES Posts(id) ON DELETE CASCADE,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

  );
  `);

    console.log("notif table is ready");

    await connection.query(`
CREATE TABLE IF NOT EXISTS comments(
comment_id INT PRIMARY KEY AUTO_INCREMENT,
sender_id  INT NOT NULL,
post_id  INT NOT NULL,
text  TEXT NOT NULL,
FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
FOREIGN KEY (post_id) REFERENCES users(id) ON DELETE CASCADE, 
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

  )`);

    console.log("comment table is ready");

    await connection.end();

    db = mysql2.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
    });
    return db;
  } catch (error) {
    console.error("❌ DB initialization error:", error);
    throw error;
  }
};

export { initDB, db };
