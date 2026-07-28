"use server";

import { redirect } from "next/navigation";
import {
  trelloSignup,
  trelloSignin,
  getTrelloAuthenticatedDb,
  createBoard,
  getListsForBoard,
  createList,
  getCardsForList,
  createCard,
  updateCard,
  moveCard,
  deleteCard,
} from "@curriculum/surrealdb";
import { getToken, setToken, clearToken } from "./auth";

// ─── Auth actions ─────────────────────────────────────────────

export async function signupAction(formData: FormData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  if (!name || !email || !password) {
    redirect("/signup?error=Missing+required+fields");
  }

  try {
    const token = await trelloSignup({
      email: email.toString(),
      password: password.toString(),
      name: name.toString(),
    });
    await setToken(token);
  } catch {
    redirect("/signup?error=Signup+failed.+Email+may+already+be+in+use.");
  }
  redirect("/boards");
}

export async function signinAction(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    redirect("/signin?error=Missing+required+fields");
  }

  try {
    const token = await trelloSignin({
      email: email.toString(),
      password: password.toString(),
    });
    await setToken(token);
  } catch {
    redirect("/signin?error=Invalid+email+or+password");
  }
  redirect("/boards");
}

export async function signoutAction() {
  await clearToken();
  redirect("/signin");
}

// ─── Board actions ────────────────────────────────────────────

export async function createBoardAction(formData: FormData) {
  const token = await getToken();
  if (!token) redirect("/signin");

  const name = formData.get("name")?.toString() ?? "";
  if (!name.trim()) return;

  const db = await getTrelloAuthenticatedDb(token);
  try {
    await createBoard(db, name.trim());
  } finally {
    await db.close();
  }
  redirect("/boards");
}

export async function createListAction(formData: FormData) {
  const token = await getToken();
  if (!token) redirect("/signin");

  const boardId = formData.get("boardId")?.toString() ?? "";
  const name = formData.get("name")?.toString() ?? "";
  if (!name.trim() || !boardId) return;

  const db = await getTrelloAuthenticatedDb(token);
  try {
    const lists = await getListsForBoard(db, boardId);
    const nextPos = lists.length > 0 ? (lists[lists.length - 1].position ?? 0) + 1 : 0;
    await createList(db, boardId, name.trim(), nextPos);
  } finally {
    await db.close();
  }
  redirect(`/boards/${encodeURIComponent(boardId)}`);
}

export async function createCardAction(formData: FormData) {
  const token = await getToken();
  if (!token) redirect("/signin");

  const listId = formData.get("listId")?.toString() ?? "";
  const boardId = formData.get("boardId")?.toString() ?? "";
  const title = formData.get("title")?.toString() ?? "";
  if (!title.trim() || !listId) return;

  const db = await getTrelloAuthenticatedDb(token);
  try {
    const cards = await getCardsForList(db, listId);
    const nextPos = cards.length > 0 ? (cards[cards.length - 1].position ?? 0) + 1 : 0;
    await createCard(db, listId, title.trim(), null, nextPos);
  } finally {
    await db.close();
  }
  redirect(`/boards/${encodeURIComponent(boardId)}`);
}

export async function updateCardAction(formData: FormData) {
  const token = await getToken();
  if (!token) redirect("/signin");

  const cardId = formData.get("cardId")?.toString() ?? "";
  const boardId = formData.get("boardId")?.toString() ?? "";
  const title = formData.get("title")?.toString();
  const description = formData.get("description")?.toString();
  const newListId = formData.get("listId")?.toString();

  if (!cardId || !boardId) return;

  const db = await getTrelloAuthenticatedDb(token);
  try {
    const updates: { title?: string; description?: string | null; list?: string; position?: number } = {};

    if (title !== undefined && title !== null) {
      updates.title = title;
    }
    if (description !== undefined && description !== null) {
      updates.description = description || null;
    }
    if (newListId) {
      const cards = await getCardsForList(db, newListId);
      const nextPos = cards.length > 0 ? (cards[cards.length - 1].position ?? 0) + 1 : 0;
      updates.list = newListId;
      updates.position = nextPos;
    }

    await updateCard(db, cardId, updates);
  } finally {
    await db.close();
  }
  redirect(`/boards/${encodeURIComponent(boardId)}`);
}

export async function moveCardAction(formData: FormData) {
  const token = await getToken();
  if (!token) redirect("/signin");

  const cardId = formData.get("cardId")?.toString() ?? "";
  const newListId = formData.get("newListId")?.toString() ?? "";
  const boardId = formData.get("boardId")?.toString() ?? "";

  if (!cardId || !newListId || !boardId) return;

  const db = await getTrelloAuthenticatedDb(token);
  try {
    const cards = await getCardsForList(db, newListId);
    const nextPos = cards.length > 0 ? (cards[cards.length - 1].position ?? 0) + 1 : 0;
    await moveCard(db, cardId, newListId, nextPos);
  } finally {
    await db.close();
  }
  redirect(`/boards/${encodeURIComponent(boardId)}`);
}

export async function deleteCardAction(formData: FormData) {
  const token = await getToken();
  if (!token) redirect("/signin");

  const cardId = formData.get("cardId")?.toString() ?? "";
  const boardId = formData.get("boardId")?.toString() ?? "";

  if (!cardId || !boardId) return;

  const db = await getTrelloAuthenticatedDb(token);
  try {
    await deleteCard(db, cardId);
  } finally {
    await db.close();
  }
  redirect(`/boards/${encodeURIComponent(boardId)}`);
}
