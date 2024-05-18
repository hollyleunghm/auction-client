import Divider from "@/app/ui/divider";
const concatCard = ({ property }) => {
    return (
        <div className="border border-[#253D59] p-3 mt-4 bg-[#f3f3f3]">
            <Divider >
                <span className="font-semibold text-lg text-[#253D59]">面積</span>
            </Divider>
            <div className="flex gap-4 p-4 border bg-white mt-2">
                <div>
                    <p className="mb-1">建築面積：{property.constructionArea} 平方呎</p>
                    <p className="mb-1">呎價：@{property.pricePerFoot1.toLocaleString()} 元</p>
                    <p className="mb-1">實用面積：{property.practicalArea} 平方呎</p>
                    <p className="mb-1">呎價：@{property.pricePerFoot2.toLocaleString()} 元</p>
                </div>
            </div>
        </div>
    )
}
export default concatCard;