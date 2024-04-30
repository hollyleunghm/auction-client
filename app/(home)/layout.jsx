import Header from "@/app/ui/header";
export default async function RootLayout({ children }) {
    return (
        <div className='bg-[#fdfcf9]'>
            <Header />
            {children}
        </div>
    );
}