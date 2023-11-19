import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export const GET = async () => {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { msg: "You are not permitted" },
        { status: 403 }
      );
    }

    const orders = await prismadb.order.findMany({
      where: { userId: session.user.id },
      include: {
        user: true,
        shippingInfo: true,
      },
    });

    return NextResponse.json(orders, { status: 200 });
  } catch (err: any) {
    console.log("[api orders]", err); // FIXME: remove in production version
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
