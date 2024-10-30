// src/app/actions/submitUserData.ts


import { db } from '../db';
import { postsTable, usersTable } from '../db/schema';

export async function submitUserData() {
  'use server';
  await db.insert(usersTable).values({
    id: 1,
    name: "Test User", // Added name field as required
    age: 20,
    email: "test@example.com",
  });

  await db.insert(postsTable).values({
    title: "please subscribe",
    content: "yolo",
    userId: 1,
  });
}