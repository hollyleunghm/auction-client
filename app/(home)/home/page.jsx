
import { auth } from '../../../auth';
export default async function Home() {
    const session = await auth();
    return (
        <main className="">
            Welcome to the home page!<p>Welcome {JSON.stringify(session)}</p>
        </main>
    );
}
