import { Surreal } from "surrealdb";

// ─── Board queries ───────────────────────────────────────────

export async function listBoards(db: Surreal): Promise<any[]> {
  const [rows] = await db.query<[any[]]>(
    `SELECT * FROM board ORDER BY created DESC;`
  );
  return rows;
}

export async function createBoard(
  db: Surreal,
  name: string
): Promise<any> {
  const [rows] = await db.query<[any[]]>(
    `CREATE board SET name = $name;`,
    { name }
  );
  return rows[0];
}

export async function getBoard(db: Surreal, id: string): Promise<any> {
  const [rows] = await db.query<[any[]]>(
    `SELECT * FROM type::thing($id);`,
    { id }
  );
  return rows[0] ?? null;
}

export async function deleteBoard(db: Surreal, id: string): Promise<void> {
  // Delete all cards in all lists of this board
  await db.query(
    `DELETE card WHERE list.board = type::thing($id);`,
    { id }
  );
  // Delete all lists
  await db.query(
    `DELETE list WHERE board = type::thing($id);`,
    { id }
  );
  // Delete the board
  await db.query(
    `DELETE type::thing($id);`,
    { id }
  );
}

// ─── List queries ────────────────────────────────────────────

export async function getListsForBoard(
  db: Surreal,
  boardId: string
): Promise<any[]> {
  const [rows] = await db.query<[any[]]>(
    `SELECT * FROM list WHERE board = type::thing($bid) ORDER BY position ASC;`,
    { bid: boardId }
  );
  return rows;
}

export async function createList(
  db: Surreal,
  boardId: string,
  name: string,
  position: number
): Promise<any> {
  const [rows] = await db.query<[any[]]>(
    `CREATE list SET board = type::thing($bid), name = $name, position = $pos;`,
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
      `UPDATE type::thing($id) SET name = $name;`,
      { id, name: data.name }
    );
  }
  if (data.position !== undefined) {
    await db.query(
      `UPDATE type::thing($id) SET position = $pos;`,
      { id, pos: data.position }
    );
  }
}

export async function deleteList(db: Surreal, id: string): Promise<void> {
  await db.query(`DELETE card WHERE list = type::thing($id);`, { id });
  await db.query(`DELETE type::thing($id);`, { id });
}

// ─── Card queries ────────────────────────────────────────────

export async function getCardsForList(
  db: Surreal,
  listId: string
): Promise<any[]> {
  const [rows] = await db.query<[any[]]>(
    `SELECT * FROM card WHERE list = type::thing($lid) ORDER BY position ASC;`,
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
): Promise<any> {
  const [rows] = await db.query<[any[]]>(
    `CREATE card SET list = type::thing($lid), title = $title, description = $desc, position = $pos;`,
    { lid: listId, title, desc: description, pos: position }
  );
  return rows[0];
}

export async function getCard(db: Surreal, id: string): Promise<any> {
  const [rows] = await db.query<[any[]]>(
    `SELECT * FROM type::thing($id);`,
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
      `UPDATE type::thing($id) SET title = $title;`,
      { id, title: data.title }
    );
  }
  if (data.description !== undefined) {
    await db.query(
      `UPDATE type::thing($id) SET description = $desc;`,
      { id, desc: data.description }
    );
  }
  if (data.list !== undefined) {
    await db.query(
      `UPDATE type::thing($id) SET list = type::thing($lid);`,
      { id, lid: data.list }
    );
  }
  if (data.position !== undefined) {
    await db.query(
      `UPDATE type::thing($id) SET position = $pos;`,
      { id, pos: data.position }
    );
  }
}

export async function deleteCard(db: Surreal, id: string): Promise<void> {
  await db.query(`DELETE type::thing($id);`, { id });
}

export async function moveCard(
  db: Surreal,
  cardId: string,
  newListId: string,
  newPosition: number
): Promise<void> {
  await db.query(
    `UPDATE type::thing($id) SET list = type::thing($lid), position = $pos;`,
    { id: cardId, lid: newListId, pos: newPosition }
  );
}
