import { Surreal } from "surrealdb";
import type { User, Board, TrelloList } from "../src/types.js";

const SURREAL_URL = process.env.SURREAL_URL ?? "http://127.0.0.1:8000";

async function main() {
  const db = new Surreal();
  await db.connect(SURREAL_URL);
  await db.signin({
    username: process.env.SURREAL_ROOT_USER ?? "root",
    password: process.env.SURREAL_ROOT_PASS ?? "root",
  });
  await db.use({ namespace: "trello", database: "main" });

  // Create a demo user via direct insert (bypassing access layer for seeding)
  const email = "demo@example.com";
  const password = "password123";

  const [existing] = await db.query<[User[]]>(
    `SELECT * FROM user WHERE email = $email;`,
    { email }
  );

  if (existing.length === 0) {
    await db.query(
      `CREATE user SET email = $email, password = crypto::argon2::generate($pw), name = $name;`,
      { email, pw: password, name: "Demo User" }
    );
    console.log("Created demo user: demo@example.com / password123");
  } else {
    console.log("Demo user already exists.");
  }

  // Get the demo user ID
  const [users] = await db.query<[User[]]>(
    `SELECT * FROM user WHERE email = $email;`,
    { email }
  );
  const userId = users[0].id;

  // Check if boards already seeded
  const [existingBoards] = await db.query<[Board[]]>(
    `SELECT * FROM board WHERE owner = $uid;`,
    { uid: userId }
  );

  if (existingBoards.length === 0) {
    // Board 1: Project Alpha
    const [board1Result] = await db.query<[Board[]]>(
      `CREATE board SET owner = $uid, name = 'Project Alpha';`,
      { uid: userId }
    );
    const board1Id = board1Result[0].id;

    // Lists for Board 1
    const [list1Result] = await db.query<[TrelloList[]]>(
      `CREATE list SET board = $bid, name = 'To Do', position = 0;`,
      { bid: board1Id }
    );
    const [list2Result] = await db.query<[TrelloList[]]>(
      `CREATE list SET board = $bid, name = 'In Progress', position = 1;`,
      { bid: board1Id }
    );
    const [list3Result] = await db.query<[TrelloList[]]>(
      `CREATE list SET board = $bid, name = 'Done', position = 2;`,
      { bid: board1Id }
    );

    const todoId = list1Result[0].id;
    const inProgressId = list2Result[0].id;
    const doneId = list3Result[0].id;

    // Cards in To Do
    await db.query(
      `CREATE card SET list = $lid, title = 'Design landing page', description = 'Create wireframes and mockups for the main landing page', position = 0;`,
      { lid: todoId }
    );
    await db.query(
      `CREATE card SET list = $lid, title = 'Set up CI/CD pipeline', description = 'Configure GitHub Actions for automated testing and deployment', position = 1;`,
      { lid: todoId }
    );
    await db.query(
      `CREATE card SET list = $lid, title = 'Write API documentation', position = 2;`,
      { lid: todoId }
    );

    // Cards in In Progress
    await db.query(
      `CREATE card SET list = $lid, title = 'Build user authentication', description = 'Implement signup, signin, and JWT token management', position = 0;`,
      { lid: inProgressId }
    );
    await db.query(
      `CREATE card SET list = $lid, title = 'Database schema design', position = 1;`,
      { lid: inProgressId }
    );

    // Cards in Done
    await db.query(
      `CREATE card SET list = $lid, title = 'Project kickoff meeting', description = 'Initial planning session with the team', position = 0;`,
      { lid: doneId }
    );

    // Board 2: Personal Tasks
    const [board2Result] = await db.query<[Board[]]>(
      `CREATE board SET owner = $uid, name = 'Personal Tasks';`,
      { uid: userId }
    );
    const board2Id = board2Result[0].id;

    const [ptList1] = await db.query<[TrelloList[]]>(
      `CREATE list SET board = $bid, name = 'Backlog', position = 0;`,
      { bid: board2Id }
    );
    const [ptList2] = await db.query<[TrelloList[]]>(
      `CREATE list SET board = $bid, name = 'This Week', position = 1;`,
      { bid: board2Id }
    );
    const [ptList3] = await db.query<[TrelloList[]]>(
      `CREATE list SET board = $bid, name = 'Completed', position = 2;`,
      { bid: board2Id }
    );

    await db.query(
      `CREATE card SET list = $lid, title = 'Grocery shopping', position = 0;`,
      { lid: ptList1[0].id }
    );
    await db.query(
      `CREATE card SET list = $lid, title = 'Read "Designing Data-Intensive Applications"', position = 1;`,
      { lid: ptList1[0].id }
    );
    await db.query(
      `CREATE card SET list = $lid, title = 'Schedule dentist appointment', position = 0;`,
      { lid: ptList2[0].id }
    );

    console.log("Seeded 2 boards with lists and cards.");
  } else {
    console.log("Boards already seeded.");
  }

  await db.close();
  console.log("Trello seed complete.");
}

main().catch((err) => {
  console.error("Trello seed failed:", err);
  process.exit(1);
});
