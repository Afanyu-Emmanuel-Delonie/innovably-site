"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, orderBy, query, Timestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import LogoutButton from "@/components/analytics/LogoutButton";
import type { ContactInfo, ProjectType, BookedSlot } from "@/lib/booking";

type BookingDoc = {
  id: string;
  contact: ContactInfo;
  projectType: ProjectType | null;
  projectTypeOther: string | null;
  goal: string;
  budgetAmount: string | null;
  currency: string;
  timeline: string | null;
  bookedSlot: BookedSlot;
  submittedAt: string;
};

type MessageDoc = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  topic: string | null;
  message: string;
  submittedAt: string;
};

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-5">
      <div className="text-2xl font-semibold text-foreground">{value}</div>
      <div className="mt-1 text-xs text-foreground-subtle">{label}</div>
    </div>
  );
}

export default function AnalyticsPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [bookings, setBookings] = useState<BookingDoc[]>([]);
  const [messages, setMessages] = useState<MessageDoc[]>([]);

  useEffect(() => {
    let unsubBookings = () => {};
    let unsubMessages = () => {};

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      unsubBookings();
      unsubMessages();

      if (!user) {
        router.push("/auth?next=/innovably");
        return;
      }

      // Realtime listeners — the dashboard updates live as new submissions
      // come in, no manual refresh needed.
      unsubBookings = onSnapshot(
        query(collection(db, "bookings"), orderBy("submittedAt", "desc")),
        (snap) => {
          setBookings(
            snap.docs.map((d) => {
              const raw = d.data();
              const ts = raw.submittedAt;
              return {
                id: d.id,
                contact: raw.contact,
                projectType: raw.projectType,
                projectTypeOther: raw.projectTypeOther,
                goal: raw.goal,
                budgetAmount: raw.budgetAmount,
                currency: raw.currency,
                timeline: raw.timeline,
                bookedSlot: raw.bookedSlot,
                submittedAt: ts instanceof Timestamp ? ts.toDate().toISOString() : new Date().toISOString(),
              } satisfies BookingDoc;
            }),
          );
          setReady(true);
        },
      );

      unsubMessages = onSnapshot(
        query(collection(db, "messages"), orderBy("submittedAt", "desc")),
        (snap) => {
          setMessages(
            snap.docs.map((d) => {
              const raw = d.data();
              const ts = raw.submittedAt;
              return {
                id: d.id,
                name: raw.name,
                email: raw.email,
                phone: raw.phone,
                topic: raw.topic,
                message: raw.message,
                submittedAt: ts instanceof Timestamp ? ts.toDate().toISOString() : new Date().toISOString(),
              } satisfies MessageDoc;
            }),
          );
        },
      );
    });

    return () => {
      unsubscribeAuth();
      unsubBookings();
      unsubMessages();
    };
  }, [router]);

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-sm text-foreground-subtle">Loading…</p>
      </div>
    );
  }

  const currencyCounts = bookings.reduce<Record<string, number>>((acc, b) => {
    acc[b.currency] = (acc[b.currency] || 0) + 1;
    return acc;
  }, {});

  const projectTypeCounts = bookings.reduce<Record<string, number>>((acc, b) => {
    const label = b.projectType === "Other" ? b.projectTypeOther || "Other" : b.projectType || "Unspecified";
    acc[label] = (acc[label] || 0) + 1;
    return acc;
  }, {});

  const withBudget = bookings.filter((b) => b.budgetAmount).length;
  const withTimeline = bookings.filter((b) => b.timeline).length;

  return (
    <div className="min-h-screen bg-background px-6 py-10 sm:px-10">
      <div className="mx-auto flex max-w-5xl flex-col gap-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-foreground">Analytics</h1>
          <LogoutButton />
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Stat label="Bookings submitted" value={bookings.length} />
          <Stat label="Included a budget" value={withBudget} />
          <Stat label="Included a timeline" value={withTimeline} />
          <Stat label="Distinct project types" value={Object.keys(projectTypeCounts).length} />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-border bg-surface p-6">
            <h2 className="mb-4 text-sm font-medium text-foreground-muted">Currency mix</h2>
            {Object.keys(currencyCounts).length === 0 ? (
              <p className="text-sm text-foreground-subtle">No submissions yet.</p>
            ) : (
              <div className="flex flex-col gap-2">
                {Object.entries(currencyCounts).map(([c, n]) => (
                  <div key={c} className="flex justify-between text-sm text-foreground">
                    <span>{c}</span>
                    <span className="text-foreground-subtle">{n}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-border bg-surface p-6">
            <h2 className="mb-4 text-sm font-medium text-foreground-muted">Project types</h2>
            {Object.keys(projectTypeCounts).length === 0 ? (
              <p className="text-sm text-foreground-subtle">No submissions yet.</p>
            ) : (
              <div className="flex flex-col gap-2">
                {Object.entries(projectTypeCounts).map(([t, n]) => (
                  <div key={t} className="flex justify-between text-sm text-foreground">
                    <span>{t}</span>
                    <span className="text-foreground-subtle">{n}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-border bg-surface p-6">
          <h2 className="mb-4 text-sm font-medium text-foreground-muted">Submissions</h2>
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border text-foreground-subtle">
                <th className="py-2 pr-4">Date</th>
                <th className="py-2 pr-4">Name</th>
                <th className="py-2 pr-4">Company</th>
                <th className="py-2 pr-4">Project type</th>
                <th className="py-2 pr-4">Budget</th>
                <th className="py-2 pr-4">Timeline</th>
                <th className="py-2 pr-4">Goal</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id} className="border-b border-border/60 text-foreground">
                  <td className="py-2 pr-4 whitespace-nowrap">{new Date(b.submittedAt).toLocaleString()}</td>
                  <td className="py-2 pr-4">{b.contact?.name}</td>
                  <td className="py-2 pr-4">{b.contact?.company}</td>
                  <td className="py-2 pr-4">
                    {b.projectType === "Other" ? b.projectTypeOther : b.projectType || "—"}
                  </td>
                  <td className="py-2 pr-4 whitespace-nowrap">
                    {b.budgetAmount ? `${b.budgetAmount} ${b.currency}` : "—"}
                  </td>
                  <td className="py-2 pr-4">{b.timeline || "—"}</td>
                  <td className="max-w-xs truncate py-2 pr-4">{b.goal}</td>
                </tr>
              ))}
              {bookings.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-6 text-center text-foreground-subtle">
                    No submissions yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-border bg-surface p-6">
          <h2 className="mb-4 text-sm font-medium text-foreground-muted">Contact messages</h2>
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border text-foreground-subtle">
                <th className="py-2 pr-4">Date</th>
                <th className="py-2 pr-4">Name</th>
                <th className="py-2 pr-4">Email</th>
                <th className="py-2 pr-4">Phone</th>
                <th className="py-2 pr-4">Topic</th>
                <th className="py-2 pr-4">Message</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((m) => (
                <tr key={m.id} className="border-b border-border/60 text-foreground">
                  <td className="py-2 pr-4 whitespace-nowrap">{new Date(m.submittedAt).toLocaleString()}</td>
                  <td className="py-2 pr-4">{m.name}</td>
                  <td className="py-2 pr-4">{m.email}</td>
                  <td className="py-2 pr-4">{m.phone || "—"}</td>
                  <td className="py-2 pr-4">{m.topic || "—"}</td>
                  <td className="max-w-xs truncate py-2 pr-4">{m.message}</td>
                </tr>
              ))}
              {messages.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-foreground-subtle">
                    No messages yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
