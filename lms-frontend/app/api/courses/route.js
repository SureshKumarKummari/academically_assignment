import connectDb from "@/lib/mongo";
import Course from "@/models/course";

export async function POST(req) {
  try {
    await connectDb();

    const { title, description, duration, instructor } = await req.json();

    const newCourse = new Course({
      title,
      description,
      duration,
      instructor,
    });

    await newCourse.save();

    return new Response(JSON.stringify(newCourse), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to create course" }), {
      status: 500,
    });
  }
}

export async function GET() {
  try {
    await connectDb();
    const courses = await Course.find();
    return new Response(JSON.stringify(courses), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to fetch courses" }), {
      status: 500,
    });
  }
}

export async function PUT(req) {
  try {
    console.log("in course put");
    await connectDb();
    const { id } = req.params;
    console.log(id);
    const updatedCourse = await Course.findByIdAndUpdate(id, req.body);

    if (!updatedCourse) {
      return new Response(JSON.stringify({ error: "Course not found" }), {
        status: 404,
      });
    }
    return new Response(JSON.stringify(updatedCourse), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to update course" }), {
      status: 500,
    });
  }
}


export async function DELETE(req) {
  try {
    await connectDb();

    const { id } = req.params;
    const deletedCourse = await Course.findByIdAndDelete(id);

    if (!deletedCourse) {
      return new Response(JSON.stringify({ error: "Course not found" }), {
        status: 404,
      });
    }

    return new Response(
      JSON.stringify({ message: "Course deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to delete course" }), {
      status: 500,
    });
  }
}
