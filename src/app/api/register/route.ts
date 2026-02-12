// app/api/register/route.ts
import { NextResponse } from "next/server"
import prisma from "@/app/lib/prisma"
import * as bcrypt from "bcrypt"

export async function POST(req: Request) {
    try {
        const {
            name,
            firstname,
            email,
            password,
            address,
            addressNr,
            phoneNr,
            plz,
            city,
        } = await req.json()

        const passwordHash = await bcrypt.hash(password, 10)

        await prisma.user.create({
            data: {
                name,
                firstname,
                email,
                password: passwordHash,
                address,
                addressNr,
                phoneNr,
                plz,
                city,
                adminFlag: false,
            },
        })

        return NextResponse.json(
            { message: "User registered successfully" },
            { status: 201 }
        )
    } catch (error) {
        console.error("Error creating user:", error)
        return NextResponse.json(
            { message: "Error registering user" },
            { status: 500 }
        )
    }
}
