"use client";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
} from "@nextui-org/react";
import Image from "next/image";
import { MainNav } from "../lib/navbarLinks";
import { useSession, signOut } from "next-auth/react";

export default function MainNavbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { data: session } = useSession();
  return (
    <Navbar className="bg-lime-950" onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Image
            src={"/header/image.png"}
            alt="company logo"
            width={151}
            height={64}
          />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {MainNav.map((item, index) => (
          <NavbarItem key={index}>
            <Link className="text-lime-100" href={item.href}>
              {item.text}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        {session && session.user ? (
          // <div className="flex flex-row gap-2">
          <>
            <NavbarItem>
              <Link className="hidden lg:flex text-lime-100" href="/cart">
                <div className="relative py-2">
                  {" "}
                  <div className="t-0 absolute left-3">
                    <p className="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-3 text-xs text-white">
                      3
                    </p>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="file: mt-4 h-6 w-6"
                    color="white"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                    />
                  </svg>
                </div>
              </Link>
            </NavbarItem>
            <NavbarItem>
              <p className="text-lime-100">Hello {session.user.name}!</p>
            </NavbarItem>
            <NavbarItem>
              <button
                className="bg-lime-700 hover:bg-lime-100 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => signOut()}
                type="button"
              >
                Sign Out
              </button>
            </NavbarItem>
          </>
        ) : (
          // </div>
          // <div className="flex flex-row gap-4">
          <>
            <NavbarItem>
              <Link
                className="hidden lg:flex text-lime-100"
                href="/auth/signin"
              >
                Login
              </Link>
            </NavbarItem>
          </>
          // </div>
        )}
      </NavbarContent>
      <NavbarMenu>
        {MainNav.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link className="w-full" href={item.href} size="lg">
              {item.text}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
