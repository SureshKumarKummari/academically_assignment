import Link from 'next/link';

interface Course {
  _id: string;
  title: string;
  description: string;
  duration: string;
  instructor: string;
}

const CourseCard = ({ course }: { course: Course }) => {
  return (
    <div className="border p-4 rounded-md shadow-lg">
      <h2 className="text-xl font-semibold">{course.title}</h2>
      <p>{course.description}</p>
      <div className="mt-2 text-gray-600">Instructor: {course.instructor}</div>
      <div className="mt-2 text-gray-600">Duration: {course.duration}</div>
      <Link href={`/user/course/${course._id}`} className="text-blue-500">View Details</Link>
    </div>
  );
};

export default CourseCard;
