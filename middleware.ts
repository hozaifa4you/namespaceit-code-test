import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      if (req.nextUrl.pathname === "/dashboard") {
        return token?.userType === "Admin";
      }

      return !!token;
    },
  },
});

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*", "/product/:path*"],
};
