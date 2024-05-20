
import Divider from "@/app/ui/divider";
const concatCard = ({ target, monthlyPayment, downPayment, mortgageAmount, interestRate, years }) => {
    return (
        <div className="border border-[#253D59] p-3 mt-4 bg-[#f3f3f3]">
            <Divider >
                <span className="font-semibold text-lg text-[#253D59]">價目表</span>
            </Divider>
            <div className="flex gap-4 p-4 border bg-white mt-2">
                <div>
                    <p className="mb-1">起標價：{target.startingPrice.toLocaleString()}</p>
                    <p className="mb-1">每月按揭供款：{monthlyPayment || "31,867"} 元</p>
                    <p className="mb-1">首期 ${downPayment || "288"} 萬元, 抵押數 {mortgageAmount || 70}%</p>
                    <p className="mb-1">按揭利率 {interestRate || 3}%, 供款年資 {years || 25}</p>
                    <p className="mb-1">*以上價錢只供參考</p>
                </div>
            </div>
        </div>
    )
}
export default concatCard;