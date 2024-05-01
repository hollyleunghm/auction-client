import { model, models, Schema } from 'mongoose';
// 註冊-1
// ．輸入資訊：*信箱（ >檢查電郵電話是否重複，電話郵箱驗證碼）、*英文名、中文名、*密碼、*確認密碼、地址，*電話
// - 選項：同意條款及細則和私隱政策（點擊轉至隱私權條款頁）
// - 選項：不同意接收推廣資訊

// > 檢查密碼與確認密碼是否一致
const BidSchema = new Schema(
    {
        UserId: String,// 出價人
        TargetId:String,// 競價目標
        BidPrice:Number,// 出價
        createdAt: {
            type: Date,
            default: Date.now,
        },
    }
);
const Bid = models.Bid || model('Bid', BidSchema, 'bids');
export default Bid;