"use client";

import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await signOut(auth);
    router.push("/auth");
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="rounded-full border border-border bg-surface px-4 py-2 text-sm text-foreground-muted transition-colors hover:text-foreground"
    >
      Sign out
    </button>
  );
}
