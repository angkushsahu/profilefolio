import type { Metadata } from "next";
import ProfileHome from "./home/page";

export const metadata: Metadata = {
   title: "User Profile",
};

export default function ProfilePage() {
   return <ProfileHome />;
}
