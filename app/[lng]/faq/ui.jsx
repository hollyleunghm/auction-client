
"use client";
const Page = ({ content }) => {
    return (
        <div className="px-4 md:px-0 w-full max-w-[1000px] mx-auto">
            <h2 className="font-semibold text-xl mb-4">FAQ</h2>
            <div className="px-4 md:px-0 [&>ol>li]:list-[auto]" dangerouslySetInnerHTML={{ __html: content }}>
            </div>
        </div>
    )
}
export default Page;