"use client";

import type { ProgramProfile } from "@/src/lib/types";
import { useRouter } from "next/navigation";

export function ProfileSelector({ active, profiles }: { active: ProgramProfile; profiles: ProgramProfile[] }) {
  const router = useRouter();
  return (
    <label className="profile-selector">
      <span>Program view</span>
      <select
        aria-label="AI Program profile"
        onChange={(event) => {
          document.cookie = `ai-program-profile=${encodeURIComponent(event.target.value)}; Path=/; Max-Age=31536000; SameSite=Lax`;
          router.replace("/");
          router.refresh();
        }}
        value={active.id}
      >
        {profiles.map((profile) => <option key={profile.id} value={profile.id}>{profile.label}</option>)}
      </select>
    </label>
  );
}
