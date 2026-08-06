import fs from "node:fs";
import path from "node:path";
import type { ProgramDocument, ProgramNode, ProgramProfile } from "./types";

const PROFILE_FILES = ["PROFILE-FULL.json", "PROFILE-ESSENTIAL.json", "PROFILE-LIGHT.json"];

function parseProfile(root: string, filename: string): ProgramProfile {
  const absolutePath = path.join(root, filename);
  const value = JSON.parse(fs.readFileSync(absolutePath, "utf8")) as Partial<ProgramProfile>;
  const requiredStrings = ["id", "label", "description", "audience", "limitations"] as const;
  for (const key of requiredStrings) {
    if (typeof value[key] !== "string" || value[key]?.trim().length === 0) {
      throw new Error(`${filename} is missing a valid ${key}.`);
    }
  }
  const requiredLists = ["includedFolders", "includedDocuments", "expansionTriggers"] as const;
  for (const key of requiredLists) {
    if (!Array.isArray(value[key]) || !value[key]?.every((item) => typeof item === "string")) {
      throw new Error(`${filename} is missing a valid ${key} list.`);
    }
  }
  return value as ProgramProfile;
}

export function loadProgramProfiles(root: string): ProgramProfile[] {
  return PROFILE_FILES.map((filename) => parseProfile(root, filename));
}

export function selectProgramProfile(root: string, requested?: string): {
  profile: ProgramProfile;
  profiles: ProgramProfile[];
} {
  const profiles = loadProgramProfiles(root);
  const normalized = requested?.toLowerCase();
  const profile = profiles.find((candidate) => candidate.id === normalized) ?? profiles[0];
  return { profile, profiles };
}

function includesAll(values: string[]): boolean {
  return values.includes("*");
}

function folderIncluded(slug: string, profile: ProgramProfile): boolean {
  if (slug === "" || includesAll(profile.includedFolders)) return true;
  return profile.includedFolders.includes(slug);
}

function folderIsAncestor(slug: string, profile: ProgramProfile): boolean {
  if (slug === "" || includesAll(profile.includedFolders)) return true;
  return profile.includedFolders.some((included) => included.startsWith(`${slug}/`));
}

export function filterProgramNode(node: ProgramNode, profile: ProgramProfile): ProgramNode | undefined {
  if (!folderIncluded(node.slug, profile) && !folderIsAncestor(node.slug, profile)) return undefined;
  return {
    ...node,
    children: node.children
      .map((child) => filterProgramNode(child, profile))
      .filter((child): child is ProgramNode => Boolean(child)),
  };
}

export function documentIncluded(document: ProgramDocument, profile: ProgramProfile): boolean {
  if (includesAll(profile.includedDocuments) || includesAll(profile.includedFolders)) return true;
  if (!document.sourcePath.includes("/")) {
    return profile.includedDocuments.includes(document.sourcePath);
  }
  return folderIncluded(document.folderSlug, profile) || folderIsAncestor(document.folderSlug, profile);
}
