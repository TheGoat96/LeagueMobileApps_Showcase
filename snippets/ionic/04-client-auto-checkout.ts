/**
 * SHOWCASE SNIPPET — client-side auto-checkout on geo drift
 * Illustrative only. Complements the Cloud Functions cron path.
 *
 * If the user is checked in but the device is no longer near the court,
 * remove them from LiveUsers_List and write an "auto" I/O checkout.
 */

export function runAutoCheckout(ctx: {
  checkInLocation: string | null | undefined;
  userId: string | null | undefined;
  latitude: number;
  longitude: number;
  radiusKm: number;
  verifyProximity: (args: {
    userLat: number;
    userLng: number;
    locationId: string;
    userId: string;
    radiusKm: number;
  }) => Promise<boolean>;
  checkout: (locationId: string, userId: string) => Promise<void>;
}): void {
  if (!ctx.checkInLocation || !ctx.userId) {
    return;
  }

  const locationId = ctx.checkInLocation;
  const userId = ctx.userId;

  ctx
    .verifyProximity({
      userLat: ctx.latitude,
      userLng: ctx.longitude,
      locationId,
      userId,
      radiusKm: ctx.radiusKm
    })
    .then((stillNearby) => {
      if (stillNearby) {
        return;
      }
      return ctx.checkout(locationId, userId);
    });
}
