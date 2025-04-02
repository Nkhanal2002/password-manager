"use client";

import { CreditCard } from "lucide-react";

import { Card } from "@/components/ui/card";

interface CardsProps {
  cardNumber: string;
  cardholderName: string;
  expiryDate: string;
  cvv: string;
}

export function YourCards({ cards }: { cards: CardsProps[] }) {
  function maskCardNumber(cardNumber: string) {
    // Keep first 4 and last 4 digits visible, mask the rest
    const digits = cardNumber.replace(/\s/g, "");
    const firstFour = digits.slice(0, 4);
    const lastFour = digits.slice(-4);
    const masked = firstFour + " •••• •••• " + lastFour;
    return masked;
  }

  if (cards.length === 0) {
    return (
      <div className="text-center py-8 border border-dashed rounded-lg">
        <CreditCard className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium">No cards added yet</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Add your first card to see it here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {cards.map((card) => (
        <Card key={card.cardNumber} className="overflow-hidden">
          <div className="bg-gradient-to-r from-primary/20 to-primary/10 p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xl font-mono mt-1">
                  {maskCardNumber(card.cardNumber)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm">{card.cvv}</p>
                <p className="text-sm">{card.expiryDate}</p>
              </div>
            </div>
            <p className="mt-2 font-medium">{card.cardholderName}</p>
          </div>
        </Card>
      ))}
    </div>
  );
}
