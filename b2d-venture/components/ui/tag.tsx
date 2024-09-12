import Link from "next/link"
const Tag = ({className, tagName, tagLink}) => {
    return(
        <div className="w-[">
            <p>{tagName}</p>
        </div>
    );
};
export default Tag;