
import connectMongo from '@/lib/connect-mongo';
import Property from '@/models/property';
import UI from "./ui";
export default async function Page() {
    await connectMongo();
    const properties = await Property.find();
    properties.map(item => {
        if (new Date(item.endDateTime) <= new Date()) {
            item.BIddingStatus = "Completed";
        } else if (new Date(item.startDateTime) >= new Date()) {
            item.BIddingStatus = "AboutToStart";
        } else {
            item.BIddingStatus = "InProgress";
        }
    });
    return (
        <UI properties={JSON.parse(JSON.stringify(properties))}></UI>
    );

}
