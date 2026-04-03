export type RequestDef = {
  id: string;
  name: string;
  method: string;
  url: string;
  headersText?: string;
  body?: string;
};

export type Collection = {
  id: string;
  name: string;
  requests: RequestDef[];
};

export type Environment = {
  id: string;
  name: string;
  vars: Record<string, string>;
};

export type HistoryEntry = {
  id: string;
  at: number;
  method: string;
  url: string;
  status: number;
  ms: number;
  snippet: string;
  error?: string;
};

export type AppState = {
  collections: Collection[];
  environments: Environment[];
  history: HistoryEntry[];
  activeEnvId: string;
  activeCollectionId: string;
  activeRequestId: string;
};

export function defaultState(): AppState {
  const c1 = "coll-demo";
  const r1 = "req-get";
  const r2 = "req-post";
  const e1 = "env-httpbin";
  const e2 = "env-alt";
  return {
    collections: [
      {
        id: c1,
        name: "Demo",
        requests: [
          {
            id: r1,
            name: "httpbin GET",
            method: "GET",
            url: "{{baseUrl}}/get",
            headersText: '{"Accept":"application/json"}',
          },
          {
            id: r2,
            name: "httpbin POST",
            method: "POST",
            url: "{{baseUrl}}/post",
            body: '{"hello":"world"}',
            headersText: '{"Content-Type":"application/json"}',
          },
        ],
      },
    ],
    environments: [
      {
        id: e1,
        name: "Public httpbin",
        vars: { baseUrl: "https://httpbin.org" },
      },
      {
        id: e2,
        name: "Alt label",
        vars: { baseUrl: "https://httpbin.org" },
      },
    ],
    history: [],
    activeEnvId: e1,
    activeCollectionId: c1,
    activeRequestId: r1,
  };
}
