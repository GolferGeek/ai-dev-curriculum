export { getConnection, getRootConnection, SURREAL_URL, SURREAL_NS, SURREAL_DB } from "./connection.js";
export { signup, signin, authenticateWithToken } from "./auth.js";
export type { SignupParams, SigninParams } from "./auth.js";
export {
  createInvoice,
  listInvoices,
  getInvoice,
  getLineItems,
  markInvoicePaid,
  createExpense,
  listExpenses,
  getDashboardData,
} from "./queries.js";
export type { CreateInvoiceInput, CreateExpenseInput, DashboardData } from "./queries.js";

// ─── Trello exports ──────────────────────────────────────────
export {
  getTrelloConnection,
  trelloSignup,
  trelloSignin,
  getTrelloAuthenticatedDb,
  TRELLO_NS,
  TRELLO_DB,
} from "./trello-auth.js";
export {
  listBoards,
  createBoard,
  getBoard,
  deleteBoard,
  getListsForBoard,
  createList,
  updateList,
  deleteList,
  getCardsForList,
  createCard,
  getCard,
  updateCard,
  deleteCard,
  moveCard,
} from "./trello-queries.js";
