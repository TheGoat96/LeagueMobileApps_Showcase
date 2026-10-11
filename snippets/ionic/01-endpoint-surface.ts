/**
 * SHOWCASE SNIPPET — Cap8 Cloud Function endpoint surface
 * Illustrative only. Not a runnable app module.
 *
 * Basketball Cap8 uses flat HTTPS function names.
 * League Mobile Core historically used /rest/api/v1 path prefixes.
 */

// import { environment as ENV } from "../../environments/environment";

export class FireBaseUrlEndpointInfo {
  static get keys(): Keys {
    return {
      userInAppMessages: `${this.baseUrl}/UserInAppMessages`,
      nearbyLocation: `${this.baseUrl}/userNearbyLocations`,
      verifyNewLocation: `${this.baseUrl}/verifyNewLocationDistance`,
      seedLocations: `${this.baseUrl}/userSeedNearbyLocations`,
      verifyCheckIn: `${this.baseUrl}/verifyCheckInStatus`,
      locationIOUpdate: `${this.baseUrl}/locationIOUpdate`,
      updateRating: `${this.baseUrl}/updateUserRating`,
      emailVerification: `${this.baseUrl}/requestEmailVerification`,
      requestEmailChange: `${this.baseUrl}/requestEmailChange`
    };
  }

  static get baseUrl(): string {
    // Production reads ENV.APP_CONFIG.firebaseUrl — redacted here.
    return "https://REGION-PROJECT.cloudfunctions.net";
  }
}

interface Keys {
  userInAppMessages: string;
  nearbyLocation: string;
  verifyNewLocation: string;
  seedLocations: string;
  verifyCheckIn: string;
  locationIOUpdate: string;
  updateRating: string;
  emailVerification: string;
  requestEmailChange: string;
}
