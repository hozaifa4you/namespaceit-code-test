import { User } from "@prisma/client";

type LoginUser = Omit<User, "password" | "product" | "order">;

declare module "next-auth" {
  interface Session {
    user?: LoginUser;
  }
}
