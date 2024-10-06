import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import NavItems from "./NavItems";
import MobileNav from "./MoblieNav";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

// Authenticated Header
const AuthenticatedHeader = () => {
  return (
    <header className="w-full border-b bg-white">
      <div className="wrapper flex items-center justify-between">
        <Link href="/">
          <b className="text-[#FF543E] text-[40px]">B2D Venture</b>
        </Link>
        <Link href="/" className="hover:text-blue-500">
          Home
        </Link>
        <Link href="/business" className="mr-[40%] hover:text-blue-500">
          Business
        </Link>

        {/* Show after login - Authenticated Header */}
        <nav className="hidden md:flex flex-grow ml-6">
          <NavItems />
        </nav>

        {/* Mobile navigation and Profile (after login) */}
        <div className="flex items-center gap-5">
          {/* Profile button */}
          <div className="flex items-center gap-3">
            <Image
              src="/path/to/profile-image.jpg" // Update with the actual user profile image
              alt="User Profile"
              width={40}
              height={40}
              className="rounded-full"
            />
            <Link href="/profile" className="hover:text-blue-500">
              Profile
            </Link>
          </div>

          {/* Mobile nav (hamburger menu) */}
          <div className="md:hidden flex items-center">
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
};

// Unauthenticated Header
const UnauthenticatedHeader = () => {
  return (
    <header className="w-full border-b bg-white">
      <div className="wrapper flex items-center justify-between">
        <Link href="/">
          <b className="text-[#FF543E] text-[40px]">B2D Venture</b>
        </Link>
        <Link href="/" className="hover:text-blue-500">
          Home
        </Link>
        <Link href="/business" className="mr-[40%] hover:text-blue-500">
          Business
        </Link>

        {/* Show when not logged in - Unauthenticated Header */}
        <div className="flex items-center gap-5">
          <Link href="/login" className="flex-center p-regular-18 whitespace-nowrap mr-5">
            Login
          </Link>
          <Button asChild className="rounded-full text-white p-regular-16">
            <Link href="/signup">Sign up</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

// Main Header Component
const Header = async () => {
  const session = await getServerSession(authOptions)

  // If status is loading, you can show a loading indicator or nothing
  if (!session) {
    return null; // Optionally return a loading state
  }

  // Conditionally render header based on authentication status
  return session ? <AuthenticatedHeader /> : <UnauthenticatedHeader />;
};

export default Header;
