// Seasonal dating system — single source of truth for active holidays,
// navigation links, hero content, and announcement bar messaging.

export interface Holiday {
  handle: string;
  label: string;
  heroTagline: string;
  announcementMessage: string;
  dateRange: { startMonth: number; startDay: number; endMonth: number; endDay: number };
  alwaysActive?: boolean;
}

// Date ranges are inclusive. Adjust start dates to control lead-time.
const HOLIDAYS: Holiday[] = [
  {
    handle: "teacher",
    label: "Teacher Gifts",
    heroTagline: "Teacher Appreciation \u00b7 New arrivals",
    announcementMessage: "Teacher Appreciation Week is coming \u2726 Shop gifts they\u2019ll actually love",
    dateRange: { startMonth: 4, startDay: 10, endMonth: 5, endDay: 15 },
  },
  {
    handle: "pride",
    label: "Pride",
    heroTagline: "Pride \u00b7 Celebrate love",
    announcementMessage: "Pride Collection is here \u2726 Celebrate love in every color",
    dateRange: { startMonth: 4, startDay: 15, endMonth: 6, endDay: 30 },
  },
  {
    handle: "fourth-of-july",
    label: "Fourth of July",
    heroTagline: "Fourth of July \u00b7 Summer favorites",
    announcementMessage: "Fourth of July drops are live \u2726 Red, white & cute",
    dateRange: { startMonth: 4, startDay: 15, endMonth: 7, endDay: 5 },
  },
  {
    handle: "bachelorette",
    label: "Bachelorette",
    heroTagline: "Bachelorette season \u00b7 New arrivals",
    announcementMessage: "Bachelorette season is here \u2726 Matching sets, party tees & more",
    alwaysActive: true,
    dateRange: { startMonth: 1, startDay: 1, endMonth: 12, endDay: 31 },
  },
];

function isDayInRange(
  month: number,
  day: number,
  range: Holiday["dateRange"]
): boolean {
  const current = month * 100 + day;
  const start = range.startMonth * 100 + range.startDay;
  const end = range.endMonth * 100 + range.endDay;

  // Handle ranges that wrap around the year (e.g., Nov 15 – Jan 15)
  if (start <= end) {
    return current >= start && current <= end;
  }
  return current >= start || current <= end;
}

export function getActiveHolidays(date: Date = new Date()): Holiday[] {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return HOLIDAYS.filter(
    (h) => h.alwaysActive || isDayInRange(month, day, h.dateRange)
  );
}

const STATIC_LINKS = [
  { label: "Shop All", href: "/collections" },
  { label: "New Arrivals", href: "/collections/new-arrivals" },
  { label: "Best Sellers", href: "/collections/best-sellers" },
];

export function getNavLinks(
  date?: Date
): { label: string; href: string }[] {
  const active = getActiveHolidays(date);
  const holidayLinks = active.map((h) => ({
    label: h.label,
    href: `/collections/${h.handle}`,
  }));
  return [...STATIC_LINKS, ...holidayLinks];
}

export function getHeroContent(date?: Date): {
  tagline: string;
  subtitle: string;
} {
  const active = getActiveHolidays(date);
  // Use the first non-always-active holiday for the hero, or fall back
  const primary = active.find((h) => !h.alwaysActive) ?? active[0];
  if (!primary) {
    return {
      tagline: "New arrivals \u00b7 Shop now",
      subtitle:
        "Curated shirts, sweaters & personalized gifts \u2014 from our small town to your doorstep.",
    };
  }
  return {
    tagline: primary.heroTagline,
    subtitle:
      "Curated shirts, sweaters & personalized gifts \u2014 from our small town to your doorstep.",
  };
}

export function getAnnouncementMessages(date?: Date): string[] {
  const active = getActiveHolidays(date);
  const seasonal = active
    .filter((h) => !h.alwaysActive)
    .map((h) => h.announcementMessage);
  return [
    "Free shipping over $75 \u2726 Easy 30-day returns",
    "New here? Use WELCOME15 for 15% off your first order",
    "Bundle & save \u2726 2 for $40 tees \u00b7 2 for $60 sweatshirts",
    "Love It Guarantee \u2726 Not happy? We\u2019ll make it right.",
    ...seasonal,
  ];
}
