import { sendVerificationCode } from "../middleware/Email.js";
import {
  getUserByEmail,
  addUserEmail,
  updateProfile,
  getUserById,
  getUserNameById,
  updateViewers,
  getVierwers,
  getViwersModel,
} from "../model/userModel.js";
import { db } from "../config/db.js";
import formidable from "formidable";
import fs from "fs";
import path from "path";
import { comparePassword, hashPassword } from "../helper/userhelper.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const ensureDirExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  } 
};

import cloudinary from "../cloudinary.js"; // adjust path

export const completeProfileController = async (req, res) => {
  try {
    const {
      role,
      name,
      dob,
      gender,
      state_or_UT,
      city,
      landMark,
      pincode,
      currentStatus,
      company,
      phone,
      password,
      post,
      AboutME,
      twitterURL,
      facebookURL,
      GitHubURL,
      instagramURL,
      Title,
      ExpectedCtC,
      owned_by,
      type,
      chro,
      hq,
      total_branches,
      official_site_url,
      net_worth,
      total_employees,
      industry_type,
      license_verified,
    } = req.fields;

    const { profile_photo, license_doc_url, logo_url } = req.files || {};
    const { email } = req.params;

    const existingUser = await getUserByEmail(email);
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "Email is not registered",
      });
    }

    // License document
    let licence_photoPath = existingUser.license_doc_url;
    if (license_doc_url) {
      const result = await cloudinary.uploader.upload(license_doc_url.path, {
        folder: "license_imgs",
      });
      licence_photoPath = result.secure_url;
    }

    // Logo
    let logoURL_photoPath = existingUser?.logo_url;
    if (logo_url) {
      const result = await cloudinary.uploader.upload(logo_url.path, {
        folder: "logo_imgs",
      });
      logoURL_photoPath = result.secure_url;
    }

    // Profile photo
    let profile_photoPath = existingUser.profile_photo;
    if (profile_photo) {
      const result = await cloudinary.uploader.upload(profile_photo.path, {
        folder: "profilePhotos",
      });
      profile_photoPath = result.secure_url;
    }

    const license_verifiedNum = license_verified ? 1 : 0;

    let hashedPassword = null;
    if (password) {
      hashedPassword = await hashPassword(password);
    }

    const updatedValues = {
      name: name || existingUser.name,
      dob: dob || existingUser.dob,
      role: role || existingUser.role,
      phone: phone || existingUser.phone,
      password: hashedPassword || existingUser.password,
      gender: gender || existingUser.gender,
      company: company || existingUser.company,
      post: post || existingUser.post,
      state_or_UT: state_or_UT || existingUser.state_or_UT,
      pincode: pincode || existingUser.pincode,
      landMark: landMark || existingUser.landMark,
      city: city || existingUser.city,
      currentStatus: currentStatus || existingUser.currentStatus,
      AboutMe: AboutME || existingUser.AboutME,
      twitterURL: twitterURL || existingUser.twitterURL,
      facebookURL: facebookURL || existingUser.facebookURL,
      GitHubURL: GitHubURL || existingUser.GitHubURL,
      instagramURL: instagramURL || existingUser.instagramURL,
      profile_photo: profile_photoPath || existingUser.profile_photo,
      Title: Title || existingUser.Title,
      ExpectedCtC: ExpectedCtC || existingUser?.ExpectedCtC,
      owned_by: owned_by || existingUser.owned_by,
      type: type || existingUser.type,
      chro: chro || existingUser.chro,
      hq: hq || existingUser.hq,
      total_branches: total_branches || existingUser?.total_branches,
      net_worth: net_worth || existingUser.net_worth,
      total_employees: total_employees || existingUser.total_employees,
      official_site_url: official_site_url || existingUser.official_site_url,
      industry_type: industry_type || existingUser.industry_type,
      license_doc_url: licence_photoPath || existingUser.license_doc_url,
      license_verified: license_verifiedNum || existingUser.license_verified,
      logo_url: logoURL_photoPath || existingUser.logo_url,
    };

    // … keep your validation and updateProfile logic as before …
    const result = await updateProfile(updatedValues, email);

    if (result?.affectedRows > 0 && result?.changedRows === 0) {
      return res.status(200).json({
        success: false,
        message: "No changes made — data is already up to date",
      });
    }




    const token = jwt.sign(
      { id: existingUser._id, email: existingUser.email },
      process.env.JWT_SECRET, 
      { expiresIn: "7d" }, 
    );


    if (result?.changedRows > 0) {
      const updatedUser = await getUserByEmail(email);
      return res.status(200).json({
        success: true,
        message: "Profile completed successfully",
        updatedUser,
        token
      });
    }
  } catch (error) {
    console.error("Profile update failed:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Error updating profile",
    }); 
  }
};


