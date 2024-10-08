"use client"
import { useState } from "react";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function Forgotpassword() {

    const router = useRouter();

    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = () => {
        fetch("/api/forgotpassword", {
            method: "POST", 
            body: email,
            headers: {
                'Content-Type': 'text/plain', // Send it as plain text
            },
        });
    };

    return (
        <main className="flex min-h-screen flex-col items-center bg-lime-900 justify-between p-24">
            <div className="bg-lime-700 p-4 w-1/4 rounded-lg shadow-lg">
                <form onSubmit={handleSubmit}>
                    <h1 className="text-xl text-white font-bold">Forgot Password</h1>
                    <br />
                    <div className="mb-4">
                        <label className="block text-lime-950 text-sm font-bold mb-2">
                            Enter your E-Mail:
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-lime-950 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john.doe@example.com" required />
                    </div>
                    <div className="flex items-center gap-2 justify-between">
                        <Button className="bg-lime-950 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Reset my password
                        </Button>
                        <a className="inline-block align-baseline font-bold text-s text-white hover:text-blue-800 underline" href="/auth/signin">
                            Login
                        </a>
                    </div>
                </form>

            </div>
        </main>
    );
}