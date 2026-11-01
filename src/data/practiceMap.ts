// Practices on the Germany tile map in the therapist list hero. Each mapped German record
// is placed by its own [lat, lng] and snapped to the nearest tile, so a dark tile means
// at least one registered practice sits in that area. Nothing is geocoded or inferred.

import { MAP_HEIGHT, MAP_WIDTH, germanyDots } from "./germanyDots";
import { therapists } from "./therapists";

// Germany's extent, matched to the Paper tile map's box (north up, plate carrée).
const WEST = 5.87;
const EAST = 15.04;
const NORTH = 55.06;
const SOUTH = 47.27;

function toMap([lat, lng]: [number, number]): [number, number] {
  return [((lng - WEST) / (EAST - WEST)) * MAP_WIDTH, ((NORTH - lat) / (NORTH - SOUTH)) * MAP_HEIGHT];
}

function nearestTile([x, y]: [number, number]) {
  let best = 0;
  let bestDist = Infinity;
  germanyDots.forEach(([cx, cy], i) => {
    const d = (cx - x) ** 2 + (cy - y) ** 2;
    if (d < bestDist) {
      bestDist = d;
      best = i;
    }
  });
  return best;
}

const german = therapists.filter((t) => t.country === "de" && t.location);

/** Practices per tile index. */
export const practiceTiles = german.reduce<Map<number, number>>((tiles, t) => {
  const i = nearestTile(toMap(t.location!));
  tiles.set(i, (tiles.get(i) ?? 0) + 1);
  return tiles;
}, new Map());

/**
 * The cities with the most practices, with the tile they sit on, for the map's callouts.
 * A city within a few tiles of one already picked is skipped so the cards never overlap.
 */
export const busiestCities = Object.entries(
  german.reduce<Record<string, { count: number; location: [number, number] }>>((cities, t) => {
    const city = t.address?.city;
    if (city) cities[city] = { count: (cities[city]?.count ?? 0) + 1, location: cities[city]?.location ?? t.location! };
    return cities;
  }, {}),
)
  .sort((a, b) => b[1].count - a[1].count)
  .map(([name, { count, location }]) => ({ name, count, tile: germanyDots[nearestTile(toMap(location))] }))
  .reduce<{ name: string; count: number; tile: readonly [number, number] }[]>((picked, city) => {
    const clear = picked.every(({ tile: [x, y] }) => Math.hypot(x - city.tile[0], y - city.tile[1]) > 160);
    return picked.length < 3 && clear ? [...picked, city] : picked;
  }, []);

export const mappedInGermany = german.length;
