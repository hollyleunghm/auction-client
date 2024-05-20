import Link from 'next/link';
export default function NotFound() {
    return (
        <div className="flex flex-col h-full justify-between ">
            <div className="mt-24 flex gap-4 items-center justify-center" >
                <h2>此頁面不存在</h2>
                <span>|</span>
                <Link href="/">返回主頁</Link>
            </div>
        </div>

    )
}