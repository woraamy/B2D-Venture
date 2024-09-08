import Image from "next/image"
import Link from "next/link"

const Footer = () => {
  return (
    <footer className="border-t bg-[#FFF8F2]">
      <div className="flex-center wrapper flex-between flex flex-col gap-4 p-5 text-center sm:flex-row">
        <Link href='/'>
          <Image
            src="/assets/images/logo.svg"
            alt="logo"
            width={128}
            height={38}
          />
        </Link>

        <p className="p-regular-18">2024 B2D Venture. All Rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
