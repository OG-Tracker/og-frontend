import { products } from "@/constant/data";


const date = new Date();
const nextDay = new Date(date.getTime() + 24 * 60 * 60 * 1000);

// prettier-ignore
const nextMonth = date.getMonth() === 11 ? new Date(date.getFullYear() + 1, 0, 1) : new Date(date.getFullYear(), date.getMonth() + 1, 1)
// prettier-ignore
const prevMonth = date.getMonth() === 11 ? new Date(date.getFullYear() - 1, 0, 1) : new Date(date.getFullYear(), date.getMonth() - 1, 1)

const spendDates = [
  "2023-07-05",
  "2023-07-29",
  "2023-08-22",
  "2023-09-15",
  "2023-10-09",
  "2023-11-02",
  "2023-11-26",
  "2023-12-20",
  "2024-01-13",
  "2024-02-06",
  "2024-03-01",
  "2024-03-25",
  "2024-04-18",
  "2024-05-12",
  "2024-06-05",
  "2024-06-29",
  "2024-07-23",
  "2024-08-16",
  "2024-09-09",
  "2024-10-03",
  "2024-10-27",
  "2024-11-21",
  "2024-12-15",
  "2025-01-08",
  "2025-01-31",
  "2025-02-24",
  "2025-03-20",
  "2025-04-13",
  "2025-05-07",
  "2025-05-31",
];

const truncateTitle = (title, length = 5) => {
  return title.length > length ? title.slice(0, length) + "..." : title;
};

const transformProductsToEvents = (products) => {
  const events = [];

  products.forEach((product) => {
    const { fdate, ldate, ptitle, category, refNum, proposer } = product;
    // - ${proposer}
    const truncatedTitle = truncateTitle(`${refNum}`);

    events.push({
      title: truncatedTitle,
      start: new Date(fdate),
      end: new Date(fdate),
      allDay: true,
      extendedProps: {
        calendar: "awarded",
      },
    });

    if (ldate) {
      events.push({
        // - ${truncateTitle(proposer + " (End)")}
        title: `${refNum}`,
        start: new Date(ldate),
        end: new Date(ldate),
        allDay: true,
        extendedProps: {
          calendar: "ending",
        },
      });
    }
  });

  return events;
};

const spendPeriodEvents = spendDates.map((date) => ({
  title: "Spend Period",
  start: new Date(date),
  end: new Date(date),
  allDay: true,
  extendedProps: {
    calendar: "spends",
  },
}));

export const calendarEvents = [
  ...transformProductsToEvents(products),
  ...spendPeriodEvents,
];

// Additional static events if needed
const staticEvents = [
  {
    title: "All Day Event",
    start: date,
    end: nextDay,
    allDay: false,
    extendedProps: {
      calendar: "spends",
    },
  },
  {
    title: "Meeting With Clients",
    start: new Date(date.getFullYear(), date.getMonth() + 1, -11),
    end: new Date(date.getFullYear(), date.getMonth() + 1, -10),
    allDay: true,
    extendedProps: {
      calendar: "personal",
    },
  },
  {
    title: "Lunch",
    allDay: true,
    start: new Date(date.getFullYear(), date.getMonth() + 1, -9),
    end: new Date(date.getFullYear(), date.getMonth() + 1, -7),
    extendedProps: {
      calendar: "family",
    },
  },
  {
    title: "Birthday Party",
    start: new Date(date.getFullYear(), date.getMonth() + 1, -11),
    end: new Date(date.getFullYear(), date.getMonth() + 1, -10),
    allDay: true,
    extendedProps: {
      calendar: "meeting",
    },
  },
  {
    title: "Birthday Party",
    start: new Date(date.getFullYear(), date.getMonth() + 1, -13),
    end: new Date(date.getFullYear(), date.getMonth() + 1, -12),
    allDay: true,
    extendedProps: {
      calendar: "holiday",
    },
  },
  {
    title: "Monthly Meeting",
    start: nextMonth,
    end: nextMonth,
    allDay: true,
    extendedProps: {
      calendar: "business",
    },
  },
];

// Combine product events with static events
export const combinedCalendarEvents = [
  ...calendarEvents,
  ...staticEvents,
];
