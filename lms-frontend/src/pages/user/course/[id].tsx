import { GetServerSideProps } from 'next';
import Header from '../../components/Header';
//import { useRouter } from 'next/router';


interface Course {
  title: string;
  description: string;
  duration: string;
  instructor: string;
}

const CourseDetails = ({ course }: { course: Course }) => {
  return (
    <div>
      <Header />
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-2xl font-bold">{course.title}</h1>
        <p>{course.description}</p>
        <div className="mt-2">Duration: {course.duration}</div>
        <div className="mt-2">Instructor: {course.instructor}</div>
        <button className="bg-blue-600 text-white p-2 rounded mt-4">Enroll</button>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params!;
  const res = await fetch(`https://supreme-zebra-7q6x9ppx4v2w6j6-5000.app.github.dev/courses/${id}`);
  const course = await res.json();

  return {
    props: {
      course,
    },
  };
};

export default CourseDetails;
