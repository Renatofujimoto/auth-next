/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { SignOutButton } from "./signout";
import { getServerSession } from "next-auth";

const Header = async () => {
  const session = await getServerSession();
  return (
    <header className="w-full h-20 flex items-center bg-blue-400 text-slate-50">
      <nav className="w-full flex items-center justify-between m-auto max-w-screen-xl">
        <Link href="/">
          {" "}
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
        </Link>
        <ul className="flex items-center gap-10 ">
          <li>
            <Link href="/">Inicio</Link>
          </li>
          <li>
            <Link href="/public">Public</Link>
          </li>
          <li>
            <Link href="/private">Private</Link>
          </li>
          {session && (
            <li>
              <SignOutButton />
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export { Header };
