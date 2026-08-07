import { logEvent } from "firebase/analytics";
import { analyticsPromise } from "@/lib/firebase";
import type { AnalyticsEvent } from "@/lib/booking";

export async function firebaseTrackEvent(
  name: AnalyticsEvent,
  payload?: Record<string, unknown>,
) {
  try {
    const analytics = await analyticsPromise;
    if (!analytics) return;
    logEvent(analytics, name, payload ?? {});
  } catch {
    // Analytics must never break the user flow
  }
}
