
import connectMongo from '@/lib/connect-mongo';
import Property from '@/models/property';
import UI from "./ui";
export default async function Page() {
    await connectMongo();
    const properties = await Property.find({ deleted: false }).sort({ createdAt: -1, startingPrice: 1 });
    console.log(properties);
    properties.map(item => {
        if (new Date(item.endDateTime) <= new Date()) {
            item.status = "Completed";
        } else if (new Date(item.startDateTime) >= new Date()) {
            item.status = "AboutToStart";
        } else {
            item.status = "InProgress";
        }
    });
    return (
        <UI properties={JSON.parse(JSON.stringify(properties))}></UI>
    );

}
