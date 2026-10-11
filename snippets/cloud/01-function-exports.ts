/**
 * SHOWCASE SNIPPET — Cloud Functions export surface
 * Illustrative only. Not a runnable Firebase Functions entrypoint.
 *
 * Admin credential material is omitted; production initializes
 * firebase-admin with a project-scoped service account.
 */

// Users
export {
  /* AddLocationIOBookMarks, */
  /* UserBookMarkedLocations, */
  /* DistrubuteNotificationData, */
  /* distrubuteMyStats, */
  /* NewUserEmail, */
  /* UserInAppMessages, */
  /* requestEmailVerification, */
  /* requestEmailChange */
} from "./users/usersFuncModules";

// Locations
export {
  /* userNearbyLocations, */
  /* userSeedNearbyLocations, */
  /* verifyNewLocationDistance, */
  /* verifyCheckInStatus, */
  /* locationIOUpdate, */
  /* autoCheckoutCron, */
  /* removeLocation */
} from "./locations/locationsFuncModule";

// Ratings
export {
  /* calculateMyStats, */
  /* updateUserRating */
} from "./rating/ratingFuncModule";

// Push
export {
  /* locationsUserCount */
} from "./pushNotifications/pushFuncModule";

/**
 * Flat HTTPS names the Cap8 client calls, e.g.:
 *   /userNearbyLocations
 *   /verifyCheckInStatus
 *   /locationIOUpdate
 *   /updateUserRating
 */
export const SHOWCASE_FUNCTION_NAMES = [
  "userNearbyLocations",
  "userSeedNearbyLocations",
  "verifyNewLocationDistance",
  "verifyCheckInStatus",
  "locationIOUpdate",
  "autoCheckoutCron",
  "updateUserRating",
  "calculateMyStats",
  "locationsUserCount",
  "UserInAppMessages"
] as const;
