// app/api/register/route.js
import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma"; // Adjust the path according to your project structure
import * as bcrypt from "bcrypt";

export async function POST(req : Request) {
    try {
        const { name, firstname, email, password, address, addressNr, phoneNr, plz, city } = await req.json();

        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        const user = {
            name: name,
            firstname: firstname,
            email: email,
            password: passwordHash,
            adress: address,
            adressNr: addressNr,
            phoneNr: phoneNr,
            plz: plz,
            city: city,
            adminFlag: false,
        }

        await prisma.user.create({
            data: user,
        });

        return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json({ message: "Error registering user" }, { status: 500 });
    }
}
