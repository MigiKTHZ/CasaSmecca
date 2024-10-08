"use client"
import { useState } from "react";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react"

export default function Signin() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignIn = () => {
        signIn("credentials", {
            email: email,
            password: password,
            redirect: true,
            callbackUrl: "/"
        });
    };


    return (
        <main className="flex min-h-screen flex-col items-center bg-lime-900 justify-between p-24">
            <div className="bg-lime-700 p-4 w-1/6 rounded-lg shadow-lg">
                <Button className="bg-lime-950 p-2 w-full" onPress={() => signIn("github")}>
                    <Image src="https://authjs.dev/img/providers/github.svg" className="size-full" alt="Github" width={24} height={24} />
                    <p className="text-lime-100 p-2">Sign in with Github</p>

                </Button>
                <br />
                <br />
                <Button className="bg-lime-950 p-2 w-full" onPress={() => signIn("facebook")}>
                    <Image src="https://authjs.dev/img/providers/facebook.svg" className="size-full" alt="Facebook" width={24} height={24} />
                    <p className="text-lime-100 p-2">Sign in with Facebook</p>

                </Button>
                <br />
                <br />
                <Button className="bg-lime-950 p-2 w-full" onPress={() => signIn("google")}>
                    <Image src="https://authjs.dev/img/providers/google.svg" className="size-full" alt="Google" width={24} height={24} />
                    <p className="text-lime-100 p-2">Sign in with Google</p>
                </Button>
                <br />
                <br />
                <div className="border-t-3 border-solid border-lime-100 rounded "></div>
                <br />
                <div className="mb-4">
                    <label className="block text-lime-950 text-sm font-bold mb-2">
                        E-Mail
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-lime-950 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john.doe@example.com" />
                </div>
                <div className="mb-6">
                    <label className="block text-lime-950 text-sm font-bold mb-2">
                        Password
                    </label>
                    <input className="shadow appearance-none border border-red-700 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="******************" />
                    <p className="text-red-700 text-xs italic">Please enter your password.</p>
                </div>
                <div className="flex items-center gap-2 justify-between">
                    <Button className="bg-lime-950 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onPress={handleSignIn} type="button">
                        Sign In
                    </Button>
                    <a className="inline-block align-baseline font-bold text-xs text-white hover:text-blue-800 underline" href="/auth/forgotpassword">
                        Forgot Password?
                    </a>
                </div>
                <br />
                <div className="flex items-center justify-between">
                    <p className="text-xs text-white">
                        Don&apos;t have an account?
                    </p>
                    <a className="inline-block align-baseline font-bold text-xs underline text-white hover:text-blue-800" href="/auth/register">
                        Register
                    </a>
                </div>
            </div>

        </main>
    );
}