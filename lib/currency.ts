export type Currency = "EUR" | "USD" | "RWF";

const STORAGE_KEY = "innovably-currency";

const REGION_CURRENCY: Record<string, Currency> = {
  RW: "RWF",
  US: "USD",
};

const EURO_REGIONS = [
  "AT", "BE", "CY", "DE", "EE", "ES", "FI", "FR", "GR", "HR", "IE",
  "IT", "LT", "LU", "LV", "MT", "NL", "PT", "SI", "SK",
];

export function detectCurrency(): Currency {
  if (typeof navigator === "undefined") return "USD";

  try {
    const locale = navigator.language || "en-US";
    const region = new Intl.Locale(locale).maximize().region;
    if (region && region in REGION_CURRENCY) return REGION_CURRENCY[region];
    if (region && EURO_REGIONS.includes(region)) return "EUR";
  } catch {
    // Intl.Locale unsupported or unparsable — fall through to default.
  }

  return "USD";
}

export function loadStoredCurrency(): Currency | null {
  if (typeof window === "undefined") return null;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "EUR" || stored === "USD" || stored === "RWF" ? stored : null;
}

export function storeCurrency(currency: Currency) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, currency);
}
