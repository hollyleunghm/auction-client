import UI from "./ui";
import connectMongo from "@/lib/connect-mongo";
import User from "@/models/user";
import { auth } from "@/auth";
export default async function Page({ params }) {
    const session = await auth();
    await connectMongo();
    let user = await User.findOne({ _id: session.user._id }).lean();
    user.promotion = user.promotion ? "1" : "0";
    return (
        <UI lng={params.lng} user={JSON.parse(JSON.stringify(user))}></UI>
    );
}