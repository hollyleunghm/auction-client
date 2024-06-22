
export default async function RootLayout({ params, children }) {
    return (
        <div className='bg-[#fdfcf9] h-full flex flex-col justify-between'>
            {children}
        </div>
    );
}