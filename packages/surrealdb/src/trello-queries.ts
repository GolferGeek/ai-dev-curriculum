import { Surreal } from "surrealdb";
import type { Board, TrelloList, Card } from "./types";

// ─── Board queries ───────────────────────────────────────────

export async function listBoards(db: Surreal): Promise<Board[]> {
  const [rows] = await db.query<[Board[]]>(
    `SELECT * FROM board ORDER BY created DESC;`
  );
  return rows;
}

export async function createBoard(
  db: Surreal,
  name: string
): Promise<Board> {
  const [rows] = await db.query<[Board[]]>(
    `CREATE board SET name = $name;`,
    { name }
  );
  return rows[0];
}

export async function getBoard(db: Surreal, id: string): Promise<Board | null> {
  const [rows] = await db.query<[Board[]]>(
    `SELECT * FROM type::record($id);`,
    { id }
  );
  return rows[0] ?? null;
}

export async function deleteBoard(db: Surreal, id: string): Promise<void> {
  // Delete all cards in all lists of this board
  await db.query(
    `DELETE card WHERE list.board = type::record($id);`,
    { id }
  );
  // Delete all lists
  await db.query(
    `DELETE list WHERE board = type::record($id);`,
    { id }
  );
  // Delete the board
  await db.query(
    `DELETE type::record($id);`,
    { id }
  );
}

// ─── List queries ────────────────────────────────────────────

export async function getListsForBoard(
  db: Surreal,
  boardId: string
): Promise<TrelloList[]> {
  const [rows] = await db.query<[TrelloList[]]>(
    `SELECT * FROM list WHERE board = type::record($bid) ORDER BY position ASC;`,
    { bid: boardId }
  );
  return rows;
}

export async function createList(
  db: Surreal,
  boardId: string,
  name: string,
  position: number
): Promise<TrelloList> {
  const [rows] = await db.query<[TrelloList[]]>(
    `CREATE list SET board = type::record($bid), name = $name, position = $pos;`,
    { bid: boardId, name, pos: position }
  );
  return rows[0];
}

export async function updateList(
  db: Surreal,
  id: string,
  data: { name?: string; position?: number }
): Promise<void> {
  if (data.name !== undefined) {
    await db.query(
      `UPDATE type::record($id) SET name = $name;`,
      { id, name: data.name }
    );
  }
  if (data.position !== undefined) {
    await db.query(
      `UPDATE type::record($id) SET position = $pos;`,
      { id, pos: data.position }
    );
  }
}

export async function deleteList(db: Surreal, id: string): Promise<void> {
  await db.query(`DELETE card WHERE list = type::record($id);`, { id });
  await db.query(`DELETE type::record($id);`, { id });
}

// ─── Card queries ────────────────────────────────────────────

export async function getCardsForList(
  db: Surreal,
  listId: string
): Promise<Card[]> {
  const [rows] = await db.query<[Card[]]>(
    `SELECT * FROM card WHERE list = type::record($lid) ORDER BY position ASC;`,
    { lid: listId }
  );
  return rows;
}

export async function createCard(
  db: Surreal,
  listId: string,
  title: string,
  description: string | null,
  position: number
): Promise<Card> {
  const query = description
    ? `CREATE card SET list = type::record($lid), title = $title, description = $desc, position = $pos;`
    : `CREATE card SET list = type::record($lid), title = $title, position = $pos;`;
  const params = description
    ? { lid: listId, title, desc: description, pos: position }
    : { lid: listId, title, pos: position };
  const [rows] = await db.query<[Card[]]>(query, params);
  return rows[0];
}

export async function getCard(db: Surreal, id: string): Promise<Card | null> {
  const [rows] = await db.query<[Card[]]>(
    `SELECT * FROM type::record($id);`,
    { id }
  );
  return rows[0] ?? null;
}

export async function updateCard(
  db: Surreal,
  id: string,
  data: { title?: string; description?: string | null; list?: string; position?: number }
): Promise<void> {
  if (data.title !== undefined) {
    await db.query(
      `UPDATE type::record($id) SET title = $title;`,
      { id, title: data.title }
    );
  }
  if (data.description !== undefined) {
    if (data.description === null) {
      await db.query(`UPDATE type::record($id) SET description = NONE;`, { id });
    } else {
      await db.query(
        `UPDATE type::record($id) SET description = $desc;`,
        { id, desc: data.description }
      );
    }
  }
  if (data.list !== undefined) {
    await db.query(
      `UPDATE type::record($id) SET list = type::record($lid);`,
      { id, lid: data.list }
    );
  }
  if (data.position !== undefined) {
    await db.query(
      `UPDATE type::record($id) SET position = $pos;`,
      { id, pos: data.position }
    );
  }
}

export async function deleteCard(db: Surreal, id: string): Promise<void> {
  await db.query(`DELETE type::record($id);`, { id });
}

export async function moveCard(
  db: Surreal,
  cardId: string,
  newListId: string,
  newPosition: number
): Promise<void> {
  await db.query(
    `UPDATE type::record($id) SET list = type::record($lid), position = $pos;`,
    { id: cardId, lid: newListId, pos: newPosition }
  );
}
