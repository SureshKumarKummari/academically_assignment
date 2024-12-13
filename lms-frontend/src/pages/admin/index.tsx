import { GetServerSideProps } from 'next';
import Layout from '../components/Layout';
import CourseCard from '../components/CourseCard';
import Link from 'next/link'; 

interface Course {
  _id: string;
  title: string;
  description: string;
  duration: string;
  instructor: string;
}

const AdminDashboard = ({ courses }: { courses: Course[] }) => {
  return (
    <Layout>
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <Link href="/admin/add-course" className="bg-blue-600 text-white p-2 rounded mt-4 inline-block">Add New Course</Link>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch('https://supreme-zebra-7q6x9ppx4v2w6j6-5000.app.github.dev/courses');
  const courses = await res.json();

  return {
    props: {
      courses,
    },
  };
};

export default AdminDashboard;
