
import connectMongo from '@/lib/connect-mongo';
import CarPark from '@/models/carPark';
import UI from "./ui";
export default async function Page({ params: { lng } }) {
    await connectMongo();
    const carParks = await CarPark.find({ deleted: false }).sort({ createdAt: -1, startingPrice: 1 });
    carParks.map(item => {
        if (new Date(item.endDateTime) <= new Date()) {
            item.status = "Completed";
        } else if (new Date(item.startDateTime) >= new Date()) {
            item.status = "AboutToStart";
        } else {
            item.status = "InProgress";
        }
    });
    return (
        <UI carParks={JSON.parse(JSON.stringify(carParks))} lng={lng}></UI>
    );

}
