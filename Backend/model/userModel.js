import {db} from '../config/db.js'

export const getUserByEmail = async (email) => {
  const [rows] = await db.execute(
    `SELECT * FROM users WHERE email = ?`,
    [email]
  );

  return rows[0];

};



export const getUserById = async (uid) => {
  
  const [rows] = await db.execute(
    `SELECT * FROM users WHERE id = ? `,[uid]
  )
  return rows[0];

};
 
export const addUserEmail = async (email) => {
try {
    const query = `INSERT INTO users (email) VALUES (?)`;
    const [result] = await db.execute(query, [email]);
    return  result;
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return { success: false, reason: 'Email already exists' };
    }
    console.log('Insert error:', error);
    return { success: false, reason: 'Unexpected error' };
  }} 


export const updateProfile = async (updatedValues, email) => {
  try {
    const {
      role,
      name,
      company,
      phone,
      password,
      pincode,
      post,
      city,
      landMark,
      state_or_UT,
      dob,
      gender,
      instagramURL,
      profile_photo,
      Title,
      license_doc_url,
      currentStatus,
      AboutMe,
      twitterURL,
      facebookURL,
      GitHubURL,
      ExpectedCtC,
      owned_by,
      type,
      chro,
      hq,
      total_branches,
      net_worth,
      total_employees,
      official_site_url,
      industry_type,
      license_verified,
      logo_url
    } = updatedValues;

    // ✅ Fix: safe() now handles "null" / "undefined" strings correctly
    const safe = (val) => {
      if (
        val === undefined ||
        val === null ||
        val === '' ||
        val === 'null' ||
        val === 'undefined'
      ) {
        return null;
      }
      return val;
    };

    // ✅ For numeric fields: ensure correct type or null
    const num = (val) => {
      if (
        val === undefined ||
        val === null ||
        val === '' ||
        val === 'null' ||
        val === 'undefined'
      ) {
        return null;
      }
      const n = Number(val);
      return isNaN(n) ? null : n;
    };

    // ✅ Now safely execute the update
    const query = `
      UPDATE users SET  
        name = ?, company = ?, phone = ?, password = ?, 
        pincode = ?, post = ?, city = ?, landMark = ?,  
        state_or_UT= ?, dob = ?, gender = ?, instagramURL = ?,
        GitHubURL = ?, facebookURL = ?, twitterURL = ?, Title=?,
        ExpectedCtC=?,
        AboutME = ?, currentStatus = ?, profile_photo = ?, 
        owned_by=?, type =? , chro =? , hq =?, 
        total_branches =?, net_worth =?, total_employees =?,
        official_site_url =?, industry_type =?, license_verified =?,
        license_doc_url=?, logo_url=?, role=?
      WHERE email = ?
    `;

    const [result] = await db.execute(query, [
      safe(name),
      safe(company),
      safe(phone),
      safe(password),
      safe(pincode),
      safe(post),
      safe(city),
      safe(landMark),
      safe(state_or_UT),
      safe(dob),
      safe(gender),
      safe(instagramURL),
      safe(GitHubURL),
      safe(facebookURL),
      safe(twitterURL),
      safe(Title),
      safe(ExpectedCtC),
      safe(AboutMe),
      safe(currentStatus),
      safe(profile_photo),
      safe(owned_by),
      safe(type),
      safe(chro),
      safe(hq),
      num(total_branches), 
      num(net_worth),            num(total_employees),
      safe(official_site_url),
      safe(industry_type),
      num(license_verified), 
      safe(license_doc_url),
      safe(logo_url), 
      safe(role),
      email
    ]);

    return result;
  } catch (error) {
    console.log('DB update error:', error);
    return { success: false, reason: error.message };
  }
};


export const getUserNameById = async (uid) => {
  try {
    const [result] = await db.execute('SELECT name FROM  users WHERE id =?' , [uid] )


return result[0]

  } catch (error) {
    console.log(error);
    
  }
}



export const getVierwers = async (uid) => {
  try {
    
const [rows] = await db.execute('SELECT viewers FROM users WHERE id =? ', [uid]);
const viewers = rows[0]?.viewers ? JSON.parse(rows[0].viewers) : [];
return viewers;




  } catch (error) {
    console.log(error);
    
  } 
}
 
export const updateViewers = async ({ newARR, uid }) => {
  try {

    const [res] = await db.execute(
      'UPDATE users SET viewers = ? WHERE id = ?',
      [newARR, uid]
    ); 



    return res || null;
  } catch (error) {
    console.log(error);
  }
};





export const getViwersModel = async ( uid ) => {
  try {
    const [res] = await db.execute(
      'SELECT viewers FROM users  WHERE id = ?',
      [uid]
    );
    return res || null;
  } catch (error) {
    console.log(error);
  }
};
