import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/utils/prismadb";

export async function POST(request: NextRequest) {
  try {
    console.log("Incoming request to /api/register");

    const body = await request.json();
    const { email, name, password } = body;

    console.log("Request body:", body);

    if (!email || !name || !password) {
      console.error("Missing required fields:", { email, name, password });
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    console.log("Proceeding with registration for:", { email, name });

    // Хешування пароля
    const hashedPassword = await bcrypt.hash(password, 12);
    console.log("Hashed password generated successfully:", hashedPassword);

    // Створення користувача в базі даних
 const user = await prisma.user.create({
   data: {
     email,
     name,
     hashedPassword,
     image: "",
     emailVerified: new Date(),
   },
 });

    console.log("User created successfully:", user);

    // Відправка відповіді з даними нового користувача
    return NextResponse.json(user);
  } catch (error: any) {
    console.error("Error in /api/register:", error.message);
    return NextResponse.json(
      { error: "Internal Server Error", message: error.message },
      { status: 500 }
    );
  }
}
