import Link from 'next/link';

export default function Custom403() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-red-600">403</h1>
      <h2 className="text-3xl mt-4">Access Forbidden</h2>
      <p className="mt-2 text-gray-600">You do not have permission to access this page.</p>
      <Link href="/" className="mt-5 text-blue-500 hover:underline">
        Go back to Home
      </Link>
    </div>
  );
}
