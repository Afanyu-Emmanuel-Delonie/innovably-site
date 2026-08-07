"use client";

import Link from "next/link";
import { MdCheckCircle, MdDownload, MdEvent } from "react-icons/md";
import { CURRENCY_SYMBOL, type BookedSlot, type BookingData } from "@/lib/booking";

function formatIcsDate(date: Date) {
  return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

function googleCalendarUrl(slot: BookedSlot) {
  if (!slot.startTime) return null;
  const start = new Date(slot.startTime);
  const end = new Date(start.getTime() + 30 * 60 * 1000);
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: "Innovably intro call",
    dates: `${formatIcsDate(start)}/${formatIcsDate(end)}`,
    details: "Intro call booked via innovably.cloud",
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function downloadIcs(slot: BookedSlot) {
  if (!slot.startTime) return;
  const start = new Date(slot.startTime);
  const end = new Date(start.getTime() + 30 * 60 * 1000);
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "BEGIN:VEVENT",
    `DTSTART:${formatIcsDate(start)}`,
    `DTEND:${formatIcsDate(end)}`,
    "SUMMARY:Innovably intro call",
    "DESCRIPTION:Intro call booked via innovably.cloud",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([ics], { type: "text/calendar" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "innovably-intro-call.ics";
  a.click();
  URL.revokeObjectURL(url);
}

export default function Confirmation({ data, slot }: { data: BookingData; slot: BookedSlot }) {
  const gcalUrl = googleCalendarUrl(slot);
  const budgetAmount = Number(data.budgetAmount);
  const budgetLabel =
    data.budgetAmount.trim() && !Number.isNaN(budgetAmount)
      ? `${CURRENCY_SYMBOL[data.currency]}${budgetAmount.toLocaleString()}`
      : null;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col items-center gap-3 text-center">
        <MdCheckCircle className="h-12 w-12 text-primary" />
        <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          You&apos;re booked.
        </h2>
        {slot.startTime ? (
          <p className="text-base text-foreground-muted">
            {new Date(slot.startTime).toLocaleString(undefined, {
              weekday: "long",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "2-digit",
            })}
          </p>
        ) : (
          <p className="max-w-sm text-base text-foreground-muted">
            Check your email for the exact time and a calendar invite from the scheduler.
          </p>
        )}
      </div>

      {slot.startTime && (
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          {gcalUrl && (
            <a
              href={gcalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 items-center justify-center gap-2 rounded-full border border-border bg-surface px-5 text-sm font-medium text-foreground transition-colors hover:border-border-strong hover:bg-surface-2"
            >
              <MdEvent className="h-4 w-4" />
              Add to Google Calendar
            </a>
          )}
          <button
            type="button"
            onClick={() => downloadIcs(slot)}
            className="flex h-11 items-center justify-center gap-2 rounded-full border border-border bg-surface px-5 text-sm font-medium text-foreground transition-colors hover:border-border-strong hover:bg-surface-2"
          >
            <MdDownload className="h-4 w-4" />
            Download .ics
          </button>
        </div>
      )}

      <div className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-6">
        <span className="label">What we received</span>
        <dl className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-foreground-subtle">Name</dt>
            <dd className="text-foreground">{data.contact.name}</dd>
          </div>
          <div>
            <dt className="text-foreground-subtle">Company</dt>
            <dd className="text-foreground">{data.contact.company}</dd>
          </div>
          <div>
            <dt className="text-foreground-subtle">Project type</dt>
            <dd className="text-foreground">
              {data.projectType === "Other" ? data.projectTypeOther : data.projectType}
            </dd>
          </div>
          {data.timeline && (
            <div>
              <dt className="text-foreground-subtle">Timeline</dt>
              <dd className="text-foreground">{data.timeline}</dd>
            </div>
          )}
          {budgetLabel && (
            <div>
              <dt className="text-foreground-subtle">Budget</dt>
              <dd className="text-foreground">{budgetLabel}</dd>
            </div>
          )}
          <div className="sm:col-span-2">
            <dt className="text-foreground-subtle">Goal</dt>
            <dd className="text-foreground">{data.goal}</dd>
          </div>
        </dl>
      </div>

      <Link
        href="/"
        className="mx-auto flex h-12 w-fit items-center justify-center rounded-full border border-border bg-surface px-6 text-base font-medium text-foreground transition-colors duration-[var(--duration-base)] ease-out-quart hover:border-border-strong hover:bg-surface-2"
      >
        Back to homepage
      </Link>
    </div>
  );
}
