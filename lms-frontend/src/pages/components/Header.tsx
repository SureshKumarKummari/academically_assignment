import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between">
        <Link href="/">Home</Link>
        <div className="space-x-4">
          <Link href="/user">User Dashboard</Link>
          <Link href="/admin">Admin Dashboard</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
