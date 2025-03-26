"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";
import { signOut, signIn, useSession } from "next-auth/react";
import { PlusCircleIcon, LogOutIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <header className="px-5 py-3 font-work-sans bg-white shadow-sm">
      <nav className="flex items-center justify-between">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={144} height={30} />
        </Link>
        <div className="flex items-center gap-5 text-black">
          {session && session?.id ? (
            <>
              <Link href="/startup/create">
                <span className="max-sm:hidden">Create</span>
                <span className="sm:hidden">
                  <PlusCircleIcon className="w-4 h-4" />
                </span>
              </Link>
              <button
                onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
              >
                <span className="max-sm:hidden">Log out</span>
                <span className="sm:hidden">
                  <LogOutIcon className="w-4 h-4 text-red-500" />
                </span>
              </button>
              <Link href={`/user/${session.id}`}>
                <Avatar>
                  <AvatarImage src={session?.user.image || ""} />
                  <AvatarFallback>
                    {session?.user.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <>
              <button onClick={() => signIn("github")}>
                <span>Log in</span>
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
