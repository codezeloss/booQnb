import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prismadb from "@/lib/prismadb";
import hashPassword from "@/utils/hashPassword";

export async function POST(req: Request) {
  try {
    const { email, name, password } = await req.json();

    const hashedPassword = await hashPassword(password);

    const user = await prismadb.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    });

    return NextResponse.json(user);
  } catch (e) {
    console.log("[REGISTER_POST]", e);
    return NextResponse.json("Internal error, cannot create account!");
  }
}
