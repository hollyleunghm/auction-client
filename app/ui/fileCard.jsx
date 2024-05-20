import Link from "next/link";
import Divider from "@/app/ui/divider";

const fileCard = () => {
    return (
        <div className="border border-[#253D59] p-3 mt-8 bg-[#f3f3f3]">
            <Divider className="mb-2">
                <span className="font-semibold text-lg text-[#253D59]">文件下載</span>
            </Divider>
            <div className="p-4 border bg-white mt-2">
                <Link href="/file.pdf" className="underline">地契.pdf</Link>
            </div>
        </div>
    )
}
export default fileCard;