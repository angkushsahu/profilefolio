import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
   return {
      name: "ProfileFolio",
      short_name: "profilefolio",
      description:
         "Welcome to ProfileFolio, where software engineers can effortlessly craft personalized portfolios to showcase their talents, projects, experiences, and educational background—all without any prior web development experience. Our platform, built on Next.js and trpc, empowers users to create dynamic and engaging portfolios within minutes. Whether you're a seasoned professional or just starting your journey, our intuitive interface makes it easy to highlight your skills and achievements. Simply register, add your details, and share your unique portfolio link with the world. Start building your online presence today with ProfileFolio.",
      start_url: "/",
      scope: "/",
      id: "/",
      display: "standalone",
      background_color: "#ffffff",
      theme_color: "#7c3aed",
      icons: [
         {
            src: "/favicon-32x32.png",
            sizes: "32x32",
            type: "image/png",
         },
         {
            src: "/favicon-16x16.png",
            sizes: "16x16",
            type: "image/png",
         },
         {
            src: "/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
         },
         {
            src: "/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
         },
      ],
   };
}
