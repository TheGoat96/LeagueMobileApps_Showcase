/**
 * SHOWCASE SNIPPET — proximity-gated check-in (client)
 * Illustrative only. UI strings, NGXS selectors, and loaders stubbed.
 *
 * Flow: refresh device location → server proximity gate →
 * update LiveUsers_List → write Locations_IO history.
 */

// import { HttpParams } from "@angular/common/http";

export async function attemptCheckIn(ctx: {
  deviceLat: number;
  deviceLng: number;
  locationId: string;
  userId: string;
  radiusKm: number;
  alreadyCheckedInElsewhere: boolean;
}): Promise<"ok" | "blocked-elsewhere" | "too-far" | "error"> {
  if (ctx.alreadyCheckedInElsewhere) {
    return "blocked-elsewhere";
  }

  // 1) Refresh device coords (Capacitor Geolocation) — omitted.
  // await deviceService.getDeviceLocation(true);

  // 2) Server-side proximity gate
  const nearby = await verifyCheckInStatus({
    userLat: ctx.deviceLat,
    userLng: ctx.deviceLng,
    currentLocationId: ctx.locationId,
    locationUserId: ctx.userId,
    radiusKm: ctx.radiusKm
  });

  if (!nearby) {
    return "too-far";
  }

  // 3) Join live occupancy + bump player count
  await updateLiveUserList(ctx.locationId, ctx.userId, true);

  // 4) Persist I/O history (manual check-in)
  await locationIOUpdate({
    currentLocationId: ctx.locationId,
    userId: ctx.userId,
    checkInStatus: true,
    checkIOType: "manual"
  });

  return "ok";
}

/** HTTPS → verifyCheckInStatus */
async function verifyCheckInStatus(_params: {
  userLat: number;
  userLng: number;
  currentLocationId: string;
  locationUserId: string;
  radiusKm: number;
}): Promise<boolean> {
  // apiService.getWithParam(FireBaseUrlEndpointInfo.keys.verifyCheckIn, params)
  return true;
}

/** Firestore batch: LiveUsers_List + current_Nof_Players */
async function updateLiveUserList(
  _locationId: string,
  _userId: string,
  _checkedIn: boolean
): Promise<void> {
  /* redacted */
}

/** HTTPS → locationIOUpdate */
async function locationIOUpdate(_params: {
  currentLocationId: string;
  userId: string;
  checkInStatus: boolean;
  checkIOType: "manual" | "auto";
}): Promise<void> {
  /* redacted */
}
