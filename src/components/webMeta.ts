import type { Metadata, Viewport } from "next";

const page = {
   title: "ProfileFolio",
   description:
      "Welcome to ProfileFolio, where software engineers can effortlessly craft personalized portfolios to showcase their talents, projects, experiences, and educational background—all without any prior web development experience. Our platform, built on Next.js and trpc, empowers users to create dynamic and engaging portfolios within minutes. Whether you're a seasoned professional or just starting your journey, our intuitive interface makes it easy to highlight your skills and achievements. Simply register, add your details, and share your unique portfolio link with the world. Start building your online presence today with ProfileFolio.",
};

export const viewportMeta: Viewport = {
   themeColor: "#7c3aed",
   colorScheme: "dark light",
   width: "device-width",
   initialScale: 1,
};

export const webMeta: Metadata = {
   title: {
      default: page.title,
      template: `%s - ${page.title}`,
   },
   description: page.description,
   robots: { index: true, follow: true },
   keywords:
      "software engineer, portfolio, web development, Next.js, trpc, projects, experiences, skills, achievements, education, online presence",
   // extra SEO optimisations
   creator: "Angkush Sahu",
   publisher: "Angkush Sahu",
   applicationName: page.title,
   generator: "Next.js and Vercel", // TODO: change the hosting service here
   referrer: "origin-when-cross-origin",
   metadataBase: new URL("https://profilefolio.vercel.app"), // TODO: change the url here
   authors: [{ name: "Angkush Sahu", url: "https://angkushsahu.vercel.app" }],
   openGraph: {
      title: page.title,
      description: page.description,
      images: [
         {
            url: "/og_image.png",
            width: 192,
            height: 192,
         },
      ],
   },
};
