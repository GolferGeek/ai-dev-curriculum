import "server-only";
import { cookies } from "next/headers";
import { loadProgramSnapshot } from "./program";

export async function loadActiveProgramSnapshot() {
  const store = await cookies();
  return loadProgramSnapshot({ profile: store.get("ai-program-profile")?.value });
}
