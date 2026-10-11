/**
 * SHOWCASE SNIPPET — admin court catalog operations
 * Illustrative only. Ops could seed / curate venues without waiting on user UGC.
 */

export async function addCourt({ courtName, courtLat, courtLng }) {
  if (!courtName || !courtLat || !courtLng) {
    throw new Error("Court name + lat/lng required");
  }

  // $.get(host + "addCourt.php", { newCrtName, newCrtLat, newCrtLng })
  // response 1 = added, 0 = court already near this location
  return { ok: true, outcome: "added-or-duplicate-check" };
}

export async function searchCourts(params) {
  // $.getJSON(host + "searchCourt.php", params) → results table
  return { courts: [], params };
}

export async function deleteCourt(courtId) {
  // $.get(host + "deleteCourt.php", { courtId })
  return { deleted: courtId };
}

/** Players console: inspect who is near a lat/lng or checked in at a location. */
export async function searchNearbyPlayers({ lat, lng, radiusKm }) {
  // $.getJSON(host + "searchAreaPlayers.php", …)
  // $.getJSON(host + "playersAtLocal.php", …)
  return { players: [], query: { lat, lng, radiusKm } };
}
