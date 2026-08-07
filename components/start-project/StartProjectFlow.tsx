"use client";

import { useState } from "react";
import { detectCurrency, loadStoredCurrency, storeCurrency, type Currency } from "@/lib/currency";
import {
  emptyBookingData,
  qualifyLead,
  submitBooking,
  trackEvent,
  type BookedSlot,
  type BookingData,
} from "@/lib/booking";
import ProgressIndicator from "@/components/start-project/ProgressIndicator";
import Step1Contact from "@/components/start-project/Step1Contact";
import Step2ProjectType from "@/components/start-project/Step2ProjectType";
import Step3GoalBudgetTimeline from "@/components/start-project/Step3GoalBudgetTimeline";
import Step4Schedule from "@/components/start-project/Step4Schedule";
import LowFitResource from "@/components/start-project/LowFitResource";
import Confirmation from "@/components/start-project/Confirmation";

type Stage = 1 | 2 | 3 | 4 | "low-fit" | "confirmed";

export default function StartProjectFlow() {
  const [stage, setStage] = useState<Stage>(1);
  const [data, setData] = useState<BookingData>(() => ({
    ...emptyBookingData,
    currency: loadStoredCurrency() ?? detectCurrency(),
  }));
  const [bookedSlot, setBookedSlot] = useState<BookedSlot | null>(null);

  function goToStep3() {
    trackEvent("step_complete", { step: 2 });
    setStage(3);
  }

  function afterStep3() {
    trackEvent("step_complete", { step: 3, budgetAmount: data.budgetAmount, timeline: data.timeline });
    const fit = qualifyLead(data);
    setStage(fit === "low-fit" ? "low-fit" : 4);
  }

  function handleCurrencyChange(next: Currency) {
    storeCurrency(next);
    setData((d) => ({ ...d, currency: next }));
  }

  async function handleBooked(slot: BookedSlot) {
    setBookedSlot(slot);
    trackEvent("booking_confirmed", { hasStartTime: Boolean(slot.startTime) });
    await submitBooking(data, slot);
    setStage("confirmed");
  }

  const progressStep = typeof stage === "number" ? stage : stage === "low-fit" ? 3 : 4;

  return (
    <div className="mx-auto w-full max-w-2xl px-6 pb-24 sm:px-10">
      {stage !== "confirmed" && <ProgressIndicator step={progressStep} />}

      <div className="mt-10 rounded-3xl border border-border bg-background p-6 sm:p-10">
        {stage === 1 && (
          <Step1Contact
            data={data.contact}
            onChange={(contact) => setData((d) => ({ ...d, contact }))}
            onContinue={() => {
              trackEvent("step_complete", { step: 1 });
              setStage(2);
            }}
          />
        )}

        {stage === 2 && (
          <Step2ProjectType
            projectType={data.projectType}
            projectTypeOther={data.projectTypeOther}
            onChange={(projectType, projectTypeOther) =>
              setData((d) => ({ ...d, projectType, projectTypeOther }))
            }
            onContinue={goToStep3}
            onBack={() => setStage(1)}
          />
        )}

        {stage === 3 && (
          <Step3GoalBudgetTimeline
            goal={data.goal}
            budgetAmount={data.budgetAmount}
            currency={data.currency}
            timeline={data.timeline}
            onChange={(patch) => setData((d) => ({ ...d, ...patch }))}
            onCurrencyChange={handleCurrencyChange}
            onContinue={afterStep3}
            onBack={() => setStage(2)}
          />
        )}

        {stage === "low-fit" && <LowFitResource onBookAnyway={() => setStage(4)} />}

        {stage === 4 && (
          <Step4Schedule
            contact={data.contact}
            onBooked={handleBooked}
            onBack={() => setStage(3)}
          />
        )}

        {stage === "confirmed" && bookedSlot && <Confirmation data={data} slot={bookedSlot} />}
      </div>
    </div>
  );
}
