// Physical seminar venue pages, scoped to the two locations actually linked from the course
// schedule (Hannover and Baldham/Munich). Content is scraped verbatim from the legacy
// workshoporte pages (neurofeedback-info.de); no addresses, hotels or directions are invented.

import type { Metadata } from "next";
import type { CtaContent } from "./coursePage";
import { LISTING_PATH } from "./coursePage";

export type Hotel = {
  name: string;
  address: string[];
  distance?: string;
  travel?: string[];
  features?: string;
  phone?: string;
  fax?: string;
  email?: string;
  website?: { label: string; href: string };
  gps?: string;
};

export type Venue = {
  id: string;
  /** Hero title, e.g. "Venue Hannover". */
  name: string;
  /** Subline under the title, e.g. "Occupational therapy in Hanover". */
  practice: string;
  contact?: string;
  address: string[];
  phone?: string;
  fax?: string;
  email?: string;
  website?: { label: string; href: string };
  /** Paragraphs describing how to find the venue. */
  directionsText: string[];
  /** Grouped transit stops, e.g. "Bus stops" with its list of lines. */
  transit?: { heading: string; items: string[] }[];
  parkingNote?: string;
  shoppingNote?: string;
  hotels: Hotel[];
};

export const VENUE_IDS = ["hannover", "baldham-munich"] as const;
export type VenueId = (typeof VENUE_IDS)[number];

export const VENUES_PATH = "/locations";
export const venuePath = (id: string) => `${VENUES_PATH}/${id}`;

export function getVenue(id: string): Venue | undefined {
  return venues.find((v) => v.id === id);
}

