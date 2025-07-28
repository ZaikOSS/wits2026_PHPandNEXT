import Link from "next/link";
import { Frown } from "lucide-react"; // You might need to install lucide-react if not already present

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center p-4">
      <Frown className="h-24 w-24 text-blue-600 mb-6 animate-bounce-slow" />{" "}
      {/* Added a subtle animation */}
      <h1 className="text-5xl font-extrabold text-gray-900 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Page Not Found
      </h2>
      <p className="text-lg text-gray-600 mb-8 max-w-md">
        Oops! The page you are looking for does not exist or has been moved.
      </p>
      <Link href="/" passHref>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105">
          Go back to Home
        </button>
      </Link>
    </div>
  );
}
