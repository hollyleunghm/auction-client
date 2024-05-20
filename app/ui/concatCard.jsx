import { Avatar } from 'rsuite';
import Divider from "@/app/ui/divider";
const concatCard = () => {
    return (
        <div className="border border-[#253D59] p-3 mt-4 bg-[#f3f3f3]">
            <Divider >
                <span className="font-semibold text-lg text-[#253D59]">聯絡方式</span>
            </Divider>
            <div className="flex gap-4 p-4 border bg-white mt-2">
                <div><Avatar circle className=" text-xl" /></div>
                <div>
                    <p className="font-semibold text-lg mb-1">葉比德（Ivy Yeh）</p>
                    <p className="mb-1">電話：+852 62015450</p>
                    <p className="mb-1">微信：ineedluck99</p>
                    <p className="mb-1">電郵：propbid.hk@gmail.com</p>
                </div>
            </div>
        </div>
    )
}
export default concatCard;