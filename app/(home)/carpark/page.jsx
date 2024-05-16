
import connectMongo from '@/lib/connect-mongo';
import CarPark from '@/models/carPark';
import UI from "./ui";
export default async function Page() {
    await connectMongo();
    const carParks = await CarPark.find();
    carParks.map(item => {
        if (new Date(item.endDateTime) <= new Date()) {
            item.BIddingStatus = "Completed";
        } else if (new Date(item.startDateTime) >= new Date()) {
            item.BIddingStatus = "AboutToStart";
        } else {
            item.BIddingStatus = "InProgress";
        }
    });
    return (
        <UI carParks={JSON.parse(JSON.stringify(carParks))}></UI>
    );

}
