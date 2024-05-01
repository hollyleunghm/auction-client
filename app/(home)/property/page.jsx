
import connectMongo from '@/lib/connect-mongo';
import Property from '@/models/property';
import UI from "./ui";
export default async function Page() {
    await connectMongo();
    const properties = await Property.find();
    return (
        <UI properties={JSON.parse(JSON.stringify(properties))}></UI>
    );

}
