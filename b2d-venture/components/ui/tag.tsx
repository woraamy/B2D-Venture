import Link from "next/link"
const Tag = ({className, tagName}) => {
    return(
            <div className={className}>
                <p className="bg-[#A1A1B0] inline-block text-[14px] text-white px-2 py-1 rounded-md">{tagName}</p>
            </div>
    );
};
export default Tag;