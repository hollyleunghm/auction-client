import Header from "@/app/ui/header";
import Footer from "@/app/ui/footer";
export default async function RootLayout({ children }) {
    return (
        <div className='bg-[#fdfcf9]'>
            <Header />
            {children}
            {/* <div className='h-12'></div> */}
            <Footer />
        </div>
    );
}