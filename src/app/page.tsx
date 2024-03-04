import { Button } from "~/components";

export default function Home() {
   return (
      <main className="container min-h-screen">
         <section className="flex flex-col items-start py-20 sm:items-center">
            <h1 className="sm:text-center">ProfileFolio - Showcasing Your Journey</h1>
            <h2 className="mb-8 mt-6 text-2xl font-medium text-muted-foreground sm:max-w-[50ch] sm:text-center">
               Craft your unique portfolio effortlessly. Showcase projects, skills, experiences, and education to the world.
            </h2>
            <Button type="button">Click me !!!!</Button>
         </section>
      </main>
   );
}
