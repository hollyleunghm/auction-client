import Header from "@/components/header";
export default function RootLayout({ children }) {
    return (
        <div className='bg-[#fdfcf9]'>
            <Header />
            {children}
        </div>
    );
}