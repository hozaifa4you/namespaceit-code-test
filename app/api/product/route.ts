import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export const GET = async () => {
  try {
    const products = await prismadb.product.findMany();

    return NextResponse.json(
      {
        products: products,
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.log("[api product find error]", err); // FIXME: remove in production version
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
