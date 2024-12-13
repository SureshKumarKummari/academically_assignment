// import Header from '../components/Header';//'../../src/app/components/Header';
// import CourseForm from '../components/CourseCard';//'../../src/app/components/CourseForm';
// import { useRouter } from 'next/router';

// const AddCourse = () => {
//   const router = useRouter();

//   const handleAddCourse = async (course: { title: string; description: string; duration: string; instructor: string }) => {
//     const res = await fetch('https://supreme-zebra-7q6x9ppx4v2w6j6-5000.app.github.dev/admin/courses', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(course),
//     });

//     if (res.ok) {
//       router.push('/admin');
//     }
//   };

//   return (
//     <div>
//       <Header />
//       <div className="max-w-7xl mx-auto p-6">
//         <h1 className="text-2xl font-bold">Add New Course</h1>
//         <CourseForm onSubmit={handleAddCourse} />
//       </div>
//     </div>
//   );
// };

// export default AddCourse;



import Header from '../components/Header';
import CourseForm from '../components/CourseForm'; // Make sure the import is correct
import { useRouter } from 'next/router';

const AddCourse = () => {
  const router = useRouter();

  const handleAddCourse = async (course: { title: string; description: string; duration: string; instructor: string }) => {
    const res = await fetch('https://supreme-zebra-7q6x9ppx4v2w6j6-5000.app.github.dev/admin/courses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(course),
    });

    if (res.ok) {
      router.push('/admin');
    }
  };

  return (
    <div>
      <Header />
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-2xl font-bold">Add New Course</h1>
        <CourseForm onSubmit={handleAddCourse} />
      </div>
    </div>
  );
};

export default AddCourse;
