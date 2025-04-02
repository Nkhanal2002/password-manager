"use server";
import { clerkClient } from "@clerk/nextjs/server";

interface Card {
  cardNumber: string;
  cardholderName: string;
  expiryDate: string;
  cvv: string;
}

interface Password {
  website: string;
  username: string;
  password: string;
}

export async function addCardSever(
  cardNumber: string,
  cardholderName: string,
  expiryDate: string,
  cvv: string,
  userId: string
) {
  const client = await clerkClient();
  // Get the current user
  const user = await client.users.getUser(userId);

  // Get existing cards or initialize an empty array
  const existingCards = user.privateMetadata.cards || [];

  // Ensure existingCards is treated as an array
  const cards: Card[] = Array.isArray(existingCards) ? [...existingCards] : [];

  // Add the new card
  cards.push({ cardNumber, cardholderName, expiryDate, cvv });

  // Update the user's private metadata, preserving other fields
  client.users.updateUserMetadata(userId, {
    privateMetadata: {
      ...user.privateMetadata, // Preserve existing metadata
      cards: cards,
    },
  });

  // Fetch the updated user to verify the changes
  const updatedUser = await client.users.getUser(userId);
  console.log("Updated metadata:", updatedUser.privateMetadata);

  return { success: true };
}

export async function addPasswordServer(
  website: string,
  username: string,
  password: string,
  userId: string
) {
  const client = await clerkClient();
  // Get the current user
  const user = await client.users.getUser(userId);

  // Get existing password or initialize an empty array
  const existingPasswords = user.privateMetadata.passwords || [];

  // Ensure existingPasswords is treated as an array
  const passwords: Password[] = Array.isArray(existingPasswords)
    ? [...existingPasswords]
    : [];

  // Add the new password
  passwords.push({ website, username, password });

  // Update the user's private metadata, preserving other fields
  client.users.updateUserMetadata(userId, {
    privateMetadata: {
      ...user.privateMetadata, // Preserve existing metadata
      passwords: passwords,
    },
  });

  // Fetch the updated user to verify the changes
  const updatedUser = await client.users.getUser(userId);
  console.log("Updated metadata:", updatedUser.privateMetadata);

  return { success: true };
}