export const registerEmailController = async (req, res) => {
  try {
    const { email } = req.body;
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      if (existingUser?.isVerify === 1 && existingUser.password) {
        return res.status(404).send({
          code: "go for login",
          message: "Email is already verified pleas go for login",
          success: false,
        });
      } else if (existingUser?.isVerify === 1 && !existingUser.password) {
        return res.status(404).send({
          message:
            "email is verified but profile is not complete please complete it soon  ",
          code: "INCOMPLETE_PROFILE",
          existingUser,
        });
      } else if (existingUser?.isVerify === 0) {
        const verificationCode = Math.floor(
          100000 + Math.random() * 900000,
        ).toString();
        const now = new Date();

        await db.execute(
          `UPDATE users SET verificationCode = ?, otp_created_at = ? WHERE email = ?`,
          [verificationCode, now, email],
        );

        sendVerificationCode(email, verificationCode);
        return res
          .status(202)
          .send({
            message: "please verify email",
            success: true,
            code: "otp is sent",
          });
      }
    } else {
      const newUser = await addUserEmail(email);

      const verificationCode = Math.floor(
        100000 + Math.random() * 900000,
      ).toString();

      const now = new Date();
      await db.execute(
        `UPDATE users SET verificationCode = ?, otp_created_at = ? WHERE email = ?`,
        [verificationCode, now, email],
      );

      sendVerificationCode(email, verificationCode);

      res
        .status(202)
        .json({
          message:
            "email is registered succefully  please verify it by otp sent on it",
          code: "otp is sent",
          success: true,
          newUser,
        });
    }
  } catch (error) {
    console.log(error);
    res.status(202).json({ message: "server error", success: false });
  }
};

