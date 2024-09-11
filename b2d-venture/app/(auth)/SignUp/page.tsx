import { ChevronsLeft } from 'lucide-react';

const SignUp = () => {
    return (
      <div className="signUp-bg relative">
        <a href="/" className="absolute top-10 left-20 text-2xl font-bold text-[#FF6347] hidden md:block">
          B2D Venture
        </a>
        <a href="/" className="absolute top-10 left-4 md:hidden flex items-center">
          <ChevronsLeft className="text-[#FF6347] text-2xl cursor-pointer" />
          <p className="text-[#FF6347] p-medium-16 ml-2">
            Back to home
          </p>
        </a>
        <p className="flex-center text-3xl font-bold text-[#FF6347] mt-32">Join the Community</p>
      </div>
    )
}

export default SignUp;
