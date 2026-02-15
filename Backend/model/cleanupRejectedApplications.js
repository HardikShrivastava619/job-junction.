import cron from 'node-cron';
import { db } from '../config/db.js';
import { sendRejectionEmail } from '../middleware/sendRejectionEmail.js';
//'*/30 * * * * *',   INTERVAL 30 SECOND
cron.schedule('0 * * * *', async () => {
  try {
    const [rows] = await db.execute(`
      SELECT 
applications_table.appication_id AS appication_id,
        users.name AS user_name,
        users.email AS user_email,
        job_table.institute_Name AS company_name
      FROM applications_table
      JOIN users ON applications_table.applierID = users.id
      JOIN job_table ON applications_table.jobID = job_table.job_Id
      WHERE 
        applications_table.application_status = 'rejected'
        AND applications_table.status_updated_at < (NOW() - INTERVAL 24 HOUR)
    `);

    for (const row of rows) {
      await sendRejectionEmail({email:row.user_email ,  name: row.user_name,company: row.company_name  });
    }

    const [deleteResult] = await db.execute(`
      DELETE FROM applications_table 
      WHERE application_status = 'rejected' 
      AND status_updated_at < (NOW() - INTERVAL 24 HOUR)
    `);

    console.log(`✅ Deleted ${deleteResult.affectedRows} rejected applications and notified users.`);
  } catch (error) {
    console.error('❌ Cron job error:', error);
  }
});
