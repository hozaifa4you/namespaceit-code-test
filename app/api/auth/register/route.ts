import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";

import prismadb from "@/lib/prismadb";

export const POST = async (req: Request) => {
  try {
    const data = await req.json();
    const body = z.object({
      name: z.string().trim(),
      username: z.string().trim(),
      email: z.string().trim(),
      password: z.string(),
    });
    const { email, name, password, username } = body.parse(data);

    const user = await prismadb.user.findFirst({
      where: { email },
    });

    if (user)
      return NextResponse.json({ msg: "User already exist" }, { status: 409 });

    const newUser = await prismadb.user.create({
      data: {
        name,
        username,
        email,
        password: await bcrypt.hash(password, 12),
      },
    });

    return NextResponse.json(
      { msg: "Successfully new user created", user: newUser.id },
      { status: 201 }
    );
  } catch (err: any) {
    console.log("[api login register err]", err); // FIXME: remove in production version
    return NextResponse.json(
      {
        msg:
          process.env.NODE_ENV === "development"
            ? err.message
            : "Internal server error",
      },
      { status: 500 }
    );
  }
};
