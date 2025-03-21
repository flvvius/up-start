"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";
import { signOut, signIn, useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <header className="px-5 font-work-sans bg-white shadow-sm">
      <nav className="flex items-center justify-between">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={70} height={70} />
        </Link>
        <div className="flex items-center gap-5 text-black">
          {session && session?.user ? (
            <>
              <Link href="/startup/create">
                <span>Create</span>
              </Link>
              <button
                onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
              >
                <span>Log out</span>
              </button>
              <Link href={`/user/${session?.user.name}`}>
                <span>{session?.user.name}</span>
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
