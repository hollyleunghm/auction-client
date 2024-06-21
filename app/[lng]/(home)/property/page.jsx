
import connectMongo from '@/lib/connect-mongo';
import Property from '@/models/property';
import UI from "./ui";
export default async function Page({ params: { lng } }) {
    await connectMongo();
    const properties = await Property.find({ deleted: false, post: true }).sort({ createdAt: -1, startingPrice: 1 });
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
        <UI lng={lng} properties={JSON.parse(JSON.stringify(properties))}></UI>
    );

}
