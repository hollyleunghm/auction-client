import { dir } from 'i18next'
import { languages } from '../i18n/settings'

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
        <div lang={lng} dir={dir(lng)}>
            {children}
        </div>
    )
}