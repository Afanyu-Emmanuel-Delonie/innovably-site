import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { firebaseTrackEvent } from "@/lib/firebase-analytics";
import type { Currency } from "@/lib/currency";

export type ProjectType =
  | "New build"
  | "Redesign / revamp"
  | "Integration with existing systems"
  | "Ongoing support / retainer"
  | "Other";

export const PROJECT_TYPES: ProjectType[] = [
  "New build",
  "Redesign / revamp",
  "Integration with existing systems",
  "Ongoing support / retainer",
  "Other",
];

/** Minimum budget floor per currency (in whole units) */
export const BUDGET_FLOOR: Record<Currency, number> = {
  USD: 5000,
  EUR: 5000,
  RWF: 300000,
};

/** Currency symbol/code for display */
export const CURRENCY_SYMBOL: Record<Currency, string> = {
  USD: "$",
  EUR: "€",
  RWF: "FRw",
};

export type ContactInfo = {
  name: string;
  email: string;
  company: string;
  role: string;
};

export type BookingData = {
  contact: ContactInfo;
  projectType: ProjectType | null;
  projectTypeOther: string;
  goal: string;
  budgetAmount: string;   // raw input string, empty = not provided
  currency: Currency;
  timeline: string;       // free-text, empty = not provided
};

export const emptyBookingData: BookingData = {
  contact: { name: "", email: "", company: "", role: "" },
  projectType: null,
  projectTypeOther: "",
  goal: "",
  budgetAmount: "",
  currency: "USD",
  timeline: "",
};

/**
 * Route low-fit visitors to a self-serve resource instead of the calendar.
 * Budget is optional so we only flag low-fit when both signals are present.
 */
export function qualifyLead(data: Pick<BookingData, "budgetAmount" | "currency">): "fit" | "low-fit" {
  const amount = parseFloat(data.budgetAmount.replace(/,/g, ""));
  const floor = BUDGET_FLOOR[data.currency];
  const belowFloor = !isNaN(amount) && amount > 0 && amount < floor;
  return belowFloor ? "low-fit" : "fit";
}

export type BookedSlot = {
  // Calendly's postMessage event doesn't reliably include the booked start
  // time without an authenticated API call we don't have credentials for
  // yet — left optional so the confirmation screen degrades gracefully to
  // "check your email" instead of fabricating a time.
  startTime?: string; // ISO string
  eventName?: string;
};

export async function submitBooking(data: BookingData, slot: BookedSlot): Promise<void> {
  try {
    await addDoc(collection(db, "bookings"), {
      contact: data.contact,
      projectType: data.projectType,
      projectTypeOther: data.projectTypeOther || null,
      goal: data.goal,
      budgetAmount: data.budgetAmount || null,
      currency: data.currency,
      timeline: data.timeline || null,
      bookedSlot: slot,
      submittedAt: serverTimestamp(),
    });
  } catch (err) {
    console.error("[start-a-project] failed to save booking", err);
  }
}

export type AnalyticsEvent =
  | "step_view"
  | "step_complete"
  | "currency_change"
  | "booking_confirmed";

export function trackEvent(name: AnalyticsEvent, payload?: Record<string, unknown>) {
  firebaseTrackEvent(name, payload);
}
