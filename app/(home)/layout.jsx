
import Footer from "@/app/ui/footer";
export default async function RootLayout({ children }) {
    return (
        <div className='bg-[#fdfcf9]'>
            {children}
            {/* <div className='h-12'></div> */}
            <Footer />
        </div>
    );
}