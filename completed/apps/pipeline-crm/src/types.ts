export const STAGES = ["New", "Active", "Won"] as const;
export type Stage = (typeof STAGES)[number];

export type Note = { at: number; text: string };

export type Deal = {
  id: string;
  title: string;
  stage: Stage;
  owner?: string;
  amount?: number;
  notes: Note[];
};

export type CrmState = {
  deals: Deal[];
  filter: string;
  selectedId: string | null;
};

function deal(
  id: string,
  title: string,
  stage: Stage,
  owner?: string,
  amount?: number
): Deal {
  return {
    id,
    title,
    stage,
    owner,
    amount,
    notes: [{ at: Date.now(), text: "Created" }],
  };
}

export function defaultCrm(): CrmState {
  return {
    deals: [
      deal("d1", "Acme · intro", "New", "Sam", 12000),
      deal("d2", "BetaCo renewal", "Active", "Alex", 45000),
      deal("d3", "Gamma pilot", "New", "Sam"),
      deal("d4", "Delta expansion", "Active", "Jordan", 80000),
      deal("d5", "Epsilon churn risk", "Active", "Alex"),
      deal("d6", "Zeta partnership", "New", "Sam", 20000),
      deal("d7", "Eta hiring bundle", "Won", "Jordan", 15000),
      deal("d8", "Theta support upsell", "New", "Alex"),
      deal("d9", "Iota API deal", "Active", "Sam", 33000),
      deal("d10", "Kappa logo use", "Won", "Jordan"),
    ],
    filter: "",
    selectedId: null,
  };
}
