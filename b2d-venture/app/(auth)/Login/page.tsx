import { Button } from "@/components/ui/button";
import Link from "next/link";

const Login = () => {
  return (
    <div className="flex h-screen bg-[#FFF5EE]">
      {/* Left side */}
      <div className="w-1/2 flex flex-col justify-center items-center p-8">
        {/* <h2 className="text-2xl font-bold text-[#FF6347] mb-4">B2D Venture</h2>
        <div className="relative w-64 h-64">
          <img src="/api/placeholder/256/256" alt="Laptop" className="w-full h-full object-contain" />
          <Rocket className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-[#FF69B4] w-24 h-24" />
        </div> */}
      </div>

      {/* Right side (with White background) */}
      <div className="w-1/2 flex flex-col justify-center p-8 bg-white">
        <h1 className="h1-welcome-back">Welcome back</h1>
        <p className="p-regular-18 text-center mt-5">Welcome back! Please enter your details to get login to your account</p>

        <form className="space-y-5">
          <div className="flex-center">
            <input 
              type="text" 
              placeholder="Your username or email"
              className="mt-20 w-[550px] h-[50px] p-4 border-2 border-[#D9D9D9] rounded-full focus:outline-none focus:border-[#D9D9D9]" />
          </div>
          <div className="flex-center">
            <input 
              type="password" 
              placeholder="Your Password" 
              className="w-[550px] h-[50px] p-4 border-2 border-[#D9D9D9] rounded-full focus:outline-none focus:border-[#D9D9D9]" />
          </div>
          
          <div className="flex justify-between items-center mt-5 w-[550px] mx-auto">
            <label className="flex items-center text-lg">
              <input
                type="checkbox"
                className="mr-2 form-checkbox text-yellow-500 focus:ring-yellow-500 rounded-full"
              />
              Remember me
            </label>
            <a href="#" className="text-blue-500 text-lg">
              Forgot password?
            </a>
          </div>

          
          <div className="flex-center">
            <Button asChild className="w-[450px] h-[50px] rounded-full text-white p-regular-18 bg-[#FF993B] hover:bg-[#FF7A00] mt-16">
                <Link href="/">
                  Login
                </Link>
            </Button>
          </div>
          <div className="flex-center">
            <Button className="w-[450px] h-[50px] border-2 border-[#D9D9D9] rounded-full text-[#1C0E0D] p-regular-18 bg-white hover:bg-[#D9D9D9]">
              <img src="assets/icons/google-logo.png" alt="Google logo" height={23} width={23} className="mr-2" />
                <Link href="/">
                  Login with Google
                </Link>
            </Button>
          </div>
        </form>

        <p className="mt-10 flex-center space-x-2">
          <span>Don't have an account?</span>
          <a href="/SignUp" className="text-[#FF6347] p-medium-16">Sign up now</a>
        </p>
      </div>
    </div>
  );
};

export default Login;