export default function Divider({ children }) {
    return (
        <div className="flex items-center">
            <div className="flex-grow border-t border-black"></div>
            <span className="px-2" >{children}</span>
            <div className="flex-grow border-t border-black"></div>
        </div>
    )
}