export const venues: Venue[] = [
  {
    id: "hannover",
    name: "Venue Hannover",
    practice: "Occupational therapy in Hanover",
    contact: "Normen Schack & Frank Hegger",
    address: ["Neue-Land-Str. 7", "30655 Hanover"],
    phone: "0511 / 5 39 73 77",
    fax: "0511 / 5 39 73 76",
    email: "ergotherapie-in-hannover@email.de",
    website: { label: "www.neurofeedback-in-hannover.de", href: "https://www.neurofeedback-in-hannover.de" },
    directionsText: ["You will find the practice in the immediate vicinity of the Telemax at the Weidetorkreisel."],
    transit: [
      {
        heading: "Bus stops",
        items: ["123 Telemax / Roderbruchstr.", "137 Roderbruchstr. / Neue Landstr.", "133 Weidetorstr."],
      },
      { heading: "Tram stop", items: ["4 Roderbruchmarkt (10 min. walk to the practice)"] },
    ],
    parkingNote: "There is ample parking directly at the house. Disabled access is available.",
    shoppingNote: "Good shopping opportunities can be found about 10 minutes' walk away at the Roderbruchmarkt.",
    hotels: [
      {
        name: "Hotel Ibis Hannover Medical Park",
        address: ["Feodor-Lynen-Straße 1", "30625 Hanover"],
        phone: "+49 (0)511 95670",
        fax: "+49 (0)511 9567140",
        email: "H1632@accor.com",
        website: {
          label: "www.ibis.com",
          href: "http://www.ibis.com/de/hotel-1632-ibis-hannover-medical-park/index.shtml",
        },
        gps: `N 52° 23' 18.69" E 9° 48' 19.67"`,
      },
      {
        name: "Mercure Hotel Hannover Medical Park",
        address: ["Feodor-Lynen-Straße 1", "30625 Hanover"],
        phone: "+49 (0)511 95660",
        fax: "+49 (0)511 9566333",
        email: "H1631@accor.com",
        website: {
          label: "www.accorhotels.com",
          href: "http://www.accorhotels.com/de/hotel-1631-mercure-hotel-hannover-medical-park/index.shtml",
        },
        gps: `N 52° 23' 18.69" E 9° 48' 19.67"`,
      },
      {
        name: "Wyndham Hannover Atrium",
        address: ["Karl-Wiechert-Allee 68", "30625 Hanover"],
        phone: "+49 (0)511 54070",
        website: {
          label: "www.wyndhamhotelgroup.com",
          href: "http://www.wyndhamhotelgroup.de/hotels/germany/hannover/wyndham-hannover-atrium/hotel-overview",
        },
        gps: `N 52° 23' 35.9" E 9° 47' 42.8"`,
      },
      {
        name: "Hotel Eilenriede",
        address: ["Guerickestrasse 32", "30655 Hanover"],
        phone: "+49 (0)511 5635924",
        fax: "+49 (0)511 56359255",
        email: "hoteleilenriede@web.de",
        website: { label: "www.hoteleilenriede.de", href: "http://www.hoteleilenriede.de/" },
        gps: `N 52° 24' 00.4" E 9° 47' 35.0"`,
      },
      {
        name: "Guesthouse to the Oak",
        address: ["Silberstrasse 13", "30655 Hanover"],
        phone: "+49 (0)511 5476251",
        fax: "+49 (0)511 548787",
        email: "info@gaststaette-zur-eiche.de",
        website: { label: "www.gaststaette-zur-eiche.de", href: "http://www.gaststaette-zur-eiche.de/" },
        gps: `N 52° 23' 58.5" E 9° 48' 28.0"`,
      },
      {
        name: "Hotel Finkenhof",
        address: ["Finkenhof 6 / Meersmannufer 13", "30627 Hanover / 30655 Hanover"],
        phone: "+49 (0)511 957980",
        fax: "+49 (0)511 9579823",
        email: "hotel-finkenhof@gmx.de",
        website: { label: "www.hotel-finkenhof.de", href: "http://www.hotel-finkenhof.de/" },
        gps: `52° 23' 16.4" E 9° 49' 23.0"`,
      },
      {
        name: "GHOTEL hotel & living Hannover",
        address: ["Lathusenstrasse 35", "30625 Hanover"],
        phone: "+49 (0)511 53030",
        fax: "+49 (0)511 5303-111",
        email: "hannover@ghotel.de",
        website: { label: "www.ghotel.de", href: "http://www.ghotel.de/deutsch/hotels/hannover" },
        gps: `N 52° 22' 44.8" E 9° 47' 42.6"`,
      },
      {
        name: "Sheraton Hanover Pelikan Hotel",
        address: ["Pelikanplatz 31", "30177 Hanover"],
        phone: "+49 (0)511 90930",
        fax: "+49 (0) 511 9093 555",
        website: { label: "www.sheratonpelikanhannover.com", href: "http://www.sheratonpelikanhannover.com/" },
        gps: `N 52° 23' 55.6" E 9° 46' 17.3"`,
      },
    ],
  },
  {
    id: "baldham-munich",
    name: "Venue Baldham, Munich",
    practice: "Institute for EEG Neurofeedback",
    address: ["Karl-Böhm-Strasse 50", "85598 Baldham"],
    phone: "+49 (89) 2000 299 66",
    email: "info@neurofeedback-info.de",
    directionsText: [],
    parkingNote:
      "No parking in front of the building: the spaces are reserved for employees. Alternative parking is available on side streets such as Finkenstraße or Gartenstraße, or paid parking at Baldham train station (approx. 1 km away).",
    hotels: [
      {
        name: "Alter Hof",
        address: ["Fasanenstraße 4", "85591 Vaterstetten"],
        distance: "1.8 km",
        travel: ["On foot: 20 minutes", "Car: 5 minutes", "Public transportation: Bus 452 (8 minutes)"],
        features: "Quiet location, traditional Bavarian cuisine",
        website: { label: "Hotel Alter Hof", href: "http://www.hotel-alterhof.de" },
      },
      {
        name: "Glasl's Landhotel",
        address: ["Münchner Straße 11a", "85604 Zorneding"],
        distance: "5 km",
        travel: ["Car: 10 minutes", "Public transport: S4 towards Grafing Bahnhof, then 10 minutes walk"],
        features: "Modern rooms, wellness area",
        website: { label: "Glasl's Landhotel", href: "http://www.glasls-landhotel.de" },
      },
      {
        name: "Best Western Plus Hotel Erb",
        address: ["Posthalterring 1", "85599 Parsdorf"],
        distance: "6 km",
        travel: ["Car: 10 minutes", 'Public transport: Bus 452 towards Parsdorf, stop "Posthalterring" (15 minutes)'],
        features: "Wellness area, restaurant",
        website: { label: "Hotel Erb", href: "https://hotel-erb.de" },
      },
      {
        name: "Hotel Cosima",
        address: ["Bahnhofstraße 23", "85591 Vaterstetten"],
        distance: "2 km",
        travel: ["On foot: 25 minutes", "Car: 6 minutes", "Public transport: S4 to Vaterstetten (2 minutes)"],
        features: "Close to the train station, Italian restaurant",
        website: { label: "Hotel Cosima", href: "http://www.hotelcosima.de" },
      },
      {
        name: "Moxy Munich Ostbahnhof",
        address: ["Atelierstraße 22", "81671 Munich"],
        distance: "Direct S-Bahn connection (15 minutes)",
        features: "Stylish design, free Wi-Fi",
        website: {
          label: "Moxy Munich Ostbahnhof",
          href: "https://www.marriott.com/de/hotels/mucoe-moxy-munich-ostbahnhof/overview/",
        },
      },
    ],
  },
];

export type VenueSectionId = "address" | "directions" | "hotels";

export const VENUE_NAV: { id: VenueSectionId; label: string }[] = [
  { id: "address", label: "Address" },
  { id: "directions", label: "Getting There" },
  { id: "hotels", label: "Hotels Nearby" },
];

export const venueHeads: Record<VenueSectionId, string> = {
  address: "Address",
  directions: "Getting There",
  hotels: "Hotels Nearby",
};

export const venueCopy = {
  badge: "Workshop Location",
  directions: "Get Directions",
  rows: {
    street: "Street",
    city: "Postcode and city",
    person: "Contact person",
    phone: "Phone",
    fax: "Fax",
    email: "Email",
    website: "Website",
  },
};

export const venueCta: CtaContent = {
  label: "Course Dates",
  headingLines: ["Looking for a course", "at this location?"],
  action: { label: "Back to Course Dates", href: LISTING_PATH },
};

export const venueMeta = (v: Venue): Metadata => ({
  title: `${v.name} | IFEN Workshop Locations`,
  description: `${v.practice}, ${v.address.join(", ")}. Address, directions and nearby hotels for this IFEN seminar venue.`,
});

export const directionsHref = (v: Venue) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(v.address.join(", "))}`;
