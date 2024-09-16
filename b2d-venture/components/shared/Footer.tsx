import { FOOTER_CONTACT_INFO, FOOTER_LINKS, SOCIALS } from '@/constants'
import Image from "next/image"
import Link from "next/link"

const Footer = () => {
  return (
    <footer className="bg-[#FF543E] border-t">
      <div className="flex-center wrapper flex-between flex-col gap-4 p-5 text-center sm:flex-row">
        <Link href="/">
          <Image
            src="/assets/images/logo.svg"
            alt="logo"
            width={128}
            height={38}
          />
        </Link>
        
        <p className="text-white">2024 B2D Venture. All Rights reserved.</p>
        </div>
    </footer>
  )
}


type FooterColumnProps = {
  title: string;
  children: React.ReactNode;
};

const FooterColumn = ({ title, children }: FooterColumnProps) => {
  return (
    <div className="flex flex-col gap-5">
      <h4 className="font-bold text-lg whitespace-nowrap">{title}</h4>
      {children}
    </div>
  );
};

export default Footer
