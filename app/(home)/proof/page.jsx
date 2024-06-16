import UI from "./ui";
// 獲取個人資料和已上傳的證件信息
import connectMongo from "@/lib/connect-mongo";
import User from "@/models/user";
import { auth } from "@/auth";
const getUser = async () => {
    const session = await auth();
    try {
        await connectMongo();
        const user = await User.findOne({ _id: session.user._id });
        return user;
    } catch (error) {
        console.log(error);
    }
}
const user = await getUser();
const Page = () => {
    return <UI user={JSON.parse(JSON.stringify(user))}></UI>
}
export default Page;