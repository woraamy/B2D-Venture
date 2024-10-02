import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import NavItems from "./NavItems"
import MoblieNav from "./MoblieNav"

const Header = () => {
  return (
    <header className="w-full border-b bg-white">
      <div className="wrapper flex items-center justify-between">
        <Link href="/">
          <b className='text-[#FF543E] text-[40px]'>B2D Venture</b>
        </Link>
        <Link href="/" className='hover:text-blue-500'>Home</Link>
        <Link href="/business" className="mr-[40%] hover:text-blue-500">Business</Link>
     
        {/* Show after login */}
          {/* Navigation items */}
          {/* <nav className="hidden md:flex flex-grow ml-6">
            <NavItems />
          </nav> */}
        {/* </SignedIn> */}

        {/* Mobile navigation and Login/Sign up */}
        <div className="flex items-center gap-5">
            <Link href="/Login" className="flex-center p-regular-18 whitespace-nowrap mr-5">
              Login
            </Link>
            <Button asChild className="rounded-full text-white p-regular-16">
              <Link href="/SignUp">
                Sign up
              </Link>
            </Button>
          {/* <div className="hidden md:flex gap-5">
            <Link href="/Login" className="flex-center p-regular-18 whitespace-nowrap mr-5">
              Login
            </Link>
            <Button asChild className="rounded-full text-white p-regular-16">
              <Link href="/SignUp">
                Sign up
              </Link>
            </Button>
          </div> */}

          {/* Show after login */}
          {/* <div className="md:hidden flex items-center">
            <MoblieNav />
          </div> */}
        </div>
      </div>
    </header>
  )
}

export default Header
