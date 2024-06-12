
import Divider from "@/app/ui/divider";
const concatCard = ({ target, monthlyPayment, downPayment, mortgageAmount, interestRate, years }) => {
    return (
        <div className="border border-[#253D59] p-3 mt-4 bg-[#f3f3f3]">
            <Divider >
                <span className="font-semibold text-lg text-[#253D59]">價目表</span>
            </Divider>
            <div className="flex gap-4 p-4 border bg-white mt-2">
                <div>
                    {target.traditionalChinesePriceList.split("\n").map((item, index) => {
                        return <p className="mb-1" key={index}>{item}</p>
                    })}
                </div>
            </div>
        </div>
    )
}
export default concatCard;