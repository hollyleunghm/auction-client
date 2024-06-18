import { dir } from 'i18next'
import { languages } from '../i18n/settings'

import Header from "@/app/ui/header";
export async function generateStaticParams() {
    return languages.map((lng) => ({ lng }))
}

export default function RootLayout({
    children,
    params: {
        lng
    }
}) {
    return (

        <div lang={lng} dir={dir(lng)} className="min-h-screen flex flex-col h-screen w-full justify-between" >
            <Header />
            <div className="flex-grow">
                {children}
            </div>
        </div>

    )
}