export { getConnection, getRootConnection, SURREAL_URL, SURREAL_NS, SURREAL_DB } from "./connection";
export { signup, signin, authenticateWithToken } from "./auth";
export type { SignupParams, SigninParams } from "./auth";
export {
  createInvoice,
  listInvoices,
  getInvoice,
  getLineItems,
  markInvoicePaid,
  createExpense,
  listExpenses,
  getDashboardData,
} from "./queries";
export type { CreateInvoiceInput, CreateExpenseInput, DashboardData } from "./queries";
export type { Invoice, LineItem, Expense, User, AggregateRow, Board, TrelloList, Card } from "./types";

// ─── Trello exports ──────────────────────────────────────────
export {
  getTrelloConnection,
  trelloSignup,
  trelloSignin,
  getTrelloAuthenticatedDb,
  TRELLO_NS,
  TRELLO_DB,
} from "./trello-auth";
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
} from "./trello-queries";
