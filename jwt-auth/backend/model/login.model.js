import mongoose from "mongoose";

const loginSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  refreshTokens: [{ type: String, required: true }],
});

 const user = mongoose.model("Login", loginSchema);
 export default user