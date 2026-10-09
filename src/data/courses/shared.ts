// Pieces repeated across course pages.

import type { Category } from "../course";
import { LISTING_PATH, type Speaker } from "../coursePage";

export const LIVE = "https://www.neurofeedback-info.de/en";

export const FEINER: Speaker = {
  id: "thomas-feiner",
  name: "Thomas Feiner",
  role: "BCIA BCN, QEEG-D",
  image: "/speakers/thomas-feiner.jpg",
  href: `${LIVE}/ifen-de/dozenten-m/1-thomas-f-feiner-bcia-bcn-qeeg-d.html`,
};

export const ALL_OFFERS: Category = {
  id: "all",
  title: "Training & Other Offers",
  icon: { kind: "cap" },
  href: LISTING_PATH,
};
