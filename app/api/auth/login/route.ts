import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import _ from "lodash";

import prismadb from "@/lib/prismadb";

export const POST = async (req: Request) => {
  try {
    const { password, email } = z
      .object({
        email: z.string().trim(),
        password: z.string(),
      })
      .parse(await req.json());

    const user = await prismadb.user.findFirst({
      where: { email },
    });

    if (!user)
      return NextResponse.json({ msg: "Invalid credentials" }, { status: 401 });

    if (!(await bcrypt.compare(password, user.password)))
      return NextResponse.json({ msg: "Invalid credentials" }, { status: 401 });

    return NextResponse.json(_.omit(user, ["password", "posts", "comment"]), {
      status: 200,
    });
  } catch (err: any) {
    console.log("[api login]", err); // FIXME: remove in production version
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
