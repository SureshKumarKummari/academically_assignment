
import connectDb from "@/lib/mongo";
import User from "@/models/user"; // User model for enrollment
import Users from "@/models/users";


export async function POST(req) {
  try {
    await connectDb();

    const { email, password } = await req.json();
    if (!email || !password) {
      return new Response(
        JSON.stringify({ message: "Email and password are required" }),
        { status: 400 }
      );
    }

    const user = await Users.findOne({ email });
    if (!user) {
      return new Response(
        JSON.stringify({ message: "User not found" }),
        { status: 404 }
      );
    }

      if(password!==user.password){
      return new Response(
        JSON.stringify({ message: "Invalid credentials" }),
        { status: 401 }
      );
    }

    return new Response(
      JSON.stringify({ message: "Login successful",user }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: "Server error during login" }),
      { status: 500 }
    );
  }
}


export async function POST_enroll(req) {
  try {
    await connectDb();

    const { userId } = req.body;
    const { courseId } = req.params;

    const user = await User.findOne({ userId });
    if (!user) {
      return new Response(
        JSON.stringify({ message: "User not found" }),
        { status: 404 }
      );
    }

    user.enrolledCourses.push(courseId);
    await user.save();

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: "Failed to enroll in course" }),
      { status: 500 }
    );
  }
}
