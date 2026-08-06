import type { ProgramMetadata } from "@/src/lib/types";

function value(metadata: ProgramMetadata, key: string, fallback = "Not recorded"): string {
  const result = metadata[key];
  return typeof result === "string" ? result : fallback;
}

export function MetadataChips({ metadata }: { metadata: ProgramMetadata }) {
  const items = [
    ["Status", value(metadata, "status")],
    ["Owner", value(metadata, "owner")],
    ["Approved by", value(metadata, "approved-by")],
    ["Scope", value(metadata, "applies-to")],
    ["Last reviewed", value(metadata, "last-reviewed")],
    ["Next review", value(metadata, "next-review")],
  ];

  return (
    <dl className="metadata-grid">
      {items.map(([label, itemValue]) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd className={itemValue === "UNASSIGNED" || itemValue === "Not recorded" ? "metadata-gap" : ""}>
            {itemValue}
          </dd>
        </div>
      ))}
    </dl>
  );
}
