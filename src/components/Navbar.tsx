import { getServerSession } from "next-auth";
import Image from "next/image"
import Link from "next/link";

export default async function Navbar(){
const session = await getServerSession();
  return(
  <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
    <div className="flex items-center flex-shrink-0 text-white mr-6">
      <Image width={100} height={100} src="/img/deeldepot-logo.png" alt="logo" />
    </div>
    
    <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
      <div className="text-sm lg:flex-grow">
        <Link href="/" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
          Home
        </Link>
        <Link href="/products" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
          Producten
        </Link>
        {session ? (
        <Link href="/requests" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
          Verzoeken
        </Link>
        ) : (
          ""
        )}
        {session ? (
          <Link href="/my-products" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
          Eigen Producten
          </Link>
        ):(
            ""
        )}
        {session ? (
        <Link href="/client" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
          Profiel
        </Link>
        ) : (
          ""
        )}
        <Link href="/contact" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white">
          Contact
        </Link>
      </div>
      <div>
        {session ? (
        <div className="block mt-4lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
          <Link href="/api/auth/signout">Log uit</Link>
        </div>
        ) : (
      <div className="flex">
        <div className="block mt-4lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
          <Link href="/register">Registreer</Link>
        </div>
        <div className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
          <Link href="/api/auth/signin">Log in</Link>
        </div>	
      </div>
        )}
    </div>
    </div>
  </nav>
  )
}