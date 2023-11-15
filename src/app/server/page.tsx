import { authOptions } from "@/libs/auth"
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"

export default async function ServerPage() {
    const session = await getServerSession(authOptions)

    if (!session) {
        redirect('/api/auth/signin?callbackUrl=/server')
    }
    console.log(session)

    return (
        <section className="flex flex-col gap-6">
            <h1>{session!.user?.name}</h1>
            <p>{session.user?.email}</p>
            <image>{session.user?.image}</image>
        </section>
    )

}
