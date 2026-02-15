import bcrypt from 'bcrypt';
import fs from 'fs';


export const hashPassword = async (password)=>{
    try {
        const saltRound = 10
        const hashedPassword = await bcrypt.hash(password , saltRound) 
        return hashedPassword
    } catch (error) {
        console.log(error);
        
    }
}


export const comparePassword = async (password , hashedPassword)=>{
return  bcrypt.compare(password,hashedPassword)
}


 
export const ensureDirExists = (dirPath)=>{
    if (!fs.existsSync(dirPath)) { 
        fs.mkdirSync(dirPath,{ recursive: true } );
    }
}
;