import Link from 'next/link';
import Header from "@/app/ui/header";
import Footer from "@/app/ui/footer";
export default function NotFound() {
    return (
        <div className="flex flex-col h-screen w-full justify-between items-center" >
            <Header />
            <div className="flex gap-4 text-lg " >
                <h2>此頁面不存在</h2>
                <span>|</span>
                <Link href="/">返回主頁</Link>
            </div>
            <Footer />
        </div>

    )
}