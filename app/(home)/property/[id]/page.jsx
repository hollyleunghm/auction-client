import Client from "./client";
const getData = async () => {
    // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/get-data`);
    // const data = await res.json();
    const data = { name: 111 };
    return data;
}
export default async function Detail() {
    const data = await getData();
    return (
        <div className="w-[1000px] mx-auto">
            <Client data={data} />
        </div>

    )
}