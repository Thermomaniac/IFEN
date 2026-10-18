// Interest-list page paths, on their own so the schedule rows can link to them without
// importing the page data (which reads the schedule).

export const INTEREST_ROOT = "/courses/interest-list";

export const interestPath = (slug: string) => `${INTEREST_ROOT}/${slug}`;
