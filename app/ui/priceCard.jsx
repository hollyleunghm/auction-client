
import Divider from "@/app/ui/divider";
const concatCard = ({ property }) => {
    return (
        <div className="border border-[#253D59] p-3 mt-4 bg-[#f3f3f3]">
            <Divider >
                <span className="font-semibold text-lg text-[#253D59]">價目表</span>
            </Divider>
            <div className="flex gap-4 p-4 border bg-white mt-2">
                <div>
                    <p className="mb-1">起標價：{property.startingPrice.toLocaleString()}</p>
                    <p className="mb-1">每月按揭供款：31,867 元</p>
                    <p className="mb-1">首期 $288 萬元, 抵押數 70%</p>
                    <p className="mb-1">按揭利率 3%, 供款年資 25年</p>
                    <p className="mb-1">*以上價錢只供參考</p>
                </div>
            </div>
        </div>
    )
}
export default concatCard;