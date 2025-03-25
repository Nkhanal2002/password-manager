import { AddCard } from "@/components/add-card";
import { AddPassword } from "@/components/add-password";
import { YourCards } from "@/components/your-cards";
import { YourPasswords } from "@/components/your-passwords";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const user = await currentUser();
  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className=" text-2xl sm:text-3xl font-bold text-center">
        Password Manager
      </h1>
      <h4 className="sm:text-lg text-center mb-8">
        Keep your cards and passwords safe — all in one secure place!
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <section className="bg-card rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">Add a Credit Card</h2>
            <AddCard />
          </section>

          <section className="bg-card rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">Your Cards</h2>
            <YourCards
              cards={
                Array.isArray(user?.privateMetadata.cards)
                  ? user?.privateMetadata.cards
                  : []
              }
            />
          </section>
        </div>

        <div className="space-y-6">
          <section className="bg-card rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">Add a Password</h2>
            <AddPassword />
          </section>

          <section className="bg-card rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">Your Passwords</h2>
            <YourPasswords
              passwords={
                Array.isArray(user?.privateMetadata.passwords)
                  ? user?.privateMetadata.passwords
                  : []
              }
            />
          </section>
        </div>
      </div>
    </main>
  );
}
