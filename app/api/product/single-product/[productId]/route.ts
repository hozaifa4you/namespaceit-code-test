import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export const GET = async (
  req: Request,
  { params: { productId } }: { params: { productId: string } }
) => {
  try {
    const product = await prismadb.product.findFirst({
      where: { id: Number(productId) },
    });

    return NextResponse.json(product, { status: 200 });
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
