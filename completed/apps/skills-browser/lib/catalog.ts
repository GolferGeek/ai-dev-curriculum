import catalogData from "@/data/catalog.json";
import type { Catalog, CapabilityEntry } from "@/lib/types";
export const catalog = catalogData as Catalog;

export function getCapability(id: string): CapabilityEntry | undefined {
  return catalog.capabilities.find((entry) => entry.id === id);
}

export function categoryLabel(value: string): string {
  return value.split("-").map((part) => part[0]?.toUpperCase() + part.slice(1)).join(" ");
}
