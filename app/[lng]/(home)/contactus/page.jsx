import UI from "./ui";
import connectMongo from '@/lib/connect-mongo';
import Contact from '@/models/contact';

export default async function Page({ params: { lng } }) {
    await connectMongo();
    let contact = await Contact.findOne({});
    if (!contact) {
        contact = {}
    }
    return (
        <UI contact={contact} lng={lng}></UI>
    );

}
