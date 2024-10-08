"use client"
import { useState } from "react";
import { Button } from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Resetpassword() {

    const router = useRouter();
    const searchparams = useSearchParams();
    const token = searchparams.get('token');
    const [password2, setPassword2] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async () => {

        if (!token) {
            console.error("Token is missing");
            return;
        }

        if (password !== password2) {
            console.error("Passwords do not match");
            return;
        }

        console.log("Token:", token);  // Log token to inspect
        console.log("New Password:", password);  // Log password to inspect

        const response = await fetch('/api/resetpassword', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: token, newPassword: password }),
        });

        // Check for errors in the response
        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error response:", errorData);
            return;
        }

        // Parse the successful response
        const data = await response.json();
        console.log("Password reset successful:", data);

        console.log("Password reset successfully");

        //router.push("/home");
    };


    return (
        <main className="flex min-h-screen flex-col items-center bg-lime-900 justify-between p-24">
            <div className="bg-lime-700 p-4 w-1/6 rounded-lg shadow-lg">
                <h1 className="text-xl text-white font-bold">Reset Password</h1>
                <br />
                <div className="mb-4">
                    <label className="block text-lime-950 text-sm font-bold mb-2">
                        Password
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-lime-950 leading-tight focus:outline-none focus:shadow-outline" id="password2" type="password" value={password2} onChange={(e) => setPassword2(e.target.value)} placeholder="******************" />
                    <p className="text-red-700 text-xs italic">Please enter your password.</p>
                </div>
                <div className="mb-6">
                    <label className="block text-lime-950 text-sm font-bold mb-2">
                        Confirm Password
                    </label>
                    <input className="shadow appearance-none border border-red-700 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="******************" />
                    <p className="text-red-700 text-xs italic">Please enter your password.</p>
                </div>
                <div className="flex items-center gap-2 justify-between">
                    <Button className="bg-lime-950 hover:bg-blue-700 text-white w-full font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onPress={handleSubmit} type="button">
                        Reset Password
                    </Button>
                </div>
            </div>

        </main>
    );
}