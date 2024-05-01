import { model, models, Schema } from 'mongoose';
// 註冊-1
// ．輸入資訊：*信箱（ >檢查電郵電話是否重複，電話郵箱驗證碼）、*英文名、中文名、*密碼、*確認密碼、地址，*電話
// - 選項：同意條款及細則和私隱政策（點擊轉至隱私權條款頁）
// - 選項：不同意接收推廣資訊

// > 檢查密碼與確認密碼是否一致
const PropertySchema = new Schema(
    {
        LandUse: String,
        OwnershipStatus:String,
        PropertyStatus:String,
        PropertyType: String,
        Region: String,
        AuctionNature: String,
        BIddingStatus: String,
        Title: String,
        Address: String,
        StartingPrice: Number,
        BidIncrement: Number,
        Content: String,
        ConstructionArea: Number,
        PricePerFoot1: Number,
        PracticalArea: Number,
        PricePerFoot2: Number,
        SeatsAndUnits: String,
        Age: Number,
        Towards: String,
        Floor: String,
        Rooms: String,
        PrimarySchoolNetwork: String,
        MiddleSchoolNetwork: String,
        PropertyAddress: String,
        StartDateTime:Date,
        EndDateTime:Date,
        createdAt: {
            type: Date,
            default: Date.now,
        },
    }
);
const User = models.Property || model('Property', PropertySchema, 'properties');
export default User;