export const sendOtpaAgainController = async (req, res) => {
  try {
    const { email } = req.params;

    const verificationCode = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();
    const now = new Date();

    await db.execute(
      `UPDATE users SET verificationCode = ?, otp_created_at = ? WHERE email = ?`,
      [verificationCode, now, email],
    );

    sendVerificationCode(email, verificationCode);
    return res.status(202).send({ message: "New Otp is sent", success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(504)
      .send({ message: "can't send otp now ", success: false });
  }
};

export const verifyOTPController = async (req, res) => {
  try {
    const { email } = req.params;
    const { otp } = req.body;

    const [rows] = await db.execute(
      `SELECT verificationCode, otp_created_at FROM users WHERE email = ?`,
      [email],
    );
    const user = rows[0];

    if (!user || !user.verificationCode) {
      return res.status(400).send({
        message: "OTP not found. Please request a new one.",
        success: false,
      });
    }

    const createdAt = new Date(user.otp_created_at);
    const now = new Date();
    const diffMinutes = (now - createdAt) / (1000 * 60);

    if (diffMinutes > 10) {
      await db.execute(
        `UPDATE users SET verificationCode = NULL, otp_created_at = NULL WHERE email = ?`,
        [email],
      );
      return res.status(410).send({
        code: "OTP expired.",
        message: "OTP expired. Please request a new one.",
        success: false,
      });
    }

    if (user.verificationCode != otp) {
      return res.status(401).send({
        code: "Invalid OTP.",
        message: "Invalid OTP. please check again and fill correctly ",
        success: false,
      });
    }

    await db.execute(
      `UPDATE users SET isVerify = 1, verificationCode = NULL, otp_created_at = NULL WHERE email = ?`,
      [email],
    );

    return res.status(200).send({
      code: "verified",
      message: "OTP verified successfully.",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      message: "Server error during OTP verification.",
      success: false,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
      return res.status(404).send({
        message: "Email is not registered",
        success: false,
      });
    }

    const verifyPassword = await comparePassword(
      password,
      existingUser?.password,
    );

    if (!verifyPassword) {
      return res.status(401).send({
        message: "Incorrect Password",
        success: false,
      });
    }

    const token = jwt.sign(
      { id: existingUser._id, email: existingUser.email },
      process.env.JWT_SECRET, 
      { expiresIn: "7d" }, 
    );

    return res.status(200).send({
      message: "Login Successful",
      success: true,
      existingUser,
      token, 
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      message: "Server side error",
      success: false,
    });
  }
};

export const get_ourProfileController = async (req, res) => {
  try {
    const { uid } = req.params;
 
    console.log(uid); 

    const user = await getUserById(uid);

    if (!user) {
      return res
        .status(404)
        .send({ message: "user not found", success: false });
    }

    return res
      .status(200)
      .send({ message: "user fetched successfully", success: true, user });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Server error during OTP verification.",
      success: false,
    });
  }
};

export const getUserNameByUidController = async (req, res) => {
  try {
    const { uid } = req.params;

    const result = await getUserNameById(uid);

    if (result) {
      return res
        .status(202)
        .send({
          message: "name sent succesfully",
          success: true,
          name: result.name,
        });
    }
    return res
      .status(404)
      .send({ message: "name cant not be sent succesfully", success: false });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Server error during OTP verification.",
      success: false,
    });
  }
};

export const getSearchedUserController = async (req, res) => {
  try {
    const { key } = req.params;

    if (!key || key.trim() === "") {
      return res.status(400).send({ success: false, result: [] });
    }

    const query = `
      SELECT 
        u.*,  role, email,  name, phone, twitterURL, facebookURL, GitHubURL, instagramURL,  owned_by, type, chro, hq,  industry_type , title
      FROM users u
      WHERE LOWER(u.role) LIKE ? OR LOWER(u.email) LIKE  ? OR LOWER(u.name) LIKE ? OR LOWER(u.phone) LIKE ? 
      OR LOWER(u.owned_by) LIKE ? OR LOWER(u.type) LIKE ? OR LOWER(u.chro) LIKE ?
      OR LOWER(u.hq) LIKE ? OR LOWER(u.industry_type) LIKE ? OR LOWER(u.title) LIKE  ?
    `;
    const searchKey = `%${key.toLowerCase()}%`;
    const params = Array(10).fill(searchKey);
    const [rows] = await db.execute(query, params);

    res
      .status(200)
      .send({
        message: "result send successfully",
        success: true,
        result: rows,
      });
  } catch (error) {
    console.log(error);
    res.status(504).send({ message: "Server error", success: false });
  }
};

export const updateViewersController = async (req, res) => {
  try {
    const { uid, vid } = req.params;

    let currView = await getVierwers(uid);

    console.log("currView", currView);

    if (currView?.includes(vid)) {
      return res.status(202).send({ success: true });
    }

    const newViewArr = [...currView, vid];

    const result = await updateViewers({ newARR: newViewArr, uid });

    if (result?.affectedRows > 0) {
      return res
        .status(202)
        .send({ success: true, message: "Added in view List" });
    }

    res.status(400).send({ success: false });
  } catch (error) {
    console.log(error);
    res.status(504).send({ message: "Server error", success: false });
  }
};

export const getViewersController = async (req, res) => {
  try {
    const { uid } = req.params;

    const rows = await getViwersModel(uid);

    if (Array.isArray(rows)) {
      return res.status(202).send({ success: true, rows });
    }

    return res.status(402).send({ success: false });
  } catch (error) {
    console.log(error);
    res.status(504).send({ message: "Server error", success: false });
  }
};
