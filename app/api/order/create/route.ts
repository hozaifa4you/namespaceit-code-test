import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export const POST = async (req: Request) => {
  const session = await getServerSession(authOptions);

  try {
    if (!session || !session?.user) {
      return NextResponse.json({ msg: "Please login" }, { status: 403 });
    }

    const {
      orderId,
      orderProducts, // this filed type [{productId:number, qty: number}]
      totalPayment,
      totalProduct,
      deliveryCharge,
      address,
      isPaid,
      paymentMethod,
    } = await req.json();

    const addressCreate = await prismadb.address.create({
      data: {
        addressLine1: address.addressLine1,
        city: address.city,
        country: "Bangladesh",
        division: address.division,
        name: session.user.name,
        zip: Number(address.zip),
        addressLine2: address.addressLine2,
      },
    });

    const shippingInfoCreate = await prismadb.shippingInfo.create({
      data: {
        addressId: addressCreate.id,
        userId: session.user.id,
      },
    });

    const order = await prismadb.order.create({
      data: {
        deliveryCharge,
        orderId,
        orderProducts, //fix
        slug: "product-" + Date.now(),
        totalPayment,
        totalProduct,
        orderStatus: "Processing",
        userId: session.user.id,
        shippingInfoId: shippingInfoCreate.id,
        paymentMethod,
        isPaid,
      },
    });

    return NextResponse.json(
      { msg: "Order created successfully - " + order.id, success: true },
      { status: 200 }
    );
  } catch (err: any) {
    console.log("[api product find error]", err);
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
