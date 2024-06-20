
import Footer from "@/app/ui/footer";
export default async function RootLayout({ params, children }) {
    return (
        <div className='bg-[#fdfcf9] h-full flex flex-col justify-between'>
            {children}
            <div className='h-12'></div>

            <Footer lng={params.lng} />
        </div>
    );
}