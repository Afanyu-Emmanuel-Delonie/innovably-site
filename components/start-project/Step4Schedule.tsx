"use client";

import { useEffect } from "react";
import type { ContactInfo, BookedSlot } from "@/lib/booking";

const SCHEDULING_URL = "https://cal.com/innovably/quick-chat";

export default function Step4Schedule({
  contact,
  onBooked,
  onBack,
}: {
  contact: ContactInfo;
  onBooked: (slot: BookedSlot) => void;
  onBack: () => void;
}) {
  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.origin !== "https://cal.com") return;
      const data = event.data;
      if (data?.type === "CAL:bookingSuccessful" || data?.type === "bookingSuccessful") {
        onBooked({ startTime: data.date ?? data.payload?.startTime });
      }
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [onBooked]);

  const embedUrl = `${SCHEDULING_URL}?name=${encodeURIComponent(
    contact.name,
  )}&email=${encodeURIComponent(contact.email)}&embed=true`;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Pick a time that works for you.
        </h2>
        <p className="mt-2 text-base text-foreground-muted">
          Your time zone is detected automatically — you can change it in the calendar below.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-surface">
        <iframe
          src={embedUrl}
          title="Book a call with Innovably"
          width="100%"
          height="700"
          style={{ border: 0 }}
        />
      </div>

      <div className="flex flex-col items-center gap-3 border-t border-border pt-6 text-center">
        <p className="text-sm text-foreground-muted">Already picked a time above?</p>
        <button
          type="button"
          onClick={() => onBooked({})}
          className="flex h-11 items-center justify-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors duration-[var(--duration-base)] ease-out-quart hover:bg-primary-600"
        >
          I&apos;ve booked my call
        </button>
      </div>

      <button
        type="button"
        onClick={onBack}
        className="flex h-12 w-fit items-center justify-center rounded-full border border-border bg-surface px-6 text-base font-medium text-foreground transition-colors duration-[var(--duration-base)] ease-out-quart hover:border-border-strong hover:bg-surface-2"
      >
        Back
      </button>
    </div>
  );
}
