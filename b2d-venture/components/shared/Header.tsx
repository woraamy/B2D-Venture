import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import NavItems from "./NavItems"
import MoblieNav from "./MoblieNav"

const Header = () => {
  return (
    <header className="w-full border-b bg-[#FFF8F2]">
      <div className="wrapper flex items-center justify-between">
        <Link href="/" >
          <h1 className="text-3xl text-[#FF553E] font-bold">B2D Venture</h1>
        </Link>
        <Link href={"/business"} className="ml-[50%]">
          <h3 className="p-regular-18"> Business </h3>
        </Link>

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
