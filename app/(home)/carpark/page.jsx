
import connectMongo from '@/lib/connect-mongo';
import CarPark from '@/models/carPark';
import UI from "./ui";
export default async function Page() {
    await connectMongo();
    const carParks = await CarPark.find();
    return (
        <UI carParks={JSON.parse(JSON.stringify(carParks))}></UI>
    );

}
