export type Currency = "USD" | "ZiG";
export type Service = { id: string; name: string; provider: string; category: string; lookup: string };
export const categories = ["Government", "Utilities", "Transport", "Education", "Health", "Insurance"] as const;
// Sample confirmed services (demo data — real list follows signed agreements)
export const services: Service[] = [
  { id: "zesa", name: "ZESA Electricity", provider: "ZETDC", category: "Utilities", lookup: "Meter number" },
  { id: "water", name: "Harare Water", provider: "City of Harare", category: "Utilities", lookup: "Customer number" },
  { id: "zinara", name: "Vehicle Licence", provider: "ZINARA", category: "Transport", lookup: "Vehicle registration" },
  { id: "fines", name: "Traffic Fines", provider: "ZRP", category: "Transport", lookup: "Ticket number" },
  { id: "zimra", name: "Income Tax", provider: "ZIMRA", category: "Government", lookup: "National ID" },
  { id: "passport", name: "Passport Fees", provider: "Registrar General", category: "Government", lookup: "Reference number" },
  { id: "school", name: "School Fees", provider: "Partner schools", category: "Education", lookup: "Student number" },
  { id: "hospital", name: "Hospital Bills", provider: "Parirenyatwa", category: "Health", lookup: "Patient number" },
  { id: "insure", name: "Motor Insurance", provider: "Partner insurers", category: "Insurance", lookup: "Policy number" },
];
export type Bill = { id: string; serviceId: string; ref: string; amountMinor: number; currency: Currency; due: string };
export const myBills: Bill[] = [
  { id: "b1", serviceId: "zesa", ref: "Meter 0412 7781 223", amountMinor: 2450, currency: "USD", due: "2026-12-02" },
  { id: "b2", serviceId: "water", ref: "Acct HW-883120", amountMinor: 185000, currency: "ZiG", due: "2026-12-05" },
  { id: "b3", serviceId: "zinara", ref: "AEZ 4471", amountMinor: 4000, currency: "USD", due: "2026-11-30" },
  { id: "b4", serviceId: "school", ref: "Student 22-0915", amountMinor: 32000, currency: "USD", due: "2027-01-10" },
];
export const receipts = [
  { id: "GC-8F2K-19QA", service: "ZESA Electricity", amountMinor: 2000, currency: "USD" as Currency, date: "2026-11-18 09:42", status: "completed" },
  { id: "GC-7D1M-55TR", service: "Vehicle Licence", amountMinor: 4000, currency: "USD" as Currency, date: "2026-10-30 14:10", status: "completed" },
  { id: "GC-6B9X-02LP", service: "Harare Water", amountMinor: 172000, currency: "ZiG" as Currency, date: "2026-10-04 08:05", status: "provider_pending" },
];
export const notifications = [
  { t: "Vehicle licence due in 5 days", d: "AEZ 4471 · USD 40.00", kind: "reminder" },
  { t: "Payment confirmed", d: "ZESA token issued · GC-8F2K-19QA", kind: "success" },
  { t: "Tax deadline approaching", d: "ZIMRA QPD due 25 December", kind: "notice" },
  { t: "Scheduled electricity maintenance", d: "Avondale, Sat 08:00–14:00", kind: "notice" },
];
export const offices = [
  { name: "ZIMRA Kurima House", city: "Harare", type: "ZIMRA" }, { name: "ZIMRA Bulawayo Region", city: "Bulawayo", type: "ZIMRA" },
  { name: "ZIMRA Mutare", city: "Mutare", type: "ZIMRA" }, { name: "ZIMRA Gweru", city: "Gweru", type: "ZIMRA" },
  { name: "ZINARA Head Office", city: "Harare", type: "ZINARA" }, { name: "ZINARA Bulawayo", city: "Bulawayo", type: "ZINARA" },
  { name: "ZINARA Masvingo", city: "Masvingo", type: "ZINARA" }, { name: "Harare Town House", city: "Harare", type: "Council" },
  { name: "Bulawayo City Hall", city: "Bulawayo", type: "Council" }, { name: "Chitungwiza Civic Centre", city: "Chitungwiza", type: "Council" },
];
export const methods = ["EcoCash", "OneMoney", "ZIPIT", "Visa / Mastercard", "Bank transfer"];
export const fmt = (minor: number, c: Currency) => `${c} ${(minor / 100).toLocaleString("en-US", { minimumFractionDigits: 2 })}`;
export const svc = (id: string) => services.find((s) => s.id === id)!;
export function totalsByCurrency(bills: { amountMinor: number; currency: Currency }[]) {
  const t: Partial<Record<Currency, number>> = {};
  for (const b of bills) t[b.currency] = (t[b.currency] ?? 0) + b.amountMinor;
  return t;
}
