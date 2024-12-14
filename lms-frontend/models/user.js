import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userId: String,
  enrolledCourses: [String],
});

//const User = mongoose.model("User", userSchema);

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
