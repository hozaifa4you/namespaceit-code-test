import { NextResponse } from "next/server";
import { z } from "zod";

import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export const POST = async (req: Request) => {
  try {
    const session = await getServerSession(authOptions);

    const data = await req.json();
    const body = z.object({
      category: z.string().trim(),
      name: z.string().trim(),
      price: z.string().trim(),
      productCode: z.string().optional(),
      quantity: z.string(),
      sku: z.string().optional(),
      slug: z.string(),
      description: z.string(),
      image: z.string(),
    });
    const {
      category,
      name,
      price,
      productCode,
      quantity,
      sku,
      slug,
      description,
      image,
    } = body.parse(data);

    const newProduct = await prismadb.product.create({
      data: {
        category,
        description,
        image,
        name,
        price,
        slug,
        sku: sku && sku,
        productCode: productCode && productCode,
        quantity,
        userId: session?.user?.id as number,
      },
    });

    return NextResponse.json(
      {
        msg: "Successfully new product created",
        user: newProduct.id,
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.log("[api product create error]", err); // FIXME: remove in production version
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
