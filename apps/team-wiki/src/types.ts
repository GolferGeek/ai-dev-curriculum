export type Page = {
  id: string;
  spaceId: string;
  title: string;
  body: string;
  updatedAt: number;
};

export type Space = {
  id: string;
  name: string;
};

export type WikiState = {
  spaces: Space[];
  pages: Page[];
  selectedPageId: string | null;
};

const now = () => Date.now();

export function defaultWiki(): WikiState {
  const sEng = "space-eng";
  const sOps = "space-ops";
  return {
    spaces: [
      { id: sEng, name: "Engineering" },
      { id: sOps, name: "Operations" },
    ],
    pages: [
      {
        id: "p-deploy",
        spaceId: sEng,
        title: "Deploy checklist",
        body: "## Steps\n1. Run tests\n2. **Merge** to main",
        updatedAt: now(),
      },
      {
        id: "p-oncall",
        spaceId: sEng,
        title: "On-call tips",
        body: "Check dashboards first.",
        updatedAt: now(),
      },
      {
        id: "p-runbook",
        spaceId: sOps,
        title: "Incident runbook",
        body: "# When pager fires\n- Ack within 5m\n- Open bridge",
        updatedAt: now(),
      },
      {
        id: "p-playbook",
        spaceId: sOps,
        title: "Postmortem playbook",
        body: "Template for blameless review.",
        updatedAt: now(),
      },
    ],
    selectedPageId: "p-runbook",
  };
}
