"use server";
import { clerkClient } from "@clerk/nextjs/server";

interface Card {
  cardNumber: string;
  cardholderName: string;
  expiryDate: string;
  cvv: string;
  id?: string;
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
  const newCard = {
    cardNumber,
    cardholderName,
    expiryDate,
    cvv,
    id: crypto.randomUUID(),
  };
  cards.push(newCard);

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
// function editCardServer
export async function editCardServer(
  cardId: string,
  cardNumber: string,
  cardholderName: string,
  expiryDate: string,
  cvv: string,
  userId: string
) {
  const client = await clerkClient();
  // Get the current user
  const user = await client.users.getUser(userId);

  // Get existing cards
  const existingCards = user.privateMetadata.cards || [];

  // Ensure existingCards is treated as an array
  const cards: Card[] = Array.isArray(existingCards) ? [...existingCards] : [];

  // Find the index of the card to edit
  const cardIndex = cards.findIndex((card) => card.id === cardId);

  if (cardIndex === -1) {
    return { success: false, message: "Card not found" };
  }

  // Update the card
  cards[cardIndex] = {
    ...cards[cardIndex],
    cardNumber,
    cardholderName,
    expiryDate,
    cvv,
  };

  // Update the user's private metadata
  await client.users.updateUserMetadata(userId, {
    privateMetadata: {
      ...user.privateMetadata,
      cards: cards,
    },
  });

  return { success: true };
}
export async function deleteCardServer(cardId: string, userId: string) {
  const client = await clerkClient();
  // Get the current user
  const user = await client.users.getUser(userId);

  // Get existing cards
  const existingCards = user.privateMetadata.cards || [];

  // Ensure existingCards is treated as an array
  const cards: Card[] = Array.isArray(existingCards) ? [...existingCards] : [];

  // Filter out the card to delete
  const updatedCards = cards.filter((card) => card.id !== cardId);

  // Update the user's private metadata
  await client.users.updateUserMetadata(userId, {
    privateMetadata: {
      ...user.privateMetadata,
      cards: updatedCards,
    },
  });

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
