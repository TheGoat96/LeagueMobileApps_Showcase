/**
 * SHOWCASE SNIPPET — check-in permission + I/O identity
 * Illustrative only. Distance helpers and Firestore writes stubbed.
 *
 * CheckInPermission: is the device inside the court radius?
 * CheckUserIOLocation: create-or-update Locations_IO via uniqueUserLocationId.
 */

export async function CheckInPermission(
  userLat: number,
  userLng: number,
  currentLocationId: string,
  radiusKm: number
): Promise<boolean> {
  console.log("LOCATIONS_USERCHECKIO: proximity gate", { currentLocationId });

  const locationData = await loadLocationLatLngBounds(currentLocationId, radiusKm);
  if (!locationData) {
    return false;
  }

  return proximityUserLocation(locationData, userLat, userLng, radiusKm);
}

export async function CheckUserIOLocation(
  IOLocationId: string,
  IOLocationUserId: string,
  checkInStatus: boolean,
  checkIOType: "manual" | "auto"
): Promise<string | false> {
  const uniqueUserLocationId = `${IOLocationUserId}-${IOLocationId}`;

  console.log("LOCATIONS_USERCHECKIO: check in/out", {
    uniqueUserLocationId,
    checkInStatus,
    checkIOType
  });

  // Query Locations_IO where uniqueUserLocationId == key
  const existingDocId = await findIoDocId(uniqueUserLocationId);

  if (!existingDocId) {
    return addNewUserLocationIO(
      IOLocationId,
      IOLocationUserId,
      uniqueUserLocationId,
      checkInStatus,
      checkIOType
    );
  }

  return updateExistingUserLocationIO(
    existingDocId,
    checkInStatus,
    checkIOType
  );
}

/** Cron companion: force-checkout stale chkInStatus=true rows. */
export async function autoCheckoutStaleSessions(
  maxMinutesCheckedIn: number
): Promise<number> {
  const stale = await queryStaleCheckIns(maxMinutesCheckedIn);
  for (const row of stale) {
    await CheckUserIOLocation(row.locationId, row.userId, false, "auto");
  }
  return stale.length;
}

// --- stubs ---

async function loadLocationLatLngBounds(
  _locationId: string,
  _radiusKm: number
): Promise<{ lat: number; lng: number } | null> {
  return null;
}

function proximityUserLocation(
  _location: { lat: number; lng: number },
  _userLat: number,
  _userLng: number,
  _radiusKm: number
): boolean {
  return false;
}

async function findIoDocId(_uniqueUserLocationId: string): Promise<string | false> {
  return false;
}

async function addNewUserLocationIO(
  _locationId: string,
  _userId: string,
  _uniqueKey: string,
  _checkInStatus: boolean,
  _checkIOType: string
): Promise<string> {
  return "new-io-doc-id";
}

async function updateExistingUserLocationIO(
  docId: string,
  _checkInStatus: boolean,
  _checkIOType: string
): Promise<string> {
  return docId;
}

async function queryStaleCheckIns(
  _maxMinutes: number
): Promise<Array<{ locationId: string; userId: string }>> {
  return [];
}
