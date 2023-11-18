import { NextResponse } from "next/server";
import _ from "lodash";

import prismadb from "@/lib/prismadb";

export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username") as string;

    const user = await prismadb.user.findFirst({
      where: { username },
      include: {
        order: { include: { user: true, _count: true, orderProduct: true } },
        product: { include: { creator: true, order: true } },
        _count: true,
      },
    });

    if (!user)
      return NextResponse.json({ msg: "User not found" }, { status: 401 });

    return NextResponse.json(_.omit(user, ["password", "product", "order"]), {
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
