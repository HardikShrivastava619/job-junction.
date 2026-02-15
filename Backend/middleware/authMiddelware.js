import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

// Protected routes
export const requireSignIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]
    
        if (!token) {
        return res.status(401).send({
        success: false,
        message: "Authorization token is required",
        })}
    const decode = JWT.verify(token, process.env.JWT_SECRET)
    req.user = decode
    next();
  } catch (error) {
    console.error("JWT verification error:", error);
    return res.status(500).send({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

// Admin access

export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (!user){
      return res.status(404).send({
        success: false,
        message: "User not found",
      })
    }
    if (user.role !== 1){
      return res.status(401).send({
        success: false,
        message: "Unauthorized access",
      });
    }
    next();
  } catch (error) {
    console.error("Admin middleware error:", error)
    return res.status(500).send({
      success: false,
      message: "Error in admin middleware",
      error: error.message,
    });
  }
};


