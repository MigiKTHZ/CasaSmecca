"use client"
import { useState } from "react";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import { User } from "@prisma/client";
import prisma from "@/app/lib/prisma";
import * as bcrypt from "bcrypt";

export default function Register() {

    const [name, setLastName] = useState("");
    const [firstname, setFirstName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [verifiedPassword, setVerifiedPassword] = useState("");
    const [phoneNr, setPhoneNr] = useState("");
    const [address, setAddress] = useState("");
    const [addressNr, setaddressNr] = useState("");
    const [city, setCity] = useState("");
    const [plz, setPlz] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async () => {
        if (password !== verifiedPassword) {
            setError("Passwords do not match");
            return;
        }

        // Reset any existing messages
        setError("");
        setSuccess("");

        try {
            const response = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    firstname,
                    email,
                    password,
                    address,
                    addressNr,
                    phoneNr,
                    plz,
                    city,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to register");
            }

            setSuccess("Registration successful!");
            // Reset form after success
            setLastName("");
            setFirstName("");
            setEmail("");
            setPassword("");
            setVerifiedPassword("");
            setPhoneNr("");
            setAddress("");
            setaddressNr("");
            setCity("");
            setPlz("");
        } catch (error : unknown) {
            if (error instanceof Error) { // Narrow the type to Error
                setError("Registration failed: " + error.message);
            } else {
                setError("Registration failed: An unknown error occurred.");
            }
        }
    };


    return (
        <main className="flex min-h-screen flex-col items-center bg-lime-900 justify-between p-24">
            <div className="bg-lime-700 p-4 rounded-lg shadow-lg">
                <label className="block text-gray-800 text-xl font-bold mb-2">
                    Register Page
                </label>
                <br></br>
                <div className="border-t-3 border-solid border-lime-100 rounded "></div>
                <br></br>
                <label className="block text-gray-600 text-md font-bold mb-2">
                    Personal details
                </label>
                <div className="flex gap-2 flex-row">
                    <div className="mb-4">
                        <label className="block text-lime-950 text-sm font-bold mb-2">
                            Name
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-lime-950 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" value={name} onChange={(e) => setLastName(e.target.value)} placeholder="Doe" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-lime-950 text-sm font-bold mb-2">
                            Vorname
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-lime-950 leading-tight focus:outline-none focus:shadow-outline" id="firstname" type="text" value={firstname} onChange={(e) => setFirstName(e.target.value)} placeholder="John" />
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-lime-950 text-sm font-bold mb-2">
                        E-Mail
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-lime-950 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john.doe@example.com" />
                </div>
                <div className="flex gap-2 flex-row">
                    <div className="mb-6">
                        <label className="block text-lime-950 text-sm font-bold mb-2">
                            Password
                        </label>
                        <input className="shadow appearance-none border border-red-700 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="******************" />
                        <p className="text-red-700 text-xs italic">Please choose a password.</p>
                    </div>
                    <div className="mb-6">
                        <label className="block text-lime-950 text-sm font-bold mb-2">
                            Verify Password
                        </label>
                        <input className="shadow appearance-none border border-red-700 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" value={verifiedPassword} onChange={(e) => setVerifiedPassword(e.target.value)} type="password" placeholder="******************" />
                        <p className="text-red-700 text-xs italic">Please choose a password.</p>
                    </div>
                </div>

                <div className="border-t-3 border-solid border-lime-100 rounded "></div>
                <br></br>

                <label className="block text-gray-600 text-md font-bold mb-2">
                    Shipping details
                </label>
                <div className="mb-4">
                    <label className="block text-lime-950 text-sm font-bold mb-2">
                        Phone Number
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-lime-950 leading-tight focus:outline-none focus:shadow-outline" id="phoneNr" type="text" value={phoneNr} onChange={(e) => setPhoneNr(e.target.value)} placeholder="079-123-00-00" />
                </div>
                <div className="flex gap-2 mb-4 flex-row">
                    <div className="flex-auto w-64">
                        <label className="block text-lime-950 text-sm font-bold mb-2">
                            Adress
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-lime-950 leading-tight focus:outline-none focus:shadow-outline" id="address" type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Examplestreet" />
                    </div>
                    <div className="flex-auto w-16">
                        <label className="block text-lime-950 text-sm font-bold mb-2">
                            Adress Number
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-lime-950 leading-tight focus:outline-none focus:shadow-outline" id="addressNr" type="text" value={addressNr} onChange={(e) => setaddressNr(e.target.value)} placeholder="XXXX" />
                    </div>
                </div>

                <div className="flex gap-2 mb-4 flex-row">
                    <div className="mb-4">
                        <label className="block text-lime-950 text-sm font-bold mb-2">
                            City
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-lime-950 leading-tight focus:outline-none focus:shadow-outline" id="city" type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Bern, Zürich, Basel" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-lime-950 text-sm font-bold mb-2">
                            PLZ
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-lime-950 leading-tight focus:outline-none focus:shadow-outline" id="plz" type="text" value={plz} onChange={(e) => setPlz(e.target.value)} placeholder="XXXX" />
                    </div>
                </div>

                <div className="border-t-3 border-solid border-lime-100 rounded "></div>

                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-500">{success}</p>}

                <br />
                <div className="flex items-center justify-between">
                    <Button className="bg-lime-950 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full" onPress={handleSubmit} type="button">
                        Jetzt Registrieren
                    </Button>
                </div>
            </div>

        </main>
    );
}