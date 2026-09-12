// @vitest-environment jsdom
import { afterEach, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MorningCheckIn from "./MorningCheckIn";
import { SyncProvider, useSync } from "./SyncProvider";
import { localToday, resolveToday, utcToday } from "@/lib/date";

const h = vi.hoisted(() => ({ api: vi.fn() }));
vi.mock("@/lib/client-api", () => ({ api: h.api }));

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.unstubAllEnvs();
  vi.clearAllMocks();
});

function TodayProbe() {
  const { state } = useSync();
  return <p>Refreshed date: {state?.completedDates[0] ?? "none"}</p>;
}

it.each([
  { timezone: "Europe/Ljubljana", instant: "2026-09-11T22:30:00Z", local: "2026-09-12", utc: "2026-09-11" },
  { timezone: "America/Los_Angeles", instant: "2026-09-12T01:30:00Z", local: "2026-09-11", utc: "2026-09-12" },
])("refreshes the applied day's state across the UTC boundary in $timezone", async ({ timezone, instant, local, utc }) => {
  vi.stubEnv("TZ", timezone);
  vi.useFakeTimers({ toFake: ["Date"] });
  vi.setSystemTime(new Date(instant));
  expect(localToday()).toBe(local);
  expect(utcToday()).toBe(utc);

  let applied = false;
  h.api.mockImplementation(async (url: string, init?: RequestInit) => {
    if (url === "/api/morning-check" && init?.method === "PUT") {
      expect(JSON.parse(String(init.body))).toEqual({ today: local });
      applied = true;
      return { note: "Today's session was downgraded." };
    }
    if (url.startsWith("/api/morning-check?")) {
      return {
        check: { flag: "ill", decision: "downgrade" },
        isQualityDay: true,
        hasRideToday: true,
        suggestion: null,
      };
    }
    if (url.startsWith("/api/sync")) {
      // Match the server's public date resolution, including its UTC fallback.
      const today = resolveToday(new URL(url, "http://localhost").searchParams.get("today"));
      return { todayAnalysis: null, completedDates: applied ? [today] : [] };
    }
    throw new Error(`Unexpected request: ${url}`);
  });

  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  render(
    <QueryClientProvider client={client}>
      <SyncProvider><MorningCheckIn /><TodayProbe /></SyncProvider>
    </QueryClientProvider>,
  );
  fireEvent.click(await screen.findByRole("button", { name: "Downgrade today" }));
  await screen.findByText("Today's session was downgraded.");
  expect(screen.getByText(`Refreshed date: ${local}`)).toBeTruthy();
  client.clear();
});
