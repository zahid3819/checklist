export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/dashboard/:path*", "/checklists/:path*", "/account/:path*", "/settings/:path*"],
};
