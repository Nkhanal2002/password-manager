"use client";

import type React from "react";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CreditCard } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addCardSever } from "@/actions/action";
import { useUser } from "@clerk/nextjs";

const formSchema = z.object({
  cardNumber: z
    .string()
    .min(16, "Card number must be at least 16 digits")
    .max(19, "Card number must be at most 19 digits")
    .regex(
      /^[0-9\s-]+$/,
      "Card number must contain only digits, spaces, or hyphens"
    ),
  cardholderName: z
    .string()
    .min(2, "Cardholder name must be at least 2 characters"),
  expiryDate: z
    .string()
    .regex(
      /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
      "Expiry date must be in MM/YY format"
    ),
  cvv: z.string().regex(/^[0-9]{3,4}$/, "CVV must be 3 or 4 digits"),
});

export function AddCard() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, isLoaded } = useUser();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardNumber: "",
      cardholderName: "",
      expiryDate: "",
      cvv: "",
    },
  });

  function formatCardNumber(value: string) {
    // Remove all non-digits
    const digits = value.replace(/\D/g, "");
    // Add a space after every 4 digits
    const formatted = digits.replace(/(\d{4})(?=\d)/g, "$1 ");
    return formatted;
  }

  function handleCardNumberChange(e: React.ChangeEvent<HTMLInputElement>) {
    const formatted = formatCardNumber(e.target.value);
    form.setValue("cardNumber", formatted);
  }

  function handleExpiryDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 2) {
      value = value.slice(0, 2) + "/" + value.slice(2, 4);
    }
    form.setValue("expiryDate", value);
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Check if user is loaded and exists
    if (!isLoaded || !user) {
      toast.error("You must be logged in to add a card");
      return;
    }

    setIsSubmitting(true);

    try {
      // Call the server action directly without setTimeout
      const result = await addCardSever(
        values.cardNumber,
        values.cardholderName,
        values.expiryDate,
        values.cvv,
        user.id
      );

      // Handle the result
      if (result?.success) {
        toast.success("Card added successfully", {
          description: "Your card has been securely stored.",
        });
        form.reset();
      } else {
        toast.error("Failed to add card", {
          description: "Please try again later.",
        });
      }
    } catch (error) {
      console.error("Error adding card:", error);
      toast.error("Failed to add card", {
        description: "An unexpected error occurred.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="cardNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Card Number</FormLabel>
              <FormControl>
                <Input
                  placeholder="1234 5678 9012 3456"
                  {...field}
                  onChange={handleCardNumberChange}
                  maxLength={19}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cardholderName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cardholder Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="expiryDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Expiry Date</FormLabel>
                <FormControl>
                  <Input
                    placeholder="MM/YY"
                    {...field}
                    onChange={handleExpiryDateChange}
                    maxLength={5}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cvv"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CVV</FormLabel>
                <FormControl>
                  <Input
                    placeholder="123"
                    {...field}
                    maxLength={4}
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Adding..." : "Add Card"}
          <CreditCard className="ml-2 h-4 w-4" />
        </Button>
      </form>
    </Form>
  );
}
