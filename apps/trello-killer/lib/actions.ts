"use server";

import { redirect } from "next/navigation";
import { getDb, getAuthenticatedDb } from "./surreal";
import { getToken, setToken, clearToken } from "./auth";

// ─── Auth actions ─────────────────────────────────────────────

export async function signupAction(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const db = await getDb();
  try {
    const tokens = await db.signup({
      namespace: "trello",
      database: "main",
      access: "user_access",
      variables: { email, password, name },
    });
    await setToken(typeof tokens === "string" ? tokens : tokens.access);
  } finally {
    await db.close();
  }
  redirect("/boards");
}

export async function signinAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const db = await getDb();
  try {
    const tokens = await db.signin({
      namespace: "trello",
      database: "main",
      access: "user_access",
      variables: { email, password },
    });
    await setToken(typeof tokens === "string" ? tokens : tokens.access);
  } finally {
    await db.close();
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

  const name = formData.get("name") as string;
  if (!name?.trim()) return;

  const db = await getAuthenticatedDb(token);
  try {
    await db.query(`CREATE board SET name = $name;`, { name: name.trim() });
  } finally {
    await db.close();
  }
  redirect("/boards");
}

export async function createListAction(formData: FormData) {
  const token = await getToken();
  if (!token) redirect("/signin");

  const boardId = formData.get("boardId") as string;
  const name = formData.get("name") as string;
  if (!name?.trim() || !boardId) return;

  const db = await getAuthenticatedDb(token);
  try {
    // Get the next position
    const [lists] = await db.query<[any[]]>(
      `SELECT * FROM list WHERE board = type::record($bid) ORDER BY position DESC LIMIT 1;`,
      { bid: boardId }
    );
    const nextPos = lists.length > 0 ? (lists[0].position ?? 0) + 1 : 0;

    await db.query(
      `CREATE list SET board = type::record($bid), name = $name, position = $pos;`,
      { bid: boardId, name: name.trim(), pos: nextPos }
    );
  } finally {
    await db.close();
  }
  redirect(`/boards/${encodeURIComponent(boardId)}`);
}

export async function createCardAction(formData: FormData) {
  const token = await getToken();
  if (!token) redirect("/signin");

  const listId = formData.get("listId") as string;
  const boardId = formData.get("boardId") as string;
  const title = formData.get("title") as string;
  if (!title?.trim() || !listId) return;

  const db = await getAuthenticatedDb(token);
  try {
    // Get the next position
    const [cards] = await db.query<[any[]]>(
      `SELECT * FROM card WHERE list = type::record($lid) ORDER BY position DESC LIMIT 1;`,
      { lid: listId }
    );
    const nextPos = cards.length > 0 ? (cards[0].position ?? 0) + 1 : 0;

    await db.query(
      `CREATE card SET list = type::record($lid), title = $title, position = $pos;`,
      { lid: listId, title: title.trim(), pos: nextPos }
    );
  } finally {
    await db.close();
  }
  redirect(`/boards/${encodeURIComponent(boardId)}`);
}

export async function updateCardAction(formData: FormData) {
  const token = await getToken();
  if (!token) redirect("/signin");

  const cardId = formData.get("cardId") as string;
  const boardId = formData.get("boardId") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const newListId = formData.get("listId") as string;

  if (!cardId || !boardId) return;

  const db = await getAuthenticatedDb(token);
  try {
    if (title !== undefined && title !== null) {
      await db.query(
        `UPDATE type::record($id) SET title = $title;`,
        { id: cardId, title }
      );
    }
    if (description !== undefined && description !== null) {
      await db.query(
        `UPDATE type::record($id) SET description = $desc;`,
        { id: cardId, desc: description || null }
      );
    }
    if (newListId) {
      // When moving to a new list, place at the end
      const [cards] = await db.query<[any[]]>(
        `SELECT * FROM card WHERE list = type::record($lid) ORDER BY position DESC LIMIT 1;`,
        { lid: newListId }
      );
      const nextPos = cards.length > 0 ? (cards[0].position ?? 0) + 1 : 0;
      await db.query(
        `UPDATE type::record($id) SET list = type::record($lid), position = $pos;`,
        { id: cardId, lid: newListId, pos: nextPos }
      );
    }
  } finally {
    await db.close();
  }
  redirect(`/boards/${encodeURIComponent(boardId)}`);
}

export async function moveCardAction(formData: FormData) {
  const token = await getToken();
  if (!token) redirect("/signin");

  const cardId = formData.get("cardId") as string;
  const newListId = formData.get("newListId") as string;
  const boardId = formData.get("boardId") as string;

  if (!cardId || !newListId || !boardId) return;

  const db = await getAuthenticatedDb(token);
  try {
    const [cards] = await db.query<[any[]]>(
      `SELECT * FROM card WHERE list = type::record($lid) ORDER BY position DESC LIMIT 1;`,
      { lid: newListId }
    );
    const nextPos = cards.length > 0 ? (cards[0].position ?? 0) + 1 : 0;
    await db.query(
      `UPDATE type::record($id) SET list = type::record($lid), position = $pos;`,
      { id: cardId, lid: newListId, pos: nextPos }
    );
  } finally {
    await db.close();
  }
  redirect(`/boards/${encodeURIComponent(boardId)}`);
}

export async function deleteCardAction(formData: FormData) {
  const token = await getToken();
  if (!token) redirect("/signin");

  const cardId = formData.get("cardId") as string;
  const boardId = formData.get("boardId") as string;

  if (!cardId || !boardId) return;

  const db = await getAuthenticatedDb(token);
  try {
    await db.query(`DELETE type::record($id);`, { id: cardId });
  } finally {
    await db.close();
  }
  redirect(`/boards/${encodeURIComponent(boardId)}`);
}
