"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { VersionSwitcher } from "@/components/ui/VersionSwitcher";
import { storedVersion, useVersion, type Version } from "@/lib/version";

/**
 * Therapist flow switch on the profile and booking pages. Each page belongs to one
 * version: Version 1 is the demo mentor's profile with the booking flow, Version 2 the
 * directory practice profile without booking. Choosing the other version, here or earlier
 * on the list, goes to that version's profile.
 */
export function ProfileVersionGate({ version: own, other }: { version: Version; other: string }) {
  const router = useRouter();
  const [version, setVersion] = useVersion("therapists", "v2");

  // Read storage directly: the hydration render still carries the server's default.
  useEffect(() => {
    if ((storedVersion("therapists") ?? "v2") !== own) router.replace(other);
  }, [own, other, router]);

  return (
    <VersionSwitcher
      label="Therapist flow version"
      value={version}
      onChange={(next) => {
        setVersion(next);
        if (next !== own) router.push(other);
      }}
    />
  );
}
