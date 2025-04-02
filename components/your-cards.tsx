"use client";

import { CreditCard, Copy } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

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
  // Copy card number to clipboard
  const copyCardNumber = (cardNumber: string) => {
    navigator.clipboard
      .writeText(cardNumber)
      .then(() => {
        toast.success("Card number copied to clipboard");
      })
      .catch((error) => {
        console.error("Failed to copy card number:", error);
        toast.error("Could not copy card number to clipboard");
      });
  };

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
          <div className="bg-gradient-to-r from-primary/20 to-primary/10 p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-2 sm:gap-0">
              <div className=" flex items-center space-x-2 w-full sm:w-auto">
                <p className="text-base sm:text-xl font-mono truncate max-w-[180px] sm:max-w-none">
                  {maskCardNumber(card.cardNumber)}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 flex-shrink-0"
                  onClick={() => copyCardNumber(card.cardNumber)}
                  title="Copy card number"
                >
                  <Copy className="h-4 w-4" />
                  <span className="sr-only">Copy card number</span>
                </Button>
              </div>
              <div className="text-right w-full sm:w-auto mt-2 sm:mt-0">
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
