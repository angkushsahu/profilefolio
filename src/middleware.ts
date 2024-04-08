export { default } from "next-auth/middleware";

export const config = {
   matcher: ["/profile/:path*", "/user/:path*", "/folio/:path*"],
};
